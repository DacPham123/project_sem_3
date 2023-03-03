using System;
using System.Collections.Generic;
using BackEnd.WebsocketMessages;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace BackEnd.Models
{
    public partial class DatabaseContext : DbContext
    {
        public DatabaseContext()
        {
        }

        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Account> Accounts { get; set; } = null!;
        public virtual DbSet<CateTofhouse> CateTofhouses { get; set; } = null!;
        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<City> Cities { get; set; } = null!;
        public virtual DbSet<Invoice> Invoices { get; set; } = null!;
        public virtual DbSet<News> News { get; set; } = null!;
        public virtual DbSet<Newsimage> Newsimages { get; set; } = null!;
        public virtual DbSet<Newstype> Newstypes { get; set; } = null!;
        public virtual DbSet<Package> Packages { get; set; } = null!;
        public virtual DbSet<Province> Provinces { get; set; } = null!;
        public virtual DbSet<Reportnews> Reportnews { get; set; } = null!;
        public virtual DbSet<Roleacc> Roleaccs { get; set; } = null!;
        public virtual DbSet<Ward> Wards { get; set; } = null!;

        public DbSet<MessageEntity> Messages { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Connection> Connections { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>(entity =>
            {
                entity.HasKey(e => e.Username)
                    .HasName("PK__account__F3DBC5735BE2ED75");

                entity.ToTable("account");

                entity.Property(e => e.Username)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("username");

                entity.Property(e => e.Accrole).HasColumnName("accrole");

                entity.Property(e => e.Accstatus).HasColumnName("accstatus");

                entity.Property(e => e.Addresss)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("addresss");

                entity.Property(e => e.Agentuser)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("agentuser");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.Fullname)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("fullname");

                entity.Property(e => e.Passwords)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("passwords");

                entity.Property(e => e.Phone)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("phone");

                entity.Property(e => e.Photo)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("photo");

                entity.Property(e => e.Verifycode)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("verifycode");

                entity.HasOne(d => d.AccroleNavigation)
                    .WithMany(p => p.Accounts)
                    .HasForeignKey(d => d.Accrole)
                    .HasConstraintName("FK__account__accrole__267ABA7A");

                entity.HasOne(d => d.AgentuserNavigation)
                    .WithMany(p => p.InverseAgentuserNavigation)
                    .HasForeignKey(d => d.Agentuser)
                    .HasConstraintName("FK__account__agentus__276EDEB3");
            });

            modelBuilder.Entity<CateTofhouse>(entity =>
            {
                entity.ToTable("cateTOFhouse");

                entity.Property(e => e.CateTofhouseid).HasColumnName("cateTOFhouseid");

                entity.Property(e => e.CateTofhousename)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("cateTOFhousename");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("category");

                entity.Property(e => e.Categoryid).HasColumnName("categoryid");

                entity.Property(e => e.Categoryname)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("categoryname");
            });

            modelBuilder.Entity<City>(entity =>
            {
                entity.ToTable("city");

                entity.Property(e => e.Cityid).HasColumnName("cityid");

                entity.Property(e => e.Cityname)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("cityname");

                entity.Property(e => e.Privinceid).HasColumnName("privinceid");

                entity.HasOne(d => d.Privince)
                    .WithMany(p => p.Cities)
                    .HasForeignKey(d => d.Privinceid)
                    .HasConstraintName("FK__city__privinceid__33D4B598");
            });

            modelBuilder.Entity<Invoice>(entity =>
            {
                entity.ToTable("invoice");

                entity.Property(e => e.Invoiceid).HasColumnName("invoiceid");

                entity.Property(e => e.Expire)
                    .HasColumnType("datetime")
                    .HasColumnName("expire");

                entity.Property(e => e.Invoicestatus).HasColumnName("invoicestatus");

                entity.Property(e => e.Packageid).HasColumnName("packageid");

                entity.Property(e => e.Paymentdate)
                    .HasColumnType("datetime")
                    .HasColumnName("paymentdate");

                entity.Property(e => e.Paymentid)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("paymentid");

                entity.Property(e => e.Price)
                    .HasColumnType("decimal(12, 0)")
                    .HasColumnName("price");

                entity.Property(e => e.Username)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("username");

                entity.HasOne(d => d.Package)
                    .WithMany(p => p.Invoices)
                    .HasForeignKey(d => d.Packageid)
                    .HasConstraintName("FK__invoice__package__2E1BDC42");

                entity.HasOne(d => d.UsernameNavigation)
                    .WithMany(p => p.Invoices)
                    .HasForeignKey(d => d.Username)
                    .HasConstraintName("FK__invoice__usernam__2F10007B");
            });

            modelBuilder.Entity<News>(entity =>
            {
                entity.ToTable("news");

                entity.Property(e => e.Newsid).HasColumnName("newsid");

                entity.Property(e => e.Acreage).HasColumnName("acreage");

                entity.Property(e => e.Adstimefrom)
                    .HasColumnType("datetime")
                    .HasColumnName("adstimefrom");

                entity.Property(e => e.Adstimeto)
                    .HasColumnType("datetime")
                    .HasColumnName("adstimeto");

                entity.Property(e => e.Bancony).HasColumnName("bancony");

                entity.Property(e => e.CateTofhouseid).HasColumnName("cateTOFhouseid");

                entity.Property(e => e.Categoryid).HasColumnName("categoryid");

                entity.Property(e => e.Content)
                    .IsUnicode(false)
                    .HasColumnName("content");

                entity.Property(e => e.Createdate)
                    .HasColumnType("datetime")
                    .HasColumnName("createdate");

                entity.Property(e => e.Garden).HasColumnName("garden");

                entity.Property(e => e.Newstatus).HasColumnName("newstatus");

                entity.Property(e => e.Newstypeid).HasColumnName("newstypeid");

                entity.Property(e => e.Nobathroom).HasColumnName("nobathroom");

                entity.Property(e => e.Nobedroom).HasColumnName("nobedroom");

                entity.Property(e => e.Nolivroom).HasColumnName("nolivroom");

                entity.Property(e => e.Price)
                    .HasColumnType("decimal(12, 0)")
                    .HasColumnName("price");

                entity.Property(e => e.Title)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("title");

                entity.Property(e => e.Username)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("username");

                entity.Property(e => e.Wardid).HasColumnName("wardid");

                entity.HasOne(d => d.CateTofhouse)
                    .WithMany(p => p.News)
                    .HasForeignKey(d => d.CateTofhouseid)
                    .HasConstraintName("FK__news__cateTOFhou__3E52440B");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.News)
                    .HasForeignKey(d => d.Categoryid)
                    .HasConstraintName("FK__news__categoryid__3D5E1FD2");

                entity.HasOne(d => d.Newstype)
                    .WithMany(p => p.News)
                    .HasForeignKey(d => d.Newstypeid)
                    .HasConstraintName("FK__news__newstypeid__403A8C7D");

                entity.HasOne(d => d.UsernameNavigation)
                    .WithMany(p => p.News)
                    .HasForeignKey(d => d.Username)
                    .HasConstraintName("FK__news__username__412EB0B6");

                entity.HasOne(d => d.Ward)
                    .WithMany(p => p.News)
                    .HasForeignKey(d => d.Wardid)
                    .HasConstraintName("FK__news__wardid__3F466844");
            });

            modelBuilder.Entity<Newsimage>(entity =>
            {
                entity.HasKey(e => e.Newsimagesid)
                    .HasName("PK__newsimag__84880BFB8FB7627D");

                entity.ToTable("newsimages");

                entity.Property(e => e.Newsimagesid).HasColumnName("newsimagesid");

                entity.Property(e => e.Newsid).HasColumnName("newsid");

                entity.Property(e => e.Photo)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("photo");

                entity.HasOne(d => d.News)
                    .WithMany(p => p.Newsimages)
                    .HasForeignKey(d => d.Newsid)
                    .HasConstraintName("FK__newsimage__newsi__440B1D61");
            });

            modelBuilder.Entity<Newstype>(entity =>
            {
                entity.ToTable("newstype");

                entity.Property(e => e.Newstypeid).HasColumnName("newstypeid");

                entity.Property(e => e.Newstype1)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("newstype");
            });

            modelBuilder.Entity<Package>(entity =>
            {
                entity.ToTable("package");

                entity.Property(e => e.Packageid).HasColumnName("packageid");

                entity.Property(e => e.NoVvipnews).HasColumnName("NoVVipnews");

                entity.Property(e => e.Packagecontent)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("packagecontent");

                entity.Property(e => e.Packagedate).HasColumnName("packagedate");

                entity.Property(e => e.Packageprice)
                    .HasColumnType("decimal(12, 0)")
                    .HasColumnName("packageprice");

                entity.Property(e => e.Packagetitle)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("packagetitle");
            });

            modelBuilder.Entity<Province>(entity =>
            {
                entity.ToTable("province");

                entity.Property(e => e.Provinceid).HasColumnName("provinceid");

                entity.Property(e => e.Provincename)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("provincename");
            });

            modelBuilder.Entity<Reportnews>(entity =>
            {
                entity.HasKey(e => e.Reportid)
                    .HasName("PK__reportne__1C9A425539658A4A");

                entity.ToTable("reportnews");

                entity.Property(e => e.Reportid).HasColumnName("reportid");

                entity.Property(e => e.Cheatreason).HasColumnName("cheatreason");

                entity.Property(e => e.Createdday)
                    .HasColumnType("datetime")
                    .HasColumnName("createdday");

                entity.Property(e => e.Deadline)
                    .HasColumnType("datetime")
                    .HasColumnName("deadline");

                entity.Property(e => e.Fromadmin)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("fromadmin");

                entity.Property(e => e.Fromuser)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("fromuser");

                entity.Property(e => e.Newsid).HasColumnName("newsid");

                entity.Property(e => e.Politicsreason).HasColumnName("politicsreason");

                entity.Property(e => e.Remark).HasColumnName("remark");

                entity.Property(e => e.Reportstatus).HasColumnName("reportstatus");

                entity.Property(e => e.Touser)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("touser");
            });

            modelBuilder.Entity<Roleacc>(entity =>
            {
                entity.HasKey(e => e.Roleid)
                    .HasName("PK__roleacc__CD994BF24E3DEFED");

                entity.ToTable("roleacc");

                entity.Property(e => e.Roleid).HasColumnName("roleid");

                entity.Property(e => e.Roletitle)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("roletitle")
                    .IsFixedLength();
            });

            modelBuilder.Entity<Ward>(entity =>
            {
                entity.ToTable("ward");

                entity.Property(e => e.Wardid).HasColumnName("wardid");

                entity.Property(e => e.Cityid).HasColumnName("cityid");

                entity.Property(e => e.Wardname)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("wardname");

                entity.HasOne(d => d.City)
                    .WithMany(p => p.Wards)
                    .HasForeignKey(d => d.Cityid)
                    .HasConstraintName("FK__ward__cityid__36B12243");
            });

            /**
              * One-to-Many relationship:
              * 1 receiver can receive many messages
              * 1 sender can send many messages
              */
             modelBuilder.Entity<MessageEntity>()
                 .HasOne(m => m.Recipient)
                 .WithMany(u => u.MessagesReceived)
                 .HasForeignKey(m => m.RecipientId)
                 .OnDelete(DeleteBehavior.Restrict);

             modelBuilder.Entity<MessageEntity>()
                 .HasOne(m => m.Sender)
                 .WithMany(u => u.MessagesSent)
                 .HasForeignKey(m => m.SenderId)
                 .OnDelete(DeleteBehavior.Restrict);

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
