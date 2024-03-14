<script lang="ts">
	import Button from '$lib/components/button/button.svelte';
	import { Copy } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { sineInOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';
	export let formId = '';
	export let open = false;
</script>

{#if open}
	<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
		<div
			transition:fade={{ duration: 300 }}
			class="fixed inset-0 bg-foreground/70 backdrop-blur-sm"
		></div>
		<div
			class="fixed inset-0 z-10 w-screen overflow-y-auto"
			transition:fly={{ y: 200, easing: sineInOut, duration: 300 }}
		>
			<div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
				<div
					class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
				>
					<div class="p-6 flex flex-col items-center justify-center text-center">
						<h1 class="text-2xl font-semibold pb-4 pt-3">Yeayy! Form di publish 🎉</h1>
						<p class="my-4 opacity-80">
							Silahkan bagikan link berikut untuk mengundang orang mengisi form/survey kamu
						</p>
						<div class="w-max bg-secondary border pl-4 pr-2 py-2 rounded-full">
							<span>{`https://typehere.fun/${formId}`}</span>
							<Button
								on:click={() => {
									navigator.clipboard.writeText(`https://typehere.fun/${formId}`);
                  toast.success('Link berhasil disalin')
								}}
								variant="outline"
								class="ml-4"
								size="icon"><Copy size={14} /></Button
							>
						</div>
					</div>
					<div class="bg-secondary px-4 py-3 flex items-center justify-center">
						<Button
							on:click={() => {
								open = false;
							}}>Kembali</Button
						>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
