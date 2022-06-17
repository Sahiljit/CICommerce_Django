import React from 'react'
import {Card, CardActions, CardContent, CardMedia, Button, Rating, Typography} from '@mui/material'
import {Link} from 'react-router-dom'



const Product = ({product}) => {
    return (
        
        <Card sx={{ maxWidth: 345 }}>
      <Link to = {`/product/${product._id}`}>
      <CardMedia
        component="img"
        image= {product.image}
        alt= {product.name}
      />
      </Link>
      <CardContent>
        <Link to = {`/product/${product._id}`}>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        </Link>        
        <Typography variant="body2" color="text.secondary">
          {product.rating} from {product.numReviews} reviews
        </Typography>
        <Rating name="half-rating-read" value={product.rating}  precision={0.5} readOnly />
        <Typography variant="h8" color="text.primary">
        &#8377; {product.price}
        </Typography>
        
      </CardContent>
    
    </Card>
            
        
    )
}

export default Product
