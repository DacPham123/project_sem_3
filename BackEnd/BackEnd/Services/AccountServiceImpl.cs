using BackEnd.Helper;
using BackEnd.Models;
using System.Diagnostics;

namespace BackEnd.Services
{
    public class AccountServiceImpl : AccountService
    {

        private static Random random = new Random();
        private DatabaseContext db;
        public AccountServiceImpl(DatabaseContext _db)
        {
            db = _db;
        }


        //--------------------------xuan code--------------------------------
        public dynamic GetListAgent(string useradmin, string path)
        {
            return db.Accounts.Where(s => s.Agentuser == useradmin)
                .OrderBy(s => s.Accstatus)
                 .ThenByDescending(n => n.Username)
                .Select(a => new
                {
                    Fullname = a.Fullname,
                    Address = a.Addresss,
                    Photo = path + "/images/account/" + a.Photo,
                    Username = a.Username,
                    Password = a.Passwords,
                    Email = a.Email,
                    Phone = a.Phone,
                    Role = a.Accrole,
                    Accstatus = a.Accstatus
                }).ToList();
        }


        public bool Sendemail(string username)
        {
            try
            {

                var acc = db.Accounts.FirstOrDefault(s => s.Username == username);


                string message = $"<html><p>Your Account has been actived</p></html>";



                SendMailHelper.SendMailVerify(acc.Email, message, "Account status");

                return true;


            }
            catch
            {
                return false;

            }
        }

        public dynamic GetAgent(string path)
        {
            return db.Accounts.Where(a => a.Accrole == 3 && a.Accstatus == 1)
                .Select(a => new
                {
                    FullName = a.Fullname,
                    Address = a.Addresss,
                    Photo = path + "/images/account/" + a.Photo,
                    Username = a.Username,
                    Password = a.Passwords,
                    Email = a.Email,
                    Phone = a.Phone,
                    Role = a.Accrole,
                    Status = a.Accstatus
                });
        }

        public bool UpdateAvatar(string username, Account account)
        {
            try
            {
                var acc = db.Accounts.FirstOrDefault(s => s.Username == username);
                if (acc != null)
                {
                    Debug.WriteLine(acc);
                    Debug.WriteLine(account.Photo);
                    acc.Photo = account.Photo;
                    return db.SaveChanges() > 0;
                }

                return false;
            }
            catch
            {

                return false;
            }
        }

        public dynamic FindAccByUsername(string username)
        {
            return db.Accounts.Where(s => s.Username == username).Select(s => new
            {
                Username = s.Username,
                Accrole = s.Accrole,
                Fullname = s.Fullname,
                Addresss = s.Addresss,
                Phone = s.Phone,
                Photo = s.Photo,
                Email = s.Email,
                Accstatus = s.Accstatus

            }).FirstOrDefault();
        }

        public bool Update(string username, Account account)
        {
            try
            {
                var acc = db.Accounts.FirstOrDefault(s => s.Username == username);
                if (acc != null)
                {
                    acc.Accrole = account.Accrole;
                    acc.Accstatus = account.Accstatus;
                    acc.Fullname = account.Fullname;
                    acc.Addresss = account.Addresss;
                    acc.Phone = account.Phone;
                    acc.Email = account.Email;
                    return db.SaveChanges() > 0;
                }
                return false;
            }
            catch
            {
                return false;

            }
        }
        //-----------------------------------------------------------------------



        //----------------------Dac code-------------

        public int ActiveAccount(string username, string activeCode)
        {
            try
            {
                var account = db.Accounts.Where(x => x.Username.ToLower() == username.ToLower()).FirstOrDefault();
                if (account == null)
                {
                    return 0;
                }
                else if (account.Accstatus != 0)
                {
                    return 1;
                }
                else
                {
                    account.Accstatus = 1;
                    account.Verifycode = "";
                    db.Entry(account).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    if (db.SaveChanges() > 0)
                    {
                        return 2;
                    }
                    else
                    {
                        return 3;
                    }

                }
            }
            catch (Exception)
            {

                return 3;
            }

        }

        public bool CheckDuplicateEmail(string email)
        {
            var e = db.Accounts.FirstOrDefault(x => x.Email == email);
            return e != null;
        }

        public bool CheckDuplicateUsername(string username)
        {
            var u = db.Accounts.FirstOrDefault(x => x.Username.ToLower() == username.ToLower());
            return u != null;
        }

        public bool Create(Account account)
        {
            try
            {
                account.Username = account.Username.ToLower();
                account.Passwords = BCrypt.Net.BCrypt.HashPassword(account.Passwords);
                const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                var verifyCode = new string(Enumerable.Repeat(chars, 20)
                   .Select(s => s[random.Next(s.Length)]).ToArray());
                account.Verifycode = verifyCode;
                string message = $"<html><body><p>Active Message</p><p>Infor Account</p><p>Username : {account.Username}</p><p>Please click this button to active your account</p><button><a href='http://localhost:4200/verify;username={account.Username};activeCode={verifyCode}'>Active</a></button></body></html>";
                db.Accounts.Add(account);
                if (db.SaveChanges() > 0)
                {

                    SendMailHelper.SendMailVerify(account.Email, message, "Verify Account");
                    return true;
                }
                else { return false; }

            }
            catch
            {
                return false;

            }
        }

        public bool Delete(string username)
        {
            try
            {
                db.Accounts.Remove(db.Accounts.FirstOrDefault(s => s.Username.ToLower() == username.ToLower()));
                db.News.RemoveRange(db.News.Where(s => s.Username == username));
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;

            }
        }

        public dynamic FindAll()
        {
            return db.Accounts.Select(s => new
            {
                Username = s.Username,
                Accrole = s.Accrole,
                Fullname = s.Fullname,
                Addresss = s.Addresss,
                Phone = s.Phone,
                Photo = s.Photo,
                Email = s.Email,
                Accstatus = s.Accstatus

            }).ToList();
        }

        public dynamic FindByUsername(string username, string path)
        {
            return db.Accounts.Where(s => s.Username == username).Select(s => new
            {
                Username = s.Username,
                Passwords = s.Passwords,
                Accrole = s.Accrole,
                Fullname = s.Fullname,
                Addresss = s.Addresss,
                Phone = s.Phone,
                Photo = path + "/images/account/" + s.Photo,
                Email = s.Email,
                Accstatus = s.Accstatus,
                Agentuser = s.Agentuser

            }).FirstOrDefault();
        }

        public dynamic FindByUsernameToActive()
        {
            return db.Accounts.Select(s => new
            {
                Username = s.Username,
                Accrole = s.Accrole,
                Fullname = s.Fullname,
                Addresss = s.Addresss,
                Phone = s.Phone,
                Photo = s.Photo,
                Email = s.Email,
                VerifiCode = s.Verifycode,
                Accstatus = s.Accstatus

            }).FirstOrDefault();
        }

        public dynamic Login(string username, string password)
        {
            var acc = db.Accounts.SingleOrDefault(s => s.Username.ToLower() == username.ToLower());
            if (acc != null)
            {
                if (BCrypt.Net.BCrypt.Verify(password, acc.Passwords))
                {
                    return new
                    {
                        Username = acc.Username,
                        Role = acc.AccroleNavigation.Roletitle,
                        Status = acc.Accstatus,
                        StatusAdmin = acc.Accrole == 3?acc.AgentuserNavigation.Accstatus:1

                    };
                }
            }


            return null;

        }

        public bool SendMailVerify()
        {
            try
            {
                SendMailHelper.SendMailVerify("dacvn5672@gmail.com", "asdasd", "asdassdasd");
                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }

        public bool UpdateStatus(string username, byte stt)
        {
            try
            {
                var acc = db.Accounts.FirstOrDefault(s => s.Username.ToLower() == username.ToLower() && s.Accstatus == 1);
                if (acc != null)
                {
                    acc.Accstatus = stt;
                    return db.SaveChanges() > 0;
                }

                return false;
            }
            catch
            {

                return false;
            }
        }

        public string SendVerifyCode(string username)
        {
            try
            {
                var acc = db.Accounts.FirstOrDefault(s => s.Username.ToLower() == username.ToLower());
                const string chars = "0123456789";
                var verifyCode = new string(Enumerable.Repeat(chars, 6)
                   .Select(s => s[random.Next(s.Length)]).ToArray());

                string message = $"<html><p>This is your very code: {verifyCode}</p><p>This code is only valid for 1 minutes</p></html>";



                SendMailHelper.SendMailVerify(acc.Email, message, "Verify Code Reset Password");
                return verifyCode;


            }
            catch
            {
                return "error";

            }
        }

        public string SendResetPass(string username)
        {
            try
            {
                var acc = db.Accounts.FirstOrDefault(s => s.Username.ToLower() == username.ToLower());
                const string up = "ABCDEFJHIJKLMNOPQRSTUVWXYZ";
                const string low = "abcdefjhijklmnopqrstuvwxyz";
                const string num = "0123456789";
                const string cha = "@%#";
                var letterUp = new string(Enumerable.Repeat(up, 1)
                   .Select(s => s[random.Next(s.Length)]).ToArray());
                var letterLow = new string(Enumerable.Repeat(low, 4)
                   .Select(s => s[random.Next(s.Length)]).ToArray());
                var chaS = new string(Enumerable.Repeat(cha, 1)
                   .Select(s => s[random.Next(s.Length)]).ToArray());
                var numS = new string(Enumerable.Repeat(num, 3)
                   .Select(s => s[random.Next(s.Length)]).ToArray());
                var code = letterUp + letterLow + chaS + numS;

                string message = $"<html><p>This is your new password: {code}</p><p>You should change your password</p></html>";


                SendMailHelper.SendMailVerify(acc.Email, message, "New Password");
                acc.Passwords = BCrypt.Net.BCrypt.HashPassword(code);
                db.SaveChanges();

                return code;


            }
            catch
            {
                return "error";

            }
        }

        public dynamic GetAccWithRole(byte role, string path)
        {
            return db.Accounts.Where(s => s.Accrole == role).Select(s => new
            {
                Username = s.Username,
                Accrole = s.Accrole,
                Fullname = s.Fullname,
                Addresss = s.Addresss,
                Phone = s.Phone,
                Photo = path + "/images/account/" + s.Photo,
                Email = s.Email,
                Agentuser = s.Agentuser,
                Accstatus = s.Accstatus,
                Agentstatus = s.Agentuser == null || s.Agentuser == "" ? 1 : s.AgentuserNavigation.Accstatus

            }).ToList();
        }


        public bool CreateBySuperAdmin(Account account)
        {
            try
            {
                account.Username = account.Username.ToLower();
                const string up = "ABCDEFJHIJKLMNOPQRSTUVWXYZ";
                const string low = "abcdefjhijklmnopqrstuvwxyz";
                const string num = "0123456789";
                const string cha = "@%#";
                var letterUp = new string(Enumerable.Repeat(up, 1)
                   .Select(s => s[random.Next(s.Length)]).ToArray());
                var letterLow = new string(Enumerable.Repeat(low, 4)
                   .Select(s => s[random.Next(s.Length)]).ToArray());
                var chaS = new string(Enumerable.Repeat(cha, 1)
                   .Select(s => s[random.Next(s.Length)]).ToArray());
                var numS = new string(Enumerable.Repeat(num, 3)
                   .Select(s => s[random.Next(s.Length)]).ToArray());
                var password = letterUp + letterLow + chaS + numS;
                account.Passwords = BCrypt.Net.BCrypt.HashPassword(password);
                string message = $"<html><body><p>Account Create</p><p>Infor Account</p><p>Username : {account.Username}</p><p>Password : {password}</p><p>Phone: {account.Phone}</p></body></html>";

                db.Accounts.Add(account);
                if (db.SaveChanges() > 0)
                {

                    SendMailHelper.SendMailVerify(account.Email, message, "Your New Account ");
                    return true;
                }
                else { return false; }

            }
            catch
            {
                return false;

            }
        }

        public int UpdateStatusBySuperAdmin(string username, byte stt)
        {
            try
            {
                var acc = db.Accounts.FirstOrDefault(s => s.Username.ToLower() == username.ToLower());
                if (acc != null)
                {
                    byte? ag = acc.Agentuser == null || acc.Agentuser == "" ? 1 : acc.AgentuserNavigation?.Accstatus;
                    if (ag == 4)
                    {
                        return 3;
                    }
                    if ((acc.Accstatus == 3)) { return 4; }
                    if ((stt == 3 || stt == 4) && (acc.Accstatus == 3 || acc.Accstatus == 4)) { return 2; }
                    if (stt != acc.Accstatus)
                    {
                        if (stt == 4)
                        {
                            if (acc.Accrole == 2)
                            {
                                var agent = db.Accounts.Where(s => s.Agentuser == acc.Username).ToList();
                                agent.ForEach(s =>
                                {
                                    var newsInAgent = db.News.Where(x => x.Username == s.Username).ToList();
                                    newsInAgent.ForEach(newsAgnet =>
                                    {
                                        if (newsAgnet.Newstatus != 4)
                                        {
                                            newsAgnet.Newstatus = 3;
                                        }
                                    });
                                });

                            }
                            if (acc.Accrole == 3 || acc.Accrole == 4)
                            {
                                var newsNotAdmin = db.News.Where(x => x.Username == acc.Username).ToList();
                                newsNotAdmin.ForEach(newsAgnet =>
                                {
                                    if (newsAgnet.Newstatus != 4)
                                    {
                                        newsAgnet.Newstatus = 3;
                                    }
                                });
                            }

                        }
                        else if (stt == 1)
                        {
                            if (acc.Accrole == 2)
                            {
                                var agent = db.Accounts.Where(s => s.Agentuser == acc.Username).ToList();
                                agent.ForEach(s =>
                                {
                                    var newsInAgent = db.News.Where(x => x.Username == s.Username).ToList();
                                    newsInAgent.ForEach(newsAgnet =>
                                    {
                                        if (newsAgnet.Newstatus != 4)
                                        {
                                            newsAgnet.Newstatus = 0;
                                        }
                                    });
                                });

                            }
                            if (acc.Accrole == 3 || acc.Accrole == 4)
                            {
                                var newsNotAdmin = db.News.Where(x => x.Username == acc.Username).ToList();
                                newsNotAdmin.ForEach(newsAgnet =>
                                {

                                    if (newsAgnet.Newstatus != 4)
                                    {
                                        var re = CheckReportNews(newsAgnet.Newsid);
                                        if (re != null)
                                        {
                                            newsAgnet.Newstatus = 3;
                                        }
                                        else
                                        {
                                            newsAgnet.Newstatus = 0;
                                        }
                                    }
                                });
                            }

                        }

                        acc.Accstatus = stt;
                        return db.SaveChanges() > 0 ? 1 : 0;
                    }
                    else { return 2; }


                }

                return 0;
            }
            catch
            {
                return 0;
            }
        }

        private Reportnews CheckReportNews(int id)
        {
            var report = db.Reportnews.Where(c => (c.Cheatreason >= 10 || c.Politicsreason >= 10) && c.Reportstatus == 1).ToList().GroupBy(item => item.Newsid).SelectMany(g => g.Count() > 1 ? g.Where(s => s.Reportid == g.Max(s => s.Reportid)) : g).FirstOrDefault(s => s.Newsid == id);
            if (report != null)
            {
                return report;
            }
            else
            {
                return db.Reportnews.FirstOrDefault(s => s.Newsid == id && s.Reportstatus == 5 || s.Reportstatus == 6);
            }

        }



        public bool ChangePass(ChangePass changePass)
        {
            try
            {
                var user = db.Accounts.FirstOrDefault(s => s.Username.ToLower() == changePass.Username.ToLower());
                user.Passwords = BCrypt.Net.BCrypt.HashPassword(changePass.Password);
                db.Entry(user).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }
        public bool SendemailLocked(string username)
        {
            try
            {
                var acc = db.Accounts.FirstOrDefault(s => s.Username == username);


                string message = $"<html><p>Your Account has been locked</p></html>";



                SendMailHelper.SendMailVerify(acc.Email, message, "Account status");

                return true;


            }
            catch
            {
                return false;

            }
        }
        //-------------------------------------------


    }
}
