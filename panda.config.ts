import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  preflight: true,
  include: ['./src/**/*.{js,jsx,ts,tsx,vue}'],
  jsxFramework: 'react',
  outdir: 'styled-system',
})