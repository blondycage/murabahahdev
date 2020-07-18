import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account/Dashboard';
import AdminPage from '../Admin/index';
import UploadPage from '../docuploader';
import CheckoutPage from '../Checkout';
import Pricing from "../pricing"
import ConfirmPage from '../confirmation'
import AddProductPage from '../addproduct';
import {NotificationContainer} from 'react-notifications';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import 'react-notifications/lib/notifications.css';

const App = () => (
  <Router>
    <div>
    <Navigation />
   
    
      <NotificationContainer/>
     
      <Route  path={ROUTES.CHECKOUT} component={CheckoutPage} />
      
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.DOC_UPLOAD} component={UploadPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PRICING} component={Pricing} />
      <Route path={ROUTES.REDIRECT} component={ConfirmPage} />
      <Route
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADDPRODUCT} component={AddProductPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
      <Route  path={ROUTES.LANDING} component={LandingPage} />
      <Route exact path={ROUTES.HOME} component={HomePage} />
    </div>
  </Router>
);

export default withAuthentication(App);