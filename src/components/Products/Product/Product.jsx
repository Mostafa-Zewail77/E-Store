// import {Card , Typography, CardActions , CardMedia ,CardContent ,IconButton} from '@mui/material'
// import { AddShoppingCart } from '@mui/icons-material'


// function Product( {product , onAddToCart}  ) {
//   const handleAddToCart = () => {
//     console.log(`Adding product ${product.id} to cart`);
//     onAddToCart(product.id, 1).then((response) => {
//       console.log(`Response:`, response);
//     });
//   };

//   return (
//     <Card sx={{Width:'100%',}}>
//         <CardMedia sx={{height:'0', paddingTop:'66.25%'}}image={product.image.url} title= {product.name} />
//         <CardContent>
//           <div style={{display:'flex',justifyContent:'space-between' }}>
//             <Typography variant= 'h5' >
//               {product.name}
//             </Typography>
//             <Typography variant= 'h6' color='#01579b' >
//               {product.price.formatted_with_symbol}
//             </Typography>
          
//           </div>
//           <Typography dangerouslySetInnerHTML={{__html: product.description}} variant='body2' color='textSecondary'/>            
      
//         </CardContent>
//         <CardActions disableSpacing sx={{display:'flex', justifyContent: 'flex-end'}}>
//           <IconButton aria-label='Add TO Cart' onClick={ handleAddToCart}>
//             <AddShoppingCart/>
//           </IconButton>
//         </CardActions>
//     </Card>
//   )
// }

// export default Product


import {
  Card,
  Typography,
  CardActions,
  CardMedia,
  CardContent,
  IconButton,
} from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";

function Product({ product, onAddToCart }) {
  const handleAddToCart = () => {
    onAddToCart(product.id, 1);
  };

  return (
    <Card sx={{ width: "100%" }}>
      <CardMedia sx={{height:'0', paddingTop: "76.25%"}} image={product.image.url} title={product.name} />
      <CardContent>
      <div style={{display:'flex', justifyContent:'space-between'}}>
          <Typography variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography  variant="h5" component="h2">
            ${product.price.formatted}
          </Typography>
      </div>

        <Typography
          dangerouslySetInnerHTML={{ __html: product.description }}
          variant="body2" color="textSecondary" component="p"
        />
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          aria-label="Add to Cart"
          onClick={handleAddToCart}
        >
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default Product;
