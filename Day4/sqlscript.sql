use wipro4

drop table student;
create table student(studentid int primary key,studentname varchar(30));

create table course(courseid int primary key ,coursename varchar(30),duration  int,
studentid int foreign key references student(studentid));

select * from student;
select * from course;

insert into student values (101,'suman')
insert into student values(104,'chandan');
insert into student values(105,'rohan')

create proc insertcourse (@cid int ,@cname varchar(40),@duration int,@sid1 int)
as
begin
insert into course values(@cid,@cname,@duration,@sid1)
end

exec insertcourse 10,'java',4,101

create proc updatecourse (@cid int ,@cname varchar(40),@duration int,@sid1 int)
as
begin
update  course set coursename=@cname,duration=@duration ,studentid=@sid1
where courseid=@cid;
end

create proc deletecourse(@sid1 int)
as
begin
delete from course where studentid=@sid1;
delete from student where studentid=@sid1
end


select * from Customers
select * from Products