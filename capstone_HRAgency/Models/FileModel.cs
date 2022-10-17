using Microsoft.AspNetCore.Http;

namespace capstone_HRAgency.Models
{
    public class FileModel
    {
        public string FileName { get; set; }
        public IFormFile FormFile { get; set; }
    }
}
