namespace capstone_HRAgency.Models
{
    public class Package
    {
       // public Package()
       // {
       //     Companies = new HashSet<Company>();

      //  }
        public int ID { get; set; }

        public int CompanyID { get; set; }
        public string PackageName { get; set; }
       
        public virtual Company Company { get; set; } = null!;
    }
}
