<script lang="ts">
	import { sineOut } from 'svelte/easing';
	import { fade, fly, slide } from 'svelte/transition';
	import type { PageData } from '../$types';
	import { Button } from '$lib/components/ui/button';
	import { ChevronRight, ChevronLeft } from 'lucide-svelte';

	export let data: PageData;
	$: listContents = data.form?.contents
		.map((c) => {
			const content = JSON.parse((c.content as string) ?? '{}') as {
				title: string;
				type: string;
				description: string;
			};

			return {
				...c,
				content
			};
		})
		.filter(
			(c) =>
				c.content.type !== 'greetings' &&
				c.content.type !== 'email' &&
				c.content.type !== 'fullname' &&
				c.content.title
		);
	$: selectedContentIndex = 0;
	$: selectedContent = listContents?.[selectedContentIndex];
</script>

<div in:fade={{ easing: sineOut }} class="min-h-[70vh]">
	{#if selectedContent}
		<div>
			<div class="flex flex-row items-center gap-2 justify-end">
				<label for="" class="font-mono text-foreground/50 px-4 text-sm py-2 rounded-full bg-secondary"
					><span>{selectedContentIndex + 1 + '/' + listContents?.length}</span></label
				>
				<Button on:click={() => (selectedContentIndex -= 1)} disabled={selectedContentIndex === 0}
					><ChevronLeft size={14} /></Button
				>
				<Button
					on:click={() => (selectedContentIndex += 1)}
					disabled={selectedContentIndex === (listContents?.length ?? 0) - 1}
					><ChevronRight size={14} /></Button
				>
			</div>
			<h1 class="mt-4 text-2xl flex flex-row items-center">
				{selectedContentIndex + 1}. {selectedContent.content.title}
			</h1>
			<div class="flex flex-col mt-4 divide-y border rounded-md">
				{#each selectedContent.answers as answer, index (answer.id)}
					<div in:fade class="py-4 px-6 hover:bg-secondary transition">
						<div class="text-sm">
							{answer.fullName ? answer.fullName : "Tanpa nama"} <span class="opacity-60 text-xs">{answer.email ? ` - `+answer.email : ""}</span>
						</div>
						<div class="font-medium mt-1">
							{answer.answer}
						</div>
					</div>
				{/each}
				{#if selectedContent.answers.length === 0}
					<p class="p-4">Belum ada respon </p>
				{/if}
			</div>
		</div>
	{:else}
		<p>Belum ada partisipan</p>
	{/if}
</div>
