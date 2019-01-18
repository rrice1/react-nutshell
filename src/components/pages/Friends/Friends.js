import React from 'react';
import './Friends.scss';
import smashRequests from '../../../Helpers/data/smashRequests';
import authRequests from '../../../Helpers/data/authRequests';
import FriendItem from './FriendItems/FriendItems';
import friendRequests from '../../../Helpers/data/friendRequests';

class Friends extends React.Component {
  state = {
    potentials: [],
    pending: [],
    confirmed: [],
  }

  componentDidMount() {
    this.getAndSortUsers();
  }

  getAndSortUsers = () => {
    const uid = authRequests.getCurrentUid();
    smashRequests
      .usersAndFriends(uid)
      .then((results) => {
        const potentials = results.filter(user => !user.isAccepted && !user.isPending);
        this.setState({
          potentials,
        });
      })
      .catch(err => console.error('error in SMASH', err));
  }

  endFriendship = (friendRequestId) => {
    friendRequests.deleteFriend(friendRequestId)
      .then(() => {
        this.getAndSortUsers();
      })
      .catch(err => console.error('error in ending friendship', err));
  }

  addFriend = (newFriend) => {
    friendRequests.addFriend(newFriend)
      .then(() => {
        this.getAndSortUsers();
      })
      .catch(err => console.error('error in adding friend', err));
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
          endFriendship={this.endFriendship}
          addFriend={this.addFriend}
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
            <ul>{friendItemComponents(potentials, 'potentials')}</ul>
          </div>
          <div className="col-sm">
            <h3>Pending Requests</h3>
            <ul>{friendItemComponents(pending, 'pending')}</ul>
          </div>
          <div className="col-sm">
            <h3>Friends</h3>
            <ul>{friendItemComponents(confirmed, 'confirmed')}</ul>
          </div>
        </div>
      </div>
      </div>
    );
  }
}


export default Friends;
