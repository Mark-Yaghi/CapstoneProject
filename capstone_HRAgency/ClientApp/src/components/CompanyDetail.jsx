import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import authService from "./api-authorization/AuthorizeService";
import "../custom.css";
import { FaEllipsisH } from "react-icons/fa";

const CompanyDetail = () => {
    /*--the code below deals with declaring variables to get data from the company table.---*/
    const { companyID } = useParams();

    const [singleCompanyDetail, setSingleCompanyDetail] = useState([]);
    const { address, companyName, cpEmail, cpFirstName, cpLastName, startDate, endDate, phone, subscriptionStatus } = singleCompanyDetail;

    /*--the code below deals with declaring variables to get data from the package table.---*/
    const [singlePackageDetail, setSinglePackageDetail] = useState([]);
    const { packageName } = singlePackageDetail;

    /*--the code below deals with declaring variables to get data from the userinfo table.---*/
    const [singlePermissionDetail, setSinglePermissionDetail] = useState([]);
    const { permissionLevel } = singlePermissionDetail;

    /*--the code below deals with the Activate/Deactivate button state change.---*/
    const [isActive, setIsActive] = useState([]);
    //const [buttonSubStatus, setbuttonSubStatus] = useState([]);
    //const { buttonSubStatus } = 

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

        //if ({ subscriptionStatus } === true) setIsActive({ isActive: true });
        //else setIsActive({ isActive: false });
        setIsActive(!subscriptionStatus);

        console.log("SubscriptionStatus: " + { subscriptionStatus });
    };

    console.log(singleCompanyDetail);
    useEffect(() => {


        

        populateRoles();

    }, []);
    useEffect(() => {
        const doTheThing = async () => {
            try {
                let urlParams =
                {
                    companyID: companyID,
                    updateSubscriptionStatus: isActive

                };

                const resp = await fetch(`api/registeredit?` + new URLSearchParams(urlParams), {
                    method: "PATCH"
                });
                console.log(await resp.text());

                if (resp.ok)    //if we get a good response, send out a message letting the user know.
                {
                    alert("The company's status has been successfully to " + subscriptionStatus === false ? "Account Inactive" : "Account Active");
                    populateRoles();
                    //reset input fields to empty to prepare to accept another add.

                    //setInputValue({ SubscriptionStatus: "" });

                };
            }
            catch (error) { console.log(error.response); }
        }
        doTheThing();
    }, [isActive]);
   const handleClick = async (e) => {

       setIsActive(current => !current);

       /*  e.PreventDefault(); */
        

    }
   

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
                    <div>
                        <button className="but-general" style={{
                            backgroundColor: isActive ? '#d21f3c' : 'green',
                            color: isActive ? 'white' : 'white',
                        }} onClick={handleClick}>{isActive ? "Deactivate" : "Activate"}</button>
                    </div>
                    <NavLink className="but-general but-col-red" to="/">
                        Delete
                    </NavLink>
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
