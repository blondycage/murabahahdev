import React from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import Messages from '../Messages';
import Shelf from '../Shelf';
import Filter from '../Shelf/Filter';
import Banner from '../banner';
import FloatCart from '../FloatCart';
const HomePage = () => (
  <div>
       <Banner />
    <main>
     
      <Filter />

      <Shelf />
    </main>
    <FloatCart />
 
  </div>
);

const condition = authUser => !!authUser;

export default compose(withAuthorization(condition))(HomePage);
