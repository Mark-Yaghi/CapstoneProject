import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import authService from "../api-authorization/AuthorizeService";
import axios from "axios";
import "./AddNewClient-Style.css";

export const AddNewClientForm = () => {
	// const formInputValue = { companyName: "", firstName: "", lastName: "", clientEmail: "", phoneNumber: "", packageType: "", startDate: "", endDate: "", subStatus: "", permissionLevel: "" };
	const formInputValue = {
		CompanyName: "", Address: "", Phone: "", CPFirstName: "", CPLastName: "", CPEMail: "", StartDate: "", EndDate: "", SubscriptionStatus: "", PackageType:"", PermissionLevel:""
			};
	const [inputValue, setInputValue] = useState(formInputValue);

	// const fetchData = async () => {
	// 	try {
	// 		const res = await axios.post("company/list", { inputValue });
	// 		console.log(res);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };
	console.log(inputValue);
	const submitHandler = async (e) => {
		e.preventDefault();
		 console.log("Inside the submit handler routine. "+ inputValue);
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
		setInputValue({ CompanyName: "", Address: "", Phone: "", CPFirstName: "", CPLastName: "", CPEMail: "", StartDate: "", EndDate: "", SubscriptionStatus: "", PackageType: "", PermissionLevel: "" });
		// setInputValue({ companyName: "", firstName: "", lastName: "", clientEmail: "", phoneNumber: "", packageType: "", startDate: "", endDate: "", subStatus: "", permissionLevel: "" });
		console.log(setInputValue);
		try {
		 	const token = await authService.getAccessToken();
		 	//const res = await axios.post("registeredit/?", new URLSearchParams(inputValue), { headers: !token ? {} : { Authorization: `Bearer ${token}` } });
		  const resp = await fetch(`registeredit/?` + new URLSearchParams(inputValue), { method: "POST" });
		 	console.log(resp);
		 	console.log(resp.data);
		 } catch (error) {
		 	console.log(error.response);
		 }
		
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
					<label htmlFor="CompanyName">Company Name *</label>
					<input type="text" name="CompanyName" id="CompanyName" placeholder="Company Name" value={inputValue.CompanyName} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="address">Address *</label>
					<input type="text" name="Address" id="address" placeholder="Address" value={inputValue.Address} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="phoneNumber">Phone Number *</label>
					<input type="phone" name="Phone" id="phoneNumber" placeholder="000-000-0000" value={inputValue.Phone} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="firstName">Contacts First Name *</label>
					<input type="text" name="CPFirstName" id="firstName" placeholder="First Name" value={inputValue.CPFirstName} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="lastName">Contacts Last Name *</label>
					<input type="text" name="CPLastName" id="lastName" placeholder="Last Name" value={inputValue.CPLastName} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="CPEMail">Contacts Email *</label>
					<input type="email" name="CPEMail" id="CPEMail" placeholder="Client Email" value={inputValue.CPEMail} onChange={handleChange} />
				</div>
				
				 <div>
					<label htmlFor="PackageType">Package Type *</label>
					<select name="PackageType" id="PackageType" value={inputValue.PackageType} onChange={handleChange}>
						<option value="Micro Company (1-9)">Micro Company (1-9)</option>
						<option value="Small Company (10-49)">Small Company (10-49)</option>
						<option value="Medium Company (50-249)">Medium Company (50-249)</option>
						<option value="Large Company (250 +)">Large Company (250 +)</option>
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
					<label htmlFor="SubscriptionStatus">Subscription Status *</label>
					<select name="SubscriptionStatus" id="SubscriptionStatus" value={inputValue.SubscriptionStatus} onChange={handleChange}>
						<option value="0">Inactive</option>
						<option value="1">Active</option>
					</select>
				</div>
				<div>
					<label htmlFor="PermissionLevel">Permission Level *</label>
					<select name="PermissionLevel" id="PermissionLevel" value={inputValue.PermissionLevel} onChange={handleChange}>
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
