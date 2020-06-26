import React from 'react';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import AvatarWithUsername from '../SharedComponents/AvatarWithUsername';
import './styles/userDetailsOnHeader.css';
import * as labels from '../labels';
import * as applicationActions from '../../Redux/actions/applicationActions';
import * as image from '../../Images/no_user_photo.png';

function UserDetailsOnHeader(props) {
  const { username, photo, firstName, lastName, accountBalance } = {
    ...props.userDetails
  };
  return (
    <div style={{ marginRight: '10px' }}>
      <div className="dropdown">
        <AvatarWithUsername username={username} photo={photo} />
        <div className="dropdown-content">
          <div style={{ margin: '5px' }}>
            <div style={{ textAlign: 'center', margin: '10px' }}>
              <img
                src={photo || image}
                alt="Avatar"
                className="imageOnDetails"
              />
            </div>

            <Label>
              {labels.ACCOUNT_BALANCE + ': ' + accountBalance + '$'}
            </Label>
            <br />
            <Label>{labels.FIRST_NAME + ': ' + firstName}</Label>
            <br />
            <Label> {labels.LAST_NAME + ': ' + lastName}</Label>
            <br />
            <Link
              to={{ pathname: '/transactions' }}
              style={{ textDecoration: 'underline' }}
            >
              {labels.MY_TRANSACTIONS}
            </Link>
            <hr />
            <Link
              to={{ pathname: '/login' }}
              className="logoutStyle"
              style={{ textDecoration: 'none' }}
              onClick={props.actions.logout}
            >
              {labels.LOGOUT}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { ...state.applicationReducer };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      logout: bindActionCreators(applicationActions.logout, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetailsOnHeader);
