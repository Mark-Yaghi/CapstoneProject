using Microsoft.AspNetCore.Mvc;
using capstone_HRAgency.Data;
using capstone_HRAgency.Models;
using System.Text.RegularExpressions;
using System.Net.Mail;
using capstone_HRAgency.Controllers;
using System.ComponentModel.Design;

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

        [HttpPost]
        [Route("POST")]
        public ActionResult Post(string newCompanyName, string newAddress, string newPhone, string newCPFirstName, string newCPLastName, string newCPEmail, string newStartDate, string newEndDate, string newSubscriptionStatus, string newPackageName, int newPermissionLevel)
        {

            if (string.IsNullOrWhiteSpace(newCompanyName.Trim()) || string.IsNullOrWhiteSpace(newAddress.Trim()) || string.IsNullOrWhiteSpace(newPhone.Trim()) || string.IsNullOrWhiteSpace(newCPFirstName.Trim()) || string.IsNullOrWhiteSpace(newCPLastName.Trim()) || string.IsNullOrWhiteSpace(newCPEmail.Trim()) || string.IsNullOrWhiteSpace(newStartDate.Trim()) || string.IsNullOrWhiteSpace(newEndDate.Trim()) || string.IsNullOrWhiteSpace(newSubscriptionStatus.Trim())|| string.IsNullOrWhiteSpace(newPackageName.Trim()))
            {
                return BadRequest("Please ensure that all fields have all been entered.");
            }

            try
            {
                // int parentRec = _context.VehicleManufacturer.Where(x => x.ID == tempManuID).Count();

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
                    return BadRequest("Please enter only 10 digits for the phone number");
                }

                // else if (parentRec == 0)
                // {
                //    return BadRequest("Sorry, that Manufacturer ID is not in the database. Please enter the correct ID or //create a new manufacturer.");
                // }

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


                else
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
                        SubscriptionStatus = bool.Parse(newSubscriptionStatus)

                    });
                    _context.SaveChanges();
                    // return Ok("The new company was successfully added to the database.");
                }

                //select the id from the company just added
                Company found = _context.Companies.Where(x => x.CompanyName == newCompanyName).Single();
                if (found != null)
                {
                    int tempCompanyID = found.CompanyID;

                    _context.Packages.Add(new Package()
                    {
                        CompanyID = tempCompanyID,
                        PackageName = newPackageName

                    });
                    _context.SaveChanges();


                    _context.UserInfos.Add(new UserInfo()
                    {
                        CompanyID = tempCompanyID,
                        PermissionLevel = newPermissionLevel

                    });
                    return Ok("The new company was successfully added to the database.");
                }
                else { return NotFound("Sorry, that Company ID Number wasn't found in the database. "); }

            }

            catch
            {
                return StatusCode(500);
            }
        }


        [HttpGet]
        [Route("count")]

        public int GetCount()
        {
            Console.WriteLine(_context.Companies.Count());
            return _context.Companies.Count();
        }

        [HttpGet]
        [Route("list")]
        public IEnumerable<Company> GetCompanies()
        {
            return _context.Companies.ToList();

            //var roleStore = new RoleStore<IdentityRole>(_context);
            //List<IdentityRole> roles = roleStore.Roles.ToList();
            // return roles;
        }

        public bool IsValid(string emailaddress)
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
