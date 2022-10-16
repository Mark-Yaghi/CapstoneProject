using Microsoft.AspNetCore.Mvc;

namespace capstone_HRAgency.Controllers
{
    public class CompanyController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
