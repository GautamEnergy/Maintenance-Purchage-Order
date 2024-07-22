
import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import image1 from "../Assets/Images/LOGO.png"
import './Dashboard.css'
import img2 from "../Assets/Images/order-now.png"
import img5 from "../Assets/Images/user.png";
import img4 from "../Assets/Images/automation.png";
import img3 from "../Assets/Images/engineering.png"

export default function Dashboard() {
    return (
        <Container className="py-4" style={{ background: "white", borderRadius: '1rem', marginTop: "85px" }}>
            <Row className="justify-content-center mb-5">
                <Image src={image1} alt="Value Care Logo" style={{ width: '20%', height: '80%', marginTop: "5px", marginBottom: "-30px" }} />
            </Row>
            {/* <Row className="justify-content-center mb-4">
                <h1 className="text-center">What type of engagement do you anticipate with Value Care?</h1>
            </Row> */}
            <Row>
                <Col xs={12} md={4} className="mb-4">
                    <Link to="/purchage" className="card-link">
                        <Card style={{ height: "110px", backgroundColor: "#D5D0F0" }} className=" card-hover">
                            <Card.Body className="d-flex align-items-center">
                                <Image src={img2} alt="wheelchair icon" className="mr-4" rounded style={{ width: '10%' }} />
                                <Card.Text style={{ paddingLeft: "15px", fontSize: "20px", fontWeight: "bold" }} className="no-underline">Purchase Order</Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
                <Col xs={12} md={4} className="mb-4">
                    <Link to="/spare" className="card-link">
                        <Card className="h-100 card-hover text-black" style={{ backgroundColor: "rgb(181 181 181)" }}>
                            <Card.Body className="d-flex align-items-center">
                                <Image src={img3} alt="caregiver icon" className="mr-4" rounded style={{ width: '10%' }} />
                                <Card.Text style={{ paddingLeft: "15px", fontSize: "20px", fontWeight: "bold" }} className="no-underline">Add Spare Part</Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>

                <Col xs={12} md={4} className="mb-4">
                    <Link to="/polist" className="card-link">
                        <Card className="h-100 card-hover text-black" style={{ backgroundColor: "rgb(181 181 181)" }}>
                            <Card.Body className="d-flex align-items-center">
                                <Image src={img3} alt="caregiver icon" className="mr-4" rounded style={{ width: '10%' }} />
                                <Card.Text style={{ paddingLeft: "15px", fontSize: "20px", fontWeight: "bold" }} className="no-underline">PO List</Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>


                <Col xs={12} md={6} className="mb-4">
                    <Link to="/machine" className="card-link">
                        <Card style={{ height: "110px", backgroundColor: "rgb(181 181 181)" }} className=" card-hover" >
                            <Card.Body className="d-flex align-items-center">
                                <Image src={img4} alt="support coordinator icon" className="mr-4" rounded style={{ width: '10%' }} />
                                <Card.Text style={{ paddingLeft: "15px", fontSize: "20px", fontWeight: "bold" }} className="no-underline">Add Machine</Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
                <Col xs={12} md={6} className="mb-4">
                    <Link to="/newParty" className="card-link" >
                        <Card className="h-100 card-hover" style={{ backgroundColor: "#D5D0F0" }}>
                            <Card.Body className="d-flex align-items-center">
                                <Image src={img5} alt="calendar icon" className="mr-4" rounded style={{ width: '10%' }} />
                                <Card.Text style={{ paddingLeft: "15px", fontSize: "20px", fontWeight: "bold" }} className="no-underline ">Add New Party</Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>

            </Row>
        </Container>
    );
}

