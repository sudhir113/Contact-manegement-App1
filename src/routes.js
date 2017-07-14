import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import ContactsPage from './components/contact/ContactsPage';
import EditSaveContactPage from './components/contact/EditSaveContactPage';











export default (
  <Route path="/" component={App}>
     <IndexRoute to="/" component={HomePage}/>
    <Route path="Contacts" component={ContactsPage} />
    <Route path="Contact" component={EditSaveContactPage} />
    <Route path="Contact/:id" component={EditSaveContactPage} />
  </Route>
);
