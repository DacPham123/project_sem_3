using BackEnd.Models;

namespace BackEnd.Services
{
    public interface WardService
    {
        public dynamic FindAllWard();
        //-----------------Lan code-----------------
        public dynamic GetWardById(int cityId);
        //---------------------------------
        public bool CreateWard(Ward ward);
        public bool UpdateWard(Ward ward);
        public bool CheckDelete(int wardId);
        public bool DeleteWard(int wardId);
    }
}
