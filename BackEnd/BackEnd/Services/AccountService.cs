using BackEnd.Models;

namespace BackEnd.Services
{
    public interface AccountService
    {

        //---------------xuan code

        public dynamic GetListAgent(string useradmin, string path);
        public bool Sendemail(string username);
        //-------------Lan code------------------
        public dynamic GetAgent(string path);
        public bool UpdateAvatar(string username, Account account);
        public dynamic FindAccByUsername(string username);
        //--------------------------------------
        //------------------Dac code-----------
        public dynamic FindAll();
        public dynamic FindByUsername(string username, string path);
        public int ActiveAccount(string username, string activeCode);
        public dynamic Login(string username, string password);
        public bool Create(Account account);
        public bool CreateBySuperAdmin(Account account);
        public bool Update(string username, Account account);
        public bool UpdateStatus(string username, byte stt);
        public int UpdateStatusBySuperAdmin(string username, byte stt);
        public bool Delete(string username);
        public bool SendMailVerify();
        public bool CheckDuplicateUsername(string username);
        public bool CheckDuplicateEmail(string email);
        public string SendVerifyCode(string username);
        public string SendResetPass(string username);
        public dynamic GetAccWithRole(byte role, string path);
        public bool ChangePass(ChangePass changePass);
        public bool SendemailLocked(string username);

        //-------------------------------------
    }
}
