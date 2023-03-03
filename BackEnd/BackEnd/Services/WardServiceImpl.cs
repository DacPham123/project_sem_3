using BackEnd.Models;

namespace BackEnd.Services
{
    public class WardServiceImpl : WardService
    {
        private DatabaseContext db;
        public WardServiceImpl(DatabaseContext _db)
        {
            db = _db;
        }
        public bool CheckDelete(int wardId)
        {
            try
            {
                var ward = db.Wards.FirstOrDefault(s => s.Wardid == wardId);
                if (ward != null)
                {
                    var checkWard = ward.News.ToList();
                    if (checkWard == null || checkWard.Count == 0)
                    {
                        return true;
                    }
                    else { return false; }
                }
                else { return true; }
            }
            catch
            {

                return false;
            }
        }
        public bool CreateWard(Ward ward)
        {
            try
            {
                db.Wards.Add(ward);
                return db.SaveChanges()>0;
            }
            catch 
            {

                return false;
            }
        }
        public bool DeleteWard(int wardId)
        {
            try
            {
                db.Wards.Remove(db.Wards.FirstOrDefault(s => s.Wardid == wardId));
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        //-----------------------------Lan code--------------------------
        public dynamic FindAllWard()
        {
            return db.Wards.Select(w => new
            {
                wardId = w.Wardid,
                wardName = w.Wardname,
            }).ToList();
        }

        public dynamic GetWardById(int cityId)
        {
            return db.Wards.Where(w => w.Cityid == cityId)
                .Select(w => new
            {
                wardId = w.Wardid,
                wardName = w.Wardname,
            }).ToList();
        }
        //-----------------------------Lan code--------------------------

        public bool UpdateWard(Ward ward)
        {
            try
            {
                db.Entry(ward).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                return db.SaveChanges()>0;
            }
            catch (Exception)
            {
                return false;
                
            }
        }
    }
}
