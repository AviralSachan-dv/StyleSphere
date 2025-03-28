import React, { useState, useEffect } from "react";
import { Input, Card, Button, Row, Col, Spin, Typography, Layout } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import axios from "axios";
import "./App.css";
import CustomFooter from "./CustomFooter";

const { Meta } = Card;
const { Title } = Typography;

const consumerKey = "ck_c03ce3bb816b74c8645ef887681f1a51cf4b2edc";
const consumerSecret = "cs_b8808d5ef3218cab79b1468777488671a1f87b73";
const siteURL = "https://devfolio.co.in/onlinestore";

const Home = ({ minPrice, maxPrice, selectedSize, selectedColor, handlePayment1 }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(53);
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);

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
  }, [searchTerm, selectedCategory, minPrice, maxPrice, selectedSize, selectedColor]);

  const fetchProducts = async () => {
    setLoading(true);
    setAllLoaded(false);
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
      setVisibleProducts(filtered.slice(0, 4));
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreProducts = () => {
    if (loadingMore || allLoaded) return;
    setLoadingMore(true);

    setTimeout(() => {
      const newProducts = products.slice(visibleProducts.length, visibleProducts.length + 4);
      setVisibleProducts([...visibleProducts, ...newProducts]);
      if (visibleProducts.length + 4 >= products.length) {
        setAllLoaded(true);
      }
      setLoadingMore(false);
    }, 1000);
  };

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;

    if (scrollTop + clientHeight >= scrollHeight - 50) {
      loadMoreProducts();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleProducts, loadingMore]);

  // Function to add a product to the cart using localStorage
  const handleAddToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    // cartItems.push({ id: product.id, name: product.name, price: product.price, image:product.images});
    cartItems.push({ 
      id: product.id, 
      name: product.name, 
      price: product.price, 
      image: product.images.length > 0 ? product.images[0].src : '' 
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert(`${product.name} added to cart`);
  };

  return (
    <>
      <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <div className="home-container" style={{ flex: 1, padding: "20px" }}>
          <Title level={2} style={{ textAlign: "center" }}>Welcome to Style-Sphere</Title>

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
              {visibleProducts.length > 0 ? (
                visibleProducts.map((product) => (
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
                        <Button type="primary" icon={<ShoppingCartOutlined />}>Buy</Button>,
                        <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
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
          {loadingMore && <Spin size="large" style={{ display: "block", margin: "20px auto" }} />}
          {allLoaded && <Title level={4} style={{ textAlign: "center" }}>No more products.</Title>}
        </div>
        <CustomFooter />
      </Layout>
    </>
  );
};

export default Home;
