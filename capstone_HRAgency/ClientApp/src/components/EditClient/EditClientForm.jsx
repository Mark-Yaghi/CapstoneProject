import React, { useState, useEffect } from "react";
import "./EditClient-Style.css";
import { useParams, NavLink } from "react-router-dom";
import authService from "../api-authorization/AuthorizeService";

export const EditClientForm = () => {
	const { companyID } = useParams();
	const formInputValue = {
		CompanyName: "",
		Address: "",
		Phone: "",
		CPFirstName: "",
		CPLastName: "",
		CPEMail: "",
		StartDate: "",
		EndDate: "",
		SubscriptionStatus: "",
		PackageType: "",
		PermissionLevel: "",
	};
	

	const [inputValue, setInputValue] = useState(formInputValue);
	const [singleCompanyData, setSingleCompanyData] = useState({});
	const { companyName, address, phone, cpFirstName, cpLastName, cpEmail, startDate, endDate, SubscriptionStatus, packages, PermissionLevel } = singleCompanyData;
	//const [CompanyName, setCompanyName] = useState(singleCompanyData.companyName);

	useEffect(() => {
		const populateRoles = async () => {
			const token = await authService.getAccessToken();
			// console.log(token);
			const responseList = await fetch(`company/${companyID}`, {
				headers: !token ? {} : { Authorization: `Bearer ${token}` }, //Admin
			});
			if (responseList.ok) {
				const dataList = await responseList.json();
				// console.log(dataList);
				setSingleCompanyData(dataList);
			} else {
				console.log(await responseList.text());
			}
		};
        
		setInputValue({
			companyID,
			CompanyName: inputValue.CompanyName,
			Address: inputValue.Address,
			Phone: inputValue.Phone,
			CPFirstName: inputValue.CPFirstName,
			CPLastName: inputValue.CPLastName,
			CPEMail: inputValue.CPEMail,
			StartDate: inputValue.StartDate,
			EndDate: inputValue.EndDate,
			SubscriptionStatus: inputValue.SubscriptionStatus,
			PackageType: inputValue.PackageType,
			PermissionLevel: ((inputValue.PermissionLevel) === 1 ? "Full Admin Access" : "Client Level Access")
		});

		// setCompanyName({ CompanyName: singleCompanyData.companyName });

		populateRoles();
	}, []);
     
	

	const submitHandler = async (e) => {
		e.preventDefault();
		console.log(inputValue);

		var tempDate = new Date();
		tempDate = tempDate.getFullYear() + "-" + (tempDate.getMonth() + 1) + "-" + tempDate.getDate();

		var todaysDate = new Date();
		todaysDate = todaysDate.getFullYear() + 1 + "-" + (todaysDate.getMonth() + 1) + "-" + todaysDate.getDate();
		//alert("This is Date.now: " + Date.now()); //returns milliseconds

		//alert("This is inputvalue.startdate: "+ inputValue.StartDate+ " ; this is tempdate: "+ tempDate); //returns date
		//alert("Today's date plus one year: " + todaysDate + " Start Year: " + inputValue.StartDate);
		if (inputValue.CompanyName.trim() === "")
		{
			alert("Please enter a name for the company.");			
			document.getElementById("CompanyName").focus();
			document.getElementById("CompanyName").scrollIntoView({ behavior: "smooth" });

		} else if (inputValue.Address.trim() === "") {
			alert("Please enter an address for the company.");
			document.getElementById("address").focus();
		} else if (inputValue.Address.length <= 10) {
			alert("Please enter an address with at least 10 characters for the company.");
			document.getElementById("address").focus();
		} else if (inputValue.Phone.trim() === "") {
			alert("Please enter a 10 digit phone number for the company.");
			document.getElementById("phoneNumber").focus();
		} else if (isNaN(inputValue.Phone)) {
			alert("Please enter a 10 digit phone number for the company consisting of only numbers.");
			document.getElementById("phoneNumber").focus();
		} else if (inputValue.CPFirstName.trim() === "") {
			alert("Please enter a Contact Person first name for the company.");
			document.getElementById("firstName").focus();
		} else if (inputValue.CPLastName.trim() === "") {
			alert("Please enter a Contact Person last name for the company.");
			document.getElementById("lastName").focus();
		} else if (inputValue.CPEMail.trim() === "") {
			alert("Please enter a Contact Person email for the company.");
			document.getElementById("CPEMail").focus();
		} else if (!checkEmail(inputValue.CPEMail)) {
			alert("Please enter an email with at least 8 characters, and includes the '@' symbol.");
			document.getElementById("CPEmail").focus();
		} else if (inputValue.PackageType.length == 0) {
			alert("Please select a Package Type for the company");
			document.getElementById("PackageType").focus();
		} else if (inputValue.StartDate.trim() === "") {
			alert("Please select a Start Date for the company");
			document.getElementById("StartDate").focus();
		} else if (inputValue.EndDate.trim() === "") {
			alert("Please select an End Date for the company");
			document.getElementById("EndDate").focus();
		} else if (inputValue.StartDate.trim() >= inputValue.EndDate.trim()) {
			alert("Please enter an end date that is AFTER the start date.");
			document.getElementById("EndDate").focus();
		} else if (inputValue.StartDate < tempDate) {
			alert("Please select a Start Date equal to or later than today's date of " + tempDate);
			document.getElementById("StartDate").focus();
		} else if (inputValue.StartDate > todaysDate) {
			alert("Please select a Start Date no more than 1 year into the future from today's date of " + todaysDate);
			document.getElementById("StartDate").focus();
		} else if (inputValue.SubscriptionStatus.trim() === "") {
			alert("Please select a Subscription Status for the company");
			document.getElementById("SubscriptionStatus").focus();
		} else if (inputValue.PermissionLevel.trim() === "") {
			alert("Please select a Permission Level for the company");
			document.getElementById("PermissionLevel").scrollIntoView({ behavior: "smooth" });
			document.getElementById("PermissionLevel").focus();
		}
			
		else
		{
				try
				{
					let urlParams =
					{
						companyID,
						editCompanyName: inputValue.CompanyName,
						editAddress: inputValue.Address,
						editPhone: inputValue.Phone,
						editCPFirstName: inputValue.CPFirstName,
						editCPLastName: inputValue.CPLastName,
						editCPEMail: inputValue.CPEMail,
						editStartDate: inputValue.StartDate,
						editEndDate: inputValue.EndDate,
						editSubscriptionStatus: inputValue.SubscriptionStatus,
						editPackageName: inputValue.PackageType,
						editPermissionLevel: inputValue.PermissionLevel
					};
		

					//const token = await authService.getAccessToken();
					//const res = await axios.post("registeredit/?", new URLSearchParams(inputValue), { headers: !token ? {} : { Authorization: `Bearer ${token}` } });
					const resp = await fetch(`api/registeredit?` + new URLSearchParams(urlParams), { method: "PUT" });

					if (resp.ok)    //if we get a good response, send out a message letting the user know.
					{
						alert("The database has been successfully updated.");

						//reset input fields to empty to prepare to accept another update.

						setInputValue({
							CompanyName: "",
							Address: "",
							Phone: "",
							CPFirstName: "",
							CPLastName: "",
							CPEMail: "",
							StartDate: "",
							EndDate: "",
							SubscriptionStatus: "",
							PackageType: "",
							PermissionLevel: "",
						});

						//---ADD CODE HERE TO AUTOMATICALLY REDIRECT BCK TO DETAILS PAGE.------------
						//Response.AppendHeader("Refresh", "5;url=/editClient");
						
					}
					else { alert("An error occurred during the update. The record was not updated."); }
				}
				catch (error)
				{
					console.log(error.response);
			    } 

		}
		
	};

    const handleChange = (e) => {
        //console.log(`${e.target.name}: ${e.target.value}`);
        setInputValue((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

	const checkEmail = (emailInput) => {
		let validEmail = false;
		for (var i = 0; i <= emailInput.length; i++) {
			if (emailInput.charAt(i) == "@") {
				validEmail = true;
			}
		}
		return validEmail;
	};
	return (
		<section className="main-container">
			{/* <h1 className="heading-card">Edit Client Form</h1> */}
			<form onSubmit={submitHandler} className="form-container bg-color-prim">
				<h1 className="heading-form">Edit Client Form</h1>
				<div>
					<label htmlFor="CompanyName">Company Name * &nbsp; &nbsp;  Previous: {companyName }</label>
					 <input type="text" name="CompanyName" id="CompanyName" value={inputValue.CompanyName} onChange={handleChange} /> 
				{/*<input type="text" name="CompanyName" id="CompanyName" value={CompanyName} onChange={(e) => setCompanyName(e.target.value)} />*/}
					
				</div>
				<div>
					<label htmlFor="address">Company Address * &nbsp; &nbsp; Previous: {address}</label>
					<input type="text" name="Address" id="address"  value={inputValue.Address} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="Phone">Company Phone * &nbsp; &nbsp; Previous: {phone }</label>
					<input type="phone" name="Phone" id="phoneNumber" maxLength="10" placeholder={phone} value={inputValue.Phone} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="CPFirstName">Contacts First Name * &nbsp; &nbsp; Previous: {cpFirstName }</label>
					<input type="text" name="CPFirstName" id="firstname" placeholder={cpFirstName} value={inputValue.CPFirstName} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="lastName">Contact Last Name * &nbsp; &nbsp; &nbsp;  Previous: {cpLastName }</label>
					<input type="text" name="CPLastName" id="lastname" placeholder={cpLastName} value={inputValue.CPLastName} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="email">Contacts Email * &nbsp; &nbsp; Previous: {cpEmail }</label>
					<input type="email" name="CPEMail" id="CPEMail" placeholder={cpEmail} value={inputValue.CPEMail} onChange={handleChange} />
				</div>

				<div>
					<label htmlFor="PackageType">Package Type *  &nbsp; &nbsp; Previous: {packages }</label>
					<select name="PackageType" id="PackageType" value={inputValue.PackageType} onChange={handleChange}>
						<option value="">Please select a Package Type</option>
						<option value="Micro Company (1-9)">Micro Company (1-9)</option>
						<option value="Small Company (10-49)">Small Company (10-49)</option>
						<option value="Medium Company (50-249)">Medium Company (50-249)</option>
						<option value="Large Company (250 +)">Large Company (250 +)</option>
					</select>
				</div>
				<div>
					<label htmlFor="Start Date">Start Date *  &nbsp; &nbsp; Previous: {startDate }</label>
					<input type="date" maxLength="10" name="StartDate" id="StartDate" placeholder={startDate} value={inputValue.StartDate} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="End Date">End Date *  &nbsp; &nbsp; Previous: {endDate }</label>
					<input type="date" maxLength="10" name="EndDate" id="EndDate" placeholder={endDate} value={inputValue.EndDate} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="SubscriptionStatus">Subscription Status *  &nbsp; &nbsp;  Previous: {SubscriptionStatus === false ? "Account Inactive" : "Account Active" }</label>
					<select name="SubscriptionStatus" id="SubscriptionStatus" value={inputValue.SubscriptionStatus}  onChange={handleChange}>
						<option value="">Please assign a Subscription Status</option>
						<option value="0">Inactive</option>
						<option value="1">Active</option>
					</select>
				</div>
				<div>
					<label htmlFor="PermissionLevel">Permission Level * &nbsp; &nbsp;  Previous: {PermissionLevel === 1 ? "Full Admin Access" : "Client Level Access" }</label>
					<select name="PermissionLevel" id="PermissionLevel" value={inputValue.PermissionLevel} onChange={handleChange}>
						<option value="">Please assign a Permission Level</option>
						<option value="1">Full Administrative Access</option>
						<option value="2">Client Level Access </option>
					</select>
				</div>
				<button className="but-general but-col-prim">Accept Changes</button>
				<br></br>
				<br></br>
				<NavLink className="but-general but-col-sec nav-spec-but" to={`/companyDetail/${companyID}`}>
					Back
				</NavLink>
			</form>
		</section>
	);
};
