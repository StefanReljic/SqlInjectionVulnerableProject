import React from 'react';
import { Switch } from 'react-router-dom';
import RouteWrapper from './RouteWrapper';
import Login from '../Pages/Public/Login';
import Books from '../Pages/Books/Books';
import Stores from '../Pages/Stores/Stores';
import Home from '../Pages/Home/Home';
import Cart from '../Pages/Cart/Cart';
import Register from '../Pages/Public/Register';
import Transactions from '../Pages/Transactions/Transactions';

export default function Routes() {
  return (
    <Switch>
      <RouteWrapper path="/home" component={Home} />
      <RouteWrapper path="/stores" component={Stores} />
      <RouteWrapper path="/books" component={Books} />
      <RouteWrapper path="/cart" component={Cart} />
      <RouteWrapper path="/transactions" component={Transactions} />
      <RouteWrapper path="/register" component={Register} isPublic />
      <RouteWrapper path="/login" component={Login} isPublic={true} />
      <RouteWrapper component={Login} />
    </Switch>
  );
}
