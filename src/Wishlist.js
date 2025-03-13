import React, { useState, useEffect  } from "react";
import { Card, Row, Col, Button, Typography } from "antd";
import { HeartFilled } from "@ant-design/icons";

import { Router , useNavigate } from "react-router-dom";


const { Title } = Typography;
const { Meta } = Card;

const Wishlist = () => {
    const navigate = useNavigate();
  const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem("wishlist")) || []);

  const removeFromWishlist = (product) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== product.id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div className="wishlist-container" style={{ padding: "20px", textAlign: "center" }}>
      <Title level={2}>Your Wishlist</Title>
      <Row gutter={[16, 16]} justify="center">
        {wishlist.length === 0 ? (
          <p>No items in wishlist.</p>
        ) : (
          wishlist.map((product) => (
            <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
              <Card
                hoverable
                cover={<img alt={product.name} src={product.images[0]?.src} style={{ height: "250px", objectFit: "cover" }} />}
                actions={[
                  <HeartFilled style={{ color: "red" }} onClick={() => removeFromWishlist(product)} />,
                ]}
              >
                <Meta title={product.name} description={`$${product.price}`} />
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default Wishlist;