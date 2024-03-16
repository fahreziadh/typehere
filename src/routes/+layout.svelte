<script lang="ts">
	import { navigating } from '$app/stores';
	import { cn } from '$lib/utils';
	import 'microtip/microtip.css';

	import '../app.css';
</script>

<svelte:head>
	<title>Typehere - Open source form builder & survey</title>
	<meta name="description" content="Open source Super clean & simple Form building & Survey 🍕" />
	<meta name="keywords" content="Form, Survey, Builder, Typeform, Google Form" />

  <meta property="og:type" content={"website"} />
  <meta property="og:url" content={"https://typehere.fun/screenshot.webp"} />
  <meta property="twitter:url" content={"https://typehere.fun/screenshot.webp"} />
</svelte:head>

<div
	class={cn(
		' h-1 bg-primary fixed top-0 left-0 transition-all duration-1000 ease-out',
		$navigating ? 'w-full' : 'w-0'
	)}
></div>
<slot />
