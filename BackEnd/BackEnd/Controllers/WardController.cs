using BackEnd.Services;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace BackEnd.Controllers
{
    //-----------------------------Lan code--------------------------
    [Route("api/ward")]
    [ApiController]
    public class WardController : ControllerBase
    {
        private WardService wardService;
        public WardController (WardService _wardService)
        {
            wardService = _wardService;
        }

        [Produces("application/json")]
        [HttpGet("showall")]
        public IActionResult ShowAll()
        {
            try                
            {               
                return Ok(wardService.FindAllWard());
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("getwards/{cityId}")]
        public IActionResult GetCities(int cityId)
        {
            try
            {
                return Ok(wardService.GetWardById(cityId));
            }
            catch
            {
                return BadRequest();
            }
        }
        //-----------------------------Lan code--------------------------
        [Produces("application/json")]
        [HttpGet("checkDelete/{wardId}")]
        public IActionResult CheckDelete(int wardId)
        {
            try
            {
                return Ok(wardService.CheckDelete(wardId));
            }
            catch
            {
                return BadRequest();
            }
        }
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpDelete("deleteWard/{wardId}")]
        public IActionResult DeleteCity(int wardId)
        {
            try
            {
                return Ok(wardService.DeleteWard(wardId));
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
