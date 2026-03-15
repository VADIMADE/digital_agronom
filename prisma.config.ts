import { loadEnvConfig } from '@next/env'
import { defineConfig } from 'prisma/config'

// Загружаем переменные из .env
loadEnvConfig(process.cwd())

export default defineConfig({
  // schema - просто строка с путем к схеме
  schema: 'prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL!,
  }
})