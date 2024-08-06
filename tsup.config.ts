import { defineConfig, Options } from 'tsup'

export default defineConfig(() => {
    const options: Options = {
        entry: ['src/index.ts'],
        treeshake: true,
        clean: true,
        minify: true,
        format: ['cjs', 'esm'],
        dts: true
    }

    return options
})
