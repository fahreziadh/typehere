import { redirect, type Handle, type RequestEvent } from '@sveltejs/kit';
import { handle as authenticationHandle } from './lib/auth';
import { sequence } from '@sveltejs/kit/hooks';

async function authorizationHandle({ event, resolve }:{
  event: RequestEvent,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolve: any
}) {
  if (event.url.pathname.startsWith('/app')) {
    const session = await event.locals.auth();
    if (!session) {
      throw redirect(303, '/auth/signin');
    }
  }
  return resolve(event);
}

export const handle: Handle = sequence(authenticationHandle, authorizationHandle)