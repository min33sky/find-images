import { z } from 'zod';

const Environment = z.object({
  PEXELS_API_KEY: z.string(),
  NEXT_PUBLIC_PEXELS_API_KEY: z.string(),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof Environment> {}
  }
}
