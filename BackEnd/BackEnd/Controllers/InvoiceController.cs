using BackEnd.Models;
using BackEnd.Services;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Route("api/invoice")]
    public class InvoiceController : Controller
    {
        private InvoiceService invoiceService;
        public InvoiceController(InvoiceService _invoiceService)
        {
           invoiceService = _invoiceService;
        }
        [Produces("application/json")]
        [HttpGet("findAll")]
        public IActionResult FindAll()
        {
            try
            {
                return Ok(invoiceService.FindAll());
            }
            catch
            {
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("addInvoice")]
        public IActionResult Create([FromBody] Invoice invoice)
        {
            try
            {
                return Ok(new
                {
                    Result = invoiceService.AddInvoice(invoice)

                }); ;
            }
            catch
            {

                return BadRequest();
            }
        }







        //-----------------xuan-----------------

        [Produces("application/json")]
        [HttpGet("findlastinvoicebyusername/{username}")]
        public IActionResult FindLastInvoiceByUserName(string username)
        {
            try
            {
                return Ok(invoiceService.FindLastInvoiceByUserName(username));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("findallinvoicebyusername/{username}")]
        public IActionResult FindAllInvoiceByUserName(string username)
        {
            try
            {
                return Ok(invoiceService.FindAllInvoiceByUserName(username));
            }
            catch
            {
                return BadRequest();
            }
        }
        [Produces("application/json")]
        [HttpGet("findlistinvoicenotexprirybyusername/{username}")]
        public IActionResult FindListInvoiceNotExpiryByUserName(string username)
        {
            try
            {
                return Ok(invoiceService.FindListInvoiceNotExpiryByUserName(username));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("findinvoice/{invoiceid}")]
        public IActionResult FindInvoice(int invoiceid)
        {
            try
            {
                return Ok(invoiceService.FindInvoice(invoiceid));
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
