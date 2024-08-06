import path from 'path'
import shell from 'shelljs'

const dirPath = path.join(process.cwd(), 'src')
shell.cd(dirPath)

const content = shell
    .ls('*.ts')
    .filter((v) => v !== 'index.ts')
    .map((name) => `export * from './${name.replace(/\.ts$/, '')}'`)
    .join('\n')

shell.cd(dirPath).exec(`echo "${content}" > index.ts`)
