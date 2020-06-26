import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as bookDetailsActions from '../../Redux/actions/bookDetailsActions';
import * as cartActions from '../../Redux/actions/cartActions';
import * as booksActions from '../../Redux/actions/booksActions';
import * as labels from '../labels';
import * as styles from './styles/book_details_styles';
import { useEffect } from 'react';
import CustomTable from '../SharedComponents/CustomTable';
import AddToCart from '../SharedComponents/AddToCart';
import { Row, Col } from 'reactstrap';
import { Button } from '@material-ui/core';
import ImageFileChooser from '../SharedComponents/ImageFileChooser';

function BookDetails(props) {
  useEffect(
    () =>
      props.actions.getStoresForBook({
        bookId: props.selectedBook.id,
        pageNumber: props.pageNumber
      }),
    [props.actions, props.pageNumber, props.selectedBook.id]
  );
  const tableActions = [
    {
      id: 'action',
      Header: '',
      Cell: item => {
        return (
          <AddToCart
            key={'action' + item.bookId + item.storeId}
            quantityField="selectedQuantity"
            itemField="bookId"
            storeField="storeId"
            item={{ ...item.original, bookName: props.selectedBook.name }}
            addToCart={props.actions.addToCart}
            onChange={props.actions.quantityChange}
          ></AddToCart>
        );
      },
      width: 160
    }
  ];
  const tableColumns = [
    { id: 'storeName', header: labels.STORE_NAME },
    { id: 'quantityInStore', header: labels.QUANTITY },
    { id: 'sold', header: labels.SOLD },
    { id: 'price', header: labels.PRICE }
  ];
  return (
    <div style={{ height: window.innerHeight * 0.8 }}>
      <Row>
        <Col className="col-md-auto">
          <ImageFileChooser disabled={true} photo={props.selectedBook.photo} />
        </Col>
        <Col className="col-md-auto">
          <h4>{labels.BOOK + ': ' + props.selectedBook.name}</h4>
          <h4>{labels.WRITER + ': ' + props.selectedBook.writer}</h4>
          <h4>{labels.PUBLISHER + ': ' + props.selectedBook.publisher}</h4>
          <h4>
            {labels.PUBLISHING_YEAR + ': ' + props.selectedBook.publishingYear}
          </h4>
        </Col>
      </Row>
      <br />
      <CustomTable
        data={props.storesForBook}
        actions={tableActions}
        columns={tableColumns}
        totalPages={props.totalPages}
        pageNumber={props.pageNumber}
        onPageChange={props.actions.onPageChange}
        defaultPageSize={12}
        calculateWidth={true}
      ></CustomTable>
      <Row style={styles.closeButtonRow}>
        <Col>
          <Button
            onClick={props.actions.toggleBooksModal}
            style={styles.closeButton}
          >
            {labels.CLOSE}
          </Button>
        </Col>
      </Row>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    ...state.bookDetailsReducer,
    selectedBook: state.booksReducer.bookDetailsObject
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      addToCart: bindActionCreators(cartActions.addToCart, dispatch),
      onPageChange: bindActionCreators(
        bookDetailsActions.onPageChange,
        dispatch
      ),
      quantityChange: bindActionCreators(
        bookDetailsActions.quantityChange,
        dispatch
      ),
      getStoresForBook: bindActionCreators(
        bookDetailsActions.getStoresForBook,
        dispatch
      ),
      toggleBooksModal: bindActionCreators(
        booksActions.toggleBooksModal,
        dispatch
      )
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(BookDetails);
