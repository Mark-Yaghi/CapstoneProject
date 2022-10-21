import React, { useEffect, useState } from "react";
import authService from "./api-authorization/AuthorizeService";
import { NavLink } from "react-router-dom";
import "../custom.css";
import ButtonLink from "./Button/ButtonLink";

const Company = () => {
	const [companiesList, setCompaniesList] = useState([]);
	useEffect(() => {
		const populateRoles = async () => {
			const token = await authService.getAccessToken();
			const responseList = await fetch("company/list", {
				headers: !token ? {} : { Authorization: `Bearer ${token}` }, //Admin
			});
			if (responseList.ok) {
				const dataList = await responseList.json();
				setCompaniesList(dataList);
			} else {
				console.log(await responseList.text());
			}
		};
		populateRoles();
	}, []);
	return (
		<div>
			<ButtonLink />
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
					{companiesList.map((company) => (
						<tr key={company.companyID}>
							<td>{company.companyName}</td>
							<td>{company.address}</td>
							<td>{company.phone}</td>
							<td>{company.cpFirstName}</td>
							<td>{company.cpLastName}</td>
							<td>{company.cpEmail}</td>
							<td>
								<NavLink to={`/companyDetail/${company.companyID}`} className="but-general but-col-sec">
									Select
								</NavLink>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Company;
