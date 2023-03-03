using BackEnd.Services;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace BackEnd.Controllers
{
    //----------------------------Lan code-----------------
    [Route("api/province")]
    [ApiController]
    public class ProvinceController : ControllerBase
    {
        private ProvinceService provinceService;
        public ProvinceController (ProvinceService _provinceService)
        {
            provinceService = _provinceService;
        }

        [Produces("application/json")]
        [HttpGet("showall")]
        public IActionResult ShowAll()
        {
            try                
            {               
                return Ok(provinceService.FindAllProvince());
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("findbyid/{provinceId}")]
        public IActionResult GetProvince(int provinceId)
        {
            try
            {
                return Ok(provinceService.GetProvince(provinceId));
            }
            catch
            {
                return BadRequest();
            }
        }
        //----------------------------Lan code---------------------------
        [Produces("application/json")]
        [HttpGet("checkDelete/{provinceId}")]
        public IActionResult CheckDelete(int provinceId)
        {
            try
            {
                return Ok(provinceService.CheckDelete(provinceId));
            }
            catch
            {
                return BadRequest();
            }
        }


        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpDelete("deleteProvince/{pro}")]
        public IActionResult Delete(int pro)
        {
            try
            {
                return Ok(provinceService.DeleteProvince(pro));
            }
            catch
            {
                return BadRequest();
            }
        }
    }

}
