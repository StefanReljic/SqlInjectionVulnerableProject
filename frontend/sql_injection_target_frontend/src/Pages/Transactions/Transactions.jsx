import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import SelectField from '../SharedComponents/SelectField';
import ErrorLayout from '../SharedComponents/ErrorLayout';
import * as transactionsActions from '../../Redux/actions/transactionsActions';
import * as labels from '../labels';
import { TransactionItem } from './TransactionItem';

function Transaction(props) {
  useEffect(() => props.actions.fetchTransactions(props.username), [
    props.actions,
    props.username
  ]);
  return (
    <div>
      <ErrorLayout errors={props.errors} />
      <Row>
        <Col className="col-md-auto">
          <SelectField
            options={props.transactionList.map(transaction => {
              return {
                value: transaction.cartId,
                label: transaction.date + ' - $' + transaction.totalPrice
              };
            })}
            labelStyle={{ color: 'white' }}
            type={labels.TRANSACTION}
            value={props.selectedTransaction.value}
            onChange={props.actions.fetchTransactionDetails}
            calculateWidth
          />
          <br />
          {props.transactionDetails.length !== 0 && (
            <div>
              <h4 style={{ color: 'white' }}>
                {labels.TOTAL_PRICE +
                  ': $' +
                  props.selectedTransaction.totalPrice}
              </h4>
              <h4 style={{ color: 'white' }}>
                {labels.TOTAL_ITEMS + ': ' + props.transactionDetails.length}
              </h4>
            </div>
          )}
        </Col>
        <Col>
          {props.transactionDetails.length ? (
            <div>
              <h3 style={{ color: 'white' }}> {labels.TRANSACTION_DETAILS}</h3>
              <div style={{ overflowY: 'auto', width: '100%' }}>
                {props.transactionDetails.map((item, index) => (
                  <TransactionItem key={index} item={item} />
                ))}
              </div>
            </div>
          ) : (
            <h3 style={{ color: 'white' }}>{labels.NO_SELECTED_TRANSACTION}</h3>
          )}
        </Col>
      </Row>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    ...state.transactionsReducer,
    username: state.applicationReducer.userDetails.username
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      fetchTransactionDetails: bindActionCreators(
        transactionsActions.fetchTransactionDetails,
        dispatch
      ),
      fetchTransactions: bindActionCreators(
        transactionsActions.fetchTransactions,
        dispatch
      )
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
