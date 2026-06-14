/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mango: ['MangoGrotesque', 'sans-serif'],
      },
      colors: {
        'chinese-black': 'oklch(21.342% 0.00002 271.152)',
        'absolute-zero': 'oklch(44.945% 0.18517 260.395)',
        'zero-lime': 'oklch(89.096% 0.18502 125.891)',
        platinum: 'oklch(93.951% 0.00257 107.086)',
        boulder: 'oklch(57.61% 0.00007 271.152)',
        oxide: 'oklch(45.8% 0.067 38.5)',
        ink: 'oklch(13.9% 0.002 247.8)',
        smoke: 'oklch(24.7% 0.006 248.2)',
        gallery: 'oklch(86.7% 0.007 95.1)',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      spacing: {
        15: '3.75rem',
        18: '4.5rem',
        25: '6.25rem',
        107.5: '26.875rem',
        155: '38.75rem',
        190: '47.5rem',
      },
      zIndex: {
        60: '60',
        70: '70',
        100: '100',
      },
    },
  },
  plugins: [],
}
