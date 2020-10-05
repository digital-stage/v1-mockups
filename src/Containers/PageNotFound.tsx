import React from 'react';
import logo from "../assets/images/dstage_web_black.png";

function PageNotFound() {
    return (
        <div style={{
            width: "100vw",
            height: "100vh",
            backgroundImage: "linear-gradient(to bottom, rgba(83, 83, 83, 0.7), #282828)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        }}>
            <img src={logo} alt="logo" width="200px" height="auto" style={{ margin: "0 auto" }} className="mb-4" />
            <h1 style={{ color: "black", fontWeight: 600 }}>
                Page not found
            </h1>
        </div>
    )
}

export default PageNotFound;