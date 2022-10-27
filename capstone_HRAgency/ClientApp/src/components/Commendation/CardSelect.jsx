import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
// import Images from "../../data";
import "./Commendation-Style.css";
import SignleImage from "./SingleImage";

const CardSelect = ({ onSelectImage }) => {
	const [imagesData, setImagesData] = useState([]);
	const [imgSel, setImgSel] = useState("");

	// useEffect(() => {

	// })

	// const handleClick = (e) => {
	// 	const filterImg = imagesData.filter((image) => image.name != e.target.alt);
	// 	console.log(filterImg);
	// 	const [selectedImg] = filterImg;
	// 	console.log(selectedImg.name);
	// 	setImgSel(selectedImg.name);

	// 	onSelectImage({id:})
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

{
	/* <li className="position-declare img-hover " key={image.id} onClick={() => onSelectImage({ id: image.id, image: image.img })}> */
}
