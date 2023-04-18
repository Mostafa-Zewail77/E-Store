import { AppBar, Toolbar, IconButton, Badge, Typography } from "@mui/material"
import { ShoppingCart } from "@mui/icons-material"
import logo from '../../assets/commerce.png'
import { Link, useLocation } from "react-router-dom"

function Navbar({cartItems}) {
  const location =  useLocation()
  return (
    <>
        <AppBar position="fixed"  color="inherit" 
          sx={{
            boxShadow: 'none',
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          }}
        >
            <Toolbar >
                <Typography component={Link} to="/"  variant="h6" color='inherit' 
                  sx={{
                    display:'flex' , 
                    alignItems:'center',
                    flexGrow: .2,
                    textDecoration:'none'
                    
                   }}
                >
                  <img src={logo} alt="logo" height='25px' style={{marginRight:'10px'}} />
                  Store
                    
                </Typography>
                <div style= {{flexGrow:'1'}}/>
                { location.pathname === '/' &&(
                  <div>
                  <IconButton component={Link} to="/cart" aria-label="Show Cart items" color= 'inherit'>
                    <Badge badgeContent={cartItems} color ="error">
                      <ShoppingCart/>
                    </Badge>
                  </IconButton>
                </div>
                )
                }
              

            </Toolbar>
        </AppBar>
    </>
  )
}

export default Navbar