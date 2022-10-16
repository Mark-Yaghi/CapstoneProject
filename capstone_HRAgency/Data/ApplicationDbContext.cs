using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Duende.IdentityServer.EntityFramework.Options;
using capstone_HRAgency.Models;

namespace capstone_HRAgency.Data;

public partial class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
{

    //public ApplicationDbContext() : base() { }

    public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
        : base(options, operationalStoreOptions)
    {

    }
    public virtual DbSet<Company> Companies { get; set; }
    public virtual DbSet<Package>Packages { get; set; }
    public object AspNetRoles { get; internal set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured) optionsBuilder.UseMySql("server=localhost;user=root;database=HR_Agency_Demo", ServerVersion.Parse("10.4.24-mariadb"));
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.UseCollation("utf8mb4_general_ci").HasCharSet("utf8mb4");
        modelBuilder.Entity<Company>(entity =>
        {
            entity.HasKey(e => e.ID);
            entity.ToTable("company");

            entity.Property(e => e.ID).HasColumnType("int(11)").HasColumnName("CompanyID").ValueGeneratedOnAdd();
            entity.Property(e => e.CompanyName).HasColumnType("char(30)").HasColumnName("CompanyName").HasMaxLength(30);
            entity.Property(e => e.Address).HasColumnType("char(50)").HasColumnName("Address").HasMaxLength(50);
            entity.Property(e => e.Phone).HasColumnType("char(13)").HasColumnName("Phone").HasMaxLength(13);
            entity.Property(e => e.CPFirstName).HasColumnType("char(20)").HasColumnName("CPFirstName").HasMaxLength(20);
            entity.Property(e => e.CPLastName).HasColumnType("char(20)").HasColumnName("CPLastName").HasMaxLength(20);
            entity.Property(e => e.CPEmail).HasColumnType("char(20)").HasColumnName("CPEmail").HasMaxLength(20);
            entity.Property(e => e.StartDate).HasColumnType("DateOnly").HasColumnName("StartDate");
            entity.Property(e => e.EndDate).HasColumnType("DateOnly").HasColumnName("EndDate");
            entity.Property(e => e.SubscriptionStatus).HasColumnType("bool").HasColumnName("SubscriptionStatus");
            entity.HasData(new Company[]
            {
                new Company(){ID = 1, CompanyName= "The HR Agency", Address = "12345-145 street, Edmonton, Ab, T5X6V8", Phone="7809848855", CPFirstName ="Carol", CPLastName="Clinton", CPEmail= "bClinton@arkansas.com", StartDate=DateOnly.Parse("2022-10-01"), EndDate=DateOnly.Parse("2023-10-01"), SubscriptionStatus = true},

                new Company(){ID = 2, CompanyName= "Zellers, Inc.", Address = "14545-173 street, Edmonton, Ab, T5X6V8", Phone="8255872233", CPFirstName ="John", CPLastName="Doe", CPEmail= "jdoe@anonymous.com", StartDate=DateOnly.Parse("2021-09-01"), EndDate=DateOnly.Parse("2023-09-01"), SubscriptionStatus = true},

                new Company(){ID = 3, CompanyName= "General Motors, Inc.", Address = "145 Fir Street, Detroit, Mi, 90251", Phone="7809841155", CPFirstName ="Frank", CPLastName="Smith", CPEmail= "fsmith@gm.com", StartDate=DateOnly.Parse("2022-10-01"), EndDate=DateOnly.Parse("2023-10-01"), SubscriptionStatus = true},

                new Company(){ID = 4, CompanyName= "Ford, Inc.", Address = "800 Ford Street,Dearborn, MI, 95874", Phone="15558792225", CPFirstName ="Henry", CPLastName="Ford", CPEmail= "hFord@ford.com", StartDate=DateOnly.Parse("2019-02-01"), EndDate=DateOnly.Parse("2022-10-01"), SubscriptionStatus = false},

                new Company(){ID = 5, CompanyName= "Frank's Food Emporium", Address = "8524-99 street, Edmonton, Ab, T6X7Y3", Phone="4032454875", CPFirstName ="Joe", CPLastName="Rogan", CPEmail= "frankF@ffe.com", StartDate=DateOnly.Parse("2021-10-01"), EndDate=DateOnly.Parse("2022-10-01"), SubscriptionStatus = false}
            }) ;


        });//.HasRequired(Company => Company.Id).WithRequiredPrincipal(UserInfo => UserInfo.CompanyID);

        modelBuilder.Entity<UserInfo>(entity =>
        {
            entity.HasKey(e => e.ID);
            entity.ToTable("userinfo");
            entity.HasIndex(e => e.CompanyID, "FK_UserInfo_Company");
            entity.Property(e => e.ID).HasColumnType("int(11)").HasColumnName("UserID").ValueGeneratedOnAdd();
            entity.Property(e => e.CompanyID).HasColumnType("int(11)").HasColumnName("CompanyID");
           
            entity.Property(e => e.PermissionLevel).HasColumnType("int(1)").HasColumnName("PermissionLevel");
            entity.HasOne(userinfo => userinfo.Company).WithMany(Company => Company.UsersInfo).HasForeignKey(UserInfo => UserInfo.CompanyID).OnDelete(DeleteBehavior.Restrict).HasConstraintName("FK_UserInfo_Company");
            entity.HasData(new UserInfo[]
           {
                new UserInfo() {ID = 1, CompanyID=1,  PermissionLevel=1 },
                new UserInfo() {ID = 2, CompanyID=2,  PermissionLevel=2 },
                new UserInfo() {ID = 3, CompanyID=3,  PermissionLevel=2 },
                new UserInfo() {ID = 4, CompanyID=4,  PermissionLevel=2 },
                new UserInfo() {ID = 5, CompanyID=5,  PermissionLevel=2 },
           });


            // entity.HasOne(model => model.VehicleManufacturer).WithMany(manufacturer => manufacturer.VehicleModels).HasForeignKey(model => model.ManufacturerID)
            //     .OnDelete(DeleteBehavior.Restrict).HasConstraintName("FK_Model_Manufacturer");

        });

        modelBuilder.Entity<Package>(entity =>
        {
            entity.HasKey(e => e.ID);
            entity.ToTable("package");
            entity.HasIndex(e => e.CompanyID, "FK_Model_Company");
            entity.Property(e => e.ID).HasColumnType("int(11)").HasColumnName("PackageID").ValueGeneratedOnAdd();
            entity.Property(e => e.CompanyID).HasColumnType("int(11)").HasColumnName("CompanyID");
            entity.Property(e => e.PackageName).HasColumnType("varchar(30)").HasColumnName("PackageName").HasMaxLength(30);
            entity.HasOne(Package=>Package.Company).WithMany(Company=>Company.Packages).HasForeignKey(package => package.ID);
            entity.HasData(new Package[]
           {
                new Package() {ID = 1, CompanyID = 2, PackageName="Micro Company" },
                new Package() {ID = 2, CompanyID = 3, PackageName="Small Company" },
                new Package() {ID = 3, CompanyID = 4, PackageName="Medium Company" },
                new Package() {ID = 4, CompanyID = 5, PackageName="Large Company" },
                new Package() {ID = 5, CompanyID = 6, PackageName="Small Company" },

           });

        });
        OnModelCreatingPartial(modelBuilder);
    }
    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
