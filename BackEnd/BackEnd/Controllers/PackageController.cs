using BackEnd.Models;
using BackEnd.Services;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Route("api/package")]
    public class PackageController : Controller
    {
        private PackageService packageService;

        public PackageController(PackageService _packageService)
        {
            packageService = _packageService;
        }


        [Produces("application/json")]
        [HttpGet("findAll")]
        public IActionResult ShowAll()
        {
            try
            {
                return Ok(packageService.FindAll());
            }
            catch
            {
                return BadRequest();
            }
        }



        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("addPackage")]
        public IActionResult AddPackage([FromBody] Package package)
        {
            try
            {
                return Ok(new
                {
                    Result = packageService.AddPackage(package)

                });
            }
            catch
            {

                return BadRequest();
            }
        }
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPut("updatePackage")]
        public IActionResult UpdateNews([FromBody] Package package)
        {
            try
            {
                return Ok(packageService.UpdatePackage(package));
            }
            catch
            {

                return BadRequest();
            }
        }
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpDelete("deletePackage/{id}")]
        public IActionResult DeleteNews(int id)
        {
            try
            {
                return Ok(packageService.DeletePackage(id));
            }
            catch
            {

                return BadRequest();
            }
        }
        [Produces("application/json")]
        [HttpGet("getById/{id}")]
        public IActionResult FindById(int id)
        {
            try
            {
                return Ok(

                    packageService.FindById(id)

                );
            }
            catch
            {

                return BadRequest();
            }
        }
        //------------- xuan
        [Produces("application/json")]
        [HttpGet("findpackage/{packageid}")]
        public IActionResult FindPackageAll(int packageid)
        {
            try
            {
                return Ok(packageService.FindPackage(packageid));
            }
            catch
            {

                return BadRequest();
            }
        }
        [Produces("application/json")]
        [HttpGet("findlistpackagebytype/{price}/{date}")]
        public IActionResult FindListPackageByType(decimal price,int date)
        {
            try
            {
                return Ok(packageService.FindListPackageByType(price, date));
            }
            catch
            {

                return BadRequest();
            }
        }
    }
}
