import React from 'react';
import Button from '@material-ui/core/Button';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <Button type="button" variant="contained" color="Secondary" size="small" disableElevation onClick={firebase.doSignOut}>
    Sign Out
  </Button>
);

export default withFirebase(SignOutButton);
