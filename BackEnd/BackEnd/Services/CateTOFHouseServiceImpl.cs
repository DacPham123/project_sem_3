using BackEnd.Models;
using System.Diagnostics;

namespace BackEnd.Services
{
    public class CateTOFHouseServiceImpl: CateTOFHouseService
    {
        private DatabaseContext db;
        public CateTOFHouseServiceImpl(DatabaseContext _db)
        {
            db = _db;
        }

   

        public dynamic Getbyid(int cateTofhouseid)
        {
            return db.CateTofhouses.Select(p => new
            {
                CateTofhouseid = p.CateTofhouseid,
                CateTofhousename = p.CateTofhousename
            }).FirstOrDefault(s => s.CateTofhouseid == cateTofhouseid);
        }
        public dynamic ShowAll()
        {

            var l = db.CateTofhouses.Select(p => new
            {
                CateTofhouseid = p.CateTofhouseid,
                CateTofhousename = p.CateTofhousename
            }).ToList();

            return l;
        }

        //----------------------dac code---------------
        public bool AddCateOfHouse(CateTofhouse cateTofhouse)
        {
            try
            {
                db.CateTofhouses.Add(cateTofhouse);
                return db.SaveChanges()>0;
            }
            catch 
            {
                return false;
                
            }
        }

        public int DeleteCateOfHouse(int id)
        {
            try
            {
                var news = db.News.Where(s => s.CateTofhouseid == id).ToList();
                if (news != null && news.Count > 0) {
                    return 2;
                }
                else
                {
                    db.CateTofhouses.Remove(db.CateTofhouses.FirstOrDefault(s => s.CateTofhouseid == id));
                }

                if (db.SaveChanges() > 0)
                {
                    return 1;
                }
                else {
                    return 0;
                }
              
            }
            catch
            {
                return 0;

            }
        }
      

        public bool UpdateCateOfHouse(CateTofhouse cateTofhouse)
        {
            try
            {
                db.Entry(cateTofhouse).State= Microsoft.EntityFrameworkCore.EntityState.Modified;
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;

            }
        }
        public dynamic ShowAllDes()
        {

            var l = db.CateTofhouses.Select(p => new
            {
                CateTofhouseid = p.CateTofhouseid,
                CateTofhousename = p.CateTofhousename
            }).ToList().OrderByDescending(s => s.CateTofhouseid);

            return l;
        }
        //-------------------------------------------------
    }
}
