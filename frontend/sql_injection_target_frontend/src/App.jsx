import React from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router-dom';
import { AppBar, Tab } from '@material-ui/core';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import history from './Routes/history';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShoppingCart from './Pages/SharedComponents/ShoppingCart.jsx';
import TabPanel from './Pages/SharedComponents/TabPanel.jsx';
import Routes from './Routes/Routes';
import UserDetailsOnHeader from './Pages/User/UserDetailsOnHeader';
import * as styles from './application_styles.js';
import * as labels from './Pages/labels';
import * as applicationActions from './Redux/actions/applicationActions';

function App(props) {
  if (props.showToast) toast(props.toastMessage);
  return (
    <div style={styles.application}>
      <Router history={history}>
        {props.isLoggedIn && (
          <AppBar>
            <Row>
              <Col className="col-md-auto">
                {createNavigationLink('/home', labels.HOME)}
                {createNavigationLink('/stores', labels.STORES)}
                {createNavigationLink('/books', labels.BOOKS)}
              </Col>
              <Col>
                <Link to={{ pathname: '/cart' }}>
                  <ShoppingCart
                    color="white"
                    totalItems={props.cartTotalItems}
                  ></ShoppingCart>
                </Link>
              </Col>
              <Col className="col-md-auto" style={{ marginRight: '10px' }}>
                <UserDetailsOnHeader />
              </Col>
            </Row>
          </AppBar>
        )}
        <br />
        <br />
        <TabPanel>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover={false}
          />
          <Routes />
        </TabPanel>
      </Router>
    </div>
  );
}

function lalala() {
  while (true) {
    setTimeout(() => console.log('lalala'), 5000);
  }
}

function createNavigationLink(pathname, label) {
  return (
    <Link to={{ pathname }}>
      <Tab label={label} style={{ color: 'white' }} />
    </Link>
  );
}

function mapStateToProps(state) {
  return {
    cartTotalItems: state.cartReducer.items.length,
    ...state.applicationReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      logout: bindActionCreators(applicationActions.logout, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
