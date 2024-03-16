<script lang="ts">
	import { cn } from '$lib/utils';
	import { SvelteComponent } from 'svelte';
	import { Button } from './button';

	type Option = {
		value: string;
		label: string;
		icon?: typeof SvelteComponent;
		disable?: boolean
	};

	let className = '';
	export { className as class };
	export let options: Option[] = [];
	export let selected = '';

	export let placeholder = 'Select';

	$: selectedObj = options.find((option) => option.value === selected);
	let open = false;

	function close() {
		open = false;
	}

	function toggle() {
		open = !open;
	}

	function selectOption(option: Option) {
		selected = option.value
		close();
	}
</script>

<div class={cn('relative inline-block text-left', className)}>
	<div
		class={cn(
			'absolute mb-2 bottom-full transform transition duration-100 w-56 origin-bottom-left rounded-md bg-background shadow-sm border',
			open ? 'opacity-100 scale-100 z-50 ease-out' : 'opacity-0 scale-0 ease-in'
		)}
		role="menu"
		aria-orientation="vertical"
		aria-labelledby="menu-button"
		tabindex="-1"
	>
		<div class="px-4 py-3 text-xs opacity-50">{placeholder || 'Select'}</div>
		<div class="flex flex-col">
			{#each options as option}
				<button
					type="button"
					disabled={option.disable}
					on:click={() => selectOption(option)}
					class="w-full flex items-center transition text-sm hover:bg-secondary justify-start px-4 py-2 text-foreground/80 hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{#if option.icon}
						<svelte:component this={option.icon} size={16} class="mr-2" />
					{/if}
					{option.label}
				</button>
			{/each}
		</div>
	</div>
	<Button
		on:click={() => {
			toggle();
		}}
	>
		{#if selectedObj}
			{#if selectedObj.icon}
				<svelte:component this={selectedObj.icon} size={16} class="mr-2" />
			{/if}
			{selectedObj.label}
		{:else}
			{placeholder || 'Select'}
		{/if}
	</Button>
</div>
