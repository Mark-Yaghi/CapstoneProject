using Microsoft.AspNetCore.Mvc;
using capstone_HRAgency.Data;
using Microsoft.AspNetCore.Authorization;
using capstone_HRAgency.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Net.Http.Headers;
using System.Security.Principal;
using System.Text.RegularExpressions;
using System.Net.Mail;

namespace capstone_HRAgency.Controllers
{
    public class CompanyController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CompanyController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        [Route("list")]
        public IEnumerable<IdentityRole> GetRoles()
        {
            var roleStore = new RoleStore<IdentityRole>(_context);
            List<IdentityRole> roles = roleStore.Roles.ToList();
            return roles;
        }

        [HttpGet]
        [Route("count")]

        public int GetCount()
        {
            Console.WriteLine(_context.UserRoles.Count());
            return _context.UserRoles.Count();

        }


        [HttpPost]
        public ActionResult Post(string newCompanyName, string newAddress, string newPhone, string newCPFirstName, string newCPLastName, string newCPEmail, string newStartDate, string newEndDate, string newSubscriptionStatus)
        {
           

            if (string.IsNullOrWhiteSpace(newCompanyName) || string.IsNullOrWhiteSpace(newAddress) || string.IsNullOrWhiteSpace(newPhone) || string.IsNullOrWhiteSpace(newCPFirstName) || string.IsNullOrWhiteSpace(newCPLastName) || string.IsNullOrWhiteSpace(newCPEmail) || string.IsNullOrWhiteSpace(newStartDate) || string.IsNullOrWhiteSpace(newEndDate) || string.IsNullOrWhiteSpace(newSubscriptionStatus))
            {
                return BadRequest("Please ensure that a all fields have all been entered.");
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
                else if(!IsValid(newCPEmail))
               // else if (!new Regex(@"^[@ .]{1}$").IsMatch(newCPEmail.Trim()))
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
                    return Ok("The new company was successfully added to the database.");

                }

            }
            catch
            {
                return StatusCode(500);
            }

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

        public IActionResult Index()
        {
            return View();
        }
    }
}
