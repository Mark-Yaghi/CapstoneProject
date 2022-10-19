﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using capstone_HRAgency.Data;

#nullable disable

namespace capstone_HRAgency.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20221019171654_thirdMigration")]
    partial class thirdMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseCollation("utf8mb4_general_ci")
                .HasAnnotation("ProductVersion", "6.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.HasCharSet(modelBuilder, "utf8mb4");

            modelBuilder.Entity("capstone_HRAgency.Models.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("longtext");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("longtext");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("longtext");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("longtext");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("capstone_HRAgency.Models.Company", b =>
                {
                    b.Property<int>("CompanyID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int(11)")
                        .HasColumnName("CompanyID");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("Address");

                    b.Property<string>("CPEmail")
                        .IsRequired()
                        .HasMaxLength(40)
                        .HasColumnType("varchar(40)")
                        .HasColumnName("CPEmail");

                    b.Property<string>("CPFirstName")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("varchar(20)")
                        .HasColumnName("CPFirstName");

                    b.Property<string>("CPLastName")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("varchar(20)")
                        .HasColumnName("CPLastName");

                    b.Property<string>("CompanyName")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("varchar(30)")
                        .HasColumnName("CompanyName");

                    b.Property<DateOnly>("EndDate")
                        .HasColumnType("date")
                        .HasColumnName("EndDate");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("char(10)")
                        .HasColumnName("Phone");

                    b.Property<DateOnly>("StartDate")
                        .HasColumnType("date")
                        .HasColumnName("StartDate");

                    b.Property<int>("SubscriptionStatus")
                        .HasColumnType("int(1)")
                        .HasColumnName("SubscriptionStatus");

                    b.HasKey("CompanyID");

                    b.ToTable("company", (string)null);

                    b.HasData(
                        new
                        {
                            CompanyID = 1,
                            Address = "12345-145 street, Edmonton, Ab, T5X6V8",
                            CPEmail = "bClinton@arkansas.com",
                            CPFirstName = "Carol",
                            CPLastName = "Clinton",
                            CompanyName = "The HR Agency",
                            EndDate = new DateOnly(2023, 10, 1),
                            Phone = "7809848855",
                            StartDate = new DateOnly(2022, 10, 1),
                            SubscriptionStatus = 1
                        },
                        new
                        {
                            CompanyID = 2,
                            Address = "14545-173 street, Edmonton, Ab, T5X6V8",
                            CPEmail = "jdoe@anonymous.com",
                            CPFirstName = "John",
                            CPLastName = "Doe",
                            CompanyName = "Zellers, Inc.",
                            EndDate = new DateOnly(2023, 9, 1),
                            Phone = "8255872233",
                            StartDate = new DateOnly(2021, 9, 1),
                            SubscriptionStatus = 1
                        },
                        new
                        {
                            CompanyID = 3,
                            Address = "145 Fir Street, Detroit, Mi, 90251",
                            CPEmail = "fsmith@gm.com",
                            CPFirstName = "Frank",
                            CPLastName = "Smith",
                            CompanyName = "General Motors, Inc.",
                            EndDate = new DateOnly(2023, 10, 1),
                            Phone = "7809841155",
                            StartDate = new DateOnly(2022, 10, 1),
                            SubscriptionStatus = 1
                        },
                        new
                        {
                            CompanyID = 4,
                            Address = "800 Ford Street,Dearborn, MI, 95874",
                            CPEmail = "hFord@ford.com",
                            CPFirstName = "Henry",
                            CPLastName = "Ford",
                            CompanyName = "Ford, Inc.",
                            EndDate = new DateOnly(2022, 10, 1),
                            Phone = "15558792225",
                            StartDate = new DateOnly(2019, 2, 1),
                            SubscriptionStatus = 0
                        },
                        new
                        {
                            CompanyID = 5,
                            Address = "8524-99 street, Edmonton, Ab, T6X7Y3",
                            CPEmail = "frankF@ffe.com",
                            CPFirstName = "Joe",
                            CPLastName = "Rogan",
                            CompanyName = "Frank's Food Emporium",
                            EndDate = new DateOnly(2022, 10, 1),
                            Phone = "4032454875",
                            StartDate = new DateOnly(2021, 10, 1),
                            SubscriptionStatus = 0
                        });
                });

            modelBuilder.Entity("capstone_HRAgency.Models.Package", b =>
                {
                    b.Property<int>("PackageID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int(11)")
                        .HasColumnName("PackageID");

                    b.Property<int>("CompanyID")
                        .HasColumnType("int(11)")
                        .HasColumnName("CompanyID");

                    b.Property<string>("PackageName")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("varchar(30)")
                        .HasColumnName("PackageName");

                    b.HasKey("PackageID");

                    b.HasIndex(new[] { "CompanyID" }, "FK_Model_Company");

                    b.ToTable("package", (string)null);

                    b.HasData(
                        new
                        {
                            PackageID = 1,
                            CompanyID = 2,
                            PackageName = "Micro Company"
                        },
                        new
                        {
                            PackageID = 2,
                            CompanyID = 3,
                            PackageName = "Small Company"
                        },
                        new
                        {
                            PackageID = 3,
                            CompanyID = 4,
                            PackageName = "Medium Company"
                        },
                        new
                        {
                            PackageID = 4,
                            CompanyID = 5,
                            PackageName = "Large Company"
                        },
                        new
                        {
                            PackageID = 5,
                            CompanyID = 6,
                            PackageName = "Small Company"
                        });
                });

            modelBuilder.Entity("capstone_HRAgency.Models.UserInfo", b =>
                {
                    b.Property<int>("UserID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int(11)")
                        .HasColumnName("UserID");

                    b.Property<int>("CompanyID")
                        .HasColumnType("int(11)")
                        .HasColumnName("CompanyID");

                    b.Property<int>("PermissionLevel")
                        .HasColumnType("int(1)")
                        .HasColumnName("PermissionLevel");

                    b.HasKey("UserID");

                    b.HasIndex(new[] { "CompanyID" }, "FK_UserInfo_Company");

                    b.ToTable("userinfo", (string)null);

                    b.HasData(
                        new
                        {
                            UserID = 1,
                            CompanyID = 1,
                            PermissionLevel = 1
                        },
                        new
                        {
                            UserID = 2,
                            CompanyID = 2,
                            PermissionLevel = 2
                        },
                        new
                        {
                            UserID = 3,
                            CompanyID = 3,
                            PermissionLevel = 2
                        },
                        new
                        {
                            UserID = 4,
                            CompanyID = 4,
                            PermissionLevel = 2
                        },
                        new
                        {
                            UserID = 5,
                            CompanyID = 5,
                            PermissionLevel = 2
                        });
                });

            modelBuilder.Entity("Duende.IdentityServer.EntityFramework.Entities.DeviceFlowCodes", b =>
                {
                    b.Property<string>("UserCode")
                        .HasMaxLength(200)
                        .HasColumnType("varchar(200)");

                    b.Property<string>("ClientId")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("varchar(200)");

                    b.Property<DateTime>("CreationTime")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Data")
                        .IsRequired()
                        .HasMaxLength(50000)
                        .HasColumnType("longtext");

                    b.Property<string>("Description")
                        .HasMaxLength(200)
                        .HasColumnType("varchar(200)");

                    b.Property<string>("DeviceCode")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("varchar(200)");

                    b.Property<DateTime?>("Expiration")
                        .IsRequired()
                        .HasColumnType("datetime(6)");

                    b.Property<string>("SessionId")
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("SubjectId")
                        .HasMaxLength(200)
                        .HasColumnType("varchar(200)");

                    b.HasKey("UserCode");

                    b.HasIndex("DeviceCode")
                        .IsUnique();

                    b.HasIndex("Expiration");

                    b.ToTable("DeviceCodes", (string)null);
                });

            modelBuilder.Entity("Duende.IdentityServer.EntityFramework.Entities.Key", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Algorithm")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Data")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("DataProtected")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsX509Certificate")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Use")
                        .HasColumnType("varchar(255)");

                    b.Property<int>("Version")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("Use");

                    b.ToTable("Keys");
                });

            modelBuilder.Entity("Duende.IdentityServer.EntityFramework.Entities.PersistedGrant", b =>
                {
                    b.Property<string>("Key")
                        .HasMaxLength(200)
                        .HasColumnType("varchar(200)");

                    b.Property<string>("ClientId")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("varchar(200)");

                    b.Property<DateTime?>("ConsumedTime")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("CreationTime")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Data")
                        .IsRequired()
                        .HasMaxLength(50000)
                        .HasColumnType("longtext");

                    b.Property<string>("Description")
                        .HasMaxLength(200)
                        .HasColumnType("varchar(200)");

                    b.Property<DateTime?>("Expiration")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("SessionId")
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("SubjectId")
                        .HasMaxLength(200)
                        .HasColumnType("varchar(200)");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.HasKey("Key");

                    b.HasIndex("ConsumedTime");

                    b.HasIndex("Expiration");

                    b.HasIndex("SubjectId", "ClientId", "Type");

                    b.HasIndex("SubjectId", "SessionId", "Type");

                    b.ToTable("PersistedGrants", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ClaimType")
                        .HasColumnType("longtext");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("longtext");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ClaimType")
                        .HasColumnType("longtext");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("longtext");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasMaxLength(128)
                        .HasColumnType("varchar(128)");

                    b.Property<string>("ProviderKey")
                        .HasMaxLength(128)
                        .HasColumnType("varchar(128)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("longtext");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("RoleId")
                        .HasColumnType("varchar(255)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("LoginProvider")
                        .HasMaxLength(128)
                        .HasColumnType("varchar(128)");

                    b.Property<string>("Name")
                        .HasMaxLength(128)
                        .HasColumnType("varchar(128)");

                    b.Property<string>("Value")
                        .HasColumnType("longtext");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("capstone_HRAgency.Models.Package", b =>
                {
                    b.HasOne("capstone_HRAgency.Models.Company", "Company")
                        .WithMany("Packages")
                        .HasForeignKey("PackageID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Company");
                });

            modelBuilder.Entity("capstone_HRAgency.Models.UserInfo", b =>
                {
                    b.HasOne("capstone_HRAgency.Models.Company", "Company")
                        .WithMany("UserInfos")
                        .HasForeignKey("CompanyID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("FK_UserInfo_Company");

                    b.Navigation("Company");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("capstone_HRAgency.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("capstone_HRAgency.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("capstone_HRAgency.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("capstone_HRAgency.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("capstone_HRAgency.Models.Company", b =>
                {
                    b.Navigation("Packages");

                    b.Navigation("UserInfos");
                });
#pragma warning restore 612, 618
        }
    }
}
