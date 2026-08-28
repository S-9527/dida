import antfu from '@dida/eslint-config'

export default antfu({ vue: true, unocss: true }).append({
  // NestJS resolves dependency injection tokens at runtime through
  // emitDecoratorMetadata. A type-only import erases the class reference,
  // so value imports must be allowed for providers, controllers and DTOs.
  files: ['apps/api/**/*.{ts,tsx}'],
  rules: {
    '@typescript-eslint/consistent-type-imports': 'off',
  },
})
