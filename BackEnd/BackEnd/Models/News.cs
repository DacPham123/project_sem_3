using System;
using System.Collections.Generic;

namespace BackEnd.Models
{
    public partial class News
    {
        public News()
        {
            Newsimages = new HashSet<Newsimage>();
        }

        public int Newsid { get; set; }
        public DateTime? Createdate { get; set; }
        public int? Categoryid { get; set; }
        public int? CateTofhouseid { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }
        public int? Acreage { get; set; }
        public byte? Nobedroom { get; set; }
        public byte? Nolivroom { get; set; }
        public byte? Nobathroom { get; set; }
        public byte? Garden { get; set; }
        public byte? Bancony { get; set; }
        public int? Wardid { get; set; }
        public decimal? Price { get; set; }
        public int? Newstypeid { get; set; }
        public DateTime? Adstimefrom { get; set; }
        public DateTime? Adstimeto { get; set; }
        public string? Username { get; set; }
        public byte? Newstatus { get; set; }

        public virtual CateTofhouse? CateTofhouse { get; set; }
        public virtual Category? Category { get; set; }
        public virtual Newstype? Newstype { get; set; }
        public virtual Account? UsernameNavigation { get; set; }
        public virtual Ward? Ward { get; set; }
        public virtual ICollection<Newsimage> Newsimages { get; set; }
    }
}
