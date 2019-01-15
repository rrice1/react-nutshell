import React from 'react';
import './Friends.scss';
import smashRequests from '../../../Helpers/data/smashRequests';
import authRequests from '../../../Helpers/data/authRequests';
import FriendItem from './FriendItems/FriendItems';
import friendRequests from '../../../Helpers/data/friendRequests';

class Friends extends React.Component {
state = {
  confirmed: [],
  pending: [],
  potentials: [],
}

componentDidMount() { // behind the scenes
  this.getAndSortUsers();
}

getAndSortUsers = () => {
  const uid = authRequests.getCurrentUid();
  smashRequests
    .usersAndFriends(uid)
    .then((results) => {
      const users = results;
      const potentials = users.filter(user => !user.isAccepted && !user.isPending);
      const pending = users.filter(user => !user.isAccepted && user.isPending);
      const confirmed = users.filter(user => user.isAccepted);
      this.setState({
        users,
        potentials,
        pending,
        confirmed,
      });
    })
    .catch(err => console.error('error in SMASH', err));
}

render() {
  const {
    potentials,
    pending,
    confirmed,
  } = this.state;

  const friendItemComponents = (friendArray, status) => (
    friendArray.map(friend => (
      <FriendItem
        key={friend.id}
        friend={friend}
        status={status}
      />
    ))
  );

  return (
    <div className='Friends container'>
      <h2>Friends</h2>
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <h3>Potential Friends</h3>
            <ul>{friendItemComponents(potentials)}</ul>
          </div>
          <div className="col-sm">
            <h3>Pending Requests</h3>
            <ul>{friendItemComponents(pending)}</ul>
          </div>
          <div className="col-sm">
            <h3>Friends</h3>
            <ul>{friendItemComponents(confirmed)}</ul>
          </div>
        </div>
      </div>
    </div>
  );
}
}

export default Friends;
