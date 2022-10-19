using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace capstone_HRAgency.Areas.Identity.Data;

public class capstone_HRAgencyIdentityDbContext : IdentityDbContext<IdentityUser>
{
    public capstone_HRAgencyIdentityDbContext(DbContextOptions<capstone_HRAgencyIdentityDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        // Customize the ASP.NET Identity model and override the defaults if needed.
        // For example, you can rename the ASP.NET Identity table names and more.
        // Add your customizations after calling base.OnModelCreating(builder);
    }
}
