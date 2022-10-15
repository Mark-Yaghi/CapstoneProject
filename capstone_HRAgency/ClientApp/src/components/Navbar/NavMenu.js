import React from "react";
// import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import { LoginMenu } from "../api-authorization/LoginMenu";
import "./NavMenu.css";

export const NavMenu = () => {
	return (
		<header className="navbar">
			<nav className="flex-center nav-container">
				<div>
					<Link to="/">
						<img src="./images/Logo.png" alt="Logo" />
					</Link>
				</div>
				<div className="flex-center nav-link">
					<ul>
						<li>
							<NavLink to="/">Home</NavLink>
						</li>
						<li>
							<NavLink to="https://www.google.com/" target="_blank">
								Expert Solutions
							</NavLink>
						</li>
						<li>
							<NavLink to="https://www.blogger.com" target="_blank">
								Blog
							</NavLink>
						</li>
						<li>
							<NavLink to="https://www.chatiw.com/" target="_blank">
								Let's Chat
							</NavLink>
						</li>
						<li>
							<LoginMenu></LoginMenu>
						</li>
					</ul>
					<ul>
						<li>
							<a href="https://ca.linkedin.com" target="_blank" rel="noreferrer">
								<img src="./images/LinkedInLogo.png" alt="Logo" />
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
};

// export class NavMenu extends Component {
// 	static displayName = NavMenu.name;

// 	constructor(props) {
// 		super(props);

// 		this.toggleNavbar = this.toggleNavbar.bind(this);
// 		this.state = {
// 			collapsed: true,
// 		};
// 	}

// 	toggleNavbar() {
// 		this.setState({
// 			collapsed: !this.state.collapsed,
// 		});
// 	}

// 	render() {
// 		return (
// 			<header>
// 				<Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
// 					{/* <NavbarBrand tag={Link} to="/">
// 						capstone_HRAgency
// 					</NavbarBrand> */}
// 					<Link to="/">
// 						<img src="Logo.png" alt="Logo" />
// 					</Link>
// 					<NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
// 					<Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
// 						<ul className="navbar-nav flex-grow">
// 							<NavItem>
// 								<NavLink tag={Link} className="text-dark" to="/">
// 									Home
// 								</NavLink>
// 							</NavItem>
// 							<NavItem>
// 								<NavLink tag={Link} className="text-dark" to="/counter">
// 									Counter
// 								</NavLink>
// 							</NavItem>
// 							<NavItem>
// 								<NavLink tag={Link} className="text-dark" to="/decreasecounter">
// 									DecreaseCounter
// 								</NavLink>
// 							</NavItem>
// 							<NavItem>
// 								<NavLink tag={Link} className="text-dark" to="/fetch-data">
// 									Fetch data
// 								</NavLink>
// 							</NavItem>
// 							<LoginMenu></LoginMenu>
// 						</ul>
// 					</Collapse>
// 				</Navbar>
// 			</header>
// 		);
// 	}
// }
