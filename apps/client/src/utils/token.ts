import type { UserResponse } from '@/api/types'
import { http } from '@/api/http'

export type AuthState = 'unknown' | 'authenticated' | 'anonymous'

let state: AuthState = 'unknown'
let pending: Promise<AuthState> | null = null

export function getAuthState() {
  return state
}

export function checkHaveToken() {
  return state === 'authenticated'
}

export function setToken(_token: string | null) {
  state = _token ? 'authenticated' : 'anonymous'
}

export function cleanToken() {
  state = 'anonymous'
}

function setAuthState(next: AuthState) {
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
        return setAuthState(user?.username ? 'authenticated' : 'anonymous')
      }
      catch {
        return setAuthState('anonymous')
      }
    })()
  }

  return pending
}
