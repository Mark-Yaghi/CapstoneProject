using Microsoft.AspNetCore.Mvc;
using capstone_HRAgency.Data;
using capstone_HRAgency.Models;
using System.Text.RegularExpressions;
using System.Net.Mail;

/*---------------This page deals with the additions and edits of companies in the db.-------  */

namespace capstone_HRAgency.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class RegisterEditController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RegisterEditController(ApplicationDbContext context)
        {
            _context = context;
        }
/* ------------------THE CODE BELOW DEALS WITH ADDING A NEW COMPANY TO THE 3 TABLES IN THE DB. IT IS FED BY INFO FROM THE AddNewClientForm.jsx----------------- */

        [HttpPost]   //"Post" route to add new companies to the db.
       
        public ActionResult Post(string newCompanyName, string newAddress, string newPhone, string newCPFirstName, string newCPLastName, string newCPEmail, string newStartDate, string newEndDate, string newSubscriptionStatus, string newPackageName, int newPermissionLevel)
        {

            if (string.IsNullOrWhiteSpace(newCompanyName.Trim()) || string.IsNullOrWhiteSpace(newAddress.Trim()) || string.IsNullOrWhiteSpace(newPhone.Trim()) || string.IsNullOrWhiteSpace(newCPFirstName.Trim()) || string.IsNullOrWhiteSpace(newCPLastName.Trim()) || string.IsNullOrWhiteSpace(newCPEmail.Trim()) || string.IsNullOrWhiteSpace(newStartDate.Trim()) || string.IsNullOrWhiteSpace(newEndDate.Trim()) || string.IsNullOrWhiteSpace(newSubscriptionStatus.Trim())|| string.IsNullOrWhiteSpace(newPackageName.Trim()))
            {
                return BadRequest("Please ensure that all fields have all been entered.");
            }

            try
            {
                
                if (_context.Companies.Any(x => x.CompanyName.ToUpper() == newCompanyName.ToUpper()))
                {
                    return BadRequest("Sorry, that company is already in the database.");
                }
                else if (_context.Companies.Any(x => x.Phone == newPhone))
                {
                    return BadRequest("Sorry, that phone number is already in the database.");
                }
                else if (!newPhone.Any(x => char.IsNumber(x)) || newPhone.Length != 10)
                {
                    return BadRequest("Please enter only 10 numbers for the phone number");
                }             

                else if (!new Regex(@"^[a-zA-Z0-9.', -]{1,25}$").IsMatch(newCompanyName.Trim())) 
                {
                    return BadRequest("Please enter a Company name using only letters, numbers, a hyphen, comma, apostrophe or period.");
                }
                else if (!new Regex(@"^[a-zA-Z0-9.', -]{1,25}$").IsMatch(newCPFirstName.Trim()))
                {
                    return BadRequest("Please enter a contact person first name using only letters, numbers, a hyphen, comma, apostrophe or period.");
                }
                else if (!new Regex(@"^[a-zA-Z0-9.', -]{1,25}$").IsMatch(newCPLastName.Trim()))
                {
                    return BadRequest("Please enter a contact person last name using only letters, numbers, a hyphen, comma, apostrophe or period.");
                }
                else if (!IsValid(newCPEmail))
                 //else if (!new Regex(@"^[@ .]{1}$").IsMatch(newCPEmail.Trim()))
                {
                    return BadRequest("Please enter a proper email address.");
                }


                else  // if the information sent to the server has passed front-end and back-end checks, add to db.
                {
                    _context.Companies.Add(new Company()
                    {
                        CompanyName = newCompanyName,
                        Address = newAddress,
                        Phone = newPhone,
                        CPFirstName = newCPFirstName,
                        CPLastName = newCPLastName,
                        CPEmail = newCPEmail,
                        StartDate = DateOnly.Parse(newStartDate),
                        EndDate = DateOnly.Parse(newEndDate),
                        SubscriptionStatus =  newSubscriptionStatus == "1" //if value returned is a one->true; anything else is a false

                    });
                    _context.SaveChanges();                   
                }

                /*------------------------------------------------------------------------- */

                //select the id from the company just added
                Company found = _context.Companies.Where(x => x.CompanyName == newCompanyName).Single();
                if (found != null)  //if we find the company name we just added, get its CompanyID number to use for the next two adds.
                {
                    int tempCompanyID = found.CompanyID;

                    _context.Packages.Add(new Package()   //add to the Packages table
                    {
                        CompanyID = tempCompanyID,
                        PackageName = newPackageName

                    });
                    _context.SaveChanges();
                
                    /*------------------------------------------------------------------------- */

                    _context.UserInfos.Add(new UserInfo() //add to the user info table.
                    {
                        CompanyID = tempCompanyID,
                        PermissionLevel = newPermissionLevel

                    });
                    _context.SaveChanges();

                    /*------------------------------------------------------------------------- */

                    return Ok("The new company was successfully added to the database.");
                }
                else { return NotFound("Sorry, that Company ID Number wasn't found in the database. "); }

            }

            catch (Exception)
            {

                return StatusCode(500);
            }
        }

/*----------------------- This endpoint return the count (number of companies in the db at a given point in time. It supplies the "Company.js" page.*/

        [HttpGet]        
        [Route("count")]

        public int GetCount()
        {
            Console.WriteLine(_context.Companies.Count());
            return _context.Companies.Count();
        }
/*---------------------------- This endpoint returns a list of all the companies in the db-it supplies the "Company.js" page.---------------------------------------*/
        [HttpGet]  
        [Route("list")]   
        public IEnumerable<Company> GetCompanies()
        {
            return _context.Companies.ToList();
        }


        [HttpPatch]
        public ActionResult Patch(int companyID, string updateSubscriptionStatus)
        
        {
            Company found;
            found = _context.Companies.Where(x => x.CompanyID == companyID).Single();

            try
            {
                if (found != null)
                {
                    found.SubscriptionStatus = updateSubscriptionStatus == "true";
                    _context.SaveChanges();

                    return Ok("The Subscription Status has been successfully updated.");

                }
                else 
                {
                    return NotFound("An error occurred during the update.");                
                }

            }
            catch (Exception)
            {
                return StatusCode(500);
            }

        }
/*---------------THE CODE BELOW DEALS WITH UPDATING THE 3 TABLES, FED BY DATA FROM THE EditClientForm.JSX------------------------------*/

        [HttpPut]//("{companyid}")
        public ActionResult Put(int companyID, string editCompanyName, string editAddress, string editPhone, string editCPFirstName, string editCPLastName, string editCPEmail, string editStartDate, string editEndDate, string editSubscriptionStatus, string editPackageName, int editPermissionLevel)
        {

            Company found;
            found = _context.Companies.Where(x => x.CompanyID == companyID).Single();

            if (string.IsNullOrWhiteSpace(editCompanyName.Trim()) || string.IsNullOrWhiteSpace(editAddress.Trim()) || string.IsNullOrWhiteSpace(editPhone.Trim()) || string.IsNullOrWhiteSpace(editCPFirstName.Trim()) || string.IsNullOrWhiteSpace(editCPLastName.Trim()) || string.IsNullOrWhiteSpace(editCPEmail.Trim()) || string.IsNullOrWhiteSpace(editStartDate.Trim()) || string.IsNullOrWhiteSpace(editEndDate.Trim()) || string.IsNullOrWhiteSpace(editSubscriptionStatus.Trim()) || string.IsNullOrWhiteSpace(editPackageName.Trim()))
            {
                return BadRequest("Please ensure that all fields have all been entered.");
            }

            try
            {
                if (!editPhone.Any(x => char.IsNumber(x)) || editPhone.Length != 10)
                {
                    return BadRequest("Please enter only 10 numbers for the phone number");
                }

                else if (!new Regex(@"^[a-zA-Z0-9.', -]{1,25}$").IsMatch(editCompanyName.Trim()))
                {
                    return BadRequest("Please enter a Company name using only letters, numbers, a hyphen, comma, apostrophe or period.");
                }
                else if (!new Regex(@"^[a-zA-Z0-9.', -]{1,25}$").IsMatch(editCPFirstName.Trim()))
                {
                    return BadRequest("Please enter a contact person first name using only letters, numbers, a hyphen, comma, apostrophe or period.");
                }
                else if (!new Regex(@"^[a-zA-Z0-9.', -]{1,25}$").IsMatch(editCPLastName.Trim()))
                {
                    return BadRequest("Please enter a contact person last name using only letters, numbers, a hyphen, comma, apostrophe or period.");
                }
                else if (!IsValid(editCPEmail))
                //else if (!new Regex(@"^[@ .]{1}$").IsMatch(newCPEmail.Trim()))
                {
                    return BadRequest("Please enter a proper email address.");
                }


                else  // if the information sent to the server has passed front-end and back-end checks, update the db.
                {
                    
                    found.CompanyName = editCompanyName;
                    found.Address = editAddress;
                    found.Phone = editPhone;
                    found.CPFirstName = editCPFirstName;
                    found.CPLastName = editCPLastName;
                    found.CPEmail = editCPEmail;
                    found.StartDate = DateOnly.Parse(editStartDate);
                    found.EndDate = DateOnly.Parse(editEndDate);
                    found.SubscriptionStatus = editSubscriptionStatus == "1";//if value returned is a one->true; anything else is a false

                    _context.SaveChanges();
                }
                /*------------------------------------------------------------------------- */

                Package found1;                // update Package table

                found1 = _context.Packages.Where(x => x.CompanyID == companyID).Single();
                if (found1 != null)
                {
                    found1.PackageName = editPackageName;
                    _context.SaveChanges();
                }
                /*----------------------------------------------------------------------- */

                 UserInfo found2;              //update Userinfo table

                 found2 = _context.UserInfos.Where(x => x.CompanyID == companyID).Single();
                if (found2 != null)
                {
                    found2.PermissionLevel = editPermissionLevel;

                    _context.SaveChanges();

                    /*------------------------------------------------------------------------- */

                    return Ok("The company's information was successfully updated.");
                }

                else { return NotFound("Sorry, that Company ID Number wasn't found in the database. "); }           
            }

             catch (Exception)
            {
                return StatusCode(500);
            }

        }
            public bool IsValid(string emailaddress)  //built in function to verify emails. Need "using System.Net.Mail;" at the top of the page for it to function properly.
            {
                try
                {
                    MailAddress m = new(emailaddress);

                    return true;
                }
                catch (FormatException)
                {
                    return false;
                }
            }

    }
}
