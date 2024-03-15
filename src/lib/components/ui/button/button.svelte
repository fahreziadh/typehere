<script lang="ts">
	import { cn } from "$lib/utils";
	import { buttonVariants, type Props, type Events } from "./index.js";

	type $$Props = Props;
	type $$Events = Events;

	let className: $$Props["class"] = undefined;
	export let variant: $$Props["variant"] = "default";
	export let size: $$Props["size"] = "default";
	export { className as class };
</script>

<button
	class={cn(buttonVariants({ variant, size, className }))}
	type="button"
	{...$$restProps}
	on:click
	on:keydown
>
	<slot />
</button>
