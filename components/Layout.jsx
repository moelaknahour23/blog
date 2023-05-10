import React from 'react';
import Header from './Header';
import Footer from './Footer'

const Layout = ({ children }) => (
  <div className='scroll-smooth flex flex-col min-h-screen font-roboto dark:bg-gray-900'>
    <Header />
    {children}
    <Footer />
  </div>
);

export default Layout;
