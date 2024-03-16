<script lang="ts">
	import { Button } from '$lib/components/ui/button/index';
	import { ChevronRight, ChevronLeft } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { slide } from 'svelte/transition';
	import { sineOut } from 'svelte/easing';
	import anime from 'animejs';
	import type { ActionResult } from '@sveltejs/kit';
	import { applyAction, deserialize } from '$app/forms';
	import { goto } from '$app/navigation';

	let loading = false;
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
			onSendAnswer();
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
		loading = true;
		setTimeout(() => {
			selectedContentIndex++;
			selectedContent = listContent[selectedContentIndex];
			loading = false;
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
		loading = true;
		setTimeout(() => {
			selectedContentIndex--;
			selectedContent = listContent[selectedContentIndex];
			loading = false;
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
		const answerSelector = document.getElementById('answer');

		answerSelector?.focus();
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

	async function onSendAnswer() {
		loading = true;

		const formData = new FormData();

		formData.append(
			'answers',
			JSON.stringify(
				listContent.map((item) => {
					return {
						formContentId: item.id,
						answer: item.content.answer,
						type: item.content.type
					};
				})
			)
		);

		const response = await fetch(`?/answerForm`, {
			method: 'POST',
			body: formData
		});

		const result: ActionResult = deserialize(await response.text());

		if (result.type === 'success') {
			goto('/thanks');
		}

		loading = false;

		applyAction(result);
	}

	$: isGreetings = selectedContent.content.type === 'greetings';
	$: isNextDisabled =
		loading ||
		(!selectedContent.isOptional && !selectedContent.content.answer) ||
		(selectedContent.content.type === 'email' &&
			!String(selectedContent.content.answer)
				.toLowerCase()
				.match(
					/^[^\s@]+@[^\s@]+\.[^\s@]+$/
				))
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
	<title>Typehere - {form?.title}</title>
</svelte:head>

{#if listContent.length > 0}
	<div
		id="progress"
		class="bg-foreground text-background fixed top-0 flex items-center justify-center w-0"
	>
		<span style="opacity: 0;" id="progress-message" class="absolute">Pertanyaan terakhir</span>
	</div>
	<div
		class="min-h-screen max-h-screen relative max-w-[100vw] overflow-hidden flex justify-center px-10 md:px-14 lg:px-16 xl:px-24 2xl:px-28 flex-col scrollbar-thin scrollbar-webkit"
	>
		<span class="text-xl opacity-50 fixed top-10 left-0 px-10 md:px-14 lg:px-16 xl:px-24 2xl:px-28"
			>{selectedContentIndex + 1} / {listContent.length}</span
		>

		<div id="container" class="w-full">
			<h1 class="text-xl md:text-2xl xl:text-4xl font-medium mt-4">
				{selectedContent.content.title ? selectedContent.content.title : 'Untitled'}
			</h1>
			<h1 class="text-sm md:text-base lg:text-lg opacity-50 mt-1">
				{selectedContent.content.description ? `~ ${selectedContent.content.description}` : ''}
				{#if !isGreetings}
					{` ${selectedContent.isOptional ? '(Opsional)' : '(Wajib diisi)'}`}
				{/if}
			</h1>
			<!-- svelte-ignore a11y-autofocus -->
			{#if selectedContent.content.type === 'text' || selectedContent.content.type === 'fullname'}
				<textarea
					spellcheck="false"
					autofocus={true}
					bind:value={selectedContent.content.answer}
					placeholder="Tulis jawaban kamu disini..."
					class="bg-transparent mt-5 border-none outline-none w-full text-lg md:text-xl lg:text-2xl xl:text-2xl font-medium h-[100px] min-h-[40px] scrollbar-thin scrollbar-webkit"
				/>
			{/if}

			<!-- svelte-ignore a11y-autofocus -->
			{#if selectedContent.content.type === 'email'}
				<input
					type="email"
					autofocus={true}
					bind:value={selectedContent.content.answer}
					placeholder="Masukkan alamat email kamu..."
					class="bg-transparent mt-5 border-none outline-none w-full text-lg md:text-xl lg:text-2xl xl:text-2xl font-medium h-12"
				/>
			{/if}
		</div>
		{#if selectedContentIndex < listContent.length - 1}
			<div class="flex flex-row gap-4 items-center mt-4">
				<Button
					disabled={isGreetings ? false : isNextDisabled}
					size="lg"
					class="w-max"
					on:click={onNextClick}>Lanjut <ChevronRight size={20} class="ml-2" /></Button
				>
			</div>
		{:else if selectedContentIndex === listContent.length - 1}
			<div class="flex flex-row gap-4 items-center mt-4">
				<Button
					variant={selectedContentIndex + 1 === listContent.length ? 'solid' : 'default'}
					disabled={isNextDisabled}
					size="lg"
					class="w-max"
					on:click={onNextClick}
				>
					{loading ? 'Mengirim jawaban...' : 'Selesai & Kirim Jawaban'}</Button
				>
			</div>
		{/if}

		{#if selectedContentIndex > 0}
			<div transition:slide={{ axis: 'y', easing: sineOut }}>
				<Button disabled={loading} class="w-max px-0 mt-2" variant="link" on:click={onPreviousClick}
					><ChevronLeft size={16} class="mr-1" /> Kembali</Button
				>
			</div>
		{/if}
	</div>
{:else}
	<div class="flex items-center justify-center h-screen">
		<p>Form tidak ditemukan</p>
	</div>
{/if}
