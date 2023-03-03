using BackEnd.Models;
using System.Diagnostics;

namespace BackEnd.Services
{
    public class PackageServiceImpl : PackageService
    {
        private DatabaseContext db;
        public PackageServiceImpl(DatabaseContext _db)
        {
            db = _db;
        }

        public bool AddPackage(Package package)
        {
            try
            {
                db.Packages.Add(package);
                return db.SaveChanges()>0;
            }
            catch 
            {
                return false;
             
            }
        }

        public bool DeletePackage(int id)
        {
            try
            {
                db.Packages.Remove(db.Packages.FirstOrDefault(s => s.Packageid == id));
                return db.SaveChanges()>0;
            }
            catch 
            {
                return false;
                
            }
        }

        public dynamic FindAll()
        {
           return db.Packages.Select(s => new
           {
               PackageId = s.Packageid,
               
               Packagetitle = s.Packagetitle,
               Packageprice = s.Packageprice,
               Packagedate = s.Packagedate,
               NoVVipnews = s.NoVvipnews,
               NoVipnews=s.NoVipnews,
               NoNormalnews = s.NoNormalnews,
              
               PackageContent = s.Packagecontent



           }).ToList().OrderByDescending(s=>s.PackageId);
        }
        public dynamic FindById(int id)
        {
            return db.Packages.Select(s => new
            {
                Packageid = s.Packageid,
                Packagetitle = s.Packagetitle,
                Packageprice = s.Packageprice,
                Packagedate = s.Packagedate,
                NoVVipnews = s.NoVvipnews,
                NoVipnews = s.NoVipnews,
                NoNormalnews = s.NoNormalnews,
                Packagecontent = s.Packagecontent



            }).FirstOrDefault(s => s.Packageid == id);
        }
        public bool UpdatePackage(Package package)
        {
            try
            {
                db.Entry(package).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;

            }
        }

        //-------------------------xuan
        public dynamic FindPackage(int id)
        {
            return db.Packages.Where(p => p.Packageid == id)
                .Select(s => new
                {
                    PackageId = s.Packageid,
                    
                    Packagetitle = s.Packagetitle,
                    Packageprice = s.Packageprice,
                    Packagedate = s.Packagedate,
                    NoVVipnews = s.NoVvipnews,
                    NoVipnews = s.NoVipnews,
                    NoNormalnews = s.NoNormalnews,
                   
                    PackageContent = s.Packagecontent
                }).FirstOrDefault();
        }
        public dynamic FindListPackageByType(decimal price,int date)
        {
            return db.Packages
                .Where(p =>   p.Packageprice > price && p.Packagedate==date)
                .Select(s => new
                {
                    PackageId = s.Packageid,
                   
                    Packagetitle = s.Packagetitle,
                    Packageprice = s.Packageprice,
                    Packagedate = s.Packagedate,
                    NoVVipnews = s.NoVvipnews,
                    NoVipnews = s.NoVipnews,
                    NoNormalnews = s.NoNormalnews,
                    PackageContent = s.Packagecontent
                }).ToList();
        }
        

       
    }
}
