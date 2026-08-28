export const USERNAME_MIN = 3
export const USERNAME_MAX = 25
export const PASSWORD_MIN = 6
export const PASSWORD_MAX = 30

export function validatePasswordSame(password: string, value: string): boolean {
  return value === password
}

export function validateUsernameLength(username: string) {
  return username.length >= USERNAME_MIN && username.length <= USERNAME_MAX
}

export function validatePasswordLength(password: string) {
  return password.length >= PASSWORD_MIN && password.length <= PASSWORD_MAX
}
