using Microsoft.AspNetCore.Mvc;

namespace capstone_HRAgency.Controllers
{
    public class UserInfoController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
