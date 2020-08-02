import React from 'react';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import SignOutButton from '../SignOut';
//import SignInButton from '../SignIn';
import './Toolbar.css';
import { connect } from 'react-redux';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Cart from '../../components/FloatCart';
import Divider from '@material-ui/core/Divider';
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
    borderRadius: '20px',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    border:'1px solid  #dae53b',
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
    color: 'blue',
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
    <div style={{position:'fixed', zIndex: '50000',backgroundColor:'white'
    }}>
      <header className="toolbar">
        <div
          style={{
            display: 'flex',
            margin: '0px 20px',
            justifyContent: 'center',
          }}
        >
          <a href="">contact@murabahah.ng</a>
          <a href="">+234709840948</a>
          <a href="">Nigeria</a>
          <div className="spacer"></div>
          <a href="">SignIn/Register</a>
          <a href="">Download app</a>
        </div>
      </header>
      <div
        style={{
          display: 'flex',
          margin: '0px 20px',
          marginTop:'60px',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundColor:'white'
        }}
      >
        <div
          style={{
            display: 'flex',
            margin: '0px 20px',
            justifyContent: 'space-evenly',
          }}
        >
          <div>
            <img src={require('../../static/toolbar.png')} alt="LOGo" width="100" />
          </div>
          <div>
            {' '}
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
          </div>

         
        </div>
      </div>
      <Divider light/>
      <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
<div >
<div className="toolbar_navigation-items" >
      <ul>

      {!props.authUser && (<li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>)}
    {!!props.authUser &&(<li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>)}

    <li >
    <Link to={ROUTES.HOME}>ABOUT</Link>
    </li>
    <li >
    <Link to={ROUTES.HOME}>SHOP</Link>
    </li>
    {!!props.authUser &&(<li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>)}
    <li >
    <Link to={ROUTES.HOME}>FAQ</Link>
    </li>
    <li >
    <Link to={ROUTES.HOME}>contact</Link>
    </li>
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
      <div className='bigdivider'></div>
</div>



      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,

  /* <div className={classes.search}>
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
          <div className="toolbar__navigation">
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
    </div>
          
          
          
          
          */
});

export default connect(mapStateToProps)(Toolbar);
