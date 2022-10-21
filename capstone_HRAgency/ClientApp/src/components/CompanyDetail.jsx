import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import authService from "./api-authorization/AuthorizeService";

const CompanyDetail = () => {
	const [singleCompnayDetail, setSingleCompanyDetail] = useState([]);
	const { companyID } = useParams();
	const { address, companyName, cpEmail, cpFirstName, cpLastName, startDate, endDate, phone } = singleCompnayDetail;
	console.log(singleCompnayDetail);
	useEffect(() => {
		const populateRoles = async () => {
			const token = await authService.getAccessToken();
			// console.log(token);
			const responseList = await fetch(`company/${companyID}`, {
				headers: !token ? {} : { Authorization: `Bearer ${token}` }, //Admin
			});
			if (responseList.ok) {
				const dataList = await responseList.json();
				setSingleCompanyDetail(dataList);
			} else {
				console.log(await responseList.text());
			}
		};
		populateRoles();
	}, []);

	return (
		<div>
			<h1>CompanyDetail:- {companyID}</h1>
			<div className="flex-center">
				<ul>
					<li>Company Name</li>
					<li>Address</li>
					<li>Phone No.</li>
					<li>Email</li>
					<li>Contact Person</li>
					<li>Start Date</li>
					<li>End Date</li>
					<li>Subscription Status</li>
					<li>Type of package</li>
					<li>Permission Level</li>
				</ul>

				<ul>
					<li>{companyName}</li>
					<li>{address}</li>
					<li>{phone}</li>
					<li>{cpEmail}</li>
					<li>{`${cpFirstName} ${cpLastName}`}</li>
					<li>{startDate}</li>
					<li>{endDate}</li>
					<li>{singleCompnayDetail.subscriptionStatus.toString()}</li>
					<li></li>
					<li></li>
				</ul>
			</div>
		</div>
	);
};

export default CompanyDetail;
