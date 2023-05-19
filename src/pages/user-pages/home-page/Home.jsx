import React, { useEffect, useState } from 'react';
import HomeMain from '../../../components/user-components/home-components/home-main/HomeMain';
import Footer from '../../../components/user-components/partials/footer/Footer';
import Navbar from '../../../components/user-components/partials/header/Navbar';

function Home() {
  
  return (
    <div className='w-screen overflow-x-hidden h-auto'>
      <Navbar />
      <HomeMain />
      <Footer />
    </div>
  );
}

export default Home;
