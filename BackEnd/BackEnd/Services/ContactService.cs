using BackEnd.Models;

namespace BackEnd.Services
{
    public interface ContactService
    {
        public bool Send(Contact contact);
    }
}
