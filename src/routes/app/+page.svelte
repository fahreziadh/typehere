<script lang="ts">
	import { CircleUserRound, MessageCircleQuestion } from 'lucide-svelte';
	import type { PageData } from './$types';
	import Headers from '$lib/components/headers.svelte';

	export let data: PageData;
</script>

<Headers title="List Form" />
{JSON.stringify(data.form)}
<div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
	{#await data.listForm}
		Loading...
	{:then listForm}
		{#each listForm as dataForm}
			<a
				class="w-full group bg-background rounded-sm transition-all border border-foreground/10 hover:border-foreground/30 active:scale-95 active:opacity-50"
				href={`/app/form/${dataForm.id}`}
			>
				<div
					class="flex justify-center items-center h-20 text-foreground font-medium md:text-base text-sm"
				>
					{dataForm.title ? dataForm.title : 'Untitled'}
				</div>
				<div
					class="border-t group-hover:border-foreground/30 transition-all p-2 grid grid-cols-5 text-xs px-4"
				>
					<div
						class="col-span-4 place-self-start inline-flex gap-4 opacity-70 group-hover:opacity-100"
					>
						<span class="inline-flex gap-1 items-center font-medium"
							><CircleUserRound size={14} />14</span
						>
						<span class="inline-flex gap-1 items-center font-medium"
							><MessageCircleQuestion size={14} />14</span
						>
					</div>
					<div
						class="col-span-1 place-self-end transition-all font-medium opacity-20 group-hover:opacity-100"
					>
						Detail
					</div>
				</div>
			</a>
		{/each}
	{:catch error}
		Cannot load list form
	{/await}
</div>
