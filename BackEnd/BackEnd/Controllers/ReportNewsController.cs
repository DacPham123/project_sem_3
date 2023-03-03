using BackEnd.Models;
using BackEnd.Services;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace BackEnd.Controllers
{

    [Route("api/reportnews")]
    [ApiController]
    public class ReportNewsController : ControllerBase
    {
        private ReportNewsService reportNewsService;
        public ReportNewsController(ReportNewsService _reportNewsService)
        {
            reportNewsService = _reportNewsService;
        }
        //----------------------------xuan code-----------------
        [Produces("application/json")]
        [HttpGet("showall")]
        public IActionResult FindAllReportNews()
        {
            try                
            {               
                return Ok(reportNewsService.FindAllReportNews());
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("getreportnews/{reportId}")]
        public IActionResult GetReportNews(int reportId)
        {
            try
            {
                return Ok(reportNewsService.GetReportNews(reportId));
            }
            catch
            {
                return BadRequest();
            }
        }
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("createreports")]
        public IActionResult CreateReportNews([FromBody] Reportnews reportnews)
        {
            try
            {
                return Ok(new
                {
                    Result = reportNewsService.CreateReportNews(reportnews)

                });
            }
            catch
            {

                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPut("updatereports")]
        public IActionResult UpdateReportNews([FromBody] Reportnews reportnews)
        {
            try
            {
                return Ok(new
                {
                    Result = reportNewsService.UpdateReportNews(reportnews)
                });
            }
            catch
            {

                return BadRequest();
            }
        }


        [Produces("application/json")]
        [HttpGet("getreportbyadmin/{username}")]
        public IActionResult GetReportNewsByAdmin(string username)
        {
            try
            {
                return Ok(reportNewsService.GetReportNewsByAdmin(username));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("checkreportexits/{newsid}/{username}/{season}")]
        public IActionResult Checkreportexits(int newsid, string username, int season)
        {
            try
            {
                return Ok(reportNewsService.Checkreportexits(newsid, username, season));
            }
            catch
            {
                return BadRequest();
            }
        }
        [Produces("application/json")]
        [HttpGet("getreportnewsbynewidandpolitics/{newsid}")]
        public IActionResult GetReportNewsbyNewidAndPolitics(int newsid)
        {
            try
            {
                return Ok(reportNewsService.GetReportNewsbyNewidAndPolitics(newsid));
            }
            catch
            {
                return BadRequest();
            }
        }
        [Produces("application/json")]
        [HttpGet("getreportnewsbynewidandcheat/{newsid}")]
        public IActionResult GetReportNewsbynewidandCheat(int newsid)
        {
            try
            {
                return Ok(reportNewsService.GetReportNewsbynewidandCheat(newsid));
            }
            catch
            {
                return BadRequest();
            }
        }
        //----------------------------lan code-----------------
        [Produces("application/json")]
        [HttpGet("getreporttouser/{username}")]
        public IActionResult GetReportNewsToUser(string username)
        {
            try
            {
                return Ok(reportNewsService.GetReportNewsToUser(username));
            }
            catch
            {
                return BadRequest();
            }
        }



        //----------------------------dac code-----------------
        [Produces("application/json")]
        [HttpGet("getreportbysuperadmin")]
        public IActionResult GetReportNewsBySuperAdmin()
        {
            try
            {
                return Ok(reportNewsService.GetReportSuperAdmin());
            }
            catch
            {
                return BadRequest();
            }
        }
        [Produces("application/json")]
        [HttpGet("getreportbyidnewssuperadmin/{id}")]
        public IActionResult GetReportNewsBySuperAdmin(int id)
        {
            try
            {
                return Ok(reportNewsService.GetReportByIdInSuperAdmin(id));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPut("updatereportssuperadmin")]
        public IActionResult UpdateReportNewsSuperAdmin([FromBody] UpdateReportNewsModel updateReportNewsModel)
        {
            try
            {
                return Ok(new
                {
                    Result = reportNewsService.UpdateReportNewsSuperAdmin(updateReportNewsModel)
                });
            }
            catch
            {

                return BadRequest();
            }
        }
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPut("setactivereportssuperadmin")]
        public IActionResult SetActiveReportNewsSuperAdmin([FromBody] UpdateReportNewsModel updateReportNewsModel)
        {
            try
            {
                return Ok(new
                {
                    Result = reportNewsService.SetActiveReportNewsSuperAdmin(updateReportNewsModel)
                });
            }
            catch
            {

                return BadRequest();
            }
        }
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPut("locknews")]
        public IActionResult LockNews([FromBody] Reportnews reportnews)
        {
            try
            {
                return Ok(new
                {
                    Result = reportNewsService.LockNewsSuperAdmin(reportnews)
                });
            }
            catch
            {

                return BadRequest();
            }
        }
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpDelete("deletereportsuperlock/{id}")]
        public IActionResult DeleteReportSuperLock(int id)
        {
            try
            {
                return Ok(new
                {
                    Result = reportNewsService.DeleteReportNewsSuperLock(id)
                });
            }
            catch
            {

                return BadRequest();
            }
        }
        //----------------------------dac code-----------------






    }
}
