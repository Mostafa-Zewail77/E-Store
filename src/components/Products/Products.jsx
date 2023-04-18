import { Grid } from '@mui/material'
import Product from './Product/Product'



function Products({ products, onAddToCart }) {
    
  return (
    
        <Grid container justifyContent='center' spacing={4} marginTop='64px' padding='15px'>
            {
                products.map((product)=>(
                    <Grid item key={product.id}  xs={12} sm= {6} md={4} lg= {3}>
                        <Product product={product} onAddToCart={onAddToCart} />
                    </Grid> 
                ))
            }
          
        </Grid>
    
  
  )
}

export default Products


