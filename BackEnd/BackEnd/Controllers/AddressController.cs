using BackEnd.Models;
using BackEnd.Services;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Route("api/address")]
    public class AddressController : Controller
    {
        private WardService wardService;
        private ProvinceService provinceService;
        private CityService cityService;
        public AddressController(WardService _wardService, ProvinceService _provinceService, CityService _cityService)
        {
            wardService = _wardService;
            provinceService = _provinceService;
            cityService = _cityService;


        }
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("createWard")]
        public IActionResult CreateWard([FromBody] Ward ward)
        {
            try
            {
                return Ok(new
                {
                    Result = wardService.CreateWard(ward)

                }); 
            }
            catch
            {

                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("createProvince")]
        public IActionResult Create([FromBody] Province province)
        {
            try
            {
                return Ok(new
                {
                    Result = provinceService.CreateProvince(province)

                }); ;
            }
            catch
            {

                return BadRequest();
            }
        }
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("createCity")]
        public IActionResult Create([FromBody] City city)
        {
            try
            {
                return Ok(new
                {
                    Result = cityService.CreateCity(city)

                }); ;
            }
            catch
            {

                return BadRequest();
            }
        }
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPut("updateCity")]
        public IActionResult Update([FromBody] City city)
        {
            try
            {
                return Ok(new
                {
                    Result = cityService.UpdateCity(city)
                });
            }
            catch
            {

                return BadRequest();
            }
        }
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPut("updateWard")]
        public IActionResult Update([FromBody] Ward ward)
        {
            try
            {
                return Ok(new
                {
                    Result = wardService.UpdateWard(ward)
                });
            }
            catch
            {

                return BadRequest();
            }
        }
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPut("updateProvince")]
        public IActionResult Update([FromBody] Province province)
        {
            try
            {
                return Ok(new
                {
                    Result = provinceService.UpdateProvince(province)
                });
            }
            catch
            {

                return BadRequest();
            }
        }
    }
}
