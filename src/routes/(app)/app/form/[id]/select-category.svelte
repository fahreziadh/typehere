<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Popover, PopoverTrigger, PopoverContent } from '$lib/components/ui/popover';
	import { cn } from '$lib/utils';
	import { AtSign, Text, UserCircle2Icon } from 'lucide-svelte';

	let className = '';

	export { className as class };

	const listCategory = [
		{
			type: 'text',
			icon: Text,
			label: 'Text'
		},
		{
			type: 'email',
			icon: AtSign,
			label: 'Email'
		},
		{
			type: 'fullname',
			icon: UserCircle2Icon,
			label: 'Nama Lengkap'
		}
	];

	export let selected = ''
	$: selectedObject = listCategory.find((e) => e.type === selected);
</script>

<div>
	<Popover>
		<PopoverTrigger asChild let:builder>
			<Button builders={[builder]} class={cn(className)}>
				{#if selectedObject}
					<svelte:component this={selectedObject?.icon} size={16} class="mr-2" />
					{selectedObject?.label}
				{:else}
					Pilih kategori
				{/if}
			</Button>
		</PopoverTrigger>
		<PopoverContent>
			<div class="flex flex-col">
				<Label class="p-3">Pilih kategori</Label>
				{#each listCategory as category}
					<Button variant={
						selected === category.type
							? 'solid'
							: 'ghost'
					} class="justify-start" on:click={() => (selected = category.type)}>
						<svelte:component this={category.icon} size={16} class="mr-2" />
						{category.label}</Button
					>
				{/each}
			</div>
		</PopoverContent>
	</Popover>
</div>
