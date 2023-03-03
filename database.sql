drop database if exists BDS
go
create database BDS
go
use BDS
go
create table roleacc(
roleid int primary key identity,
roletitle char(50)
)
go
create table account(
username varchar(100) primary key ,
passwords varchar(100),
accrole int FOREIGN KEY REFERENCES roleacc(roleid),
fullname varchar(100),
addresss varchar(100),
phone varchar(20),
photo varchar(100),
email varchar(100),
verifycode varchar(100),
agentuser varchar(100),
accstatus tinyint -- 0 là mới tạo chưa kích hoạt tk, 1 là hoạt động, 2 là bị khóa do login sai nhiều lần, 
--3 là bị khóa/delete by admin, 4 là khóa bởi superadmin nhé. chỉ Super admin mới mở khóa được mấy cái accout có accstt là 4
)
go
alter table account add foreign key (agentuser) references account(username)
go
create table package(
packageid int primary key identity ,

packagetitle varchar(100),-- tên gói
packageprice decimal(12,0),-- giá gói
packagedate int,-- số lượng ngày của gói
NoVVipnews tinyint,--so luong tin VIP
NoVipnews tinyint,--so luong tin nổi bật
NoNormalnews tinyint,--so luong tin bình thường
packagecontent varchar(100)-- mô tả gói
)
go
create table newstype(-- bảng loại tin
newstypeid int primary key identity ,---id
newstype varchar(100),-- tên tin, ví dụ "tin VIP", tin thường, tin nổi bật
)
go
create table invoice(-- khi paypal trả về tình trạng thanh toán thành công thì sẽ insert vô bảng này
invoiceid int primary key identity ,
price decimal(12,0),--so tien da tra
packageid int FOREIGN KEY REFERENCES package(packageid),--loại gói
username varchar(100) FOREIGN KEY REFERENCES account(username),--người mua
paymentdate datetime,-- thời điểm mua, bắt đầu tính của gói.
expire  datetime,-- thời điểm hết hạn, sài hết rồi mua tiếp
paymentid varchar(100),
invoicestatus tinyint,--- 0 là new, 1 là upgrade, 3 là hết hạn
)
go

create table province(
provinceid int primary key identity ,
provincename varchar(30)
)
go
create table city(
cityid int primary key identity ,
cityname varchar(30),
privinceid int FOREIGN KEY REFERENCES province(provinceid)
)
go
create table ward(
wardid int primary key identity ,
wardname varchar(30),
cityid int FOREIGN KEY REFERENCES city(cityid)
)
go
create table category(--- bảng này loại nhà: nhà cho thuê, nhà bán
categoryid int primary key identity ,
categoryname varchar(30)
)
go
create table cateTOFhouse(--- bảng này loại nhà: nhà chung cư, nhà đất, nhà văn phòng....
cateTOFhouseid int primary key identity ,
cateTOFhousename varchar(30)
)
go
create table news(
newsid int primary key identity ,
createdate datetime,--ngày tạo tin
categoryid int foreign key references category(categoryid),--loại nhà cho thuê hay bán
cateTOFhouseid int foreign key references cateTOFhouse(cateTOFhouseid),--- loại nhà thuê là loại gì
title varchar(200),--
content varchar(max),--
acreage int,-- diện tích
nobedroom tinyint,--số p ngủ
nolivroom tinyint,--số p khách
nobathroom tinyint,----số p tắm
garden tinyint,--số vườn, nếu ko có vườn là 0
bancony tinyint,--số bancong, nếu ko có bancony là 0
wardid int FOREIGN KEY REFERENCES ward(wardid),--phường nào
price decimal(12,0),--giá
newstypeid int FOREIGN KEY REFERENCES newstype(newstypeid),
adstimefrom datetime ,-- thời gian bắt đầu quảng cáo của tin này
adstimeto datetime ,-- thời gian hết hạn của tin này
username varchar(100) foreign key references account(username),--- người đăng tin
newstatus tinyint
--news status: 0 là bài đăng của agent mới tạo, đợi admin của agent đó duyệt. 
--1 là bài đăng được active/ đang hoạt động ( seller tạo bài đăng sẽ nhảy sang 1 luôn) , 
--2 là bài đăng bị khóa bởi admin, 
--3 là bài đăng bị khóa bởi supper admin,
--4 là bài đăng bị hết hạn
--5 la an boi admin
)
go

create table newsimages(
newsimagesid int primary key identity ,
newsid int foreign key references news(newsid),
photo varchar(100)
)
go

create table reportnews(
reportid int primary key identity,
newsid int ,
createdday datetime,
deadline datetime,
reportstatus int,
fromuser varchar(100),--ng report
fromadmin varchar(100),--supperadmin hoặc admin
touser varchar(100),--ng dang tin
remark nvarchar(max),
politicsreason int,-----an vi ly do chính trị sẽ +1 vô đây
cheatreason int,----moi lan bi an ly do lua dao se +1 lan cout vo day
)
go

create or alter trigger autosetstt_trigger 
on reportnews
after insert 
as
begin
   declare @maxcheat int = (select cheatreason from inserted)
   declare @maxpo int = (select politicsreason from inserted)
   declare @reportid int = (select reportid from inserted)
   declare @newsid int = (select newsid from inserted)
   declare @stt int = (select newstatus from news where newsid = @newsid)
   if @maxcheat >=10 and @stt =1
   begin 
 
		 update reportnews set reportstatus =4, remark=' Warning: Your news has been locked for cheat reasons' where newsid = @newsid and (reportstatus=0 or reportstatus=3)
		 update news set newstatus = 3 where newsid= @newsid and newstatus=1
   end
    if @maxpo >=10 and @stt =1
   begin 
         update reportnews set  remark='Warning: Your news has been hide for politics reason' where newsid = @newsid and (reportstatus=0 or reportstatus=3)
		 update news set newstatus = 5  where newsid=@newsid and newstatus=1
   end
end
go

insert into  roleacc(roletitle) values ('superadmin')
go
insert into  roleacc(roletitle) values ('admin')
go
insert into  roleacc(roletitle) values ('agent')
go
insert into  roleacc(roletitle) values ('privateseller')
go
insert into  roleacc(roletitle) values ('visitor')
go
insert into account(username,passwords,accrole,fullname,addresss,phone,photo,email,accstatus)
values ('superadmin','$2a$10$307cyTHNZITyKITSg5u6HeYoC4jneI0QNfUt55sVKgb0ITT3HkO0y',1,'baby shark','Q1, HO CHI MINH CITY','0904859325','superadmin.jpg',
'roisiestore.hcm@gmail.com',1)
go
insert into account (username,passwords,accrole,fullname,addresss,phone,photo,email,accstatus)
values ('vinhomes','$2a$10$307cyTHNZITyKITSg5u6HeYoC4jneI0QNfUt55sVKgb0ITT3HkO0y',2,'Vinhomes Joint Stock Company','No 458, Minh Khai street, Vinh Tuy ward, Hai Ba Trung distric, Ha Noi','1900 2323 89','admin1.jpg',
'info@vinhomes.vn',2)
go
insert into account (username,passwords,accrole,fullname,addresss,phone,photo,email,accstatus)
values ('novaland','$2a$10$307cyTHNZITyKITSg5u6HeYoC4jneI0QNfUt55sVKgb0ITT3HkO0y',2,'novaland Group','No 65, Nguyen Du street, Ben Nghe ward, distric 1, Ho Chi Minh','1900 63 6666','admin2.jpg',
'dongthithanhxuan.hn@gmail.com',1)
go
insert into account (username,passwords,accrole,fullname,addresss,phone,photo,email,accstatus) values ('sungroup','$2a$10$307cyTHNZITyKITSg5u6HeYoC4jneI0QNfUt55sVKgb0ITT3HkO0y',2,'Sun Group','9 floor, ACB tower, No 218, Bach Dang street, Hai Chau Distric, Da Nang','(0236) 3 819 181','sun.jpg',
'sungroup.customer@gmail.com',2)
go
insert into account(username,passwords,accrole,fullname,addresss,phone,photo,email,accstatus,agentuser)
values ('novaagent1','$2a$10$307cyTHNZITyKITSg5u6HeYoC4jneI0QNfUt55sVKgb0ITT3HkO0y',3,'Duong Duong','Q1, HO CHI MINH CITY','0327384130','agent1.jpg',
'nguyenthilien19821989@gmail.com',1,'novaland')
go
insert into account (username,passwords,accrole,fullname,addresss,phone,photo,email,accstatus,agentuser)
values ('novaagent2','$2a$10$307cyTHNZITyKITSg5u6HeYoC4jneI0QNfUt55sVKgb0ITT3HkO0y',3,'Phan Huu tri','Q1, HO CHI MINH CITY','07749118534','agent2.jpg',
'ng.p.lan315@gmail.com',1,'novaland')
go
insert into account (username,passwords,accrole,fullname,addresss,phone,photo,email,accstatus,agentuser)values ('novaagent3','$2a$10$307cyTHNZITyKITSg5u6HeYoC4jneI0QNfUt55sVKgb0ITT3HkO0y',3,'Pham Danh Dac','Q1, HO CHI MINH CITY','123687687','agent3.jpg',
'roisiestore.hcm112@gmail.com',1,'novaland')
go
insert into account (username,passwords,accrole,fullname,addresss,phone,photo,email,accstatus,agentuser)values ('vinagent1','$2a$10$307cyTHNZITyKITSg5u6HeYoC4jneI0QNfUt55sVKgb0ITT3HkO0y',3,'Dong Thi Thanh Xuan','Q1, HO CHI MINH CITY','03273841300','agent1.jpg',
'roisiestore.hcm113@gmail.com',1,'vinhomes')
go
insert into account (username,passwords,accrole,fullname,addresss,phone,photo,email,accstatus,agentuser)values ('vinagent2','$2a$10$307cyTHNZITyKITSg5u6HeYoC4jneI0QNfUt55sVKgb0ITT3HkO0y',3,'Nguyen Binh Phuong Lan','Q1, HO CHI MINH CITY','07749118530','agent2.jpg',
'roisiestore.hcm114@gmail.com',1,'vinhomes')
go
insert into account (username,passwords,accrole,fullname,addresss,phone,photo,email,accstatus,agentuser)values ('Vinagent3','$2a$10$307cyTHNZITyKITSg5u6HeYoC4jneI0QNfUt55sVKgb0ITT3HkO0y',3,'Pham Danh Dac','Q1, HO CHI MINH CITY','1236876870','agent3.jpg',
'roisiestore.hcm115@gmail.com',1,'vinhomes')
go
insert into account (username,passwords,accrole,fullname,addresss,phone,photo,email,accstatus) values ('seller1','$2a$10$307cyTHNZITyKITSg5u6HeYoC4jneI0QNfUt55sVKgb0ITT3HkO0y',4,'Truong Ngoc Khac Nguyen','Q1, HO CHI MINH CITY','0774911853','seller1.jpg',
'roisiestore.hcm116@gmail.com',1)
go
insert into account (username,passwords,accrole,fullname,addresss,phone,photo,email,accstatus) values ('seller2','$2a$10$307cyTHNZITyKITSg5u6HeYoC4jneI0QNfUt55sVKgb0ITT3HkO0y',4,'Nguyen Binh Phuong Lan','Q1, HO CHI MINH CITY','0774914853','seller2.jpg',
'roisiestore.hcm117@gmail.com',1)
go
insert into account (username,passwords,accrole,fullname,addresss,phone,photo,email,accstatus) values ('visitor3','$2a$10$307cyTHNZITyKITSg5u6HeYoC4jneI0QNfUt55sVKgb0ITT3HkO0y',5,'Huyn Bin','Q1, HO CHI MINH CITY','0774914853','visitor3.jpg',
'roisiestore.hcm117@gmail.com',1)
go
insert into account (username,passwords,accrole,fullname,addresss,phone,photo,email,accstatus)values ('visitor2','$2a$10$307cyTHNZITyKITSg5u6HeYoC4jneI0QNfUt55sVKgb0ITT3HkO0y',5,'Son Ye Jin','Q1, HO CHI MINH CITY','0774914853','visitor2.jpg',
'roisiestore.hcm117@gmail.com',1)
go
insert into account (username,passwords,accrole,fullname,addresss,phone,photo,email,accstatus) values ('visitor1','$2a$10$307cyTHNZITyKITSg5u6HeYoC4jneI0QNfUt55sVKgb0ITT3HkO0y',5,'Khiem Bui','Q1, HO CHI MINH CITY','0774914853','visitor1.jpg',
'roisiestore.hcm118@gmail.com',1)
go
insert into account (username,passwords,accrole,fullname,addresss,phone,photo,email,accstatus,agentuser)
values ('novaagent4','$2a$10$307cyTHNZITyKITSg5u6HeYoC4jneI0QNfUt55sVKgb0ITT3HkO0y',3,'Pham Cong Tuan','Q1, HO CHI MINH CITY','123687687','agent3.jpg',
'novaagent4.hcm112@gmail.com',0,'novaland')
go
insert into account (username,passwords,accrole,fullname,addresss,phone,photo,email,accstatus,agentuser)
values ('novaagent5','$2a$10$307cyTHNZITyKITSg5u6HeYoC4jneI0QNfUt55sVKgb0ITT3HkO0y',3,'Nguyen Trong Nghia','Q1, HO CHI MINH CITY','123687687','agent3.jpg',
'novaagent5.hcm112@gmail.com',2,'novaland')
go
insert into account (username,passwords,accrole,fullname,addresss,phone,photo,email,accstatus,agentuser)
values ('novaagent6','$2a$10$307cyTHNZITyKITSg5u6HeYoC4jneI0QNfUt55sVKgb0ITT3HkO0y',3,'Ha Thanh Hai','Q1, HO CHI MINH CITY','123687687','agent3.jpg',
'novaagent6.hcm112@gmail.com',3,'novaland')
go
insert into account (username,passwords,accrole,fullname,addresss,phone,photo,email,accstatus,agentuser)
values ('novaagent7','$2a$10$307cyTHNZITyKITSg5u6HeYoC4jneI0QNfUt55sVKgb0ITT3HkO0y',3,'Nguyen Van Son','Q1, HO CHI MINH CITY','123687687','agent3.jpg',
'novaagent7.hcm112@gmail.com',4,'novaland')
go
insert into account (username,passwords,accrole,fullname,addresss,phone,photo,email,accstatus,agentuser)
values ('novaagent8','$2a$10$307cyTHNZITyKITSg5u6HeYoC4jneI0QNfUt55sVKgb0ITT3HkO0y',3,'Nguyen Van Son','Q1, HO CHI MINH CITY','123687687','agent3.jpg',
'novaagent7.hcm112@gmail.com',4,'novaland')
go
insert into account (username,passwords,accrole,fullname,addresss,phone,photo,email,accstatus)values ('visitor4','$2a$10$307cyTHNZITyKITSg5u6HeYoC4jneI0QNfUt55sVKgb0ITT3HkO0y',5,'Son Ye Jin','Q1, HO CHI MINH CITY','0774914853','visitor2.jpg',
'roisiestore.hcm117@gmail.com',1)
go
insert into account (username,passwords,accrole,fullname,addresss,phone,photo,email,accstatus)values ('visitor5','$2a$10$307cyTHNZITyKITSg5u6HeYoC4jneI0QNfUt55sVKgb0ITT3HkO0y',5,'Son Ye Jin','Q1, HO CHI MINH CITY','0774914853','visitor2.jpg',
'roisiestore.hcm117@gmail.com',1)
go
insert into account (username,passwords,accrole,fullname,addresss,phone,photo,email,accstatus)values ('visitor6','$2a$10$307cyTHNZITyKITSg5u6HeYoC4jneI0QNfUt55sVKgb0ITT3HkO0y',5,'Son Ye Jin','Q1, HO CHI MINH CITY','0774914853','visitor2.jpg',
'roisiestore.hcm117@gmail.com',1)
go
insert into account (username,passwords,accrole,fullname,addresss,phone,photo,email,accstatus)values ('visitor7','$2a$10$307cyTHNZITyKITSg5u6HeYoC4jneI0QNfUt55sVKgb0ITT3HkO0y',5,'Son Ye Jin','Q1, HO CHI MINH CITY','0774914853','visitor2.jpg',
'roisiestore.hcm117@gmail.com',1)
go
insert into account (username,passwords,accrole,fullname,addresss,phone,photo,email,accstatus)values ('visitor8','$2a$10$307cyTHNZITyKITSg5u6HeYoC4jneI0QNfUt55sVKgb0ITT3HkO0y',5,'Son Ye Jin','Q1, HO CHI MINH CITY','0774914853','visitor2.jpg',
'roisiestore.hcm117@gmail.com',1)
go
insert into account (username,passwords,accrole,fullname,addresss,phone,photo,email,accstatus)values ('visitor9','$2a$10$307cyTHNZITyKITSg5u6HeYoC4jneI0QNfUt55sVKgb0ITT3HkO0y',5,'Son Ye Jin','Q1, HO CHI MINH CITY','0774914853','visitor2.jpg',
'roisiestore.hcm117@gmail.com',1)
go
insert into account (username,passwords,accrole,fullname,addresss,phone,photo,email,accstatus)values ('visitor10','$2a$10$307cyTHNZITyKITSg5u6HeYoC4jneI0QNfUt55sVKgb0ITT3HkO0y',5,'Son Ye Jin','Q1, HO CHI MINH CITY','0774914853','visitor2.jpg',
'roisiestore.hcm117@gmail.com',1)
go



insert into package (packagetitle ,packageprice ,packagedate ,NoVVipnews ,NoVipnews ,NoNormalnews,packagecontent )
values('VVip 1',5100,30,10,10,10,'Full post function with 30 post for all types news and read news for 30 days')
go
insert into package (packagetitle ,packageprice ,packagedate ,NoVVipnews ,NoVipnews ,NoNormalnews,packagecontent )
values('VVip 2',3450,30,7,5,10,'Full post function with 22 post for all types news and read news for 30 days')
go
insert into package (packagetitle ,packageprice ,packagedate ,NoVVipnews ,NoVipnews ,NoNormalnews,packagecontent )
values('VVip 3',1950,30,3,5,10,'Full post function with 15 post for all types news and read news for 30 days')
go
insert into package (packagetitle ,packageprice ,packagedate ,NoVVipnews ,NoVipnews ,NoNormalnews,packagecontent )
values('Company 1',1350,15,2,10,10,'Full post function with 22 post for all types news and read news for 15 days')
go
insert into package (packagetitle ,packageprice ,packagedate ,NoVVipnews ,NoVipnews ,NoNormalnews,packagecontent )
values('Company 2',1050,15,0,10,10,'Full post function with 20 post for special news,ordinary news. Read news for 15 days')
go
insert into package (packagetitle ,packageprice ,packagedate ,NoVVipnews ,NoVipnews ,NoNormalnews,packagecontent )
values('Company 3',675,15,0,5,10,'Full post function with 15 post for special news,ordinary news. Read news for 15 days')
go
insert into package (packagetitle ,packageprice ,packagedate ,NoVVipnews ,NoVipnews ,NoNormalnews,packagecontent )
values('Economy 1',260,10,1,2,3,'Full post function with 6 post for all types news and read news for 10 days')
go
insert into package (packagetitle ,packageprice ,packagedate ,NoVVipnews ,NoVipnews ,NoNormalnews,packagecontent )
values('Economy 2',200,10,0,3,5,'Full post function with 7 post for special news,ordinary news. Read news for 10 days')
go
insert into package (packagetitle ,packageprice ,packagedate ,NoVVipnews ,NoVipnews ,NoNormalnews,packagecontent )
values('Economy 3',170,10,0,1,6,'Full post function with 7 post for special news,ordinary news. Read news for 10 days')
go
insert into package (packagetitle ,packageprice ,packagedate ,NoVVipnews ,NoVipnews ,NoNormalnews,packagecontent )
values('Economy 4',450,45,1,0,0,'Full post function with 1 post for Vip news. Read news for 45 days')
go
insert into package (packagetitle ,packageprice ,packagedate ,NoVVipnews ,NoVipnews ,NoNormalnews,packagecontent )
values('Economy 5',225,45,0,1,0,'Full post function with 1 post for special news. Read news for 45 days')
go
insert into package (packagetitle ,packageprice ,packagedate ,NoVVipnews ,NoVipnews ,NoNormalnews,packagecontent )
values('Economy 6',90,45,0,0,1,'Full post function with 1 post for ordinary news. Read news for 45 days')
go
insert into package (packagetitle ,packageprice ,packagedate ,NoVVipnews ,NoVipnews ,NoNormalnews,packagecontent )
values('Save 1',10,1,1,0,0,'Full post function with 1 post Vip for news on 1 days. You Can not read news')
go
insert into package (packagetitle ,packageprice ,packagedate ,NoVVipnews ,NoVipnews ,NoNormalnews,packagecontent )
values('Save 2',5,1,0,1,0,'Full post function with 1 post special for news on 1 days. You Can not read news')
go
insert into package (packagetitle ,packageprice ,packagedate ,NoVVipnews ,NoVipnews ,NoNormalnews,packagecontent )
values('Save 3',20,1,0,0,1,'Full post function with 1 post ordinary for news on 1 days. You Can not read news')
go

insert into invoice(price , packageid ,username  ,paymentdate  ,expire   ,invoicestatus ,paymentid  )
values(51000 ,1,'vinhomes',cast('2022-04-11' as date),cast('2022-06-08' as date), 0,'CSDEE23425F')
go
insert into invoice(packageid  ,price ,username  ,paymentdate  ,expire   ,invoicestatus,paymentid   )
values(12,900 ,'novaland',cast('2022-04-08' as date),cast('2022-06-06' as datetime),3,'675GFSDFGQ')
go
insert into invoice(packageid  ,price ,username  ,paymentdate  ,expire   ,invoicestatus,paymentid   )
values(8,2000,'seller2',cast('2022-04-11' as date),cast('2022-04-21' as date),0,'436TDFVBs')
go
insert into invoice(packageid  ,price ,username  ,paymentdate  ,expire   ,invoicestatus,paymentid   )
values(7, 260,'seller1',cast('2022-06-10' as date),cast('2022-06-20' as date),0,'673VDSF2R1')
go
insert into invoice(packageid  ,price ,username  ,paymentdate  ,expire   ,invoicestatus,paymentid   )
values(1,510000,'vinhomes',cast('2022-06-11' as date),cast('2022-08-06' as date),0,'VFDSY634Q52')
go
insert into invoice(packageid  ,price ,username  ,paymentdate  ,expire   ,invoicestatus ,paymentid  )
values(1,2750,'novaland',cast('2022-06-01' as date),cast('2022-06-06' as date),3,'VEW5R324VSF')
go
insert into invoice(packageid  ,price ,username  ,paymentdate  ,expire   ,invoicestatus,paymentid   )
values(3,1950,'novaland',cast('2022-06-06' as date),cast('2022-07-05' as date),0,'125RJMIYO786')
go
insert into invoice(packageid  ,price ,username  ,paymentdate  ,expire   ,invoicestatus,paymentid   )
values(8,2000,'seller2',cast('2022-06-11' as date),cast('2022-06-21' as date),0,'8E45BSDFGASG')
go
insert into invoice(packageid  ,price ,username  ,paymentdate  ,expire   ,invoicestatus  ,paymentid  )
values(3,1950,'novaland',cast('2022-06-07' as date),cast('2022-07-05' as date),1,'965GWTERQWRF')
go

insert into category(categoryname)
values('Sell')
insert into category(categoryname)
values('Rent')

insert into cateTOFhouse(cateTOFhousename)
values('Apartmanet')
insert into cateTOFhouse(cateTOFhousename)
values('Shophouse')
insert into cateTOFhouse(cateTOFhousename)
values('House')
insert into cateTOFhouse(cateTOFhousename)
values('Mansion')
insert into cateTOFhouse(cateTOFhousename)
values('Villa')
insert into cateTOFhouse(cateTOFhousename)
values('Land')

insert into newstype(newstype)
values('VIP')
insert into newstype(newstype)
values('Special')
insert into newstype(newstype)
values('Ordinary')

insert into province(provincename)
values('Ho Chi Minh')
insert into province(provincename)
values('Ha Noi')
insert into province(provincename)
values('Da Nang')
insert into province(provincename)
values('Khanh Hoa')
insert into province(provincename)
values('Lam Dong')

--HO CHI MINH
insert into city(cityname, privinceid)
values('Thu Duc City', 1)
insert into city(cityname, privinceid)
values('District 1', 1)
insert into city(cityname, privinceid)
values('District 3', 1)
insert into city(cityname, privinceid)
values('District 7', 1)
insert into city(cityname, privinceid)
values('District Binh Thanh', 1)
insert into city(cityname, privinceid)
values('Nha Be', 1)

--HA NOI
insert into city(cityname, privinceid)
values('District Ba Dinh', 2)
insert into city(cityname, privinceid)
values('District Dong Da', 2)
insert into city(cityname, privinceid)
values('District Hoan Kiem', 2)
insert into city(cityname, privinceid)
values('District Cau Giay', 2)
insert into city(cityname, privinceid)
values('District Tay Ho', 2)
insert into city(cityname, privinceid)
values('District Thanh Xuan', 2)

--DA NANG
insert into city(cityname, privinceid)
values('District Hai Chau', 3)
insert into city(cityname, privinceid)
values('District Thanh Khe', 3)
insert into city(cityname, privinceid)
values('District Lien Chieu', 3)
insert into city(cityname, privinceid)
values('District Son Tra', 3)
insert into city(cityname, privinceid)
values('District Cam Le', 3)

--KHANH HOA
insert into city(cityname, privinceid)
values('Nha Trang City', 4)
insert into city(cityname, privinceid)
values('Cam Ranh City', 4)

--LAM DONG
insert into city(cityname, privinceid)
values('Da Lat City', 5)
insert into city(cityname, privinceid)
values('Bao Loc City', 5)

--Thu Duc
insert into ward(wardname, cityid)
values('Thao Dien', 1)
insert into ward(wardname, cityid)
values('An Phu', 1)
insert into ward(wardname, cityid)
values('Thu Thiem', 1)
insert into ward(wardname, cityid)
values('Phu Huu', 1)
insert into ward(wardname, cityid)
values('Phuoc Long A', 1)
insert into ward(wardname, cityid)
values('Phuoc Long B', 1)
insert into ward(wardname, cityid)
values('Linh Trung', 1)

--Dist. 1
insert into ward(wardname, cityid)
values('Ben Nghe', 2)
insert into ward(wardname, cityid)
values('Ben Thanh', 2)
insert into ward(wardname, cityid)
values('Da Kao', 2)
insert into ward(wardname, cityid)
values('Tan Dinh', 2)
insert into ward(wardname, cityid)
values('Ben Nghe', 2)

--Dist. 3
insert into ward(wardname, cityid)
values('Ward 1', 3)
insert into ward(wardname, cityid)
values('Ward 2', 3)
insert into ward(wardname, cityid)
values('Ward 3', 3)
insert into ward(wardname, cityid)
values('Ward Vo Thi Sau', 3)
insert into ward(wardname, cityid)
values('Ward 4', 3)
insert into ward(wardname, cityid)
values('Ward 5', 3)
insert into ward(wardname, cityid)
values('Ward 10', 3)

--Dist. 7
insert into ward(wardname, cityid)
values('Tan Hung', 4)
insert into ward(wardname, cityid)
values('Tan Quy', 4)
insert into ward(wardname, cityid)
values('Tan Phong', 4)
insert into ward(wardname, cityid)
values('Tan Thuan Dong', 4)
insert into ward(wardname, cityid)
values('Tan Thuan Tay', 4)


--Binh Thanh
insert into ward(wardname, cityid)
values('Ward 10', 5)
insert into ward(wardname, cityid)
values('Ward 12', 5)
insert into ward(wardname, cityid)
values('Ward 14', 5)
insert into ward(wardname, cityid)
values('Ward 15', 5)
insert into ward(wardname, cityid)
values('Ward 20', 5)
insert into ward(wardname, cityid)
values('Ward 22', 5)
insert into ward(wardname, cityid)
values('Ward 25', 5)

--Nha Be
insert into ward(wardname, cityid)
values('Tan Quy Dong', 6)
insert into ward(wardname, cityid)
values('Tan Quy Tay', 6)
insert into ward(wardname, cityid)
values('Phu Xuan', 6)
insert into ward(wardname, cityid)
values('Phuoc Kien', 6)
insert into ward(wardname, cityid)
values('Hiep Phuoc', 6)

--Ba Dinh
insert into ward(wardname, cityid)
values('Ngoc Ha', 7)
insert into ward(wardname, cityid)
values('Doi Can', 7)
insert into ward(wardname, cityid)
values('Truc Bach', 7)
insert into ward(wardname, cityid)
values('Giang Vo', 7)
insert into ward(wardname, cityid)
values('Lieu Giai', 7)
insert into ward(wardname, cityid)
values('Dien Bien', 7)

--Dong Da
insert into ward(wardname, cityid)
values('Cat Linh', 8)
insert into ward(wardname, cityid)
values('Lang Ha', 8)
insert into ward(wardname, cityid)
values('Lang Thuong', 8)
insert into ward(wardname, cityid)
values('Kim Lien', 8)
insert into ward(wardname, cityid)
values('Quang Trung', 8)
insert into ward(wardname, cityid)
values('Kham Thien', 8)

--Hoan Kiem
insert into ward(wardname, cityid)
values('Chuong Duong', 9)
insert into ward(wardname, cityid)
values('Dong Xuan', 9)
insert into ward(wardname, cityid)
values('Hang Bac', 9)
insert into ward(wardname, cityid)
values('Hang Ma', 9)
insert into ward(wardname, cityid)
values('Hang Trong', 9)
insert into ward(wardname, cityid)
values('Trang Tien', 9)
insert into ward(wardname, cityid)
values('Tran Hung Dao', 9)

--Cau Giay
insert into ward(wardname, cityid)
values('Dich Vong', 10)
insert into ward(wardname, cityid)
values('Nghia Tan', 10)
insert into ward(wardname, cityid)
values('Nghia Do', 10)
insert into ward(wardname, cityid)
values('Trung Hoa', 10)
insert into ward(wardname, cityid)
values('Yen Hoa', 10)

--Tay Ho
insert into ward(wardname, cityid)
values('Buoi', 11)
insert into ward(wardname, cityid)
values('Thuy Khe', 11)
insert into ward(wardname, cityid)
values('Nhat Tan', 11)
insert into ward(wardname, cityid)
values('Quang An', 11)
insert into ward(wardname, cityid)
values('Phu Thuong', 11)

--Thanh Xuan
insert into ward(wardname, cityid)
values('Ha Dinh', 12)
insert into ward(wardname, cityid)
values('Kim Giang', 12)
insert into ward(wardname, cityid)
values('Khuong Trung', 12)
insert into ward(wardname, cityid)
values('Khuong Mai', 12)
insert into ward(wardname, cityid)
values('Khuong Trung', 12)
insert into ward(wardname, cityid)
values('Thuong Dinh', 12)

--Hai Chau
insert into ward(wardname, cityid)
values('Hai Chau 1', 13)
insert into ward(wardname, cityid)
values('Hai Chau 2', 13)
insert into ward(wardname, cityid)
values('Thanh Binh', 13)
insert into ward(wardname, cityid)
values('Hoa Cuong Nam', 13)
insert into ward(wardname, cityid)
values('Hoa Cuong Bac', 13)

--Thanh Khe
insert into ward(wardname, cityid)
values('An Khe', 14)
insert into ward(wardname, cityid)
values('Hoa Khe', 14)
insert into ward(wardname, cityid)
values('Thanh Khe Dong', 14)
insert into ward(wardname, cityid)
values('Thanh Khe Tay', 14)
insert into ward(wardname, cityid)
values('Thac Gian', 14)
insert into ward(wardname, cityid)
values('Chinh Gian', 14)

--Lien Chieu
insert into ward(wardname, cityid)
values('Hoa Minh', 15)
insert into ward(wardname, cityid)
values('Hoa Khanh Nam', 15)
insert into ward(wardname, cityid)
values('Hoa Khanh Bac', 15)

--Son Tra
insert into ward(wardname, cityid)
values('Tho Quang', 16)
insert into ward(wardname, cityid)
values('Phuoc My', 16)
insert into ward(wardname, cityid)
values('An Hai Bac', 16)
insert into ward(wardname, cityid)
values('An Hai Dong', 16)

--Cam Le
insert into ward(wardname, cityid)
values('Khue Trung', 17)
insert into ward(wardname, cityid)
values('Hoa An', 17)
insert into ward(wardname, cityid)
values('Hoa Phat', 17)
insert into ward(wardname, cityid)
values('Hoa Xuan', 17)

--Nha Trang
insert into ward(wardname, cityid)
values('Vinh Truong', 18)
insert into ward(wardname, cityid)
values('Vinh Nguyen', 18)
insert into ward(wardname, cityid)
values('Vinh Hai', 18)
insert into ward(wardname, cityid)
values('Vinh Hoa', 18)
insert into ward(wardname, cityid)
values('Phuoc Tien', 18)
insert into ward(wardname, cityid)
values('Phuoc Tho', 18)
insert into ward(wardname, cityid)
values('Phuoc Hai', 18)

--Cam Ranh
insert into ward(wardname, cityid)
values('Cam Nghia', 19)
insert into ward(wardname, cityid)
values('Cam Loi', 19)
insert into ward(wardname, cityid)
values('Cam Loc', 19)
insert into ward(wardname, cityid)
values('Cam Thuan', 19)

--Da Lat
insert into ward(wardname, cityid)
values('Ward 1', 20)
insert into ward(wardname, cityid)
values('Ward 2', 20)
insert into ward(wardname, cityid)
values('Ward 3', 20)
insert into ward(wardname, cityid)
values('Ward 5', 20)
insert into ward(wardname, cityid)
values('Ward 7', 20)
insert into ward(wardname, cityid)
values('Ward 8', 20)
insert into ward(wardname, cityid)
values('Ward 10', 20)
insert into ward(wardname, cityid)
values('Ward 12', 20)

--Bao Loc
insert into ward(wardname, cityid)
values('Loc Phat', 21)
insert into ward(wardname, cityid)
values('Loc Son', 21)
insert into ward(wardname, cityid)
values('Loc Tien', 21)
insert into ward(wardname, cityid)
values('Loc Chau', 21)
insert into ward(wardname, cityid)
values('Loc Nga', 21)
go

insert into news(createdate,categoryid,cateTOFhouseid,title,[content],acreage,nobedroom,nobathroom, nolivroom,garden, bancony, wardid, price,newstypeid,adstimefrom,adstimeto,username,newstatus)
values(cast('2022-06-01' as date),1,1,'GENERAL OFFER QUICK SALE PRICE 2 BR, 88M2, VINHOMES CENTRAL PARK, LANDMARK AREA','The price is only 6.15 billion. Already have a book, quick name change.<br>
- Permanently owned apartment, Landmark 2 area, corner unit, nice view, full European furniture. New interior as pictured.<br>
- High-class facilities: Marina, BBQ area, swimming pool, gym (free), spa, Saigon top shopping entertainment area, hospital, international school, outdoor sports area, 17ha park ...<br>
Contact Huyen Tel 0938616353 for more details.',25,2,2,1,0,1,30,40000,1,'2022-06-08','2022-07-07','novaagent2',1)
go
insert into newsimages(newsid, photo)
values(1,'img1.jpg')
go
insert into newsimages(newsid, photo)
values(1,'img2.jpg')
go
insert into newsimages(newsid, photo)
values(1,'img3.jpg')
go
insert into news(createdate,categoryid,cateTOFhouseid,title,[content],acreage,nobedroom,nobathroom, nolivroom,garden, bancony,wardid, price,newstypeid,adstimefrom,adstimeto,username,newstatus)
values(cast('2022-06-03' as date),2,1,'LUXURY APARTMENT FURNITURE FURNITURE','- The apartment has wooden floors, large windows, separate drying balcony, very convenient.<br>
- The bedroom is equipped with 2-way air conditioner, bed, mattress, wardrobe, chalkboard,
The windows have beautiful sun-blocking curtains, plaster ceilings, and enough night lights.<br>
- Kitchen and guest room have kitchen table, kitchen cabinet, refrigerator, dining table, hood, good sink, sofa, television.<br>
- The toilet has high-class Inax sanitary ware, luxurious Prime tiles. There is a hot and cold water heater, a modern design shower wall.<br>
- The building is equipped with high-class elevator, washing machine, high-speed internet, each apartment is issued a card from its own elevator. Shared washing machine on 1st floor.<br>
- The building has 24/24 security so security is very good, fingerprint door lock, easy access, spacious garage DT 300m2, can accommodate up to 200 motorbikes. Fingerprint door lock.</html>',
30,3,2,1,0,1,16,10000000,1,'2022-06-08','2022-07-07','novaagent2',1)
go
insert into newsimages(newsid, photo)
values(2,'img4.jpg')
go
insert into newsimages(newsid, photo)
values(2,'img5.jpg')
go
insert into newsimages(newsid, photo)
values(2,'img6.jpg')
go
insert into news(createdate,categoryid,cateTOFhouseid,title,[content], acreage,nobedroom,nobathroom, nolivroom,garden, bancony,wardid, price,newstypeid,adstimefrom,adstimeto,username,newstatus)
values(cast('2022-05-30' as date),1,3,'VINHOMES GALLERY GIANG VO - WHICH ARCHITECTURE TO BECOME A SYMBOL OF THE ELITE?','If you are interested, please contact Sales Manager and Model House: 0946928*** Register to receive detailed information about the official design of the Vinhomes Gallery Giang Vo project from Vingroup. We are committed to accepting reservations for beautiful floors in the project.<br>
I. Project information:<br>
Vinhomes Gallery is a complex of high-class apartments, Shophouse, office area, supermarket, and commercial center deployed by the investor Vingroup on a land fund of nearly 10 hectares at the intersection between two streets. Giang Vo and Ngoc Khanh, Ba Dinh district.<br>
- Project address: No. 148 Giang Vo, Ba Dinh district, Hanoi city.<br>
- Project scale: Including 10 high-class apartment buildings.<br>
- Types of apartments: Estimated from 1 to 5 bedrooms.<br>
- Start date: October 2016.<br>
- Time of handover: Expected in the fourth quarter of 2019.<br>
- Ownership form: Forever.<br>
II. The most beautiful golden location in Ba Dinh district.<br>
- Located at the intersection between the two busiest streets in Ba Dinh district, Giang Vo and Ngoc Khanh, Vinhomes Gallery apartment inherits the entire infrastructure in sync with famous shopping malls and food courts. sound along with the fresh air of Giang Vo lake right next door.
From the Vinhomes Gallery project, you can easily move to the central areas of Hanoi city, it only takes:<br>
+ 1 minute to Giang Vo lake.<br>
+ 5 minutes to Thu Le Park.<br>
+ 7 minutes to Hanoi University of Culture, University of Industrial Fine Arts.<br>
+ 10 minutes to Ho Chi Minh Mausoleum.<br>
+ 10 minutes to windy Tay Ho.<br>
+ 10 minutes to Trung Hoa Nhan Chinh urban areas, Royal City Nguyen Trai.<br>
+ 15 minutes to Hoan Kiem Lake, the center of the capital.<br>
III. Design:<br>
The design floor of Vinhomes Gallery is expected to be designed by Vingroup with apartment types of 1; 1.5; 2; 2.5; 3.5; 4; 5 bedrooms. The apartment area is expected to be as follows:<br>
Apartment 1 - 1.5 bedrooms: Estimated area 45m2 - 55m2.<br>
Apartment 2 - 2.5 bedrooms: Estimated area 60m2 - 80m2.<br>
Apartment 3 - 3.5 bedrooms: Estimated area 90m2 -120m2.<br>
4-bedroom apartment: Estimated area 140m2 - 160m2.<br>
5-bedroom apartment: Estimated area over 170m2.<br>
(The information about the types of areas is tentative for customers to refer to in advance, not the official area announced by the investor due to the need for further adjustment).<br>
To receive details of the official design of Vinhomes Gallery project from Vingroup, please register with us via hotline:<br>
Sales manager and model house: 0946928***.<br>
Website: http://vinhomesgallery-148giangvo.com/ <br>
Sincerely thank!',80,3,2,1,1,1,40,55000000,3,'2022-05-30','2022-06-08','vinagent2', 4)
go
insert into newsimages(newsid, photo)
values(3,'img7.jpg')
go
insert into newsimages(newsid, photo)
values(3,'img8.jpg')
go
insert into news(createdate,categoryid,cateTOFhouseid,title,[content],acreage,nobedroom,nobathroom, nolivroom,garden, bancony,wardid, price,newstypeid,adstimefrom,adstimeto,username,newstatus)
values(cast('2022-05-05' as date),1,6,'OPENING PHASE 2 KDC SADECO, LE VAN LUONG, DISTRICT 7, AFTER VIVO CITY, 82M2 AVAILABLE, GOOD PRICE INVESTOR','Golden location: Le Van Luong Street, Nguyen Van Linh, Tan Phong Ward, District 7. Behind SC Vivo City.<br>
- 82m2 floor (preferential price is only applicable for the first week). <br>
- The original price of the investor is only 3 billion 190 million / 82m2 <br>
- Diversified floor area 82m2, 100m2, 162m2 <br>
Bank support up to 70%, extremely low interest rates. <br>
- Location: <br>
+ Right at the People s Committee of Tan Phong ward. <br>
+ Adjacent to Ton Duc Thang university cluster and People s Police University, RMIT University. <br>
+ Near Tan Quy Dong resettlement area. <br>
+ 200m from the main road Nguyen Van Linh - Nguyen Thi Thap. <br>
+ Near the chain of Korean BBQ restaurants, Sumo, Kichi - Kichi,... <br>
Utilities: <br>
+ Road frontage 32m wide. <br>
+ The area has a cool green park . <br>
+ Right at the utility clusters: Hospital, school, People s Committee, bus station only takes 5 minutes to move. <br>
Contact: 0902668625 Dai Phat (Sales Manager). <br>
- Investment Opportunities: <br>
+ Located right on the street, the road is being upgraded and expanded from 16m to 32m. <br>
+ Adjacent to SC Vivo City Trade Center. <br>
+ Separate pink book for each foundation, built freely. <br>
Contact 0902668625 Dai Phat (TPKD).',100,0,0,0,0,1,22,2000000, 3,'2022-05-05','2022-06-01','novaagent2',4)
go

insert into newsimages(newsid, photo)
values(4,'img9.jpg')
go
insert into newsimages(newsid, photo)
values(4,'img10.jpg')
go
insert into news(createdate,categoryid,cateTOFhouseid,title,[content],acreage,nobedroom,nobathroom, nolivroom,garden, bancony,wardid, price,newstypeid,adstimefrom,adstimeto,username,newstatus)
values(cast('2022-06-04' as date),1,2,'SELLING A 2-STOREY SHOP WITH STREET FRONTAGE: NO. 7 BUILDING B14 MP PHAM NGOC THACH, HANOI','The owner sells the shop with 2 floors on the street: No. 7 Building B14, Pham Ngoc Thach street, Dong Da, Hanoi. <br>
Area: 27.3 m2x 2 floors = 54.6 m2. <br>
Red book owner. <br>
The kiosk is currently working as a For Me clothing store. MT 4.8m. Currently renting 480 million / 1 year. <br>
Selling price: 12.8 billion VND. <br>
Contact: Anh Dung 0913 590 799',55,0,0,2,0,0,46,1500000, null,null,null,'novaagent3', 1)
go
insert into newsimages(newsid, photo)
values(5,'img11.jpg')
go
insert into newsimages(newsid, photo)
values(5,'img12.jpg')
go
insert into news(createdate,categoryid,cateTOFhouseid,title,[content],acreage,nobedroom,nobathroom, nolivroom,garden, bancony,wardid, price,newstypeid,adstimefrom,adstimeto,username,newstatus)
values(cast('2022-06-06' as date),1,6,'SELL 5 BUILDING 1000M2 (13X78)M 100M2 BUILDING. PRINCIPAL ROLL BOOKING COMMITTED TO THE CHEAPEST PRICE COMPLEX TO THE YOUNG MARKET','
Selling 5 plots of 1000m2 (1 acre of land 13x78m) including 100m2 of residential land (residential can be full if customers have demand). The main product should be safe in terms of legality. <br>
The land is located on the earth and is surrounded by a solid iron fence, creating a beautiful appearance for the land. <br>
- On the land currently growing Macca and green fruit trees. <br>
- The land is located in Nam Ha commune - Lam Ha district. <br>
- From the location of our land, it only takes 5km to go to 2 tourist areas Elephant Waterfall and Linh An Tu Pagoda (the highest statue of Quan Yin in Southeast Asia). <br>
- We go to Lien Khuong airport and Da Lat only 20km. <br>
- Around the 2km radius, you can go to the center of Nam Ha commune: medical station, school, market, People s Committee... <br>
- The current price is 15% lower than the market. The land is suitable for investment customers as well as a very suitable resort. <br>
- Surrounding is the resort of the majority of households leaving the city to the forest and enjoy the cool air of Lam Dong. <br>
- Price 2,250 billion/lot (including all transfer costs for customers). <br>
- Let s own an interesting plot of land to relax with family. <br>
Please contact: 0911.733.248 Mr Sy.',100,0,0,0,0,0,116,100000, 1,'2022-06-08','2022-07-07','novaagent2',1)
go
insert into newsimages(newsid, photo)
values(6,'img13.jpg')
go
insert into newsimages(newsid, photo)
values(6,'img14.jpg')
go
insert into news(createdate,categoryid,cateTOFhouseid,title,[content],acreage,nobedroom,nobathroom, nolivroom,garden, bancony,wardid, price,newstypeid,adstimefrom,adstimeto,username,newstatus)
values(cast('2022-06-11' as date),1,2,'HABORIZON NHA TRANG, LAND FOR SEA VILLA, KHANH HOA','On April 8, Mr. Do Anh Thy - Deputy Director of Khanh Hoa Department of Agriculture and Rural Development (Agriculture and Rural Development) affirmed that the entire project area of ​​Haborizon Nha Trang urban area (Phuoc Dong commune, Nha Trang City) is outside the forestry development plan. Contact: 0933113768. <br>
Investor: Green World Construction Investment Company Limited. <br>
Location: Hon Ro, Nha Trang, Khanh Hoa. <br>
Scale: 14ha, including 429 villas. <br>
Types of area: 120 - 480 m2. <br>
Four subdivisions: Sunny, Bloomy, Windy, Wavy. <br>
Price from 1.5 billion/base 120m2. <br>
Legal: Red book, long-term ownership. <br>
With 100% of the apartments here have sea view, located at an altitude of 30 - 70m, providing a very open view of the whole island of Hon Ro, Nha Trang Bay and VinPearl is one of the valuable points that is not expensive. Any project is available.<br>
A great product not only for living but also a profitable investment opportunity with great potential. Contact: 0933113768',
120,0,0,0,0,0,22,65400,1,'2022-06-11','2022-07-10','vinagent2',1)
go
insert into newsimages(newsid, photo)
values(7,'img15.jpg')
go
insert into newsimages(newsid, photo)
values(7,'img16.jpg')
go

--Xuan
insert into news(acreage,createdate,categoryid,cateTOFhouseid,title,[content],nobedroom,nobathroom, 
nolivroom,garden, bancony,wardid, price,newstypeid,adstimefrom,adstimeto,username,newstatus)
values(200,cast('2022-05-25' as date),2,4,'TRAN DUY SUNSET BEACH VILLA',
'<strong>Peace - Comfort - Privacy. It is great to relax with friends and family here<br> - a rare unique beachfront villa in Da Nang.</strong><br>
Just step down and you are immersed in nature, with white sand, with the taste of the sea, creating a wonderful vacation!<br>

<strong>Beautiful Location</strong><br>
- Next to Bai Dau<br>
- Suitable for relaxation, gathering with friends and family<br>
– Comfortable parking area<br>
<strong>3 Luxury Bedrooms</strong><br>
- All have sea view<br>
- There is a full kitchen with cooking utensils, a living room with sea view. There is an entertaining pool table<br>
– Up to 6 – 10 guests<br>
<strong>Pool</strong><br>
– Lake level for children and adults<br>
– Outdoor BBQ<br>
The villa has 2 facades: 1 side is located on the front of Tran Phu street, the other side has a panoramic view of the sea.
To the side of the house is a very romantic walking path down to the sea.
',
3,3,1,0,3,72,350, 1,'2022-05-25','2022-06-05','seller1',4)
go
insert into newsimages(newsid, photo)
values(8,'ximg1.jpg')
go
insert into newsimages(newsid, photo)
values(8,'ximg2.jpg')
go
insert into newsimages(newsid, photo)
values(8,'ximg3.jpg')
go
insert into newsimages(newsid, photo)
values(8,'ximg4.jpg')
go
insert into newsimages(newsid, photo)
values(8,'ximg5.jpg')
go
insert into newsimages(newsid, photo)
values(8,'ximg6.jpg')
go
insert into newsimages(newsid, photo)
values(8,'ximg7.jpg')
go
insert into newsimages(newsid, photo)
values(8,'ximg8.jpg')
go
insert into newsimages(newsid, photo)
values(8,'ximg9.jpg')
go
insert into newsimages(newsid, photo)
values(8,'ximg10.jpg')
go
insert into news(acreage,createdate,categoryid,cateTOFhouseid,title,[content],nobedroom,nobathroom, 
nolivroom,garden, bancony,wardid, price,newstypeid,adstimefrom,adstimeto,username,newstatus)
values(50,cast('2022-06-10' as date),2,1,'FULLY FURMISHED LUXURY MINI APARTMENT',
'<strong>Only from 5 million/month, fully furnished luxury mini apartment</strong><br>
1 bedroom apartment for rent in Hoa Minh, Lien Chieu District, Da Nang<br>
Luxury Lien Chieu mini apartment - comfortable - reasonable price - long-term stay<br>

???? Address: Thanh Tinh Street, Hoa Minh, Lien Chieu, Da Nang<br>

❌ Convenient to move to the center, airport, Coop Mark supermarket, school, beach...<br>

❌ Free time, no owner.<br>

❌ There is a convenient elevator to move when the family has family members, children or pregnant women.<br>

❌ 24/7 surveillance security camera, shared garage<br>

???? The interior is fully furnished, brand new, not stamped, 100% new, you just need to move in right away without hesitation.<br>


· Smart TV 32 inch<br>

Elextrulux 92 liter refrigerator<br>

· Daikin 1 HP air conditioner 100% new.<br>

· New mattress.<br>

· Solid and luxurious wooden kitchen cabinets and shelves<br>

Suitable for young couples, working staff, young people, travel service rental...<br>

✔ Convenient transportation near Da Nang city center bus station, Hue crossroads overpass, near Coopmark, market, University of Physical Education and Sports, University of Science and Technology, University of Education, district hospital...<br>

???? Price from 5 million to 6.5 million/month long-term contract<br>

 - Area: 32 m2 - 38m2<br>

Limited<br>
',
1,1,1,0,0,84,200, 2,'2022-04-11','2022-06-21','seller2', 4)
go
insert into newsimages(newsid, photo)
values(9,'ximg21.jpg')
go
insert into newsimages(newsid, photo)
values(9,'ximg22.jpg')
go
insert into newsimages(newsid, photo)
values(9,'ximg23.jpg')
go
insert into newsimages(newsid, photo)
values(9,'ximg24.jpg')
go
insert into news(acreage,createdate,categoryid,cateTOFhouseid,title,[content],nobedroom,nobathroom, 
nolivroom,garden, bancony,wardid, price,newstypeid,adstimefrom,adstimeto,username,newstatus)
values(50,cast('2022-06-10' as date),2,1,'WHOLE HOUSE FOR RENT IN DA NANG CITY',
'<strong>Only from 5 million/month, fully furnished luxury mini apartment</strong><br>
<br>
House for rent near lotte mart in Danang city<br>
<br>
The house consists of 3 floors, 5 bedrooms, 4 bathrooms, full furniture<br>
<br>
Beautiful, luxurious house, located in the city center<br>
<br>
If you want to rent, contact: My Linh to see the house<br>
<br>',
5,4,1,0,4,72,300,2,'2022-06-08','2022-06-20','seller2',1)
go
insert into newsimages(newsid, photo)
values(10,'ximg31.jpg')
go
insert into newsimages(newsid, photo)
values(10,'ximg32.jpg')
go
insert into newsimages(newsid, photo)
values(10,'ximg33.jpg')
go
insert into newsimages(newsid, photo)
values(10,'ximg34.jpg')
go


----------Lan----------
insert into news(createdate,categoryid,cateTOFhouseid,title,[content], acreage,nobedroom,nobathroom, nolivroom, garden, bancony, 
wardid, price,newstypeid,adstimefrom,adstimeto,username,newstatus)
values(cast('2022-06-02' as date), 1, 1, '5 MINS TO METRO STATION - FOR SALE 2BR RIVER VIEW LUMIERE',
'<p> <strong>LUMIERE Riverside</strong> is a product of Masterise Homes collaboration with renowned world-class international
partners. It is a unique, prestigious edifice that represents Vietnams first Unique Leafscape Design and 
the pinnacle of new standards in luxurious living.</p>
<p>- 5 minutes walk to Metro line 1 station, international schools, shoping mall.</p>
<br>
<p>- Location with full river view in Thao Dien area.</p>
<br>
<p>- Combining shophouse and Grade A office to ensure potential for price increase to attract residents.</p>
<br>
<p>- New iconic project of district 2.<p>
<br>
<p>- International partners ensure the quality of construction and handover.</p>
<br>
<strong>LUMIERE RIVERSIDE PROJECT OVERVIEW:</strong>
<br>
<p>Land area: 19,395m2</p>
<br>
<p>Including 2 Towers (West Tower 44 floors and East Building 36 floors)</p>
<br>
<p>Size: 1,030 Units</p>
<br>
<p>Handover: Quarter 2/2023</p>
<br>
<p>West Building 44 Floor (LK Masteri An Phu)</p>
<br>
<p>2 Tunnels for Commercial and Apartment Blocks</p>
<br>
<p>TM Block and TM Rooftop Interconnected Apartment Block.</p>
<br>
<p>TM block Front side XLHN: 8 stories high</p>
<br>
<p>(2 Floor Shop and 6 Floor Office)</p>
<br>
<p>Apartment block: 44 floors high (with 2 floating floors for cars and motorbikes).</p>
<br>
<p>13-19 units/floor/11 elevators (2 elevators)</p>
<br>
<p>East Building: 36 floors</p>
<br>
<p>2 Basements, 6-storey podium (3 floors of Shop and 3 floors of Office).</p>
<br>
<p>Apartment 14 units/floor/6 elevators</p>',
77 ,2 ,2, 1, 1, 1, 1, 335000, null, null,null, 'novaagent1', 3)
go
insert into newsimages(newsid, photo)
values(11,'limg1.jpg')
go
insert into newsimages(newsid, photo)
values(11,'limg2.jpg')
go
insert into newsimages(newsid, photo)
values(11,'limg3.jpg')
go
insert into newsimages(newsid, photo)
values(11,'limg4.jpg')
go


insert into news(createdate,categoryid,cateTOFhouseid,title,[content], acreage, nobedroom, nobathroom, nolivroom, garden, bancony, 
wardid, price, newstypeid, adstimefrom, adstimeto, username, newstatus)
values(cast('2022-06-05' as date), 2, 2, '3BRS - 104SQM FOR RENT IN METROPOLE THU THIEM - THE GALLARIA',
'<strong>Location: The Metropole Thu Thiem, D2, HCMC</strong>
<br>
- Block C (Prado)
<br>
- Floor 7
<br>
- Riverview & City View
<br>
- Fully furnished
<br>
- At least 1 year rental contract.
<br>
Noted: Can negotiate a little bit about rental price and tenant can also require some more things in the house.
<br>
Can visit anytime.
<br>
<p>The project is located on the peninsula of Thu Thiem in District 2, TP. HCM. 
This is a prime location in the eastern area of ​​Saigon because it lies right after the number 1 function 
- one of the focal points is TP. HCM focuses on strong development in the coming time. Not only that, 
The Metropole Thu Thiem apartment also has a poetic view of Saigon River, facing toward District 1. 
This project is also connected to Metro station No. 1 because it is near Thu Thiem 2 pedestria.</p>',
104, 3, 2, 1, 0, 1,  3, 2200, 2, '2022-06-08','2022-07-07', 'novaagent2', 1)
go
insert into newsimages(newsid, photo)
values(12,'limg5.jpg')
go
insert into newsimages(newsid, photo)
values(12,'limg6.jpg')
go
insert into newsimages(newsid, photo)
values(12,'limg7.jpg')
go
insert into newsimages(newsid, photo)
values(12,'limg8.jpg')
go

insert into news(createdate,categoryid,cateTOFhouseid,title,[content], acreage, nobedroom, nobathroom, nolivroom, garden, bancony, 
wardid, price, newstypeid, adstimefrom, adstimeto, username, newstatus)
values(cast('2022-06-14' as date), 2, 2, 'MASTERI AN PHU SHOPHOUSE FOR RENT, SONG HANH FRONTAGE, 158M2, 3 FLOORS',
'<strong>Shophouse for rent in Masteri An Phu, An Phu, Ho Chi Minh</strong>
<br>
- Shophouse for rent heart wall area 170.4m2, clear area 158.8m2. Includes 1 ground floor and 2 floors.
<br>
- Diamond position, owns 3 fronts of Hanoi Highway, Vo Truong Toan and Road No. 9, connecting the main road to all 
central locations and surrounding areas.
<br>
- Adjacent to Station 7 (An Phu) Metro Line 1 - Ben Thanh - Suoi Tien, bringing added value, ensuring sustainable profitability.
<br>
- Promising high revenue from the abundant number of visitors of Thao Dien international community, 
Masteri An Phu residential area, Masteri Thao Dien, Gateway, District 2 Thao Dien and upcoming Masteri Parkland 
project next door.
<br>
- Shophouse façade is designed with airy and diverse architectural rhythms, bringing open space to meet the diverse 
needs of business types.', 178, 0, 0, 0, 1, 0,  2, 4000, 2, '2022-06-14','2022-06-25', 'vinagent2', 1)
go
insert into newsimages(newsid, photo)
values(13,'limg9.jpg')
go
insert into newsimages(newsid, photo)
values(13,'limg10.jpg')
go
insert into newsimages(newsid, photo)
values(13,'limg11.jpg')
go

insert into news(createdate,categoryid,cateTOFhouseid,title,[content], acreage, nobedroom, nobathroom, nolivroom, garden, bancony, 
wardid, price, newstypeid, adstimefrom, adstimeto, username, newstatus)
values(cast('2022-06-10' as date), 2, 5, '2 BR CHARMING VILLA FOR RENT IN THAO DIEN WITH MODERN DESIGN',
'This is a very lovely modern house, recently built with western influence. It consists of:
<br>
2 floors, 
<br>
2 bedrooms + a working room,
<br>
3 bathrooms, 
<br>
an open and very bright living room connecting a fully equipped kitchen on the ground floor, looking out to a small but
very cute garden in front.
<br>
It is fully furnished with colorful and modern furniture (beds, sofa set, wooden cloth cabinets, air-cons, 
outdoor furniture…)
<br>
All the rooms are spacious, nice and bright.
<br>
The kitchen is fully equiped with kitchen cabinets, oven, and cooking range.
<br>
The villa locates in one of the greeniest, most charming and friendly neighborhoods in Thao dien, District 2.
<br>
It is a mere 2 minutes’ walk to the British International school, and other needy amenities nearby (local markets, 
western supermarkets, hospitals, pharmacies, cafés and restaurants, entertainment venues….)
<br>
Lease term: minimum 1 year. Long term lease preferable
<br>
Deposit: 2 months
<br>
Payment: every 2 months
<br>
Available: summer 2022', 220, 2, 5, 1, 1, 2, 1, 2000, 1, '2022-06-10','2022-06-20', 'vinagent3', 3)
go
insert into newsimages(newsid, photo)
values(14,'limg12.jpg')
go
insert into newsimages(newsid, photo)
values(14,'limg13.jpg')
go
insert into newsimages(newsid, photo)
values(14,'limg14.jpg')
go
insert into newsimages(newsid, photo)
values(14,'limg15.jpg')
go
insert into news(createdate,categoryid,cateTOFhouseid,title,[content],acreage,nobedroom,nobathroom, nolivroom,garden, bancony,wardid, price,newstypeid,adstimefrom,adstimeto,username,newstatus)
values(cast('2022-06-08' as date),1,1,'SPECIALIZING IN VINHOMES CENTRAL PARK APARTMENTS, BEST PRICE (1,2,3,4PN) BEST PRICE','Please send customers the price list of apartments for sale in Vinhomes Central Park (The best price apartments - 100% real price). <br>
* 1 bedroom unit.
- Area 53.3m2 - block C2 - Basic NT. Price 3.65 billion. <br>
- Area 53.7m2 - block L4 - Full NT. Price 3.2 billion. <br>
- Area 54.3m2 - block P7 - Full NT. Price 3.5 billion. <br>
Contact 0901692239. <br>
* 2 bedroom apartment. <br>
- Area 91m2 - Block P3 - Full NT. Price 7.15 billion. <br>
- Area 79m2 - Block P4 - Full NT. Price 6.45 billion. <br>
- Area 83m2 - Block P7 - Basic NT. Price 4.5 billion.  <br>
- Area 89m2 - Block P2 - full furniture. Price 6.3 billion. <br>
- Area 84m2 - Block C2 - Full NT. Price 5.75 billion. <br>
- Area 91m2 - Block P7 - Full NT. Price 6.45 billion. <br>
- Area 83m2 - Block L5 - Basic NT. Price 4.5 billion. <br>
- Area 87m2 - Block L2 - full furniture. Price 6.5 billion. <br>
- Area 85m2 - Block C3 - Full NT. Price 5.2 billion. <br>
- Area 90m2 - Block C1 - Full NT. Price 6.2 billion. <br>
- Area 83m2 - Block L6 - Basic NT. Price 5.5 billion. <br>
- Area 86m2 - Block P6 - full furniture. Price 6.6 billion. <br>
- Area 88m2 - Block P5 - Full NT. Price 6.5 billion. <br>
- Area 85m2 - Block L4 - Full NT. Price 5.45 billion. <br>
- Area 62,5m2 - Block L3 - Basic building. Price 4 billion. <br>
- Area 86m2 - Block LP - full furniture. Price 6.5 billion. <br>
- Area 75m2 - Block P1 - full furniture. Price 5.5 billion. <br>
- Area 87m2 - Block L1 - Basic NT. Price 6.5 billion. <br>
- Area 70m2 - Block L81 - full furniture. Price 8 billion. <br>
Contact 0901692239.<br>
* 3 bedroom apartment. <br>
- Area 109m2 - Block P3 - Full NT. Price 9.15 billion. <br>
- Area 145m2 - Block P5 - Full NT. Price 14.5 billion. <br>
- Area 120m2 - Block P7 - Basic NT. Price 8.5 billion. <br>
- Area 116m2 - Block P2 - full furniture. Price 9.3 billion. <br>
- Area 119m2 - Block C2 - Full NT. Price 7.9 billion. <br>
- Area 115m2 - Block P1 - Full NT. Price 8 billion. <br>
- Area 109m2 - Block L5 - Basic NT. Price 8.5 billion. <br>
- Area 126m2 - Block L2 - full furniture. Price 11.5 billion. <br>
- Area 120m2 - Block C3 - Full NT. Price 7.2 billion. <br>
- Area 110m2 - Block C1 - Full NT. Price 8.2 billion. <br>
- Area 110m2 - Block L6 - Basic NT. Price 8.9 billion. <br>
- Area 120m2 - Block P6 - full furniture. Price 9.6 billion. <br>
- Area 118m2 - Block P4 - Full NT. Price 9 billion. <br>
- Area 108m2 - Block L4 - Full NT. Price 8.45 billion. <br>
- Area 94 m2 - Block L3 - Basic NT. Price 7.1 billion. <br>
- Area 120m2 - Block LP - full furniture. Price 9.5 billion. <br>
- Area 98m2 - Block L1 - Basic NT. Price 8.5 billion. <br>
- Area 120m2 - Block L81 - full furniture. Price 16 billion. <br>
Contact 0901692239. <br>
* 4 bedroom apartment. <br>
- Area 155m2 - Block P6 - full furniture. Price 11.6 billion. <br>
- Area 160m2 - Block C2 - Full NT. Price 14 billion. <br>
- Area 188m2 - Block P2 - Full NT. Price 18.45 billion. <br>
- Area 188m2 - Block P3 - Basic NT. Price 18.1 billion. <br>
- Area 165m2 - Block L1 - full furniture. Price 16.5 billion. <br>
- Area 150m2 - Block L6 - Basic NT. Price 15 billion. <br>
- Area 180m2 - Block L81 - full furniture. Price 27 billion. <br>
Contact 0901692239. <br>
Vinhomes Central Park The perfect choice for a fulfilling life. <br>
With 5 years of experience in consulting Vinhomes Central Park projects, supporting hundreds of customers to buy beautiful apartments, We always strive to update and find the best products for customers. Please contact 0901692239 for advice and appointment to visit the apartment! <br>
Thank you and wish you good health, happiness and success!',80,3,2,1,0,1,30,196000,2,'2022-06-07','2022-06-19','vinagent2',1)
go
insert into newsimages(newsid, photo)
values(15,'img17.jpg')
go
insert into newsimages(newsid, photo)
values(15,'img18.jpg')
go
insert into news(createdate,categoryid,cateTOFhouseid,title,[content],acreage,nobedroom,nobathroom, nolivroom,garden, bancony,wardid, price,newstypeid,adstimefrom,adstimeto,username,newstatus)
values(cast('2022-06-09' as date),1,1,'PRICE OF APARTMENTS IN VINHOMES NGUYEN TRAI, VINHOMES GALAXY NGUYEN TRAI','What is the price of apartments in Vinhomes Nguyen Trai and Vinhomes Galaxy Nguyen Trai? <br>
Dear brothers and sisters, the price of a luxury apartment is an important factor. However, in fact, in the past 5 years, besides the price factor, there are: Flexible sales policy, a system of high-class utilities to serve the needs of future residents, design & architecture, especially prestige. The credit of the project owner & the location of the project are extremely important points in the decision-making of the client. <br>
- Located in a prime location, Vinhomes Galaxy Nguyen Trai is the intersection of a historic Hanoi and a modern capital when from here, we only need 9 minutes to move to the Opera House and about the same distance from the city center. It s time to live in the hot atmosphere of F1 grand prix, the emotional matches of the national team at My Dinh national stadium. So according to you, how much will the apartment price of Vinhomes Nguyen Trai be / m2 & what is the basis for prediction at this time? Let s review the prices of neighboring projects: <br>
A. Project overview. <br>
Address: No. 233 Nguyen Trai, Thuong Dinh Ward, Thanh Xuan District, Hanoi. <br>
Developer: Vinhomes. <br>
Scale: 11ha. <br>
Construction density: About 35.5%. <br>
Products: Including 09 high-class apartment buildings. Luxury apartments from 1 - 5 bedrooms, penthouse, Doublex & Shophouse. <br>
B. Policy analysis, apartment price Vinhomes Galaxy Nguyen Trai. <br>
- Updating... <br>
C. What residents have when choosing Vinhomes Galaxy Nguyen Trai. <br>
That s right, the sophistication here will come from the architecture, from the use of utilities, from the use of the building, from the apartment, from the quality of the interior, all the meticulousness and rationality. They all take people as the center, cherish and cherish your feelings. <br>
The sophistication here will probably also come to you from the way of operating and managing buildings, utilities and from the courtesy of Vinhomes staff. <br>
+ Please see: http://www.vinhomesmienbac.info/gia-can-ho-chung-cu-vinhomes-galaxy-nguyen-trai.html <br>
+ Living space. <br>
The space and living environment here are always kept clean, neat & reasonable. The reason is great because the water system supplied to each apartment is treated by Vingroup again with modern equipment. <br>
In addition, with a modern security system and a professional security team, Vinhomes Galaxy ensures absolute safety for all family members of residents. <br>
+ Emphasis: The above content is expected information, Vinhomes will officially announce the information when the project is implemented. <br>
+ Ladies and gentlemen, you are interested in learning about investment information to buy and sell apartments, penhouses, skyvillas, shophouses on podiums. Please contact Bui Tuan & Team (15 specialists) - Hotline: 0987 907 ***.',
50,2,2,1,0,1,71,180000,1,'2022-06-07','2022-06-09','novaagent1',4)
go
insert into newsimages(newsid, photo)
values(16,'img19.jpg')
go
insert into newsimages(newsid, photo)
values(16,'img20.jpg')
go

insert into news(createdate,categoryid,cateTOFhouseid,title,[content],acreage,nobedroom,nobathroom, nolivroom,garden, bancony,wardid, price, username,newstatus)
values(cast('2022-06-07' as date), 1, 5, 'HOT VILLA COMPOUND AREA 36 APARTMENTS SAIGON PEARL',
'5 Bedroom Villa for sale in Saigon Pearl Complex, Binh Thanh District, Ho Chi Minh
Selling Saigon Pearl villa, located in Compound area of ​​36 apartments, area of ​​300m2, building 1 basement + 1 ground floor
+ 2 floors + attic, including 5 bedrooms, 6 bathrooms.
<br>
- The basement built all land area of ​​300m2, 3.5m high basement with a layout for working staff + billiard room 
+ wine cellar + bedroom for help with separate WC
<br>
- Ground floor designed in open space, kitchen and living room overlooking the garden
<br>
- Floor 1 -2 and attic, including 5PN-6WC, 1 church room, 1 common room, 1 movie room
<br>
- Saigon Pearl Phase 3 is beautifully designed from the master to the most detailed: the Saigon Pearl inter-villa 
area includes 36 villas with a height of 3.5 floors with an area of ​​180m2 to 302m2 and 8-storey commercial townhouse area, 
area from 205m2 to 960 m2.
<br>
- The villa and apartment building of Opal Saigon Pearl is connected and this will be the place to focus all the utility 
services: swimming pool, GYM, mini supermarket ...', 300, 5, 6, 2, 1, 4, 30, 3900000, 'novaagent3', 0)
insert into newsimages(newsid, photo)
values(17,'limage16.jpg')
go
insert into newsimages(newsid, photo)
values(17,'limage17.jpg')
go
insert into newsimages(newsid, photo)
values(17,'limage18.jpg')
go
insert into newsimages(newsid, photo)
values(17,'limage19.jpg')
go


insert into news(createdate,categoryid,cateTOFhouseid,title,[content],acreage,nobedroom,nobathroom, nolivroom,garden, bancony,wardid, price,  username,newstatus)
values(cast('2022-06-05' as date), 1, 3, '1 BEDROOM HOUSE FOR SALE IN VINPEARL LUXURY NHA TRANG',
'1 Bedroom House for sale in VINPEARL LUXURY NHA TRANG, Nha Trang, Khanh Hoa
<br>
House for sale of 100sqm in VINPEARL LUXURY NHA TRANG, consisting of 1 bedroom and 1 bathroom 
located at Nha Trang, Khanh Hoa.
<br>
Facilities include: Air Conditioning, BBQ Area, CCTV, Fitness, Garden, Library, Parking, Playground, Security, 
Swimming Pool, Tennis and Wi Fi.
<br>
<strong>About VINPEARL LUXURY NHA TRANG</strong>
<br>
Exclusively set on a separate island in one of the world’s 30 most beautiful bays, Vinpearl Luxury Nha Trang is 
situated comfortably on Hon Tre Island, Nha Trang. Built with superior construction standards and architectural 
styles of a world class tropical luxury resort, and housing over 84 beautiful coastal villas, Vinpearl Nha Trang 
is an ideal destination for luxury holidays that claim perfection and privacy.', 100, 1, 2, 1, 1, 1, 95, 350000, 'novaagent2', 0)
insert into newsimages(newsid, photo)
values(18,'limage20.jpg')
go
insert into newsimages(newsid, photo)
values(18,'limage21.jpg')
go
insert into newsimages(newsid, photo)
values(18,'limage22.jpg')
go

insert into news(createdate,categoryid,cateTOFhouseid,title,[content],acreage,nobedroom,nobathroom, nolivroom,garden, bancony, wardid, price,  username,newstatus)
values(cast('2022-06-07' as date), 1, 5, '3 FLOOR VILLA IN LA VALLEE DE DALAT', 
'<strong>4 Bedroom Villa for sale in La Vallee de Dalat, Da Lat, Lam Dong</strong>
<br>
Only walled and guarded residential development in Dalat.
<br>
Superbly designed French villa architecture with modern, Western-style interiors.
<br>
4 bedrooms (including a large master bedroom suite with fireplace and his and her bathrooms), maid’s room and 7-8 bathrooms.
<br>
Large living room and separate family rooms with fireplaces and a separate space on the basement level for 
a music or karaoke room.
<br>
Custom fitted kitchen and bathrooms with granite and marble counter tops.
<br>
Hardwood flooring.
<br>
Large decks, including ground-floor deck suitable for entertaining.
<br>
Large garden and open common areas for children or entertaining.', 590, 4, 6, 2, 1, 3, 111, 1200000, 'novaagent2', 0)
insert into newsimages(newsid, photo)
values(19,'limage23.jpg')
go
insert into newsimages(newsid, photo)
values(19,'limage24.jpg')
go
insert into newsimages(newsid, photo)
values(19,'limage25.jpg')
go
insert into newsimages(newsid, photo)
values(19,'limage26.jpg')
go

insert into news(createdate,categoryid,cateTOFhouseid,title,[content],acreage,nobedroom,nobathroom, nolivroom,garden, bancony, wardid, price,  username,newstatus)
values(cast('2022-06-07' as date), 2, 1, 'THE MARQ 2 BEDROOM FULLY FURNISHED FOR RENT - BEST PRICE',
'2 Bedroom Apartment for rent in The Marq, Da Kao, Ho Chi Minh
<br>
2 bedroom The Marq fully furnished for rent - good price
<br>
- Middle floor
<br>
- 80sqm
<br>
- Landmark 81 view
<br>
- good price $2000 not including management fee ( negotiate)
<br>
- Prefer company client
<br>
--------
<br>
The MARQ- the most luxury building in town
<br>
Greatest location in  District 1 to access centre within 5 minitues, and access district 2-3-4 area within 10-20 minutes
<br>
Hongkong developer
<br>
Modern Style
<br>
Full and highest standard facilities
<br>
---------
<br>
 We bring fully services to you below: 
 <br>
-Consultant and support for leasing contract process
<br>
- Support with Tax document
<br>
- Cleaning/laundry service
<br>
- Set up internet/ Japanese TV channel/ International TV channels
<br>
- Police registration 
<br>
- Supporting tenant during their leasing time.', 80, 2, 2, 1, 0, 1, 10, 2000,  'novaagent3', 0)
insert into newsimages(newsid, photo)
values(20,'limage27.jpg')
go
insert into newsimages(newsid, photo)
values(20,'limage28.jpg')
go
insert into newsimages(newsid, photo)
values(20,'limage29.jpg')
go

insert into news(createdate,categoryid,cateTOFhouseid,title,[content],acreage,nobedroom,nobathroom, nolivroom, garden, bancony, wardid, price,newstypeid,adstimefrom,adstimeto,username,newstatus)
values(cast('2022-06-01' as date), 2, 1, 'MINI APARTMENT IN D.7 - NEAR LOTTE MART - FULLY FUNISHED.',
'1 Bedroom House for rent in Tan Hung, Ho Chi Minh
<br>
3 Mini apartment available on December - Only from 6.5 Million VND - 8.5 Million VND 
<br>
Address: 150 D1 Street, KDC Him Lam, District 7, HCM
<br>
5 mins to RMIT University, Ton Duc Thang University, Lotte Mart, Cinema
<br>
10 mins to phu My Hung, D.4
<br>
15 mins to D1, Binh Thanh
<br>
Specific information:
<br>
- Room 25m2, with balcony, fully furnished.
<br>
Price 6.5 million VND - available 15, Dec.
<br>
- Room 35m2, Room area 20m2, Balcony area 15m2, top floor so you can plant trees, build a nice small garden, 
suitable for anyone who is alone or couple and in love with nature.
<br>
Price: 7.5 Million VND, available now!
<br>
- Room 40m2, large balcony, fully furnished.
<br>
Price: 8.5 Million VND, available now!
<br>
The house has an elevator, CCTV, washing machine on the 2nd floor, most of the neighbors go to work and live alone so 
it is very quiet and civilized.', 40, 1, 1, 0, 0, 0, 20, 350, 1, '2022-06-06', '2022-06-10','seller2', 3)
insert into newsimages(newsid, photo)
values(21,'limage30.jpg')
go
insert into newsimages(newsid, photo)
values(21,'limage31.jpg')
go
insert into newsimages(newsid, photo)
values(21,'limage32.jpg')
go


 insert into news(createdate,categoryid,cateTOFhouseid,title,[content],acreage,nobedroom,nobathroom, nolivroom,garden, bancony, wardid, price, newstypeid, adstimefrom, adstimeto, username,newstatus)
values(cast('2022-06-01' as date), 2, 1, 'SUNWAH PEARL 2 BEDROOM FULLY FURNISHED RIVER VIEW FOR RENT', 
'2 Bedroom Apartment for rent in Sunwah Pearl, District 1, Ho Chi Minh
<br>
SUNWAH PEARL 2 bedroom fully furnished for rent river view
<br>
Silver House tower
<br>
High floor 40th
<br>
Fully furnished
<br>
Size : 103 sqm
<br>
Open Kitchen
<br>
Panorama & direct river view
<br>
$1,700 not including management fee
<br>
- - - -
<br>
Sunwah Pearl Brandnew & Luxury Project
<br>
Greatest location in Binh Thanh District to access District 1-2-3 centre/expat area within 5-15 minutes
<br>
No traffic jam during rush hour
<br>
Modern Style
<br>
Full and highest standard facilities
<br>
Greatest view in the city
<br>
--------
<br>
We bring fully services to you below:
<br>
-Consultant and support for leasing contract process
<br>
- Support with Tax document
<br>
- Cleaning/laundry service
<br>
- Set up internet/ Japanese TV channel/ International TV channels
<br>
- Police registration
<br>
- Supporting tenant durning their leasing time.', 103, 2, 2, 1, 0, 1, 30, 1700, 2, '2022-06-10','2022-06-20', 'seller1', 1)
insert into newsimages(newsid, photo)
values(22,'limage33.jpg')
go
insert into newsimages(newsid, photo)
values(22,'limage34.jpg')
go
insert into newsimages(newsid, photo)
values(22,'limage35.jpg')
go

insert into news(createdate,categoryid,cateTOFhouseid,title,[content],acreage,nobedroom,nobathroom, nolivroom,garden, bancony, wardid, price, newstypeid, adstimefrom, adstimeto, username,newstatus)
values(cast('2022-06-04' as date), 2, 3, 'EUROPEAN HOME FOR RENT.',
'4 Bedroom House for rent in Doi Can, Ha Noi
<br>
Modern style three stories home could be found on Doi Can street, Ba Dinh district, Hanoi. It is located in a peace area
and car parking outside the house. The total living area is 300 sq m, 100 sq m on the each level and it is included 
following:
<br>
Ground floor: This place designed for a small outside courtyard is big enough to park a few motorbikes, It have a modern and
comfortable sofa set in the living room, cozy and charm style, fully equip the kitchen including cooking and eating 
equipment enough for four people, dining room have a big dining table for six chairs, a small toilet and taking up 
by charm French style staircase to first floor.
<br>
First floor and Second floor: It has 02 bedrooms and 01 bathroom on the each level, it is similar style and size, 
and has its own balcony, many windows, a lot of natural lights and sunny shine let it in the room. On the top floor: 
It have a storage room and small terrace with a laundry area.
Overall, This home is a good option for a family living in Ba Dinh district who like security 24/7, very quiet, 
kid can play any activity outside the house without traffic.', 300, 4, 4, 2, 1, 2, 38, 1500, 3, CAST( '2022-06-08' as date),cast ('2022-07-07' as date),
'novaagent1', 1)
insert into newsimages(newsid, photo)
values(23,'limage36.jpg')
go
insert into newsimages(newsid, photo)
values(23,'limage37.jpg')
go
insert into newsimages(newsid, photo)
values(23,'limage38.jpg')
go
insert into newsimages(newsid, photo)
values(23,'limage39.jpg')
go

insert into news(createdate,categoryid,cateTOFhouseid,title,[content],acreage,nobedroom,nobathroom, nolivroom,garden, bancony, wardid, price, newstypeid, adstimefrom, adstimeto, username,newstatus)
values(cast('2022-05-30' as date), 1, 3, 'HOUSE FRONTAGE VU TRONG PHUNG AREA TUYEN SON, HAI CHAU DISTRICT, DA NANG',
'3 Bedroom Townhouse for sale in Hoa Cuong Nam, Da Nang
<br>
House frontage Vu Trong Phung area Tuyen Son, Hai Chau District, Da Nang
<br>
2.5-storey house with reasonable design. The house includes: living room, kitchen, 2 bedrooms, 2 toilets, 1 living room, drying yard ... The interior is like picture, buying is right here.
<br>
The house is located in a high security and residential area, 40m from Skyline International School, 200m from Lotte Mart, 1.5km from the sea and 250m from the Han River. Cool all year round.
<br>
Land area: 4m x17.5m = 70m2
<br>
North.', 70, 3, 3, 1, 0, 2, 75, 2300000, 3, '2022-06-10','2022-06-20', 'seller1', 1)
insert into newsimages(newsid, photo)
values(24,'limage40.jpg')
go
insert into newsimages(newsid, photo)
values(24,'limage41.jpg')
go
insert into newsimages(newsid, photo)
values(24,'limage42.jpg')
go

insert into news(createdate,categoryid,cateTOFhouseid,title,[content],acreage,nobedroom,nobathroom, nolivroom,garden, bancony, wardid, price, newstypeid, adstimefrom, adstimeto, username,newstatus)
values(cast('2022-06-06' as date), 1, 1, '[ FOR SALE] THE MARQ – FOREIGNER QUOTA', 
'<strong>3 Bedroom Condo for sale in The Marq, Da Kao, Ho Chi Minh
[ FOR SALE] THE MARQ – foreigner quota - Good price</strong>
<br>
3BR: 110 SQM
<br>
Handovered condition:
<br>
Price: 26,000,000,000 VND~ $1.130 MILLION USD.
<br>
View: View over city center + district 1.
<br>
Prime location inherited the value of heritage
<br>
The Marq is located right in the heart of Dakao, once the convergence of Saigon elite intellectuals, now its one of the most important administrative centers in Saigon.
<br>
Million-dollar vision
<br>
Possessing a panoramic view of the whole city, capturing the most beautiful quintessence of Saigon - a special highlight for
residents to fully enjoy the aesthetic life.
<br>
Time is a precious gift and more valuable than ever for successful entrepreneurs. Living in the central district with 
The Marq - a beautiful location, convenient for easy transportation to main destinations in the city which is a strength, 
helping to maximize the golden time fund, facilitate job development, and have more time for family.', 110, 3, 2, 1, 0, 1, 10, 1300000, 3, 
'2022-06-08','2022-07-07', 'novaagent2', 1)
insert into newsimages(newsid, photo)
values(25,'limage43.jpg')
go
insert into newsimages(newsid, photo)
values(25,'limage44.jpg')
go
insert into newsimages(newsid, photo)
values(25,'limage45.jpg')
go
insert into newsimages(newsid, photo)
values(25,'limage46.jpg')
go


insert into news(createdate,categoryid,cateTOFhouseid,title,[content],acreage,nobedroom,nobathroom, nolivroom,garden, bancony, wardid, price, newstypeid, adstimefrom, adstimeto, username,newstatus)
values(cast('2022-05-10' as date), 1, 1, 'FELIZ EN VISTA FOR SALES, 180SQM - 4BRS', 
'4 Bedroom Condo for sale in Feliz En Vista, An Phu, Ho Chi Minh
<br>
Dear customer ,
<br>
I have a very nice one 4Brs - 180sqm in Feliz En Vista project (Capitland) located in Thanh My Loi, D2 for sales in details:
<br>
- Developer : Capitaland ( very well-known investor from Singapore)
<br>
- Block: A (Altaz)
<br>
- Floor: 12th
<br>
- Gross construction area: 180sqm (Gross used area: 163sqm)
<br>
- 4 Brs + 1 maid room + 4 bath rooms + 1 big living room + 2 Kitchens + 1 laundry + privated lift.
<br>
- Very stunning view - riverfront
<br>
- Highquality equipments 
<br>
- Unfurnished - Standard equiments from developer.
<br>
- Private lift
<br>
- Private swimming pool & Cigar Lounge & Wine rooms....
<br>
*** This one is freehold ownership for foreigners', 180, 4, 3, 1, 0, 1, 2, 770000, 3, '2022-05-10','2022-06-05', 'novaagent3', 4)
insert into newsimages(newsid, photo)
values(26,'limage47.jpg')
go
insert into newsimages(newsid, photo)
values(26,'limage48.jpg')
go
insert into newsimages(newsid, photo)
values(26,'limage49.jpg')
go
insert into newsimages(newsid, photo)
values(26,'limage50.jpg')
go

insert into news(createdate,categoryid,cateTOFhouseid,title,[content],acreage,nobedroom,nobathroom, nolivroom,garden, bancony, wardid, price, newstypeid, adstimefrom, adstimeto, username,newstatus)
values(cast('2022-06-01' as date), 1, 1, 'ONE LAST PENTHOUSE WITH ENORMOUS ROOFTOP POOL - THE ALBANY THAO DIEN - PRIVATE RESIDENCES',
'3 Bedroom Condo for sale in The Albany, Thao Dien, Ho Chi Minh
<br>
The last Penthouse of Albany Thao Dien - Adjacent to ISHCMC International School, German International School, Starbuck, An Nam Gourmet, Vincom Thao Dien, Metro Station,...
<br>
- Apartment area: 217m2, 3 bedrooms en-suite (private toilet), 1 Office.
<br>
- Garden area: 189m2.
<br>
- Pool area: 10 x 4 x 1.2m.
<br>
Very private project, hotel vibes, suitable for homeowners love to live discreetly.
<br>
Only 22 apartments, 1 house, 1 lobby, 1 private elevator, not sharing neighbors. Each bedroom has a bathroom, 
there is a room for a maid.', 217, 3, 3, 1, 1, 2, 1, 2100000, 2, '2022-06-08','2022-07-07', 'novaagent1', 1)
insert into newsimages(newsid, photo)
values(27,'limage51.jpg')
go
insert into newsimages(newsid, photo)
values(27,'limage52.jpg')
go
insert into newsimages(newsid, photo)
values(27,'limage53.jpg')
go
insert into newsimages(newsid, photo)
values(27,'limage54.jpg')
go

insert into news(createdate,categoryid,cateTOFhouseid,title,[content],acreage,nobedroom,nobathroom, nolivroom,garden, bancony, wardid, price, newstypeid, adstimefrom, adstimeto, username,newstatus)
values(cast('2022-06-03' as date), 2, 1, 'NASSIM 3 BEDROOM PANORAMA RIVER VIEW FULLY FURNISHED FOR RENT',
'3 Bedroom Apartment for rent in The Nassim, Thao Dien, Ho Chi Minh
<br>
Nassim 3 Bedroom panorama river view fully furnished for rent
<br>
Type: 3Bedrooms
<br>
Size : 120sqm
<br>
Open Kitchen
<br>
Fully furnished
<br>
Private elevator
<br>
Panorama River view from living room to bedrooom
<br>
Sunset view
<br>
- - - -
<br>
Nassim Apartment - One of the most Luxury Project in Thao Dien, HCMC
<br>
Greatest location in Thao Dien, District 2 to access expat areas and within 15 minutes to Centre district 1
<br>
Quite Place
<br>
Modern Style
<br>
Full and highest standard facilities
<br>
Greatest view in the city', 120, 3, 2, 1, 0, 1, 1, 2500, 3, '2022-06-10','2022-06-20', 'seller1', 1)
insert into newsimages(newsid, photo)
values(28,'limage55.jpg')
go
insert into newsimages(newsid, photo)
values(28,'limage56.jpg')
go
insert into newsimages(newsid, photo)
values(28,'limage57.jpg')
go
insert into newsimages(newsid, photo)
values(28,'limage58.jpg')
go

insert into news(createdate,categoryid,cateTOFhouseid,title,[content],acreage,nobedroom,nobathroom, nolivroom,garden, bancony, wardid, price, newstypeid, adstimefrom, adstimeto, username,newstatus)
values(cast('2022-05-25' as date), 2, 1, 'RARE PRODUCTS THE SUN - 1PN-FULL INTERIOR',
'1 Bedroom Apartment for rent in The Sun Avenue, Ho Chi Minh
<br>
Apartment at The Sun Avenue project - 28, Mai Chi Tho, An Phu, District 2
<br>
Area 51m2, full high-class furniture
<br>
Enjoy modern living space at The Sun, free high-end services
<br>
Traffic is easy, right on the main road of the city
<br>
<strong>About The Sun Avenue</strong>
Gold position
<br>
Located on the Mai Chi Tho frontage, District 2, about 10 minutes away from District 1, The Sun Avenue is a classy apartment,
Office-tel office, crowded commercial center is increasingly proving the price. Increased and long-term treatment. 
Moreover, this location also helps residents at the same time inherit all international utility services in the urban
Thu Thiem.', 51, 1, 1, 1, 0, 0, 2, 500, 2, '2022-05-25','2022-06-01', 'seller1', 4)
insert into newsimages(newsid, photo)
values(29,'limage59.jpg')
go
insert into newsimages(newsid, photo)
values(29,'limage60.jpg')
go
insert into newsimages(newsid, photo)
values(29,'limage60.jpg')
go

insert into news(createdate,categoryid,cateTOFhouseid,title,[content],acreage,nobedroom,nobathroom, nolivroom,garden, bancony, wardid, price, newstypeid, adstimefrom, adstimeto, username,newstatus)
values(cast('2022-06-02' as date), 2, 3, 'HOUSE FOR RENT WITH FULL FURNISHED', 
'4 Bedroom House for rent in Mega Village District 9, District 9, Ho Chi Minh
located in the facade of Mega Ruby Residence in Vo Chi Cong St - entrance of Saigon hitech park (5 minutes to SAMSUNG) 
- next to express way. Easy to take center district (15 minutes) and contiguous province (Vung Tau, Phan Thiet...)
<br>
The length of contract is >1 year.
<br>
Free 1 year management fee.
<br>
<strong>About Mega Village District 9</strong>
<br>
Following the success of the project chain Ruby Mega, Mega Residence, Villa Park ... understand the desire for a
peaceful place of retreat, convenient - Mega Village was formed with more than 100 houses and 
utility areas ( pool, gym, clinic, community events, book cafe, mini mart ...) have all been completed and put into use.
<br>
Located in front of Ring Road, in the Phu Huu Ward, District 9, HCMC, District 2 borders.', 250, 4, 5, 1, 1, 2, 4, 900, 
2, '2022-06-02','2022-06-09', 'seller1', 1)
insert into newsimages(newsid, photo)
values(30,'limage62.jpg')
go
insert into newsimages(newsid, photo)
values(30,'limage63.jpg')
go
insert into newsimages(newsid, photo)
values(30,'limage64.jpg')
go

insert into reportnews(newsid,createdday,deadline,reportstatus,fromuser,fromadmin ,touser ,politicsreason,cheatreason,remark) values (11,'2022-06-10','2022-06-14',1,'visitor3','novaland','novaagent1',10,0,'Warning: Your news has been reported for politics reason and this news has locked')
go
insert into reportnews(newsid,createdday,deadline,reportstatus,fromuser,fromadmin ,touser ,politicsreason,cheatreason,remark) values (8,'2022-06-09','2022-06-13',2,'visitor1',null,'seller1',10,0,'Warning: Your news has been reported for politics reason')
go
insert into reportnews(newsid,createdday,deadline,reportstatus,fromuser,fromadmin ,touser ,politicsreason,cheatreason,remark) values (5,'2022-06-10','2022-06-14',3,'visitor2','novaland','novaagent3',0,1,'Warning: Your news has been reported for cheat reason')
go
insert into reportnews(newsid,createdday,deadline,reportstatus,fromuser,fromadmin ,touser ,politicsreason,cheatreason,remark) values (5,'2022-06-10','2022-06-14',3,'visitor3','novaland','novaagent3',0,2,'Warning: Your news has been reported for cheat reason')
go
insert into reportnews(newsid,createdday,deadline,reportstatus,fromuser,fromadmin ,touser ,politicsreason,cheatreason,remark) values (5,'2022-06-10','2022-06-14',3,'visitor4','novaland','novaagent3',0,3,'Warning: Your news has been reported for cheat reason')
go
insert into reportnews(newsid,createdday,deadline,reportstatus,fromuser,fromadmin ,touser ,politicsreason,cheatreason,remark) values (5,'2022-06-10','2022-06-14',3,'visitor5','novaland','novaagent3',0,4,'Warning: Your news has been reported for cheat reason')
go
insert into reportnews(newsid,createdday,deadline,reportstatus,fromuser,fromadmin ,touser ,politicsreason,cheatreason,remark) values (5,'2022-06-10','2022-06-14',3,'visitor6','novaland','novaagent3',0,5,'Warning: Your news has been reported for cheat reason')
go
insert into reportnews(newsid,createdday,deadline,reportstatus,fromuser,fromadmin ,touser ,politicsreason,cheatreason,remark) values (5,'2022-06-10','2022-06-14',3,'visitor7','novaland','novaagent3',0,6,'Warning: Your news has been reported for cheat reason')
go
insert into reportnews(newsid,createdday,deadline,reportstatus,fromuser,fromadmin ,touser ,politicsreason,cheatreason,remark) values (5,'2022-06-10','2022-06-14',3,'visitor8','novaland','novaagent3',0,7,'Warning: Your news has been reported for cheat reason')
go
insert into reportnews(newsid,createdday,deadline,reportstatus,fromuser,fromadmin ,touser ,politicsreason,cheatreason,remark) values (5,'2022-06-10','2022-06-14',3,'visitor9','novaland','novaagent3',0,8,'Warning: Your news has been reported for cheat reason')
go
insert into reportnews(newsid,createdday,deadline,reportstatus,fromuser,fromadmin ,touser ,politicsreason,cheatreason,remark) values (5,'2022-06-10','2022-06-14',3,'seller1','novaland','novaagent3',0,9,'Warning: Your news has been reported for cheat reason')
go

insert into reportnews(newsid,createdday,deadline,reportstatus,fromuser,fromadmin ,touser ,politicsreason,cheatreason,remark) values (6,'2022-06-17','2022-06-21',3,'visitor2','novaland','novaagent3',1,0,'Warning: Your news has been hide for politics reason')
go
insert into reportnews(newsid,createdday,deadline,reportstatus,fromuser,fromadmin ,touser ,politicsreason,cheatreason,remark) values (6,'2022-06-17','2022-06-21',3,'visitor3','novaland','novaagent2',2,0,'Warning: Your news has been hide for politics reason')
go
insert into reportnews(newsid,createdday,deadline,reportstatus,fromuser,fromadmin ,touser ,politicsreason,cheatreason,remark) values (6,'2022-06-17','2022-06-21',3,'visitor4','novaland','novaagent2',3,0,'Warning: Your news has been hide for politics reason')
go
insert into reportnews(newsid,createdday,deadline,reportstatus,fromuser,fromadmin ,touser ,politicsreason,cheatreason,remark) values (6,'2022-06-17','2022-06-21',3,'visitor5','novaland','novaagent2',4,0,'Warning: Your news has been hide for politics reason')
go
insert into reportnews(newsid,createdday,deadline,reportstatus,fromuser,fromadmin ,touser ,politicsreason,cheatreason,remark) values (6,'2022-06-17','2022-06-21',3,'visitor6','novaland','novaagent2',5,0,'Warning: Your news has been hide for politics reason')
go
insert into reportnews(newsid,createdday,deadline,reportstatus,fromuser,fromadmin ,touser ,politicsreason,cheatreason,remark) values (6,'2022-06-17','2022-06-21',3,'visitor7','novaland','novaagent2',6,0,'Warning: Your news has been hide for politics reason')
go
insert into reportnews(newsid,createdday,deadline,reportstatus,fromuser,fromadmin ,touser ,politicsreason,cheatreason,remark) values (6,'2022-06-17','2022-06-21',3,'visitor8','novaland','novaagent2',7,0,'Warning: Your news has been hide for politics reason')
go
insert into reportnews(newsid,createdday,deadline,reportstatus,fromuser,fromadmin ,touser ,politicsreason,cheatreason,remark) values (6,'2022-06-17','2022-06-21',3,'visitor9','novaland','novaagent2',8,0,'Warning: Your news has been hide for politics reason')
go
insert into reportnews(newsid,createdday,deadline,reportstatus,fromuser,fromadmin ,touser ,politicsreason,cheatreason,remark) values (6,'2022-06-17','2022-06-21',3,'visitor9','novaland','novaagent2',9,0,'Warning: Your news has been hide for politics reason')
go
insert into reportnews(newsid,createdday,deadline,reportstatus,fromuser,fromadmin ,touser ,politicsreason,cheatreason,remark) values (6,'2022-06-17','2022-06-21',3,'visitor9','novaland','novaagent2',9,0,'Warning: Your news has been hide for politics reason')
go
insert into reportnews(newsid,createdday,deadline,reportstatus,fromuser,fromadmin ,touser ,politicsreason,cheatreason,remark) values (6,'2022-06-17','2022-06-21',3,'visitor9','novaland','novaagent2',10,0,'Warning: Your news has been hide for politics reason')
go

insert into reportnews(newsid,createdday,deadline,reportstatus,fromuser,fromadmin ,touser ,politicsreason,cheatreason,remark) values (28,'2022-06-17','2022-06-21',3,'visitor2','','seller1',0,1,'Warning: Your news has been reported for cheat reason')
go
insert into reportnews(newsid,createdday,deadline,reportstatus,fromuser,fromadmin ,touser ,politicsreason,cheatreason,remark) values (28,'2022-06-17','2022-06-21',3,'visitor3','','seller1',0,2,'Warning: Your news has been reported for cheat reason')
go
insert into reportnews(newsid,createdday,deadline,reportstatus,fromuser,fromadmin ,touser ,politicsreason,cheatreason,remark) values (28,'2022-06-17','2022-06-21',3,'visitor4','','seller1',0,3,'Warning: Your news has been reported for cheat reason')
go
insert into reportnews(newsid,createdday,deadline,reportstatus,fromuser,fromadmin ,touser ,politicsreason,cheatreason,remark) values (28,'2022-06-17','2022-06-21',3,'visitor5','','seller1',0,4,'Warning: Your news has been reported for cheat reason')
go
insert into reportnews(newsid,createdday,deadline,reportstatus,fromuser,fromadmin ,touser ,politicsreason,cheatreason,remark) values (28,'2022-06-17','2022-06-21',3,'visitor6','','seller1',0,5,'Warning: Your news has been reported for cheat reason')
go
insert into reportnews(newsid,createdday,deadline,reportstatus,fromuser,fromadmin ,touser ,politicsreason,cheatreason,remark) values (28,'2022-06-17','2022-06-21',3,'visitor7','','seller1',0,6,'Warning: Your news has been reported for cheat reason')
go
insert into reportnews(newsid,createdday,deadline,reportstatus,fromuser,fromadmin ,touser ,politicsreason,cheatreason,remark) values (28,'2022-06-17','2022-06-21',3,'visitor8','','seller1',0,7,'Warning: Your news has been reported for cheat reason')
go
insert into reportnews(newsid,createdday,deadline,reportstatus,fromuser,fromadmin ,touser ,politicsreason,cheatreason,remark) values (28,'2022-06-17','2022-06-21',3,'visitor9','','seller1',0,8,'Warning: Your news has been reported for cheat reason')
go
insert into reportnews(newsid,createdday,deadline,reportstatus,fromuser,fromadmin ,touser ,politicsreason,cheatreason,remark) values (28,'2022-06-17','2022-06-21',3,'visitor9','','seller1',0,9,'Warning: Your news has been reported for cheat reason')
go
insert into reportnews(newsid,createdday,deadline,reportstatus,fromuser,fromadmin ,touser ,politicsreason,cheatreason,remark) values (28,'2022-06-17','2022-06-21',3,'visitor9','','seller1',0,10,'Warning: Your news has been reported for cheat reason')
go
update news set adstimefrom='2022-06-07', adstimeto='2022-06-30' where newstatus=1 

--select * from news n
--inner join account a on n.username=a.username
--where a.agentuser='novaland'
--go

--select * from invoice
--select  * from news where username='seller1'
--select * from account where agentuser='novaland'
--select * from package where packageid=3
--
--select * from reportnews where Newsid=6 and fromuser='visitor2' and ( reportstatus =0 or reportstatus=3) and cheatreason>0 



--update news set newstatus=1 where newsid=5
--update package set Nonormalnews=5 where packageid=1
go
create or alter procedure update_invoice
as
begin
declare @idmin int = (select min(invoiceid) from (select * from invoice where invoicestatus <3 and (select cast(expire as date))<(select cast(getdate() as date)))as minvalue)
declare @idmax int = (select max(invoiceid) from (select * from invoice where invoicestatus <3 and (select cast(expire as date))<(select cast(getdate() as date)))as maxvalue) 
declare @item int =0;
while(@idmin<=@idmax)
	begin
		declare @id int = (select invoiceid from (select * from invoice where invoicestatus <3 and (select cast(expire as date))<(select cast(getdate() as date)))as a order by invoiceid offset @item rows fetch next 1 rows only)
	    declare @username varchar(100) = (select username from (select * from invoice where invoicestatus <3 and (select cast(expire as date))<(select cast(getdate() as date)))as a order by invoiceid offset @item rows fetch next 1 rows only)
		declare @role int = (select accrole from account where username=@username) 
		declare @hasNew int=(select count(*) from invoice where username=@username and invoicestatus =0)
		update invoice set invoicestatus=3 where invoiceid=@id
		if (@hasNew=0)
		begin
			if (@role =2)
			begin 	
		
					update news set newstatus=4 from news n inner join account a on n.username = a.username where a.agentuser=@username
			end 
			if (@role =4)
			begin 	
					update news set newstatus=4  where username=@username
			end 
		end
		set @idmin= @id+1
		set @item =@item +1
	end
    
  
end
go
exec update_invoice
go
create or alter procedure update_reportnews
as
begin
   update reportnews set reportstatus = 4  where (select cast(deadline as date))<(select cast(getdate() as date)) and (reportstatus=0 or reportstatus=3) and (politicsreason>=10 or cheatreason>=10)
   update news set newstatus=3 from news n inner join reportnews r on n.newsid = r.newsid where (select cast(r.deadline as date))<(select cast(getdate() as date)) and reportstatus = 4 and newstatus=1
end
go
exec update_reportnews
go
CREATE TABLE [dbo].[Messages](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[SenderId] [varchar](100) NULL,
	[SenderUsername] [varchar](100) NULL,
	[RecipientId] [varchar](100) NULL,
	[RecipientUsername] [varchar](100) NULL,
	[DateRead] [datetime2](7) NULL,
	[MessageSent] [datetime2](7) NOT NULL,
	[SenderDeleted] [bit] NOT NULL,
	[RecipientDeleted] [bit] NOT NULL,
	[Content] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[Messages] ADD  CONSTRAINT [PK_Messages] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
CREATE NONCLUSTERED INDEX [IX_Messages_RecipientId] ON [dbo].[Messages]
(
	[RecipientId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
CREATE NONCLUSTERED INDEX [IX_Messages_SenderId] ON [dbo].[Messages]
(
	[SenderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Messages]  WITH CHECK ADD  CONSTRAINT [FK_Messages_account_RecipientId] FOREIGN KEY([RecipientId])
REFERENCES [dbo].[account] ([username])
GO
ALTER TABLE [dbo].[Messages] CHECK CONSTRAINT [FK_Messages_account_RecipientId]
GO
ALTER TABLE [dbo].[Messages]  WITH CHECK ADD  CONSTRAINT [FK_Messages_account_SenderId] FOREIGN KEY([SenderId])
REFERENCES [dbo].[account] ([username])
GO
ALTER TABLE [dbo].[Messages] CHECK CONSTRAINT [FK_Messages_account_SenderId]
GO



SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Groups](
	[Name] [nvarchar](450) NOT NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
ALTER TABLE [dbo].[Groups] ADD  CONSTRAINT [PK_Groups] PRIMARY KEY CLUSTERED 
(
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO



SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Connections](
	[ConnectionId] [nvarchar](450) NOT NULL,
	[Username] [nvarchar](max) NULL,
	[GroupName] [nvarchar](450) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
ALTER TABLE [dbo].[Connections] ADD  CONSTRAINT [PK_Connections] PRIMARY KEY CLUSTERED 
(
	[ConnectionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
CREATE NONCLUSTERED INDEX [IX_Connections_GroupName] ON [dbo].[Connections]
(
	[GroupName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Connections]  WITH CHECK ADD  CONSTRAINT [FK_Connections_Groups_GroupName] FOREIGN KEY([GroupName])
REFERENCES [dbo].[Groups] ([Name])
GO
ALTER TABLE [dbo].[Connections] CHECK CONSTRAINT [FK_Connections_Groups_GroupName]
GO

delete FROM [BDS].[dbo].[Connections]

exec update_reportnews
exec update_reportnews

select * from reportnews