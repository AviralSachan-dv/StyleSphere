import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import ProductList from "./ProductList";
import Login from "./Login";
import { auth, signOut } from "./firebase";
import { Layout, Spin, Button } from "antd";

const { Content } = Layout;

const App = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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

    return (
        <>
        
        <Router>
            <Layout>
                <Content>
                    {user && (
                        <div style={{ textAlign: "right", padding: "10px" }}>
                            <Button onClick={() => signOut(auth)}>Logout</Button>
                        </div>
                    )}
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
                        <Route path="/products/:categoryId" element={user ? <ProductList /> : <Navigate to="/login" />} />
                    </Routes>
                </Content>
            </Layout>
        </Router>
        </>
    );
};

export default App;
