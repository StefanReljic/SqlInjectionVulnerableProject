import React from 'react';
import { Row, Col, Label } from 'reactstrap';
import TransactionItemElement from './TransactionItemElement';
import * as labels from '../labels';

export function TransactionItem(props) {
  const bookFields = [
    { id: 'name', label: labels.BOOK },
    { id: 'writer', label: labels.WRITER },
    { id: 'publisher', label: labels.PUBLISHER },
    { id: 'publishingYear', label: labels.PUBLISHING_YEAR }
  ];
  const storeFields = [
    { id: 'name', label: labels.STORE },
    { id: 'address', label: labels.ADDRESS },
    { id: 'phone', label: labels.PHONE }
  ];

  return (
    <div style={{ backgroundColor: 'white', width: '98%' }}>
      <Row>
        <Col style={{ marginLeft: '10px' }} className="col-md-auto">
          <TransactionItemElement
            element={props.item.store}
            fields={storeFields}
          />
        </Col>
        <Col className="col-md-auto">
          <TransactionItemElement
            element={props.item.book}
            fields={bookFields}
          />
        </Col>
        <Col>
          <Label>{labels.QUANTITY + ': ' + props.item.quantity}</Label>
          <br />
          <Label>{labels.PRICE + ': $' + props.item.price}</Label>
        </Col>
      </Row>
      <hr />
    </div>
  );
}
