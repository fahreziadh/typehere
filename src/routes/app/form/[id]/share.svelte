<script>
	import { Button } from '$lib/components/button';
	import { Copy } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { fade } from 'svelte/transition';
	import { circOut } from 'svelte/easing';

	export let formId = '';
</script>

<div class="min-h-[80vh]" in:fade={{easing: circOut}}>
	<div
		class="p-6 flex flex-col items-center justify-center text-center rounded-md w-full border min-h-[30vh]"
	>
		<h1 class="text-2xl font-semibold pb-4 pt-3">Bagikan form</h1>
		<p class="my-4 opacity-80">
			Silahkan bagikan link berikut untuk mengundang orang mengisi form/survey kamu
		</p>
		<div class="w-max bg-secondary border pl-4 pr-2 py-2 rounded-full">
			<span>{`https://typehere.fun/${formId}`}</span>
			<Button
				on:click={() => {
					navigator.clipboard.writeText(`https://typehere.fun/${formId}`);
					toast.success('Link berhasil disalin');
				}}
				variant="outline"
				class="ml-4"
				size="icon"><Copy size={14} /></Button
			>
		</div>
	</div>
</div>
