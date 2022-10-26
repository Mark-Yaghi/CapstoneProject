import React, { useState } from "react";
import "./Commendation-Style.css";

const SignleImage = ({ image, imgID }) => {
	const [selectSingleImg, setSelectSingleImg] = useState("");
	// console.log(selectSingleImg == imageID);
	// console.log(imageID);
	return (
		<>
			<img className={`img-resize ${selectSingleImg === imgID ? "selected" : ""} `} src={image.imgPath} alt={image.name} onClick={() => setSelectSingleImg(image.name)} />
		</>
	);
};

export default SignleImage;
