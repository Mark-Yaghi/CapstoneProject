using capstone_HRAgency.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using capstone_HRAgency.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Net.Http.Headers;
using System.Security.Principal;


namespace capstone_HRAgency.Controllers
{
    [IdentityBasicAuthentication] // Enable Basic authentication for this controller.
   // [Authorize(Roles = "Admin")]  //(Roles = "Admin", AuthenticationSchemes = "Bearer")
    [ApiController]
    [Route("[controller]")]
    

    public class DecreaseCounterController : ControllerBase
    {
       // public IActionResult Index() =>
        //Content("Admin");

        private readonly ApplicationDbContext _context;
        public DecreaseCounterController(ApplicationDbContext context)
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

    }
}





