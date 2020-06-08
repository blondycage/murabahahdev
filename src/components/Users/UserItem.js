import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';

class UserItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      activeuser: null,
      idurl: '',
      util: '',
      acctstmnt: '',
      status: '',
      show:false,
      limit:0
    };
  }

  componentDidMount() {
    if (!this.props.user) {
      this.setState({ loading: true });
    }

    this.props.firebase
      .user(this.props.match.params.id)
      .on('value', snapshot => {
        this.setState({ activeuser: snapshot.val() });
        this.props.onSetUser(snapshot.val(), this.props.match.params.id);
        this.setState({ idurl: snapshot.child('iddocurl').val() });
        this.setState({ acctstmnt: snapshot.child('acctdocurl').val() });
        this.setState({ util: snapshot.child('utilitybilldocurl').val() });
        this.setState({ status: snapshot.child('status').val() });
        this.setState({ limit: snapshot.child('spendlimit').val() });
        

        this.setState({ loading: false });
      });
  }

  componentWillUnmount() {
    this.props.firebase.user(this.props.match.params.id).off();
  }

  onSendPasswordResetEmail = () => {
    this.props.firebase.doPasswordReset(this.props.user.email);
  };

  
  render() {
    const { user } = this.props;
    const { loading } = this.state;
    const { status } = this.state;
    const { show } = this.state;
    //const url= this.state.activeuser.iddocurl
    const pickeduser = () => {};
    return (
      <div>
        <div style={{margin:"20px 15%",fontWeight:"bold",backgroundColor:"black",color:"white",cursor:"pointer"}} onClick={()=>{this.setState({show: !(show)})}}>SHOW/HIDE USER PANEL</div>
        <h2>User ({this.props.match.params.id})</h2>
        {loading && <div>Loading ...</div>}
{show && <div>
        {user && (
          <div className="userlistcontainer">
            <span>
              <strong>E-Mail:</strong> {user.email}
            </span>
            <span>
              <strong>Username:</strong> {user.username}
            </span>
            <span>
              <button type="button" onClick={this.onSendPasswordResetEmail}>
                Send Password Reset
              </button>
            </span>
          </div>
        )}
        <div className="verify">
          <div>VERIFICATION FILES</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
              Current Status:
              <input type="text" value={status} onChange={(e)=>{this.setState({ status:e.target.value})}} />
              <button onClick={()=>{this.props.firebase
      .user(this.props.match.params.id).child('status').set(this.state.status)}}>update status</button>
            </div>
            <div>
            Current spend LIMIT:
              <input type="number" step='any' value={this.state.limit} onChange={(e)=>{this.setState({ limit:e.target.value})}} />
              <button onClick={()=>{this.props.firebase
      .user(this.props.match.params.id).child('spendlimit').set(this.state.limit)}}>set spend limit(NGN)</button>
            </div>
            <a target="_blank" href={`${this.state.idurl}`} className="link">
              ID DOUCUMENT
            </a>
            <a target="_blank" href={`${this.state.util}`} className="link">
              UTILITY BILL DOUCUMENT
            </a>
            <a
              target="_blank"
              href={`${this.state.acctstmnt}`}
              className="link"
            >
              ACCOUNT STATEMENT DOUCUMENT
            </a>
          </div>
        </div>
        </div>}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  user: (state.userState.users || {})[props.match.params.id]
});

const mapDispatchToProps = dispatch => ({
  onSetUser: (user, uid) => dispatch({ type: 'USER_SET', user, uid })
});

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UserItem);
