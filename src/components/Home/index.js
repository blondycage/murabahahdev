import React from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import Messages from '../Messages';
import Shelf from '../Shelf';
import Filter from '../Shelf/Filter';
import Banner from '../banner';
import FloatCart from '../FloatCart';
import Car from '../FloatCart/modal';
import {Col,Row} from 'react-materialize';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from 'react-responsive-carousel';

const HomePage = () => (
  <div  style={{marginTop:"60px"}}>
   <Carousel  className="carouselme" showThumbs={false} dynamicHeight={true} autoPlay={true} swipeable={true} stopOnHover={false} infiniteLoop={true} showArrows={false}>
                <div>
                    <img src={require("../../static/ps5.jpg")} />
                   
                </div>
                <div>
                    <img src={require("../../static/xbanner.jpg")} />
                   
                </div>
                <div>
                    <img src={require("../../static/ha.png")} />
                   
                </div>
            </Carousel>
   
  
    
    
    <main>
    
    
      <Filter />

      <Shelf />
    </main>
    <FloatCart />
  </div>
);

const condition = authUser => !!authUser;

export default compose(withAuthorization(condition))(HomePage);
