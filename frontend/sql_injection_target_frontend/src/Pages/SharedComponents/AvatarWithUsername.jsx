import React from 'react';
import { Row, Col } from 'reactstrap';
import * as image from '../../Images/no_user_photo.png';
import './styles/avatar_with_username.css';

export default function AvatarWithUsername(props) {
  return (
    <Row className="dropbtn">
      <Col
        style={{ textAlign: 'center', marginTop: '10px' }}
        className="col-md-auto"
      >
        {props.username}
      </Col>
      <Col>
        <img src={props.photo || image} alt="Avatar" className="image" />
      </Col>
    </Row>
  );
}
