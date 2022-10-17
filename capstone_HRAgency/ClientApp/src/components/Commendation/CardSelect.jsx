import React from "react";
import Images from "../../data";
import "./Commendation-Style.css";

const CardSelect = () => {
	return (
		<div className="main-container">
			<h3>Please Select a card</h3>
			<ul className="flex-center flex-option flex-xtra-option ">
				{Images.map((image) => {
					return (
						<li key={image.id}>
							<img src={image.img} alt={image.id} />
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default CardSelect;
