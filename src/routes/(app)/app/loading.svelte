<script>

	import { fade } from "svelte/transition";

</script>
<div in:fade class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4 animate-pulse">
  {#each Array.from({ length: 12 }) as item}
	<div
		class="w-full group bg-secondary rounded-sm border"
	>
		<div
			class="flex justify-center items-center h-24 p-4"
		></div>
		<div
			class="p-2 grid grid-cols-5 px-4"
		>
			<div class="col-span-4 place-self-start inline-flex gap-4 opacity-70 group-hover:opacity-100">
				<span class="inline-flex gap-1 items-center font-medium"></span>
				<span class="inline-flex gap-1 items-center font-medium"></span>
			</div>
		</div>
	</div>
{/each}

</div>