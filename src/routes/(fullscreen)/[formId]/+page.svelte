<script lang="ts">
	import Button from '$lib/components/button/button.svelte';
	import { ChevronRight, ChevronLeft } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { slide } from 'svelte/transition';
	import { sineOut } from 'svelte/easing';
	import anime from 'animejs';

	export let data: PageData;
	const form = data.dataForm;
	const listContent =
		form?.contents.map((item) => {
			const content = JSON.parse(item.content as string) as {
				title: string;
				type: string;
				description: string;
				answer: string;
			};
			return { ...item, content, isOptional: item.isOptional ?? false };
		}) ?? [];

	let selectedContentIndex = 0;
	let selectedContent = listContent[selectedContentIndex];

	async function onNextClick() {
		if (selectedContentIndex === listContent.length - 1) {
			alert('Selesai');
			// Do something
			return;
		}

		anime
			.timeline({ loop: false })
			.add({
				targets: '#container',
				translateX: [0, -200],
				opacity: [1, 0],
				easing: 'easeInOutBack',
				duration: 700
			})
			.add({
				targets: '#container',
				translateX: [300, 0],
				opacity: [0, 1],
				easing: 'easeOutExpo',
				duration: 600
			});

		setTimeout(() => {
			selectedContentIndex++;
			selectedContent = listContent[selectedContentIndex];

			updateProgress();
		}, 500);
	}

	async function onPreviousClick() {
		if (selectedContentIndex === 0) return;

		anime
			.timeline({ loop: false })
			.add({
				targets: '#container',
				translateX: [0, 200],
				opacity: [1, 0],
				easing: 'easeInOutBack',
				duration: 700
			})
			.add({
				targets: '#container',
				translateX: [-300, 0],
				opacity: [0, 1],
				easing: 'easeOutExpo',
				duration: 600
			});

		setTimeout(() => {
			selectedContentIndex--;
			selectedContent = listContent[selectedContentIndex];

			updateProgress();
		}, 500);
	}

	function updateProgress() {
		const progress = ((selectedContentIndex + 1) / listContent.length) * 100;

		anime.timeline({ loop: false }).add({
			targets: '#progress',
			width: progress + '%',
			height: progress == 100 ? '28px' : '8px',
			easing: 'easeOutQuint',
			duration: 1000
		});
		const progressMessageSelector = document.getElementById('progress-message');
		if (!progressMessageSelector) {
			return;
		}
		if (progress == 100) {
			anime.timeline({ loop: false }).add({
				targets: progressMessageSelector,
				opacity: 1,
				easing: 'easeOutQuint',
				duration: 1000
			});
		} else {
			anime.timeline({ loop: false }).add({
				targets: progressMessageSelector,
				opacity: 0,
				easing: 'easeOutQuint',
				duration: 1000
			});
		}
	}
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
	<title>Typehere - {form?.title}</title>
</svelte:head>

<div
	id="progress"
	class="bg-foreground text-background fixed top-0 flex items-center justify-center w-0"
>
	<span style="opacity: 0;" id="progress-message" class="absolute">Pertanyaan terakhir</span>
</div>
<div
	class="min-h-screen max-h-screen max-w-[100vw] overflow-hidden flex justify-center p-20 flex-col scrollbar-thin scrollbar-webkit"
>
	<div id="container" class="w-full">
		<h1 class="text-4xl font-medium">
			{selectedContent.content.title ? selectedContent.content.title : 'Untitled'}
		</h1>
		<h1 class="text-xl opacity-50 mt-2">{selectedContent.content.description}</h1>
		<!-- svelte-ignore a11y-autofocus -->
		<textarea
			spellcheck="false"
			name="title"
			autofocus={true}
			bind:value={selectedContent.content.answer}
			placeholder="Tulis jawaban kamu disini..."
			class="bg-transparent mt-5 border-none outline-none w-full text-base md:text-lg lg:text-xl xl:text-2xl font-medium h-[100px] min-h-[40px] scrollbar-thin scrollbar-webkit"
		/>
	</div>
	{#if selectedContentIndex < listContent.length - 1}
		<div class="flex flex-row gap-4 items-center mt-4">
			<Button size="lg" class="w-max" on:click={onNextClick}
				>Lanjut <ChevronRight size={20} class="ml-2" /></Button
			>
			<span>{selectedContentIndex + 1} / {listContent.length}</span>
		</div>
	{:else if selectedContentIndex === listContent.length - 1}
		<div class="flex flex-row gap-4 items-center mt-4  mt-4">
			<Button size="lg" class="w-max" on:click={onNextClick}>Selesai</Button>
			<span>5/5</span>
		</div>
	{/if}

	{#if selectedContentIndex > 0}
		<div transition:slide={{ axis: 'y', easing: sineOut }}>
			<Button class="w-max px-0 mt-2" variant="link" on:click={onPreviousClick}
				><ChevronLeft size={16} class="mr-1" /> Kembali</Button
			>
		</div>
	{/if}
</div>
