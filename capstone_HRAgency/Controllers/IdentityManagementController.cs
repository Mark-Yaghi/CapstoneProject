using Microsoft.AspNetCore.Mvc;

namespace capstone_HRAgency.Controllers
{
    public class IdentityManagementController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
