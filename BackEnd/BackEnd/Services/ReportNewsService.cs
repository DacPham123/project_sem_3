using BackEnd.Models;

namespace BackEnd.Services
{
    public interface ReportNewsService
    {
        //----------------------Xuan code-------------------
        public dynamic FindAllReportNews();

        public dynamic GetReportNews(int reportId);

        public bool CreateReportNews(Reportnews reportnews);
        public bool UpdateReportNews(Reportnews reportnews);
        public dynamic GetReportNewsByAdmin(string username);
        public bool Checkreportexits(int newsid, string username, int season);
        public dynamic GetReportNewsbynewidandCheat(int newsid);
        public dynamic GetReportNewsbyNewidAndPolitics(int newsid);
        //-------------------Lan------------------

        public dynamic GetReportNewsToUser(string username);
        //-----------------Dac--------------------
        public dynamic GetReportSuperAdmin();
        public dynamic GetReportByIdInSuperAdmin(int id);
        public bool UpdateReportNewsSuperAdmin(UpdateReportNewsModel updateReportNewsModel);
        public bool SetActiveReportNewsSuperAdmin(UpdateReportNewsModel updateReportNewsModel);
        public bool LockNewsSuperAdmin(Reportnews reportnews);
        public bool DeleteReportNewsSuperLock(int newsId);
    }
}
