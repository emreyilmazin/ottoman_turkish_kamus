import React from "react";
import header from "./images/header.jpg";

class Kamus extends React.Component {
	render() {
		const title = "KÜLLİ KAMUS";
		return (
			<div
				style={{
					backgroundImage: "url('" + header + "')",
					height: 120,
					backgroundPosition: "center center",
					backgroundRepeat: "no-repeat",
					padding: 30,
				}}>
				<span className="headerTitle">{title}</span>
			</div>
		);
	}
}

export default Kamus;
