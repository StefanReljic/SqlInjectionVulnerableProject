import React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Button } from '@material-ui/core';
import './styles/shopping_cart.css';

export default function ShoppingCart(props) {
  return (
    <div className="shoppingCart">
      <Button className="shoppingCartButton">
        <ShoppingCartIcon style={{ color: props.color }}></ShoppingCartIcon>
        <div style={{ color: props.color }}>{props.totalItems}</div>
      </Button>
    </div>
  );
}
