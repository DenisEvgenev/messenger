import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            components: path.resolve(__dirname, 'src/components'),
            core: path.resolve(__dirname, 'src/core'),
            assets: path.resolve(__dirname, 'src/assets'),
            constants: path.resolve(__dirname, 'src/constants'),
        },
    },
});
