import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import {withFirebase} from "../Firebase"
import { connect } from 'react-redux';
import { compose } from 'recompose';
 function AddressForm({authUser,firebase}) {
    const [edit,setedit]= React.useState(true)
    const[uid,setuid]=React.useState(authUser.uid)
    const [address,setadd]= React.useState( {address: {
        street: "",
        address: "",
        city: "",
        number: "",
        state:"",
        province:"",
        firstname:"",
        lastname:""
   }
}
   )

   React.useEffect(()=>{
   
       firebase.user(uid).child('address').once('value').then(function(snapshot) {
        var add= snapshot.val();
        // .
        console.log(add)
    setadd(add)
      });


   },[

   ])
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            value={address.address.firstname}
            autoComplete="given-name"
            disabled={edit}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            disabled={edit}
            value={address.address.lastname}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            disabled={edit}
            value={address.address.address}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="province"
            name="province"
            label="province"
            fullWidth
            autoComplete="province"
            disabled={edit}
            value={address.address.province}
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
            disabled={edit}
            value={address.address.city}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="state" name="state" label="State/Region" fullWidth  disabled={edit}   value={address.address.state}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="number"
            label="phone"
            fullWidth
            autoComplete="shipping postal-code"
            disabled={edit}
            value={address.address.number}
          />
        </Grid>
        
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
            disabled={edit}
          /><Fab color="secondary"  aria-label="edit">
          <div onClick={(e)=>{
              setedit(!edit)
    
              console.log(edit);
    e.preventDefault()
          }}> 
      <EditIcon />
      </div>
    </Fab>
        </Grid>
        
      </Grid>
    
      

    </React.Fragment>
  );
}
const mapStateToProps = state => ( { 
    authUser: state.sessionState.authUser
  });
  export default compose(
    connect(mapStateToProps)
  )(withFirebase(AddressForm))
