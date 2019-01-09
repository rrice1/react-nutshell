import React from 'react';
import PropTypes from 'prop-types';
import authRequests from '../../../Helpers/data/authRequests';
import './Auth.scss';

import googleButton from './images/googlebutton.png';

class Auth extends React.Component {
  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.authenticate().then(() => {
      this.props.history.push('/home');
    }).catch(err => console.error('there was an error with auth', err));
  }

  render() {
    return (
      <div className="Auth">
        <button className="btn btn-danger" onClick={this.authenticateUser}>
        <img src={googleButton} alt="google login button"/>
        </button>
      </div>
    );
  }
}

export default Auth;
