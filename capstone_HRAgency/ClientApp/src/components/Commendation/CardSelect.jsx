import React, { useEffect, useState } from "react";
import axios from "axios";
import Images from "../../data";
import "./Commendation-Style.css";

const CardSelect = ({ onSelectImage }) => {
	const [imagesData, setImagesData] = useState([]);
	// const [imgSel, setImgSel] = useState(false);

	// const handleSelect = (e) => {
	// 	const imgId = +e.target.id;
	// 	const filterImg = Images.filter((image) => imgId == image.id);
	// 	console.log(filterImg);
	// 	setImgSel((prev) => !prev);
	// 	console.log(imgSel);
	// };

	const fetchImages = async (e) => {
		// console.log(file);
		// const formData = new FormData();
		// formData.append("formFile", file);
		// formData.append("fileName", fileName);
		try {
			const res = await axios("api/Image/");
			console.log(res);
			console.log(res.data);
			setImagesData(res.data);
			// alert("Your file has been successfully uploaded to the database.");
			// document.getElementById("fileUpload").value = "";
		} catch (ex) {
			console.log(ex);
			// alert("An error occurred uploading your image." + ex);
		}
	};

	useEffect(() => {
		fetchImages();
	}, []);
	return (
		<div className="main-container">
			<h1 className="heading-card">Appreciation! Cards</h1>
			<div className="img-container">
				<ul className="flex-center flex-option flex-xtra-option img-container-height ">
					{Images.map((image) => {
						return (
							<li className="position-declare img-hover " key={image.id} onClick={() => onSelectImage({ id: image.id, image: image.img })}>
								<span className="position-center-align">Image {image.id}</span>
								<img className="img-resize" src={image.img} alt={image.id} />
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default CardSelect;

{
	/* <li className="position-declare img-hover " key={image.id} onClick={() => onSelectImage({ id: image.id, image: image.img })}> */
}
