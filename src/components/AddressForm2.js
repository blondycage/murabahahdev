import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PaymentForm from './PaymentForm';
import Review from './Review';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '100px',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
    borderRadius: '50%',
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

function AddressForm({ cartProducts, cartTotal, authUser }) {
  const classes = useStyles();
  const history = useHistory();
  const pay = () => {
    const requestOptions = {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        totalamount: cartTotal,
        user: authUser,
        products: cartProducts,
      }),
    };
    fetch(
      'https://boring-yonath-397d65.netlify.app/.netlify/functions/pay',
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        window.location.href = `${data.data.link}`;
      })
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <div className={classes.layout}>
        <Typography variant="h6" gutterBottom>
          Shipping address
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              value={authUser.address.address.firstname}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              value={authUser.address.address.lastname}
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              value={authUser.address.address.address}
              fullWidth
              autoComplete="shipping address-line1"
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              value={authUser.address.address.city}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              value={authUser.address.address.state}
            />
          </Grid>
         
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Province"
              fullWidth
              autoComplete="shipping country"
              value={authUser.address.address.province}
            />
          </Grid>
          
        </Grid>
       
      </div>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => ({
  cartProducts: state.cart.products,
  authUser: state.sessionState.authUser,
  cartTotal: state.total.data,
});
export default connect(mapStateToProps, {})(AddressForm);
