
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Row, Col, Spin, Typography, Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import axios from "axios";
import PaymentComponent from "./Payment";



const { Title } = Typography;
const { Meta } = Card;

const consumerKey = "ck_c03ce3bb816b74c8645ef887681f1a51cf4b2edc";
const consumerSecret = "cs_b8808d5ef3218cab79b1468777488671a1f87b73";
const siteURL = "https://devfolio.co.in/onlinestore"; 

const ProductList = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
console.log(products);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${siteURL}/wp-json/wc/v3/products?category=${categoryId}`,
          {
            auth: {
              username: consumerKey,
              password: consumerSecret,
            },
          }
        );
        setProducts(response.data);
        console.log("fetching",products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <>
    <div className="product-container">
      <Title level={2}>Products</Title>
      {loading ? <Spin size="large" /> : (
        <Row gutter={[16, 16]} className="product-list">
          {products.length === 0 ? (
            
            <p>No products found.</p>
          ) : (
            products.map((product) => (
              <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                <Card
                  hoverable
                  cover={<img alt={product.name} src={product.images[0]?.src} />}
                  actions={[
//                     <Button type="primary" icon={<ShoppingCartOutlined />}>
//   <PaymentComponent amount={product.price} />
// </Button>
                  ]}
                >
                  <Meta title={product.name} description={`${product.price} USD`} />
                </Card>
              </Col>
            ))
          )}
        </Row>
      )}
     
    </div>
    
     
      </>
  );
};

export default ProductList;