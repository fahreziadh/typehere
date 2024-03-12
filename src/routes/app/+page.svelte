<script lang="ts">
	import { ArrowRight, CircleUserRound, MoveRight } from 'lucide-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="py-5 text-2xl font-bold">List Form</div>

<div class="w-full grid grid-cols-3 gap-4">
	{#each data.listForm as dataForm}
		<a
			class="w-full group bg-background transition-all border border-foreground/10 hover:border-foreground/50 active:border-primary"
			href={`/app/form/${dataForm.id}`}
		>
			<div class="flex justify-center items-center h-20 text-foreground font-medium">
				{dataForm.title ? dataForm.title : 'Untitled'}
			</div>
			<div class="border-t p-2 grid grid-cols-5 text-xs px-4">
				<div class="col-span-4 place-self-start">
                    <span class="inline-flex gap-1 items-center font-medium"><CircleUserRound size={14}/>14</span>
                </div>
				<div class="col-span-1 place-self-end scale-0 group-hover:scale-100 transition-all font-medium opacity-50">
                    Detail
				</div>
			</div>
		</a>
	{/each}
</div>
