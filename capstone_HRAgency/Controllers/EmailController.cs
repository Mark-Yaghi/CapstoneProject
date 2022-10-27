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
    //public IActionResult SendEmail( string body )
    {
      //var mailMessage = new MailMessage
      //{
      //    From = new MailAddress( "email" ),
      //    Subject = "subject",
      //    Body = "<h1>Hello</h1>",
      //    IsBodyHtml = true,
      //};
      //mailMessage.To.Add( "recipient" );

      //smtpClient.Send( mailMessage );


      //string fromUser = SenderEmail;
      //string fromPassword = "xlsvunmowsndxgru";

      //MailMessage msg = new MailMessage();
      //msg.From = new MailAddress( fromUser.Trim() );
      //msg.To.Add( new MailAddress( RecipientEmail.Trim() ) );
      //msg.CC.Add( new MailAddress( RecipManagerEmail.Trim() ) );
      //msg.Subject = $"Commedation Message for {RecipientName.Trim()}";
      //msg.Body = $"<html><body>To, {RecipientName} {Comment} {Image} From {SenderName} </body></html>";
      //msg.IsBodyHtml = true;

      //msg.Priority = MailPriority.High;

      //var smtpClient = new SmtpClient( "smtp.gmail.com" )
      //{
      //    Port = 587,
      //    Credentials = new NetworkCredential( "knowna700@gmail.com", fromPassword ),
      //    EnableSsl = true,
      //    UseDefaultCredentials = false,
      //};
      ////smtpClient.Send( "email", "recipient", "subject", "body" );

      //smtpClient.Send( msg );

      var email = new MimeMessage();
      email.From.Add(MailboxAddress.Parse("knowna700@gmail.com"));
      email.To.Add(MailboxAddress.Parse(RecipManagerEmail));
      email.Cc.Add(MailboxAddress.Parse(RecipientEmail));
      email.Subject = $"Commendation is for {RecipientName} from Email {SenderEmail}";
      email.Body = new TextPart(TextFormat.Html)
      {
        Text = $"<div id='0' style='position:relative; width: 800px;' ><div style=' z-index:1; position: absolute; width:100%; height: 800px; margin-inline: auto; max-height: auto;'><h3 id='2' style ='background-color: #1a281fad; position: absolute; top: 18px; left: 18px; color: whitesmoke; font-weight: bolder; padding: 0.5em; margin: 1rem; border-radius: 10px; align-self: flex-start'> To: {RecipientName}</h3><h3 id='3' style ='background-color: #1a281fad; position: absolute; bottom: 18px; right: 18px; color: whitesmoke; font-weight: bolder; padding: 0.5em; margin: 1rem; border-radius: 10px; align-self: flex-end'> From {SenderName}</h3><img src={Image} style='z-index:-1; width: 800px;  position: absolute; top:50%; left: 50%; transform:translate(-50%,-50%); ' /></div>"
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

// { Text = $"<p>Hello, {RecipientName}</p><br /><p> {Comment}</p><br /><img src={Image} width=\"400\" /><br /><br /><p>From {SenderName}</p>" };