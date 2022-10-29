import React, { useState, useEffect } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import authService from "./api-authorization/AuthorizeService";
import "../custom.css";



const CompanyDetail = () => {

    const navigate = useNavigate();      //declare ReactHook to allow auto redirect after delete is done.

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

    const populateRoles = async () =>
    {
        const token = await authService.getAccessToken();
        

        /*--the code below deals with getting data from the company table.---*/
        const responseList = await fetch(`company/${companyID}`, {
            headers: !token ? {} : { Authorization: `Bearer ${token}` }, //Admin
        });
        if (responseList.ok) {
            const dataList = await responseList.json();
            setSingleCompanyDetail(dataList);
        }
        else { alert("There was an error retrieving the records from the database."); }

        /*--the code below deals with getting data from the package table.---*/

        const responseListPackage = await fetch(`package/${companyID}`, {
            headers: !token ? {} : { Authorization: `Bearer ${token}` }, //Admin
        });
        if (responseListPackage.ok) {
            const dataListPackage = await responseListPackage.json();
            setSinglePackageDetail(dataListPackage);

        }
        else { alert("There was an error retrieving the records from the database."); }

        /*--the code below deals with getting data from the userinfo table.---*/

        const responseListPermission = await fetch(`userinfo/${companyID}`, {
            headers: !token ? {} : { Authorization: `Bearer ${token}` }, //Admin
        });
        if (responseListPermission.ok) {
            const dataListPermission = await responseListPermission.json();
            setSinglePermissionDetail(dataListPermission);
        }
        else { alert("There was an error retrieving the records from the database."); }
                    //setIsActive(!subscriptionStatus); 
                   //change the state of isActive, based on value of subascriptionStatus
                
    };

    const deleteCompany = async () =>
    {         // this function deals with deleting the from the company table

        if (window.confirm("Are you sure you want to permanently delete this company?")== true)
        {
            try {
                let urlParams = { deleteID: companyID };

                const resp = await fetch(`api/registeredit?` + new URLSearchParams(urlParams), {
                    method: "DELETE"
                });

                if (resp.ok)    //if we get a good response, send out a message letting the user know, then automatically redirect to the company list page.
                {
                    alert("The company has been successfully deleted");
                    navigate("/company", { replace: true });

                };
                //else { alert("There was an issue deleting the company."); }
            }
            catch (error) { console.log(error.response); }
        }
    }

    useEffect(() => {

        populateRoles();

    }, []);

    useEffect(() => {
        const changeSubStatus = async () => {         // this function deals with updating the SubscriptionStatus in the company table
            try {
                let urlParams =
                {
                    companyID: companyID,
                    updateSubscriptionStatus: isActive
                };

                const resp = await fetch(`api/registeredit?` + new URLSearchParams(urlParams), {
                    method: "PATCH"
                });

                if (resp.ok)    //if we get a good response, send out a message letting the user know.
                {
                    alert("The company's Subscription Status has been successfully updated");
                    populateRoles();                 

                };
            }
            catch (error) { console.log(error.response); }
        }
        changeSubStatus();
    }, [isActive]);
  

    const handleClick = async (e) =>
    {

       setIsActive(current => !current);
       setIsActive(!subscriptionStatus); 

        // changeSubStatus();
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
                    <div>
                        <button className="but-general" style={{ backgroundColor: '#d21f3c', color: 'white' }}
                            onClick={deleteCompany}>Delete</button>
                    </div>

                   
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
