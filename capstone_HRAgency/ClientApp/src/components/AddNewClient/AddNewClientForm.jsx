import React, { useState } from "react";
import "./AddNewClient-Style.css";

export const AddNewClientForm = () => {
	const formInputValue = { senderName: "", senderEmail: "", recipientName: "", recipientEmail: "", recipManagerEmail: "", comment: "" };
	const [inputValue, setInputValue] = useState(formInputValue);
	const submitHandler = (e) => {
		e.preventDefault();
		console.log(inputValue);
		setInputValue({ senderName: "", senderEmail: "", recipientName: "", recipientEmail: "", recipManagerEmail: "", comment: "" });
	};
	const handleChange = (e) => {
		console.log(`${e.target.name}: ${e.target.value}`);
		setInputValue((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};
	return (
		<section className="main-container">
			{/* <h1 className="heading-card">Add New Client Form</h1> */}
			<form onSubmit={submitHandler} className="form-container bg-color-prim">
				<h1 className="heading-form">Add New Client Form</h1>
				<div>
					<label htmlFor="companyName">Company Name *</label>
					<input type="text" name="companyName" id="company" placeholder="Company Name" value={inputValue.companyName} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="firstName">Contacts First Name *</label>
					<input type="text" name="firstName" id="firstname" placeholder="First Name" value={inputValue.firstName} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="lastName">Contacts Last Name *</label>
					<input type="text" name="lastName" id="lastname" placeholder="Last Name" value={inputValue.lastName} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="email">Contacts Email *</label>
					<input type="email" name="clientEmail" id="clientemail" placeholder="Client Email" value={inputValue.clientEmail} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="phonenumber">Phone Number *</label>
					<input type="phone" name="phoneNumber" id="phonenumber" placeholder="000-000-0000" value={inputValue.phoneNumber} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="package">Package Type *</label>
					<select name="packageType" id="packagetype">
						<option value="microcompany">Micro Company</option>
						<option value="smallcompany">Small Company</option>
						<option value="mediumcompany">Medium Company</option>
						<option value="largecompany">Large Company</option>
					</select>
				</div>
				<div>
					<label htmlFor="Start Date">Start Date *</label>
					<input type="date" name="startDate" id="startdate" placeholder="yyyy-mm-dd" value={inputValue.startDate} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="End Date">End Date *</label>
					<input type="date" name="endDate" id="enddate" placeholder="yyyy-mm-dd" value={inputValue.endDate} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="subStatus">Subscription Status *</label>
					<select name="subStatus" id="substatus">
						<option value="active">Active</option>
						<option value="inactive">Inactive</option>
					</select>
				</div>
				<div>
					<label htmlFor="permissionLevel">Permission Level *</label>
					<select name="permissionLevel" id="permissionlevel">
						<option value="one">1</option>
						<option value="two">2</option>
						<option value="three">3</option>
					</select>
				</div>
				<button className="but-general but-col-prim">Accept Changes</button>
				<br></br>
				<br></br>
				<button className="but-back but-col-sec">Back</button>
			</form>
		</section>
	);
};