import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
  address: null,
  firstname: '',
  code: null,
  state: '',
  city: '',
  province: '',
  number: null,
  lastname: ''
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const {
      username,
      email,
      passwordOne,
      isAdmin,
      address,
      code,
      state,
      city,
      province,
      number,
      firstname,
      lastname
    } = this.state;
    const roles = {};

    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
          roles,
          address,
          code,
          state,
          city,
          province,
          number,
      firstname,
      lastname
        });
      })
      /*.then(() => {
        return this.props.firebase.doSendEmailVerification();
      })*/
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      error,
      address,
      code,
      state,
      city,
      province,
      number,
      firstname,
      lastname
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit} className="form">
        <div className="forms">
          <div className="persnal">
            <input
              name="firstname"
              value={firstname}
              onChange={this.onChange}
              type="text"
              placeholder="First Name"
              required
            />
            <input
              name="lastname"
              value={lastname}
              onChange={this.onChange}
              type="text"
              placeholder="Last Name"
              required
            />
            <input
              name="username"
              value={username}
              onChange={this.onChange}
              type="text"
              placeholder="userName"
            />
            <input
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
              required
            />
            <input
              name="passwordOne"
              value={passwordOne}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
              required
            />
            <input
              name="passwordTwo"
              value={passwordTwo}
              onChange={this.onChange}
              type="password"
              placeholder="Confirm Password"
              required
            />
            {error && <p>{error.message}</p>}
          </div>
          <div className="shippingform">
            <label>Shipping Address: </label>
            <textarea
              name="address"
              type="text"
              value={address}
              onChange={this.onChange}
            />

            <label>State: </label>
            <input
              name="state"
              type="text"
              value={state}
              onChange={this.onChange}
              required
            />
            <label>City: </label>
            <input
              name="city"
              type="text"
              value={city}
              onChange={this.onChange}
              required
            />

            <label>Province: </label>
            <input
              name="province"
              type="text"
              value={province}
              onChange={this.onChange}
            />

            <label>Phone: </label>
            <input
              name="number"
              type="text"
              value={number}
              onChange={this.onChange}
            />

            <label>Postal Code:</label>
            <input
              name="code"
              type="text"
              value={code}
              onChange={this.onChange}
            />

            <button disabled={isInvalid} type="submit">
              Sign Up
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const SignUpLink = () => (
  <p className="centerdiv">
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };
