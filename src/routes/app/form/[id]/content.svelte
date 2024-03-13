<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Button } from '$lib/components/button';
	import type { formContent } from '$lib/db/schemas';
	import { cn } from '$lib/utils';
	import type { ActionResult } from '@sveltejs/kit';
	import { Plus } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';

	export let data: (typeof formContent.$inferSelect)[] | null = null;

	const formId = data?.[0]?.formId;
	$: listContent =
		data?.map((item) => {
			const content = JSON.parse(item.content as string) as {
				title: string;
				type: string;
				description: string;
			};
			return { ...item, content };
		}) ?? [];
	let selectedContent: (typeof listContent)[0] | null = null;
	let status: 'idle' | 'loading' = 'idle';
	$: isDirty =
		JSON.stringify(selectedContent?.content) !== data?.find((e) => e.id === selectedContent?.id)?.content

	onMount(() => {
		if (listContent.length > 0) {
			selectedContent = listContent[0];
		}
	});

	async function addMoreContent(order: number) {
		if (!formId) {
			throw new Error('No form ID');
		}
		status = 'loading';
		const formData = new FormData();

		const id = crypto.randomUUID();

		formData.append('formId', formId);
		formData.append('id', id);
		formData.append('order', order.toString());
		formData.append('content', JSON.stringify({ title: '', type: 'short-text', description: '' }));

		const response = await fetch(`/app/form/${formId}?/addMoreContent`, {
			method: 'POST',
			body: formData
		});

		const result: ActionResult = deserialize(await response.text());

		if (result.type === 'success') {
			await invalidateAll();
		}
		const newContent = listContent.find((e) => e.id === id);
		if (newContent) {
			selectedContent = newContent;
		}
		status = 'idle';

		applyAction(result);
	}

	function selectContent(id: string) {
		const newContent = listContent.find((e) => e.id === id);
		if (newContent) {
			selectedContent = newContent;
		}
	}
</script>

<div
	class="rounded-md relative aspect-[16/9] p-4 md:p-8 border border-border mt-8 mb-4 shadow-sm flex flex-col justify-center"
>
	{#if selectedContent}
		<h1 class="text-3xl font-medium mb-10 opacity-30 absolute top-5 left-5">
			#{selectedContent?.order}
		</h1>

		<textarea
			bind:value={selectedContent.content.title}
			name="title"
			placeholder="Tulis pertanyaan kamu disini..."
			class="bg-transparent border-none outline-none text-2xl font-bold h-[40px] min-h-[40px] scrollbar-thin scrollbar-webkit"
		/>
		<input
			type="text"
			name="description"
			placeholder="Tambahkan deskripsi (optional)"
			class="bg-transparent border-none outline-none text-xl font-medium"
		/>

		{#if isDirty}
			<Button class="mt-5 w-max">Simpan</Button>
		{/if}
	{/if}
</div>
<div class="w-full overflow-x-auto flex flex-row scrollbar-thin scrollbar-webkit pb-4 pt-2">
	{#each listContent as content, index (content.id)}
		<div
			transition:scale
			class={cn('group flex flex-row', status === 'loading' ? 'animate-pulse cursor-progress' : '')}
		>
			<button
				disabled={status === 'loading'}
				type="button"
				on:click={() => selectContent(content.id)}
				class={cn(
					'aspect-[16/9] hover:border-foreground/30 cursor-pointer min-w-[200px] max-w-[200px] active:scale-95 transition-transform border rounded-md relative',
					content.id === selectedContent?.id ? 'border-foreground' : 'border-border'
				)}
			>
				<div class="p-4 text-left font-semibold">
					{#if selectedContent?.id === content.id}
						{selectedContent.content.title ? selectedContent.content.title : `Untitled`}
					{:else}
						{content.content.title ? content.content.title : `Untitled`}
					{/if}
				</div>
				<div
					class="absolute top-2 left-2 w-[20px] flex items-center justify-center text-sm text-foreground/30 select-none font-medium"
				>
					#{index + 1}
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
						index === listContent.length - 1
							? ''
							: 'h-4 w-2 rounded-full bg-foreground/50 block group-hover/add:hidden'
					)}
				></div>
				<Button
					class={cn(index === listContent.length - 1 ? '' : 'hidden group-hover/add:block')}
					disabled={status === 'loading'}
					type="button"
					variant="secondary"
					on:click={() => addMoreContent(index + 1)}><Plus size={16} /></Button
				>
			</div>
		</div>
	{/each}
</div>
