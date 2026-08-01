import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import viteReact from '@vitejs/plugin-react'

type VitePluginContext = {
  environment?: {
    name?: string
  }
}

function cloudflareWorkersClientShim() {
  const moduleId = '\0cloudflare-workers-client-shim'

  return {
    name: 'cloudflare-workers-client-shim',
    enforce: 'pre' as const,
    resolveId(id: string) {
      const environmentName = (this as unknown as VitePluginContext).environment?.name

      if (
        id === 'cloudflare:workers' &&
        environmentName !== 'ssr'
      ) {
        return moduleId
      }
    },
    load(id: string) {
      if (id === moduleId) {
        return 'export const env = {}'
      }
    },
  }
}

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    cloudflareWorkersClientShim(),
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tanstackStart(),
    tailwindcss(),
    viteReact(),
  ],
})

export default config
