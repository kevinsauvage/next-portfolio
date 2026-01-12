type Testimonial = {
  id: string;
  author: {
    name: string;
    title: string;
    company: string;
    relationship: string;
  };
  content: string;
  date: string;
};

const testimonials: Testimonial[] = [
  {
    id: 'monica-szlatiner-2025-09',
    author: {
      name: 'Monica Szlatiner',
      title: 'Senior Engineering Leader',
      company: 'Decathlon International',
      relationship: 'Direct Manager',
    },
    content:
      "I had the pleasure of working with Kevin, an outstanding engineer and teammate. From day one, he showed a rare ability to take on the most complex technical challenges and find pragmatic solutions. Even while working in a legacy environment, Kevin brought fresh ideas and meaningful improvements to our front-end, raising the bar for quality and performance. Later, when he transitioned to a new team, Kevin's expertise drove some key changes that truly propelled us forward. His ability to adapt quickly, understand the bigger picture, and deliver impact made him an invaluable asset in both contexts. Beyond his technical excellence, Kevin is a fantastic collaborator, generous with his knowledge, supportive of others, and someone who elevates the team around him. I would gladly work with Kevin again in the future, and any organization would be lucky to have him.",
    date: 'September 2025',
  },
  {
    id: 'franck-blumenfeld-2025-09',
    author: {
      name: 'Franck Blumenfeld',
      title: 'Digital Circularity Engineering Leader',
      company: 'Decathlon United',
      relationship: 'Direct Manager',
    },
    content:
      'I had the great pleasure of having Kévin on my team as a front-end developer for our Spanish E-commerce website. I was impressed by his ability to rapidly grow his skills and deepen his understanding of our context, becoming a key asset to our team. It was a natural step to propose that he join the E-commerce CheckOut Decathlon team, as we were convinced he would bring significant value. He quickly became a pillar of his new team, demonstrating a high capacity for adaptation and an ability to thrive in a multicultural and decentralized environment, all while continuing to advance his technical skills. I highly recommend Kévin and wish him the best for the future.',
    date: 'September 2025',
  },
  {
    id: 'teva-porlier-2025-11',
    author: {
      name: 'Teva Porlier',
      title: 'Senior Software Engineer',
      company: 'Decathlon',
      relationship: 'Team Member',
    },
    content:
      "I had the pleasure of working with Kevin and was continually impressed by his technical expertise and adaptability. He's one of those rare developers who can quickly understand a new environment and start adding value from day one. Kevin is deeply passionate about writing high-quality, maintainable code and always pushes for excellence in everything he delivers. He's not afraid to challenge existing foundations when he sees an opportunity for improvement, and always in a constructive, thoughtful way that elevates the entire team. Working alongside him was both inspiring and rewarding, and I would highly recommend Kevin to any team looking for a skilled, driven, and forward-thinking engineer.",
    date: 'November 2025',
  },
];

export default testimonials;
