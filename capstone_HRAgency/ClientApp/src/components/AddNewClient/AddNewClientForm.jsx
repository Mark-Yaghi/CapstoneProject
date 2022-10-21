import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import authService from "../api-authorization/AuthorizeService";
import axios from "axios";
import "./AddNewClient-Style.css";

export const AddNewClientForm = () => {
	// const formInputValue = { companyName: "", firstName: "", lastName: "", clientEmail: "", phoneNumber: "", packageType: "", startDate: "", endDate: "", subStatus: "", permissionLevel: "" };
	const formInputValue = { CompanyName: "", Address: "", Phone: "", CPFirstName: "", CPLastName: "", CPEMail: "", StartDate: "", EndDate: "", SubscriptionStatus: "" };
	const [inputValue, setInputValue] = useState(formInputValue);

	// const fetchData = async () => {
	// 	try {
	// 		const res = await axios.post("company/list", { inputValue });
	// 		console.log(res);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	const submitHandler = async (e) => {
		e.preventDefault();
		// console.log(inputValue);
		// try {
		// 	const token = await authService.getAccessToken();
		// const res = await axios("company/list", { headers: !token ? {} : { Authorization: `Bearer ${token}` } });
		// const resp = await axios("/package/list", { headers: !token ? {} : { Authorization: `Bearer ${token}` } });
		// const resu = await axios("userinfo/", { headers: !token ? {} : { Authorization: `Bearer ${token}` } });
		// console.log(res.data);
		// console.log(resp.data);
		// console.log(resu.data);
		// } catch (error) {
		// console.log(error.response);
		// }
		// try {
		// 	const token = await authService.getAccessToken();
		// 	const res = await axios.post("company/?", new URLSearchParams(inputValue), { headers: !token ? {} : { Authorization: `Bearer ${token}` } });
		// 	// const resp = await fetch("company/?" + new URLSearchParams(inputValue), { method: "POST" });
		// 	console.log(res);
		// 	console.log(res.data);
		// } catch (error) {
		// 	console.log(error.response);
		// }
		setInputValue({ CompanyName: "", Address: "", Phone: "", CPFirstName: "", CPLastName: "", CPEMail: "", StartDate: "", EndDate: "", SubscriptionStatus: "" });
		// setInputValue({ companyName: "", firstName: "", lastName: "", clientEmail: "", phoneNumber: "", packageType: "", startDate: "", endDate: "", subStatus: "", permissionLevel: "" });
	};
	const handleChange = (e) => {
		// console.log(`${e.target.name}: ${e.target.value}`);
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
					<input type="text" name="companyName" id="companyName" placeholder="Company Name" value={inputValue.companyName} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="address">Address *</label>
					<input type="text" name="Address" id="address" placeholder="Address" value={inputValue.Address} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="first-name">Contacts First Name *</label>
					<input type="text" name="CPFirstName" id="first-name" placeholder="First Name" value={inputValue.CPFirstName} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="lastname">Contacts Last Name *</label>
					<input type="text" name="CPLastName" id="lastname" placeholder="Last Name" value={inputValue.CPLastName} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="clientemail">Contacts Email *</label>
					<input type="email" name="CPEMail" id="clientemail" placeholder="Client Email" value={inputValue.CPEMail} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="phonenumber">Phone Number *</label>
					<input type="phone" name="Phone" id="phonenumber" placeholder="000-000-0000" value={inputValue.Phone} onChange={handleChange} />
				</div>
				 <div>
					<label htmlFor="package">Package Type *</label>
					<select name="packageType" id="packagetype" value={inputValue.packageType} onChange={handleChange}>
						<option value="1">Micro Company (1-9)</option>
						<option value="2">Small Company (10-49)</option>
						<option value="3">Medium Company (50-249)</option>
						<option value="4">Large Company (250 +)</option>
					</select>
				</div>
				<div>
					<label htmlFor="startdate">Start Date *</label>
					<input type="date" name="StartDate" id="startdate" placeholder="yyyy-mm-dd" value={inputValue.StartDate} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="enddate">End Date *</label>
					<input type="date" name="EndDate" id="enddate" placeholder="yyyy-mm-dd" value={inputValue.EndDate} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="sub-status">Subscription Status *</label>
					<select name="SubscriptionStatus" id="sub-status" value={inputValue.SubscriptionStatus} onChange={handleChange}>
						<option value="1">Active</option>
						<option value="2">Inactive</option>
					</select>
				</div>
				<div>
					<label htmlFor="permission-level">Permission Level *</label>
					<select name="permissionLevel" id="permission-level" value={inputValue.permissionLevel} onChange={handleChange}>
						<option value="1">Full Administrative Access</option>
						<option value="2">Client Access Level </option>
						
					</select>
				</div>
				<button className="but-general but-col-prim">Submit</button>
				<div className="marg-top">
					<NavLink to="/companyinfo" className="but-back but-col-sec">
						Back
					</NavLink>
				</div>
				{/* <button className="but-back but-col-sec">Back</button> */}
			</form>
		</section>
	);
};
