<script lang="ts">
	import { Button } from '$lib/components/button';
	import { cn } from '$lib/utils';
	import { Plus } from 'lucide-svelte';
	// import type { PageData } from './$types';

	// export let data: PageData;
	let title = '';
</script>

<div class="mt-5 mb-10">
	<a href="/app" class="mr-2"> <Button variant="secondary">Kembali</Button></a> Detail Form
</div>
<div class="flex flex-col">
	<label
		for="title"
		class={cn('text-sm transition-all w-max', title.length ? 'opacity-70' : '-mb-4 opacity-0')}
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