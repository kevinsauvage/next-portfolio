const projects = [
  {
    description:
      'UpToGo is a fast and user-friendly food delivery platform connecting customers with local restaurants. Order, enjoy a wide range of cuisines, and experience convenience today.',
    githubLink: ['https://github.com/kevinsauvage/uptogo'],
    img: {
      laptop:
        'https://res.cloudinary.com/kevincloudname/image/upload/v1681232730/portfolio/uptogo/laptop.png',
    },
    languages: 'Next.js | SASS | MongoDB | Redux | Redux persist | Stripe | Jsonwebtoken | Bcrypt',
    largeDescription:
      'UpToGo is an online food delivery platform that seamlessly connects customers with local restaurants. With an intuitive user interface, customers can browse menus, place orders, and receive fast and convenient deliveries right to their doorstep. Our platform offers a vast selection of culinary options from a wide range of cuisines and flavors, and boasts a sleek and modern design that enhances its overall functionality. As a skilled developer, I take pride in creating innovative and reliable solutions that deliver a seamless and satisfying experience for both customers and restaurant partners. Sign up today and discover the convenience and deliciousness of UpToGo!',
    page: {
      banner: {
        image:
          'https://res.cloudinary.com/kevincloudname/image/upload/v1681237627/portfolio/uptogo/home.webp',
      },
      blocs: [
        {
          description:
            "At UpToGo, we've made it easy to discover and order from your favorite local restaurants. On the restaurant page, simply click on a menu item to open the product modal, where you can view the item description, select quantity, and add it to your cart. When you're ready to place your order, simply click the order button to proceed to the checkout page. Enjoy a hassle-free and convenient way to order delicious meals from your favorite restaurants on UpToGo's restaurant page.",
          image:
            'https://res.cloudinary.com/kevincloudname/image/upload/v1681237627/portfolio/uptogo/restaurant.png',
          title: 'Restaurant page',
        },
        {
          description:
            "Easily customize your order on UpToGo's order page by adjusting quantities, removing items, and adding special instructions. Once you're satisfied, confirm your order and proceed to our secure Stripe checkout page to complete your payment. Enjoy a seamless ordering experience with UpToGo!",
          image:
            'https://res.cloudinary.com/kevincloudname/image/upload/v1681237627/portfolio/uptogo/cart.png',
          title: 'Cart page',
        },
        {
          description:
            "The user page allows you to conveniently track your order history with just a few clicks. With easy access to your previous orders, you can quickly reorder your favorite meals or review your past purchases. Stay on top of your food delivery game and never miss out on a delicious meal with UpToGo's user page.",
          image:
            'https://res.cloudinary.com/kevincloudname/image/upload/v1681237627/portfolio/uptogo/account.png',
          title: 'User account page',
        },
        {
          description:
            "UpToGo's Login page features secure password hashing, salting, and server-side token validation to provide a seamless and secure user experience. The page interfaces with our backend API, which stores user information in a secure database and generates unique access tokens for authentication and authorization. Join the technical revolution of food delivery with UpToGo's Login page.",
          image:
            'https://res.cloudinary.com/kevincloudname/image/upload/v1681237627/portfolio/uptogo/login.png',
          title: 'Login page',
        },
      ],
    },
    title: 'UpToGo',
    websiteLink: 'https://uptogo.vercel.app/',
  },

  {
    description:
      'Streamy offers a personalized entertainment experience for movie and TV enthusiasts. Discover new titles, watch trailers, and join the conversation with a community-based approach.',
    githubLink: [
      'https://github.com/kevinsauvage/streamyV2-client',
      'https://github.com/kevinsauvage/streamyV2-server',
    ],
    img: {
      laptop:
        'https://res.cloudinary.com/kevincloudname/image/upload/v1681237627/portfolio/Streamy/laptop.png',
    },
    languages:
      'React.js | SASS |  Express.js | Mongoose | TMDB API | JWT | React router | Bcrypt | Uuid',
    largeDescription:
      'Streamy is a user-friendly platform for movie and TV enthusiasts. It offers a personalized experience with features such as personalized recommendations and a community-based approach to entertainment discovery. Customers can easily discover new titles, watch trailers, and add them to their personal watch list. With Streamy, they can also join the conversation by adding comments about their favorite titles. Experience the ultimate entertainment destination with Streamy today!',
    page: {
      banner: {
        image:
          'https://res.cloudinary.com/kevincloudname/image/upload/v1681235571/portfolio/Streamy/home.png',
      },
      blocs: [
        {
          description:
            'Streamy uses Accordion Slider, a popular design pattern. This design pattern is customized using HTML, CSS, and JavaScript to provide an engaging and intuitive user experience. With Accordion Slider, Streamy makes it easy for users to navigate and interact with its content, ensuring an enjoyable and informative entertainment discovery experience.',
          image:
            'https://res.cloudinary.com/kevincloudname/image/upload/v1681235571/portfolio/Streamy/acordeon.png',
          title: 'Accordion slider',
        },
        {
          description:
            "Streamy's filtering feature enables easy navigation through its vast collection of movies and TV shows. Users can filter content by release year, ratings, and genre using custom search algorithms. The user-friendly interface ensures easy discovery of new content that matches user interests and preferences.",
          image:
            'https://res.cloudinary.com/kevincloudname/image/upload/v1681235571/portfolio/Streamy/filters.png',
          title: 'Filtering',
        },
        {
          description:
            "Streamy's Movie and TV Show Page provides users with detailed information about movies and TV shows. Users can view trailers, add titles to their watch list, and read reviews from other users. This feature enhances the overall entertainment discovery experience and helps users make informed decisions about what to watch next.",
          image:
            'https://res.cloudinary.com/kevincloudname/image/upload/v1681235571/portfolio/Streamy/slug.png',
          title: 'Movie and tv show page',
        },
        {
          description:
            "Streamy's Trailer feature allows users to view the trailer for each movie or TV show in the library. This feature provides a quick and easy way for users to preview titles and decide whether they want to add them to their watch list. With Trailers, Streamy enhances the overall entertainment discovery experience and helps users find new content to enjoy.",
          image:
            'https://res.cloudinary.com/kevincloudname/image/upload/v1681235571/portfolio/Streamy/trailer.png',
          title: 'Trailer',
        },
        {
          description:
            "Streamy's Slideshow component allows users to cycle through movies and TV shows in an engaging and dynamic way. This feature is designed to showcase the latest and most popular titles, providing users with a quick and easy way to discover new content. With Slideshow, Streamy enhances the overall entertainment discovery experience and helps users find content they'll love.",
          image:
            'https://res.cloudinary.com/kevincloudname/image/upload/v1681235571/portfolio/Streamy/slideshow.png',
          title: 'Slideshow',
        },
      ],
    },
    title: 'Streamy',
    websiteLink: 'https://streamy.fun/',
  },
];

export default projects;
