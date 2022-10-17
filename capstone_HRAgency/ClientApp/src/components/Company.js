import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService';



export class Company extends Component {
    static displayName = Company.name;

    constructor(props) {
        super(props);
        this.state = { isAuthenticated: false, user: null, loading: false, AspNetRoles: [], id: "", companyName: "", Address: "", Phone: "", CPFirstName = "", CPLastName = "", CPEMail = "", StartDate = "", EndDate = "", SubscriptionStatus = "" };
        this.incrementCounter = this.incrementCounter.bind(this);
        this.populateUserData();
    }
}