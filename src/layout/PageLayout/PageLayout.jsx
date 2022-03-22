import React from "react";
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";

const PageLayout = ({ children }) => {
  return (
    <div className="PageLayout">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default PageLayout;
