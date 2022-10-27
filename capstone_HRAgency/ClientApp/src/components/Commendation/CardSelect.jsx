import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Commendation-Style.css";
// import SignleImage from "./SingleImage";

const CardSelect = ({ onSelectImage }) => {
	const [imagesData, setImagesData] = useState([]);
	// const [filteredImgData, setFilteredImgData] = useState([]);
	// const [categories, setCategories] = useState([]);

	// useEffect(() => {
	// 	const allCategories = ["Total Cards", ...new Set(imagesData.map((category) => category.category))];
	// 	setCategories(allCategories);
	// }, [imagesData]);

	// console.log(imagesData);

	// const filterClick = (category) => {
	// 	if (category === "Total Cards") {
	// 		setFilteredImgData(imagesData);
	// 	} else {
	// 		const filterImg = imagesData.filter((image) => image.category === category);
	// 		setFilteredImgData(filterImg);
	// 		console.log(filterImg);
	// 	}
	// };

	const fetchImages = async (e) => {
		try {
			const res = await axios("api/Image/");
			setImagesData(res.data);
		} catch (ex) {
			console.log(ex);
		}
	};

	useEffect(() => {
		fetchImages();
	}, []);
	return (
		<div className="main-container">
			<h1 className="heading-card">Appreciation! Cards</h1>
			<div className="img-container">
				{/* <section>
					{categories.map((category, index) => {
						return (
							<button key={index} onClick={() => filterClick(category)}>
								{category}
							</button>
						);
					})}
				</section> */}
				<ul className="flex-center flex-option flex-xtra-option img-container-height ">
					{imagesData.map((image) => {
						return (
							<li className="position-declare img-hover " key={image.name} onClick={() => onSelectImage({ id: image.name, image: image.imgPath })}>
								<img className="img-resize" src={image.imgPath} alt={image.name} />
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default CardSelect;
