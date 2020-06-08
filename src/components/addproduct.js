import React, { Component } from 'react';
import { withFirebase } from '../components/Firebase';

import * as ROLES from '../constants/roles';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { v1 as uuidv1 } from 'uuid';

import { withAuthorization, withEmailVerification } from '../components/Session';
const InitialState=
{
    availableSizes : [  ],
    currencyFormat : "N",
    currencyId : "NGN",
    description : "",
 
    id: 0,
   
    isNew : true,
    
    price : 0,
    sku : uuidv1(),
    style : "",
    title : ""
  }
class addproduct extends Component {
    constructor(props) {
        super(props);
        
        this.state = { ...InitialState };
      }
      render() {
        return (
            <div>
               <form className="form">
                   Title:
                   <input type ="text" placeholder='enter title'/>
                   Description:
                   <textarea  placeholder='enter title'/>
                   Price:
                   <input type ="number" placeholder='enter price' step='any'/>
                   SkU:{this.state.sku}
    
    
                   </form> 
            </div>
        )
    }
      }
    
    
const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMIN];


const mapStateToProps = state => ( { 
    authUser: state.sessionState.authUser
  });
  export default compose(
    connect(mapStateToProps), withAuthorization(condition)
  )(withFirebase(addproduct))
  

