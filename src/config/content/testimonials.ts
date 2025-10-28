type Testimonial = {
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
];

export default testimonials;
