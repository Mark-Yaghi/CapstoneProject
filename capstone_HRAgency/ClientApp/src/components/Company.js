import React, { Component, useState, useEffect, useRef } from 'react';
import authService from './api-authorization/AuthorizeService';
import { useNavigate, navigate } from 'react-router-dom';
//import '../../src/custom.css';
import React, { Component } from "react";
import authService from "./api-authorization/AuthorizeService";
import { NavLink } from "react-router-dom";
import { LoginMenu } from "./api-authorization/LoginMenu";
import "../custom.css";
import ButtonLink from "./Button/ButtonLink";


/*
 * @{
    ViewData["Title"] = "Create";
}
 * */


/* if (ViewData["Exceptions"] != null)
{
    <ul>
        @foreach (Exception sub in (ViewData["Exceptions"] as BLLValidationException).SubExceptions)
        {
            <li>@sub.Message</li>
        }
    </ul>

} */


export class Company extends Component
{
    static displayName = Company.name;
   
    constructor(props) {
        super(props);
        this.state = { navigateTo:"", isAuthenticated: false, user: null, loading: false, Companies: [], CompanyID: "", CompanyName: "", Address: "", Phone: "", CPFirstName : "", CPLastName : "", CPEMail : "", StartDate : "", EndDate : "", SubscriptionStatus : "", CompanyCount:"" };
       // this.incrementCounter = this.incrementCounter.bind(this);
        this.populateRoles();
        this.populateCount();       

    }
    
    async populateRoles() {
        const token = await authService.getAccessToken();
        console.log(token);
        const responseList = await fetch('company/list', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }//Admin
        });
        console.log(responseList);
        if (responseList.ok)
        {
            const dataList = await responseList.json();
            console.log(dataList);
            this.setState({ Companies: dataList, loading: false });
           // console.log("Company ID Number" + companies.CompanyID + " Company Name: " + companies.CompanyName);
        }
        else {
            console.log(await responseList.text());
        }
    }
    async populateCount()
    {
        const token = await authService.getAccessToken();
        const responseCount = await fetch('company/count', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }//Admin
        });
        const dataCount = await responseCount.json();
        this.setState({ CompanyCount: dataCount, loading: false });
        console.log("This is the data count; the number of companies: " + {dataCount });
    }
    
     static renderCompaniesTable(CompanyList)
     {
       
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>CP First Name</th>
                        <th>CP Last Name</th>
                        <th>CP Email</th>
                    </tr>
                </thead>
                <tbody>
                    {CompanyList.map(Companies =>
                        <tr key={Companies.companyID}>
                            <td>{Companies.companyName}</td>
                            <td>{Companies.address}</td>
                            <td>{Companies.phone}</td>
                            <td>{Companies.cpFirstName}</td>
                            <td>{Companies.cpLastName}</td>
                            <td>{Companies.cpEmail}</td>
                            <td>
                              <button className="btn btn-primary" onClick={(() => {
                                this.setState({ loading: true });
                                
                            }).bind(this)} >Select Company</button>
                            </td>

                        </tr>// {/* onClick={(() => { this.setState({ loading: true }); { navigate('/EditClientForm',  { CompanyID: Companies.companyID }); } }).bind(this)} */}
                    )}
                </tbody>
            </table>
            
        );
     }
export class Company extends Component {
	static displayName = Company.name;

	constructor(props) {
		super(props);
		this.state = { isAuthenticated: false, user: null, loading: false, Companies: [], CompanyID: "", CompanyName: "", Address: "", Phone: "", CPFirstName: "", CPLastName: "", CPEMail: "", StartDate: "", EndDate: "", SubscriptionStatus: "", CompanyCount: "" };
		// this.incrementCounter = this.incrementCounter.bind(this);
		this.populateRoles();
		this.populateCount();
	}

	async populateRoles() {
		const token = await authService.getAccessToken();
		console.log(token);
		const responseList = await fetch("company/list", {
			headers: !token ? {} : { Authorization: `Bearer ${token}` }, //Admin
		});
		console.log(responseList);
		if (responseList.ok) {
			const dataList = await responseList.json();
			console.log(dataList);
			this.setState({ Companies: dataList, loading: false });
			// console.log("Company ID Number" + companies.CompanyID + " Company Name: " + companies.CompanyName);
		} else {
			console.log(await responseList.text());
		}
	}
	async populateCount() {
		const token = await authService.getAccessToken();
		const responseCount = await fetch("company/count", {
			headers: !token ? {} : { Authorization: `Bearer ${token}` }, //Admin
		});
		const dataCount = await responseCount.json();
		this.setState({ CompanyCount: dataCount, loading: false });
		console.log("This is the data count; the number of companies: " + { dataCount });
	}

	static renderCompaniesTable(CompanyList) {
		return (
			<table className="table table-striped" aria-labelledby="tabelLabel">
				<thead>
					<tr>
						<th>Company Name</th>
						<th>Address</th>
						<th>Phone</th>
						<th>CP First Name</th>
						<th>CP Last Name</th>
						<th>CP Email</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{CompanyList.map((Companies) => (
						<tr key={Companies.companyID}>
							<td>{Companies.companyName}</td>
							<td>{Companies.address}</td>
							<td>{Companies.phone}</td>
							<td>{Companies.cpFirstName}</td>
							<td>{Companies.cpLastName}</td>
							<td>{Companies.cpEmail}</td>
							<td>
								<button
									className="but-general but-col-sec"
									onClick={(() => {
										this.setState({ loading: true });
										this.fireMessage();
									}).bind(this)}
								>
									Select
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}


    render()
    { 
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Company.renderCompaniesTable(this.state.Companies);      

       // <ul>
       /* {this.state.Companies.map(item =>
            <li key={item.CompanyID}>

                <li className="flex-li">Company ID Number: {item.CompanyID}</li>  <br />
                <li className="flex-li">Company Name: {item.CompanyName}   </li>  <br />            
                <li className="flex-li">Address: {item.Address}            </li>  <br />
                <li className="flex-li">Phone Number: {item.Phone }        </li>  <br />
                <li className="flex-li">CP First Name:{item.CPFirstName}   </li>  <br />
                <li className="flex-li">CP Last Name: {item.CPLastName}    </li>  <br />
                <li className="flex-li">CP Email: {item.CPEMail}           </li>  <br />
                <li className="flex-li">Start Date: {item.StartDate}       </li>  <br />
                <li className="flex-li">End Date: {item.EndDate}           </li>  <br />
                <li className="flex-li">Subscription Status: {item.SubscriptionStatus}</li>   <br />
               
                <br /> <br />
                <hr />
            </li>
        )
            // When we click either the delete or update button, it passes "item" (the string in question) into the method. This allows the method to target a specific list item based on which button was clicked.
        }
    </ul>;*/
   

        return(
            <div className = "body" >
                <h1>This is the Company Information Page.</h1>

                <p>On this page you can view the companies currently in the database, and select one to edit or delete.</p>               

                <br /><br />
                <p>There are currently {this.state.CompanyCount} companies in the database. </p>
                {contents}
               
            </div>
        );
    }
}
	render() {
		let contents = this.state.loading ? (
			<p>
				<em>Loading...</em>
			</p>
		) : (
			Company.renderCompaniesTable(this.state.Companies)
		);

		return (
			<div className="body">
				<>
					<ButtonLink />
				</>
				<section className="main-container">{contents}</section>
			</div>
		);
	}
}
