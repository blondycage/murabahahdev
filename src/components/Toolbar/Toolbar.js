import React from 'react'
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton'
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import SignOutButton from '../SignOut';
//import SignInButton from '../SignIn';
import './Toolbar.css'
import { connect } from 'react-redux';
const Toolbar = props => (
  <header className="toolbar">
    <nav className="toolbar__navigation">
    <div className="toolbar__toggle-button">
            <DrawerToggleButton click={props.drawerClickHandler} />
        </div>
      <div className="toolbar__logo">
        <a href="/"></a>
      </div>
      <div className="spacer" />
      <div className="toolbar_navigation-items">
      <ul>
      {!props.authUser && (<li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>)}
    {!!props.authUser &&(<li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>)}
    {!!props.authUser &&(<li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>)}
    {!!props.authUser && !!props.authUser.roles[ROLES.ADMIN] && (
      <li>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </li>
    )}
    {!!props.authUser && (<li>
      <SignOutButton />
    </li>)}
    {!props.authUser && (<li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>)}
  </ul>
      </div>
    </nav>
  </header>
)
const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

export default connect(mapStateToProps)(Toolbar);
