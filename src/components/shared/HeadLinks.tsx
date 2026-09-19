const HeadLinks = () => {
  return (
    <>
      <link rel='preconnect' href='https://gateway.umami.is' crossOrigin='anonymous' />
      <link rel='dns-prefetch' href='https://gateway.umami.is' />
      <link rel='preconnect' href='https://res.cloudinary.com' crossOrigin='anonymous' />
      <link rel='dns-prefetch' href='https://res.cloudinary.com' />
      <link rel='preconnect' href='https://www.google.com' crossOrigin='anonymous' />
      <link rel='dns-prefetch' href='https://www.google.com' />
      <meta name='theme-color' content='#000000' />
      <noscript>
        <style>{'.reveal{opacity:1 !important;transform:none !important;}'}</style>
      </noscript>
    </>
  );
};

export default HeadLinks;
