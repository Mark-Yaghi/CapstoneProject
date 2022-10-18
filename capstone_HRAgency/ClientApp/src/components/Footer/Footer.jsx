import React from "react";
import "./Footer-Style.css";
import { FaSearch } from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer-container">
				<div className="flex-center">
					<img src="./images/Logo.png" alt="Logo" />
					<h3>
						<em>Empowering leaders through effective HR solutions.</em>
					</h3>
				</div>

				<div className="input-holder">
					{/* <img className="footer-search-icon" src="./images/Search_Icon.png" alt="Search Icon" /> */}
					<FaSearch className="footer-search-icon" />
					<input className="input-footer" type="text" placeholder="Search" />
				</div>

				<div className="footer-small">
					<small>
						Visit our sister company,{" "}
						<span>
							<a href="https://www.uniquelyyouresumes.com" target="_blank" rel="noopener noreferrer">
								<em>Uniquely You Resumés</em>
							</a>
						</span>
					</small>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
