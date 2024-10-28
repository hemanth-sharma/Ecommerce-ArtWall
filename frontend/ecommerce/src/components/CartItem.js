// CartItem.js
import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";



function CartItem({ product, onRemove }) {
    
    const renderRatingStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <FaStar key={i} className={i < rating ? "text-warning" : "text-muted"} />
            );
        }
        return stars;
    };

    return (
        <Card className="cart-item mb-3">
            <Row className="align-items-center">
                <Col md={2}>
                <Link to={`/product/${product.product._id}`}>
                    <Card.Img
                        variant="top"
                        src={product.product.image} // Assuming image URL is available here
                        alt={product.product.name}
                        className="poster-image"
                        style={{ width: "100%", height: "auto" }} // Adjust the styling as necessary
                    />
                </Link>
                </Col>
                <Col md={10}>
                    <Card.Body>
                        <Card.Title>{product.product.name}</Card.Title>
                        <Card.Text>
                            Price: <strong>₹{product.product.price * product.quantity}</strong> <br />
                            Quantity: <strong>{product.quantity}</strong>
                        </Card.Text>
                        <div className="d-flex align-items-center">
                            <span>{product.product.rating}</span>
                            {renderRatingStars(product.product.rating)}
                            <p className="mb-0 ml-2">({product.product.reviews_count} reviews)</p>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                            <Button variant="danger" size="sm" onClick={() => onRemove(product.product._id)}>
                                Remove
                            </Button>
                            <Button variant="success" size="sm">
                                Buy
                            </Button>
                        </div>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}

export default CartItem;
