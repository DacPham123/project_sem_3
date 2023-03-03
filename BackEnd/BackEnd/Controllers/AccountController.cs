using BackEnd.Helpers;
using BackEnd.Models;
using BackEnd.Services;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace BackEnd.Controllers
{
    [Route("api/account")]
    public class AccountController : Controller
    {
        private AccountService accountService;
        private IWebHostEnvironment webHostEnvironment;
        private IHttpContextAccessor httpContextAccessor;

        public AccountController(AccountService _accountService, IWebHostEnvironment _webHostEnvironment,IHttpContextAccessor _httpContextAccessor)
        {
            accountService = _accountService;
            webHostEnvironment = _webHostEnvironment;
            httpContextAccessor = _httpContextAccessor;
        }

        //-----------------------------xuann---------------------------
        [Produces("application/json")]
        [HttpGet("getlistagent/{useradmin}")]
        public IActionResult GetListAgent(string useradmin)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;
                return Ok(accountService.GetListAgent(useradmin, baseURL));
            }
            catch
            {

                return BadRequest();
            }
        }
        [Produces("application/json")]
        [HttpGet("sendemail/{useradmin}")]
        public IActionResult Sendemail(string useradmin)
        {
            try
            {
                
                return Ok(accountService.Sendemail(useradmin));
            }
            catch
            {

                return BadRequest();
            }
        }

        //------------------------------Lan code---------------------------------------

        [Produces("application/json")]
        [HttpGet("getagent")]
        public IActionResult GetAgent()
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;
                return Ok(accountService.GetAgent(baseURL));
            }
            catch
            {

                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPut("updateAccount/{username}")]
        public IActionResult Update([FromRoute] string username, [FromBody] Account account)
        {
            try
            {
                return Ok(new
                {
                    Result = accountService.Update(username, account)
                });
            }
            catch
            {

                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPut("uploadAvatar/{username}")]
        public IActionResult Upload([FromRoute] string username, [FromBody] Account account)
        {
            try
            {
                var form = Request.Form;
                var file1 = form.Files[0];
                var filename = FileHelper.GenerateFileName(file1.FileName);
                var path = Path.Combine(webHostEnvironment.WebRootPath, "images/account", filename);
                using (var fileStream = new FileStream(path, FileMode.Create))
                {
                    file1.CopyTo(fileStream);

                }

                account.Photo = filename;
                return Ok(new
                {
                    Result = accountService.UpdateAvatar(username, account)
                });
            }
            catch
            {

                return BadRequest();
            }
        }


        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPut("updateAvatar/{username}")]
        public IActionResult UpdateAvatar([FromRoute] string username, [FromBody] Account account)
        {
            try
            {
                var selectAvatar = accountService.FindAccByUsername(username);
                var path = Path.Combine(webHostEnvironment.WebRootPath, "images/account", selectAvatar.Photo);
                System.IO.File.Delete(path);

                return Ok(new
                {
                    Result = accountService.UpdateAvatar(username, account)
                });
            }
            catch
            {

                return BadRequest();
            }
        }



        [Produces("application/json")]
        [HttpPost("uploadAvatar")]
        public IActionResult Upload(IFormFile file)
        {
            try
            {
                var filename = FileHelper.GenerateFileName(file.FileName);
                var path = Path.Combine(webHostEnvironment.WebRootPath, "images/account", filename);
                using (var fileStream = new FileStream(path, FileMode.Create))
                {
                    file.CopyTo(fileStream);
                }

                return Ok(new
                {
                    photo = filename,
                });
            }
            catch
            {
                return BadRequest();
            }
        }















        //--------------------------------------------------------
        //----------Dac Code---------------
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("createAccount")]
        public IActionResult Create([FromBody] Account account)
        {
            try
            {
                return Ok(new
                {
                    Result = accountService.Create(account)

                }); ;
            }
            catch
            {

                return BadRequest();
            }
        }





        [Produces("application/json")]
        [HttpGet("findAll")]
        public IActionResult FindAll()
        {
            try
            {
                return Ok(accountService.FindAll());
            }
            catch
            {

                return BadRequest();
            }
        }
        [Produces("application/json")]
        [HttpGet("findByUsername/{username}")]
        public IActionResult FindById(string username)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;
                return Ok(accountService.FindByUsername(username, baseURL));
            }
            catch
            {

                return BadRequest();
            }
        }
        [Produces("application/json")]
        [HttpGet("activeAccount/{username}/{activeCode}")]
        public IActionResult ActiveAccount(string username, string activeCode)
        {
            try
            {
                return Ok(new
                {

                    Status = accountService.ActiveAccount(username, activeCode)

                });
            }
            catch
            {

                return BadRequest();
            }
        }
        [Produces("application/json")]
        [HttpGet("checkDupEmail/{email}")]
        public IActionResult CheckDupEmail(string email)
        {
            try
            {
                return Ok(accountService.CheckDuplicateEmail(email));
            }
            catch
            {

                return BadRequest();
            }
        }
        [Produces("application/json")]
        [HttpGet("checkDupUsername/{username}")]
        public IActionResult CheckDupUsername(string username)
        {
            try
            {
                return Ok(accountService.CheckDuplicateUsername(username));
            }
            catch
            {

                return BadRequest();
            }
        }
        [Produces("application/json")]
        [HttpGet("checkLimitLogin/{username}/{stt}")]
        public IActionResult CheckLimitLogin(string username, byte stt)
        {
            try
            {
                return Ok(accountService.UpdateStatus(username,stt));
            }
            catch
            {

                return BadRequest();
            }
        }
        [Produces("application/json")]
        [HttpGet("sendVerifyCode/{username}")]
        public IActionResult SendVerifyCode(string username)
        {
            try
            {
                return Ok(accountService.SendVerifyCode(username));
            }
            catch
            {

                return BadRequest();
            }
        }
        [Produces("application/json")]
        [HttpGet("sendResetPass/{username}")]
        public IActionResult SendResetPass(string username)
        {
            try
            {
                return Ok(accountService.SendResetPass(username));
            }
            catch
            {

                return BadRequest();
            }
        }
        [Produces("application/json")]
        [HttpGet("getAccountByRole/{role}")]
        public IActionResult GetAccountByRole(byte role)
        {

            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;
                return Ok(accountService.GetAccWithRole(role, baseURL));
            }
            catch
            {

                return BadRequest();
            }
        }
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("changePassword")]
        public IActionResult ChangePassword([FromBody] ChangePass changePass)
        {
            try
            {
                return Ok(new
                {
                    Result = accountService.ChangePass(changePass)
                });
            }
            catch
            {

                return BadRequest();
            }
        }
        [Produces("application/json")]
        [HttpGet("updateStatusBySuperAdmin/{username}/{stt}")]
        public IActionResult UpdateStatusBySuperAdmin(string username, byte stt)
        {
            try
            {
                return Ok(accountService.UpdateStatusBySuperAdmin(username, stt));
            }
            catch
            {

                return BadRequest();
            }
        }


        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("createAccountBySuperAdmin")]
        public IActionResult CreateAccountBySuperAdmin([FromBody] Account account)
        {
           
            try
            {
                return Ok(new
                {
                    Result = accountService.CreateBySuperAdmin(account)

                }); ;
            }
            catch
            {

                return BadRequest();
            }
        }



        [Produces("application/json")]
        [HttpGet("sendemaillocked/{username}")]
        public IActionResult SendEmailLocked(string username)
        {
            try
            {

                return Ok(accountService.SendemailLocked(username));
            }
            catch
            {

                return BadRequest();
            }
        }


        //---------------------------------------
    }
}
