import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/sveltekit/providers/google';
import { GOOGLE_ID, GOOGLE_SECRET, AUTH_SECRET, ENVIRONMENT } from '$env/static/private';
import type { SvelteKitAuthConfig } from '@auth/sveltekit';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from './db/db';

export const { handle, signIn, signOut } = SvelteKitAuth(async () => {
	const authOptions: SvelteKitAuthConfig = {
		adapter: DrizzleAdapter(db),
		providers: [Google({ clientId: GOOGLE_ID, clientSecret: GOOGLE_SECRET })],
		secret: AUTH_SECRET,
		session: {
			strategy: 'jwt'
		},
		callbacks: {
			session({ session, token }) {
				session.user.id = token.sub ?? '';
				return session;
			}
		},
		trustHost: true,
		useSecureCookies: ENVIRONMENT === "development" ? false : true,
		debug: true
	};

	return authOptions;
});
