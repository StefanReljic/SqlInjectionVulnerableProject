import React from 'react';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'reactstrap';
import { Button } from '@material-ui/core';
import * as storesActions from '../../Redux/actions/storesActions';
import * as storeActions from '../../Redux/actions/storeActions';
import * as storeBookActions from '../../Redux/actions/storeBookActions';
import * as labels from '../labels';
import CustomTable from '../SharedComponents/CustomTable';
import InputField from '../SharedComponents/InputField';
import CustomModal from '../SharedComponents/CustomModal';
import AddStore from './AddStore';
import StoreBook from './StoreBook';
import { addButton, searchButton } from './styles/stores_styles';

function Stores(props) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => props.actions.fetchStores(props.searchParams), [
    props.searchParams.pageNumber
  ]);

  const tableColumns = [
    { id: 'name', header: labels.NAME },
    { id: 'address', header: labels.ADDRESS },
    { id: 'phone', header: labels.PHONE }
  ];
  let component = null;
  if (props.isStoreModalOpen) component = <AddStore />;
  else if (props.isStoreBookModalOpen) component = <StoreBook />;

  return (
    <div>
      <Row>
        <Col className="col-md-auto">
          <InputField
            id="name"
            label={labels.STORE}
            placeholder={labels.STORE}
            labelStyle={{ color: 'white' }}
            onChange={props.actions.searchChange}
          ></InputField>
        </Col>
        <Col>
          <Button
            style={searchButton}
            onClick={() => props.actions.fetchStores(props.searchParams)}
          >
            {labels.SEARCH}
          </Button>
        </Col>
        <Col>
          <Button style={addButton} onClick={props.actions.storeModal}>
            {labels.ADD_STORE}
          </Button>
        </Col>
        <Col className="col-md-auto">
          <Button
            style={addButton}
            onClick={props.actions.toggleStoreBookModal}
          >
            {labels.ADD_BOOK_TO_STORE}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <CustomTable
            data={props.list}
            actions={[]}
            columns={tableColumns}
            totalPages={props.totalPages}
            pageNumber={props.searchParams.pageNumber}
            onPageChange={props.actions.onPageChange}
            defaultPageSize={15}
          ></CustomTable>
        </Col>
      </Row>
      <CustomModal
        isOpen={props.isStoreModalOpen || props.isStoreBookModalOpen}
        component={component}
      ></CustomModal>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    ...state.storesReducer,
    store: state.storeReducer.store,
    isStoreBookModalOpen: state.storeBookReducer.isStoreBookModalOpen,
    isStoreModalOpen: state.storeReducer.isStoreModalOpen
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      fetchStores: bindActionCreators(storesActions.fetchStores, dispatch),
      onPageChange: bindActionCreators(storesActions.onPageChange, dispatch),
      searchChange: bindActionCreators(storesActions.searchChange, dispatch),
      storeModal: bindActionCreators(storeActions.storeModal, dispatch),
      toggleStoreBookModal: bindActionCreators(
        storeBookActions.toggleStoreBookModal,
        dispatch
      )
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stores);
