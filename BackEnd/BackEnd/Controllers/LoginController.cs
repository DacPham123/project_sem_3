using BackEnd.Models;
using BackEnd.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BackEnd.Controllers
{
    [Route("api/login")]
    public class LoginController : Controller
    {
        private IConfiguration configuration;
        private AccountService accountService;
        public LoginController(AccountService _accountService, IConfiguration _configuration)
        {
            accountService = _accountService;
            configuration = _configuration;


        }
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("checkLogin")]
        public IActionResult CheckLogin([FromBody] Login login)
        {

            try
            {
                var user = accountService.Login(login.Username, login.Password);
              
                if (user != null)
                {
                    
                    
                    var roles = user.Role;
                    var claims = new List<Claim> {
                        new Claim(JwtRegisteredClaimNames.Sub,configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat,DateTime.UtcNow.ToString()),
                        new Claim("Status",user.Status.ToString()),
                        new Claim("Username", user.Username.ToString()),

                        new Claim("Role",roles ),
                         new Claim("StatusAdmin",user.StatusAdmin.ToString())
                    };

                    
                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        issuer: configuration["Jwt:Issuer"],
                        audience: configuration["Jwt:Audience"],
                        claims: claims,
                        expires: DateTime.UtcNow.AddHours(5),
                        signingCredentials: signIn
                        );

                    return Ok(
                    
                         new JwtSecurityTokenHandler().WriteToken(token)
                        //Username = user.Username.ToString()
                    );
                }
                else
                {
                    return Ok(
                    
                         "Invaid creadentials"
                        //Username = login.Username.ToString()
                   );
                }
            }
            catch
            {
                throw;
                return BadRequest();
            }
        }
    }
}
