import React, { useState } from 'react'

export default function CheckoutPage() {
  const [form, setForm] = useState({
    name:'', address:'', card:''
  });
  
  function handleChange(e){
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  function handleSubmit(e){
    e.preventDefault();
    console.log('Processing payment with', form);
  }

  return (
    <div>
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name
          </label>
          <input type='text' name='name' value={form.name} 
           onChange={handleChange} required
          />
        </div>
        <div>
          <label>
            Address
          </label>
          <input type='text' name='address' value={form.address} 
           onChange={handleChange} required/>
        </div>
        <div>
          <label>
            Card Details
          </label>
          <input type='text' name='card' value={form.card} 
           onChange={handleChange} required/>
        </div>
        <button type='submit'>Pay</button>
      </form>
    </div>
  )
}
