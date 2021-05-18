# 配置一个 SvelteKit SSR + 静态化 + TailwindCSS-jit 工程

> 此文仅仅是做一个备忘记录，毫无含量，见谅

SvelteKit 是一个基于 vite 的 SSR 工程，基本 0 配置。

## 初始化 sveltekit 工程

```
npm init svelte@next my-app
```

初始化时，选择 eslint = yes, prettier = yes, typescript = yes

## 安装 tailwindcss 相关

tailwindcss 开启 jit，编辑时立刻编译，闪电般的速度

```
npm install -D @tailwindcss/jit tailwindcss postcss
npx svelte-add tailwindcss  --jit
```

配置样式文件：

src/routes/\_\_layout.svelte

```html
<slot />

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
	@tailwind screens;
</style>
```

Ok，修改时自动编译 tailwindcss

## 配置 ssr 和 static

```sh
npm install -D @sveltejs/adapter-node@next @sveltejs/adapter-static@next
```

修改 svelte.config.js

```js
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
		})
	],
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: process.env.ssr
			? adapterNode({ out: 'dist' })
			: adapterStatic({
					pages: 'build',
					assets: 'build',
					fallback: null
			  })
	}
};

export default config;
```

编译：

```sh
npm run build # 编译静态化
ssr=1 npm run build # 编译node-ssr
```
