using BackEnd.Models;

namespace BackEnd.Services
{
    public interface NewsImagesService
    {
        public dynamic GetNewsImagesById(int newid, string path);
        public dynamic GetNewsImagesDel(int newid);
        public bool DeleteImageByNewsId(int id);
        public bool InsertImage(Newsimage newsImg);
        public bool DeleteImage(int id);
        public dynamic GetNewsImg(int newsimg);
    }
}
