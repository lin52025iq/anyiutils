import shell from 'shelljs'

if (!shell.which('git') || !shell.which('npm') || !shell.which('pnpm')) {
    shell.echo('Need git & npm & pnpm!')
    shell.exit(1)
}

// 清除目录
shell.exec('rm -rf dist && rm -rf publish')

// 打包项目
shell.exec('pnpm run build')

// 创建发布目录
shell.exec('mkdir -p publish/dist')

// 移入打包产物到发布目录下
shell.exec('cp ./dist/* publish/dist')

// 移入 readme
shell.exec('cp README.md publish')

// 重新生成 package.json 并更新版本号
await createPackageAndUpdateVersion()

// 发布版本
shell.cd('publish').exec('npm publish')

// 清除生成的产物
shell.cd('..').exec('rm -rf publish')

import semver from 'semver'
async function createPackageAndUpdateVersion() {
    const fields = [
        'name',
        'version',
        'description',
        'main',
        'module',
        'exports',
        'keywords',
        'author',
        'license',
        'dependencies'
    ]
    await new Promise<void>((resolve, reject) => {
        import('../package.json')
            .then(({ default: pkg }) => {
                pkg.version = semver.inc(pkg.version, getRelease())!

                const newPkg = {}
                fields.forEach((field) => {
                    if (pkg[field] !== undefined) {
                        newPkg[field] = pkg[field]
                    }
                })

                newPkg['scripts'] = {}

                const content = JSON.stringify(newPkg, null, 4)
                shell.exec(`echo '${content}' > publish/package.json`)
                shell.exec(`echo '${JSON.stringify(pkg, null, 4)}' > package.json`)
                createTagAndPush(pkg.version, getRelease())
                resolve()
            })
            .catch(reject)
    })
}

import type { ReleaseType } from 'semver'
/** 获取执行参数中要更新的版本阶段 */
function getRelease(): ReleaseType {
    const release = process.argv.find((item) => item.includes('--release='))?.replace('--release=', '')
    const releases = ['major', 'premajor', 'minor', 'preminor', 'patch', 'prepatch', 'prerelease']

    if (releases.includes(release!)) return release as ReleaseType
    return 'patch'
}

/** 创建 git tag 并 push 到远程 */
function createTagAndPush(version: string, release: ReleaseType) {
    shell.exec(`git tag ${version} -m "${release} to ${version}"`)
    shell.exec(`git push origin ${version}`)
    shell.exec(`git commit -am "Publish to version ${version} with ${release} release"`)
    shell.exec('git push')
}
