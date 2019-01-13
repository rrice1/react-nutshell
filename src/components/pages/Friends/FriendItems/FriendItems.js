import smashRequests from '../../../helpers/data/smashRequests';
import authRequests from '../../../helpers/data/authRequests';

componentDidMount() {
    smashRequests
      .usersAndFriends(authRequests.getCurrentUid())
      .then((users) => {
        console.log(users);
      })
      .catch(error => console.error('stuff broke', error));
  }