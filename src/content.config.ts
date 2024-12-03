// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

// 2. Define your collection(s)
const testimonialCollection = defineCollection({
  loader: glob({ pattern: "[^_]*.md", base: "./src/content/testimonials" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      preview: z.string(),
      author: z.string(),
      isDraft: z.boolean(),
      profilePicture: image(),
    }),
});

const sessionCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/sessions" }),
  schema: ({ image }) => {
    return z.object({
      title: z.string(),
      preview: z.string(),
      isDraft: z.boolean(),
      date: z.date().transform((str) => new Date(str)),
      champion: z.string(),
      company: z.string().optional(),
      repository: z.string().optional(),
      issueLink: z.string().optional(),
      youtubeId: z.string().optional(),
      thumbnail: image().optional(),
      zoomLink: z.string().optional(),
      zoomPasscode: z.string().optional(),
    });
  },
});

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/blog" }),
  schema: ({ image }) => {
    return z.object({
      title: z.string(),
      date: z.date().transform((str) => new Date(str)),
      author: z.string(),
      profilePicture: image(),
    });
  },
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  testimonials: testimonialCollection,
  sessions: sessionCollection,
  blog: blogCollection,
};
