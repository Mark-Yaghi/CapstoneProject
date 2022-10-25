using capstone_HRAgency.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Drawing;
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

        string imageName = Path.GetFileNameWithoutExtension(file.FileName);

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


//string mainPath = Path.Combine( Directory.GetCurrentDirectory(), "Images", file.FileName ), thumbPath = Path.Combine( Directory.GetCurrentDirectory(), "Images", "Thumbnails", file.FileName );

//using ( Stream oStream = new FileStream( mainPath, FileMode.Create ) )
//{
//    file.FormFile.CopyTo( oStream );
//}
//// This won't work on non-windows servers. Extension to do this in JPG or PNG is recommended.
//using ( FileStream iStream = System.IO.File.OpenRead( mainPath ) )
//{
//    Bitmap main = new Bitmap( iStream ), thumb = new Bitmap( main, new Size( 100, main.Height / ( main.Width / 100 ) ) );
//    thumb.Save( thumbPath );

//    return StatusCode( StatusCodes.Status201Created );