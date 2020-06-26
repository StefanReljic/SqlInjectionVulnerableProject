import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CustomTable from '../SharedComponents/CustomTable';
import ErrorLayout from '../SharedComponents/ErrorLayout';
import * as labels from '../labels';
import * as cartActions from '../../Redux/actions/cartActions';
import * as styles from '../../application_styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import { Row, Label, Col } from 'reactstrap';

function Cart(props) {
  window.onload = () => props.actions.cartClearErrorMessages();
  const tableActions = [
    {
      id: 'action',
      Header: '',
      Cell: book => {
        return (
          <Button
            style={styles.removeButton}
            onClick={() => props.actions.removeFromCart(book.original)}
          >
            <DeleteIcon />
          </Button>
        );
      },
      width: 100
    }
  ];
  const tableColumns = [
    { id: 'bookName', header: labels.BOOK },
    { id: 'storeName', header: labels.STORE },
    { id: 'quantityInStore', header: labels.QUANTITY },
    { id: 'price', header: labels.PRICE }
  ];
  return (
    <div>
      <Row>
        <Col className="col-md-auto">
          <Row>
            <Label style={{ color: 'white', fontSize: '18px' }}>
              {labels.TOTAL_ITEMS + ' ' + props.items.length}
            </Label>
          </Row>
          <Row>
            <Label style={{ color: 'white', fontSize: '18px' }}>
              {labels.TOTAL_PRICE + ' ' + props.totalPrice}$
            </Label>
          </Row>
          <Row>
            <Button
              style={styles.searchButton}
              onClick={() =>
                props.actions.completePayment(
                  {
                    items: props.items,
                    totalPrice: props.totalPrice,
                    totalItems: props.items.length
                  },
                  props.username
                )
              }
            >
              {labels.COMPLETE_PAYMENT}
            </Button>
          </Row>
        </Col>

        <Col>
          <ErrorLayout errors={props.errors} color="white" headerColor="red" />
          <CustomTable
            data={props.items}
            actions={tableActions}
            columns={tableColumns}
            defaultPageSize={12}
            calculateWidth={true}
          ></CustomTable>
        </Col>
      </Row>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    ...state.cartReducer,
    username: state.applicationReducer.userDetails.username
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
      completePayment: bindActionCreators(
        cartActions.completePayment,
        dispatch
      ),
      cartClearErrorMessages: bindActionCreators(
        cartActions.cartClearErrorMessages,
        dispatch
      )
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
