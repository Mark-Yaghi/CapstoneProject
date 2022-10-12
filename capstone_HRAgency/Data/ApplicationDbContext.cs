using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Duende.IdentityServer.EntityFramework.Options;
using capstone_HRAgency.Models;

namespace capstone_HRAgency.Data;

public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
{
   // public virtual DbSet<AspNetRoles> AspNetRoles { get; set; }
     
    public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
        : base(options, operationalStoreOptions)
    {

    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured) optionsBuilder.UseMySql("server=localhost;user=root;database=HR_Agency_Demo", ServerVersion.Parse("10.4.24-mariadb"));
    }



    public object AspNetRoles { get; internal set; }
    
}
