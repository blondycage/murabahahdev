import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import Portal from "../../components/docuploader"
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
const SignUpPage = () => (
  <div>
    
    <SignUpForm style={{marginTop:"22%"}}/>
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
  lastname: '',
  status:'Under-Review'
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
      lastname,
      status
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
      lastname,
      status
        });
      })
      /*.then(() => {
        return this.props.firebase.doSendEmailVerification();
      })*/
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.DOC_UPLOAD);
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
      <form onSubmit={this.onSubmit} className="upform" style={{textAlign:"center"}}>
       
        <div className="for" style={{display:"inline-block"}}>
          <div className="persnal" style={{marginTop:"22%"}}>
          <LockOutlinedIcon/>
          <Typography component="h1" variant="h5">
          Sign up
        </Typography>
             <TextField
                autoComplete="fname"
                name="firstname"
                variant="outlined"
                required
                fullWidth
                value={firstname}
              onChange={this.onChange}
                id="firstName"
                label="First Name"
                autoFocus
              />
            <TextField
              name="lastname"
              value={lastname}
              variant="outlined"
                required
                fullWidth
              onChange={this.onChange}
              type="text"
              placeholder="Last Name"
            
            />
            <TextField
             variant="outlined"
             required
             fullWidth
              name="username"
              value={username}
              onChange={this.onChange}
              type="text"
              placeholder="userName"
            />
            <TextField
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
              variant="outlined"
              required
              fullWidth
            />
            <TextField
              name="passwordOne"
              value={passwordOne}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
              variant="outlined"
                required
                fullWidth
            />
            <TextField
              name="passwordTwo"
              value={passwordTwo}
              onChange={this.onChange}
              type="password"
              placeholder="Confirm Password"
              variant="outlined"
                required
                fullWidth
            />
            {error && <p>{error.message}</p>}
            <div >
           
            <TextField
              name="address"
              type="text"
              value={address}
              onChange={this.onChange}
              variant="outlined"
              required
              placeholder="Address"
              fullWidth
            />

           
            <TextField
              name="state"
              type="text"
              value={state}
              onChange={this.onChange}
              variant="outlined"
              required
              fullWidth
              placeholder="State"
            />
           
            <TextField
              name="city"
              type="text"
              value={city}
              onChange={this.onChange}
              variant="outlined"
                required
                fullWidth
                placeholder="City"
            />

          
            <TextField
              name="province"
              type="text"
              value={province}
              onChange={this.onChange}
              placeholder="Province"
              variant="outlined"
              required
              fullWidth
            />

           
            <TextField
              name="number"
              type="text"
              value={number}
              onChange={this.onChange}
              variant="outlined"
              required
              placeholder="Phone"
              fullWidth
            />

           
            <TextField
              name="code"
              type="text"
              value={code}
              onChange={this.onChange}
              variant="outlined"
              required
              placeholder="zIP"
              fullWidth
            />

            <Button disabled={isInvalid} variant="contained" color='Primary' type="submit">
              Sign Up
            </Button>
          </div>
        
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
