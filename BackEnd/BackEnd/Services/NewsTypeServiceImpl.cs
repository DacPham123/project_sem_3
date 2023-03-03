using BackEnd.Models;


namespace BackEnd.Services
{
    public class NewsTypeServiceImpl : NewsTypeService
    {
        private DatabaseContext db;
        public NewsTypeServiceImpl(DatabaseContext _db)
        {
            db = _db;
        }

        public dynamic ShowAll()
        {

            return db.Newstypes.Select(p => new
            {
                Newstypeid =p.Newstypeid,
                Newstype1=p.Newstype1
            }).ToList();                    
        }

        public dynamic Getbyid(int newstypeid)
        {
            return db.Newstypes.Select(p => new
            {
                Newstypeid = p.Newstypeid,
                Newstype1 = p.Newstype1
            }).FirstOrDefault(s => s.Newstypeid == newstypeid);
        }
    }
}
