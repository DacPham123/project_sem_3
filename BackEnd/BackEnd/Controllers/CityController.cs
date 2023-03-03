using BackEnd.Services;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace BackEnd.Controllers
{
    //----------------------------Lan code-----------------
    [Route("api/city")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private CityService cityService;
        public CityController(CityService _cityService)
        {
            cityService = _cityService;
        }

        [Produces("application/json")]
        [HttpGet("showall")]
        public IActionResult ShowAll()
        {
            try
            {
                return Ok(cityService.FindAllCity());
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("getcities/{provinceId}")]
        public IActionResult GetCities(int provinceId)
        {
            try
            {
                return Ok(cityService.GetCities(provinceId));
            }
            catch
            {
                return BadRequest();
            }
        }
        //--------------------------Lan code----------------
        //--------------------Dac code----------------------
        [Produces("application/json")]
        [HttpGet("checkDelete/{cityid}")]
        public IActionResult CheckDelete(int cityid)
        {
            try
            {
                return Ok(cityService.CheckDelete(cityid));
            }
            catch
            {
                return BadRequest();
            }
        }
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpDelete("deleteCity/{cityid}")]
        public IActionResult DeleteCity(int cityid)
        {
            try
            {
                return Ok(cityService.DeleteCity(cityid));
            }
            catch
            {
                return BadRequest();
            }
        }
    }
    //---------------------------------------------------

}
