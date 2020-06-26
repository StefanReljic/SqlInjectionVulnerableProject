import React from 'react';
import { Label } from 'reactstrap';

export default function TransactionItemElement(props) {
  return (
    <div>
      {props.fields.map((field, index) => {
        return (
          <div key={index}>
            <Label>{field.label + ': ' + props.element[field.id]}</Label>
            <br />
          </div>
        );
      })}
    </div>
  );
}
