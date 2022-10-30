using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using MimeKit.Text;

namespace capstone_HRAgency.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class EmailController : ControllerBase
  {
    [HttpPost]
    public IActionResult SendEmail(string SenderName, string SenderEmail, string RecipientName,
    string RecipientEmail, string RecipManagerEmail, string Comment, string Image)

    {

      var email = new MimeMessage();
      email.From.Add(MailboxAddress.Parse("knowna700@gmail.com"));
      email.To.Add(MailboxAddress.Parse(RecipientEmail));
      email.Cc.Add(MailboxAddress.Parse(RecipManagerEmail));
      email.Subject = $"Commendation is for {RecipientName} from Email {SenderEmail}";
      email.Body = new TextPart(TextFormat.Html)
      {
        Text = $"<section><p>{Comment}</p><p>Thanks,</p><p>{SenderName}</p><p>{SenderEmail}</p><br/><br/><br/><div style='width:100%; height: 100%; margin-inline: auto; max-height: auto;'><h3 style ='background-color: #1a281fad; color: whitesmoke; font-weight: bolder; padding: 0.5em 0 0.5em 1.4em; margin-top: 1rem;margin-inline: auto; border-radius: 10px; width:800px '> To: {RecipientName}</h3><img src={Image} style='display: block; auto-fit: cover; max-width: 800px; margin-inline: auto;' /><h3  style ='background-color: #1a281fad; color: whitesmoke; text-align: right; font-weight: bolder; padding: 0.5em 1.4em 0.5em 0; margin-bottom: 1rem;margin-inline: auto; border-radius: 10px; max-width: 800px;'> From {SenderName}</h3></div><br/><br/><br/></section>"
      };
      email.Importance = MessageImportance.High;
      //email.Sender.Name = SenderName;

      using var smtp = new SmtpClient();
      smtp.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
      smtp.Authenticate("knowna700@gmail.com", "xlsvunmowsndxgru");
      smtp.Send(email);
      smtp.Disconnect(true);

      return Ok();
    }
  }
}

