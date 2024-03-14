<script>
	import { sineOut } from 'svelte/easing';
	import { fade, fly, slide } from 'svelte/transition';
</script>

<div in:fade={{easing: sineOut}} class="min-h-[70vh]">Test</div>
