import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import InputField from '../SharedComponents/InputField';
import { Button } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import ErrorLayout from '../SharedComponents/ErrorLayout';
import * as storeActions from '../../Redux/actions/storeActions';
import * as storesActions from '../../Redux/actions/storesActions';
import * as labels from '../labels';
import * as storeStyles from './styles/store_styles';

function Store(props) {
  const fields = [
    { id: 'name', label: labels.NAME, type: 'text' },
    { id: 'address', label: labels.ADDRESS, type: 'text' },
    { id: 'phone', label: labels.PHONE, type: 'text' }
  ];
  const addStoreFunction = () => {
    Promise.resolve(props.actions.addStore(props.store)).then(() =>
      props.actions.fetchStores({ name: props.store.name, pageNumber: 0 })
    );
  };

  return (
    <React.Fragment>
      <ErrorLayout errors={props.errors} />
      <h3>{labels.ADD_STORE}</h3>
      <br />
      <Row>
        {fields.map(field => (
          <Col key={field.id}>
            <InputField
              id={field.id}
              type={field.type}
              label={field.label}
              required={true}
              placeholder={field.label}
              value={props.store[field.id]}
              onChange={props.actions.storeFieldChange}
            ></InputField>
          </Col>
        ))}
      </Row>
      <Row className="row-justify-content-end">
        <Button style={storeStyles.addButton} onClick={addStoreFunction}>
          {labels.ADD_STORE}
        </Button>
        <Button
          style={storeStyles.cancelButton}
          onClick={props.actions.storeModal}
        >
          {labels.CANCEL}
        </Button>
      </Row>
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return state.storeReducer;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      addStore: bindActionCreators(storeActions.addStore, dispatch),
      storeModal: bindActionCreators(storeActions.storeModal, dispatch),
      fetchStores: bindActionCreators(storesActions.fetchStores, dispatch),
      storeFieldChange: bindActionCreators(
        storeActions.storeFieldChange,
        dispatch
      )
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Store);
