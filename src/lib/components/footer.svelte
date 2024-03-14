<script>
	import { GithubIcon, Twitter } from 'lucide-svelte';
	import Button from './button/button.svelte';
</script>

<div class="mt-10 border-t">
	<div class="container max-w-[900px] h-20 flex flex-col md:flex-row justify-between items-center">
		<div class="text-sm opacity-70">© 2024 Fahrezi Adha - All Right Reserved.</div>
		<div class="flex flex-row items-center gap-2">
			<a href="https://twitter.com/fahreziadhaa" target="_blank"
				><Button size="icon" type="button" variant="outline"
					><Twitter size={18} fill="black" /></Button
				>
			</a>
			<a href="https://github.com/fahreziadh/typehere" target="_blank">
				<Button size="icon" type="button" variant="outline"><GithubIcon size={18} /></Button>
			</a>
		</div>
	</div>
</div>
