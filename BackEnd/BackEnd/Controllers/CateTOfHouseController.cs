using BackEnd.Models;
using BackEnd.Services;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace BackEnd.Controllers
{
    [Route("api/cateofhouse")]
    [ApiController]
    public class CateTOfHouseController : ControllerBase
    {
        private CateTOFHouseService cateOFHouseService;
        public CateTOfHouseController(CateTOFHouseService _cateOFHouseService)
        {
            cateOFHouseService = _cateOFHouseService;
        }

        [Produces("application/json")]
        [HttpGet("showall")]
        public IActionResult ShowAll()
        {
            try                
            {               
                return Ok(cateOFHouseService.ShowAll());
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("findbyid/{cateTofhouseid}")]
        public IActionResult GetCatHouse(int cateTofhouseid)
        {
            try
            {
                return Ok(cateOFHouseService.Getbyid(cateTofhouseid));
            }
            catch
            {
                return BadRequest();
            }
        }


        //-------------------dac code-------------------
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("addCateOfHouse")]
        public IActionResult AddCateOfHouse([FromBody] CateTofhouse cateTofhouse)
        {
            try
            {
                return Ok(new
                {
                    Result = cateOFHouseService.AddCateOfHouse(cateTofhouse)

                });
            }
            catch
            {

                return BadRequest();
            }
        }
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPut("updateCateOfHouse")]
        public IActionResult UpdateCateOfHouse([FromBody] CateTofhouse cateTofhouse)
        {
            try
            {
                return Ok(new
                {
                    Result = cateOFHouseService.UpdateCateOfHouse(cateTofhouse)

                });
            }
            catch
            {

                return BadRequest();
            }
        }
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpDelete("deleteCateOfHouse/{id}")]
        public IActionResult DeleteCateOfHouse(int id)
        {
            try
            {

                return Ok(cateOFHouseService.DeleteCateOfHouse(id));
            }
            catch
            {

                return BadRequest();
            }
        }
        [Produces("application/json")]
        [HttpGet("showalldes")]
        public IActionResult ShowAllDes()
        {
            try
            {
                return Ok(cateOFHouseService.ShowAllDes());
            }
            catch
            {
                return BadRequest();
            }
        }
        //-------------------dac code-------------------
    }
}
