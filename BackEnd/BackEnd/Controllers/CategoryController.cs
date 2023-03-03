using BackEnd.Services;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace BackEnd.Controllers
{
    [Route("api/category")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private CategoryService categoryService;
        public CategoryController(CategoryService _categoryService)
        {
            categoryService = _categoryService;
        }

        [Produces("application/json")]
        [HttpGet("showall")]
        public IActionResult ShowAll()
        {
            try                
            {               
                return Ok(categoryService.ShowAll());
            }
            catch
            {
                return BadRequest();
            }
        }


        [Produces("application/json")]
        [HttpGet("getbyid/{Categoryid}")]
        public IActionResult Search(int Categoryid)
        {
            try
            {
                return Ok(categoryService.Getbyid(Categoryid));
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
