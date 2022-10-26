import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import authService from "./api-authorization/AuthorizeService";
import "../custom.css";

const CompanyDetail = () => {
	/*--the code below deals with declaring variables to get data from the company table.---*/
	const { companyID } = useParams();

	const [singleCompnayDetail, setSingleCompanyDetail] = useState([]);	
	const { address, companyName, cpEmail, cpFirstName, cpLastName, startDate, endDate, phone, subscriptionStatus } = singleCompnayDetail;

	/*--the code below deals with declaring variables to get data from the package table.---*/
	const [singlePackageDetail, setSinglePackageDetail] = useState([]);
	const { packageName } = singlePackageDetail;

	/*--the code below deals with declaring variables to get data from the userinfo table.---*/
	const [singlePermissionDetail, setSinglePermissionDetail] = useState([]);
	const { permissionLevel } = singlePermissionDetail;


	console.log(singleCompnayDetail);
	useEffect(() => {
		const populateRoles = async () => {
			const token = await authService.getAccessToken();
			// console.log(token);

			/*--the code below deals with getting data from the company table.---*/

			const responseList = await fetch(`company/${companyID}`, {
				headers: !token ? {} : { Authorization: `Bearer ${token}` }, //Admin
			});
			if (responseList.ok) {
				const dataList = await responseList.json();
				setSingleCompanyDetail(dataList);
			} else {
				console.log(await responseList.text());
			}

			/*--the code below deals with getting data from the package table.---*/

			const responseListPackage = await fetch(`package/${companyID}`, {
				headers: !token ? {} : { Authorization: `Bearer ${token}` }, //Admin
			});
			if (responseListPackage.ok) {
				const dataListPackage = await responseListPackage.json();
				setSinglePackageDetail(dataListPackage);
				
			} else {
				console.log(await responseListPackage.text());
				
			}

			/*--the code below deals with getting data from the userinfo table.---*/

			const responseListPermission = await fetch(`userinfo/${companyID}`, {
				headers: !token ? {} : { Authorization: `Bearer ${token}` }, //Admin
			});
			if (responseListPermission.ok) {
				const dataListPermission = await responseListPermission.json();
				setSinglePermissionDetail(dataListPermission);
			} else {
				console.log(await responseListPermission.text());
			}

		};
				
		populateRoles();
	}, []);

	
	return (
		<section className="main-container">
			<section className="cd-container-but-grp ">
				<div className="flex-center flex-xtra-option">
					<NavLink className="but-general but-col-sec" to="/company">
						Back
					</NavLink>
					
					<NavLink className="but-general but-col-sec" to={`/editClient/${companyID}`}>
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
					<li>{subscriptionStatus === false ? "Account Inactive" : "Account Active"}</li>
					<li>{packageName}</li>
					<li>{permissionLevel === 1 ? "Full Admin Access" : "Client Level Access"}</li> 
				</ul>
			</div>
		</section>
	);
};

export default CompanyDetail;
