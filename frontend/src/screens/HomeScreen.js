import React, {useState, useEffect, useContext} from 'react'
import StateContext from '../context/Context'
import {Grid, Button, Container} from '@mui/material'
import Product from '../components/Product'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const HomeScreen = () => {

    

    const {productlist, listProducts } = useContext(StateContext)
    const {error,loading,products} = productlist
  
    useEffect(()=>{
        listProducts()    

    }, [])


    return (
        <div>
            <h1>Recommended Products</h1>
            {loading ?
            <Box sx={{ display: 'flex' }}>
            <CircularProgress />
            </Box>
            :error ? <h3>{error}</h3>
            :
            <Container maxWidth = "lg">
            <Grid container spacing = {6} justifyContent = "center">               
                    {products.map(product => (
                       <Grid item md = {4}>
                            <Product product = {product}/>
                        </Grid>                      
                    ))}      
            </Grid>
            </Container>}
            
            
        </div>
    )
}

export default HomeScreen
