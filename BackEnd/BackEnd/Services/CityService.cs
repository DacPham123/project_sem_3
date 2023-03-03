using BackEnd.Models;

namespace BackEnd.Services
{
    public interface CityService
    {
        public dynamic FindAllCity();
        //----------------------Lan code-------------------
        public dynamic GetCities(int provinceId);
        //-------------------------------------
        public bool CreateCity(City city);
        public bool UpdateCity(City city);
        public bool CheckDelete(int cityId);
        public bool DeleteCity(int cityId);
    }
}
