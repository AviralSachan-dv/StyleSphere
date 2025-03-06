import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ProductList from "./ProductList";
import { Button, Drawer, Input, Layout, Form, Select } from "antd";

const { Header, Content } = Layout;
const { Option } = Select;

const App = () => {
  const [open, setOpen] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedSize, setSelectedSize] = useState("")
   const[selectedColor, setSelectedColor] = useState("")


  // const applyFilter = () => {
  //   setOpen(false);
  // };
  const applyFilter = () => {
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
    setSelectedSize(selectedSize);
    setSelectedColor(selectedColor);
    setOpen(false);
  };

  const clearFilter = () => {
    setMinPrice("");
    setMaxPrice("");
    setSelectedSize("");
    setSelectedColor("")
    setOpen(false);
  };

  return (
    <>
      <Router>
        <Layout>
          <Header className="header">
            <h1 className="logo" style={{ backgroundColor: "#1677ff", borderRadius: "50px" }}>
              <Button style={{ position: "relative", right: "35%" }} type="dashed" onClick={() => setOpen(true)}>
                Filters
              </Button>{" "}
              🛍️ E-Commerce
            </h1>
          </Header>
          <Content>
            <Routes>
              {/* <Route path="/" element={<Home minPrice={minPrice} maxPrice={maxPrice} selectedSize={selectedSize} />} /> */}
              <Route path="/" element={<Home minPrice={minPrice} maxPrice={maxPrice} selectedSize={selectedSize} selectedColor={selectedColor} />} />

              <Route path="/products/:categoryId" element={<ProductList />} />
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
          <Form.Item label="color">
            <Select value={selectedColor} onChange={setSelectedColor} allowClear>
              <Option value="Blue">Blue</Option>
              <Option value="black">black</Option>
              <Option value="Green">Green</Option>
              <Option value="Yellow">Yellow</Option>
              <Option value="Red">Red</Option>
            </Select>
          </Form.Item>


         
          <Button type="primary" onClick={applyFilter}>Apply</Button>

          
          <Button onClick={clearFilter} danger>Clear Filter</Button>
        </Form>
      </Drawer>
    </>
  );
};

export default App;
