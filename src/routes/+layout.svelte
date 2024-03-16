<script lang="ts">
	import { navigating } from '$app/stores';
	import { cn } from '$lib/utils';
	import 'microtip/microtip.css';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import utc from 'dayjs/plugin/utc';
	dayjs.extend(relativeTime)
	dayjs.extend(utc)

	import '../app.css';
</script>

<svelte:head>
	<title>Typehere - Open source form builder & survey</title>
	<meta name="description" content="Open source Super clean & simple Form building & Survey 🍕" />
	<meta name="keywords" content="Form, Survey, Builder, Typeform, Google Form" />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content="https://typehere.fun" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Typehere - Open source form builder & survey" />
	<meta
		property="og:description"
		content="Open source Super clean & simple Form building & Survey 🍕"
	/>
	<meta property="og:image" content="https://typehere.fun/og.webp" />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="typehere.fun" />
	<meta property="twitter:url" content="https://typehere.fun" />
	<meta name="twitter:title" content="Typehere - Open source form builder & survey" />
	<meta
		name="twitter:description"
		content="Open source Super clean & simple Form building & Survey 🍕"
	/>

	<meta name="twitter:image" content="https://typehere.fun/og.webp" />
</svelte:head>

<div
	class={cn(
		' h-1 bg-primary scroll-smooth fixed top-0 left-0 transition-all duration-1000 ease-out',
		$navigating ? 'w-full' : 'w-0'
	)}
></div>
<slot />
