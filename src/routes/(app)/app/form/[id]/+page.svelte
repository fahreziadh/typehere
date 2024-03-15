<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { type ActionResult } from '@sveltejs/kit';
	import { invalidateAll, replaceState } from '$app/navigation';
	import { applyAction, deserialize } from '$app/forms';
	import { ArrowLeft, BookUser, CheckCheck, Edit2Icon, Rocket, ShareIcon } from 'lucide-svelte';
	import Content from './content.svelte';
	import Result from './result.svelte';
	import { slide } from 'svelte/transition';
	import ModalSuccessPublish from './modal-success-publish.svelte';
	import Share from './share.svelte';

	export let data: PageData;

	let title = data.form?.title;
	let id = data.form?.id;
	let status: 'idle' | 'loading' | 'saved' = 'idle';
	let isPublished = data.form?.isPublished ?? false;
	let showSuccessPublishModal = false;

	$: isDirty = title !== data.form?.title;
	$: section = ($page.state as any).section ?? $page.url.searchParams.get('section') ?? 'detail';

	async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
		console.log(event.currentTarget.action);
		status = 'loading';
		const formData = new FormData(event.currentTarget);
		if (!id) {
			throw new Error('No form ID');
		}
		// add the form ID to the data
		formData.append('id', id);

		const response = await fetch(`${event.currentTarget.action}?/updateForm`, {
			method: 'POST',
			body: formData
		});
		const result: ActionResult = deserialize(await response.text());

		if (result.type === 'success') {
			invalidateAll();
		}

		status = 'saved';
		setTimeout(() => {
			status = 'idle';
		}, 1000);

		applyAction(result);
	}

	async function togglePublish() {
		if (!id) {
			return alert('No form ID');
		}
		status = 'loading';

		const formData = new FormData();

		formData.append('id', id);
		formData.append('isPublished', isPublished ? 'false' : 'true');

		const response = await fetch('?/togglePublished', {
			method: 'POST',
			body: formData
		});

		const result: ActionResult = deserialize(await response.text());

		if (result.type === 'success') {
			isPublished = !isPublished;

			// add fake delay
			await new Promise((resolve) => setTimeout(resolve, 500));

			if (isPublished) {
				showSuccessPublishModal = true;
			}
		}

		status = 'idle';
		applyAction(result);
	}
</script>

<form method="POST" on:submit|preventDefault={handleSubmit}>
	<a href="/app" class="mt-10 w-max">
		<Button variant="link" size="sm"><ArrowLeft size={12} class="mr-1" />Kembali</Button></a
	>
	<div class="mb-10 flex md:flex-row flex-col-reverse justify-between md:items-center gap-4">
		<div class="flex flex-col">
			<div class="flex flex-row gap-4 items-center">
				<div class="grid grid-cols-3 w-full bg-secondary rounded-full p-0.5">
					<Button
						on:click={() => {
							replaceState(`?section=detail`, {
								section: 'detail'
							});
						}}
						variant={section === 'detail' ? 'default' : 'ghost'}
						type="button"><Edit2Icon size={14} class="mr-2" />Detail</Button
					>
					<Button
						variant={section === 'result' ? 'default' : 'ghost'}
						type="button"
						on:click={() => {
							replaceState(`?section=result`, {
								section: 'result'
							});
						}}><BookUser size={14} class="mr-2" />Hasil</Button
					>
					<Button
						variant={section === 'share' ? 'default' : 'ghost'}
						type="button"
						on:click={() => {
							replaceState(`?section=share`, {
								section: 'share'
							});
						}}><ShareIcon size={14} class="mr-2" />Share</Button
					>
				</div>
			</div>
		</div>
		<ModalSuccessPublish bind:open={showSuccessPublishModal} formId={id} />
		<div class="flex flex-row items-center gap-2 justify-end">
			<Button
				disabled={status == 'loading'}
				on:click={togglePublish}
				variant={isPublished ? 'solid' : 'default'}
			>
				{#if isPublished}
					Unpublish
				{:else}
					Publish
				{/if}
				<Rocket
					class={cn('ml-2 transition-all', isPublished ? 'rotate-180' : 'rotate-0')}
					size={16}
				/>
			</Button>
			<Button variant="default" type="submit" disabled={status !== 'idle' || !isDirty}>
				{#if status === 'loading'}
					Loading...
				{:else if status === 'saved'}
					Tersimpan <CheckCheck class="ml-2" size={16} />
				{:else}
					Simpan
				{/if}
			</Button>
		</div>
	</div>
	{#await data.form}
		<p>Loading...</p>
	{:then formData}
		{#if section === 'detail'}
			<div transition:slide={{axis: "y"}} class="flex flex-col pb-6">
				{#if title?.length}
					<label transition:slide={{ axis: 'y' }} for="title" class={cn('text-sm w-max opacity-70')}
						>Judul</label
					>
				{/if}
				<input
					name="title"
					type="text"
					bind:value={title}
					placeholder="Ketik judul form/survey...."
					class="bg-transparent border-none outline-none text-2xl md:text-3xl font-bold"
				/>
			</div>
		{/if}

		<div>
			{#if section === 'detail'}
				<Content data={formData?.contents} formId={formData?.id} />
			{:else if section === 'result'}
				<Result />
			{:else if section === 'share'}
				<Share formId={id} />
			{/if}
		</div>
	{/await}
</form>
