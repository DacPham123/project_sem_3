using BackEnd.Helper;
using BackEnd.Models;

namespace BackEnd.Services
{
    public class ContactServiceImpl : ContactService
    {
        public bool Send(Contact contact)
        {
            try
            {
                string message = $"<html><body><p>Contact Message</p><p>Name: {contact.Name} </p><p>Email: {contact.Email}</p><p>Phone: {contact.Phone}</p><p>Message: {contact.Message}</p></body></html>";
                SendMailHelper.SendMailVerify("dacvn5672@gmail.com", message,contact.Subject);

                string message2 = $"<html><body><p>Contact Message You Send</p><p>Name: {contact.Name} </p><p>Email: {contact.Email}</p><p>Phone: {contact.Phone}</p><p>Message: {contact.Message}</p></body></html>";
                SendMailHelper.SendMailVerify(contact.Email, message2, contact.Subject);
                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }
    }
}
