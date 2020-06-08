import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './SideDrawer.css'
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import SignOutButton from '../SignOut';
const SideDrawer = props => {
  let drawerClasses = 'side-drawer'
  if (props.show) {
    drawerClasses = 'side-drawer open'
  }
  return (
    <nav className={drawerClasses}>
 <div className="userinfoo"><i className="fa fa-user-circle " style={{color:"white",fontSize:'150px'}}></i>
 {!props.authUser && (<div><h3>guest</h3></div>)}
  {!!props.authUser && (<div><h3>{props.authUser.email}</h3></div>)}
  {!!props.authUser && (<div><p>{props.authUser.uid}</p></div>)}
  {!!props.authUser && (<div><h5>{props.authUser.username}</h5></div>)}
 </div>
 <div className="flexcont">
  
      {!props.authUser && (<div>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </div>)}
    {!!props.authUser &&(<div>
      <Link to={ROUTES.HOME}>Home</Link>
    </div>)}
    {!!props.authUser &&(<div>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </div>)}
    {!!props.authUser && !!props.authUser.roles[ROLES.ADMIN] && (
      <div>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </div>
    )}
    {!!props.authUser && (<div>
      <SignOutButton />
    </div>)}
    {!props.authUser && (<div>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </div>)}
  </div>
    </nav>
  )
}
const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

export default connect(mapStateToProps)(SideDrawer);
