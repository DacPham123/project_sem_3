using BackEnd.Models;

namespace BackEnd.Services
{
    public interface NewsService
    {
        //-----------------Xuan
        public dynamic ShowAll(string path);
        public dynamic ShowAllByAdmin(string useradmin, string path);
        public dynamic ShowByNewsType(int newstypeid, string path);
        public dynamic ShowByCategoryOfHouse(int categoryofhouseid, string path);
        //        A/ NEU PROVINCE ==NULL
        //1/ nếu category != null, new type == null, HÀM NÀY SÀI CHUNG VỚI BÉ LAN

        //2/ nếu category == null, new type != null
        public dynamic XSearch1(int categoryofhouseid, string path, int typeNewsID);
        //3/ nếu category != null, new type != null
        public dynamic XSearch3(int categoryofhouseid, string path, int typeNewsID, int categoryid);
        //        B/NEU PROVINCE !=NULL

        //B1/ CATEGORY NULL && NEWTYPE !=NULL
        // 4/ new type != null, province!= null
        public dynamic XSearch4(int categoryofhouseid, string path, int typeNewsID, int provinceId);
        // 5/ new type != null, province!= null,  city !=null, ward == null
        public dynamic XSearch5(int categoryofhouseid, string path, int typeNewsID, int provinceId, int citiId);

        // 6/ new type != null, province!= null,  city !=null, ward != null
        public dynamic XSearch6(int categoryofhouseid, string path, int typeNewsID, int provinceId, int citiId, int wardId);

        //7/  category != null, new type != null, province!= null
        public dynamic XSearch7(int categoryofhouseid, string path, int typeNewsID, int categoryid, int provinceId);

        //8/ category != null,  new type != null, province!= null,  city !=null, ward == null
        public dynamic XSearch8(int categoryofhouseid, string path, int typeNewsID, int categoryid, int provinceId, int citiId);

        // 9/ category != null,  new type != null, province!= null,  city !=null, ward != null
        public dynamic XSearch9(int categoryofhouseid, string path, int typeNewsID, int categoryid, int provinceId, int citiId, int wardId);

        // 10/ category != null,  new type != null, province!= null,  city !=null, ward != null------ DUNG CHUNG VOI LAN


        //11/ nếu category == null, new type == null, province!= null,
        // city !=null, ward == null
        public dynamic XSearch10(int categoryofhouseid, string path, int provinceId, int citiId);

        //12/ nếu category == null, new type == null, province!= null,
        // city !=null, ward != null
        public dynamic XSearch11(int categoryofhouseid, string path, int provinceId, int citiId, int wardId);

        public dynamic XSearch12(int typeNewsID, string path, int categoryid);
        public dynamic XSearch13(int typeNewsID, string path, int provinceId);
        public dynamic XSearch14(int typeNewsID, string path, int provinceId, int citiId);
        public dynamic XSearch15(int typeNewsID, string path, int provinceId, int citiId, int wardId);
        public dynamic XSearch16(int typeNewsID, string path, int categoryid, int provinceId);
        public dynamic XSearch17(int typeNewsID, string path, int categoryid, int provinceId, int citiId);
        public dynamic XSearch18(int typeNewsID, string path, int categoryid, int provinceId, int citiId, int wardId);


        public dynamic ShowByCategory(int categoryid, string path);
        public dynamic XSearch19(int categoryid, string path, int provinceId);
        public dynamic XSearch20(int categoryid, string path, int provinceId, int citiId);
        public dynamic XSearch21(int categoryid, string path, int provinceId, int citiId, int wardId);

        public dynamic GetNewByIdShowDetailsPage(int newid, string path);
        public dynamic GetRandomVipNes( string path);


        public dynamic GetListByNewsType(int newstypeid, string path);

        public dynamic GetListByNewsTypeAndAdmin(int newstypeid,string useradmin, string path);

        public dynamic GetListNewsAgent(string useragent);


        public dynamic GetAllListNewsAgent(string useragent);



        //----------------Lan code--------------
        public dynamic ShowVipNews(string path);
        public dynamic ShowSpecialNews(string path);
        public dynamic ShowAllBySeller(string seller, string path);
        public dynamic Search(string keyword, string path);

        public dynamic GetNewsTableById(int newsid);
        //search ở trang Home
        //TH1: nếu Province == null and CatHouse != null and Cat != null
        public dynamic LSearch1(int idCatHouse, int idCat, string path);

        //TH2: province != null and CatHouse != null and Cat != null
        //1. search tất cả city
        public dynamic LSearch2(int idPro, int idCatHouse, int idCat, string path);

        //2. search tất cả ward
        public dynamic LSearch3(int idPro, int idCity, int idCatHouse, int idCat, string path);

        //3.search theo ward
        public dynamic LSearch4(int idPro, int idCity, int idWard, int idCatHouse, int idCat, string path);

        //TH3: province != null and CatHouse == null and Cat != null

        //1. search tất cả city
        public dynamic LSearch5(int idPro, int idCat, string path);
        //2. search tất cả ward
        public dynamic LSearch6(int idPro, int idCity, int idCat, string path);
        //3.search theo ward
        public dynamic LSearch7(int idPro, int idCity, int idWard, int idCat, string path);

        //TH4: province != null and CatHouse != null and Cat == null

        //1. search tất cả city
        public dynamic LSearch8(int idPro, int idCatHouse, string path);//==> xài chung C.Xuân
        //2. search tất cả ward
        //==>search9(int idPro, int idCity, int idCatHouse) ==>xài chung search11 của C.Xuân
        //3.search theo ward
        //==>search10(int idPro, int idCity, int idWard, int idCatHouse) ==>xài chung search12 của C.Xuân

        //TH5: province != null and CatHouse == null and Cat == null

        //1. search tất cả city
        public dynamic LSearch11(int idPro, string path);
        //2. search tất cả ward
        public dynamic LSearch12(int idPro, int idCity, string path);
        //3.search theo ward
        public dynamic LSearch13(int idPro, int idCity, int idWard, string path);

        public dynamic GetNewestNews(string username);
        public bool AddNews(News news);
        public bool UpdateStatusNews(int newsid, News news);
        public dynamic GetListByNewsTypeAndSeller(int newstypeid, string seller, string path);
        public dynamic GetNewsStatusNull(string username);
        //----------------Lan code--------------


        //----------------Dac code---------------

        public bool UpdateNews(News news);

        public bool SetStatusNews(int id , byte newStatus);
        public bool DeleteNews(int id);
        public dynamic ShowAllBySuperAdmin(string path);
        public dynamic GetNewByIdShowDetailsPageBySuperAdmin(int newid, string path);
        public bool CheckCanActiveNew(int idnews);
        //----------------Dac code---------------
    }
}
