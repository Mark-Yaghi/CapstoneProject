import React, { useState } from "react";
import "./Commendation-Style.css";
const url = "https://localhost:7191/api/Email?";

export const CommendationForm = ({ onFormInformation, userImage }) => {
	const formInputValue = { senderName: "", senderEmail: "", recipientName: "", recipientEmail: "", recipManagerEmail: "", comment: "", image: "" };
	const [inputValue, setInputValue] = useState(formInputValue);
	const [isVisible, setIsVisible] = useState(false);
	const { id, image } = userImage;

	// console.log(image, id);
	// console.log(inputValue);
	// if (!id) {
	// 	alert("Image is not selected.");
	// }
	const imageStyle = {};
	const submitHandler = async (e) => {
		e.preventDefault();
		console.log(inputValue);
		try {
			const res = await fetch(`api/Email?` + new URLSearchParams(inputValue), {
				method: "POST",
			});
			console.log(await res.text());
			if (!res.ok) {
				throw new Error(`${res.status} ${res.statusText}`);
			}
		} catch (error) {
			console.log(error);
		}
		setInputValue({ senderName: "", senderEmail: "", recipientName: "", recipientEmail: "", recipManagerEmail: "", comment: "", image: "" });
		setIsVisible(false);
	};
	console.log(inputValue);
	const handleChange = (e) => {
		// console.log(`${e.target.name}: ${e.target.value}`);
		const { name, value } = e.target;
		setInputValue((prevState) => ({
			...prevState,
			[name]: value,
			image,
		}));
		setIsVisible(true);
	};
	return (
		<section className="main-container">
			<div className="form-container">
				<section className={`${isVisible ? "visible" : "invisible"}`}>
					<div style={{ backgroundImage: `url(${inputValue.image})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center center", maxWidth: "100%", height: "800px", marginInline: "auto", display: "flex", justifyContent: "space-between", flexDirection: "column", maxHeight: "auto" }}>
						<h3 style={{ fontWeight: "bolder", padding: "2rem" }}>To: {inputValue.recipientName}</h3>
						<h3 style={{ fontWeight: "bolder", padding: "2rem", alignSelf: "flex-end" }}>From {inputValue.senderName}</h3>
					</div>
					{/* <p>To, {inputValue.recipientName}</p> */}
					<br />
					<p> {inputValue.comment}</p>
					<br />
					{/* <img src={inputValue.image} width="400" /> */}
					<br />
					<br />
					{/* <p>From {inputValue.senderName}</p> */}
				</section>
			</div>
			{/* <h1 className="heading-card">Appreciation! Form</h1> */}
			{/* <div className="form-container">
				<button className="but-general but-col-prim" onClick={() => onFormInformation(inputValue)}>
					Preview
				</button>
			</div> */}
			<form onSubmit={submitHandler} className="form-container">
				<div>
					<label htmlFor="sender">Sender *</label>
					<input type="text" name="senderName" id="sender" placeholder="Name" value={inputValue.senderName} onChange={handleChange} />
					<input type="email" name="senderEmail" id="sender" placeholder="Email" value={inputValue.senderEmail} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="recipient">Recipient *</label>
					<input type="text" name="recipientName" id="recipient" placeholder="Name" value={inputValue.recipientName} onChange={handleChange} />
					<input type="email" name="recipientEmail" id="recipient" placeholder="Email" value={inputValue.recipientEmail} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="recipManager">Recipient’s Manager *</label>
					<input type="email" name="recipManagerEmail" id="recipManager" placeholder="Email" value={inputValue.recipManagerEmail} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="comment">Message from Sender to Recipient*</label>
					<textarea name="comment" id="comment" cols="30" rows="10" placeholder="Comment..." value={inputValue.comment} onChange={handleChange} />
				</div>
				<button className="but-general but-col-prim">Send</button>
			</form>
		</section>
	);
};
