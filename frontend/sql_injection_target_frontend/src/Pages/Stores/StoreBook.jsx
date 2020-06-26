import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as storeBookActions from '../../Redux/actions/storeBookActions';
import * as storesActions from '../../Redux/actions/storesActions';
import * as booksActions from '../../Redux/actions/booksActions';
import { Col, Row } from 'reactstrap';
import { Button } from '@material-ui/core';
import * as type from './styles/store_book_styles';
import * as labels from '../labels';
import SelectField from '../SharedComponents/SelectField';
import InputField from '../SharedComponents/InputField';
import RemovableList from '../SharedComponents/RemovableList';
import ErrorLayout from '../SharedComponents/ErrorLayout';

function StoreBook(props) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    props.actions.fetchStores({ name: '', pageNumber: -1 });
    props.actions.fetchBooks({
      name: '',
      writer: '',
      publisher: '',
      selectedStore: '',
      publishingYear: 1,
      pageNumber: -1
    });
  }, [props.actions]);
  const removableListItems = props.addedBooks.map(item => {
    return {
      description:
        'Store: ' +
        item.storeName +
        ', book: ' +
        item.bookName +
        ', quantity: ' +
        item.quantity +
        ', price: ' +
        item.price +
        '$',
      removeItem: () =>
        props.actions.removeBookFromList({
          bookId: item.bookId,
          storeId: item.storeId
        })
    };
  });

  return (
    <div style={{ width: '100%' }}>
      <ErrorLayout errors={props.errors} />
      <h3>{labels.ADD_BOOK_TO_STORE}</h3>
      <br />
      <Row>
        <Col>
          <SelectField
            options={props.stores.map(store => {
              return {
                value: store.id,
                label: store.name
              };
            })}
            type={labels.STORE}
            required={true}
            value={props.selectedStore.value}
            onChange={e =>
              props.actions.bookStoreFieldChange({
                field: 'selectedStore',
                value: e
              })
            }
          ></SelectField>
        </Col>
        <Col>
          <SelectField
            options={props.books.map(book => {
              return {
                value: book.id,
                label: book.name
              };
            })}
            type={labels.BOOK}
            required={true}
            value={props.selectedBook.value}
            onChange={e =>
              props.actions.bookStoreFieldChange({
                field: 'selectedBook',
                value: e
              })
            }
          ></SelectField>
        </Col>
        <Col>
          <InputField
            id="quantity"
            type="number"
            label={labels.QUANTITY}
            required={true}
            placeholder={labels.QUANTITY}
            value={props.quantity}
            onChange={props.actions.bookStoreFieldChange}
          ></InputField>
        </Col>
        <Col>
          <InputField
            id="price"
            type="number"
            label={labels.PRICE}
            required={true}
            placeholder={labels.PRICE}
            value={props.price}
            onChange={props.actions.bookStoreFieldChange}
          ></InputField>
        </Col>
        <Col>
          <Button
            style={type.addButton}
            onClick={() => props.actions.addBookToList(props)}
          >
            {labels.ADD_BOOK}
          </Button>
        </Col>
      </Row>
      <RemovableList list={removableListItems}></RemovableList>
      <Row>
        <Col>
          <Button
            style={type.addStoreBookButton}
            onClick={() => props.actions.addBooksToStore(props.addedBooks)}
          >
            {labels.ADD_BOOKS_TO_STORE}
          </Button>
          <Button
            style={type.cancelButton}
            onClick={props.actions.toggleStoreBookModal}
          >
            {labels.CANCEL}
          </Button>
        </Col>
      </Row>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    ...state.storeBookReducer,
    stores: state.applicationReducer.stores,
    books: state.applicationReducer.books,
    searchParams: state.storesReducer.searchParams
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      toggleStoreBookModal: bindActionCreators(
        storeBookActions.toggleStoreBookModal,
        dispatch
      ),
      bookStoreFieldChange: bindActionCreators(
        storeBookActions.bookStoreFieldChange,
        dispatch
      ),
      addBookToList: bindActionCreators(
        storeBookActions.addBookToList,
        dispatch
      ),
      addBooksToStore: bindActionCreators(
        storeBookActions.addBooksToStore,
        dispatch
      ),
      fetchBooks: bindActionCreators(booksActions.fetchBooks, dispatch),
      fetchStores: bindActionCreators(storesActions.fetchStores, dispatch),
      removeBookFromList: bindActionCreators(
        storeBookActions.removeBookFromList,
        dispatch
      )
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreBook);
