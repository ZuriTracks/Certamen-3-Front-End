import React, { useState, useEffect } from 'react';
import Form from './components/Form.jsx';
import List from './components/List.jsx';
import Item from './components/Item.jsx';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [itemToEdit,setItemToEdit] = useState(null);

  useEffect(() => {
    const storedItems = 
    JSON.parse(localStorage.getItem('items')) || [];
    setItems(storedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]); 

  const addOrUpdateItem = (value) => {
    if (itemToEdit) {
      setItems(items.map(item => item.id ===
      itemToEdit.id ? {...item,value } : item));
      setItemToEdit(null);
    } else {
      setItems([...items, { id: Date.now(),value}]);
    }
  };

const deleteItem = (id) => {
  setItems(items.filter(item => item.id !== id));
};

const editItem = (item) => {
  setItemToEdit(item);
};

return (
  <div className="App">
    <h1>CRUD con localStorage</h1>
    <Form 
      addOrUpdateItem={addOrUpdateItem}
      itemToEdit={itemToEdit} />
    <List items={items}
      deleteItem={deleteItem} editItem={editItem} />
  </div>
);
}

export default App;
