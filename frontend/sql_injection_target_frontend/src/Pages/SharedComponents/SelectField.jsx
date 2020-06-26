import React from 'react';
import Select from 'react-select';
import { Label } from 'reactstrap';

export default function SelectField(props) {
  return (
    <div
      style={{
        width: props.calculateWidth ? getSelectWidth(props.options) : '100%',
        marginBottom: '10px'
      }}
    >
      <Label style={props.labelStyle}>
        {props.type} {props.required && <font color="red">*</font>}
      </Label>
      <Select
        value={props.options.find(option => option.value === props.value) || ''}
        options={props.options}
        onChange={props.onChange}
      ></Select>
    </div>
  );
}

function getSelectWidth(values) {
  if (values.length === 0) return 210;
  const maxWidth = 400;
  const magicSpacing = 10;
  const maxLength = Math.max(...values.map(value => value.label.length));
  return Math.min(maxWidth, magicSpacing * maxLength);
}
