import React from 'react';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { Button, Input } from '@material-ui/core';

export default function AddToCart(props) {
  return (
    <React.Fragment>
      <Button
        style={{ backgroundColor: '#f5c518' }}
        onClick={() => props.addToCart(props.item)}
      >
        <AddShoppingCartIcon></AddShoppingCartIcon>
      </Button>
      <Input
        type="number"
        style={{ width: '50px', marginLeft: '5px' }}
        value={props.item[props.quantityField]}
        onChange={e =>
          props.onChange({
            [props.itemField]: props.item[props.itemField],
            [props.storeField]: props.item[props.storeField],
            [props.quantityField]: e.target.value
          })
        }
      ></Input>
    </React.Fragment>
  );
}
