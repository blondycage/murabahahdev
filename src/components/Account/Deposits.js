import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {withFirebase} from "../Firebase"
function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

 function Deposits({authUser}) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div style={{padding:'5px'}}>
      <Title>Profile Details</Title>
      <Typography color="textSecondary" className={classes.depositContext}>
{`${authUser.email}`}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
{`${authUser.username}`}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        SpendLimit
      </Typography>
      <Typography component="p" variant="h5">
        {`NGN${authUser.spendlimit}`}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on 15 March, 2019
      </Typography>
      <Typography color="textPrimary" className={classes.depositContext}>
     { ` Current Status:${authUser.status}`}
      </Typography>
      </div>
    </React.Fragment>
  );
}
const mapStateToProps = state => ( { 
  authUser: state.sessionState.authUser
});
export default compose(
  connect(mapStateToProps)
)(withFirebase(Deposits))