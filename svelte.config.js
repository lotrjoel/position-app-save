import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter(),
        prerender: {
            entries: ['/', '/about', '/gameplay', '/scoreboard'], // Ensure all routes are listed here
        }
    },
    preprocess: vitePreprocess(),
};

export default config;