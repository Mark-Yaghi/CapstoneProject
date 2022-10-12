using capstone_HRAgency.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using capstone_HRAgency.Models;


namespace capstone_HRAgency.Controllers
{
    [Authorize(Roles = "Administrator")]
    [ApiController]
    [Route("[controller]")]

    
    public class DecreaseCounterController : ControllerBase
    {
        public IActionResult Index() =>
        Content("Administrator");

        private readonly ApplicationDbContext _context;
        public DecreaseCounterController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("list")]
      //  public IEnumerable<AspNetRoles> GetRoles()
        //{
          //  return _context.AspNetRoles.ToString();
       // }

        [HttpGet]
        [Route("count")]
        public int Count()
        {
            Console.WriteLine(_context.UserRoles.Count());
            return _context.UserRoles.Count();
        }

    }
}





