<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import type { formContent } from '$lib/db/schemas';
	import { cn, typeToLabel } from '$lib/utils';
	import type { ActionResult } from '@sveltejs/kit';
	import {
		AtSign,
		CheckCircle2,
		Circle,
		Hash,
		Plus,
		Trash,
		UserSquare2Icon,
		Text,
		Hand
	} from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { sineOut } from 'svelte/easing';
	import { fade, scale, slide } from 'svelte/transition';
	import Select from '$lib/components/ui/select.svelte';

	export let data: (typeof formContent.$inferSelect)[] | null = null;
	export let formId = '';
	$: listContent =
		data?.map((item) => {
			const content = JSON.parse(item.content as string) as {
				title: string;
				type: string;
				description: string;
			};
			return { ...item, content, isOptional: item.isOptional ?? false };
		}) ?? [];
	let selectedContent: (typeof listContent)[0] | null = null;
	let status: 'idle' | 'loading' = 'idle';
	$: isDirty =
		JSON.stringify(selectedContent?.content) !==
		data?.find((e) => e.id === selectedContent?.id)?.content;

	$: if (selectedContent?.content.type && !selectedContent.content.title) {
		const defaultTitle = typeToLabel(selectedContent.content.type).defaultTitle;
		selectedContent.content.title = defaultTitle;
	}

	onMount(() => {
		if (listContent.length > 0) {
			selectedContent = listContent[0];
		}
	});

	async function addMoreContent(order: number) {
		if (!formId) {
			return alert('No form ID');
		}
		status = 'loading';
		const formData = new FormData();

		const id = crypto.randomUUID();

		formData.append('formId', formId);
		formData.append('id', id);
		formData.append('order', order.toString());
		formData.append('content', JSON.stringify({ title: '', type: 'text', description: '' }));

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

	async function deleteContent(id: string, order: number = 0) {
		if (!formId) {
			throw new Error('No form ID');
		}
		status = 'loading';
		const formData = new FormData();

		formData.append('formId', formId);
		formData.append('order', order?.toString() ?? '');
		formData.append('id', id);

		const response = await fetch(`/app/form/${formId}?/deleteContent`, {
			method: 'POST',
			body: formData
		});

		const result: ActionResult = deserialize(await response.text());

		if (result.type === 'success') {
			await invalidateAll();
		}

		status = 'idle';

		const newContent = listContent[0];
		if (newContent) {
			selectedContent = newContent;
		} else {
			selectedContent = null;
		}

		applyAction(result);
	}

	async function updateContent() {
		if (!formId) {
			throw new Error('No form ID');
		}
		status = 'loading';
		const formData = new FormData();

		formData.append('formId', formId);
		formData.append('id', selectedContent?.id ?? '');
		formData.append('content', JSON.stringify(selectedContent?.content));

		const response = await fetch(`/app/form/${formId}?/updateContent`, {
			method: 'POST',
			body: formData
		});

		const result: ActionResult = deserialize(await response.text());

		if (result.type === 'success') {
			await invalidateAll();
		}

		status = 'idle';

		applyAction(result);
	}

	async function toggleOptional(id: string) {
		if (!formId) {
			throw new Error('No form ID');
		}
		status = 'loading';
		const formData = new FormData();

		formData.append('id', id);
		formData.append('isOptional', selectedContent?.isOptional ? 'false' : 'true');

		const response = await fetch(`?/toggleContentOptional`, {
			method: 'POST',
			body: formData
		});

		const result: ActionResult = deserialize(await response.text());

		if (result.type === 'success') {
			if (!selectedContent) return;
			selectedContent = {
				...selectedContent,
				isOptional: !selectedContent?.isOptional
			};
		}

		status = 'idle';

		applyAction(result);
	}

	$: listTypeUsed = [...new Set(listContent.map((e) => e.content.type))];
</script>

<div
	in:fade={{ easing: sineOut, duration: 500 }}
	class="rounded-md relative aspect-[16/14] md:aspect-[16/10] lg:aspect-[16/9] p-4 md:p-8 border border-border mb-4 flex flex-col justify-center"
>
	{#if !selectedContent}
		<h1 class="mb-4 text-2xl">Tidak ada pertanyaan</h1>
		<Button
			size="lg"
			class="w-max"
			disabled={status === 'loading'}
			on:click={() => {
				addMoreContent(1);
			}}><Plus class="mr-2" size={18} />Buat baru</Button
		>
	{/if}
	{#if selectedContent}
		<h1 class="text-xl lg:text-2xl font-medium opacity-30 absolute top-5 left-5">
			#{selectedContent?.order}
		</h1>
		<div class="absolute bottom-5 left-5 flex flex-row items-center gap-2">
			<Select
				bind:selected={selectedContent.content.type}
				placeholder="Pilih jenis pertanyaan"
				options={[
					{
						value: 'greetings',
						label: 'Intro',
						// @ts-expect-error
						icon: Hand,
						disable: listContent.filter((e) => e.content.type === 'greetings').length > 0
					},
					// @ts-expect-error
					{ value: 'text', label: 'Text', icon: Text },
					{
						value: 'email',
						label: 'Email',
						// @ts-expect-error
						icon: AtSign,
						disable: listContent.filter((e) => e.content.type === 'email').length > 0
					},
					{
						value: 'fullname',
						label: 'Nama lengkap',
						// @ts-expect-error
						icon: UserSquare2Icon,
						disable: listContent.filter((e) => e.content.type === 'fullname').length > 0
					}
				]}
			/>
			<Button
				class=""
				size="icon"
				variant="secondary"
				role="tooltip"
				aria-label="Kategori pertanyaan sangat penting, agar data yang dimasukkan partisipan tersusun rapih."
				data-microtip-position="top">?</Button
			>
		</div>
		<div class="flex flex-row absolute bottom-5 right-5 gap-3">
			<Button
				type="button"
				variant={selectedContent.isOptional ? 'solid' : 'secondary'}
				disabled={status === 'loading'}
				on:click={() => {
					toggleOptional(selectedContent?.id ?? '');
				}}
				>{#if selectedContent.isOptional}
					<CheckCircle2 size={18} class="mr-2" />
				{:else}
					<Circle size={18} class="mr-2" />
				{/if} Opsional</Button
			>
			<Button
				type="button"
				size="icon"
				variant="destructive"
				disabled={status === 'loading'}
				on:click={() => {
					deleteContent(selectedContent?.id ?? '', selectedContent?.order ?? 0);
				}}><Trash size={16} /></Button
			>
		</div>

		<textarea
			spellcheck="false"
			bind:value={selectedContent.content.title}
			name="title"
			placeholder="Tulis pertanyaan kamu disini..."
			class="bg-transparent border-none outline-none text-base md:text-lg lg:text-xl xl:text-2xl font-bold h-[40px] lg:h-[60px] min-h-[40px]"
		/>
		{#if selectedContent.content.description}
			<label transition:slide for="description" class="opacity-50 text-xs md:text-sm"
				>Deskripsi</label
			>
		{/if}
		<textarea
			spellcheck="false"
			bind:value={selectedContent.content.description}
			name="description"
			placeholder="Tambahkan deskripsi (optional)"
			class="bg-transparent border-none outline-none opacity-80 text-sm md:text-xl font-medium"
		/>

		{#if isDirty}
			<div transition:slide={{ axis: 'y' }}>
				<Button
					class="mt-5 w-max"
					type="button"
					on:click={() => {
						updateContent();
					}}
					disabled={status === 'loading'}>Simpan</Button
				>
			</div>
		{/if}
	{/if}
</div>
<div
	class="w-full overflow-x-auto flex flex-row scrollbar-thin scrollbar-track-secondary scrollbar-thumb-rounded-full scrollbar-thumb-foreground/10 pb-4 pt-2"
>
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
					'aspect-[16/9]  cursor-pointer min-w-[200px] max-w-[200px] active:opacity-80 transition-all border  rounded-md relative',
					content.id === selectedContent?.id ? 'border-foreground' : 'border-border opacity-50 hover:border-foreground/30'
				)}
			>
				<div class="p-4 text-left font-semibold md:textbase text-sm">
					{#if selectedContent?.id === content.id}
						{selectedContent.content.title ? selectedContent.content.title : `Untitled`}
					{:else}
						{content.content.title ? content.content.title : `Untitled`}
					{/if}
				</div>
				<div
					class="bottom-2 left-2 w-max absolute text-[10px] items-center inline-flex gap-1 text-foreground/50"
				>
					<svelte:component this={typeToLabel(content.content.type).icon} size={12} />
					{typeToLabel(content.content.type).label}
				</div>
				<div
					class="absolute top-2 left-2 w-[20px] flex items-center justify-center text-sm text-foreground/30 select-none font-medium"
				>
					<Hash size={16} />
					{content.order}
				</div>
				<Button
					type="button"
					disabled={status === 'loading'}
					on:click={() => deleteContent(content.id, content.order ?? 0)}
					size="icon-sm"
					variant="destructive"
					class="absolute bottom-2 right-2 grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100"
				>
					<Trash size={12} />
				</Button>
			</button>
			<div
				class={cn(
					'flex items-center px-1 justify-center transition-all duration-100 ease-in-out group/add delay-100 relative',
					index === listContent.length - 1 ? 'w-14' : 'hover:w-14 opacity-50 hover:opacity-100 w-4'
				)}
			>
				<div
					class={cn(
						index === listContent.length - 1
							? ''
							: 'h-4 w-2 rounded-full bg-foreground/50 opacity-100 group-hover/add:opacity-0 transition-all'
					)}
				></div>
				<Button
					class={cn(
						index === listContent.length - 1
							? ''
							: 'group-hover/add:opacity-100 opacity-0 transition-all absolute'
					)}
					disabled={status === 'loading'}
					type="button"
					size="icon"
					variant="secondary"
					on:click={() => addMoreContent((content.order ?? 1) + 1)}><Plus size={16} /></Button
				>
			</div>
		</div>
	{/each}
</div>

<div class=" mt-10 items-center">
	<h1 class="opacity-70">Data yang di koleksi :</h1>
	<div class="flex flex-wrap gap-2 mt-4">
		{#each listTypeUsed as type}
			<div
				class="bg-secondary rounded-full px-4 py-1 text-sm select-none inline-flex gap-2 items-center border hover:opacity-50 transition"
			>
				<svelte:component this={typeToLabel(type).icon} size={14} />
				{typeToLabel(type).label}
			</div>
		{/each}
	</div>
</div>
