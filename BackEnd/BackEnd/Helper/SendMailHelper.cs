using System.Net;
using System.Net.Mail;

namespace BackEnd.Helper
{
    public class SendMailHelper
    {
        public static async Task SendMailVerify(string toMail, string body, string subject)
        {
            var mess = new MailMessage();
            try
            {
                var smtpClient = new SmtpClient("smtp.gmail.com", 587);
                smtpClient.EnableSsl = true;
                smtpClient.Timeout = 100 * 100;
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = new NetworkCredential("dacvn0123@gmail.com", "wbtqlzrhdygcxxzb");
                mess.From = new MailAddress("dacvn0123@gmail.com", "Find House");
                mess.Body = body;
                mess.Subject = subject;
                mess.IsBodyHtml = true;
                mess.Priority = MailPriority.Normal;
                mess.To.Add(toMail);
                smtpClient.Send(mess);
            }
            catch (Exception ex)
            {
                return;
            }
        }
     
    }
}
