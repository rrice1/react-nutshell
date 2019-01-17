import React from 'react';
import friendShape from '../../../../Helpers/props/friendShape';
import './FriendItems.scss';

class FriendItem extends React.Component {
  static propTypes = {
    friend: friendShape,
  };

  render() {
    const { friend } = this.props;

    return (
        <li className="friend-item" id={friend.id}>
          <span className="col-1"><img className="photo" src={friend.photo} alt={friend.userName}/></span>
          <span className="col-9">{friend.userName}</span>
        </li>
    );
  }
}

export default FriendItem;
