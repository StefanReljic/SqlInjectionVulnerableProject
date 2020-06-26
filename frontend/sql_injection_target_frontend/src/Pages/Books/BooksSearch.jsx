import React from 'react';
import { Col } from 'reactstrap';
import InputField from '../SharedComponents/InputField';
import * as labels from '../labels';

export default function BooksSearch(props) {
  const fields = [
    { id: 'name', label: labels.NAME, type: 'text' },
    { id: 'writer', label: labels.WRITER, type: 'text' },
    { id: 'publisher', label: labels.PUBLISHER, type: 'text' }
  ];
  return (
    <Col>
      {fields.map(field => (
        <InputField
          key={field.id}
          id={field.id}
          type={field.type}
          label={field.label}
          labelStyle={{ color: 'white' }}
          placeholder={field.label}
          value={props.searchParams[field.id]}
          onChange={props.onChange}
        ></InputField>
      ))}
    </Col>
  );
}
