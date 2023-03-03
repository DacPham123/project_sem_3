using BackEnd.Models;

namespace BackEnd.Services
{
    public interface InvoiceService
    {
        public dynamic FindAll();
        public bool AddInvoice(Invoice invoice);
        public bool UpdateInvoice(Invoice invoice);
        //-------------xuan
        public dynamic FindLastInvoiceByUserName(string username);
        public dynamic FindAllInvoiceByUserName(string username);
        public dynamic FindListInvoiceNotExpiryByUserName(string username);

        public dynamic FindInvoice(int invoiceid);

    }
}
