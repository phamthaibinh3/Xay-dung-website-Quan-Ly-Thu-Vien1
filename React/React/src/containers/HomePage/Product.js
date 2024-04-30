import React, { useState } from "react";
import "../../assets/laptop.png";
function App() {
  return (
    <div className="Product-container">
        <header className="Product-content">
            <div className="product"> 
                <img src={require("../../assets/laptop.png")} alt="laptop" />
            </div>
            <div className="desc">
                <h2> MacBook Pro</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maxime mollitia,molestiae quas vel sint commodi repudiandae
                    consequuntur.
                </p>
                <h3>Price: $350.00</h3>
            </div>
        </header>
    </div>
  );
}

export default App;