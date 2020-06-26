import React from 'react';
import { Input, Label, FormGroup } from 'reactstrap';

export default function InputField(props) {
  return (
    <FormGroup>
      <Label style={props.labelStyle}>
        {props.label}
        {props.required && <font color="red">*</font>}
      </Label>
      <Input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        readOnly={props.readOnly}
        disabled={props.disabled}
        onChange={e =>
          props.onChange({
            field: props.id,
            value: e.target.value
          })
        }
      ></Input>
    </FormGroup>
  );
}
