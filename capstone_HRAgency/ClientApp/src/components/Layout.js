import React, { Component } from "react";
// import { Container } from "reactstrap";
import Footer from "./Footer/Footer";
import "../custom.css";
import { NavMenu } from "./Navbar/NavMenu";

export class Layout extends Component {
	// static displayName = Layout.name;

	render() {
		return (
			<div className="body-flex">
				<NavMenu />
				<main>{this.props.children}</main>
				<Footer />
			</div>
		);
	}
}
