import React from 'react';
import { Row, Col } from 'reactstrap';
import { Button } from '@material-ui/core';
import { removeButtonStyles } from './styles/removable_list';
import * as labels from '../labels';

export default function RemovableList(props) {
  return (
    <div>
      {props.list.map((item, index) => (
        <Row key={'list ' + index} className="m-2">
          <Col className="col-8">{item.description}</Col>
          <Col>
            <Button style={removeButtonStyles} onClick={item.removeItem}>
              {labels.REMOVE}
            </Button>
          </Col>
        </Row>
      ))}
    </div>
  );
}
