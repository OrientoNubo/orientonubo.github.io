import { defineCollection, z } from 'astro:content';

// Site configuration (personal profile)
const siteCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    title: z.string(),
    profileImage: z.string(),
    bio: z.string(),
    affiliation: z.object({
      institution: z.string(),
      department: z.string(),
      departmentUrl: z.string(),
    }),
    advisors: z.array(z.object({
      name: z.string(),
      institution: z.string(),
      url: z.string(),
    })),
    socialLinks: z.array(z.object({
      icon: z.string(),
      url: z.string(),
      label: z.string(),
    })),
    researchInterests: z.array(z.string()),
    stats: z.object({
      publications: z.string(),
      reviews: z.string(),
      projects: z.string(),
      awards: z.string(),
    }),
  }),
});

const publicationsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    venue: z.string(),
    year: z.number(),
    type: z.enum(['conference', 'journal', 'preprint']).default('conference'),
    pdf: z.string().optional(),
    code: z.string().optional(),
    project: z.string().optional(),
    video: z.string().optional(),
    arxiv: z.string().optional(),
    doi: z.string().optional(),
    bibtex: z.string().optional(),
    image: z.string().optional(),
    highlight: z.boolean().default(false),
    abstract: z.string().optional(),
  }),
});

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    github: z.string().optional(),
    demo: z.string().optional(),
    paper: z.string().optional(),
    featured: z.boolean().default(false),
    status: z.enum(['active', 'completed', 'archived']).default('completed'),
  }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date(),
    updated: z.date().optional(),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    draft: z.boolean().default(false),
    readingTime: z.number().optional(),
  }),
});

export const collections = {
  site: siteCollection,
  publications: publicationsCollection,
  projects: projectsCollection,
  blog: blogCollection,
};
