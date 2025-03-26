import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import ProductList from "./ProductList";
import Login from "./Login";
import { auth, signOut } from "./firebase";
import { Layout, Spin, Button, Drawer, Input, Form, Select } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Cart from "./Cart"; // Import Cart component

const { Content } = Layout;
const { Option } = Select;

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [cartDrawer, setCartDrawer] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Spin size="large" style={{ display: "block", margin: "20px auto" }} />;
  }

  const applyFilter = () => {
    setOpen(false);
  };

  const clearFilter = () => {
    setMinPrice("");
    setMaxPrice("");
    setSelectedSize("");
    setSelectedColor("");
    setOpen(false);
  };

  return (
    <>
      <Router>
        <Layout>
          <Content>
            {user && (
              <div style={{ textAlign: "right", padding: "10px" }}>
                <Button onClick={() => signOut(auth)}>Logout</Button>
                <Button
                  icon={<ShoppingCartOutlined />}
                  onClick={() => setCartDrawer(true)}
                  style={{ marginLeft: "10px" }}
                />
              </div>
            )}
            <div style={{ textAlign: "left", padding: "10px" }}>
              <Button style={{ marginLeft: "10px" }} onClick={() => setOpen(true)}>
                Filters
              </Button>
            </div>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  user ? (
                    <Home
                      minPrice={minPrice}
                      maxPrice={maxPrice}
                      selectedSize={selectedSize}
                      selectedColor={selectedColor}
                    />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/products/:categoryId"
                element={user ? <ProductList /> : <Navigate to="/login" />}
              />
            </Routes>
          </Content>
        </Layout>
      </Router>

      <Drawer title="Filters" placement="left" closable onClose={() => setOpen(false)} open={open}>
        <Form onFinish={applyFilter}>
          <Form.Item label="Min Price">
            <Input value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
          </Form.Item>
          <Form.Item label="Max Price">
            <Input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
          </Form.Item>
          <Form.Item label="Size">
            <Select value={selectedSize} onChange={setSelectedSize} allowClear>
              <Option value="S">S</Option>
              <Option value="M">M</Option>
              <Option value="L">L</Option>
              <Option value="XL">XL</Option>
              <Option value="XXL">XXL</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Color">
            <Select value={selectedColor} onChange={setSelectedColor} allowClear>
              <Option value="Blue">Blue</Option>
              <Option value="Black">Black</Option>
              <Option value="Green">Green</Option>
              <Option value="Yellow">Yellow</Option>
              <Option value="Red">Red</Option>
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit">Apply</Button>
          <Button onClick={clearFilter} danger style={{ marginLeft: 8 }}>Clear Filter</Button>
        </Form>
      </Drawer>

      <Drawer title="Cart" placement="right" closable onClose={() => setCartDrawer(false)} open={cartDrawer}>
        <Cart />
      </Drawer>
    </>
  );
};

export default App;
