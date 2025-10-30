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
    title: 'Driving Impact',
    description:
      'I build things that work. My goal is to create solutions that solve real problems and provide a smooth experience for users. I focus on delivering value that makes a difference.',
  },
  {
    slug: 'code-quality',
    icon: Code,
    title: 'Code Quality',
    description:
      "I write clean, maintainable code and keep learning new tools and techniques to build better solutions. Good code saves time and makes everyone's job easier.",
  },
  {
    slug: 'collaborative-growth',
    icon: MessageCircle,
    title: 'Collaborative Growth',
    description:
      'I work best with others. I enjoy teams where we share knowledge, communicate openly, and help each other grow through feedback and collaboration.',
  },
];
