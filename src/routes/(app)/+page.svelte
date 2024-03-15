<script lang="ts">
	import { Button } from '$lib/components/button';
	import { Github, Rocket } from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	export let data: LayoutData;
	let ready = false;
	let githubStar = data?.githubStar;
	onMount(() => (ready = true));
</script>

<div class="flex flex-col items-center mt-16">
	<a href="https://github.com/fahreziadh/typehere">
		<Button size="sm" variant="secondary"><Github size={14} class="mr-2" /> {githubStar}</Button>
	</a>
	{#if ready}
		<div
			in:slide={{ axis: 'x', delay: 100, duration: 1500 }}
			class=" text-5xl md:text-6xl z-10 pb-4 lg:text-7xl xl:text-8xl text-center font-bold text-foreground tracking-wider"
		>
			typehere
		</div>
	{:else}
		<div
			class=" text-5xl md:text-6xl pb-4 lg:text-7xl xl:text-8xl text-center font-bold text-foreground tracking-wider"
		>
			typehere
		</div>
	{/if}
	<div class="text-center text-base md:text-xl">Buat form & survey dengan mudah</div>

	<div class="mt-6 flex items-center flex-row justify-center gap-4">
		<a href="/app">
			<Button size="lg" variant="solid">Coba sekarang <Rocket size={18} class="ml-2" /></Button>
		</a>
	</div>

	<img src="/screenshot.webp" alt="Hero" class="w-full mt-20" width="1440" height="1117" />
</div>
