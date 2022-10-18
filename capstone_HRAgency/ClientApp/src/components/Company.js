import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService';
//import '../../src/custom.css';



export class Company extends Component
{
    static displayName = Company.name;

    constructor(props) {
        super(props);
        this.state = { isAuthenticated: false, user: null, loading: false, Companies: [], CompanyID: "", CompanyName: "", Address: "", Phone: "", CPFirstName : "", CPLastName : "", CPEMail : "", StartDate : "", EndDate : "", SubscriptionStatus : "" };
       // this.incrementCounter = this.incrementCounter.bind(this);
        this.populateRoles();
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

    render()
    { 
    let contents = this.state.loading
    ? <p><em>Loading...</em></p>
    : <ul>
        {this.state.Companies.map(item =>
            <li key={item.CompanyID}>

                <li className="flex-li">Company ID Number: {item.CompanyID}</li>   <br />
                <li className="flex-li">Company Name: {item.CompanyName}</li> <br />            
                <li className="flex-li">Address: {item.Address}</li>   <br />
                <li className="flex-li">Phone Number: {item.Phone}</li>   <br />
                <li className="flex-li">CP First Name:{item.CPFirstName}</li>   <br />
                <li className="flex-li">CP Last Name: {item.CPLastName}</li>   <br />
                <li className="flex-li">CP Email: {item.CPEMail}</li>   <br />
                <li className="flex-li">Start Date: {item.StartDate}</li>   <br />
                <li className="flex-li">End Date: {item.EndDate}</li>   <br />
                <li className="flex-li">Subscription Status: {item.SubscriptionStatus}</li>   <br />
               
                <br /> <br />
                <hr />
            </li>
        )
            // When we click either the delete or update button, it passes "item" (the string in question) into the method. This allows the method to target a specific list item based on which button was clicked.
        }
    </ul>;
   

        return(
            <div className = "body" >
                <h1>This is the Company Information Page.</h1>

                <p>This is a simple example of a React component.</p>
               

                <p aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></p>

                <button className="btn btn-primary" >Decrement</button>&nbsp;&nbsp;

                <button className="btn btn-primary" onClick={(() => {
                    // 3. When the button is clicked, set the state loading to true and begin the fetch method. Changing state triggers render to fire.
                    this.setState({ loading: true });
                   // this.populateCount();
                    // Start thread B.
                    // (Thread A continues)
                    this.populateRoles();
                    // Start thread C.
                    // (Thread A continues)
                }).bind(this)

                }>Display Roles</button><br />
                 {contents}
            </div>


        );

    }

}