// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env?:{
				myKv: KVNamespace
			}
		}
	}
}

declare module '@auth/core/types' {
	interface Session {
		user?: {
			id: string;
		} & DefaultSession['user'];
	}
}

export {};
