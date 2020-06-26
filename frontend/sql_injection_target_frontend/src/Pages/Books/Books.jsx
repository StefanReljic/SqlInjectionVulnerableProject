import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'reactstrap';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import * as booksActions from '../../Redux/actions/booksActions';
import * as storesActions from '../../Redux/actions/storesActions';
import * as labels from '../labels';
import * as type from './styles/books_styles';
import BooksSearch from './BooksSearch';
import CustomTable from '../SharedComponents/CustomTable';
import CustomModal from '../SharedComponents/CustomModal';
import SelectField from '../SharedComponents/SelectField';
import AddBook from './AddBook';
import BookDetails from './BookDetails';

function Books(props) {
  useEffect(() => {
    props.actions.fetchStores({ name: '', pageNumber: -1 });
    props.actions.fetchBooks({
      name: '',
      writer: '',
      publisher: '',
      selectedStore: '',
      publishingYear: 1,
      pageNumber: props.searchParams.pageNumber
    });
  }, [props.actions, props.searchParams.pageNumber]);

  let modalComponent =
    props.bookDetailsObject.id === undefined ||
    props.bookDetailsObject.id === null ? (
      <AddBook />
    ) : (
      <BookDetails />
    );

  const tableActions = [
    {
      id: 'action',
      Header: '',
      Cell: book => {
        return (
          <Button
            style={{ backgroundColor: '#f5c518' }}
            onClick={() => props.actions.openBookDetails(book.original)}
          >
            {labels.DETAILS}
          </Button>
        );
      },
      width: 100
    }
  ];
  const tableColumns = [
    { id: 'name', header: labels.NAME },
    { id: 'writer', header: labels.WRITER },
    { id: 'publisher', header: labels.PUBLISHER },
    { id: 'publishingYear', header: labels.PUBLISHING_YEAR }
  ];
  return (
    <div>
      <Row>
        <Col className="col-2">
          <Row style={type.selectField}>
            <SelectField
              options={props.stores.map(store => {
                return {
                  value: store.id,
                  label: store.name
                };
              })}
              labelStyle={{ color: 'white' }}
              type={labels.STORE}
              value={props.searchParams.selectedStore}
              onChange={props.actions.selectedStoreChange}
            ></SelectField>
          </Row>
          <Row>
            <BooksSearch
              searchParams={props.searchParams}
              onChange={props.actions.searchChange}
            ></BooksSearch>
          </Row>
          <Row>
            <Col className="col-md-auto">
              <Button
                style={type.searchButton}
                onClick={() => props.actions.fetchBooks(props.searchParams)}
              >
                {labels.SEARCH}
              </Button>
            </Col>
            <Col>
              <Button
                style={type.clearButton}
                onClick={props.actions.clearBooksParams}
              >
                {labels.CLEAR}
              </Button>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col>
              <Button
                style={type.addButton}
                onClick={props.actions.toggleBooksModal}
              >
                {labels.ADD_BOOK}
              </Button>
            </Col>
          </Row>
          <CustomTable
            data={props.list}
            actions={tableActions}
            columns={tableColumns}
            totalPages={props.totalPages}
            pageNumber={props.searchParams.pageNumber}
            onPageChange={props.actions.onPageChange}
            defaultPageSize={12}
            calculateWidth={true}
          ></CustomTable>
        </Col>
      </Row>

      <CustomModal
        isOpen={props.isBookModalOpen}
        component={modalComponent}
      ></CustomModal>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    ...state.booksReducer,
    stores: state.applicationReducer.stores
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      fetchBooks: bindActionCreators(booksActions.fetchBooks, dispatch),
      searchChange: bindActionCreators(booksActions.searchChange, dispatch),
      toggleBooksModal: bindActionCreators(
        booksActions.toggleBooksModal,
        dispatch
      ),
      onPageChange: bindActionCreators(booksActions.onPageChange, dispatch),
      fetchStores: bindActionCreators(storesActions.fetchStores, dispatch),
      clearBooksParams: bindActionCreators(
        booksActions.clearBooksParams,
        dispatch
      ),
      selectedStoreChange: bindActionCreators(
        booksActions.selectedStoreChange,
        dispatch
      ),
      openBookDetails: bindActionCreators(
        booksActions.openBookDetails,
        dispatch
      )
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Books);
