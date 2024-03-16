<script lang="ts">
	import { CircleUserRound, MessageCircleQuestion, Plus } from 'lucide-svelte';
	import type { PageData } from './$types';
	import Headers from '$lib/components/headers.svelte';
	import { Button } from '$lib/components/ui/button';
	import EmptyForm from './empty-form.svelte';
	import Loading from './loading.svelte';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { page } from '$app/stores';
	import dayjs from 'dayjs';

	export let data: PageData;
	$: dataForms = data.dataForms;
	$: pageState = parseInt($page.url.searchParams.get('page') || '1');
</script>

<div in:fly={{ x: -40, easing: quintOut, opacity: 0, duration: 500 }}>
	<Headers class="justify-between flex">
		<h1>List form</h1>
		<a href="/app/form/create" data-sveltekit-preload-data="off">
			<Button><Plus class="mr-2" size={16} />Tambah</Button>
		</a>
	</Headers>
	{#await dataForms}
		<Loading />
	{:then listForms}
		{#if listForms.listForms.length === 0}
			<EmptyForm />
		{/if}
		<div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
			{#each listForms.listForms as dataForm}
				<a
					data-sveltekit-preload-data="off"
					class="w-full group bg-background rounded-sm transition-all h-max border border-foreground/10 hover:border-foreground/30 active:scale-95 active:opacity-50"
					href={`/app/form/${dataForm.id}`}
				>
					<div class="flex items-center h-20 text-foreground font-medium md:text-base text-sm p-4">
						{dataForm.title ? dataForm.title : 'Untitled'}
					</div>
					<div
						class="border-t group-hover:border-foreground/30 transition-all p-2 grid grid-cols-5 text-xs px-4"
					>
						<div
							class="col-span-4 place-self-start inline-flex gap-4 opacity-70 group-hover:opacity-100"
						>
							{#if dayjs().diff(dayjs(dataForm.createdAt+"+00:00"), 'hour') < 24}
								{dayjs(dataForm.createdAt+"+00:00").fromNow()}
							{:else}
								{dayjs(dataForm.createdAt+"+00:00").format('MMM DD')}
							{/if}
						</div>
						<div
							class="col-span-1 place-self-end transition-all font-medium opacity-20 group-hover:opacity-100"
						>
							{#if dataForm.isPublished}
								<span class="inline-flex gap-1 items-center text-emerald-600">Published</span>
							{:else}
								<span class="inline-flex gap-1 items-center">Draft</span>
							{/if}
						</div>
					</div>
				</a>
			{/each}
		</div>

		<!-- Pagination -->
		<div class="mt-6 flex flex-row gap-2 justify-center">
			{#if listForms.pagination.totalPages > 1}
				{#each Array.from({ length: listForms.pagination.totalPages }) as item, index}
					<a
						href={index + 1 === listForms.pagination.page ? undefined : `?page=${index + 1}`}
						data-sveltekit-preload-data="hover"
					>
						<Button
							disabled={index + 1 === pageState}
							size="icon"
							variant={index + 1 === pageState ? 'solid' : 'secondary'}
							class="rounded-md">{index + 1}</Button
						>
					</a>
				{/each}
			{/if}
		</div>
	{:catch error}
		Cannot load list form
	{/await}
</div>
