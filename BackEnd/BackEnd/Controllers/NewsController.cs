using BackEnd.Helpers;
using BackEnd.Models;
using BackEnd.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace BackEnd.Controllers
{
    [Route("api/news")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private NewsService newsService;
        private IWebHostEnvironment webHostEnvironment;
        private IHttpContextAccessor httpContextAccessor;
        private NewsImagesService newsImagesService;
        public NewsController (NewsService _newsService, IWebHostEnvironment _webHostEnvironment,
            IHttpContextAccessor _httpContextAccessor, NewsImagesService _newsImagesService)
        {
            newsService = _newsService;
            webHostEnvironment = _webHostEnvironment;
            httpContextAccessor = _httpContextAccessor;
            newsImagesService = _newsImagesService;
        }

        //------------------------------------xuan code o day
        [Produces("application/json")]
        [HttpGet("showall")]
        public IActionResult ShowAll()
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;
                return Ok(newsService.ShowAll(baseURL));
            }
            catch
            {
                return BadRequest();
            }
        }

        
        [Produces("application/json")]
        [HttpGet("showallbyadmin/{useradmin}")]
        public IActionResult ShowAllByAdmin(string useradmin)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;
                return Ok(newsService.ShowAllByAdmin(useradmin, baseURL));
            }
            catch
            {
                return BadRequest();
            }
        }
        [Produces("application/json")]
        [HttpGet("showbycategoryofhouse/{categoryofhouseid}")]
        public IActionResult ShowByCategoryOfHouse(int categoryofhouseid)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;

                return Ok(newsService.ShowByCategoryOfHouse(categoryofhouseid, baseURL));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("showbynewtype/{newtypeid}")]
        public IActionResult ShowByNewsType(int newtypeid)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;

                return Ok(newsService.ShowByNewsType(newtypeid, baseURL));
            }
            catch
            {
                return BadRequest();
            }
        }
        [Produces("application/json")]
        [HttpGet("xsearch1/{categoryofhouseid}/{getnewtype}")]
        public IActionResult XSearch1(int categoryofhouseid, int getnewtype)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;

                return Ok(newsService.XSearch1(categoryofhouseid, baseURL, getnewtype));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("xsearch3/{categoryofhouseid}/{typeNewsID}/{categoryid}")]
        public IActionResult XSearch3(int categoryofhouseid, int typeNewsID, int categoryid)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;

                return Ok(newsService.XSearch3(categoryofhouseid, baseURL, typeNewsID, categoryid));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("xsearch4/{categoryofhouseid}/{typeNewsID}/{provinceId}")]
        public IActionResult XSearch4(int categoryofhouseid, int typeNewsID, int provinceId)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;

                return Ok(newsService.XSearch4(categoryofhouseid, baseURL, typeNewsID, provinceId));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("xsearch5/{categoryofhouseid}/{typeNewsID}/{provinceId}/{citiId}")]
        public IActionResult XSearch5(int categoryofhouseid, int typeNewsID, int provinceId, int citiId)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;

                return Ok(newsService.XSearch5(categoryofhouseid, baseURL, typeNewsID, provinceId, citiId));
            }
            catch
            {
                return BadRequest();
            }
        }


        [Produces("application/json")]
        [HttpGet("xsearch6/{categoryofhouseid}/{typeNewsID}/{provinceId}/{citiId}/{wardId}")]
        public IActionResult XSearch6(int categoryofhouseid, int typeNewsID, int provinceId, int citiId, int wardId)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;

                return Ok(newsService.XSearch6(categoryofhouseid, baseURL, typeNewsID, provinceId, citiId, wardId));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("xsearch7/{categoryofhouseid}/{typeNewsID}/{categoryid}/{provinceId}")]
        public IActionResult XSearch7(int categoryofhouseid, int typeNewsID, int categoryid, int provinceId)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;

                return Ok(newsService.XSearch7(categoryofhouseid, baseURL, typeNewsID, categoryid, provinceId));
            }
            catch
            {
                return BadRequest();
            }
        }


        [Produces("application/json")]
        [HttpGet("xsearch8/{categoryofhouseid}/{typeNewsID}/{categoryid}/{provinceId}/{citiId}")]
        public IActionResult XSearch8(int categoryofhouseid, int typeNewsID, int categoryid, int provinceId, int citiId)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;

                return Ok(newsService.XSearch8(categoryofhouseid, baseURL, typeNewsID, categoryid, provinceId, citiId));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("xsearch9/{categoryofhouseid}/{typeNewsID}/{categoryid}/{provinceId}/{citiId}/{wardId}")]
        public IActionResult XSearch9(int categoryofhouseid, int typeNewsID, int categoryid, int provinceId, int citiId, int wardId)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;

                return Ok(newsService.XSearch9(categoryofhouseid, baseURL, typeNewsID, categoryid, provinceId, citiId, wardId));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("xsearch10/{categoryofhouseid}/{provinceId}/{citiId}")]
        public IActionResult XSearch10(int categoryofhouseid, int provinceId, int citiId)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;

                return Ok(newsService.XSearch10(categoryofhouseid, baseURL, provinceId, citiId));
            }
            catch
            {
                return BadRequest();
            }
        }


        [Produces("application/json")]
        [HttpGet("xsearch11/{categoryofhouseid}/{provinceId}/{citiId}/{wardId}")]
        public IActionResult XSearch11(int categoryofhouseid, int provinceId, int citiId, int wardId)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;

                return Ok(newsService.XSearch11(categoryofhouseid, baseURL, provinceId, citiId, wardId));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("xsearch12/{typeNewsID}/{categoryid}")]
        public IActionResult XSearch12(int typeNewsID, int categoryid)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;

                return Ok(newsService.XSearch12(typeNewsID, baseURL, categoryid));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("xsearch13/{typeNewsID}/{provinceId}")]
        public IActionResult XSearch13(int typeNewsID, int provinceId)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;

                return Ok(newsService.XSearch13(typeNewsID, baseURL, provinceId));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("xsearch14/{typeNewsID}/{provinceId}/{citiId}")]
        public IActionResult XSearch14(int typeNewsID, int provinceId, int citiId)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;

                return Ok(newsService.XSearch14(typeNewsID, baseURL, provinceId, citiId));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("xsearch15/{typeNewsID}/{provinceId}/{citiId}/{wardId}")]
        public IActionResult XSearch15(int typeNewsID, int provinceId, int citiId, int wardId)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;

                return Ok(newsService.XSearch15(typeNewsID, baseURL, provinceId, citiId, wardId));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("xsearch16/{typeNewsID}/{categoryid}/{provinceId}")]
        public IActionResult XSearch16(int typeNewsID, int categoryid, int provinceId)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;

                return Ok(newsService.XSearch16(typeNewsID, baseURL, categoryid, provinceId));
            }
            catch
            {
                return BadRequest();
            }
        }
        [Produces("application/json")]
        [HttpGet("xsearch17/{typeNewsID}/{categoryid}/{provinceId}/{citiId}")]

        public IActionResult XSearch17(int typeNewsID, int categoryid, int provinceId, int citiId)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;

                return Ok(newsService.XSearch17(typeNewsID, baseURL, categoryid, provinceId, citiId));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("xsearch18/{typeNewsID}/{categoryid}/{provinceId}/{citiId}/{wardId}")]
        public IActionResult XSearch18(int typeNewsID, int categoryid, int provinceId, int citiId, int wardId)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;

                return Ok(newsService.XSearch18(typeNewsID, baseURL, categoryid, provinceId, citiId, wardId));
            }
            catch
            {
                return BadRequest();
            }
        }
        [Produces("application/json")]
        [HttpGet("showbycategory/{categoryid}")]
        public IActionResult ShowByCategory(int categoryid)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;

                return Ok(newsService.ShowByCategory(categoryid, baseURL));
            }
            catch
            {
                return BadRequest();
            }
        }


        [Produces("application/json")]
        [HttpGet("xsearch19/{categoryid}/{provinceId}")]
        public IActionResult XSearch19(int categoryid, int provinceId)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;

                return Ok(newsService.XSearch19(categoryid, baseURL, provinceId));
            }
            catch
            {
                return BadRequest();
            }
        }
        [Produces("application/json")]
        [HttpGet("xsearch20/{categoryid}/{provinceId}/{citiId}")]

        public IActionResult XSearch20(int categoryid, int provinceId, int citiId)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;

                return Ok(newsService.XSearch20(categoryid, baseURL, provinceId, citiId));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("xsearch21/{categoryid}/{provinceId}/{citiId}/{wardId}")]
        public IActionResult XSearch21(int categoryid, int provinceId, int citiId, int wardId)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;

                return Ok(newsService.XSearch21(categoryid, baseURL, provinceId, citiId, wardId));
            }
            catch
            {
                return BadRequest();
            }
        }


        [Produces("application/json")]
        [HttpGet("getnewbyidshowdetailspage/{newsid}")]
        public IActionResult GetNewByIdShowDetailsPage(int newsid)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;

                return Ok(newsService.GetNewByIdShowDetailsPage(newsid,baseURL));
            }
            catch
            {
                return BadRequest();
            }
        }




        [Produces("application/json")]
        [HttpGet("getnewsimagesbyid/{newsid}")]
        public IActionResult GetNewsImagesById(int newsid)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;

                return Ok(newsImagesService.GetNewsImagesById(newsid, baseURL));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("getrandomvipnew")]
        public IActionResult GetRandomVipNes()
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;

                return Ok(newsService.GetRandomVipNes( baseURL));
            }
            catch
            {
                return BadRequest();
            }
        }



        [Produces("application/json")]
        [HttpGet("getlistbynewstype/{newstypeid}")]
        public IActionResult GetListByNewsType(int newstypeid)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;

                return Ok(newsService.GetListByNewsType(newstypeid, baseURL));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("getlistbynewstypeandadmin/{newstypeid}/{useradmin}")]
        public IActionResult GetListByNewsTypeAndAdmin(int newstypeid, string useradmin)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;
                return Ok(newsService.GetListByNewsTypeAndAdmin(newstypeid,useradmin, baseURL));
            }
            catch
            {
                return BadRequest();
            }
        }



        [Produces("application/json")]
        [HttpGet("getlistnewsagent/{useragent}")]
        public IActionResult GetListNewsAgent(string useragent)
        {
            try
            {
                return Ok(newsService.GetListNewsAgent(useragent));
            }
            catch
            {
                return BadRequest();
            }
        }


        [Produces("application/json")]
        [HttpGet("getalllistnewsagent/{useragent}")]
        public IActionResult GetAllListNewsAgent(string useragent)
        {
            try
            {
                return Ok(newsService.GetAllListNewsAgent(useragent));
            }
            catch
            {
                return BadRequest();
            }
        }













        //---------------------------------Lan code----------------------


        //---------------------------------Lan code----------------------

        [Produces("application/json")]
        [HttpGet("showvip")]
        public IActionResult ShowVipNews()
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;
                return Ok(newsService.ShowVipNews(baseURL));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("showspecial")]
        public IActionResult ShowSpecialNews()
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;
                return Ok(newsService.ShowSpecialNews(baseURL));
            }
            catch
            {
                return BadRequest();
            }
        }

        //[Authorize]
        [Produces("application/json")]
        [HttpGet("showallbyseller/{seller}")]
        public IActionResult ShowAllBySeller(string seller)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;
                return Ok(newsService.ShowAllBySeller(seller, baseURL));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("lsearch1/{idCatHouse}/{idCat}")]
        public IActionResult LSearch1(int idCatHouse, int idCat)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;
                return Ok(newsService.LSearch1(idCatHouse, idCat, baseURL));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("lsearch2/{idPro}/{idCatHouse}/{idCat}")]
        public IActionResult LSearch2(int idPro, int idCatHouse, int idCat)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;
                return Ok(newsService.LSearch2(idPro, idCatHouse, idCat, baseURL));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("lsearch3/{idPro}/{idCity}/{idCatHouse}/{idCat}")]
        public IActionResult LSearch3(int idPro, int idCity, int idCatHouse, int idCat)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;
                return Ok(newsService.LSearch3(idPro, idCity, idCatHouse, idCat, baseURL));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("lsearch4/{idPro}/{idCity}/{idWard}/{idCatHouse}/{idCat}")]
        public IActionResult LSearch4(int idPro, int idCity, int idWard, int idCatHouse, int idCat)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;
                return Ok(newsService.LSearch4(idPro, idCity, idWard, idCatHouse, idCat, baseURL));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("lsearch5/{idPro}/{idCat}")]
        public IActionResult LSearch5(int idPro, int idCat)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;
                return Ok(newsService.LSearch5(idPro, idCat, baseURL));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("lsearch6/{idPro}/{idCity}/{idCat}")]
        public IActionResult LSearch6(int idPro, int idCity, int idCat)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;
                return Ok(newsService.LSearch6(idPro, idCity, idCat, baseURL));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("lsearch7/{idPro}/{idCity}/{idWard}/{idCat}")]
        public IActionResult LSearch7(int idPro, int idCity, int idWard, int idCat)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;
                return Ok(newsService.LSearch7(idPro, idCity, idWard, idCat, baseURL));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("lsearch8/{idPro}/{idCatHouse}")]
        public IActionResult LSearch8(int idPro, int idCatHouse)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;
                return Ok(newsService.LSearch8(idPro, idCatHouse, baseURL));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("lsearch11/{idPro}")]
        public IActionResult LSearch11(int idPro)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;
                return Ok(newsService.LSearch11(idPro, baseURL));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("lsearch12/{idPro}/{idCity}")]
        public IActionResult LSearch12(int idPro, int idCity)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;
                return Ok(newsService.LSearch12(idPro, idCity, baseURL));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("lsearch13/{idPro}/{idCity}/{idWard}")]
        public IActionResult LSearch13(int idPro, int idCity, int idWard)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;
                return Ok(newsService.LSearch13(idPro, idCity, idWard, baseURL));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("search/{keyword}")]
        public IActionResult Search(string keyword)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;
                return Ok(newsService.Search(keyword, baseURL));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpPost("uploadImg")]
        public IActionResult UploadImg(IFormFile[] files)
        {
            try
            {
                var fileUploadInfos = new List<string>();
                foreach (var file in files)
                {
                    var filename = FileHelper.GenerateFileName(file.FileName);
                    var path = Path.Combine(webHostEnvironment.WebRootPath, "images/new", filename);
                    using (var fileStream = new FileStream(path, FileMode.Create))
                    {
                        file.CopyTo(fileStream);
                    }
                    fileUploadInfos.Add(filename);
                }
                return Ok(fileUploadInfos);
            }
            catch
            {

                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("addImg")]
        public IActionResult AddImages([FromBody] Newsimage newsimg)
        {
            try
            {

                return Ok(new
                {
                    Result = newsImagesService.InsertImage(newsimg)
                });
            }
            catch
            {

                return BadRequest();
            }
        }


        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpDelete("deleteImg/{id}")]
        public IActionResult DeleteImg(int id)
        {
            try
            {
                var selectImg = newsImagesService.GetNewsImg(id);
                var path = Path.Combine(webHostEnvironment.WebRootPath, "images/new", selectImg.Photo);
                System.IO.File.Delete(path);
                return Ok(new
                {
                    Result = newsImagesService.DeleteImage(id)

                });
            }
            catch
            {

                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpDelete("deleteNewsImages/{id}")]
        public IActionResult DeleteNewsImges(int id)
        {
            try
            {
                var allImgs = newsImagesService.GetNewsImagesDel(id);
                foreach (var image in allImgs)
                {
                    var path = Path.Combine(webHostEnvironment.WebRootPath, "images/new", image.Photo);
                    System.IO.File.Delete(path);
                }
                return Ok(new
                {
                    Result = newsImagesService.DeleteImageByNewsId(id)

                });
            }
            catch
            {

                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("getNewsDetail/{newsid}")]
        public IActionResult GetNewsDetail(int newsid)
        {
            try
            {
                return Ok(newsService.GetNewsTableById(newsid));
            }
            catch
            {
                return BadRequest();
            }
        }


        [Produces("application/json")]
        [HttpGet("getNewestNews/{username}")]
        public IActionResult GetNewestNews(string username)
        {
            try
            {
                return Ok(newsService.GetNewestNews(username));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPut("updateNewsStt/{newsid}")]
        public IActionResult UpdateNews([FromRoute] int newsid, [FromBody] News news)
        {
            try
            {
                return Ok(new
                {
                    Result = newsService.UpdateStatusNews(newsid, news)

                });
            }
            catch
            {

                return BadRequest();
            }
        }


        [Produces("application/json")]
        [HttpGet("getlistbynewstypeandseller/{newstypeid}/{seller}")]
        public IActionResult GetListByNewsTypeAndSeller(int newstypeid, string seller)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;
                return Ok(newsService.GetListByNewsTypeAndSeller(newstypeid, seller, baseURL));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("getnewsstatusnull/{username}")]
        public IActionResult GetNewsStatusNull(string username)
        {
            try
            {
                return Ok(newsService.GetNewsStatusNull(username));
            }
            catch
            {
                return BadRequest();
            }
        }



















        //-----------------------------------------------------


        //---------------------Dac Code------------------------
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("addNews")]
        public IActionResult AddNews([FromBody] News news)
        {
            try
            {
                return Ok(new
                {
                    Result = newsService.AddNews(news)
                });
            }
            catch
            {

                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPut("updateNews")]
        public IActionResult UpdateNews([FromBody] News news)
        {
            try
            {
                return Ok(new
                {
                    Result = newsService.UpdateNews(news)

                });
            }
            catch
            {

                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpDelete("deleteNews/{id}")]
        public IActionResult DeleteNews(int id)
        {
            try
            {
                return Ok(new
                {
                    Result = newsService.DeleteNews(id)

                });
            }
            catch
            {

                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("showallbysuperadmin")]
        public IActionResult ShowAllBySuperAdmin()
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;
                return Ok(newsService.ShowAllBySuperAdmin(baseURL));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("setStatusNews/{id}/{stt}")]
        public IActionResult SetStatusNews(int id, byte stt)
        {
            try
            {

                return Ok(newsService.SetStatusNews(id, stt));
            }
            catch
            {
                return BadRequest();
            }
        }







        [Produces("application/json")]
        [HttpGet("getnewbyidshowdetailspagebysuperadmin/{newsid}")]
        public IActionResult GetNewByIdShowDetailsPageBySuperAdmin(int newsid)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;

                return Ok(newsService.GetNewByIdShowDetailsPageBySuperAdmin(newsid, baseURL));
            }
            catch
            {
                return BadRequest();
            }
        }



        [Produces("application/json")]
        [HttpGet("checkcanactivenews/{idnews}")]
        public IActionResult CheckCanActiveNews(int idnews)
        {
            try
            {

                return Ok(newsService.CheckCanActiveNew(idnews));
            }
            catch
            {
                return BadRequest();
            }
        }




















        //---------------------Dac Code------------------------
    }
}
