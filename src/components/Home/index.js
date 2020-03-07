import React from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import Messages from '../Messages';
import Shelf from '../Shelf';
import Filter from '../Shelf/Filter';

import FloatCart from '../FloatCart';
const HomePage = () => (
  <div>
    
    <h1>Top Products</h1>
    <main>
      <Filter />
      <Shelf />
    </main>
    <FloatCart />
   
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
)(HomePage);
