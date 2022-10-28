import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FileUpload/FileUpload-Style.css";

export const FileUpload = () => {
	const [file, setFile] = useState(null);
	const [fileName, setFileName] = useState();
	const [isDisabled, setIsDisabled] = useState(false);
	const [respons, setRespons] = useState("");
	const [isMsgTrue, setIsMsgTrue] = useState(false);

	const saveFile = (e) => {
		// console.log(e.target.files[0]);
		// console.log(e.target.files[0].type);
		if (e.target.files[0] === undefined) {
			setFile(null);
			setIsDisabled(true);
			setIsMsgTrue(true);
		} else if (e.target.files[0].type !== "image/jpeg") {
			setIsDisabled(true);
			setIsMsgTrue(true);
			setRespons("Please upload 'jpeg' image file.");
		} else {
			setIsDisabled(false);
			setIsMsgTrue(false);
			setFile(e.target.files[0]);
			setFileName(e.target.files[0].name);
		}
	};

	useEffect(() => {
		if (file === null) {
			setIsDisabled(true);
		}

		// return () => {
		// };
	}, [file]);
	console.log(file);

	const uploadFile = async (e) => {
		e.preventDefault();

		// console.log(file);
		const formData = new FormData();
		formData.append("formFile", file);
		formData.append("fileName", fileName);
		try {
			const res = await axios.post("api/file", formData);
			console.log(res.data);
			if (res) {
				setIsMsgTrue(true);
				setRespons("Your file has been successfully uploaded to the database.");
				setFile(null);
				document.getElementById("fileUpload").value = "";
			}
		} catch (ex) {
			console.log(ex);
			setRespons("Please select an image." + ex);
			setIsDisabled(true);
		}
	};

	return (
		<>
			<form className="form-container file-upload " onSubmit={uploadFile}>
				<div>
					<input id="fileUpload" type="file" onChange={saveFile} />

					<small className={isDisabled ? "error-text" : ""}>{isMsgTrue ? respons : ""}</small>
				</div>

				<div>
					<button disabled={isDisabled ? true : false} className={isDisabled ? "but-general disabled" : "but-general but-col-prim "}>
						Upload Card
					</button>
				</div>
			</form>
		</>
	);
};
