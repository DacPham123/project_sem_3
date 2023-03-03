using BackEnd.Helper;
using BackEnd.Models;
using Microsoft.Graph;
using System.Diagnostics;

namespace BackEnd.Services
{
    public class ReportNewsServiceImpl : ReportNewsService
    {
        private DatabaseContext db;
        public ReportNewsServiceImpl(DatabaseContext _db)
        {
            db = _db;
        }
        //------------------------Xuan

        public dynamic GetReportNewsByAdmin(string username)
        {
            return db.Reportnews
                .Where(c => c.Fromadmin == username && c.Fromuser !=null && (c.Reportstatus ==1 || c.Reportstatus==3 || c.Reportstatus==4) )          
                .Select(c => new
                {
                    Reportid = c.Reportid,
                    Newsid = c.Newsid,
                    Createdday = c.Createdday,
                    Reportstatus = c.Reportstatus,
                    Fromadmin = c.Fromadmin,
                    Touser = c.Touser,
                    Remark = c.Remark,
                    Politicsreason = c.Politicsreason,
                    Cheatreason = c.Cheatreason
                }) .ToList().OrderByDescending(r=>r.Reportid);


        }
        public dynamic GetReportNews(int reportId)
        {
            return db.Reportnews
                .Where(c => c.Reportid == reportId)
                .Select(c => new
                {
                    Reportid = c.Reportid,
                    Newsid = c.Newsid,
                    Createdday = c.Createdday,
                    Reportstatus = c.Reportstatus,
                    Deadline=c.Deadline,
                    Fromuser = c.Fromuser,
                    Fromadmin = c.Fromadmin,
                    Touser = c.Touser,
                    Remark = c.Remark,
                    Politicsreason = c.Politicsreason,
                    Cheatreason = c.Cheatreason
                }).FirstOrDefault();

        }

        public dynamic FindAllReportNews()
        {
            return db.Reportnews.Select(c => new
            {
                Reportid = c.Reportid,
                Newsid = c.Newsid,
                Createdday = c.Createdday,
                Deadline = c.Deadline,
                Fromuser=c.Fromuser,
                Reportstatus = c.Reportstatus,
               
                Fromadmin = c.Fromadmin,
                Touser = c.Touser,
                Remark = c.Remark,
                Politicsreason = c.Politicsreason,
                Cheatreason = c.Cheatreason
            }).ToList();
        }


        public bool CreateReportNews(Reportnews reportnews)
        {
            try
            {
                db.Reportnews.Add(reportnews);
                return db.SaveChanges() > 0;
            }
            catch
            {

                return false;
            }
        }


        public bool UpdateReportNews(Reportnews reportnews)
        {
            try
            {
                db.Entry(reportnews).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                return db.SaveChanges() > 0;
            }
            catch (Exception)
            {
                return false;

            }
        }


        public bool Checkreportexits(int newsid,string username,int season)
        {
            try
            {
                if (season == 1)
                {
                    var getreport = db.Reportnews.Where(s => s.Newsid == newsid && s.Fromuser == username
                    && s.Politicsreason >0 && (s.Reportstatus == 0 || s.Reportstatus == 3))
                       .Select(c => new
                       {
                           Reportid = c.Reportid,
                           Newsid = c.Newsid,
                           Createdday = c.Createdday,
                           Deadline = c.Deadline,
                           Fromuser = c.Fromuser,
                           Reportstatus = c.Reportstatus,

                           Fromadmin = c.Fromadmin,
                           Touser = c.Touser,
                           Remark = c.Remark,
                           Politicsreason = c.Politicsreason,
                           Cheatreason = c.Cheatreason
                       }).OrderByDescending(s=>s.Reportid).FirstOrDefault();

                    if (getreport != null)
                    {
                        return true;
                    }
                }
                else if(season == 2)
                {
                    var getreport = db.Reportnews.Where(s => s.Newsid == newsid && s.Fromuser == username
                   && s.Cheatreason > 0 && (s.Reportstatus == 0 || s.Reportstatus == 3))
                      .Select(c => new
                      {
                          Reportid = c.Reportid,
                          Newsid = c.Newsid,
                          Createdday = c.Createdday,
                          Deadline = c.Deadline,
                          Fromuser = c.Fromuser,
                          Reportstatus = c.Reportstatus,

                          Fromadmin = c.Fromadmin,
                          Touser = c.Touser,
                          Remark = c.Remark,
                          Politicsreason = c.Politicsreason,
                          Cheatreason = c.Cheatreason
                      }).OrderByDescending(s => s.Reportid).FirstOrDefault();


                    if (getreport != null)
                    {
                        return true;
                    }
                }
                

                return false;
            }
            catch
            {
                return false;

            }
        }
        public dynamic GetReportNewsbyNewidAndPolitics(int newsid)
        {
            try
            {
                var l = db.Reportnews.Where(s => s.Newsid == newsid 
                     && s.Politicsreason > 0 && (s.Reportstatus == 0 || s.Reportstatus == 3))
                       .Select(c => new
                       {
                           Reportid = c.Reportid,
                           Newsid = c.Newsid,
                           Createdday = c.Createdday,
                           Deadline = c.Deadline,
                           Fromuser = c.Fromuser,
                           Reportstatus = c.Reportstatus,

                           Fromadmin = c.Fromadmin,
                           Touser = c.Touser,
                           Remark = c.Remark,
                           Politicsreason = c.Politicsreason,
                           Cheatreason = c.Cheatreason
                       }).OrderByDescending(s => s.Reportid).FirstOrDefault();

                if (l !=null)
                {
                    return l;
                }
                else
                {
                    return new
                    {
                        Reportid = 0,
                    };
                }
            }
            catch (Exception)
            {
                return false;

            }
            

        }

        public dynamic GetReportNewsbynewidandCheat(int newsid)
        {
            try
            {
                var l = db.Reportnews.Where(s => s.Newsid == newsid 
                     && s.Cheatreason > 0 && (s.Reportstatus == 0 || s.Reportstatus == 3))
                       .Select(c => new
                       {
                           Reportid = c.Reportid,
                           Newsid = c.Newsid,
                           Createdday = c.Createdday,
                           Deadline = c.Deadline,
                           Fromuser = c.Fromuser,
                           Reportstatus = c.Reportstatus,

                           Fromadmin = c.Fromadmin,
                           Touser = c.Touser,
                           Remark = c.Remark,
                           Politicsreason = c.Politicsreason,
                           Cheatreason = c.Cheatreason
                       }).OrderByDescending(s => s.Reportid).FirstOrDefault();

                if (l != null)
                {
                    return l;
                }
                else
                {
                    return new
                    {
                        Reportid = 0,
                    };
                }
            }
            catch (Exception)
            {
                return false;

            }


        }
        //----------------------------Lan
        public dynamic GetReportNewsToUser(string username)
        {
            return db.Reportnews
                .Where(c => c.Touser == username)
                .Select(c => new
                {
                    Reportid = c.Reportid,
                    Newsid = c.Newsid,
                    Createdday = c.Createdday,
                    Reportstatus = c.Reportstatus,
                    Fromadmin = c.Fromadmin,
                    Politicsreason = c.Politicsreason,
                    Cheatreason = c.Cheatreason,
                    Touser = c.Touser,
                    Remark = c.Remark
                }).ToList();

        }


        //------------------------dac
        public dynamic GetReportSuperAdmin()
        {



            return db.Reportnews.Where(c => (c.Cheatreason >= 10 || c.Politicsreason >= 10)).Select(c => new
            {
                Reportid = c.Reportid,
                Newsid = c.Newsid,
                Createdday = c.Createdday,
                Reportstatus = c.Reportstatus,
                Deadline = c.Deadline,
                Fromuser = c.Fromuser,
                Fromadmin = c.Fromadmin,
                Touser = c.Touser,
                Remark = c.Remark,
                Politicsreason = c.Politicsreason,
                Cheatreason = c.Cheatreason
            }).ToList().GroupBy(item => item.Newsid).SelectMany(g => g.Count() > 1 ? g.Where(s => s.Reportid == g.Max(s => s.Reportid)) : g).OrderByDescending(s => s.Reportid).ToList();

            //return db.Reportnews
            //  .Where(c => c.Cheatreason >= 10 || c.Politicsreason > 10)
            //  .Select(c => new
            //  {
            //      Reportid = c.Reportid,
            //      Newsid = c.Newsid,
            //      Createdday = c.Createdday,
            //      Reportstatus = c.Reportstatus,
            //      Deadline = c.Deadline,
            //      Fromuser = c.Fromuser,
            //      Fromadmin = c.Fromadmin,
            //      Touser = c.Touser,
            //      Remark = c.Remark,
            //      Politicsreason = c.Politicsreason,
            //      Cheatreason = c.Cheatreason
            //  }).ToList();
        }
        public dynamic GetReportByIdInSuperAdmin(int id)
        {
            var reports = db.Reportnews.Where(c => (c.Cheatreason >= 10 || c.Politicsreason >= 10)).Select(c => new
            {
                Reportid = c.Reportid,
                Newsid = c.Newsid,
                Createdday = c.Createdday,
                Reportstatus = c.Reportstatus,
                Deadline = c.Deadline,
                Fromuser = c.Fromuser,
                Fromadmin = c.Fromadmin,
                Touser = c.Touser,
                Remark = c.Remark,
                Politicsreason = c.Politicsreason,
                Cheatreason = c.Cheatreason
            }).ToList().GroupBy(item => item.Newsid).SelectMany(g => g.Count() > 1 ? g.Where(s => s.Reportid == g.Max(s => s.Reportid)) : g).FirstOrDefault(s => s.Newsid == id);

            return reports;

        }
        public bool UpdateReportNewsSuperAdmin(UpdateReportNewsModel updateReportNewsModel)// new 
        {
            try
            {
                var report = db.Reportnews.FirstOrDefault(s => s.Reportid == updateReportNewsModel.Reportid);
                var reports = db.Reportnews.Where(s => s.Newsid == updateReportNewsModel.Newsid).ToList();
                reports.ForEach(s =>
                {
                    s.Reportstatus = updateReportNewsModel.Reportstatus;
                    s.Remark = updateReportNewsModel.Remark;

                });
                var news = db.News.FirstOrDefault(s => s.Newsid == updateReportNewsModel.Newsid);
                news.Newstatus = updateReportNewsModel.Newstatus;
                db.Entry(news).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                var mail = news.UsernameNavigation.Email;
                var mailAdmin = news.UsernameNavigation.Agentuser!=null && news.UsernameNavigation.Agentuser != "" ? news.UsernameNavigation.AgentuserNavigation.Email : "";
      
                var plb = "";
                if (report.Cheatreason >= 10)
                {
                    plb = "Cheat";
                }
                else if (report.Politicsreason >= 10)
                {
                    plb = "Politic";
                }


                var str = "";
                if (updateReportNewsModel.Remark == "" || updateReportNewsModel.Remark == null)
                {
                    str = $"<html><h3> Alert </h3><div> Your news has report {plb}:</div><div> User: {news.Username}</div><div> Id: NewsNo{news.Newsid}</div><div> Title: {news.Title}</div><div> Super admin check and reject</div></html> ";
                }
                else
                {

                    str = $"<html><h3> Alert </h3><div> Your news has report {plb}:</div><div> User: {news.Username}</div><div> Id: NewsNo{news.Newsid}</div><div> Title: {news.Title}</div><div> Super admin check and accpet your news has been lock</div><div>Remark: {updateReportNewsModel.Remark}</div></html> ";


                }

                SendMailHelper.SendMailVerify(mail, str, "Status News");
                if (mailAdmin!="") {
                    SendMailHelper.SendMailVerify(mailAdmin, str, "Status News");
                }

                return db.SaveChanges() > 0;
            }
            catch (Exception)
            {
                return false;

            }
        }
        public bool SetActiveReportNewsSuperAdmin(UpdateReportNewsModel updateReportNewsModel)// new 
        {
            try
            {
                var report = db.Reportnews.FirstOrDefault(s => s.Reportid == updateReportNewsModel.Reportid);
                var reports = db.Reportnews.Where(s => s.Newsid == updateReportNewsModel.Newsid).ToList();
                reports.ForEach(s =>
                {
                    s.Reportstatus = updateReportNewsModel.Reportstatus;
                    s.Remark = updateReportNewsModel.Remark;

                });
                var news = db.News.FirstOrDefault(s => s.Newsid == updateReportNewsModel.Newsid);
                news.Newstatus = updateReportNewsModel.Newstatus;
                db.Entry(news).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                var mail = news.UsernameNavigation.Email;
                var mailAdmin = news.UsernameNavigation.Agentuser != null && news.UsernameNavigation.Agentuser != "" ? news.UsernameNavigation.AgentuserNavigation.Email : "";
                var str = $"<html><h3> Alert </h3><div> User: {news.Username}</div><div> Id: NewsNo{news.Newsid}</div><div> Title: {news.Title}</div><div> Your news has been unlock</div></html> ";

                SendMailHelper.SendMailVerify(mail, str, "Status News");
                if (mailAdmin != "")
                {
                    SendMailHelper.SendMailVerify(mailAdmin, str, "Status News");
                }
                return db.SaveChanges() > 0;
            }
            catch (Exception)
            {
                return false;

            }
        }
        public bool LockNewsSuperAdmin(Reportnews reportnews)
        {
            try
            {
                var check = db.Reportnews.FirstOrDefault(s => s.Newsid == reportnews.Newsid && s.Reportstatus == 5);
                if (check == null)
                {
                    reportnews.Deadline = null;
                    db.Reportnews.Add(reportnews);
                }
                else
                {
                    reportnews.Deadline = null;
                    reportnews.Reportid = check.Reportid;
                    db.Entry(reportnews).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                }
                var news =db.News.FirstOrDefault(s => s.Newsid == reportnews.Newsid);
                news.Newstatus = 3;

                var str = $"<html><h3> Alert </h3><div> User: {news.Username}</div><div> Id: NewsNo{news.Newsid}</div><div> Title: {news.Title}</div><div> Super admin locked your news</div><div>Remark: {reportnews.Remark}</div></html> ";

                var acc = db.Accounts.FirstOrDefault(s => s.Username == reportnews.Touser);
                var mailAdmin = acc.Agentuser != null && acc.Agentuser != "" ? acc.AgentuserNavigation.Email : "";
                SendMailHelper.SendMailVerify(acc.Email, str, "Status News");
                db.Entry(news).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                if (mailAdmin != "")
                {
                    SendMailHelper.SendMailVerify(mailAdmin, str, "Status News");
                }
                return db.SaveChanges() > 0;
            }
            catch (Exception)
            {
                return false;

            }
        }
        public bool DeleteReportNewsSuperLock(int newsId)
        {
            try {
               var re = db.Reportnews.FirstOrDefault(s => s.Newsid == newsId && s.Reportstatus == 5);
                if (re!=null)
                {
                    db.Reportnews.Remove(re);
                }
                return db.SaveChanges() > 0;
            
            }catch { return false; }
        }
    }
}

