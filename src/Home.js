import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Input, Card, Button, Row, Col, Spin, Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import axios from "axios";
import "./App.css";

const { Meta } = Card;
const { Title } = Typography;

const consumerKey = "ck_c03ce3bb816b74c8645ef887681f1a51cf4b2edc";
const consumerSecret = "cs_b8808d5ef3218cab79b1468777488671a1f87b73";
const siteURL = "https://devfolio.co.in/onlinestore";

const Home = ({ minPrice, maxPrice, selectedSize , selectedColor }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(53);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setCategories([
      { id: 53, name: "All Products" },
      { id: 54, name: "Men" },
      { id: 107, name: "Women" },
      { id: 112, name: "Kids" },
      { id: 120, name: "Coolers" },
      { id: 121, name: "Geysers" },
    ]);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, selectedCategory, minPrice, maxPrice, selectedSize , selectedColor]);
 

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${siteURL}/wp-json/wc/v3/products?search=${searchTerm}&category=${selectedCategory}`,
        {
          auth: { username: consumerKey, password: consumerSecret },
        }
      );
      
      let filtered = response.data;
      
      if (selectedColor) {
        filtered = filtered.filter((product) =>
          product.attributes.some(
            (attr) => attr.name === "Color" && attr.options.includes(selectedColor)
          )
        );
      }
      if (selectedSize) {
        filtered = filtered.filter((product) =>
          product.attributes.some(
            (attr) => attr.name === "Size" && attr.options.includes(selectedSize)
          )
        );
      }

      setProducts(filtered);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container" style={{ padding: "20px" }}>
      <Title level={2} style={{ textAlign: "center" }}>Welcome to Our Store</Title>

      <Input.Search
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        enterButton
        size="large"
        style={{ margin: "20px auto", display: "block", width: "60%" }}
      />

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        {categories.map((category) => (
          <Button
            key={category.id}
            type={selectedCategory === category.id ? "primary" : "default"}
            onClick={() => setSelectedCategory(category.id)}
            style={{ margin: "5px" }}
          >
            {category.name}
          </Button>
        ))}
      </div>

      <Title level={3}>Products</Title>
      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "20px auto" }} />
      ) : (
        <Row gutter={[16, 16]} justify="center">
          {products.length > 0 ? (
            products.map((product) => (
              <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={product.name}
                      src={product.images[0]?.src}
                      style={{ height: "250px", objectFit: "cover" }}
                    />
                  }
                  actions={[
                    <Button type="primary" icon={<ShoppingCartOutlined />}>Add to Cart</Button>,
                  ]}
                >
                  <Meta title={product.name} description={`$${product.price}`} />
                </Card>
              </Col>
            ))
          ) : (
            <Title level={4} style={{ textAlign: "center", width: "100%" }}>
              No products found.
            </Title>
          )}
        </Row>
      )}
    </div>
  );
};

export default Home;
