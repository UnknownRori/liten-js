import { defineConfig } from 'vite';
import { LitenPlugin } from './src';

export default defineConfig({
    plugins: [
        LitenPlugin(),
    ],
});
