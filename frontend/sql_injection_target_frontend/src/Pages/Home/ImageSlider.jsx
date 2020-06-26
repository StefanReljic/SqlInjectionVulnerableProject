import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Button, Container } from '@material-ui/core';
import { Row } from 'reactstrap';

export default function ImageSlider(props) {
  const createImageSlide = props => {
    return (
      <Container key={props.title} style={{ paddingBottom: '40px' }}>
        <img
          src={props.image}
          style={{ maxWidth: '300px', maxHeight: '300px' }}
          alt=""
        ></img>
        <Row className="justify-content-md-center">
          <font color="white">Title:{props.title}</font>
        </Row>
        <Row className="justify-content-md-center">
          <font color="white">Price:{props.price}</font>
        </Row>
        <Row className="justify-content-md-center">
          <Button style={{ backgroundColor: '#f5c518' }}>
            <b>Add to cart</b>
          </Button>
        </Row>
      </Container>
    );
  };

  return (
    <Carousel width="50%">
      {props.data.map(data =>
        createImageSlide({
          image: data.image,
          title: data.title,
          price: data.price
        })
      )}
    </Carousel>
  );
}
