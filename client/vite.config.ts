import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { z } from 'zod'

const productionEnvironmentSchema = z.object({
  VITE_API_URL: z.url(),
  VITE_SITE_URL: z.url(),
  VITE_IS_DEMO_STORE: z.enum(['true', 'false']),
  VITE_LEGAL_OPERATOR_NAME: z.string().trim().min(1),
  VITE_LEGAL_POSTAL_ADDRESS: z.string().trim().min(1),
  VITE_LEGAL_EMAIL: z.email(),
  VITE_SUPPORT_EMAIL: z.email(),
})

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const environment = loadEnv(mode, process.cwd(), '')

  if (command === 'build') {
    const result = productionEnvironmentSchema.safeParse(environment)

    if (!result.success) {
      const details = result.error.issues
        .map((issue) => `- ${issue.path.join('.')}: ${issue.message}`)
        .join('\n')

      throw new Error(`Invalid client build environment:\n${details}`)
    }
  }

  return {
    plugins: [react()],
  }
})
