import React, { useState } from "react";
import "./Commendation-Style.css";

export const CommendationForm = () => {
	const formInputValue = { senderName: "", senderEmail: "", recipientName: "", recipientEmail: "", recipManagerEmail: "", comment: "" };
	const [inputValue, setInputValue] = useState(formInputValue);
	const submitHandler = (e) => {
		e.preventDefault();
		console.log(inputValue);
		setInputValue({ senderName: "", senderEmail: "", recipientName: "", recipientEmail: "", recipManagerEmail: "", comment: "" });
	};
	const handleChange = (e) => {
		// console.log(`${e.target.name}: ${e.target.value}`);
		const { name, value } = e.target;
		setInputValue((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	return (
		<section className="main-container">
			{/* <h1 className="heading-card">Commendation Form</h1> */}
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
