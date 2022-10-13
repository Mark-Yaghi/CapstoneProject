import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService';
//import { ApplicationPaths } from './ApiAuthorizationConstants';


export class DecreaseCounter extends Component {
    static displayName = DecreaseCounter.name;

    constructor(props) {
        super(props);
        this.state = { currentCount: 100, isAuthenticated:false, user:null, loading:false, AspNetRoles:[] };
        this.incrementCounter = this.incrementCounter.bind(this);
        this.populateUserData();
    }

    incrementCounter() {
        this.setState({
            currentCount: this.state.currentCount - 1
        });
    }

    async populateCount() {
        const token = await authService.getAccessToken();
        const responseCount = await fetch('decreasecounter/list', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        console.log(responseCount);
        const dataCount = await responseCount.json();
        console.log(dataCount);
        this.setState({ count: dataCount, loading: false });

    }

    // 5. Fetch the strings and update the state with the new data and turn off loading when the data gets back.
    async populateDealerships() {
        const responseList = await fetch('decreasecounter/list');
        const dataList = await responseList.json();
        this.setState({ AspNetRoles: dataList, loading: false });
    }

    async populateUserData() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        console.log(user);
        this.setState({
            isAuthenticated,
            user: user 
        });



    }
  

    render() {

      let contents = this.state.loading 
            ? <p><em>Loading...</em></p>
            : <ul>
                {this.state.AspNetRoles.map(item =>
                    <li key={item.id}>

                        <li className="flex-li"> ID Number: {item.id}</li>   <br />
                        <li className="flex-li"> Name: {item.name}</li> <br />
                        <li className="flex-li">NormalizedName:{item.normalizedname}</li>   <br />
                        <li className="flex-li">Concurrency Stamp: {item.ConcurrencyStamp}</li>   <br />
                       

                        <button className="btnDelete" >Delete</button>&nbsp;&nbsp;
                        <button className="btnUpdate" >Update</button>
                        <br /> <br />
                        <hr />
                    </li>
                )
                    // When we click either the delete or update button, it passes "item" (the string in question) into the method. This allows the method to target a specific list item based on which button was clicked.
                }
            </ul>;
       
        return (
            <div>
                <h1>Decrease Counter</h1>

                <p>This is a simple example of a React component.</p>

                <p aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></p>

                <button className="btn btn-primary" onClick={this.incrementCounter}>Decrement</button>

                <button className="btnDisplay" onClick={(() => {
                    // 3. When the button is clicked, set the state loading to true and begin the fetch method. Changing state triggers render to fire.
                    this.setState({ loading: true });
                    this.populateCount();
                    // Start thread B.
                    // (Thread A continues)
                    //this.populateDealerships();
                    // Start thread C.
                    // (Thread A continues)
                }).bind(this)

                }>Display Dealership List</button>

                <p> {this.state.user === null ? "Huh?" : this.state.user.role} </p>

                {contents}
            </div>
        );
    }
}
