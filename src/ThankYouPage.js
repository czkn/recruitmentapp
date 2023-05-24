import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import "./ThankYouPage.css"

const ThankYouPage = () => {
  return(
      <Container className={"thank-you-container"}>
          <Row className="justify-content-center">
              <Col xs={12} md={8} lg={6}>
                  <Alert variant="success">
                      <Alert.Heading>Thank you!</Alert.Heading>
                      <p>
                          Your application has been successfully submitted. We will contact you as soon as possible.
                      </p>
                  </Alert>
              </Col>
          </Row>
      </Container>
  );
}

export default ThankYouPage;