import React from 'react';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

const Cards = (props) => {
  return (
    <div className="container" style={cardStyle}>
        {/* <Row> */}
            <Col md="3">
                <Card body style={colStyle}>
                    <CardTitle><strong>Request Tag</strong></CardTitle>
                    <CardText>1. Click Request Tag.</CardText>
                    <CardText>2. fill information is name, email address.</CardText>
                    <CardText>3. Pet-Connect will send tag for you.</CardText>
                </Card>
            </Col>
            <Col md="3">
                <Card body style={colStyle}>
                    <CardTitle><strong>Register Tag</strong></CardTitle>
                    <CardText>1. Click Create Pet.</CardText>
                    <CardText>2. Add information by ID and Pin get from Email.</CardText>
                    <CardText>3. Your pet created by pet owner can inform when lost, find and delete.</CardText>
                </Card>
            </Col>
            <Col md="3">
                <Card body style={colStyle}>
                    <CardTitle><strong>Update Profile</strong></CardTitle>
                    <CardText>1. Click Update Profile.</CardText>
                    <CardText>2. Fill information that want to edit profile.</CardText>
                    <CardText>3. Click submit then information was updated.</CardText>
                </Card>
            </Col>
            <Col md="3">
                <Card body style={colStyle}>
                    <CardTitle><strong>Inform when found pet lost</strong></CardTitle>
                    <CardText>1. Scan QR Code that attached to the collar.</CardText>
                    <CardText>2. See information of pet lost.</CardText>
                    <CardText>Thank you for help pet :D</CardText>
                </Card>
            </Col>
        {/* </Row> */}
    </div>
    
  );
};

const cardStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItem: 'center',
};

const colStyle = {
    backgroundColor: '#FFB21A',
    minHeight: '100%',
};

export default Cards;