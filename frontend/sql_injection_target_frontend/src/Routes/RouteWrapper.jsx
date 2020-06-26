import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function RouteWrapper({ component, isPublic, ...rest }) {
  if (rest.computedMatch.path === '/' && rest.isLoggedIn)
    return <Redirect to="/home" />;

  if (!isPublic && !rest.isLoggedIn) return <Redirect to="/login" />;

  if (isPublic && rest.isLoggedIn) return <Redirect to="/home" />;

  return <Route {...rest} component={component}></Route>;
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.applicationReducer.isLoggedIn
  };
}

export default connect(mapStateToProps)(RouteWrapper);

RouteWrapper.propTypes = {
  isPublic: PropTypes.bool,
  component: PropTypes.elementType.isRequired
};

RouteWrapper.defaultProps = {
  isPublic: false
};
