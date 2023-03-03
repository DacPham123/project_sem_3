using BackEnd.Models;

namespace BackEnd.Services
{
    public class CityServiceImpl : CityService
    {
        private DatabaseContext db;
        public CityServiceImpl(DatabaseContext _db)
        {
            db = _db;
        }
        public bool CreateCity(City city)
        {
            try
            {
                db.Cities.Add(city);
                return db.SaveChanges() > 0;
            }
            catch
            {

                return false;
            }
        }

        public dynamic FindAllCity()
        {
            return db.Cities.Select(c => new 
            {
                cityId = c.Cityid,
                cityName = c.Cityname
            }).ToList();
        }

        //----------------------Lan code--------------
        public dynamic GetCities(int provinceId)
        {
            return db.Cities.Where(c => c.Privinceid == provinceId).Select(c => new
            {
                citiId = c.Cityid,
                citiName = c.Cityname
            }).ToList();
        }
        //-----------------------------------------------

        public bool UpdateCity(City city)
        {
            try
            {
                db.Entry(city).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                return db.SaveChanges() > 0;
            }
            catch (Exception)
            {
                return false;

            }
        }
        public bool DeleteCity(int cityId)
        {
            try
            {
                db.Cities.Remove(db.Cities.FirstOrDefault(s => s.Cityid == cityId));
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }
        public bool CheckDelete(int cityId)
        {
            try
            {
                var wards = db.Wards.Where(s => s.Cityid == cityId);
                return wards == null || wards.Count() == 0;
            }
            catch (Exception)
            {

                return false;
            }

        }
    }
}
