import React from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { Button } from '@material-ui/core';
import ImageFileChooser from '../SharedComponents/ImageFileChooser';
import InputField from '../SharedComponents/InputField';
import ErrorLayout from '../SharedComponents/ErrorLayout';
import { addButton, cancelButton } from './styles/book_styles';
import * as addBookActions from '../../Redux/actions/addBookActions';
import * as booksActions from '../../Redux/actions/booksActions';
import * as labels from '../labels';

function Book(props) {
  const fields = [
    { id: 'name', label: labels.NAME, type: 'text' },
    { id: 'writer', label: labels.WRITER, type: 'text' },
    { id: 'publisher', label: labels.PUBLISHER, type: 'text' },
    { id: 'publishingYear', label: labels.PUBLISHING_YEAR, type: 'number' }
  ];
  return (
    <div>
      <ErrorLayout errors={props.errors} />
      <h3>{labels.ADD_BOOK}</h3>
      <br />
      <Row>
        <Col className="col-md-auto">
          <ImageFileChooser
            id="photo"
            photo={props.book.photo}
            onChange={props.actions.addBookUploadPhoto}
          />
        </Col>
        <Col>
          {fields.map(field => (
            <InputField
              key={field.id}
              id={field.id}
              type={field.type}
              label={field.label}
              required={true}
              placeholder={field.label}
              value={props.book[field.id]}
              onChange={props.actions.addBookFieldChange}
            />
          ))}
        </Col>
      </Row>

      <Row>
        <Col>
          <Button
            style={addButton}
            onClick={() => props.actions.addBook(props.book)}
          >
            {labels.ADD_BOOK}
          </Button>
          <Button style={cancelButton} onClick={props.actions.toggleBooksModal}>
            {labels.CANCEL}
          </Button>
        </Col>
      </Row>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    book: state.addBookReducer.book,
    errors: state.addBookReducer.errors,
    stores: state.storesReducer.list
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      addBook: bindActionCreators(addBookActions.addBook, dispatch),
      addBookFieldChange: bindActionCreators(
        addBookActions.addBookFieldChange,
        dispatch
      ),
      addBookUploadPhoto: bindActionCreators(
        addBookActions.addBookUploadPhoto,
        dispatch
      ),
      toggleBooksModal: bindActionCreators(
        booksActions.toggleBooksModal,
        dispatch
      )
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Book);
