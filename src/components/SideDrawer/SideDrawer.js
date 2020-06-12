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
  
      {!props.authUser && (<div style={{display:"flex",justifyContent:'left'}}>
        <i className="fa fa-user-circle " style={{color:"white",fontSize:'30px',alignSelf:"center", margin:'0 20px 0 20px'}}></i>
      <Link to={ROUTES.LANDING} style={{alignSelf:"center",textAlign:"center",fontSize:"20px" }}>Landing</Link>
    </div>)}
    {!!props.authUser &&(<div style={{display:"flex",justifyContent:'left'}}>
      <i className="fa fa-home " style={{color:"white",fontSize:'30px',alignSelf:"center", margin:'0 20px 0 20px'}}></i>
      <Link to={ROUTES.HOME} style={{alignSelf:"center",textAlign:"center",fontSize:"20px"}}>Home</Link>
    </div>)}
    {!!props.authUser &&(<div style={{display:"flex",justifyContent:'left'}}>
    <i className="fa fa-id-card " style={{color:"white",fontSize:'30px',alignSelf:"center", margin:'0 20px 0 20px'}}></i>
      
      <Link to={ROUTES.ACCOUNT} style={{alignSelf:"center",textAlign:"center",fontSize:"20px"}}>Account</Link>
    </div>)}
    {!!props.authUser && !!props.authUser.roles[ROLES.ADMIN] && (
      <div style={{display:"flex",justifyContent:'left'}}>
          <i className="fa fa-user-circle " style={{color:"white",fontSize:'30px',alignSelf:"center", margin:'0 20px 0 20px'}}></i>
        <Link to={ROUTES.ADMIN} style={{alignSelf:"center",textAlign:"center",fontSize:"20px"}}>Admin</Link>
      </div>
    )}
    <div style={{display:"flex",justifyContent:'left'}}>
        <i className="fa fa-question " style={{color:"white",fontSize:'30px',alignSelf:"center", margin:'0 20px 0 20px'}}></i>
      <Link to={ROUTES.LANDING} style={{alignSelf:"center",textAlign:"center",fontSize:"20px" }}>F.A.Q</Link>
    </div>)
    <div style={{display:"flex",justifyContent:'left'}}>
        <i className="fa fa-info " style={{color:"white",fontSize:'30px',alignSelf:"center", margin:'0 20px 0 20px'}}></i>
      <Link to={ROUTES.LANDING} style={{alignSelf:"center",textAlign:"center",fontSize:"20px" }}>Policies</Link>
    </div>)
    {!!props.authUser && (<div >
      <SignOutButton />
    </div>)}
    {!props.authUser && (<div style={{display:"flex",justifyContent:'left'}}>
      <i className="fa fa-user-circle " style={{color:"white",fontSize:'30px',alignSelf:"center", margin:'0 20px 0 20px'}}></i>
      <Link to={ROUTES.SIGN_IN} style={{alignSelf:"center",textAlign:"center",fontSize:"20px"}}>Sign In</Link>
    </div>)}
  </div>
    </nav>
  )
}
const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

export default connect(mapStateToProps)(SideDrawer);
