using BackEnd.Services;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace BackEnd.Controllers
{
    [Route("api/newtype")]
    [ApiController]
    public class NewTypesController : ControllerBase
    {
        private NewsTypeService newsTypeService;
        public NewTypesController (NewsTypeService _newsTypeService)
        {
            newsTypeService = _newsTypeService;
        }

        [Produces("application/json")]
        [HttpGet("showall")]
        public IActionResult ShowAll()
        {
            try                
            {               
                return Ok(newsTypeService.ShowAll());
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("getbyid/{newstypeid}")]
        public IActionResult Search(int newstypeid)
        {
            try
            {
                return Ok(newsTypeService.Getbyid(newstypeid));
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
