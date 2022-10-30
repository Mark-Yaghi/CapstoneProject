using capstone_HRAgency.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Drawing;
using System.Globalization;
using System.IO;

namespace capstone_HRAgency.Controllers
{
  [Route("api/[Controller]")]
  [ApiController]
  public class FileController : Controller
  {

    [HttpPost]
    public ActionResult Post([FromForm] FileModel file)
    {
      try
      {
        TextInfo CardName = CultureInfo.CurrentCulture.TextInfo;

        string imageName = Path.GetFileNameWithoutExtension(CardName.ToTitleCase(file.FileName)).Replace(" ", "");

        imageName = imageName + "-" + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(file.FileName);

        string path = Path.Combine(Directory.GetCurrentDirectory(), "ClientApp/public/ImagesUpload", imageName);

        using (Stream stream = new FileStream(path, FileMode.Create))
        {
          file.FormFile.CopyTo(stream);
        }

        return StatusCode(StatusCodes.Status201Created);

      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError);
      }
    }

  }
}

