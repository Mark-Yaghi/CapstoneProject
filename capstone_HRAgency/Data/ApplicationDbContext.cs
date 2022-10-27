using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Duende.IdentityServer.EntityFramework.Options;
using capstone_HRAgency.Models;

namespace capstone_HRAgency.Data;

public partial class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
{

  public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
      : base(options, operationalStoreOptions)
  {

  }
  public virtual DbSet<Company> Companies { get; set; }
  public virtual DbSet<Package> Packages { get; set; }

  public virtual DbSet<UserInfo> UserInfos { get; set; }
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
      entity.HasKey(e => e.CompanyID);
      entity.ToTable("company");

      entity.Property(e => e.CompanyID).HasColumnType("int(11)").HasColumnName("CompanyID").ValueGeneratedOnAdd();
      entity.Property(e => e.CompanyName).HasColumnType("varchar(30)").HasColumnName("CompanyName").HasMaxLength(30);
      entity.Property(e => e.Address).HasColumnType("varchar(50)").HasColumnName("Address").HasMaxLength(50);
      entity.Property(e => e.Phone).HasColumnType("char(10)").HasColumnName("Phone").HasMaxLength(10);
      entity.Property(e => e.CPFirstName).HasColumnType("varchar(20)").HasColumnName("CPFirstName").HasMaxLength(20);
      entity.Property(e => e.CPLastName).HasColumnType("varchar(20)").HasColumnName("CPLastName").HasMaxLength(20);
      entity.Property(e => e.CPEmail).HasColumnType("varchar(40)").HasColumnName("CPEmail").HasMaxLength(40);
      entity.Property(e => e.StartDate).HasColumnType("date").HasColumnName("StartDate");
      entity.Property(e => e.EndDate).HasColumnType("date").HasColumnName("EndDate");
      entity.Property(e => e.SubscriptionStatus).HasColumnType("int(1)").HasColumnName("SubscriptionStatus");
      entity.HasData(new Company[]
          {
                new Company(){CompanyID = 1, CompanyName= "The HR Agency", Address = "12345-145 street, Edmonton, Ab, T5X6V8", Phone="7809848855", CPFirstName ="Carol", CPLastName="Clinton", CPEmail= "bClinton@arkansas.com", StartDate=DateOnly.Parse("2022-10-01"), EndDate=DateOnly.Parse("2023-10-01"), SubscriptionStatus = true},

                new Company(){CompanyID = 2, CompanyName= "Zellers, Inc.", Address = "14545-173 street, Edmonton, Ab, T5X6V8", Phone="8255872233", CPFirstName ="John", CPLastName="Doe", CPEmail= "jdoe@anonymous.com", StartDate=DateOnly.Parse("2021-09-01"), EndDate=DateOnly.Parse("2023-09-01"), SubscriptionStatus = true},

                new Company(){CompanyID = 3, CompanyName= "General Motors, Inc.", Address = "145 Fir Street, Detroit, Mi, 90251", Phone="7809841155", CPFirstName ="Frank", CPLastName="Smith", CPEmail= "fsmith@gm.com", StartDate=DateOnly.Parse("2022-10-01"), EndDate=DateOnly.Parse("2023-10-01"), SubscriptionStatus = true},

                new Company(){CompanyID = 4, CompanyName= "Ford, Inc.", Address = "800 Ford Street,Dearborn, MI, 95874", Phone="5558792225", CPFirstName ="Henry", CPLastName="Ford", CPEmail= "hFord@ford.com", StartDate=DateOnly.Parse("2019-02-01"), EndDate=DateOnly.Parse("2022-10-01"), SubscriptionStatus = false},

                new Company(){CompanyID = 5, CompanyName= "Frank's Food Emporium", Address = "8524-99 street, Edmonton, Ab, T6X7Y3", Phone="4032454875", CPFirstName ="Joe", CPLastName="Rogan", CPEmail= "frankF@ffe.com", StartDate=DateOnly.Parse("2021-10-01"), EndDate=DateOnly.Parse("2022-10-01"), SubscriptionStatus = false}
        });

    });

    modelBuilder.Entity<UserInfo>(entity =>
    {
      entity.HasKey(e => e.UserID);
      entity.ToTable("userinfo");
      entity.HasIndex(e => e.CompanyID, "FK_UserInfo_Company");
      entity.Property(e => e.UserID).HasColumnType("int(11)").HasColumnName("UserID").ValueGeneratedOnAdd();
      entity.Property(e => e.CompanyID).HasColumnType("int(11)").HasColumnName("CompanyID");
      entity.Property(e => e.PermissionLevel).HasColumnType("int(1)").HasColumnName("PermissionLevel");
   
      entity.HasOne(a => a.Company)
                .WithMany(Company => Company.UserInfos)
                .HasForeignKey(UserInfo => UserInfo.CompanyID)
                .HasConstraintName("FK_UserInfo_Company")
                .OnDelete(DeleteBehavior.Restrict);

      entity.HasData(new UserInfo[]
         {
                new UserInfo() {UserID = 1, CompanyID=1,  PermissionLevel=1 },
                new UserInfo() {UserID = 2, CompanyID=2,  PermissionLevel=2 },
                new UserInfo() {UserID = 3, CompanyID=3,  PermissionLevel=2 },
                new UserInfo() {UserID = 4, CompanyID=4,  PermissionLevel=2 },
                new UserInfo() {UserID = 5, CompanyID=5,  PermissionLevel=2 },
       });
    

    });

    modelBuilder.Entity<Package>(entity =>
    {
      entity.HasKey(e => e.PackageID);
      entity.ToTable("package");
      entity.HasIndex(e => e.CompanyID, "FK_Model_Company");
      entity.Property(e => e.PackageID).HasColumnType("int(11)").HasColumnName("PackageID").ValueGeneratedOnAdd();
      entity.Property(e => e.CompanyID).HasColumnType("int(11)").HasColumnName("CompanyID");
      entity.Property(e => e.PackageName).HasColumnType("varchar(30)").HasColumnName("PackageName").HasMaxLength(30);
      entity.HasOne(Package => Package.Company)
            .WithMany(Company => Company.Packages)
            .HasForeignKey(Package => Package.CompanyID)
            .OnDelete(DeleteBehavior.Restrict);
      
        entity.HasData(new Package[]
         {
                new Package() {PackageID = 1, CompanyID = 1, PackageName="Micro Company" },
                new Package() {PackageID = 2, CompanyID = 2, PackageName="Small Company" },
                new Package() {PackageID = 3, CompanyID = 3, PackageName="Medium Company" },
                new Package() {PackageID = 4, CompanyID = 4, PackageName="Large Company" },
                new Package() {PackageID = 5, CompanyID = 5, PackageName="Small Company" },

       });

    });
    OnModelCreatingPartial(modelBuilder);
  }
  partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}