import PropTypes from 'prop-types';

const friendShape = PropTypes.shape({
  friendRequest: PropTypes.string.isRequired,
  friendRequestId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isAccepted: PropTypes.bool.isRequired,
  isPending: PropTypes.bool.isRequired,
  photo: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
});

export default friendShape;
