import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './common/Navbar';
import ProductList from './components/Product/ProductList';
import AddProduct from './components/Product/AddProduct';
import ClientList from './components/Client/ClientList';
import AddClient from './components/Client/AddClient';
import CategoryList from './components/Category/CategoryList';
import AddCategory from './components/Category/AddCategory';
import InvoiceList from './components/Invoice/InvoiceList';
import AddInvoice from './components/Invoice/AddInvoice';
import NotFound from './common/NotFound';
import Home from './common/Home';

const App = () => {
  return (
      <Router>
        <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/products" component={ProductList} />
            <Route path="/add-product" component={AddProduct} />
            <Route path="/product/edit/:id" component={AddProduct} />
            <Route path="/clients" component={ClientList} />
            <Route path="/add-client" component={AddClient} />
            <Route path="/client/edit/:id" component={AddClient} />
            <Route path="/categories" component={CategoryList} />
            <Route path="/add-category" component={AddCategory} />
            <Route path="/category/edit/:id" component={AddCategory} />
            <Route path="/invoices" component={InvoiceList} />
            <Route path="/add-invoice" component={AddInvoice} />
            <Route path="/invoice/edit/:id" component={AddInvoice} />
            <Route path="*" component={NotFound} />
          </Switch>
      </Router>
  );
}

export default App;
