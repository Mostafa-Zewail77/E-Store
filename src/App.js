import { useEffect, useState } from 'react';

import { Navbar, Products ,Cart, Loader, Checkout} from './components';
import {commerce} from './lib/commerce'
import { Route, Routes } from 'react-router-dom';


function App() {
  const [products, setproducts] = useState([])
  const [cart, setcart] = useState()
  const [order, setOrder] = useState({})
  const [errorMessage, setErrorMessage] = useState('');

  const fetchProducts = async()=>{
    const {data} = await commerce.products.list()
    setproducts(data)
  } 

  const fetchCart = async()=>{
    setcart(await commerce.cart.retrieve())
    
  }

  const addToCart = async (productId, quantity) => {
    await commerce.cart.add(productId, quantity);
    fetchCart();
  };

  const handleUpdateCart = async (productId,quantity)=>{
    await commerce.cart.update (productId, {quantity});
    fetchCart();
  }

  const handleRemoveFromCart = async (productId)=>{
    await commerce.cart.remove(productId );
    fetchCart();
  }

  const handleEmptyCart = async ()=>{
    await commerce.cart.empty( );
    fetchCart();
  }

  const refreshCart  = async ()=>{
    const newCart = await commerce.cart.refresh()
    setcart (newCart)
  }

  const handleCapturecheckout = async (checkoutTokenId, newOrder)=>{
    try{

      const inComingOrder = await commerce.checkout.capture(checkoutTokenId,newOrder)
      setOrder(inComingOrder)
      refreshCart()
    } catch (error) {
      console.log(error);
      setErrorMessage(error.data.error.message);
    }
  }

  useEffect(() => {

    fetchProducts()
    fetchCart()
    
  }, []);

  if (!cart) return <Loader/>

  return (
    <div className="App">
      <Navbar cartItems={cart?.total_items ?? 0} />
      <Routes>
        <Route path='/' element ={<Products products = {products} onAddToCart= {addToCart}/>}/>
        <Route path='/cart' element= {cart ?
          <Cart cart={cart}
          handleUpdateCart ={handleUpdateCart}
          handleRemoveFromCart ={handleRemoveFromCart}
          handleEmptyCart ={handleEmptyCart}
          
          />
          :''}
        />
        <Route path='/checkout' element={<Checkout
          cart ={cart} 
          onCapturecheckout= {handleCapturecheckout}
          order ={order}
          error = {errorMessage}
          refreshCart= {refreshCart}
        />} />
      </Routes>
      
    </div>
  );
}

export default App;

