using BackEnd.Models;

namespace BackEnd.Services
{
    public interface CateTOFHouseService
    {
        public dynamic ShowAll();
        public dynamic ShowAllDes();
        public dynamic Getbyid(int CateTofhouseid);

        public bool AddCateOfHouse(CateTofhouse cateTofhouse);
        public bool UpdateCateOfHouse(CateTofhouse cateTofhouse);
        public int DeleteCateOfHouse(int id);
    }
}
