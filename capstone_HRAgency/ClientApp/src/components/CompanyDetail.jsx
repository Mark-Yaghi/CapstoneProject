import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import authService from "./api-authorization/AuthorizeService";
import ButtonLink from "./Button/ButtonLink";
import "../custom.css";

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
		<section className="main-container">
			<ButtonLink />
			<section className="cd-container-but-grp ">
				<div className="flex-center flex-xtra-option">
					<NavLink className="but-general but-col-sec" to="/editClient">
						Edit
					</NavLink>
					<NavLink className="but-general but-col-sec" to="/">
						Deactivate
					</NavLink>
					<NavLink className="but-general but-col-red" to="/">
						Delete
					</NavLink>
					{/* <button className="but-general but-col-prim marg-left">
					<LoginMenu></LoginMenu>
				</button>*/}
				</div>
			</section>
			<div className="cd-flex cd-container">
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
					{/* <li></li>
					<li></li>
					<li></li> */}
				</ul>
			</div>
		</section>
	);
};

export default CompanyDetail;
