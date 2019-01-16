import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import friendShape from '../../../../Helpers/props/friendShape';
import './FriendItems.scss';

class FriendItem extends React.Component {
  static propTypes = {
    friend: friendShape,
    status: PropTypes.string,
    endFriendship: PropTypes.func,
  };

  deleteEvent = (e) => {
    e.preventDefault();
    const friendRequestId = e.target.closest('button').id;
    const { endFriendship } = this.props;
    endFriendship(friendRequestId);
  }

  render() {
    const { friend } = this.props;

    return (
        <li className="friend-item" id={friend.id}>
          <span className="col-1"><img className="photo" src={friend.photo} alt={friend.userName}/></span>
          <span className="col-9">{friend.userName}</span>
          <Button color="danger" id={friend.friendRequestId} onClick={this.deleteEvent}><i className="far fa-trash-alt"></i></Button>
        </li>
    );
  }
}

export default FriendItem;
