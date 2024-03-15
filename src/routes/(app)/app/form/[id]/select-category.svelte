<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import {Popover, PopoverTrigger, PopoverContent} from '$lib/components/ui/popover';
	import { AtSign, Text } from 'lucide-svelte';
</script>

<div>
	<Popover>
		<PopoverTrigger asChild let:builder>
			<Button builders={[builder]}>Text</Button>
		</PopoverTrigger>
		<PopoverContent>
			<div class="flex flex-col">
				<Label class="p-3">Pilih kategori</Label>
				<Button variant="ghost" class="justify-start"><Text size={16} class="mr-2" /> Text</Button>
				<Button variant="ghost" class="justify-start"
					><AtSign class="mr-2" size={16} /> Identitas {`(Email + Nama)`}</Button
				>
			</div>
		</PopoverContent>
	</Popover>
</div>
