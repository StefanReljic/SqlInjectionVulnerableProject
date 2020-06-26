import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import InputField from '../SharedComponents/InputField';
import * as registerActions from '../../Redux/actions/registerActions';
import * as styles from './styles/public_styles';
import * as labels from '../labels';
import * as noUserImage from '../../Images/no_user_photo.png';
import { Button } from '@material-ui/core';
import ImageFileChooser from '../SharedComponents/ImageFileChooser';

function Register(props) {
  window.onload = () => props.actions.registerPageClear();
  const fields = [
    { id: 'username', label: labels.USERNAME, type: 'text' },
    { id: 'password', label: labels.PASSWORD, type: 'password' },
    { id: 'firstName', label: labels.FIRST_NAME, type: 'text' },
    { id: 'lastName', label: labels.LAST_NAME, type: 'text' }
  ];
  const { username, password, firstName, lastName, photo } = { ...props };
  const userObject = { username, password, firstName, lastName, photo };
  return (
    <Container style={styles.registerContainerStyle}>
      <h1 style={styles.headingStyle}>{labels.REGISTER}</h1>
      <br />
      <Row>
        <Col>
          {fields.map(field => (
            <Row key={field.id}>
              <Col>
                <InputField
                  id={field.id}
                  type={field.type}
                  label={field.label}
                  labelStyle={{ color: 'white' }}
                  placeholder={field.label}
                  value={props[field.id]}
                  onChange={props.actions.onChange}
                ></InputField>
              </Col>
            </Row>
          ))}
          <Row>
            <Col>
              <Button
                style={styles.addButton}
                onClick={() => props.actions.registerUser(userObject)}
              >
                {labels.REGISTER}
              </Button>
            </Col>
            <Col>
              <Link to={{ pathname: '/login' }}>
                <Button
                  style={{
                    ...styles.addButton,
                    backgroundColor: '#f5c518',
                    float: 'right'
                  }}
                >
                  {labels.LOGIN}
                </Button>
              </Link>
            </Col>
          </Row>
        </Col>

        <Col className="col-md-auto">
          <ImageFileChooser
            id="photo"
            photo={photo}
            customImage={noUserImage}
            onChange={props.actions.uploadPhoto}
          />
        </Col>
      </Row>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    ...state.registerReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      onChange: bindActionCreators(registerActions.onChange, dispatch),
      registerUser: bindActionCreators(registerActions.registerUser, dispatch),
      uploadPhoto: bindActionCreators(registerActions.uploadPhoto, dispatch),
      registerPageClear: bindActionCreators(
        registerActions.registerPageClear,
        dispatch
      )
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
