import React, { Component } from "react";

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "90%",
          minHeight: "50vh",
          gap: "32px",
          margin: "24px",
        }}
      >
        <img
          src="/BeSpokedIcon.jpg"
          alt="BeSpoked Bikes Logo"
          style={{
            borderRadius: "16px",
            border: "2px solid black",
            boxShadow: "5px 5px 5px rgb(0,0,0,.3)",
          }}
        />
        <h1 style={{ color: "white" }}>
          Welcome to BeSpoked Bikes Sales Tracking Application
        </h1>
        <p style={{ fontSize: "24px", color: "whitesmoke" }}>
          Navigate to one of the other pages in the top navigation bar for
          implementation features!
        </p>
      </div>
    );
  }
}
