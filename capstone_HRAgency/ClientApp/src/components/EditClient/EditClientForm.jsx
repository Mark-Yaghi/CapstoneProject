import React, { useState } from "react";
import "./EditClient-Style.css";
import { NavLink } from "react-router-dom";

export const EditClientForm = () => {
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
			{/* <h1 className="heading-card">Edit Client Form</h1> */}
			<form onSubmit={submitHandler} className="form-container bg-color-prim">
				<h1 className="heading-form">Edit Client Form</h1>
				<div>
					<label htmlFor="companyName">Company Name *</label>
					<input type="text" name="companyName" id="company" placeholder="Company Name" value={inputValue.companyName} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="companyName">Company Address *</label>
					<input type="text" name="companyName" id="address" placeholder="Address" value={inputValue.Address} />
				</div>
				<div>
					<label htmlFor="companyName">Company Phone *</label>
					<input type="text" name="companyName" id="phone" placeholder="Phone" value={inputValue.Phone} />
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
					<input type="phone" name="phoneNumber" maxLength="10" id="phonenumber" placeholder="000-000-0000" value={inputValue.phoneNumber} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="package">Package Type *</label>
					<select name="packageType" id="packagetype">
						<option value="1">Micro Company (1-9)</option>
						<option value="2">Small Company (10-49)</option>
						<option value="3">Medium Company (50-249)</option>
						<option value="4">Large Company (250 +)</option>
					</select>
				</div>
				<div>
					<label htmlFor="Start Date">Start Date *</label>
					<input type="date" maxlength="10" name="startDate" id="startdate" placeholder="yyyy-mm-dd" value={inputValue.startDate} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="End Date">End Date *</label>
					<input type="date" maxlength="10" name="endDate" id="enddate" placeholder="yyyy-mm-dd" value={inputValue.endDate} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="subStatus">Subscription Status *</label>
					<select name="subStatus" id="substatus">
						<option value="1">Active</option>
						<option value="2">Inactive</option>
					</select>
				</div>
				<div>
					<label htmlFor="permissionLevel">Permission Level *</label>
					<select name="permissionLevel" id="permissionlevel">
						<option value="1">1 - Full Administrative Permissions</option>
						<option value="2">2 - Client Access Level</option>
						
					</select>
				</div>
				<button className="but-general but-col-prim">Accept Changes</button>
				<br></br>
				<br></br>
				<NavLink className="but-general but-col-sec nav-spec-but" to="/company">Back</NavLink>
			</form>
		</section>
	);
};