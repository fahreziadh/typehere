<script lang="ts">
	import { navigating } from '$app/stores';
	import Footer from '$lib/components/footer.svelte';
	import Navbar from '$lib/components/navbar.svelte';
	import { cn } from '$lib/utils';
</script>

<svelte:head>

</svelte:head>
<div
	class={cn(
		' h-1 bg-primary fixed top-0 left-0 transition-all duration-1000 ease-out',
		$navigating ? 'w-full' : 'w-0'
	)}
></div>
<Navbar />
<div class="container max-w-[900px] min-h-[70vh] antialiased bg-background text-foreground scroll-smooth">
	<slot />
</div>
<Footer />
