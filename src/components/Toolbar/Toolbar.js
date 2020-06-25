import React from 'react'
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton'
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import SignOutButton from '../SignOut';
//import SignInButton from '../SignIn';
import './Toolbar.css'
import { connect } from 'react-redux';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
const Toolbar = (props) => {
  const classes = useStyles();
  return (
  <header className="toolbar">
    <div className="toolbar__navigation">
    <div className="toolbar__toggle-button">
            <DrawerToggleButton click={props.drawerClickHandler} />
        </div>
      <div className="toolbar__logo">
        <a href="/"></a>
      </div>

      <div className="spacer" />
      <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
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
    </div>
  </header>)
  
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

export default connect(mapStateToProps)(Toolbar);
