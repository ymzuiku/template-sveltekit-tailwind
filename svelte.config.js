import preprocess from 'svelte-preprocess';
import adapterStatic from '@sveltejs/adapter-static';
import adapterNode from '@sveltejs/adapter-node';



/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		}),
	],
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: process.env.ssr ? adapterNode({out:'dist'}): adapterStatic({
			pages: 'build',
			assets:'build',
			fallback: null,
		}),
	}
};

export default config;
