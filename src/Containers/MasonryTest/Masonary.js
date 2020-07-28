import React from "react";
import "./Masonary.css";

class Masonary extends React.Component {
  render() {
    return (
      <div className="masonary">
        <div className="item">
          <img src="https://cdn.lynda.com/course/510645/510645-636431592504296952-16x9.jpg" />
        </div>
        <div className="item">
          <img src="https://www.rollingstone.com/wp-content/uploads/2020/06/GettyImages-1213057145.jpg?w=200" />
        </div>
        <div className="item">
          <img src="https://www.rollingstone.com/wp-content/uploads/2020/06/GettyImages-1213057145.jpg?w=200" />
        </div>
        <div className="item">
          <img src="https://www.rollingstone.com/wp-content/uploads/2020/06/GettyImages-1213057145.jpg?w=200" />
        </div>
        <div className="item">
          <img src="https://cdn.lynda.com/course/510645/510645-636431592504296952-16x9.jpg" />
        </div>
      </div>
    );
  }
}

export default Masonary;
