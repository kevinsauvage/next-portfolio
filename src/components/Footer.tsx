import ContactInfo from './ContactInfo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-900">
      <div className="container max-w-5xl m-auto flex flex-col-reverse justify-center items-center gap-4 py-4 md:flex-row md:justify-between">
        <p className="text-zinc-100 text-lg font-light md:mb-0">
          © {new Date().getFullYear()} Kevin Sauvage. All rights reserved.
        </p>
        <ContactInfo />
      </div>
    </footer>
  );
};

export default Footer;
