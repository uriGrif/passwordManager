import React from "react";
import "./Button.css";

function Button({ text, onClick, type }) {
	return (
		<button className="btn" onClick={onClick} type={type ? type : "button"}>
			{text}
		</button>
	);
}

export default Button;
