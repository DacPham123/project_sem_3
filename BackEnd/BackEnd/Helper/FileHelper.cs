namespace BackEnd.Helpers
{
    public class FileHelper
    {
        public static string GenerateFileName(string fileName)
        {
            var name = Guid.NewGuid().ToString().Replace("-", "");
            var lastIndex = fileName.LastIndexOf('.');
            var ext = fileName.Substring(lastIndex);
            return name + ext;
        }
    }
}
