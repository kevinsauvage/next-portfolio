import ContactInfo from './ContactInfo';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className='container m-auto flex flex-col justify-center items-center gap-6 py-6 px-6'>
        <ContactInfo />
        <p className='text-zinc-100 text-lg font-light text-center'>
          © {new Date().getFullYear()} Kevin Sauvage. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
