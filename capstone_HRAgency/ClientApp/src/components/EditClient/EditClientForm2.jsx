import React, { Component, useState, useEffect } from "react";
import "./EditClient-Style.css";
import authService from './api-authorization/AuthorizeService';
import { useParams } from 'react-router-doms';



//export class EditClientForm extends Component { 
export const EditClientForm = () => {
   
    //static displayName = EditClientForm.name;

    constructor(props)
    {
        super(props);
        this.state = { isAuthenticated: false, user: null, loading: false, Companies: [], CompanyID: "", CompanyName: "", Address: "", Phone: "", CPFirstName: "", CPLastName: "", CPEMail: "", StartDate: "", EndDate: "", SubscriptionStatus: "", CompanyCount: "" };
        // this.incrementCounter = this.incrementCounter.bind(this);

    }/**/

	/*const formInputValue = { senderName: "", senderEmail: "", recipientName: "", recipientEmail: "", recipManagerEmail: "", comment: "" };
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
	};*/

	this.setState({ CompanyID: route.params.CompanyID });
    const token = authService.getAccessToken();
    console.log(token);
    let requestParams = { id: CompanyID }
    let requestOptions = { method: "GET" }

    const responseList =  fetch("company?" + new URLSearchParams(requestParams), requestOptions, {
        headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    });
    console.log(responseList);
    if (responseList.ok)
    {
        const dataList =  responseList.json(); //await
        console.log(dataList);
        this.setState({ Companies: dataList, loading: false });

    }
    else
    {
        console.log( responseList.text()); //await
    }

    render()
    {
        return (
        <section className="main-container">
            {/* <h1 className="heading-card">Edit Client Form</h1> */}
            <form onSubmit={submitHandler} className="form-container bg-color-prim">
                <h1 className="heading-form">Edit Client Form</h1>
                <div>
                    <label htmlFor="companyName">Company Name *</label>
                    <input type="text" name="companyName" id="company" placeholder="Company Name" value={Companies.CompanyName}  />
                    </div>{/* value={inputValue.CompanyName} onChange={handleChange}*/ }
                <div>
                    <label htmlFor="companyName">Company Address *</label>
                    <input type="text" name="companyName" id="address" placeholder="Address" value={Companies.Address} />
                </div>
                <div>
                    <label htmlFor="companyName">Company Phone *</label>
                    <input type="text" name="companyName" id="phone" placeholder="Phone" value={Companies.Phone}  />
                </div>

                <div>
                    <label htmlFor="firstName">Contacts First Name *</label>
                    <input type="text" name="firstName" id="firstname" placeholder="First Name" value={Companies.CPFirstName}  />
                </div>
                <div>
                    <label htmlFor="lastName">Contacts Last Name *</label>
                    <input type="text" name="lastName" id="lastname" placeholder="Last Name" value={Companies.CPLastName} />
                </div>
                <div>
                    <label htmlFor="email">Contacts Email *</label>
                    <input type="email" name="clientEmail" id="clientemail" placeholder="Client Email" value={Companies.CPEMail}/>
                </div>
                <div>
                    <label htmlFor="package">Package Type *</label>
                    <select name="packageType" id="packagetype">
                        <option value="1">Micro Company</option>
                        <option value="2">Small Company</option>
                        <option value="3">Medium Company</option>
                        <option value="4">Large Company</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="Start Date">Start Date *</label>
                    <input type="date" name="startDate" id="startdate" placeholder="yyyy-mm-dd" value={Companies.StartDate}  />
                </div>
                <div>
                    <label htmlFor="End Date">End Date *</label>
                    <input type="date" name="endDate" id="enddate" placeholder="yyyy-mm-dd" value={Companies.EndDate}  />
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
                        <option value="2">2 - Client Level Permissions Only</option>

                    </select>
                </div>
                <button className="but-general but-col-prim">Accept Changes</button>
                <br></br>
                <br></br>
                <button className="but-back but-col-sec">Back</button>
            </form>
        </section>
        );
    }	
}
