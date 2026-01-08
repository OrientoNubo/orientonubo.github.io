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

const servicesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    title_zh: z.string().optional(),
    organization: z.string(),
    description: z.string().optional(),
    description_zh: z.string().optional(),
    image: z.string().optional(),
    order: z.number().default(0),
  }),
});

const awardsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    title_zh: z.string().optional(),
    organization: z.string(),
    year: z.string(),
    description: z.string().optional(),
    description_zh: z.string().optional(),
    image: z.string().optional(),
    pinned: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const certificatesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    title_zh: z.string().optional(),
    issuer: z.string(),
    date: z.string(),
    url: z.string().optional(),
    image: z.string().optional(),
    pinned: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const publicationsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    title_zh: z.string().optional(),
    authors: z.array(z.object({
      name: z.string(),
      bold: z.boolean().default(false),
    })),
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
    pinned: z.boolean().default(false),
    firstAuthor: z.boolean().default(false),
    correspondingAuthor: z.boolean().default(false),
    coAuthor: z.boolean().default(false),
    abstract: z.string().optional(),
    abstract_zh: z.string().optional(),
  }),
});

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    title_zh: z.string().optional(),
    description: z.string(),
    description_zh: z.string().optional(),
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

const experienceCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    title_zh: z.string().optional(),
    organization: z.string(),
    type: z.enum(['work', 'intern', 'collab']).default('work'),
    startDate: z.string(),
    endDate: z.string().optional(),
    description: z.string(),
    description_zh: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    url: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date(),
    updated: z.union([z.date(), z.literal('')]).optional().transform(val => val === '' ? undefined : val),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    draft: z.boolean().default(false),
    pinned: z.boolean().default(false),
    readingTime: z.number().nullable().optional().transform(val => val ?? undefined),
  }),
});

// CV configuration
const cvCollection = defineCollection({
  type: 'data',
  schema: z.object({
    pdfFile: z.string().optional(),
    education: z.array(z.object({
      degree: z.string(),
      school: z.string(),
      department: z.string(),
      period: z.string(),
      description: z.string().optional(),
    })),
    skills: z.object({
      programming: z.array(z.string()),
      research: z.array(z.string()),
      tools: z.array(z.string()),
    }),
  }),
});

export const collections = {
  site: siteCollection,
  services: servicesCollection,
  awards: awardsCollection,
  certificates: certificatesCollection,
  publications: publicationsCollection,
  projects: projectsCollection,
  experience: experienceCollection,
  blog: blogCollection,
  cv: cvCollection,
};
