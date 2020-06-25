import React, { Component } from 'react';
import M from "materialize-css/dist/js/materialize.min.js"
import {Carousel} from "react-materialize";
export default class modal extends Component {

    componentDidMount() {
       
    }
  render() {
    return <div >
        <Carousel
  carouselId="Carousel-2"
  images={[
    'https://picsum.photos/200/300?image=0',
    'https://picsum.photos/200/300?image=1',
    'https://picsum.photos/200/300?image=2',
    'https://picsum.photos/200/300?image=3',
    'https://picsum.photos/200/300?image=4'
  ]}
  options={{
    dist: -100,
    duration: 200,
    fullWidth: false,
    indicators: false,
    noWrap: false,
    numVisible: 5,
    onCycleTo: null,
    padding: 0,
    shift: 0
  }}
/>
        </div>;
  }
}
