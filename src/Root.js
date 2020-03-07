import React from 'react';
import { Provider } from 'react-redux';
import Firebase, { FirebaseContext } from './components/Firebase';

import store from './services/store';

const Root = ({ children, initialState = {} }) => (
  <Provider store={store(initialState)}>
       <FirebaseContext.Provider value={new Firebase()}>
       {children}
       </FirebaseContext.Provider>
   
    </Provider>
);

export default Root;
