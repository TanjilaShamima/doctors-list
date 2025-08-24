import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  PATIENT_API_URL: z.string().url().optional(),
  PATIENT_API_USERNAME: z.string().optional(),
  PATIENT_API_PASSWORD: z.string().optional(),
});

// Validate environment variables at runtime
function validateEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    console.error('❌ Invalid environment variables:', error);
    throw new Error('Invalid environment configuration');
  }
}

export const env = validateEnv();
export type Env = z.infer<typeof envSchema>;