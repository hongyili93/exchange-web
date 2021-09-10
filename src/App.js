import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Converter from './ui/ConverterPage';

const App = () => 
<Router>
  <Route path="/" component={Converter} />
</Router>

export default App;
