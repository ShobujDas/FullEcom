import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from 'react-hot-toast';

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
          <meta charSet="UTF-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
          <title>{title}</title>
      </Helmet>
      <Header />
      <Toaster/>
      <main style={{ minHeight: "80vh" }}>{children}</main>

      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title:'Ecommerce app - shop now ',
  description:'Mern Stack Projects',
  keywords:'mern, react , node , mongodb',
  author:'Shobuj Das'
}

export default Layout;
