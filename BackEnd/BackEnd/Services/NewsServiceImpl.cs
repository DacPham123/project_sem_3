using BackEnd.Models;
using System.Diagnostics;

namespace BackEnd.Services
{
    public class NewsServiceImpl : NewsService
    {
        private DatabaseContext db;
        private static Random random = new Random();
        public NewsServiceImpl(DatabaseContext _db)
        {
            db = _db;
        }
        //------------------------xuan
        public dynamic XSearch1(int categoryofhouseid, string path, int typeNewsID)
        {
            return db.News
                 .Join(db.Accounts,
                 ne => ne.Username,
                 ac => ac.Username,
                 (ne, ac) => new { ne, ac })
                 .Where(n => n.ne.CateTofhouseid == categoryofhouseid && n.ne.Newstatus == 1 && n.ne.Newstypeid == typeNewsID).OrderBy(n => n.ne.Newstype.Newstypeid)
                 .Select(n => new
                 {
                     Newsid = n.ne.Newsid,
                     NewTypeName = n.ne.Newstype.Newstype1,
                     Category = n.ne.Category.Categoryname,
                     CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                     Title = n.ne.Title.Length>50? n.ne.Title.Remove(27): n.ne.Title,
                     Acreage = n.ne.Acreage,
                     province = n.ne. Ward.City.Privince.Provincename,
                     city = n.ne. Ward.City.Cityname,
                     ward = n.ne.Ward.Wardname,
                     Price = n.ne.Price,
                     Username = n.ne.Username,
                     Userimg = path + "/images/account/" + n.ac.Photo,
                     Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()

                 })
            .ToList();
        }

        public dynamic ShowAll(string path)
        {
            return db.News.Join(db.Accounts,
                 ne => ne.Username,
                 ac => ac.Username,
                 (ne, ac) => new { ne, ac })
                 .OrderBy(n => n.ne.Newstatus)
                 .ThenByDescending(n => n.ne.Adstimefrom)
                 .Select(n => new
                 {
                     Newsid = n.ne.Newsid,
                     NewTypeName = n.ne.Newstype.Newstype1,
                     Category = n.ne.Category.Categoryname,
                     CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                     Title = n.ne.Title.Length>50? n.ne.Title.Remove(27): n.ne.Title,
                     Acreage = n.ne.Acreage,
                     Province = n.ne. Ward.City.Privince.Provincename,
                     City = n.ne. Ward.City.Cityname,
                     Ward = n.ne.Ward.Wardname,
                     Price = n.ne.Price,
                     Username = n.ne.Username,
                     Userimg = path + "/images/account/" + n.ac.Photo,
                     Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault(),
                     tatus=n.ne.Newstatus

                 })
            .ToList();
        }
        public dynamic ShowAllByAdmin(string useradmin, string path)
        {
            return db.News.Join(db.Accounts,
                 ne => ne.Username,
                 ac => ac.Username,
                 (ne, ac) => new { ne, ac })
                .Where(n => n.ac.Agentuser == useradmin)
                 .OrderBy(n => n.ne.Newstatus)
                 .ThenByDescending(n => n.ne.Adstimefrom)
                 .Select(n => new
                 {
                     Newsid = n.ne.Newsid,
                     Createdate = n.ne.Createdate,
                     Newstypeid = n.ne.Newstypeid,
                     NewTypeName = n.ne.Newstype.Newstype1,
                     Categoryid = n.ne.Categoryid,
                     Categoryname = n.ne.Category.Categoryname,
                     CateTofhouseid = n.ne.CateTofhouseid,
                     CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                     Title = n.ne.Title.Length > 30 ? n.ne.Title.Remove(27) : n.ne.Title,
                     Content = n.ne.Content,
                     Acreage = n.ne.Acreage,
                     Nobedroom = n.ne.Nobedroom,
                     Nolivroom = n.ne.Nolivroom,
                     Nobathroom = n.ne.Nobathroom,
                     Garden = n.ne.Garden,
                     Bancony = n.ne.Bancony,
                     Provinceid = n.ne.Ward.City.Privince.Provinceid,
                     Provincename = n.ne.Ward.City.Privince.Provincename,
                     Cityid = n.ne.Ward.City.Cityid,
                     Cityname = n.ne.Ward.City.Cityname,
                     Wardid = n.ne.Wardid,
                     Wardname = n.ne.Ward.Wardname,
                     Price = n.ne.Price,
                     Username = n.ne.Username,
                     Phone = n.ac.Phone,
                     Email = n.ac.Email,
                     Fullname = n.ac.Fullname,
                     Agentuser = n.ac.Agentuser,
                     Userimg = path + "/images/account/" + n.ac.Photo,
                     Newstatus = n.ne.Newstatus

                 })
            .ToList();
        }
        public dynamic ShowByNewsType(int newstypeid, string path)
        {
            return db.News
                .Join(db.Accounts,
                ne => ne.Username,
                ac => ac.Username,
                (ne, ac) => new { ne, ac })
                .Where(n => n.ne.Newstypeid == newstypeid && n.ne.Newstatus == 1).OrderBy(n => n.ne.Newstype.Newstypeid).ThenByDescending(n => n.ne.Adstimefrom)

                .Select(n => new
                {
                    Newsid = n.ne.Newsid,
                    NewTypeName = n.ne.Newstype.Newstype1,
                    Category = n.ne.Category.Categoryname,
                    CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                    Title = n.ne.Title.Length>50? n.ne.Title.Remove(27): n.ne.Title,
                    Acreage = n.ne.Acreage,
                    Province = n.ne. Ward.City.Privince.Provincename,
                    City = n.ne. Ward.City.Cityname,
                    Ward = n.ne.Ward.Wardname,
                    Price = n.ne.Price,
                    Username = n.ne.Username,
                    Userimg = path + "/images/account/" + n.ac.Photo,
                    Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()

                })
           .ToList();
        }

        public dynamic ShowByCategoryOfHouse(int categoryofhouseid, string path)
        {
            return db.News
                 .Join(db.Accounts,
                 ne => ne.Username,
                 ac => ac.Username,
                 (ne, ac) => new { ne, ac })
                 .Where(n => n.ne.CateTofhouseid == categoryofhouseid && n.ne.Newstatus == 1).OrderBy(n => n.ne.Newstype.Newstypeid).ThenByDescending(n => n.ne.Adstimefrom)

                 .Select(n => new
                 {
                     Newsid = n.ne.Newsid,
                     NewTypeName = n.ne.Newstype.Newstype1,
                     Category = n.ne.Category.Categoryname,
                     CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                     Title = n.ne.Title.Length>50? n.ne.Title.Remove(27): n.ne.Title,
                     Acreage = n.ne.Acreage,
                     Province = n.ne. Ward.City.Privince.Provincename,
                     City = n.ne. Ward.City.Cityname,
                Ward = n.ne.Ward.Wardname,
                     Price = n.ne.Price,
                     Username = n.ne.Username,
                     Userimg = path + "/images/account/" + n.ac.Photo,
                     Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()

                 })
            .ToList();


        }

        public dynamic XSearch3(int categoryofhouseid, string path, int typeNewsID, int categoryid)
        {
            return db.News
                   .Join(db.Accounts,
                   ne => ne.Username,
                   ac => ac.Username,
                   (ne, ac) => new { ne, ac })
                   .Where(n => n.ne.CateTofhouseid == categoryofhouseid && n.ne.Newstatus == 1 &&
                   n.ne.Newstypeid == typeNewsID && n.ne.Categoryid == categoryid)

                   .OrderBy(n => n.ne.Newstype.Newstypeid)
                   .ThenByDescending(n => n.ne.Adstimefrom)
                   .Select(n => new
                   {
                       Newsid = n.ne.Newsid,
                       NewTypeName = n.ne.Newstype.Newstype1,
                       Category = n.ne.Category.Categoryname,
                       CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                       Title = n.ne.Title.Length>50? n.ne.Title.Remove(27): n.ne.Title,
                       Acreage = n.ne.Acreage,
                       Province = n.ne. Ward.City.Privince.Provincename,
                       City = n.ne. Ward.City.Cityname,
                        Ward = n.ne.Ward.Wardname,
                       Price = n.ne.Price,
                       Username = n.ne.Username,
                       Userimg = path + "/images/account/" + n.ac.Photo,
                       Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()

                   })
              .ToList();
        }

        public dynamic XSearch4(int categoryofhouseid, string path, int typeNewsID, int provinceId)
        {
            return db.News
                   .Join(db.Accounts,
                   ne => ne.Username,
                   ac => ac.Username,
                   (ne, ac) => new { ne, ac })
                   .Where(n => n.ne.CateTofhouseid == categoryofhouseid && n.ne.Newstatus == 1 &&
                   n.ne.Newstypeid == typeNewsID && n.ne.Ward.City.Privinceid == provinceId)

                   .OrderBy(n => n.ne.Newstype.Newstypeid)
                   .ThenByDescending(n => n.ne.Adstimefrom)
                   .Select(n => new
                   {
                       Newsid = n.ne.Newsid,
                       NewTypeName = n.ne.Newstype.Newstype1,
                       Category = n.ne.Category.Categoryname,
                       CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                       Title = n.ne.Title.Length>50? n.ne.Title.Remove(27): n.ne.Title,
                       Acreage = n.ne.Acreage,
                       Province = n.ne. Ward.City.Privince.Provincename,
                       City = n.ne. Ward.City.Cityname,
                  Ward = n.ne.Ward.Wardname,
                       Price = n.ne.Price,
                       Username = n.ne.Username,
                       Userimg = path + "/images/account/" + n.ac.Photo,
                       Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()

                   })
              .ToList();
        }

        public dynamic XSearch5(int categoryofhouseid, string path, int typeNewsID, int provinceId, int citiId)
        {
            return db.News
                   .Join(db.Accounts,
                   ne => ne.Username,
                   ac => ac.Username,
                   (ne, ac) => new { ne, ac })
                   .Where(n => n.ne.CateTofhouseid == categoryofhouseid && n.ne.Newstatus == 1 &&
                   n.ne.Newstypeid == typeNewsID && n.ne.Ward.City.Privinceid == provinceId && n.ne.Ward.Cityid == citiId)

                   .OrderBy(n => n.ne.Newstype.Newstypeid)
                   .ThenByDescending(n => n.ne.Adstimefrom)
                   .Select(n => new
                   {
                       Newsid = n.ne.Newsid,
                       NewTypeName = n.ne.Newstype.Newstype1,
                       Category = n.ne.Category.Categoryname,
                       CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                       Title = n.ne.Title.Length>50? n.ne.Title.Remove(27): n.ne.Title,
                       Acreage = n.ne.Acreage,
                       Province = n.ne. Ward.City.Privince.Provincename,
                       City = n.ne. Ward.City.Cityname,
                  Ward = n.ne.Ward.Wardname,
                       Price = n.ne.Price,
                       Username = n.ne.Username,
                       Userimg = path + "/images/account/" + n.ac.Photo,
                       Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()

                   })
              .ToList();
        }

        public dynamic XSearch6(int categoryofhouseid, string path, int typeNewsID, int provinceId, int citiId, int wardId)
        {
            return db.News
                   .Join(db.Accounts,
                   ne => ne.Username,
                   ac => ac.Username,
                   (ne, ac) => new { ne, ac })
                   .Where(n => n.ne.CateTofhouseid == categoryofhouseid && n.ne.Newstatus == 1 && n.ne.Newstypeid == typeNewsID && n.ne.Ward.City.Privinceid == provinceId && n.ne.Ward.Cityid == citiId && n.ne.Wardid == wardId)
                   .OrderBy(n => n.ne.Newstype.Newstypeid)
                   .ThenByDescending(n => n.ne.Adstimefrom)
                   .Select(n => new
                   {
                       Newsid = n.ne.Newsid,
                       NewTypeName = n.ne.Newstype.Newstype1,
                       Category = n.ne.Category.Categoryname,
                       CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                       Title = n.ne.Title.Length>50? n.ne.Title.Remove(27): n.ne.Title,
                       Acreage = n.ne.Acreage,
                       Province = n.ne. Ward.City.Privince.Provincename,
                       City = n.ne. Ward.City.Cityname,
                  Ward = n.ne.Ward.Wardname,
                       Price = n.ne.Price,
                       Username = n.ne.Username,
                       Userimg = path + "/images/account/" + n.ac.Photo,
                       Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()

                   })
              .ToList();
        }

        public dynamic XSearch7(int categoryofhouseid, string path, int typeNewsID, int categoryid, int provinceId)
        {
            return db.News
                 .Join(db.Accounts,
                 ne => ne.Username,
                 ac => ac.Username,
                 (ne, ac) => new { ne, ac })
                 .Where(n => n.ne.CateTofhouseid == categoryofhouseid && n.ne.Newstatus == 1 && n.ne.Newstypeid == typeNewsID && n.ne.Categoryid == categoryid && n.ne.Ward.City.Privinceid == provinceId)
                 .OrderBy(n => n.ne.Newstype.Newstypeid)
                 .ThenByDescending(n => n.ne.Adstimefrom)
                 .Select(n => new
                 {
                     Newsid = n.ne.Newsid,
                     NewTypeName = n.ne.Newstype.Newstype1,
                     Category = n.ne.Category.Categoryname,
                     CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                     Title = n.ne.Title.Length>50? n.ne.Title.Remove(27): n.ne.Title,
                     Acreage = n.ne.Acreage,
                     Province = n.ne. Ward.City.Privince.Provincename,
                     City = n.ne. Ward.City.Cityname,
                Ward = n.ne.Ward.Wardname,
                     Price = n.ne.Price,
                     Username = n.ne.Username,
                     Userimg = path + "/images/account/" + n.ac.Photo,
                     Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()

                 })
            .ToList();
        }

        public dynamic XSearch8(int categoryofhouseid, string path, int typeNewsID, int categoryid, int provinceId, int citiId)
        {
            return db.News
                 .Join(db.Accounts,
                 ne => ne.Username,
                 ac => ac.Username,
                 (ne, ac) => new { ne, ac })
                 .Where(n => n.ne.CateTofhouseid == categoryofhouseid && n.ne.Newstatus == 1 && n.ne.Newstypeid == typeNewsID && n.ne.Categoryid == categoryid && n.ne.Ward.City.Privinceid == provinceId && n.ne.Ward.Cityid == citiId)
                 .OrderBy(n => n.ne.Newstype.Newstypeid)
                 .ThenByDescending(n => n.ne.Adstimefrom)
                 .Select(n => new
                 {
                     Newsid = n.ne.Newsid,
                     NewTypeName = n.ne.Newstype.Newstype1,
                     Category = n.ne.Category.Categoryname,
                     CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                     Title = n.ne.Title.Length>50? n.ne.Title.Remove(27): n.ne.Title,
                     Acreage = n.ne.Acreage,
                     Province = n.ne. Ward.City.Privince.Provincename,
                     City = n.ne. Ward.City.Cityname,
                Ward = n.ne.Ward.Wardname,
                     Price = n.ne.Price,
                     Username = n.ne.Username,
                     Userimg = path + "/images/account/" + n.ac.Photo,
                     Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()

                 })
            .ToList();
        }

        public dynamic XSearch9(int categoryofhouseid, string path, int typeNewsID, int categoryid, int provinceId, int citiId, int wardId)
        {
            return db.News
                  .Join(db.Accounts,
                  ne => ne.Username,
                  ac => ac.Username,
                  (ne, ac) => new { ne, ac })
                  .Where(n => n.ne.CateTofhouseid == categoryofhouseid && n.ne.Newstatus == 1 && n.ne.Newstypeid == typeNewsID && n.ne.Categoryid == categoryid && n.ne.Ward.City.Privinceid == provinceId && n.ne.Ward.Cityid == citiId && n.ne.Wardid == wardId)
                  .OrderBy(n => n.ne.Newstype.Newstypeid)
                  .ThenByDescending(n => n.ne.Adstimefrom)
                  .Select(n => new
                  {
                      Newsid = n.ne.Newsid,
                      NewTypeName = n.ne.Newstype.Newstype1,
                      Category = n.ne.Category.Categoryname,
                      CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                      Title = n.ne.Title.Length>50? n.ne.Title.Remove(27): n.ne.Title,
                      Acreage = n.ne.Acreage,
                      Province = n.ne. Ward.City.Privince.Provincename,
                      City = n.ne. Ward.City.Cityname,
                 Ward = n.ne.Ward.Wardname,
                      Price = n.ne.Price,
                      Username = n.ne.Username,
                      Userimg = path + "/images/account/" + n.ac.Photo,
                      Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()

                  })
             .ToList();
        }

        public dynamic XSearch10(int categoryofhouseid, string path, int provinceId, int citiId)
        {
            return db.News
                 .Join(db.Accounts,
                 ne => ne.Username,
                 ac => ac.Username,
                 (ne, ac) => new { ne, ac })
                 .Where(n => n.ne.CateTofhouseid == categoryofhouseid && n.ne.Newstatus == 1 && n.ne.Ward.City.Privinceid == provinceId && n.ne.Ward.Cityid == citiId)
                 .OrderBy(n => n.ne.Newstype.Newstypeid)
                 .ThenByDescending(n => n.ne.Adstimefrom)
                 .Select(n => new
                 {
                     Newsid = n.ne.Newsid,
                     NewTypeName = n.ne.Newstype.Newstype1,
                     Category = n.ne.Category.Categoryname,
                     CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                     Title = n.ne.Title.Length>50? n.ne.Title.Remove(27): n.ne.Title,
                     Acreage = n.ne.Acreage,
                     Province = n.ne. Ward.City.Privince.Provincename,
                     City = n.ne. Ward.City.Cityname,
                Ward = n.ne.Ward.Wardname,
                     Price = n.ne.Price,
                     Username = n.ne.Username,
                     Userimg = path + "/images/account/" + n.ac.Photo,
                     Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()

                 })
            .ToList();
        }

        public dynamic XSearch11(int categoryofhouseid, string path, int provinceId, int citiId, int wardId)
        {
            return db.News
                 .Join(db.Accounts,
                 ne => ne.Username,
                 ac => ac.Username,
                 (ne, ac) => new { ne, ac })
                 .Where(n => n.ne.CateTofhouseid == categoryofhouseid && n.ne.Newstatus == 1 && n.ne.Ward.City.Privinceid == provinceId && n.ne.Ward.Cityid == citiId && n.ne.Wardid == wardId)
                 .OrderBy(n => n.ne.Newstype.Newstypeid)
                 .ThenByDescending(n => n.ne.Adstimefrom)
                 .Select(n => new
                 {
                     Newsid = n.ne.Newsid,
                     NewTypeName = n.ne.Newstype.Newstype1,
                     Category = n.ne.Category.Categoryname,
                     CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                     Title = n.ne.Title.Length>50? n.ne.Title.Remove(27): n.ne.Title,
                     Acreage = n.ne.Acreage,
                     Province = n.ne. Ward.City.Privince.Provincename,
                     City = n.ne. Ward.City.Cityname,
                Ward = n.ne.Ward.Wardname,
                     Price = n.ne.Price,
                     Username = n.ne.Username,
                     Userimg = path + "/images/account/" + n.ac.Photo,
                     Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()

                 })
            .ToList();
        }

        public dynamic XSearch12(int typeNewsID, string path, int categoryid)
        {
            return db.News
                  .Join(db.Accounts,
                  ne => ne.Username,
                  ac => ac.Username,
                  (ne, ac) => new { ne, ac })
                  .Where(n => n.ne.Categoryid == categoryid && n.ne.Newstatus == 1 &&
                  n.ne.Newstypeid == typeNewsID && n.ne.Categoryid == categoryid)

                  .OrderBy(n => n.ne.Newstype.Newstypeid)
                  .ThenByDescending(n => n.ne.Adstimefrom)
                  .Select(n => new
                  {
                      Newsid = n.ne.Newsid,
                      NewTypeName = n.ne.Newstype.Newstype1,
                      Category = n.ne.Category.Categoryname,
                      CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                      Title = n.ne.Title.Length>50? n.ne.Title.Remove(27): n.ne.Title,
                      Acreage = n.ne.Acreage,
                      Province = n.ne. Ward.City.Privince.Provincename,
                      City = n.ne. Ward.City.Cityname,
                 Ward = n.ne.Ward.Wardname,
                      Price = n.ne.Price,
                      Username = n.ne.Username,
                      Userimg = path + "/images/account/" + n.ac.Photo,
                      Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()

                  })
             .ToList();
        }
        public dynamic XSearch13(int typeNewsID, string path, int provinceId)
        {
            return db.News
                              .Join(db.Accounts,
                              ne => ne.Username,
                              ac => ac.Username,
                              (ne, ac) => new { ne, ac })
                              .Where(n => n.ne.Ward.City.Privinceid == provinceId && n.ne.Newstatus == 1 &&
                              n.ne.Newstypeid == typeNewsID)

                              .OrderBy(n => n.ne.Newstype.Newstypeid)
                              .ThenByDescending(n => n.ne.Adstimefrom)
                              .Select(n => new
                              {
                                  Newsid = n.ne.Newsid,
                                  NewTypeName = n.ne.Newstype.Newstype1,
                                  Category = n.ne.Category.Categoryname,
                                  CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                                  Title = n.ne.Title.Length>50? n.ne.Title.Remove(27): n.ne.Title,
                                  Acreage = n.ne.Acreage,
                                  Province = n.ne. Ward.City.Privince.Provincename,
                                  City = n.ne. Ward.City.Cityname,
                             Ward = n.ne.Ward.Wardname,
                                  Price = n.ne.Price,
                                  Username = n.ne.Username,
                                  Userimg = path + "/images/account/" + n.ac.Photo,
                                  Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()

                              })
                         .ToList();
        }
        public dynamic XSearch14(int typeNewsID, string path, int provinceId, int citiId)
        {
            return db.News
                  .Join(db.Accounts,
                  ne => ne.Username,
                  ac => ac.Username,
                  (ne, ac) => new { ne, ac })
                  .Where(n => n.ne.Ward.City.Privinceid == provinceId && n.ne.Newstatus == 1 &&
                  n.ne.Newstypeid == typeNewsID && n.ne.Ward.Cityid == citiId)

                  .OrderBy(n => n.ne.Newstype.Newstypeid)
                  .ThenByDescending(n => n.ne.Adstimefrom)
                  .Select(n => new
                  {
                      Newsid = n.ne.Newsid,
                      NewTypeName = n.ne.Newstype.Newstype1,
                      Category = n.ne.Category.Categoryname,
                      CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                      Title = n.ne.Title.Length>50? n.ne.Title.Remove(27): n.ne.Title,
                      Acreage = n.ne.Acreage,
                      Province = n.ne. Ward.City.Privince.Provincename,
                      City = n.ne. Ward.City.Cityname,
                 Ward = n.ne.Ward.Wardname,
                      Price = n.ne.Price,
                      Username = n.ne.Username,
                      Userimg = path + "/images/account/" + n.ac.Photo,
                      Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()

                  })
             .ToList();
        }
        public dynamic XSearch15(int typeNewsID, string path, int provinceId, int citiId, int wardId)
        {
            return db.News
                  .Join(db.Accounts,
                  ne => ne.Username,
                  ac => ac.Username,
                  (ne, ac) => new { ne, ac })
                  .Where(n => n.ne.Ward.City.Privinceid == provinceId && n.ne.Newstatus == 1 &&
                  n.ne.Newstypeid == typeNewsID && n.ne.Ward.Cityid == citiId && n.ne.Wardid == wardId)

                  .OrderBy(n => n.ne.Newstype.Newstypeid)
                  .ThenByDescending(n => n.ne.Adstimefrom)
                  .Select(n => new
                  {
                      Newsid = n.ne.Newsid,
                      NewTypeName = n.ne.Newstype.Newstype1,
                      Category = n.ne.Category.Categoryname,
                      CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                      Title = n.ne.Title.Length>50? n.ne.Title.Remove(27): n.ne.Title,
                      Acreage = n.ne.Acreage,
                      Province = n.ne. Ward.City.Privince.Provincename,
                      City = n.ne. Ward.City.Cityname,
                 Ward = n.ne.Ward.Wardname,
                      Price = n.ne.Price,
                      Username = n.ne.Username,
                      Userimg = path + "/images/account/" + n.ac.Photo,
                      Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()

                  })
             .ToList();
        }
        public dynamic XSearch16(int typeNewsID, string path, int categoryid, int provinceId)
        {
            return db.News
                  .Join(db.Accounts,
                  ne => ne.Username,
                  ac => ac.Username,
                  (ne, ac) => new { ne, ac })
                  .Where(n => n.ne.Categoryid == categoryid && n.ne.Newstatus == 1 &&
                  n.ne.Newstypeid == typeNewsID && n.ne.Ward.City.Privinceid == provinceId)

                  .OrderBy(n => n.ne.Newstype.Newstypeid)
                  .ThenByDescending(n => n.ne.Adstimefrom)
                  .Select(n => new
                  {
                      Newsid = n.ne.Newsid,
                      NewTypeName = n.ne.Newstype.Newstype1,
                      Category = n.ne.Category.Categoryname,
                      CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                      Title = n.ne.Title.Length>50? n.ne.Title.Remove(27): n.ne.Title,
                      Acreage = n.ne.Acreage,
                      Province = n.ne. Ward.City.Privince.Provincename,
                      City = n.ne. Ward.City.Cityname,
                 Ward = n.ne.Ward.Wardname,
                      Price = n.ne.Price,
                      Username = n.ne.Username,
                      Userimg = path + "/images/account/" + n.ac.Photo,
                      Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()

                  })
             .ToList();
        }
        public dynamic XSearch17(int typeNewsID, string path, int categoryid, int provinceId, int citiId)
        {
            return db.News
                  .Join(db.Accounts,
                  ne => ne.Username,
                  ac => ac.Username,
                  (ne, ac) => new { ne, ac })
                  .Where(n => n.ne.Categoryid == categoryid && n.ne.Newstatus == 1 &&
                  n.ne.Newstypeid == typeNewsID && n.ne.Ward.City.Privinceid == provinceId && n.ne.Ward.Cityid == citiId)

                  .OrderBy(n => n.ne.Newstype.Newstypeid)
                  .ThenByDescending(n => n.ne.Adstimefrom)
                  .Select(n => new
                  {
                      Newsid = n.ne.Newsid,
                      NewTypeName = n.ne.Newstype.Newstype1,
                      Category = n.ne.Category.Categoryname,
                      CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                      Title = n.ne.Title.Length>50? n.ne.Title.Remove(27): n.ne.Title,
                      Acreage = n.ne.Acreage,
                      Province = n.ne. Ward.City.Privince.Provincename,
                      City = n.ne. Ward.City.Cityname,
                 Ward = n.ne.Ward.Wardname,
                      Price = n.ne.Price,
                      Username = n.ne.Username,
                      Userimg = path + "/images/account/" + n.ac.Photo,
                      Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()

                  })
             .ToList();
        }
        public dynamic XSearch18(int typeNewsID, string path, int categoryid, int provinceId, int citiId, int wardId)
        {
            return db.News
                  .Join(db.Accounts,
                  ne => ne.Username,
                  ac => ac.Username,
                  (ne, ac) => new { ne, ac })
                  .Where(n => n.ne.Categoryid == categoryid && n.ne.Newstatus == 1 &&
                  n.ne.Newstypeid == typeNewsID && n.ne.Ward.City.Privinceid == provinceId && n.ne.Ward.Cityid == citiId && n.ne.Wardid == wardId)

                  .OrderBy(n => n.ne.Newstype.Newstypeid)
                  .ThenByDescending(n => n.ne.Adstimefrom)
                  .Select(n => new
                  {
                      Newsid = n.ne.Newsid,
                      NewTypeName = n.ne.Newstype.Newstype1,
                      Category = n.ne.Category.Categoryname,
                      CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                      Title = n.ne.Title.Length>50? n.ne.Title.Remove(27): n.ne.Title,
                      Acreage = n.ne.Acreage,
                      Province = n.ne. Ward.City.Privince.Provincename,
                      City = n.ne. Ward.City.Cityname,
                 Ward = n.ne.Ward.Wardname,
                      Price = n.ne.Price,
                      Username = n.ne.Username,
                      Userimg = path + "/images/account/" + n.ac.Photo,
                      Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()

                  })
             .ToList();
        }

        public dynamic GetNewByIdShowDetailsPage(int newid, string path)
        {
            return db.News
                  .Join(db.Accounts,
                  ne => ne.Username,
                  ac => ac.Username,
                  (ne, ac) => new { ne, ac })                
                  .Where(n => n.ne.Newsid== newid )
                  .Select(n => new
                  {
                      Newsid = n.ne.Newsid,
                      Createdate = n.ne.Createdate,
                      Newstypeid = n.ne.Newstypeid,
                      NewTypeName = n.ne.Newstype.Newstype1,
                      Categoryid=n.ne.Categoryid,
                      Categoryname = n.ne.Category.Categoryname,
                      CateTofhouseid = n.ne.CateTofhouseid,
                      CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                      Title = n.ne.Title,
                      Content=n.ne.Content,
                      Acreage = n.ne.Acreage,
                      Nobedroom=n.ne.Nobedroom,
                      Nolivroom=n.ne.Nolivroom,
                      Nobathroom=n.ne.Nobathroom,
                      Garden=n.ne.Garden,
                      Bancony=n.ne.Bancony,
                      Provinceid = n.ne.Ward.City.Privince.Provinceid,
                      Provincename = n.ne.Ward.City.Privince.Provincename,
                      Cityid = n.ne. Ward.City.Cityid,
                      Cityname = n.ne. Ward.City.Cityname,
                      Wardid = n.ne.Wardid,
                      Wardname = n.ne.Ward.Wardname,
                      Price = n.ne.Price,
                      Username = n.ne.Username,
                      Phone = n.ac.Phone,
                      Email = n.ac.Email,
                      Fullname = n.ac.Fullname,
                      Agentuser = n.ac.Agentuser,
                      Userimg = path + "/images/account/" + n.ac.Photo,
                      Adstimefrom=n.ne.Adstimefrom,
                      Adstimeto=n.ne.Adstimeto,
                      Newstatus=n.ne.Newstatus

                  })
             .FirstOrDefault();
        }
        public dynamic GetRandomVipNes(string path)
        {
            var list= db.News
                  .Join(db.Accounts,
                  ne => ne.Username,
                  ac => ac.Username,
                  (ne, ac) => new { ne, ac })
                  .Where(n =>  n.ne.Newstatus == 1 &&
                  n.ne.Newstypeid == 1)
                  .OrderBy(n => n.ne.Newstype.Newstypeid)
                  .ThenByDescending(n => n.ne.Adstimefrom)
                  .Select(n => new
                  {
                      Newsid = n.ne.Newsid,
                      NewTypeName = n.ne.Newstype.Newstype1,
                      Category = n.ne.Category.Categoryname,
                      CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                      Title = n.ne.Title,
                      Acreage = n.ne.Acreage,
                      Province = n.ne. Ward.City.Privince.Provincename,
                      City = n.ne. Ward.City.Cityname,
                 Ward = n.ne.Ward.Wardname,
                      Price = n.ne.Price,
                      Username = n.ne.Username,
                      Userimg = path + "/images/account/" + n.ac.Photo,
                      Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()

                  })
             .ToList();
            var cout = list.Count();
            var index = random.Next(cout);
            return  list.Skip(index).FirstOrDefault();

        }

        public dynamic GetListByNewsType(int newstypeid,string path)
        {
            return db.News
                  .Join(db.Accounts,
                  ne => ne.Username,
                  ac => ac.Username,
                  (ne, ac) => new { ne, ac })
                  .Where(n => n.ne.Newstatus == 1 &&
                  n.ne.Newstypeid == newstypeid)
                  .OrderBy(n => n.ne.Newstype.Newstypeid)
                  .ThenByDescending(n => n.ne.Adstimefrom)
                  .Select(n => new
                  {
                      Newsid = n.ne.Newsid,
                      NewTypeName = n.ne.Newstype.Newstype1,
                      Category = n.ne.Category.Categoryname,
                      CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                      Title = n.ne.Title.Length>50? n.ne.Title.Remove(27): n.ne.Title,
                      Acreage = n.ne.Acreage,
                      Province = n.ne. Ward.City.Privince.Provincename,
                      City = n.ne. Ward.City.Cityname,
                 Ward = n.ne.Ward.Wardname,
                     
                      Price = n.ne.Price,
                      Username = n.ne.Username,
                      Userimg = path + "/images/account/" + n.ac.Photo,
                      Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()

                  }).ToList();



        }


        public dynamic ShowByCategory(int categoryid, string path)
        {
            return db.News
                .Join(db.Accounts,
                ne => ne.Username,
                ac => ac.Username,
                (ne, ac) => new { ne, ac })
                .Where(n => n.ne.Categoryid == categoryid && n.ne.Newstatus == 1).OrderBy(n => n.ne.Newstype.Newstypeid).ThenByDescending(n => n.ne.Adstimefrom)

                .Select(n => new
                {
                    Newsid = n.ne.Newsid,
                    NewTypeName = n.ne.Newstype.Newstype1,
                    Category = n.ne.Category.Categoryname,
                    CateTofhouse = n.ne.CateTofhouse.CateTofhousename,

                    Title = n.ne.Title.Length > 50 ? n.ne.Title.Remove(27) : n.ne.Title,
                    Acreage = n.ne.Acreage,
                    Province = n.ne.Ward.City.Privince.Provincename,
                    City = n.ne.Ward.City.Cityname,
                    Ward = n.ne.Ward.Wardname,
                    Price = n.ne.Price,
                    Username = n.ne.Username,
                    Userimg = path + "/images/account/" + n.ac.Photo,
                    Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()

                })
           .ToList();
        }

        public dynamic XSearch19(int categoryid, string path, int provinceId)
        {
            return db.News
                  .Join(db.Accounts,
                  ne => ne.Username,
                  ac => ac.Username,
                  (ne, ac) => new { ne, ac })
                  .Where(n => n.ne.Ward.City.Privinceid == provinceId && n.ne.Newstatus == 1 &&
                  n.ne.Categoryid == categoryid)

                  .OrderBy(n => n.ne.Newstype.Newstypeid)
                  .ThenByDescending(n => n.ne.Adstimefrom)
                  .Select(n => new
                  {
                      Newsid = n.ne.Newsid,
                      NewTypeName = n.ne.Newstype.Newstype1,
                      Category = n.ne.Category.Categoryname,
                      CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                      Title = n.ne.Title.Length > 50 ? n.ne.Title.Remove(27) : n.ne.Title,
                      Acreage = n.ne.Acreage,
                      Province = n.ne.Ward.City.Privince.Provincename,
                      City = n.ne.Ward.City.Cityname,
                      Ward = n.ne.Ward.Wardname,
                      Price = n.ne.Price,
                      Username = n.ne.Username,
                      Userimg = path + "/images/account/" + n.ac.Photo,
                      Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()

                  })
             .ToList();
        }
        public dynamic XSearch20(int categoryid, string path, int provinceId, int citiId)
        {
            return db.News
                  .Join(db.Accounts,
                  ne => ne.Username,
                  ac => ac.Username,
                  (ne, ac) => new { ne, ac })
                  .Where(n => n.ne.Ward.City.Privinceid == provinceId && n.ne.Newstatus == 1 &&
                  n.ne.Categoryid == categoryid && n.ne.Ward.Cityid == citiId)

                  .OrderBy(n => n.ne.Newstype.Newstypeid)
                  .ThenByDescending(n => n.ne.Adstimefrom)
                  .Select(n => new
                  {
                      Newsid = n.ne.Newsid,
                      NewTypeName = n.ne.Newstype.Newstype1,
                      Category = n.ne.Category.Categoryname,
                      CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                      Title = n.ne.Title.Length > 50 ? n.ne.Title.Remove(27) : n.ne.Title,
                      Acreage = n.ne.Acreage,
                      Province = n.ne.Ward.City.Privince.Provincename,
                      City = n.ne.Ward.City.Cityname,
                      Ward = n.ne.Ward.Wardname,
                      Price = n.ne.Price,
                      Username = n.ne.Username,
                      Userimg = path + "/images/account/" + n.ac.Photo,
                      Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()

                  })
             .ToList();
        }
        public dynamic XSearch21(int categoryid, string path, int provinceId, int citiId, int wardId)
        {
            return db.News
                  .Join(db.Accounts,
                  ne => ne.Username,
                  ac => ac.Username,
                  (ne, ac) => new { ne, ac })
                  .Where(n => n.ne.Ward.City.Privinceid == provinceId && n.ne.Newstatus == 1 &&
                  n.ne.Categoryid == categoryid && n.ne.Ward.Cityid == citiId && n.ne.Wardid == wardId)

                  .OrderBy(n => n.ne.Newstype.Newstypeid)
                  .ThenByDescending(n => n.ne.Adstimefrom)
                  .Select(n => new
                  {
                      Newsid = n.ne.Newsid,
                      NewTypeName = n.ne.Newstype.Newstype1,
                      Category = n.ne.Category.Categoryname,
                      CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                      Title = n.ne.Title.Length > 50 ? n.ne.Title.Remove(27) : n.ne.Title,
                      Acreage = n.ne.Acreage,
                      Province = n.ne.Ward.City.Privince.Provincename,
                      City = n.ne.Ward.City.Cityname,
                      Ward = n.ne.Ward.Wardname,
                      Price = n.ne.Price,
                      Username = n.ne.Username,
                      Userimg = path + "/images/account/" + n.ac.Photo,
                      Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()

                  })
             .ToList();
        }


        public dynamic GetListByNewsTypeAndAdmin(int newstypeid, string useradmin, string path)
        {
            return db.News
                  .Join(db.Accounts,
                  ne => ne.Username,
                  ac => ac.Username,
                  (ne, ac) => new { ne, ac })
                  .Where(n => n.ne.Newstypeid == newstypeid && n.ac.Agentuser== useradmin && n.ne.Newstatus==1)
                  .Select(n => new
                  {
                      Newsid = n.ne.Newsid,
                      Createdate = n.ne.Createdate,
                      Newstypeid = n.ne.Newstypeid,
                      NewTypeName = n.ne.Newstype.Newstype1,
                      Categoryid = n.ne.Categoryid,
                      Categoryname = n.ne.Category.Categoryname,
                      CateTofhouseid = n.ne.CateTofhouseid,
                      CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                      Title = n.ne.Title.Length > 50 ? n.ne.Title.Remove(27) : n.ne.Title,
                      Content = n.ne.Content,
                      Acreage = n.ne.Acreage,
                      Nobedroom = n.ne.Nobedroom,
                      Nolivroom = n.ne.Nolivroom,
                      Nobathroom = n.ne.Nobathroom,
                      Garden = n.ne.Garden,
                      Bancony = n.ne.Bancony,
                      Provinceid = n.ne.Ward.City.Privince.Provinceid,
                      Provincename = n.ne.Ward.City.Privince.Provincename,
                      Cityid = n.ne.Ward.City.Cityid,
                      Cityname = n.ne.Ward.City.Cityname,
                      Wardid = n.ne.Wardid,
                      Wardname = n.ne.Ward.Wardname,
                      Price = n.ne.Price,
                      Username = n.ne.Username,
                      Phone = n.ac.Phone,
                      Email = n.ac.Email,
                      Fullname = n.ac.Fullname,
                      Agentuser = n.ac.Agentuser,
                      Userimg = path + "/images/account/" + n.ac.Photo,
                      Adstimefrom = n.ne.Adstimefrom,
                      Adstimeto = n.ne.Adstimeto,
                      Newstatus = n.ne.Newstatus

                  }).ToList();
        }


        public dynamic GetListNewsAgent(string useragent)
        {
            return db.News
                
                 .Where(n => n.Username== useragent && n.Newstatus != 3 && n.Newstatus != 4)
                 .Select(n => new
                 {
                     Newsid = n.Newsid,
                     Createdate = n.Createdate,
                     Newstypeid = n.Newstypeid,
                     NewTypeName = n.Newstype.Newstype1,
                     Categoryid = n.Categoryid,
                     Categoryname = n.Category.Categoryname,
                     CateTofhouseid = n.CateTofhouseid,
                     CateTofhouse = n.CateTofhouse.CateTofhousename,
                     Title = n.Title,
                     Content = n.Content,
                     Acreage = n.Acreage,
                     Nobedroom = n.Nobedroom,
                     Nolivroom = n.Nolivroom,
                     Nobathroom = n.Nobathroom,
                     Garden = n.Garden,
                     Bancony = n.Bancony,
                     Provincename = n.Ward.City.Privince.Provincename,
                     Provinceid = n.Ward.City.Privince.Provinceid,
              
                     Cityid = n.Ward.City.Cityid,
                     Cityname = n.Ward.City.Cityname,
                     Wardid = n.Wardid,
                     Wardname = n.Ward.Wardname,
                     Price = n.Price,
                     Newstatus = n.Newstatus,
                     Adstimefrom = n.Adstimefrom,
                     Adstimeto = n.Adstimeto,

                 }).ToList();
        }


        public dynamic GetAllListNewsAgent(string useragent)
        {
            return db.News

                 .Where(n => n.Username == useragent )
                 .Select(n => new
                 {
                     Newsid = n.Newsid,
                     Createdate = n.Createdate,
                     Newstypeid = n.Newstypeid,
                     NewTypeName = n.Newstype.Newstype1,
                     Categoryid = n.Categoryid,
                     Categoryname = n.Category.Categoryname,
                     CateTofhouseid = n.CateTofhouseid,
                     CateTofhouse = n.CateTofhouse.CateTofhousename,
                     Title = n.Title.Length > 50 ? n.Title.Remove(27) : n.Title,
                     Content = n.Content,
                     Acreage = n.Acreage,
                     Nobedroom = n.Nobedroom,
                     Nolivroom = n.Nolivroom,
                     Nobathroom = n.Nobathroom,
                     Garden = n.Garden,
                     Bancony = n.Bancony,
                     Provincename = n.Ward.City.Privince.Provincename,
                     Provinceid = n.Ward.City.Privince.Provinceid,

                     Cityid = n.Ward.City.Cityid,
                     Cityname = n.Ward.City.Cityname,
                     Wardid = n.Wardid,
                     Wardname = n.Ward.Wardname,
                     Price = n.Price,
                     Newstatus = n.Newstatus,
                     Adstimefrom = n.Adstimefrom,
                     Adstimeto = n.Adstimeto,

                 }).ToList();
        }

        //------------------------------Lan code-------------------------

        public dynamic ShowSpecialNews(string path)
        {
            var l = db.News
                .Join(db.Accounts,
                ne => ne.Username,
                ac => ac.Username,
                (ne, ac) => new { ne, ac })
                .Where(n => n.ne.Newstypeid == 2 && n.ne.Newstatus == 1)
                .OrderByDescending(n => n.ne.Adstimefrom)
                .Select(n => new
                {
                    Newsid = n.ne.Newsid,
                    Category = n.ne.Category.Categoryname,
                    CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                    Title = n.ne.Title.Length > 50 ? n.ne.Title.Remove(30) : n.ne.Title,
                    Acreage = n.ne.Acreage,
                    Province = n.ne.Ward.City.Privince.Provincename,
                    City = n.ne.Ward.City.Cityname,
                    Ward = n.ne.Ward.Wardname,
                    Price = n.ne.Price,
                    Username = n.ne.Username,
                    Userimg = path + "/images/account/" + n.ac.Photo,
                    Newstatus = n.ne.Newstatus,
                    Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()
                }).ToList().Take(6);
            Debug.WriteLine("--------------------------------------");
            Debug.WriteLine(l);
            return l;
        }

        public dynamic ShowVipNews(string path)
        {
            return db.News
                .Join(db.Accounts,
                ne => ne.Username,
                ac => ac.Username,
                (ne, ac) => new { ne, ac })
                .Where(n => n.ne.Newstypeid == 1 && n.ne.Newstatus == 1)
                .Select(n => new
                {
                    Newsid = n.ne.Newsid,
                    Category = n.ne.Category.Categoryname,
                    CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                    Title = n.ne.Title.Length > 50 ? n.ne.Title.Remove(27) : n.ne.Title,
                    Acreage = n.ne.Acreage,
                    Province = n.ne.Ward.City.Privince.Provincename,
                    City = n.ne.Ward.City.Cityname,
                    Ward = n.ne.Ward.Wardname,
                    Price = n.ne.Price,
                    Username = n.ne.Username,
                    Userimg = path + "/images/account/" + n.ac.Photo,
                    Newstatus = n.ne.Newstatus,
                    Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()
                }).ToList();
        }

        public dynamic ShowAllBySeller(string seller, string path)
        {
            return db.News.Join(db.Accounts,
                  ne => ne.Username,
                  ac => ac.Username,
                  (ne, ac) => new { ne, ac })
                 .Where(n => n.ac.Username == seller)
                  .OrderBy(n => n.ne.Newstatus)
                  .ThenByDescending(n => n.ne.Adstimefrom)
                  .Select(n => new
                  {
                      Newsid = n.ne.Newsid,
                      Createdate = n.ne.Createdate,
                      Newstypeid = n.ne.Newstypeid,
                      NewTypeName = n.ne.Newstype.Newstype1,
                      Categoryid = n.ne.Categoryid,
                      Categoryname = n.ne.Category.Categoryname,
                      CateTofhouseid = n.ne.CateTofhouseid,
                      CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                      Title = n.ne.Title.Length > 30 ? n.ne.Title.Remove(27) : n.ne.Title,
                      Content = n.ne.Content,
                      Acreage = n.ne.Acreage,
                      Nobedroom = n.ne.Nobedroom,
                      Nolivroom = n.ne.Nolivroom,
                      Nobathroom = n.ne.Nobathroom,
                      Garden = n.ne.Garden,
                      Bancony = n.ne.Bancony,
                      Provinceid = n.ne.Ward.City.Privince.Provinceid,
                      Provincename = n.ne.Ward.City.Privince.Provincename,
                      Cityid = n.ne.Ward.City.Cityid,
                      Cityname = n.ne.Ward.City.Cityname,
                      Wardid = n.ne.Wardid,
                      Wardname = n.ne.Ward.Wardname,
                      Price = n.ne.Price,
                      Username = n.ne.Username,
                      Phone = n.ac.Phone,
                      Email = n.ac.Email,
                      Fullname = n.ac.Fullname,
                      Agentuser = n.ac.Agentuser,
                      Userimg = path + "/images/account/" + n.ac.Photo,
                      Newstatus = n.ne.Newstatus

                  })
             .ToList();
        }


        public dynamic LSearch1(int idCatHouse, int idCat, string path)
        {
            return db.News
                .Join(db.Accounts,
                ne => ne.Username,
                ac => ac.Username,
                (ne, ac) => new { ne, ac })
                 .Where(n => n.ne.CateTofhouseid == idCatHouse && n.ne.Categoryid == idCat && n.ne.Newstatus == 1)
                   .OrderBy(n => n.ne.Newstype.Newstypeid)
                   .ThenByDescending(n => n.ne.Adstimefrom)
                .Select(n => new
                {
                    Newsid = n.ne.Newsid,
                    Category = n.ne.Category.Categoryname,
                    CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                    Title = n.ne.Title.Length > 50 ? n.ne.Title.Remove(27) : n.ne.Title,
                    Acreage = n.ne.Acreage,
                    Province = n.ne.Ward.City.Privince.Provincename,
                    City = n.ne.Ward.City.Cityname,
                    Ward = n.ne.Ward.Wardname,
                    Price = n.ne.Price,
                    Username = n.ne.Username,
                    Userimg = path + "/images/account/" + n.ac.Photo,
                    Newstatus = n.ne.Newstatus,
                    Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()
                }).ToList();
        }

        public dynamic LSearch2(int idPro, int idCatHouse, int idCat, string path)
        {
            return db.News
                .Join(db.Accounts,
                ne => ne.Username,
                ac => ac.Username,
                (ne, ac) => new { ne, ac })
                 .Where(n => n.ne.Ward.City.Privinceid == idPro && n.ne.CateTofhouseid == idCatHouse && n.ne.Categoryid == idCat && n.ne.Newstatus == 1)
                    .OrderBy(n => n.ne.Newstype.Newstypeid)
                    .ThenByDescending(n => n.ne.Adstimefrom)
                .Select(n => new
                {
                    Newsid = n.ne.Newsid,
                    Category = n.ne.Category.Categoryname,
                    CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                    Title = n.ne.Title.Length > 50 ? n.ne.Title.Remove(27) : n.ne.Title,
                    Acreage = n.ne.Acreage,
                    Province = n.ne.Ward.City.Privince.Provincename,
                    City = n.ne.Ward.City.Cityname,
                    Ward = n.ne.Ward.Wardname,
                    Price = n.ne.Price,
                    Username = n.ne.Username,
                    Userimg = path + "/images/account/" + n.ac.Photo,
                    Newstatus = n.ne.Newstatus,
                    Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()
                }).ToList();
        }

        public dynamic LSearch3(int idPro, int idCity, int idCatHouse, int idCat, string path)
        {
            return db.News
                .Join(db.Accounts,
                ne => ne.Username,
                ac => ac.Username,
                (ne, ac) => new { ne, ac })
                 .Where(n => n.ne.Ward.City.Privinceid == idPro && n.ne.Ward.Cityid == idCity && n.ne.CateTofhouseid == idCatHouse && n.ne.Categoryid == idCat && n.ne.Newstatus == 1)
                   .OrderBy(n => n.ne.Newstype.Newstypeid)
                   .ThenByDescending(n => n.ne.Adstimefrom)
                .Select(n => new
                {
                    Newsid = n.ne.Newsid,
                    Category = n.ne.Category.Categoryname,
                    CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                    Title = n.ne.Title.Length > 50 ? n.ne.Title.Remove(27) : n.ne.Title,
                    Acreage = n.ne.Acreage,
                    Province = n.ne.Ward.City.Privince.Provincename,
                    City = n.ne.Ward.City.Cityname,
                    Ward = n.ne.Ward.Wardname,
                    Price = n.ne.Price,
                    Username = n.ne.Username,
                    Userimg = path + "/images/account/" + n.ac.Photo,
                    Newstatus = n.ne.Newstatus,
                    Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()
                }).ToList();
        }

        public dynamic LSearch4(int idPro, int idCity, int idWard, int idCatHouse, int idCat, string path)
        {
            return db.News
                .Join(db.Accounts,
                ne => ne.Username,
                ac => ac.Username,
                (ne, ac) => new { ne, ac })
                 .Where(n => n.ne.Ward.City.Privinceid == idPro && n.ne.Ward.Cityid == idCity && n.ne.Wardid == idWard && n.ne.CateTofhouseid == idCatHouse && n.ne.Categoryid == idCat && n.ne.Newstatus == 1)
                   .OrderBy(n => n.ne.Newstype.Newstypeid)
                   .ThenByDescending(n => n.ne.Adstimefrom)
                .Select(n => new
                {
                    Newsid = n.ne.Newsid,
                    Category = n.ne.Category.Categoryname,
                    CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                    Title = n.ne.Title.Length > 50 ? n.ne.Title.Remove(27) : n.ne.Title,
                    Acreage = n.ne.Acreage,
                    Province = n.ne.Ward.City.Privince.Provincename,
                    City = n.ne.Ward.City.Cityname,
                    Ward = n.ne.Ward.Wardname,
                    Price = n.ne.Price,
                    Username = n.ne.Username,
                    Userimg = path + "/images/account/" + n.ac.Photo,
                    Newstatus = n.ne.Newstatus,
                    Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()
                }).ToList();
        }

        public dynamic LSearch5(int idPro, int idCat, string path)
        {
            return db.News
                .Join(db.Accounts,
                ne => ne.Username,
                ac => ac.Username,
                (ne, ac) => new { ne, ac })
                 .Where(n => n.ne.Ward.City.Privinceid == idPro && n.ne.Categoryid == idCat && n.ne.Newstatus == 1)
                   .OrderBy(n => n.ne.Newstype.Newstypeid)
                   .ThenByDescending(n => n.ne.Adstimefrom)
                .Select(n => new
                {
                    Newsid = n.ne.Newsid,
                    Category = n.ne.Category.Categoryname,
                    CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                    Title = n.ne.Title.Length > 50 ? n.ne.Title.Remove(27) : n.ne.Title,
                    Acreage = n.ne.Acreage,
                    Province = n.ne.Ward.City.Privince.Provincename,
                    City = n.ne.Ward.City.Cityname,
                    Ward = n.ne.Ward.Wardname,
                    Price = n.ne.Price,
                    Username = n.ne.Username,
                    Userimg = path + "/images/account/" + n.ac.Photo,
                    Newstatus = n.ne.Newstatus,
                    Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()
                }).ToList();
        }

        public dynamic LSearch6(int idPro, int idCity, int idCat, string path)
        {
            return db.News
                .Join(db.Accounts,
                ne => ne.Username,
                ac => ac.Username,
                (ne, ac) => new { ne, ac })
                 .Where(n => n.ne.Ward.City.Privinceid == idPro && n.ne.Ward.Cityid == idCity && n.ne.Categoryid == idCat && n.ne.Newstatus == 1)
                   .OrderBy(n => n.ne.Newstype.Newstypeid)
                   .ThenByDescending(n => n.ne.Adstimefrom)
                .Select(n => new
                {
                    Newsid = n.ne.Newsid,
                    Category = n.ne.Category.Categoryname,
                    CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                    Title = n.ne.Title.Length > 50 ? n.ne.Title.Remove(27) : n.ne.Title,
                    Acreage = n.ne.Acreage,
                    Province = n.ne.Ward.City.Privince.Provincename,
                    City = n.ne.Ward.City.Cityname,
                    Ward = n.ne.Ward.Wardname,
                    Price = n.ne.Price,
                    Username = n.ne.Username,
                    Userimg = path + "/images/account/" + n.ac.Photo,
                    Newstatus = n.ne.Newstatus,
                    Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()
                }).ToList();
        }

        public dynamic LSearch7(int idPro, int idCity, int idWard, int idCat, string path)
        {
            return db.News
                .Join(db.Accounts,
                ne => ne.Username,
                ac => ac.Username,
                (ne, ac) => new { ne, ac })
                 .Where(n => n.ne.Ward.City.Privinceid == idPro && n.ne.Ward.Cityid == idCity && n.ne.Wardid == idWard && n.ne.Categoryid == idCat && n.ne.Newstatus == 1)
                   .OrderBy(n => n.ne.Newstype.Newstypeid)
                   .ThenByDescending(n => n.ne.Adstimefrom)
                .Select(n => new
                {
                    Newsid = n.ne.Newsid,
                    Category = n.ne.Category.Categoryname,
                    CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                    Title = n.ne.Title.Length > 50 ? n.ne.Title.Remove(27) : n.ne.Title,
                    Acreage = n.ne.Acreage,
                    Province = n.ne.Ward.City.Privince.Provincename,
                    City = n.ne.Ward.City.Cityname,
                    Ward = n.ne.Ward.Wardname,
                    Price = n.ne.Price,
                    Username = n.ne.Username,
                    Userimg = path + "/images/account/" + n.ac.Photo,
                    Newstatus = n.ne.Newstatus,
                    Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()
                }).ToList();
        }

        public dynamic LSearch8(int idPro, int idCatHouse, string path)
        {
            return db.News
                .Join(db.Accounts,
                ne => ne.Username,
                ac => ac.Username,
                (ne, ac) => new { ne, ac })
                 .Where(n => n.ne.Ward.City.Privinceid == idPro && n.ne.CateTofhouseid == idCatHouse && n.ne.Newstatus == 1)
                   .OrderBy(n => n.ne.Newstype.Newstypeid)
                   .ThenByDescending(n => n.ne.Adstimefrom)
                .Select(n => new
                {
                    Newsid = n.ne.Newsid,
                    Category = n.ne.Category.Categoryname,
                    CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                    Title = n.ne.Title.Length > 50 ? n.ne.Title.Remove(27) : n.ne.Title,
                    Acreage = n.ne.Acreage,
                    Province = n.ne.Ward.City.Privince.Provincename,
                    City = n.ne.Ward.City.Cityname,
                    Ward = n.ne.Ward.Wardname,
                    Price = n.ne.Price,
                    Username = n.ne.Username,
                    Userimg = path + "/images/account/" + n.ac.Photo,
                    Newstatus = n.ne.Newstatus,
                    Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()
                }).ToList();
        }

        public dynamic LSearch11(int idPro, string path)
        {
            return db.News
                .Join(db.Accounts,
                ne => ne.Username,
                ac => ac.Username,
                (ne, ac) => new { ne, ac })
                 .Where(n => n.ne.Ward.City.Privinceid == idPro && n.ne.Newstatus == 1)
                   .OrderBy(n => n.ne.Newstype.Newstypeid)
                   .ThenByDescending(n => n.ne.Adstimefrom)
                .Select(n => new
                {
                    Newsid = n.ne.Newsid,
                    Category = n.ne.Category.Categoryname,
                    CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                    Title = n.ne.Title.Length > 50 ? n.ne.Title.Remove(27) : n.ne.Title,
                    Acreage = n.ne.Acreage,
                    Province = n.ne.Ward.City.Privince.Provincename,
                    City = n.ne.Ward.City.Cityname,
                    Ward = n.ne.Ward.Wardname,
                    Price = n.ne.Price,
                    Username = n.ne.Username,
                    Userimg = path + "/images/account/" + n.ac.Photo,
                    Newstatus = n.ne.Newstatus,
                    Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()
                }).ToList();
        }

        public dynamic LSearch12(int idPro, int idCity, string path)
        {
            return db.News
                .Join(db.Accounts,
                ne => ne.Username,
                ac => ac.Username,
                (ne, ac) => new { ne, ac })
                 .Where(n => n.ne.Ward.City.Privinceid == idPro && n.ne.Ward.Cityid == idCity && n.ne.Newstatus == 1)
                   .OrderBy(n => n.ne.Newstype.Newstypeid)
                   .ThenByDescending(n => n.ne.Adstimefrom)
                .Select(n => new
                {
                    Newsid = n.ne.Newsid,
                    Category = n.ne.Category.Categoryname,
                    CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                    Title = n.ne.Title.Length > 50 ? n.ne.Title.Remove(27) : n.ne.Title,
                    Acreage = n.ne.Acreage,
                    Province = n.ne.Ward.City.Privince.Provincename,
                    City = n.ne.Ward.City.Cityname,
                    Ward = n.ne.Ward.Wardname,
                    Price = n.ne.Price,
                    Username = n.ne.Username,
                    Userimg = path + "/images/account/" + n.ac.Photo,
                    Newstatus = n.ne.Newstatus,
                    Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()
                }).ToList();
        }

        public dynamic LSearch13(int idPro, int idCity, int idWard, string path)
        {
            return db.News
                .Join(db.Accounts,
                ne => ne.Username,
                ac => ac.Username,
                (ne, ac) => new { ne, ac })
                 .Where(n => n.ne.Ward.City.Privinceid == idPro && n.ne.Ward.Cityid == idCity && n.ne.Wardid == idWard && n.ne.Newstatus == 1)
                    .OrderBy(n => n.ne.Newstype.Newstypeid)
                   .ThenByDescending(n => n.ne.Adstimefrom)
                .Select(n => new
                {
                    Newsid = n.ne.Newsid,
                    Category = n.ne.Category.Categoryname,
                    CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                    Title = n.ne.Title.Length > 50 ? n.ne.Title.Remove(27) : n.ne.Title,
                    Acreage = n.ne.Acreage,
                    Province = n.ne.Ward.City.Privince.Provincename,
                    City = n.ne.Ward.City.Cityname,
                    Ward = n.ne.Ward.Wardname,
                    Price = n.ne.Price,
                    Username = n.ne.Username,
                    Userimg = path + "/images/account/" + n.ac.Photo,
                    Newstatus = n.ne.Newstatus,
                    Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()
                }).ToList();
        }

        public dynamic Search(string keyword, string path)
        {
            return db.News
                .Join(db.Accounts,
                ne => ne.Username,
                ac => ac.Username,
                (ne, ac) => new { ne, ac })
                 .Where(n => n.ne.Title.Contains(keyword) || n.ne.Content.Contains(keyword) && n.ne.Newstatus == 1)
                    .OrderBy(n => n.ne.Newstype.Newstypeid)
                   .ThenByDescending(n => n.ne.Adstimefrom)
                .Select(n => new
                {
                    Newsid = n.ne.Newsid,
                    Category = n.ne.Category.Categoryname,
                    CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                    Title = n.ne.Title.Length > 50 ? n.ne.Title.Remove(27) : n.ne.Title,
                    Acreage = n.ne.Acreage,
                    Province = n.ne.Ward.City.Privince.Provincename,
                    City = n.ne.Ward.City.Cityname,
                    Ward = n.ne.Ward.Wardname,
                    Price = n.ne.Price,
                    Username = n.ne.Username,
                    Userimg = path + "/images/account/" + n.ac.Photo,
                    Newstatus = n.ne.Newstatus,
                    Photo = path + "/images/new/" + n.ne.Newsimages.Select(i => i.Photo).FirstOrDefault()
                }).ToList();
        }

        public dynamic GetNewsTableById(int newsid)
        {
            return db.News
                 .Join(db.Accounts,
                 ne => ne.Username,
                 ac => ac.Username,
                 (ne, ac) => new { ne, ac })
                 .Where(n => n.ne.Newsid == newsid)
                 .Select(n => new
                 {
                     Newsid = n.ne.Newsid,
                     Createdate = n.ne.Createdate,
                     Newstypeid = n.ne.Newstypeid,
                     Categoryid = n.ne.Categoryid,
                     CateTofhouseid = n.ne.CateTofhouseid,
                     Title = n.ne.Title,
                     Content = n.ne.Content,
                     Acreage = n.ne.Acreage,
                     Nobedroom = n.ne.Nobedroom,
                     Nolivroom = n.ne.Nolivroom,
                     Nobathroom = n.ne.Nobathroom,
                     Garden = n.ne.Garden,
                     Bancony = n.ne.Bancony,
                     Wardid = n.ne.Wardid,
                     Price = n.ne.Price,
                     Username = n.ne.Username,
                     Adstimefrom = n.ne.Adstimefrom,
                     Adstimeto = n.ne.Adstimeto,
                     Newstatus = n.ne.Newstatus
                 })
            .FirstOrDefault();
        }

        public dynamic GetNewestNews(string username)
        {
            return db.News
                 .Join(db.Accounts,
                 ne => ne.Username,
                 ac => ac.Username,
                 (ne, ac) => new { ne, ac })
                 .Where(n => n.ne.Username == username)
                 .OrderByDescending(n => n.ne.Newsid)
                 .Select(n => new
                 {
                     Newsid = n.ne.Newsid,
                     Createdate = n.ne.Createdate,
                     Newstypeid = n.ne.Newstypeid,
                     Categoryid = n.ne.Categoryid,
                     CateTofhouseid = n.ne.CateTofhouseid,
                     Title = n.ne.Title,
                     Content = n.ne.Content,
                     Acreage = n.ne.Acreage,
                     Nobedroom = n.ne.Nobedroom,
                     Nolivroom = n.ne.Nolivroom,
                     Nobathroom = n.ne.Nobathroom,
                     Garden = n.ne.Garden,
                     Bancony = n.ne.Bancony,
                     Wardid = n.ne.Wardid,
                     Price = n.ne.Price,
                     Username = n.ne.Username,
                     Adstimefrom = n.ne.Adstimefrom,
                     Adstimeto = n.ne.Adstimeto,
                     Newstatus = n.ne.Newstatus
                 })
            .Take(1).FirstOrDefault();
        }

        public bool AddNews(News news)
        {
            try
            {
                var createdate = DateTime.Now;
                news.Createdate = createdate;
                db.News.Add(news);
                return db.SaveChanges() > 0;
            }
            catch
            {

                return false;
            }
        }

        public bool UpdateStatusNews(int newsid, News news)
        {
            try
            {
                var getnews = db.News.FirstOrDefault(s => s.Newsid == newsid);
                if (getnews != null)
                {
                    getnews.Newstatus = news.Newstatus;
                    return db.SaveChanges() > 0;
                }

                return false;
            }
            catch
            {
                return false;

            }
        }

        public dynamic GetListByNewsTypeAndSeller(int newstypeid, string seller, string path)
        {
            return db.News
                 .Join(db.Accounts,
                 ne => ne.Username,
                 ac => ac.Username,
                 (ne, ac) => new { ne, ac })
                 .Where(n => n.ne.Newstypeid == newstypeid && n.ne.Username == seller && n.ne.Newstatus == 1)
                 .Select(n => new
                 {
                     Newsid = n.ne.Newsid,
                     Createdate = n.ne.Createdate,
                     Newstypeid = n.ne.Newstypeid,
                     NewTypeName = n.ne.Newstype.Newstype1,
                     Categoryid = n.ne.Categoryid,
                     Categoryname = n.ne.Category.Categoryname,
                     CateTofhouseid = n.ne.CateTofhouseid,
                     CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                     Title = n.ne.Title,
                     Content = n.ne.Content,
                     Acreage = n.ne.Acreage,
                     Nobedroom = n.ne.Nobedroom,
                     Nolivroom = n.ne.Nolivroom,
                     Nobathroom = n.ne.Nobathroom,
                     Garden = n.ne.Garden,
                     Bancony = n.ne.Bancony,
                     Provinceid = n.ne.Ward.City.Privince.Provinceid,
                     Provincename = n.ne.Ward.City.Privince.Provincename,
                     Cityid = n.ne.Ward.City.Cityid,
                     Cityname = n.ne.Ward.City.Cityname,
                     Wardid = n.ne.Wardid,
                     Wardname = n.ne.Ward.Wardname,
                     Price = n.ne.Price,
                     Username = n.ne.Username,
                     Phone = n.ac.Phone,
                     Email = n.ac.Email,
                     Fullname = n.ac.Fullname,
                     Agentuser = n.ac.Agentuser,
                     Userimg = path + "/images/account/" + n.ac.Photo,
                     Adstimefrom = n.ne.Adstimefrom,
                     Adstimeto = n.ne.Adstimeto,
                     Newstatus = n.ne.Newstatus

                 }).ToList();
        }

        public dynamic GetNewsStatusNull(string username)
        {
            return db.News
                 .Join(db.Accounts,
                 ne => ne.Username,
                 ac => ac.Username,
                 (ne, ac) => new { ne, ac })
                 .Where(n => n.ne.Username == username && n.ne.Newstatus == null)
                 .Select(n => new
                 {
                     Newsid = n.ne.Newsid,
                     Createdate = n.ne.Createdate,
                     Newstypeid = n.ne.Newstypeid,
                     Categoryid = n.ne.Categoryid,
                     CateTofhouseid = n.ne.CateTofhouseid,
                     Title = n.ne.Title,
                     Content = n.ne.Content,
                     Acreage = n.ne.Acreage,
                     Nobedroom = n.ne.Nobedroom,
                     Nolivroom = n.ne.Nolivroom,
                     Nobathroom = n.ne.Nobathroom,
                     Garden = n.ne.Garden,
                     Bancony = n.ne.Bancony,
                     Provinceid = n.ne.Ward.City.Privince.Provinceid,
                     Provincename = n.ne.Ward.City.Privince.Provincename,
                     Cityid = n.ne.Ward.City.Cityid,
                     Cityname = n.ne.Ward.City.Cityname,
                     Wardid = n.ne.Wardid,
                     Wardname = n.ne.Ward.Wardname,
                     Price = n.ne.Price,
                     Username = n.ne.Username,
                     Newstatus = n.ne.Newstatus
                 }).ToList();
        }



        //--------------------------------Lan code---------------------------------



        //--------------------------------Dac code---------------------------------


        public bool UpdateNews(News news)
        {
            try
            {
                db.Entry(news).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                return db.SaveChanges() > 0;
            }
            catch 
            {

                return false;
            }
        }

        public bool SetStatusNews(int id, byte newStatus)
        {
            try
            {
                var news = db.News.FirstOrDefault(s => s.Newsid == id);
                news.Newstatus = newStatus;
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false ;
            }
        }

        public bool DeleteNews(int id)
        {
            try
            {
                var news = db.News.FirstOrDefault(s => s.Newsid == id);
                db.News.Remove(news);
                return db.SaveChanges() > 0;
            }
            catch 
            {
                return false;
            }
        }
        public dynamic ShowAllBySuperAdmin(string path)
        {
            return db.News.Join(db.Accounts,
                 ne => ne.Username,
                 ac => ac.Username,
                 (ne, ac) => new { ne, ac })
                 .OrderBy(n => n.ne.Newstatus)
                 .ThenByDescending(n => n.ne.Adstimefrom)
                 .Select(n => new
                 {
                     Newsid = n.ne.Newsid,
                     Createdate = n.ne.Createdate,
                     Newstypeid = n.ne.Newstypeid,
                     NewTypeName = n.ne.Newstype.Newstype1,
                     Categoryid = n.ne.Categoryid,
                     Categoryname = n.ne.Category.Categoryname,
                     CateTofhouseid = n.ne.CateTofhouseid,
                     CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                     Title = n.ne.Title.Length > 30 ? n.ne.Title.Remove(27) + "..." : n.ne.Title,
                     Content = n.ne.Content,
                     Acreage = n.ne.Acreage,
                     Nobedroom = n.ne.Nobedroom,
                     Nolivroom = n.ne.Nolivroom,
                     Nobathroom = n.ne.Nobathroom,
                     Garden = n.ne.Garden,
                     Bancony = n.ne.Bancony,
                     Provinceid = n.ne.Ward.City.Privince.Provinceid,
                     Provincename = n.ne.Ward.City.Privince.Provincename,
                     Cityid = n.ne.Ward.City.Cityid,
                     Cityname = n.ne.Ward.City.Cityname,
                     Wardid = n.ne.Wardid,
                     Wardname = n.ne.Ward.Wardname,
                     Price = n.ne.Price,
                     Username = n.ne.Username,
                     Phone = n.ac.Phone,
                     Email = n.ac.Email,
                     Fullname = n.ac.Fullname,
                     Agentuser = n.ac.Agentuser,
                     Agentstatus = n.ac.Accstatus,
                     Adminstatus = n.ac.AgentuserNavigation.Accstatus,
                     Userimg = path + "/images/account/" + n.ac.Photo,
                     Newstatus = n.ne.Newstatus

                 })
            .ToList().OrderByDescending(s => s.Newsid);
        }
        public bool CheckCanActiveNew(int idnews)
        {
            var checkBool = true;
            var news = db.News.FirstOrDefault(s => s.Newsid == idnews);
            var check = news.UsernameNavigation.Agentuser == null || news.UsernameNavigation.Agentuser == "" ? false : true;
            var newsType = news.Newstypeid;
            if (check)
            {

                var admin = news.UsernameNavigation.AgentuserNavigation;
                switch (newsType)
                {
                    case 1:
                        checkBool = admin.Invoices.Where(s => s.Invoicestatus != 3).FirstOrDefault().Package.NoVvipnews > admin.News.Where(s => s.Newstatus == 1 && s.Newstypeid == 1).Count();
                        break;
                    case 2:
                        checkBool = admin.Invoices.Where(s => s.Invoicestatus != 3).FirstOrDefault().Package.NoVipnews > admin.News.Where(s => s.Newstatus == 1 && s.Newstypeid == 2).Count();
                        break;
                    case 3:
                        checkBool = admin.Invoices.Where(s => s.Invoicestatus != 3).FirstOrDefault().Package.NoNormalnews > admin.News.Where(s => s.Newstatus == 1 && s.Newstypeid == 3).Count();
                        break;
                }
            }
            else
            {
                var user = news.UsernameNavigation;
                switch (newsType)
                {
                    case 1:
                        checkBool = user.Invoices.Where(s => s.Invoicestatus != 3).FirstOrDefault().Package.NoVvipnews > user.News.Where(s => s.Newstatus == 1 && s.Newstypeid == 1).Count();
                        break;
                    case 2:
                        checkBool = user.Invoices.Where(s => s.Invoicestatus != 3).FirstOrDefault().Package.NoVipnews > user.News.Where(s => s.Newstatus == 1 && s.Newstypeid == 2).Count();
                        break;
                    case 3:
                        checkBool = user.Invoices.Where(s => s.Invoicestatus != 3).FirstOrDefault().Package.NoNormalnews > user.News.Where(s => s.Newstatus == 1 && s.Newstypeid == 3).Count();
                        break;
                }



            }
            return checkBool;
        }
        public dynamic GetNewByIdShowDetailsPageBySuperAdmin(int newid, string path)
        {
            return db.News
                  .Join(db.Accounts,
                  ne => ne.Username,
                  ac => ac.Username,
                  (ne, ac) => new { ne, ac })
                  .Where(n => n.ne.Newsid == newid)
                  .Select(n => new
                  {
                      Newsid = n.ne.Newsid,
                      Createdate = n.ne.Createdate,
                      Newstypeid = n.ne.Newstypeid,
                      NewTypeName = n.ne.Newstype.Newstype1,
                      Categoryid = n.ne.Categoryid,
                      Categoryname = n.ne.Category.Categoryname,
                      CateTofhouseid = n.ne.CateTofhouseid,
                      CateTofhouse = n.ne.CateTofhouse.CateTofhousename,
                      Title = n.ne.Title,
                      Content = n.ne.Content,
                      Acreage = n.ne.Acreage,
                      Nobedroom = n.ne.Nobedroom,
                      Nolivroom = n.ne.Nolivroom,
                      Nobathroom = n.ne.Nobathroom,
                      Garden = n.ne.Garden,
                      Bancony = n.ne.Bancony,
                      Provinceid = n.ne.Ward.City.Privince.Provinceid,
                      Provincename = n.ne.Ward.City.Privince.Provincename,
                      Cityid = n.ne.Ward.City.Cityid,
                      Cityname = n.ne.Ward.City.Cityname,
                      Wardid = n.ne.Wardid,
                      Wardname = n.ne.Ward.Wardname,
                      Price = n.ne.Price,
                      Username = n.ne.Username,
                      Phone = n.ac.Phone,
                      Email = n.ac.Email,
                      Fullname = n.ac.Fullname,
                      Agentuser = n.ac.Agentuser,
                      Agentstatus = n.ac.Accstatus,
                      Adminstatus = n.ac.AgentuserNavigation.Accstatus,
                      Userimg = path + "/images/account/" + n.ac.Photo,
                      Adstimefrom = n.ne.Adstimefrom,
                      Adstimeto = n.ne.Adstimeto,
                      Newstatus = n.ne.Newstatus

                  })
             .FirstOrDefault();
        }
        //--------------------------------Dac code---------------------------------
    }
}
