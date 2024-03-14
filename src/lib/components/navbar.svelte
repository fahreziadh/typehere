<script>
	import { SignIn, SignOut } from '@auth/sveltekit/components';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import { Button } from './button';

	$: isSignedIn = $page.data.session?.user;
</script>

<div class="bg-background border-b mb-4">
	<div class="flex justify-between items-center h-20 container max-w-[900px]">
		<a href="/" class="hover:scale-95 transition-all active:opacity-50">
			<img src="/logo.webp" alt="Logo" class="w-[114px] h-[43px]" width="144" height="43"/>
		</a>
		<div>
			{#if isSignedIn}
				<div class="flex items-center gap-2">
					<div class="flex flex-col items-end">
						<span class=" hidden sm:block">
							{isSignedIn.email}
						</span>
						<Button
							on:click={() => {
								signOut();
							}}
							size="sm"
							class="w-max"
							variant="secondary"
							type="button">Sign out</Button
						>
					</div>
					<img src={isSignedIn.image} class="w-10 h-10 rounded-full" alt="User Avatar" />
				</div>
			{:else}
				<Button
					class="w-max"
					type="button"
					on:click={() => {
						signIn('google', { callbackUrl: '/app' });
					}}>Sign in</Button
				>
			{/if}
		</div>
	</div>
</div>
