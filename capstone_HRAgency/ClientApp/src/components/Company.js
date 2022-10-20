import React, { Component } from "react";
import authService from "./api-authorization/AuthorizeService";
import { NavLink } from "react-router-dom";
import { LoginMenu } from "./api-authorization/LoginMenu";
import "../custom.css";

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
				<section className="main-container flex-center flex-option  flex-right">
					<div className="flex-center">
						<NavLink className="but-general but-col-prim" to="/">
							Commendation
						</NavLink>
						<NavLink className="but-general but-col-prim marg-left" to="/addClient">
							Add New Client
						</NavLink>
						<button className="but-general but-col-prim marg-left">
							<LoginMenu></LoginMenu>
						</button>
					</div>
				</section>
				<section className="main-container">{contents}</section>
			</div>
		);
	}
}
