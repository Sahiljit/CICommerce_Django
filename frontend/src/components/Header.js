import React from 'react'
import {AppBar,Toolbar,IconButton, Typography, Button, Link} from '@mui/material'
import { makeStyles } from '@mui/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import {Link as RouterLink} from 'react-router-dom'

// const useStyles = makeStyles({
//     root: {
//       height: 70,
//     },
//   });

const Header = () => {
    // const classes = useStyles();
    return (
        <div>
        <AppBar position="static">
        <Toolbar sx = {{ height : 70}}> 
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml : 4 }}>
          <Link component = {RouterLink} to = "/" color = "inherit" underline = "none">
            CICommerce
          </Link>   
          </Typography>  
            

          <Button component ={RouterLink} to = "/cart" color="inherit" startIcon = {<ShoppingCartIcon/>} sx = {{ mr : 2}} >Cart</Button>
          <Button component ={RouterLink} to = "/login"  color="inherit" startIcon = {<PersonIcon/>} sx = {{ mr : 4}}>Login</Button>
        </Toolbar>
      </AppBar>
            
        </div>
    )
}

export default Header
