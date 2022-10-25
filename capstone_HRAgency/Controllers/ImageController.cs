using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Linq;
using capstone_HRAgency.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;

namespace capstone_HRAgency.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ImageController : ControllerBase
  {
    private readonly ApplicationDbContext _context;
    private readonly IWebHostEnvironment _hostEnvironment;

    public ImageController(ApplicationDbContext context, IWebHostEnvironment hostEnvironment)
    {
      _context = context;
      this._hostEnvironment = hostEnvironment;
    }

    public struct ImageInfo
    {
      public string Name { get; set; }
      public string Path { get; set; }
      public string ImgPath { get; set; }
    }

    // GET: api/ImageApi
    [HttpGet]
    public IEnumerable<ImageInfo> Get() => System.IO.Directory.GetFiles(Path.Combine(_hostEnvironment.ContentRootPath, "ClientApp/public/ImagesUpload")).Select(x => new ImageInfo { Name = System.IO.Path.GetFileName(x).Split('.')[0], Path = x, ImgPath = String.Format("{0}://{1}{2}/ImagesUpload/{3}", Request.Scheme, Request.Host, Request.PathBase, System.IO.Path.GetFileName(x).Split('.')[0] + ".jpg") });





    // GET: api/ImageApi/HelloWorld
    [HttpGet("{name}")]
    public ActionResult<ImageInfo> Get(string name)
    {
      string imageFilePath = Path.Combine(_hostEnvironment.ContentRootPath, "ClientApp/public/ImagesUpload", name + ".jpg");
      string ImageSrcPath = String.Format("{0}://{1}{2}/ImagesUpload/{3}", Request.Scheme, Request.Host, Request.PathBase, name + ".jpg");
      if (string.IsNullOrWhiteSpace(name)) return BadRequest();
      if (!System.IO.File.Exists(imageFilePath)) return NotFound();
      return new ImageInfo()
      {
        Name = name,
        Path = imageFilePath,
        ImgPath = ImageSrcPath,
      };
    }
  }
}
