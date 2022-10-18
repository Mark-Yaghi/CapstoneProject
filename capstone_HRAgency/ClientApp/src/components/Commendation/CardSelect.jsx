import React from "react";
import Images from "../../data";
import "./Commendation-Style.css";

const CardSelect = () => {
	return (
		<section className="main-container bg-color-prim">
			<h1 className="heading-card">Commendation Cards</h1>
			<ul className="flex-center flex-option flex-xtra-option img-container">
				{Images.map((image) => {
					return (
						<li className="position-declare" key={image.id}>
							<span className="position-center-align">Image {image.id}</span>
							<img src={image.img} alt={image.id} />
						</li>
					);
				})}
			</ul>
		</section>
	);
};

export default CardSelect;
