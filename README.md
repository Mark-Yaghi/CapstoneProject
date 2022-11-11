# CapstoneProject
Date: October 27, 2022
CAPSTONE Project Client Name: The HR Agency
Group Name: CMA Logistics
 Group Members: Arvind Pandit, Corey Woodcox, Mark Yaghi


This program was designed, developed and built to allow the client, the HR Agency, to allow users in a business setting to send commendations/appreciations to other colleagues. It is designed to allow a  user to sign in,select a "card" from the ones available, write a short recognition/congratulatory message on it, and then email it to the recipient and the recipient's manager. That is the scope of the public interface (aside from the login page, this is essentially the only page the client user will ever interact with).

Several other pages were designed and built to facilitate the operation of the site. These include pages for the HR Agency to upload cards (to be used by the end user), add companies, edit company information, view a list and count of the companies in the database, activate/deactivate client accounts from the Company Details page, and finally, delete companies.

These pages are connected to a mySQL database which supports/runs the front end of the site, which was built using HTTP, JavaScript, CSS, and React Components.

Regrettably, the one aspect that we could not complete due to time constraints was the security/validation aspect. While there ARE login requirements, and a user must be registered to use the system (registration completed ONLY by the HR Agency), it's not quite as robust as we had envisioned. This was mainly due to the complexities of learning and utilising the built-in ASP security setups which were created automatically. 

Otherwise, the system works very well, with robust input validation and error checking on both the client side and server side, in an effort to ensure that any data entered into the system is valid information.

#############################################################################################################################################################################

NOTES TO DEVELOPER / INSTALLER

The seed data for The HR Agency has already been added to the ApplicationDbContext.cs page. The CompanyID has been set to one, the email login is her telus email address, and the PermissionLevel in the userInfo seed data has been set to one. THESE MUST NOT BE CHANGED. THESE DATA POINTS ALLOW CAROL TO ENTER AND USE THE SYSTEM. 
The program was built with a MySQL backend via XAMPP/phpMyAdmin. Database connection specifics can be viewed/altered in the ApplicationDbContext.cs, line 25.
 
Being the first person to login to the system after installation, she will need to register. If she cannot do so, then the developer/installer can go to the ClientApp/src/components/api-authorization/LoginMenu.js page, and enable lines 69-71. Once she's been registered, those lines will no longer be needed unless the database needs to be dropped and the migrations redone. They can then be commented out again.

Please refer to the Appendix in the UserManual.doc for further information on the libraries and commands needed to create / run the system.

################################################################################################################################################################################
