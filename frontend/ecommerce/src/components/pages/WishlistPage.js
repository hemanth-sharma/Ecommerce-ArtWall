import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get('/api/wishlist/');
        if (response.data && response.data.length > 0){
          setWishlist(response.data);
        }
        else {
          const localWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
          setWishlist(localWishlist)
        }
        setLoading(false);
      } catch (err) {
        const localWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlist(localWishlist)
        // setError("Error fetching wishlist");
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  if (loading) return <><p>Loading....</p></>;
  if (error) return <><p>{error}</p></>;

  return (
    <Container>
      <h2>My Wishlist</h2>
      <Row>
        {wishlist.length > 0 ? (
          wishlist.map((product) => (
            <Col key={product.id} md={4}>
              <Card className="mb-4">
                <Link to={`/product/${product.id}`}>
                  <Card.Img variant="top" src={product.image} alt={product.name} />
                </Link>
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>Price: ${product.price.toFixed(2)}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>Your wishlist is empty.</p>
        )}
      </Row>
    </Container>
  );
}

export default WishlistPage;
