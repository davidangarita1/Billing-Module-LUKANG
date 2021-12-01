import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductList from './components/ProductList';
import ClientList from './components/ClientList';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from './components/NotFound';
import AddProduct from './components/AddProduct';

const App = () => {
  return (
      <Router>
        <Navbar />
          <Switch>
            <Route exact path="/" component={ProductList} />
            <Route path="/products" component={ProductList} />
            <Route path="/add-product" component={AddProduct} />
            <Route path="/product/edit/:id" component={AddProduct} />
            <Route path="/clients" component={ClientList} />
            <Route path="*" component={NotFound} />
          </Switch>
      </Router>
  );
}

export default App;
