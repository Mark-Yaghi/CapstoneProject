import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import authService from "./api-authorization/AuthorizeService";

const CompanyDetail = () => {
	const [singleCompnayDetail, setSingleCompanyDetail] = useState(null);
	const { companyID } = useParams();
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
		</div>
	);
};

export default CompanyDetail;
