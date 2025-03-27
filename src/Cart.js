import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import PaymentComponent from './Payment'; 
function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(items);
  }, []);

  const removeFromCart = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0);

  const handlePaymentSuccess = (response) => {
    console.log("Payment successful:", response);
    alert("Thank you for your purchase!");
    setCartItems([]); 
    localStorage.removeItem("cartItems");
    
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {cartItems.map((item, index) => (
            <div key={index} style={{ border: '1px solid #ddd', padding: '10px', width: '200px' }}>
              <img src={item.image} alt={item.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
              <h4>{item.name}</h4>
              <p>${item.price}</p>
              <button onClick={() => removeFromCart(index)}>Remove from Cart</button>
            </div>
          ))}
        </div>
      )}
      <br />
      
      {cartItems.length > 0 && (
        <PaymentComponent amount={totalPrice} onSuccess={handlePaymentSuccess} />
      )}
    </div>
  );
}

export default Cart;
