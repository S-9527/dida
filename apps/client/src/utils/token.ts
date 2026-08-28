import type { UserResponse } from '@/api/types'
import { http } from '@/api/http'

export type AuthState = 'unknown' | 'authenticated' | 'anonymous'

let state: AuthState = 'unknown'
let pending: Promise<AuthState> | null = null

export function markAuthenticated() {
  state = 'authenticated'
}

export function markAnonymous() {
  state = 'anonymous'
}

function applyAuthState(next: AuthState) {
  state = next
  pending = null
  return next
}

/**
 * Verifies the httpOnly cookie session with the server and caches the result.
 * Resolves to 'authenticated' when a valid session exists, otherwise 'anonymous'.
 */
export async function ensureAuthState(): Promise<AuthState> {
  if (state !== 'unknown')
    return state

  if (!pending) {
    pending = (async () => {
      try {
        const user = await http.get<UserResponse, UserResponse>('/users/me')
        return applyAuthState(user?.username ? 'authenticated' : 'anonymous')
      }
      catch {
        return applyAuthState('anonymous')
      }
    })()
  }

  return pending
}
