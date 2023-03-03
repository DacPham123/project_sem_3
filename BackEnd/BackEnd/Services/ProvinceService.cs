using BackEnd.Models;

namespace BackEnd.Services
{
    public interface ProvinceService
    {
        public dynamic FindAllProvince();
        public dynamic GetProvince(int provinceId);
        public bool CreateProvince(Province province);
        public bool UpdateProvince(Province province);
        public bool CheckDelete(int proId);
        public bool DeleteProvince(int proId);
    }
}
