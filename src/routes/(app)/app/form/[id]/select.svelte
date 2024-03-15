<script>
	import { cn } from '$lib/utils';
	export let open = false;
</script>

<div class="relative">
	<button
		on:click={() => {
			open = !open;
		}}
		type="button"
		class="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
		aria-expanded="false"
	>
		<span>Solutions</span>
		<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
			<path
				fill-rule="evenodd"
				d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
				clip-rule="evenodd"
			/>
		</svg>
	</button>

	<!--
    Flyout menu, show/hide based on flyout menu state.

    Entering: "transition ease-out duration-200"
      From: "opacity-0 translate-y-1"
      To: "opacity-100 translate-y-0"
    Leaving: "transition ease-in duration-150"
      From: "opacity-100 translate-y-0"
      To: "opacity-0 translate-y-1"
  -->
	<div
		class={cn(
			'absolute z-10 mt-5 flex max-w-max transition ease-out duration-200 px-4',
			open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
		)}
	>
		<div
			class="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5"
		>
			<div class="p-4">
				<div class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
					<div
						class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"
					>
						<svg
							class="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
							/>
						</svg>
					</div>
					<div>
						<a href="#" class="font-semibold text-gray-900">
							Analytics
							<span class="absolute inset-0"></span>
						</a>
						<p class="mt-1 text-gray-600">Get a better understanding of your traffic</p>
					</div>
				</div>
				<div class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
					<div
						class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"
					>
						<svg
							class="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
							/>
						</svg>
					</div>
					<div>
						<a href="#" class="font-semibold text-gray-900">
							Engagement
							<span class="absolute inset-0"></span>
						</a>
						<p class="mt-1 text-gray-600">Speak directly to your customers</p>
					</div>
				</div>
				<div class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
					<div
						class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"
					>
						<svg
							class="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"
							/>
						</svg>
					</div>
					<div>
						<a href="#" class="font-semibold text-gray-900">
							Security
							<span class="absolute inset-0"></span>
						</a>
						<p class="mt-1 text-gray-600">Your customers&#039; data will be safe and secure</p>
					</div>
				</div>
				<div class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
					<div
						class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"
					>
						<svg
							class="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
							/>
						</svg>
					</div>
					<div>
						<a href="#" class="font-semibold text-gray-900">
							Integrations
							<span class="absolute inset-0"></span>
						</a>
						<p class="mt-1 text-gray-600">Connect with third-party tools</p>
					</div>
				</div>
				<div class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
					<div
						class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"
					>
						<svg
							class="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
							/>
						</svg>
					</div>
					<div>
						<a href="#" class="font-semibold text-gray-900">
							Automations
							<span class="absolute inset-0"></span>
						</a>
						<p class="mt-1 text-gray-600">Build strategic funnels that will convert</p>
					</div>
				</div>
			</div>
			<div class="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
				<a
					href="#"
					class="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
				>
					<svg
						class="h-5 w-5 flex-none text-gray-400"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z"
							clip-rule="evenodd"
						/>
					</svg>
					Watch demo
				</a>
				<a
					href="#"
					class="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
				>
					<svg
						class="h-5 w-5 flex-none text-gray-400"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
							clip-rule="evenodd"
						/>
					</svg>
					Contact sales
				</a>
			</div>
		</div>
	</div>
</div>
