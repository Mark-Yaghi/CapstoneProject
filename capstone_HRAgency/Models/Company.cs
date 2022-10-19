using capstone_HRAgency.Controllers;
using System.Text.Json.Serialization;

namespace capstone_HRAgency.Models
{
    public class Company
    {
       
        
        public Company()
        {
            Packages = new HashSet<Package>();
            UserInfos = new HashSet<UserInfo>();
        }
        
        public int CompanyID { get; set; }
        public string CompanyName { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string CPFirstName { get; set; }
        public string CPLastName { get; set; }
        public string CPEmail { get; set; }
       
        [JsonConverter(typeof(DateOnlyJsonConverter))]
        public DateOnly StartDate { get; set; }
        
        [JsonConverter(typeof(DateOnlyJsonConverter))]
        public DateOnly EndDate { get; set; }
       
        public bool SubscriptionStatus { get; set; }

       public virtual ICollection<UserInfo>UserInfos { get; set; }
        public virtual ICollection<Package> Packages { get; set; }
       //public List<UserInfo> UserInfos { get; set; }
        
    }
}