using capstone_HRAgency.Data;
using capstone_HRAgency.Models;
using Microsoft.AspNetCore.Mvc;

namespace capstone_HRAgency.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class PackageController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PackageController(ApplicationDbContext context)
        {
            _context = context;
        }

    [HttpGet("{companyid}")]
        public ActionResult<Package> Get(int companyid)
        {
            try
            {
                Package found = _context.Packages.Where(x => x.CompanyID == companyid).Single();
                return found;
            }
            catch
            {
                return NotFound("Sorry, that Company ID Number wasn't found in the database. ");
            }
        }

    }
}
