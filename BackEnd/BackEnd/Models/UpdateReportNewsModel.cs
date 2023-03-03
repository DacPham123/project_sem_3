namespace BackEnd.Models
{
    public class UpdateReportNewsModel
    {


        public int? Reportstatus { get; set; }
        public string? Remark { get; set; }
        public int Reportid { get; set; }


        public int? Newsid { get; set; }
        public byte? Newstatus { get; set; }
    }
}
