namespace capstone_HRAgency.Models
{
    public class Company
    {
        public Company()
        {
            Packages = new HashSet<Package>();
            UsersInfo = new HashSet<UserInfo>();

        }
        public int CompanyID { get; set; }
        public string CompanyName { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string CPFirstName { get; set; }
        public string CPLastName { get; set; }
        public string CPEmail { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public bool SubscriptionStatus { get; set; }


        public virtual UserInfo UserInfo { get; set; }
        public virtual ICollection<Package> Packages { get; set; }
        public HashSet<UserInfo> UsersInfo { get; }
    }
}