using BackEnd.Models;

namespace BackEnd.Services
{
    public interface PackageService
    {
        public dynamic FindAll();
        public bool AddPackage(Package package);

        public bool UpdatePackage(Package package);

        public bool DeletePackage(int id);
        public dynamic FindById(int id);
        //--------xuan------------------
        public dynamic FindPackage(int id);
        public dynamic FindListPackageByType(decimal price, int date);
    }
}
