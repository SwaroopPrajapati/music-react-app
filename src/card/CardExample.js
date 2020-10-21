import React from "react";
import Cards from "./Cards";
import "../styleSheets/myStyle.scss";

function CardExample(props) {
  return (
    <div className={`card-slider active-slider-${props.count}`}>
      <div
        className="card-slider-wrapper"
        style={{
          transform: `translateX(-${
            props.count * (100 / props.properties.length)
          }%)`,
        }}
      >
        {props.properties.map((card, index) => (
          <Cards id={index} key={index} card_detail={card} />
        ))}
      </div>
    </div>
  );
}

export default CardExample;
