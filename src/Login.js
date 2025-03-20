import React, { useState } from "react";
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "./firebase";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography, Card, Spin } from "antd";

const { Title, Text } = Typography;

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignup, setIsSignup] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleAuth = async () => {
        setLoading(true);
        try {
            if (isSignup) {
                await createUserWithEmailAndPassword(auth, email, password);
                alert("Signup Successful!");
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                alert("Login Successful!");
            }
            navigate("/");
        } catch (error) {
            alert("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Card style={{ width: 400, padding: "20px", textAlign: "center", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
                <Title level={3}>{isSignup ? "Sign Up" : "Login"}</Title>
                <Form layout="vertical" onFinish={handleAuth}>
                    <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter your email" }]}>
                        <Input 
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password" }]}>
                        <Input.Password 
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block disabled={loading}>
                            {loading ? <Spin /> : isSignup ? "Sign Up" : "Login"}
                        </Button>
                    </Form.Item>
                </Form>

                <Text type="secondary" style={{ cursor: "pointer", color: "#1890ff" }} onClick={() => setIsSignup(!isSignup)}>
                    {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
                </Text>
            </Card>
        </div>
    );
};

export default Login;
