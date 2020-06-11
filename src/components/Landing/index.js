import React from 'react';

import Shelf from '../Shelf';
import Filter from '../Shelf/Filter';

import FloatCart from '../FloatCart';
import Banner from '../banner'
const Landing = () => (
  <React.Fragment>
    <Banner/>
    <main>
      <Filter />
      <Shelf />
    </main>
    <FloatCart />
  </React.Fragment>
);

export default Landing;