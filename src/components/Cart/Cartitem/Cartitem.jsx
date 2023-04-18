import { Card, CardMedia, CardActions,CardContent,Typography,Button } from "@mui/material";


function Cartitem({item ,handleRemoveFromCart,handleUpdateCart}) {

  return (
    <Card >
        <CardMedia  image={item.image.url} title= {item.name} sx={{paddingTop:'66.25%'}}/> 
        <CardContent sx={{display:'flex' , justifyContent:'space-between'}}>
            <Typography variant="h4">{item.name}</Typography>
            <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
        </CardContent>
        <CardActions sx={{display:'flex' , justifyContent:'space-between'}}>
          <div style={{display:'flex' , alignItems:'center' ,border:'1px solid grey' , borderRadius:'5px'}}>
            <Button size="small" type="button"  onClick={()=>handleUpdateCart(item.id,item.quantity - 1)}>-</Button>
            <Typography >{item.quantity}</Typography>
            <Button size="small" type="button"  onClick={()=>handleUpdateCart(item.id,item.quantity + 1)} >+</Button>
          </div>
          <Button variant="contained" type="button" color="error" onClick={()=>handleRemoveFromCart(item.id)}>Remove</Button>
        </CardActions>
    </Card>
  )
}

export default Cartitem