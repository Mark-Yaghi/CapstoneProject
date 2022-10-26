import React, { useRef, useState, useEffect } from "react";
import "./Commendation-Style.css";
const url = "https://localhost:7191/api/Email?";

export const CommendationForm = ({ onFormInformation, userImage }) => {
	const emailRegEx = new RegExp('/^(([^<>()[].,;:s@"]+(.[^<>()[].,;:s@"]+)*)|(".+"))@(([^<>()[].,;:s@"]+.)+[^<>()[].,;:s@"]{2,})$/i');
	const intialState = { senderName: "", senderEmail: "", recipientName: "", recipientEmail: "", recipManagerEmail: "", comment: "", image: "" };
	const [inputValue, setInputValue] = useState(intialState);
	const [isVisible, setIsVisible] = useState(false);
	const { id, image } = userImage;
	const senderName = useRef();
	const senderEmail = useRef();
	const recipientName = useRef();
	const recipientEmail = useRef();
	const recipManagerEmail = useRef();
	const comment = useRef();

	useEffect(() => {
		if (!image) {
			setIsVisible(false);
		} else {
			setInputValue((prevState) => ({
				...prevState,
				image: image,
			}));
			setIsVisible(true);
		}
	}, [image]);

	const submitHandler = async (e) => {
		e.preventDefault();

		// emptyInput(inputValue)
		if (!inputValue.senderName.trim()) {
			senderName.current.focus();
			senderName.current.scrollIntoView({
				behavior: "smooth",
			});
		} else if (!inputValue.senderEmail.trim() && !emailRegEx.test(inputValue.senderEmail)) {
			senderEmail.current.focus();
			senderEmail.current.scrollIntoView({
				behavior: "smooth",
			});
		} else if (!inputValue.recipientName.trim()) {
			recipientName.current.focus();
			recipientName.current.scrollIntoView({
				behavior: "smooth",
			});
		} else if (!inputValue.recipientEmail.trim() && !emailRegEx.test(inputValue.recipientEmail)) {
			recipientEmail.current.focus();
			recipientEmail.current.scrollIntoView({
				behavior: "smooth",
			});
		} else if (!inputValue.recipManagerEmail.trim() && !emailRegEx.test(inputValue.recipManagerEmail)) {
			recipManagerEmail.current.focus();
			recipManagerEmail.current.scrollIntoView({
				behavior: "smooth",
			});
		} else if (!inputValue.comment.trim()) {
			comment.current.focus();
			comment.current.scrollIntoView({
				behavior: "smooth",
			});
		} else {
			try {
				const res = await fetch(`api/Email?` + new URLSearchParams(inputValue), {
					method: "POST",
				});
				if (!res.ok) {
					throw new Error(`${res.status} ${res.statusText}`);
				}
				if (res.ok) {
					setInputValue((prevState) => ({
						...prevState,
						image: "",
					}));
					setInputValue(intialState);
					setIsVisible(false);
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (image) {
			setInputValue((prevState) => ({
				...prevState,
				[name]: value,
			}));
			setIsVisible(true);
		} else {
			alert("Image is not selected");
		}
	};
	return (
		<section className="main-container">
			<div className="form-container">
				<section className={`${isVisible ? "visible" : "invisible"}`}>
					<br />
					<p> Hello, {inputValue.recipientName}</p>
					<br />
					<p>{inputValue.comment}</p>
					<br />
					<div style={{ backgroundImage: `url(${inputValue.image})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center center", maxWidth: "100%", height: "800px", marginInline: "auto", display: "flex", justifyContent: "space-between", flexDirection: "column", maxHeight: "auto" }}>
						<h3 style={{ backgroundColor: "#1a281fad", color: "whitesmoke", fontWeight: "bolder", padding: "0.5em", margin: "1rem", borderRadius: "10px", alignSelf: "flex-start" }}>To: {inputValue.recipientName}</h3>
						<h3 style={{ backgroundColor: "#1a281fad", color: "whitesmoke", fontWeight: "bolder", padding: "0.5em", margin: "1rem", borderRadius: "10px", alignSelf: "flex-end" }}>From {inputValue.senderName}</h3>
					</div>
					<br />
					<br />
					<p>Thank you,</p>
					<br />
					<p>{inputValue.senderName}</p>
					<p>{inputValue.senderEmail}</p>
				</section>
			</div>

			<form onSubmit={submitHandler} className="form-container">
				<div>
					<label htmlFor="sender">Sender *</label>
					<input maxLength="30" ref={senderName} type="text" name="senderName" id="sender" placeholder="Name" value={inputValue.senderName} onChange={handleChange} />
					<input maxLength="30" ref={senderEmail} type="email" name="senderEmail" id="sender" placeholder="Email" value={inputValue.senderEmail} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="recipient">Recipient *</label>
					<input maxLength="30" ref={recipientName} type="text" name="recipientName" id="recipient" placeholder="Name" value={inputValue.recipientName} onChange={handleChange} />
					<input maxLength="30" ref={recipientEmail} type="email" name="recipientEmail" id="recipient" placeholder="Email" value={inputValue.recipientEmail} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="recipManager">Recipient’s Manager *</label>
					<input maxLength="30" ref={recipManagerEmail} type="email" name="recipManagerEmail" id="recipManager" placeholder="Email" value={inputValue.recipManagerEmail} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="comment">Message from Sender to Recipient*</label>
					<textarea maxLength="500" ref={comment} name="comment" id="comment" cols="30" rows="10" placeholder="Comment..." value={inputValue.comment} onChange={handleChange} />
				</div>
				<button className="but-general but-col-prim">Send</button>
			</form>
		</section>
	);
};
