import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import friendShape from '../../../../Helpers/props/friendShape';
import authRequests from '../../../../Helpers/data/authRequests';
import './FriendItems.scss';

class FriendItem extends React.Component {
  static propTypes = {
    friend: friendShape,
    status: PropTypes.string,
    endFriendship: PropTypes.func,
    addFriend: PropTypes.func,
  };

  deleteEvent = (e) => {
    e.preventDefault();
    const friendRequestId = e.target.closest('button').id;
    const { endFriendship } = this.props;
    endFriendship(friendRequestId);
  }

  addFriendEvent = (e) => {
    e.preventDefault();
    const uid = authRequests.getCurrentUid();
    const friendUid = e.target.closest('button').id;
    const { addFriend } = this.props;
    const newFriend = {
      friendUid,
      isAccepted: false,
      uid,
    };
    addFriend(newFriend);
  }

  render() {
    const { friend, status } = this.props;
    const makeButtons = () => {
      if (status === 'confirmed') {
        return (
          <Button color="danger" id={friend.friendRequestId} onClick={this.deleteEvent}><i className="far fa-trash-alt"></i></Button>
        );
      } if (status === 'potentials') {
        return (
          <Button color="success" id={friend.uid} onClick={this.addFriendEvent}><i className="fas fa-plus"></i></Button>
        );
      } return (
        <div>
          <p>pending</p>
        </div>
      );
    };

    return (
        <li className="friend-item" id={friend.id}>
          <span className="col-1"><img className="photo" src={friend.photo} alt={friend.userName}/></span>
          <span className="col-9">{friend.userName}</span>
          <div>{makeButtons()}</div>
        </li>
    );
  }
}
export default FriendItem;
