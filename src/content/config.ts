// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// 2. Define your collection(s)
const testimonialCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    preview: z.string(),
    author: z.string(),
    isDraft: z.boolean(),
    profilePicture: z.string(),
  }),
});

const sessionCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    preview: z.string(),
    isDraft: z.boolean(),
    date: z.date().transform((str) => new Date(str)),
    champion: z.string(),
    company: z.string().optional(),
    repository: z.string().optional(),
    issueLink: z.string().optional(),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  testimonials: testimonialCollection,
  sessions: sessionCollection,
};
