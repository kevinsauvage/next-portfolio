import { CheckCircle, Code, MessageCircle } from 'lucide-react';

type Passion = {
  slug: string;
  icon: typeof CheckCircle;
  title: string;
  description: string;
};

export const passions: Passion[] = [
  {
    slug: 'driving-impact',
    icon: CheckCircle,
    title: 'Simple solutions',
    description: 'I like being challenged, and I like finding the simplest solution to a problem.',
  },
  {
    slug: 'code-quality',
    icon: Code,
    title: 'A clean codebase',
    description:
      'I care about keeping a codebase clean. It makes the next change easier, for me and for whoever comes after me.',
  },
  {
    slug: 'collaborative-growth',
    icon: MessageCircle,
    title: 'Working with people',
    description:
      'I work best with others. I like teams where people share what they know and give each other honest feedback.',
  },
];
