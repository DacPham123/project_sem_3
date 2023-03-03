using BackEnd.Models;

namespace BackEnd.Services
{
    public class ProvinceServiceImpl : ProvinceService

    {
        private DatabaseContext db;
        public ProvinceServiceImpl(DatabaseContext _db)
        {
            db = _db;
        }
        public bool CreateProvince(Province province)
        {
            try
            {
                db.Provinces.Add(province);
                return db.SaveChanges() > 0;
            }
            catch
            {

                return false;
            }
        }

        public bool CheckDelete(int proId)
        {
            try
            {
                var city = db.Cities.Where(s => s.Privinceid == proId);
                return city == null || city.Count() == 0;
            }
            catch (Exception)
            {

                return false;
            }
        }
        //-----------------------------Lan code--------------------------
        public dynamic FindAllProvince()
        {
            return db.Provinces.Select(p => new
            {
                provinceId = p.Provinceid,
                provinceName = p.Provincename
            }).ToList();
        }

        public dynamic GetProvince(int provinceId)
        {
            return db.Provinces.Where(p => p.Provinceid == provinceId).Select(p => new
            {
                provinceId = p.Provinceid,
                provinceName = p.Provincename
            }).FirstOrDefault();
        }
        public bool DeleteProvince(int proId)
        {
            try
            {

                db.Provinces.Remove(db.Provinces.Find(proId));
                return db.SaveChanges() > 0;
            }
            catch (Exception ex)
            {

                return false;
            }
        }
        //----------------------------------------------------

        public bool UpdateProvince(Province province)
        {
            try
            {
                db.Entry(province).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                return db.SaveChanges() > 0;
            }
            catch (Exception)
            {
                return false;

            }
        }
    }
}
