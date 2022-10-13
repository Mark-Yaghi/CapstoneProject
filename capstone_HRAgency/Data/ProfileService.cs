using capstone_HRAgency.Models;
using Duende.IdentityServer.Models;
using Duende.IdentityServer.Services;
using IdentityModel;
using Microsoft.AspNetCore.Identity;
using System.Data;
using System.Security.Claims;

namespace capstone_HRAgency.Data
{
    public class ProfileService : IProfileService
    {
        protected UserManager<ApplicationUser> UserManager;
        public ProfileService(UserManager<ApplicationUser> userManager)
        {
            UserManager = userManager;
        }

        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            ApplicationUser user = await UserManager.GetUserAsync(context.Subject);

            IList<string> roles = await UserManager.GetRolesAsync(user);

            var claims = new List<Claim> {
            // here you can include other properties such as id, email, address, etc. as part of the jwt claim types
            new Claim(JwtClaimTypes.Email, user.Email),
            new Claim(JwtClaimTypes.Name, user.Email.Split("@")[0])
        };
            foreach (string role in roles)
            {
                // include the roles
                claims.Add(new Claim(JwtClaimTypes.Role, role));
            }
            //claims.Add(new Claim(JwtClaimTypes.Role, "peasant"));

            context.IssuedClaims.AddRange(claims);
        }

        public Task IsActiveAsync(IsActiveContext context)
        {
            return Task.CompletedTask;
        }
    }
}
