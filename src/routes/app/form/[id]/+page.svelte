<script lang="ts">
	import { Button } from '$lib/components/button';
	import { cn } from '$lib/utils';
	import { Plus } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { type ActionResult } from '@sveltejs/kit';
	import { invalidateAll } from '$app/navigation';
	import { applyAction, deserialize } from '$app/forms';
	import { CheckCheck } from 'lucide-svelte';
	import { fade, fly, blur } from 'svelte/transition';
	import { toast } from 'svelte-sonner';

	export let data: PageData;

	let title = data.form?.title;
	let id = data.form?.id;
	let status: 'idle' | 'loading' | 'saved' = 'idle';

	$: isDirty = title !== data.form?.title;

	async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
		status = 'loading';
		const formData = new FormData(event.currentTarget);
		if (!id) {
			throw new Error('No form ID');
		}
		// add the form ID to the data
		formData.append('id', id);

		const response = await fetch(event.currentTarget.action, {
			method: 'POST',
			body: formData

		});
		const result: ActionResult = deserialize(await response.text());

		if (result.type === 'success') {
			invalidateAll();
		}

		status = 'saved';
		toast.success("Berhasil menyimpan data!")
		setTimeout(() => {
			status = 'idle';
		}, 1000);

		applyAction(result);
	}
</script>

<form method="POST" on:submit|preventDefault={handleSubmit}>
	<div class="mt-5 mb-10 flex justify-between items-center">
		<div>
			<a href="/app" class="mr-2"> <Button variant="secondary">Kembali</Button></a> Detail Form
		</div>
		<Button variant="default" type="submit" disabled={status !== 'idle' || !isDirty}>
			{#if status === 'loading'}
			Loading...
			{:else if status ==="saved"}
			Tersimpan <CheckCheck class="ml-2" size={16}/>
			{:else}
			Simpan
			{/if}
		</Button>
	</div>
	{#await data.form}
		<p>Loading...</p>
	{:then formData}
		<div class="flex flex-col">
			<label
				for="title"
				class={cn('text-sm transition-all w-max', title?.length ? 'opacity-70' : '-mb-4 opacity-0')}
				>Judul form</label
			>
			<input
				name="title"
				type="text"
				bind:value={title}
				placeholder="Ketik judul form/survey...."
				class="bg-transparent border-none outline-none text-3xl font-bold"
			/>
		</div>

		<div
			class="rounded-md aspect-[16/10] border border-border mt-8 mb-4 shadow-sm flex items-center justify-center"
		>
			<Button size="lg" variant="outline"><Plus class="mr-2" size={18} />Tambahkan</Button>
		</div>
		<div class="flex items-center flex-row justify-center gap-2 mt-4">
			<Button variant="outline">Prev</Button>
			<Button variant="outline">Next</Button>
		</div>
	{/await}
</form>
