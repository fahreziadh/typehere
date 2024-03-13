<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Button } from '$lib/components/button';
	import type { formContent } from '$lib/db/schemas';
	import { cn } from '$lib/utils';
	import type { ActionResult } from '@sveltejs/kit';
	import { Plus } from 'lucide-svelte';
	import { fade, scale } from 'svelte/transition';

	export let data: (typeof formContent.$inferSelect)[] | null = null;

	const formId = data?.[0]?.formId;
	$: listContent = data?.map((item) => JSON.parse(item.content as string)) ?? [];
	let selectedOrder = 0;
	let status: 'idle' | 'loading' = 'idle';

	async function addMoreContent(order: number) {
		if (!formId) {
			throw new Error('No form ID');
		}
		status = 'loading';
		const formData = new FormData();

		formData.append('formId', formId);
		formData.append('order', order.toString());
		formData.append('content', JSON.stringify({}));

		const response = await fetch(`/app/form/${formId}?/addMoreContent`, {
			method: 'POST',
			body: formData
		});

		const result: ActionResult = deserialize(await response.text());

		if (result.type === 'success') {
			invalidateAll();
		}

		status = 'idle';

		applyAction(result);
	}

	function selectContent(order: number) {
		selectedOrder = order;
	}
</script>

<div
	class="rounded-md aspect-[16/10] border border-border mt-8 mb-4 shadow-sm flex flex-col items-center justify-center"
>
	{JSON.stringify(listContent?.[selectedOrder])}
</div>

<div class="w-full overflow-x-auto flex flex-row scrollbar-thin scrollbar-webkit pb-4 pt-2">
	{#each listContent as content, index}
		<div
			transition:scale
			class={cn('group flex flex-row', status === 'loading' ? 'animate-pulse cursor-progress' : '')}
		>
			<button
				type="button"
				on:click={() => selectContent(index)}
				class={cn(
					'aspect-[16/10] hover:border-foreground cursor-pointer min-w-[200px] active:scale-95 transition-transform border rounded-md relative',
					index === selectedOrder ? 'border-foreground' : 'border-border'
				)}
			>
				<div
					class="absolute top-2 right-2 w-[20px] flex items-center justify-center rounded-full h-[20px] group-hover:bg-primary group-hover:text-background transition-colors text-xs text-foreground/80 select-none font-medium border"
				>
					{index + 1}
				</div>
			</button>
			<div
				class={cn(
					'flex items-center px-1 justify-center transition-all duration-100 ease-in-out group/add delay-100',
					index === listContent.length - 1 ? 'w-14' : 'hover:w-14 opacity-50 hover:opacity-100 w-4'
				)}
			>
				<div
					class={cn(
						'delay-100 transition-all',
						index === listContent.length - 1
							? ''
							: 'h-4 w-2 rounded-full bg-foreground/50 block group-hover/add:hidden'
					)}
				></div>
				<Button
					class={cn(
						'delay-100 transition-all',
						index === listContent.length - 1 ? '' : 'hidden group-hover/add:block'
					)}
					type="button"
					variant="secondary"
					on:click={() => addMoreContent(index + 1)}><Plus size={16} /></Button
				>
			</div>
		</div>
	{/each}
</div>
