import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        'lime-accent': '#C6FF00', // Primary accent color
        'dark-black': '#0B0B0B', // Noir
        'dark-gray': '#1A1A1A',  // Gris
        'light-gray': '#F2F2F2', // Gris clair
        'white': '#FFFFFF',      // Blanc
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spin-slow": "spin 10s linear infinite",
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  safelist: [
    // Classes utilisées dans le contenu HTML des landing pages SEO (non scannable par Tailwind JIT)
    // Texte & couleurs
    'text-lime-accent', 'bg-lime-accent', 'text-dark-black',
    'text-white', 'text-gray-300', 'text-gray-400',
    'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl',
    'font-medium', 'font-semibold', 'font-bold', 'font-poppins',
    'italic', 'leading-relaxed',
    // Backgrounds & bordures
    'bg-dark-gray', 'bg-dark-black',
    'border', 'border-2', 'border-gray-700', 'border-lime-accent',
    'rounded-lg', 'rounded-xl', 'rounded-full', 'rounded-2xl',
    'shadow-xl',
    // Layout flex
    'flex', 'flex-col', 'flex-row', 'flex-1', 'flex-shrink-0',
    'items-center', 'items-start', 'justify-between',
    'gap-3', 'gap-4', 'gap-6', 'gap-8',
    'min-w-0',
    // Layout grid
    'grid', 'grid-cols-1', 'grid-cols-2', 'grid-cols-3',
    'md:flex-row', 'md:w-2/5', 'md:grid-cols-2', 'md:grid-cols-3',
    // Tailles
    'w-full', 'w-2/5', 'w-16', 'w-24',
    'h-full', 'h-48', 'h-64', 'h-72',
    // Images
    'object-cover', 'object-top', 'object-center',
    'overflow-hidden', 'aspect-video',
    // Spacing
    'inline-block', 'text-center',
    'p-4', 'p-6', 'p-8',
    'px-4', 'px-6', 'px-8',
    'py-3', 'py-4', 'py-6',
    'my-10', 'my-12',
    'mt-2', 'mt-4', 'mt-6', 'mt-8',
    'mb-2', 'mb-3', 'mb-4', 'mb-6', 'mb-8', 'mb-10', 'mb-12',
    // Utilitaires
    'not-prose',
    'hover:underline', 'hover:opacity-90',
    'transition-opacity',
    'mx-auto',
  ],
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;