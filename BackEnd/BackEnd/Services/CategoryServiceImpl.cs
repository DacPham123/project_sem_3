using BackEnd.Models;
using System.Diagnostics;

namespace BackEnd.Services
{
    public class CategoryServiceImpl : CategoryService
    {
        private DatabaseContext db;
        public CategoryServiceImpl(DatabaseContext _db)
        {
            db = _db;
        }

        public dynamic Getbyid(int Categoryid)
        {
            return db.Categories.Select(p => new
            {
                Categoryid = p.Categoryid,
                Categoryname = p.Categoryname
            }).FirstOrDefault(s => s.Categoryid == Categoryid);
        }

        public dynamic ShowAll()
        {

            return db.Categories.Select(p => new
            {
                Categoryid = p.Categoryid,
                Categoryname = p.Categoryname
            }).ToList();
          
           
        }
    }
}
