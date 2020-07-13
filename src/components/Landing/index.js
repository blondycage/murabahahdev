import React from 'react';

import Shelf from '../Shelf';
import Filter from '../Shelf/Filter';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from 'react-responsive-carousel';
import FloatCart from '../FloatCart';
import Banner from '../banner'

const Landing = () => (
  <React.Fragment style={{marginTop:"280px"}}>
     <Carousel showThumbs={false} dynamicHeight={true} autoPlay={true} swipeable={true} stopOnHover={false} infiniteLoop={true} showArrows={false} className="carouselme">
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
  </React.Fragment>
);

export default Landing;