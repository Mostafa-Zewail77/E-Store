
import { ListItem, Typography, List, ListItemText } from "@mui/material"

function Review({checkoutToken}) {
    
  return (
    <>
        <Typography variant="h6" gutterBottom>Order Summary</Typography>
        <List disablePadding>
            {
                checkoutToken.line_items.map((product)=>(
                    <ListItem sx={{ p:'10px 0'}} key= {product.name}>
                        <ListItemText primary= {product.product_name} secondary={`Quantity: ${product.quantity}`}/>
                        <Typography variant="body2">{product.line_total.formatted_with_symbol}</Typography>
                    </ListItem>
                ) )
            }
            <ListItem sx={{ p:'10px 0'}}>
                <ListItemText primary= 'Total' />
                <Typography variant="subtitle1" color='#1b5e20' sx={{fontWeight:700}}>
                    {checkoutToken.subtotal.formatted_with_symbol}
                </Typography>
            </ListItem>
        </List>
    </>
  )
}

export default Review