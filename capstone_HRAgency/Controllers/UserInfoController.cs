using capstone_HRAgency.Data;
using capstone_HRAgency.Models;
using Microsoft.AspNetCore.Mvc;
/*------This page is used to supply both the CompanyDetail.jsx and EditCLientForm.jsx pages.------*/

namespace capstone_HRAgency.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class UserInfoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserInfoController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{companyid}")]
        public ActionResult<UserInfo> Get(int companyid)
        {
            try
            {
                UserInfo found = _context.UserInfos.Where(x => x.CompanyID == companyid).Single();
                return found;
            }
            catch
            {
                return NotFound("Sorry, that Company ID Number wasn't found in the database. ");
            }
        }

    }
}
