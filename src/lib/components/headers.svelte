<script lang="ts">
	import { cn } from "$lib/utils";

	let className = ''
	export { className as class };

</script>
<div class={cn("py-5 text-2xl font-bold w-full", className)}>
  <slot />
</div>
