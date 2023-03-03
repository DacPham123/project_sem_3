using BackEnd.Helper;
using BackEnd.Models;

namespace BackEnd.Services
{
    public class NewsImagesServiceImpl : NewsImagesService
    {

        private DatabaseContext db;
        public NewsImagesServiceImpl(DatabaseContext _db)
        {
            db = _db;
        }

        public bool DeleteImage(int id)
        {
            try
            {
                db.Newsimages.Remove(db.Newsimages.FirstOrDefault(s => s.Newsimagesid == id));
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;

            }
        }

        public bool DeleteImageByNewsId(int id)
        {
            var images = db.Newsimages.Where(s => s.Newsid == id);
            if (images != null)
            {
                foreach (var image in images)
                {
                    db.Newsimages.Remove(image);
                }
            }
            return db.SaveChanges() > 0;
        }

        public dynamic GetNewsImagesById(int newid, string path)
        {
            return db.Newsimages
                .Where(ni => ni.Newsid == newid)
                .Select(n => new
                {
                    Newsid = n.Newsid,
                    Newsimagesid = n.Newsimagesid,
                    Photo = path + "/images/new/" + n.Photo

                })
           .ToList();
        }

        public dynamic GetNewsImagesDel(int newid)
        {
            return db.Newsimages
                .Where(ni => ni.Newsid == newid)
                .Select(n => new
                {
                    Newsid = n.Newsid,
                    Newsimagesid = n.Newsimagesid,
                    Photo = n.Photo

                })
           .ToList();
        }

        public dynamic GetNewsImg(int newsimg)
        {
            return db.Newsimages
                .Where(ni => ni.Newsimagesid == newsimg)
                .Select(n => new
                {
                    Newsid = n.Newsid,
                    Newsimagesid = n.Newsimagesid,
                    Photo = n.Photo

                }).FirstOrDefault();
        }

        public bool InsertImage(Newsimage newsImg)
        {
            try
            {
                db.Newsimages.Add(newsImg);
                return db.SaveChanges() > 0;
            }
            catch
            {

                return false;
            }
        }
    }
}
