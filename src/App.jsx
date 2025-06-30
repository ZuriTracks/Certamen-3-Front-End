import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [itemToEdit,setItemToEdit] = useState(null);

  useEffect(() => {
    const storedItems = 
    JSON.parse(localStorage.getItem('items')) ||[];
    
