import React from "react";
import { Layout, Row, Col } from "antd";

const { Footer } = Layout;

const CustomFooter = () => {
  return (
    <Footer style={{ background: "#0f1111", color: "#fff", textAlign: "center", padding: "30px 20px" }}>
      <Row justify="center" gutter={[16, 16]}>
        <Col span={24}>
          <div style={{ fontSize: "14px", opacity: 0.9 }}>
            <a href="#" style={{ color: "#fff", margin: "0 10px" }}>Conditions of Use & Sale</a> |
            <a href="#" style={{ color: "#fff", margin: "0 10px" }}>Privacy Notice</a> |
            <a href="#" style={{ color: "#fff", margin: "0 10px" }}>Interest-Based Ads</a>
          </div>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: "15px" }}>
        <Col span={24}>
          <div style={{ fontSize: "14px", opacity: 0.7 }}>
            © 1996-2025, Style-Sphere.com, Inc. or its affiliates
          </div>
        </Col>
      </Row>
    </Footer>
  );
};

export default CustomFooter;
