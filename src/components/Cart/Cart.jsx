import React from 'react'
import { Container,Typography,  Button, Grid } from '@mui/material'
import Cartitem from './Cartitem/Cartitem';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';


function Cart({ cart ,handleUpdateCart , handleRemoveFromCart, handleEmptyCart}) {

  const EmptyCart = ()=>(
    <Typography  variant='subtitle2' align='center' mt='15%'>You have no items in your shopping cart, 
      <Link  to= "/" style={{textDecoration:'none'}} > start adding some</Link>!
    </Typography>
    
  )

  const FilledCart = ()=>(
    <>
      <Grid container spacing={3}>
        {
        cart.line_items.map(( item )=> (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Cartitem item = {item} handleUpdateCart ={handleUpdateCart} handleRemoveFromCart ={handleRemoveFromCart}/>
          </Grid>
        ))
        }
      </Grid>
      <div style ={{display:'flex',marginTop:'10%', width:'100%', justifyContent:'space-between' }}>
        <Typography variant='h4'>
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button type='button' variant='contained' color='secondary' size='large'sx={{minWidth:'150px', mr:'20px'}} onClick ={handleEmptyCart}>Empty Cart</Button>
          <Button component={Link} to ='/checkout' variant='contained' color='primary' size='large'sx={{minWidth:'150px'}}>Checkout</Button>
        </div>
      </div>
    </>
  )
  if (!cart) return <Loader/>
  
  return (
    <Container sx={{marginTop:"64px"}}>
        
        <Typography variant='h3' gutterBottom>Your Shopping Cart </Typography>
        {!cart.line_items.length? <EmptyCart/> : <FilledCart/>}
    
    </Container>
  )
}

export default Cart