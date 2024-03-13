<script lang="ts">
	import { navigating } from '$app/stores';
	import { cn } from '$lib/utils';
	import { Toaster } from 'svelte-sonner';

	import '../app.css';
</script>
<Toaster />
<div class={cn(" h-1 bg-primary fixed top-0 left-0 transition-all duration-1000 ease-out", $navigating ? "w-full": "w-0")}></div>
<div class="container max-w-[900px] antialiased bg-background text-foreground">
	<slot />
</div>
