import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Commendation-Style.css";
// import SignleImage from "./SingleImage";

const CardSelect = ({ onSelectImage }) => {
	const [imagesData, setImagesData] = useState([]);
	const [filteredImgData, setFilteredImgData] = useState([]);
	const [categories, setCategories] = useState([]);

	// Array of unique Categories
	useEffect(() => {
		const allCategories = ["TotalCards", ...new Set(imagesData.map((category) => category.category))];
		setCategories(allCategories);
	}, [imagesData]);

	// Filter the images based on Categories.
	const filterClick = (category) => {
		if (category === "TotalCards") {
			setFilteredImgData(imagesData);
		} else {
			const filterImg = imagesData.filter((image) => image.category === category);
			setFilteredImgData(filterImg);
		}
	};

	// Fetching the Images from server
	const fetchImages = async (e) => {
		try {
			const res = await axios("api/Image/");
			setImagesData(res.data);
			setFilteredImgData(res.data);
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
				<section className="sec-but-container">
					{categories.map((category, index) => {
						return (
							<button className="but-general-sec" key={index} onClick={() => filterClick(category)}>
								{category.split(/(?=[A-Z])/).join(" ")}
							</button>
						);
					})}
				</section>
				<ul className="flex-center flex-option flex-xtra-option img-container-height ">
					{filteredImgData.map((image) => {
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
