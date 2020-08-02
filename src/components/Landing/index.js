import React from 'react';

import Shelf from '../Shelf';
import Filter from '../Shelf/Filter';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import FloatCart from '../FloatCart';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Button from '@material-ui/core/Button';
import Banner from '../banner';
import {productslide} from '../Shelf/ProductList'
import { connect } from 'react-redux';
import axios from 'axios';
import Product from '../Shelf/ProductList/Product'
import { productsAPI } from '../../services/util';
const Landing = ({products}) => {
  const settings = {
    dots: true,
    infinite: true,
   
    autoplay: true,
      speed: 5000,
      autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
 const [prod,setprod]=React.useState()
React.useEffect(()=>{
  axios
  .get(productsAPI)
  .then(res => {
    let { products } = res.data;
setprod(products)
   
    
  })
  .catch(err => {
    console.log('Could not fetch products. Try again later.');
  });

},[])
  return (
    <React.Fragment style={{ marginTop: '280px' }}>
      <Slider {...settings} style={{ maxWidth: '100vw',marginTop:'30px' }}>
        <div>
          <div className="carouselstyle">
            <div
              style={{
                dispay: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                maxWidth: '40%',
                margin: '50px',
              }}
            >
              <h3>Lorem ipsum dolor sit amet.</h3>
              <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
              <h3>
                starting at:<span className="hard">30,000/month</span>{' '}
              </h3>
              <Button variant="contained" color="primary">
                Shop now
              </Button>
            </div>

            <img src={require('../../static/iphone.png')} alt="" />
          </div>
        </div>
        <div>
          <div className="carouselstyle">
            <div
              style={{
                dispay: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                maxWidth: '40%',
                margin: '50px',
              }}
            >
              <h3>Lorem ipsum dolor sit amet.</h3>
              <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
              <h3>
                starting at:<span className="hard">30,000/month</span>{' '}
              </h3>
              <Button variant="contained" color="primary">
                Shop now
              </Button>
            </div>

            <img src={require('../../static/mac.png')} alt="" />
          </div>
        </div>
        <div>
          <div className="carouselstyle">
            <div
              style={{
                dispay: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                maxWidth: '40%',
                margin: '50px',
              }}
            >
              <h3>Lorem ipsum dolor sit amet.</h3>
              <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
              <h3>
                starting at:<span className="hard">30,000/month</span>{' '}
              </h3>
              <Button variant="contained" color="primary">
                Shop now
              </Button>
            </div>

            <img src={require('../../static/ap.png')} alt="" />
          </div>
        </div>
        <div>
          <div className="carouselstyle">
            <div
              style={{
                dispay: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                maxWidth: '40%',
                margin: '50px',
              }}
            >
              <h3>Lorem ipsum dolor sit amet.</h3>
              <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
              <h3>
                starting at:<span className="hard">30,000/month</span>{' '}
              </h3>
              <Button variant="contained" color="primary">
                Shop now
              </Button>
            </div>

            <img src={require('../../static/app.png')} alt="" />
          </div>
        </div>
        <div>
          <div className="carouselstyle">
            <div
              style={{
                dispay: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                maxWidth: '40%',
                margin: '50px',
              }}
            >
              <h3>Lorem ipsum dolor sit amet.</h3>
              <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
              <h3>
                starting at:<span className="hard">30,000/month</span>{' '}
              </h3>
              <Button variant="contained" color="primary">
                Shop now
              </Button>
            </div>

            <img src={require('../../static/ap.png')} alt="" />
          </div>
        </div>

      </Slider>
     

     <Shelf/>
       
     
      <FloatCart />
    </React.Fragment>
  );
};
const mapStateToProps = (state) => ({
  products: state.shelf.products,
  
});


export default  connect(mapStateToProps)(Landing);
