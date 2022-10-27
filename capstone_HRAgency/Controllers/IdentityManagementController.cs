using capstone_HRAgency.Data;
using capstone_HRAgency.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;



/*using (var context = new YourContextName())
{
    var usersAndRoles = new List<UserRoleModel>(); // Adding this model just to have it in a nice list.
    var users = context.AspNetUsers;

    foreach (var user in users)
    {
        foreach (var role in user.Roles)
        {
            usersAndRoles.Add(new UserRoleModel
            {
                UserName = user.UserName,
                RoleName = role.Name
            });
        }
    }
}*/



namespace capstone_HRAgency.Controllers
{
    public class IdentityManagementController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public IdentityManagementController(ApplicationDbContext context)
        {
            _context = context;
        }

       /* [HttpGet]
        [Route("list")]
        public IEnumerable<AspNetUserRole> GetCompanies()
        {
           var list = _context.AspNetUserRole.ToList();
            
            return _context.AspNetUserRole.ToList();
        }*/
        


    }    
}
