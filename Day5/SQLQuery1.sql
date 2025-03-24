select * from Customers

select CustomerID,CompanyName ,ContactName from [dbo].[Customers] where 
Country='Spain'

--searching customer 

select CustomerID,CompanyName ,ContactName from [dbo].[Customers] where 
ContactName='yang Wang'


--performing join

select * from categories 
select * from Products;

select p1.ProductName,c1.CategoryName from Products p1 join Categories c1
on p1.CategoryID=c1.CategoryID where c1.CategoryName='Beverages'

-- give  me all the customers who have ordered more than 10 orders 

select * from Customers
select * from Orders;

select * from Orders where CustomerID='HANAR'

--customerID ---countoforders

select CustomerID from orders group by CustomerID  -- will give me the groups 
select CustomerID,count(OrderID) from orders group by CustomerID  --coun i got 
select CustomerID,count(OrderID) from orders group by CustomerID having count(OrderID) > 10

--now for crud on single table using Dbfirst apprach 


CREATE TABLE [dbo].[Post](
	[PostId] [int] primary key ,
	[DatePublished] [datetime] NULL,
	[body] [varchar](100) NULL,
	[Title] [varchar](20) NULL
  )

select * from Post