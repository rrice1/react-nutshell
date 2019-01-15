import React from 'react';
import './Friends.scss';
import smashRequests from '../../../Helpers/data/smashRequests';
import authRequests from '../../../Helpers/data/authRequests';
import userRequests from '../../../Helpers/data/userRequests';

class Friends extends React.Component {
state = {
  users: [],
  uid: '',
  pending: [],
  friends: [],
  potentials: [],
}

componentDidMount() { // behind the scenes
  smashRequests
    .usersAndFriends(authRequests.getCurrentUid())
    .then((users) => {
      console.log(users);
      // this.setState(users);
    })
    .catch(error => console.error('stuff broke', error));
}

render() { // stuff on the page
  return (
      <div className='row'>
      <div className='col-4'>
      <h2>Undiscovered Friends</h2>
      </div>
      <div className='col-4'>
      <h2>Pending Requests</h2>
      </div>
      <div className='col-4'>
      <h2>My Friends</h2>
      </div>
      </div>
  );
}
}

export default Friends;
