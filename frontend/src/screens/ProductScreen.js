import React, { useEffect,useContext, useState } from 'react'
import StateContext from '../context/Context';
import {Button, Container, Card, CardMedia, Grid, Typography, Divider, Rating} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { makeStyles } from '@mui/styles';
import {Link as RouterLink} from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const useStyles = makeStyles({
    root: {
      paddingTop: 30
    },
  });
  

const ProductScreen = ({match, history}) => {

    const [qty, setQty] = useState(1)

    const {productDetails, listProductDetails } = useContext(StateContext)
    const {loading, error, product} = productDetails

  
    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)

    }

    useEffect(()=> {

        // async function fetchProduct(){
        //     const {data} = await axios.get(`/restapi/products/${match.params.id}`)
        //     setProduct(data)
        // }
        // fetchProduct()
        listProductDetails(match.params.id)

    },[match])

    const classes = useStyles();
    return (
        <Container className = {classes.root} maxWidth = "lg" >
            <Button  component = {RouterLink} to = "/" variant = "outlined"  startIcon = {<ArrowBackIcon/>}>
                GO BACK
            </Button>

            {loading?
            <Box sx={{ display: 'flex' }}>
            <CircularProgress />
            </Box>
            :error ? <h3>{error}</h3>
            :
            <Grid container  pt = {2} spacing = {6}>
                <Grid item md = {6}>
                    <Card>
                        <CardMedia 
                        component = "img"
                        image= {product.image}
                        alt = {product.name}
                        />
                    </Card>
                </Grid>
                <Grid item md = {3} >                   

                        <Grid spacing = {6} rowSpacing = {5}>   
                     
                        <Grid item md = {12} >
                        <Typography gutterBottom variant="h6" component="div">
                        {product.name}
                        </Typography>                     
                        <Divider/>
                        </Grid>
                     
                    

                        <Grid item md = {12}>
                        <Rating name="half-rating-read" value={product.rating}  precision={0.5} readOnly />
                        <Typography gutterBottom variant="h8" component="span">
                            {product.numReviews} reviews
                        </Typography>
                        <Divider/>                      
                     </Grid>
                
                      <Grid item md = {12}>
                        <Typography gutterBottom variant="h8" component="span">
                             Price : &#8377; {product.price}
                        </Typography>
                        <Divider/>
                     </Grid>

                        <Grid item>
                        <Typography gutterBottom variant="h8" component="span">
                            Description : {product.description}
                        </Typography>
                        <Divider/>
                       </Grid>

                     
                 </Grid>
                    
                </Grid>

                <Grid item md = {3}>
                        <Typography gutterBottom variant="h5" component="span">
                             Price : &#8377; {product.price}
                        </Typography>
                        <Divider/>

                        Status : {product.countInStock >0 ? 'In stock' : 'Out of Stock'}

                        <Divider/>
                      
                      {product.countInStock >0 && (
                           <Box sx={{ minWidth: 120 }}>
                           <FormControl fullWidth>
                               <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
                               <Select
                               labelId="demo-simple-select-label"
                               id="demo-simple-select"
                               value={qty}
                               label="Quantity"
                               onChange={(e)=>{setQty(e.target.value)}}
                               >
                            {
                                [...Array(product.countInStock).keys()].map((x) =>(
                                    <MenuItem value={x+1}>{x+1}</MenuItem>                                   
                                    ))
                            }
                              
                    
                            </Select>
                           </FormControl>
                             </Box>
                      )}
                       

                        <Button variant = "contained" onClick= {addToCartHandler}  disabled = {product.countInStock === 0} > Add to Cart</Button>

                </Grid>

            </Grid>}

            

        
          
        </Container>
    )
}

export default ProductScreen
