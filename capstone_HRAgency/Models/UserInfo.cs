namespace capstone_HRAgency.Models
{
    public class UserInfo
    {
        public int UserID { get; set; }
        public int CompanyID { get; set; }
       
        public int PermissionLevel { get; set; }

        public virtual Company Company { get; set; }

    }
}
