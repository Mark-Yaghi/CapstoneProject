using Microsoft.AspNetCore.Mvc;
using capstone_HRAgency.Data;
using capstone_HRAgency.Models;
using capstone_HRAgency.Models.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Net.Http.Headers;
using System.Security.Principal;
using System.Text.RegularExpressions;
using System.Net.Mail;
using Newtonsoft.Json;
using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;
using capstone_HRAgency.Controllers;

namespace capstone_HRAgency.Controllers
{
  [ApiController]
  [Route("[controller]")]

  public class CompanyController : ControllerBase
  {
    private readonly ApplicationDbContext _context;

    public CompanyController(ApplicationDbContext context)
    {
      _context = context;
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

    [HttpGet]
    [Route("count")]

        public int GetCount()
        {
            Console.WriteLine(_context.Companies.Count());
            return _context.Companies.Count();
        }

    [HttpGet("{companyid}")]
    public ActionResult<Company> Get(int companyid)
    {
      try
      {
        Company found = _context.Companies.Where(x => x.CompanyID == companyid).Single();
        return found;
      }
      catch
      {
        return NotFound("Sorry, that Company ID Number wasn't found in the database. ");
      }
    }


        [HttpPost]
        public ActionResult Post(string newCompanyName, string newAddress, string newPhone, string newCPFirstName, string newCPLastName, string newCPEmail, string newStartDate, string newEndDate, string newSubscriptionStatus)
        {

            if (string.IsNullOrWhiteSpace(newCompanyName.Trim()) || string.IsNullOrWhiteSpace(newAddress.Trim()) || string.IsNullOrWhiteSpace(newPhone.Trim()) || string.IsNullOrWhiteSpace(newCPFirstName.Trim()) || string.IsNullOrWhiteSpace(newCPLastName.Trim()) || string.IsNullOrWhiteSpace(newCPEmail.Trim()) || string.IsNullOrWhiteSpace(newStartDate.Trim()) || string.IsNullOrWhiteSpace(newEndDate.Trim()) || string.IsNullOrWhiteSpace(newSubscriptionStatus.Trim()))
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
    [HttpPut]
    public ActionResult Put(int id, string newCompanyName, string newAddress, string newPhone, string newCPFirstName, string newCPLastName, string newCPEmail, string newStartDate, string newEndDate, string newSubscriptionStatus)
    {
      int upDateID = id;
     

      if (string.IsNullOrWhiteSpace(newCompanyName.Trim()) || string.IsNullOrWhiteSpace(newAddress.Trim()) || string.IsNullOrWhiteSpace(newPhone.Trim()) || string.IsNullOrWhiteSpace(newCPFirstName.Trim()) || string.IsNullOrWhiteSpace(newCPLastName.Trim()) || string.IsNullOrWhiteSpace(newCPEmail.Trim()) || string.IsNullOrWhiteSpace(newStartDate.Trim()) || string.IsNullOrWhiteSpace(newEndDate.Trim()) || string.IsNullOrWhiteSpace(newSubscriptionStatus.Trim()))
      {
        return BadRequest("Please ensure that all fields have all been entered.");
      }

      try
      {
        // int parentRec = _context.VehicleManufacturer.Where(x => x.ID == tempManuID).Count();

        // if (_context.Companies.Any(x => x.CompanyName.ToUpper() == newCompanyName.ToUpper()))
        // {
        //   return BadRequest("Sorry, that company is already in the database.");
        // }
        // if (_context.Companies.Any(x => x.Phone == newPhone))
        // {
        //     return BadRequest("Sorry, that phone number is already in the database.");
        // }
        if (!newPhone.Any(x => char.IsNumber(x)) || newPhone.Length != 10)
        {
          return BadRequest("Please enter only 10 digits for the phone number");
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
        // else if (!new Regex(@"^[@ .]{1}$").IsMatch(newCPEmail.Trim()))
        {
          return BadRequest("Please enter a proper email address.");
        }


        else
        {
          _context.Companies.Update(new Company()
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
          return Ok("The new company was successfully updated in the database.");
        }

      }
      catch
      {
        return StatusCode(500);
      }
    }



    [HttpDelete]
    public ActionResult Delete(int id)
    {
      int tempID;
      Company found;
      try
      {
        tempID = id;
      }
      catch
      {
        return BadRequest("No Company ID number was provided. Please provide a Company ID number.");
      }

      try
      {
        found = _context.Companies.Where(x => x.CompanyID == tempID).Single();
      }

      catch
      {
        return NotFound("Sorry, that Company ID wasn't found in the database.");
      }

      try
      {
        int childRec = _context.UserInfos.Where(x => x.CompanyID == tempID).Count();
        //check to see if there is/are associated record(s) in the vehicle table..

        if (childRec == 0)
        {
          _context.Companies.Remove(found);         // no child records, then delete.
          _context.SaveChanges();
          return Ok("The record was deleted successfully.");
        }

        else
        {
          return BadRequest("Sorry, there appears to be some associated records in the UserInfo Table. Once those are deleted, the model ID you identified can be safely deleted.");
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
  }
}
