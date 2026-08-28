import { describe, expect, it } from 'vitest'
import {
  PASSWORD_MAX,
  PASSWORD_MIN,
  USERNAME_MAX,
  USERNAME_MIN,
  validatePasswordLength,
  validatePasswordSame,
  validateUsernameLength,
} from '../validator'

describe('validator', () => {
  describe('validator username', () => {
    it('should validate a normal username', () => {
      expect(validateUsernameLength('cuixiaorui')).toBe(true)
    })

    it(`accepts the minimum length of ${USERNAME_MIN}`, () => {
      expect(validateUsernameLength('123')).toBe(true)
    })

    it('rejects usernames shorter than the minimum', () => {
      expect(validateUsernameLength('ab')).toBe(false)
    })

    it(`accepts the maximum length of ${USERNAME_MAX}`, () => {
      expect(validateUsernameLength('0'.repeat(USERNAME_MAX))).toBe(true)
    })

    it('rejects usernames longer than the maximum', () => {
      expect(validateUsernameLength('0'.repeat(USERNAME_MAX + 1))).toBe(false)
    })
  })

  describe('validator password', () => {
    it('should validate a normal password', () => {
      expect(validatePasswordLength('cuixiaorui')).toBe(true)
    })

    it(`accepts the minimum length of ${PASSWORD_MIN}`, () => {
      expect(validatePasswordLength('123456')).toBe(true)
    })

    it('rejects passwords shorter than the minimum', () => {
      expect(validatePasswordLength('12345')).toBe(false)
    })

    it(`accepts the maximum length of ${PASSWORD_MAX}`, () => {
      expect(validatePasswordLength('0'.repeat(PASSWORD_MAX))).toBe(true)
    })

    it('rejects passwords longer than the maximum', () => {
      expect(validatePasswordLength('0'.repeat(PASSWORD_MAX + 1))).toBe(false)
    })
  })

  describe('validator password same', () => {
    it('should return true when passwords match', () => {
      expect(validatePasswordSame('cuixiaorui', 'cuixiaorui')).toBe(true)
    })

    it('should return false when passwords differ', () => {
      expect(validatePasswordSame('cuixiaorui', 'different')).toBe(false)
    })
  })
})
