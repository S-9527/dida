export function validatePasswordSame(password: string, value: string): boolean {
  return value === password;
}

export function validateUsernameLength(username: string) {
  return username.length > 5 && username.length < 25;
}

export function validatePasswordLength(username: string) {
  return username.length > 6 && username.length < 30;
}
