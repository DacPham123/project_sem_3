using BackEnd.Models;
using System.Diagnostics;

namespace BackEnd.Services
{
    public class InvoiceServiceImpl : InvoiceService
    {
        private DatabaseContext db;
        public InvoiceServiceImpl(DatabaseContext _db)
        {
            db = _db;
        }
        public bool AddInvoice(Invoice invoice)
        {
            try
            {
                db.Invoices.Add(invoice);
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic FindAll()
        {
            return db.Invoices.Join(
                        db.Packages,
                         inv => inv.Packageid,
                         pa => pa.Packageid,
                         (inv, pa) => new
                         {
                             InvoiceId = inv.Invoiceid,
                             Price= inv.Price,
                             Packageid = inv.Packageid,
                             Packagetitle = pa.Packagetitle,
                             Packageprice = pa.Packageprice,
                             Username = inv.Username,
                             PaymentDate = inv.Paymentdate,
                             Expire = inv.Expire,
                             InvoiceStatus = inv.Invoicestatus,
                             Packagedate = pa.Packagedate,
                             NoVvipnews = pa.NoVvipnews,
                             NoVipnews = pa.NoVipnews,
                             NoNormalnews = pa.NoNormalnews,
                             Packagecontent = pa.Packagecontent,
                             Paymentid = inv.Paymentid

                         }).ToList().OrderByDescending(s=>s.InvoiceId);

        }

        public bool UpdateInvoice(Invoice invoice)
        {
            try
            {
                db.Entry(invoice).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        //-------------xuan
        public dynamic FindLastInvoiceByUserName(string username)
        {
          
            return db.Invoices
                 .Join(db.Packages,
                 inv => inv.Packageid,
                 pa => pa.Packageid,
                 (inv, pa) => new { inv, pa })
                 .Where(i => i.inv.Username == username && (i.inv.Invoicestatus == 0 || i.inv.Invoicestatus == 1)).OrderByDescending(i => i.inv.Invoiceid)
                 .Select(i => new
                 {
                     InvoiceId = i.inv.Invoiceid,
                     Packageid = i.inv.Packageid,
                     Packagetitle = i.pa.Packagetitle,
                     Packageprice = i.pa.Packageprice,
                     Username = i.inv.Username,
                     PaymentDate = i.inv.Paymentdate,
                     Expire = i.inv.Expire,
                     InvoiceStatus = i.inv.Invoicestatus,
                     Packagedate = i.pa.Packagedate,
                     NoVvipnews = i.pa.NoVvipnews,
                     NoVipnews = i.pa.NoVipnews,
                     NoNormalnews = i.pa.NoNormalnews,
                     Packagecontent = i.pa.Packagecontent,
                     Price = i.inv.Price
                 }).FirstOrDefault();
            

        }
        public dynamic FindAllInvoiceByUserName(string username)
        {
            return db.Invoices
                 .Join(db.Packages,
                 inv => inv.Packageid,
                 pa => pa.Packageid,
                 (inv, pa) => new { inv, pa })
                 .Where(i => i.inv.Username == username)
                .OrderByDescending(n => n.inv.Invoiceid)
                 .Select(i => new
                 {
                     InvoiceId = i.inv.Invoiceid,
                     Packageid = i.inv.Packageid,
                     Packagetitle = i.pa.Packagetitle,
                     Packageprice = i.pa.Packageprice,
                     Username = i.inv.Username,
                     PaymentDate = i.inv.Paymentdate,
                     Expire = i.inv.Expire,
                     InvoiceStatus = i.inv.Invoicestatus,
                     Packagedate = i.pa.Packagedate,
                     NoVvipnews = i.pa.NoVvipnews,
                     NoVipnews = i.pa.NoVipnews,
                     NoNormalnews = i.pa.NoNormalnews,
                     Packagecontent = i.pa.Packagecontent,
                     Price = i.inv.Price,
                     Paymentid = i.inv.Paymentid
                 }).ToList();

        }

        public dynamic FindListInvoiceNotExpiryByUserName(string username)
        {
            return db.Invoices
                .Join(db.Packages,
                inv => inv.Packageid,
                pa => pa.Packageid,
                (inv, pa) => new { inv, pa })
                .Where(i => i.inv.Username == username && i.inv.Invoicestatus == 0 || i.inv.Invoicestatus == 1).OrderByDescending(i => i.inv.Invoiceid)
                .Select(i => new
                {
                    InvoiceId = i.inv.Invoiceid,
                    Packageid = i.inv.Packageid,
                    Packagetitle = i.pa.Packagetitle,
                    Packageprice = i.pa.Packageprice,
                    Username = i.inv.Username,
                    PaymentDate = i.inv.Paymentdate,
                    Expire = i.inv.Expire,
                    InvoiceStatus = i.inv.Invoicestatus,
                    Packagedate = i.pa.Packagedate,
                    NoVvipnews = i.pa.NoVvipnews,
                    NoVipnews = i.pa.NoVipnews,
                    NoNormalnews = i.pa.NoNormalnews,
                    Packagecontent = i.pa.Packagecontent,
                    Price = i.inv.Price,
                    Paymentid = i.inv.Paymentid
                }).ToList();

        }

        public dynamic FindInvoice(int invoiceid)
        {
            return db.Invoices
                .Join(db.Packages,
                inv => inv.Packageid,
                pa => pa.Packageid,
                (inv, pa) => new { inv, pa })
                .Where(i => i.inv.Invoiceid == invoiceid ).OrderByDescending(i => i.inv.Invoiceid)
                .Select(i => new
                {
                    InvoiceId = i.inv.Invoiceid,
                    Packageid = i.inv.Packageid,
                    Packagetitle = i.pa.Packagetitle,
                    Packageprice = i.pa.Packageprice,
                    Username = i.inv.Username,
                    PaymentDate = i.inv.Paymentdate,
                    Expire = i.inv.Expire,
                    InvoiceStatus = i.inv.Invoicestatus,
                    Packagedate = i.pa.Packagedate,
                    NoVvipnews = i.pa.NoVvipnews,
                    NoVipnews = i.pa.NoVipnews,
                    NoNormalnews = i.pa.NoNormalnews,
                    Packagecontent = i.pa.Packagecontent,
                    Price = i.inv.Price,
                    Paymentid = i.inv.Paymentid

                }).FirstOrDefault();
        }
    }
}
