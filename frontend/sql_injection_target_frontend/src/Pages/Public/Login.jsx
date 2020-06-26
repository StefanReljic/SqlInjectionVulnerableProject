import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import InputField from '../SharedComponents/InputField';
import * as loginActions from '../../Redux/actions/loginActions';
import * as styles from './styles/public_styles';
import * as labels from '../labels';
import { Button } from '@material-ui/core';

function Login(props) {
  window.onload = () => {
    props.actions.clearLoginPage();
  };

  const { username, password, errorMessage, showLoading } = {
    ...props.login
  };
  let loginObject = {
    username,
    password
  };

  return (
    <Container style={styles.containerStyle}>
      <h1 style={styles.headingStyle}>{labels.LOGIN}</h1>
      <br />

      {errorMessage.trim() !== '' && (
        <div>
          <h4 style={styles.errorMessageStyle}>{errorMessage}</h4>
          <br />
        </div>
      )}

      <Row>
        <Col>
          <InputField
            type="text"
            id="username"
            label={labels.USERNAME}
            labelStyle={styles.inputFieldLabelStyle}
            placeholder={labels.USERNAME}
            value={username}
            onChange={props.actions.onChange}
          ></InputField>
        </Col>
      </Row>

      <Row>
        <Col>
          <InputField
            type="password"
            id="password"
            label={labels.PASSWORD}
            labelStyle={styles.inputFieldLabelStyle}
            placeholder={labels.PASSWORD}
            value={password}
            onChange={props.actions.onChange}
          ></InputField>
        </Col>
      </Row>

      <Row>
        <Col>
          <Button
            style={styles.loginButtonStyle}
            onClick={() => props.actions.login(loginObject)}
          >
            {showLoading ? labels.LOGGING_IN : labels.LOG_IN}
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Link to={{ pathname: '/register' }}>
            <Button style={{ ...styles.registerButtonStyle, float: 'right' }}>
              {labels.REGISTER}
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    login: state.loginReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      onChange: bindActionCreators(loginActions.onChange, dispatch),
      login: bindActionCreators(loginActions.login, dispatch),
      clearLoginPage: bindActionCreators(loginActions.clearLoginPage, dispatch)
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
