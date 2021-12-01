import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './common/Navbar';
import ProductList from './components/Product/ProductList';
import AddProduct from './components/Product/AddProduct';
import ClientList from './components/Client/ClientList';
import NotFound from './common/NotFound';


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
