import React, { Component } from 'react'
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../Session';
import { Button,Icon } from 'react-materialize';
import { connect } from 'react-redux';
import Pricing from '../pricing'
class paymenpicker extends Component {

createplan=(uid,amount)=>{
  console.log(uid)
    const requestOptions = {
      mode: 'no-cors',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: uid,
     amount:amount   })
    };
    fetch(' https://us-central1-halalfinans.cloudfunctions.net/createplan', requestOptions)
        .then(response => response.json())
        .then(data => {console.log(data)});

}


    render() {
        return (
            
            


  <Pricing/>


        )
    }
}
const condition = authUser => !!authUser;
const mapStateToProps = state => { return   { 
    authUser: state.sessionState.authUser,
    amount:state.total.data.totalPrice
  };

}

  export default connect(mapStateToProps)(paymenpicker)