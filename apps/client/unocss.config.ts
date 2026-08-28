import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      app: 'var(--bg-app)',
      panel: 'var(--bg-panel)',
      inset: 'var(--bg-inset)',
      hover: 'var(--bg-hover)',
      active: 'var(--bg-active)',
      line: 'var(--border)',
      'line-strong': 'var(--border-strong)',
      ink: 'var(--ink-1)',
      'ink-2': 'var(--ink-2)',
      'ink-3': 'var(--ink-3)',
      accent: 'var(--accent)',
      'accent-hover': 'var(--accent-hover)',
      'accent-press': 'var(--accent-press)',
      'accent-soft': 'var(--accent-soft)',
      ok: 'var(--ok)',
      'ok-soft': 'var(--ok-soft)',
      warn: 'var(--warn)',
      'warn-soft': 'var(--warn-soft)',
      err: 'var(--err)',
      'err-soft': 'var(--err-soft)',
    },
    borderRadius: {
      'sm': 'var(--radius-sm)',
      'md': 'var(--radius-md)',
      'lg': 'var(--radius-lg)',
      'xl': 'var(--radius-xl)',
      '2xl': 'var(--radius-2xl)',
    },
    boxShadow: {
      'elev-1': 'var(--shadow-elev-1)',
      'elev-2': 'var(--shadow-elev-2)',
      'elev-3': 'var(--shadow-elev-3)',
    },
  },
  shortcuts: {
    // surfaces
    'card': 'bg-panel border border-line rounded-xl',
    'section-label': 'text-11px font-medium text-ink-3 uppercase tracking-wider',

    // buttons
    'btn':
      'inline-flex items-center justify-center gap-6px h-30px px-12px rounded-lg text-13px font-medium select-none transition-colors duration-150',
    'btn-primary': 'btn bg-accent text-white hover:bg-accent-hover active:bg-accent-press',
    'btn-ghost': 'btn bg-transparent text-ink-2 hover:bg-hover hover:text-ink',
    'btn-soft': 'btn bg-inset text-ink-2 hover:bg-active hover:text-ink',
    'btn-danger': 'btn bg-transparent text-err hover:bg-err-soft',
    'icon-btn':
      'inline-flex items-center justify-center h-26px w-26px rounded-lg text-ink-3 transition-colors duration-150 hover:bg-hover hover:text-ink',

    // list rows
    'row':
      'flex items-center gap-8px rounded-lg px-8px h-30px text-13px cursor-pointer transition-colors duration-100',
    'row-hover': 'hover:bg-hover',
    'row-active': 'bg-active text-ink font-medium',

    // layout
    'resize-handle': 'relative flex-shrink-0 cursor-col-resize',
    'divider-line':
      'absolute inset-y-0 left-1/2 w-1px -translate-x-1/2 bg-line transition-colors duration-150 group-hover:bg-accent',

    // inputs
    'field':
      'h-32px w-full px-10px rounded-lg bg-inset border border-line text-13px text-ink placeholder:text-ink-3 outline-none transition-all duration-150 focus:bg-panel focus:border-accent',

    // bits
    'kbd':
      'inline-flex items-center h-16px min-w-16px px-4px rounded-sm bg-inset border border-line text-10px font-medium text-ink-2',
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
