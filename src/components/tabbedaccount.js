import React from 'react';

import Paper from '@material-ui/core/Paper';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Tab, Tabs } from 'react-bootstrap';
import { withAuthorization, withEmailVerification } from './Session';
import { withFirebase } from './Firebase';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';

function CenteredTabs(props) {
  return (
    <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      style={{ alignItems: 'center' }}
    >
      <Tab eventKey="home" title="Loans & Orders" />
      <Tab eventKey="profile" title="Personal Profile">
        <p>{props.authUser.email}</p>
        <br/>
       Status:
       <p>{props.authUser.status}</p>
       Address:
       <br/>
  <textarea>{props.authUser.address}</textarea>
  <br/>
  city:
  <input value=""/>
      </Tab> 
      <Tab eventKey="contact" title="Billing "  />
    </Tabs>
  );
}
const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

const condition = authUser => !!authUser;

export default compose(
  connect(mapStateToProps),
  withAuthorization(condition)
)(CenteredTabs);
