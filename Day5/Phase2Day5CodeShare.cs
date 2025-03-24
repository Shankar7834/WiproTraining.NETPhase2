ENTITY FRAMEWORK
*****************
https://www.tutorialspoint.com/entity_framework/index.htm

https://www.entityframeworktutorial.net/entityframework6/what-is-entityframework.aspx


from the above two links only take theoretical knowledge And understand the concepts and its architecture of entity framework

next refer slides folder in Day5 of drive link where some slides are given in that information is there about entity framework

What is Entity Framework (EF)?
Entity Framework (EF) is an Object-Relational Mapping (ORM) framework for .NET applications. It allows developers to interact with a database using C# objects instead of SQL queries, making data access simpler and more efficient.

EF automates the process of mapping database tables to C# classes and provides a higher-level abstraction for database operations.


- Object means classes in the front end and relational means tables in the backend.
- It is a tool that will join tables with classes, so some reverse engineering will happen, 
  and some classes will be created in the front end.

- Database First:
  - First, the database will be there.
  - For that database, I will create classes.

- Code First:
  - Here, first, I will write a set of classes.
  - Using these classes, I will generate a database in SQL Server.
  - Here, each table is a class, and each column is a property of the class.
  - If a relation exists between two tables, then an association is formed between classes:
    - One class will have an attribute of another class.
    - The master class will have a collection property.


      

DBFirst apprach i am doing it 
---------------------------------
Database First Approach
_________________________

EF generates C# entity classes and DbContext based on the existing database schema.
Uses reverse engineering (Scaffold-DbContext) to create models from tables.
      
When to use?

When the database already exists.
When working with a legacy database.


now open visual studi 2022 and add new asp.net core mvc project here let it be .net core 8.0 version only 
  
right clik on dependencies and manage nugget packages and go to browse and type this packages and install  it in your application 

which version i will tell wait so  cann use laetst one 9.0.2 if any issues comes i will change the version as i am using latest 8.0 core so  here in entity framework also 

i can use latest only 

Microsoft.EntityFrameworkCore  
Microsoft.EntityFrameworkCore.SqlServer
Microsoft.EntityFrameworkCore.Tools 

and then in package manager console fire this command 

Tools--->Nugget package manager--->package manager console 

so below command u have to type here 

Scaffold-DbContext 'Data Source=LAPTOP-4G8BHPK9\SQLEXPRESS;Initial Catalog=NORTHWND;Integrated Security=True;TrustServerCertificate=True;' Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models

data source keep your sql server name so now what i am doing is what and all tables are there in Nothwind dataabse For all those tables I'm creating classes in the
 models folder using this command

keep your sql server open also now 


so you can see in my Models folder by doing reverse enineering i can see all the classes generated for all the tables in northwind database 
EntityFrameworkDemo1
│── Connected Services
│── Dependencies
│   │── Analyzers
│   │── Frameworks
│   │   │── Packages
│   │   │   │── Microsoft.EntityFrameworkCore (9.0.2)
│   │   │   │── Microsoft.EntityFrameworkCore.SqlServer (9.0.2)
│   │   │   │── Microsoft.EntityFrameworkCore.Tools (9.0.2)
│── Properties
│── wwwroot
│── Controllers
│   │── HomeController.cs
│── Models
│   │── AlphabeticalListOfProduct.cs
│   │── Category.cs
│   │── CategorySalesFor1997.cs
│   │── Course.cs
│   │── CurrentProductList.cs
│   │── Customer.cs
│   │── CustomerAndSuppliersByCity.cs
│   │── CustomerDemographic.cs
│   │── Customerordersview.cs
│   │── Employee.cs
│   │── ErrorViewModel.cs
│   │── Hi.cs
│   │── Invoice.cs
│   │── NorthwndContext.cs
│   │── Order.cs
│   │── OrderDetail.cs
│   │── OrderDetailsExtended.cs
│   │── OrdersQry.cs
│   │── OrderSubtotal.cs
│   │── Post.cs
│   │── Product.cs
│   │── ProductsAboveAveragePrice.cs
│   │── ProductSalesFor1997.cs
│   │── ProductsByCategory.cs
│   │── QuarterlyOrder.cs
│   │── Region.cs
│   │── SalesByCategory.cs


so something like this will be genenated in Models folder of project in solution explorere

so below commands are for just exta knowledge dont use it 

In the models folder if u want to generate only single table so belwo command is used 
Scaffold-DbContext 'Data Source=DESKTOP-IIH2P8R\SQLEXPRESS;Initial Catalog=NORTHWND;Integrated Security=true;TrustServerCertificate=true;' Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -Tables [dbo].[Customers]

If u want to genrate with force if it is not getting genrated u can use below command 
Scaffold-DbContext 'Data Source=SUPRAJA\SQLEXPRESS;Initial Catalog=NORTHWND;Integrated Security=true;TrustServerCertificate=true;' Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -Tables [dbo].[Products] -Force



so next thing  is 
Now create  an contoller of mvc type  with the name NorthWindController emoty only create it 
which will look like this 


  using Microsoft.AspNetCore.Mvc;

namespace EntityFrameworkDemo1.Controllers
{
    public class NorthWindController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}





and do this 

in db :
----------
-- give me all the customers who are living in spain Country

select CustomerID,CompanyName ,ContactName from [dbo].[Customers] where 
Country='Spain'


in front end 
---------------
using Microsoft.AspNetCore.Mvc;
using EntityFrameworkDemo1.Models;

namespace EntityFrameworkDemo1.Controllers
{
    public class NorthWindController : Controller
    {

        NorthwndContext cnt=new NorthwndContext();

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult spainCustomers()
        {
            var spaincustomers = from cust in cnt.Customers
                                 where cust.Country == "Spain"
                                 select new Customer
                                   {
                                      CustomerId= cust.CustomerId,
                                     ContactName=  cust.ContactName,
                                     CompanyName=  cust.CompanyName
                                   };
            return View(spaincustomers);
        }
    }
}

now i have to genrate view for this collection of spain customers

right click on the action mehod and add view --->razor view --->template as list --->which  model Customers and conext u have to select  NorthwndContext

and after geenrating view it will look like this i had added ids also as it was not showing in screen 

  @model IEnumerable<EntityFrameworkDemo1.Models.Customer>

@{
    ViewData["Title"] = "spainCustomers";
}

<h1>spainCustomers</h1>

<p>
    <a asp-action="Create">Create New</a>
</p>
<table class="table">
    <thead>
        <tr>
            <th>
                @Html.DisplayNameFor(model => model.CustomerId)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.CompanyName)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.ContactName)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.ContactTitle)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.Address)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.City)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.Region)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.PostalCode)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.Country)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.Phone)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.Fax)
            </th>
            <th></th>
        </tr>
    </thead>
    <tbody>
@foreach (var item in Model) {
        <tr>
                <td>
                    @Html.DisplayFor(modelItem => item.CustomerId)
                </td>
            <td>
                @Html.DisplayFor(modelItem => item.CompanyName)
            </td>
            <td>
                @Html.DisplayFor(modelItem => item.ContactName)
            </td>
            <td>
                @Html.DisplayFor(modelItem => item.ContactTitle)
            </td>
            <td>
                @Html.DisplayFor(modelItem => item.Address)
            </td>
            <td>
                @Html.DisplayFor(modelItem => item.City)
            </td>
            <td>
                @Html.DisplayFor(modelItem => item.Region)
            </td>
            <td>
                @Html.DisplayFor(modelItem => item.PostalCode)
            </td>
            <td>
                @Html.DisplayFor(modelItem => item.Country)
            </td>
            <td>
                @Html.DisplayFor(modelItem => item.Phone)
            </td>
            <td>
                @Html.DisplayFor(modelItem => item.Fax)
            </td>
            <td>
                <a asp-action="Edit" asp-route-id="@item.CustomerId">Edit</a> |
                <a asp-action="Details" asp-route-id="@item.CustomerId">Details</a> |
                <a asp-action="Delete" asp-route-id="@item.CustomerId">Delete</a>
            </td>
        </tr>
}
    </tbody>
</table>

Now u say port/NorthWind/spainCustomers u will get some data in view

now Write and action method to search customer based on contact name where again I need customer table only

now again in Db 
--------------

--searching customer 

select CustomerID,CompanyName ,ContactName from [dbo].[Customers] where 
ContactName='yang Wang'

  in the front end 
  --------------
public IActionResult SearchCustomer(string contactname)
{
    var searchcustomer = from cust in cnt.Customers
                         where cust.ContactName == contactname
                         select new Customer
                         {
                             CustomerId = cust.CustomerId,
                             ContactName = cust.ContactName,
                             CompanyName = cust.CompanyName
                         };

    var query1 = searchcustomer.Single();
    return View(query1);
}

add view -->razor view--->template as details --->which  model Customers and conext u have to select  NorthwndContext


  type below url   
  https://localhost:7133/NorthWind/SearchCustomer/?contactname=yang wang
  
in Db 
------

select * from categories 
select * from Products;

select p1.ProductName,c1.CategoryName from Products p1 join Categories c1
on p1.CategoryID=c1.CategoryID where c1.CategoryName='Beverages'


in the front end 
------------------

As in the  screen I will be displaying productname and the categoryname that type of table is not there 
so I will create a class with those properties in the models folder and that only I will display in the view of this below action method

create a class in Models folder which will hold the valeus of join operation 

prodCat u give the name

namespace EntityFrameworkDemo1.Models
{
    public class ProdCat
    {
        public string prodname { get; set; }
        public string catname { get; set; }
    }
}

next in action method added like tis 

  public IActionResult ProductsInCategory(string categoryname)
  {
      var productsincategory = from prod in cnt.Products
                               where prod.Category.CategoryName == categoryname
                               select new ProdCat
                               {
                                   prodname=prod.ProductName,
                                   catname=prod.Category.CategoryName
                               };

  return View(productsincategory); 
  }

now i cannot create a view graphically so manually i will add empty view like this 

  here empty means add view-->razor view -->empty without model which will look like this 

  ProductsInCategory.cshtml 
  ---------------------
@{
    ViewData["Title"] = "ProductsInCategory";
}

<h1>ProductsInCategory</h1>



  and then will update the design there lke this 

  ProductsInCategory.cshtml (updated)
  ----------------------------------
  @model IEnumerable<EntityFrameworkDemo1.Models.ProdCat>;

@{
    ViewData["Title"] = "ProductsInCategory";
}


<h1>ProductsInCategory</h1>

<div class="row">
    <div class="col-lg-9">
        <h3>Products In Category:</h3>
    </div>
    <form method="get" action="/NorthWind/ProductsInCategory">
        <!--not jumping to post in this page only display -->
        <div class="col-lg-2">
            <input type="text" id="Category" name="categoryname" class="form-control " />
        </div>
        <div class="col-lg-1">
            <input type="submit" id="searchproducts" class="btn btn-primary" value="search" />
        </div>
    </form>
</div>


@if (Model.Count() == 0)
{
    <table>
        <tr>
            <td></td>
        </tr>
    </table>

}
else
{
    <div class="row">


        <div class="col-lg-12">

            <table id="prodlist" width="80%" cellpadding="7" cellspacing="7" class="table-striped table-hover">

                <thead>
                    <tr>
                        <th style="padding:15px">ProdName</th>
                        <th style="padding:15px">Category</th>

                    </tr>

                </thead>
                <tbody>
                    @foreach (var prod in Model)
                    {


                        <tr>
                            <td style="padding:15px">@prod.prodname</td>
                            <td style="padding:15px">@prod.catname</td>


                        </tr>


                    }
                </tbody>
            </table>

        </div>
    </div>
}

-- give  me all the customers who have ordered more than 10 orders 

In DB
----------
-- give  me all the customers who have ordered more than 10 orders 


select * from Orders;

select * from Orders where CustomerID='HANAR'

--customerID ---countoforders

select CustomerID from orders group by CustomerID  -- will give me the groups 
select CustomerID,count(OrderID) from orders group by CustomerID  --coun i got 
select CustomerID,count(OrderID) from orders group by CustomerID having count(OrderID) > 10

Front End 
------------

Earlier I have used child referecne  navigation property in products table through which I navigated to categories table now I am having a master table which is Customers
so from customers i will use orders collection navigation paroperty to find the solution for above sql query in linq

Note here that a master class will always have a collection property to its child class  and a child class will always have a reference navigation property to its master class

Now again add one class in Models folder with the name CustomerRange 


namespace EntityFrameworkDemo1.Models
{
    public class CustomerRange
    {
        public string CustomerId { get; set; }
        public string ContactName { get; set; } = string.Empty;

        public int? orderscount { get; set; }

    }
}

now in the action method 


  public IActionResult OrderRange(string range)
  {
      int range1=Convert.ToInt32(range);
      var customerordercount = from cust in cnt.Customers
                               where cust.Orders.Count > range1
                               select new CustomerRange
                               {
                                   CustomerId = cust.CustomerId,
                                   ContactName = cust.ContactName,
                                   orderscount = cust.Orders.Count,
                               };
      return View(customerordercount);
  }

The add empty view and update it with below design
-----------------------------------------------------

@model IEnumerable<EntityFrameworkDemo1.Models.CustomerRange>
@{
    ViewData["Title"] = "OrderRange";
}

<h1>OrderRange</h1>

<div class="row">
    <div class="col-lg-9">
        <h3>Find Customers more than :</h3>
    </div>
    <form method="get" action="/NorthWind/OrderRange">
        <div class="col-lg-2">
            <select name="range" id="orderrange">
                <option selected value="">Select Range</option>
                <option value="5">Five</option>
                <option value="10">Ten</option>
                <option value="15">Fifteen</option>
                <option value="20">Twenty</option>
            </select>
        </div>
        <div class="col-lg-1">
            <br />
            <input type="submit" id="findcustomers"
                   value="searchcustomerorders" class="btn btn-primary" />
        </div>
    </form>
</div>
@if (Model.Count() == 0)
{
    <table>
        <tr>
            <td></td>
        </tr>
    </table>
}
else
{
    <div class="row">
        <div class="col-lg-12">
            <table id="orderlist" width="80%" cellpadding="7" cellspacing="7"
                   class="table-striped table-hover">
                <thead>
                    <tr>
                        <th>Customer Id </th>
                        <th>Contact Name </th>
                        <th>No of orders </th>
                    </tr>
                </thead>
                <tbody>
                    @foreach (var cust in Model)
                    {
                        <tr>
                            <td style="padding:15px">@cust.CustomerId </td>
                            <td style="padding:15px">@cust.ContactName</td>
                            <td style="padding:15px">@cust.orderscount</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    </div>

} 

CRUD using DBFIRST
------------------
Now i want to do crud using dbfirst approach of EF on one single table so one single table i have to add in db as we are doing db frist meeans db will be there i have to 
add classes later on using that db table till  now we have done that only means Northwind available tables i did reverse enigneering and got classes for them 
so create one table in northwind only 

CREATE TABLE [dbo].[Post](
	[PostId] [int] primary key ,
	[DatePublished] [datetime] NULL,
	[body] [varchar](100) NULL,
	[Title] [varchar](20) NULL
  )
  
  after that command used for adding fresh table is using force u command we will do it 
  

Then in program console 
type this command 
Scaffold-DbContext 'Data Source=LAPTOP-4G8BHPK9\SQLEXPRESS;Initial Catalog=NORTHWND;Integrated Security=true;TrustServerCertificate=True;' Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -Tables Post -Force

After this I can see that I had created a post class in the Models folder using above command 

but due to above command i had lost connectivty in NorthwindContext.cs for other tables eventhough tables are there in Models they 
are not there in NorthwindContext class so for time being 
i will comment all the code in NorthWindController to avoid errors .

now I will add now a post controller in which I will perform crud operation on the post table using post class using db first approach

Add this postcontroller with read and write actions

Where a boilerplate code will come and I will modify by going inside that boilerplate code

which will look like tis 

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EntityFrameworkDemo1.Controllers
{
    public class PostController : Controller
    {
        // GET: PostController
        public ActionResult Index()
        {
            return View();
        }

        // GET: PostController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: PostController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: PostController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: PostController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: PostController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: PostController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: PostController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}

now Updated PostContoller 
---------------------------
intially the code for Post controller in the begining 



using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using EntityFrameworkDemo1.Models;(added)


namespace EntityFrameworkDemo1.Controllers
{
    public class PostController : Controller
    {
        NorthwndContext cnt=new NorthwndContext();(added)

        // GET: PostController
        public ActionResult Index()
        {
            return View(cnt.Posts.ToList());(added)
        }

Add a view for index You know that index will take  list as template and like that add a view for index 
which will look like this in this i added Postid also manually 

@model IEnumerable<EntityFrameworkDemo1.Models.Post>

@{
    ViewData["Title"] = "Index";
}

<h1>Index</h1>

<p>
    <a asp-action="Create">Create New</a>
</p>
<table class="table">
    <thead>
        <tr>
            <th>
                @Html.DisplayNameFor(model => model.PostId)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.DatePublished)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.Body)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.Title)
            </th>
            <th></th>
        </tr>
    </thead>
    <tbody>
@foreach (var item in Model) {
        <tr>
                <td>
                    @Html.DisplayFor(modelItem => item.PostId)
                </td>
            <td>
                @Html.DisplayFor(modelItem => item.DatePublished)
            </td>
            <td>
                @Html.DisplayFor(modelItem => item.Body)
            </td>
            <td>
                @Html.DisplayFor(modelItem => item.Title)
            </td>
            <td>
                <a asp-action="Edit" asp-route-id="@item.PostId">Edit</a> |
                <a asp-action="Details" asp-route-id="@item.PostId">Details</a> |
                <a asp-action="Delete" asp-route-id="@item.PostId">Delete</a>
            </td>
        </tr>
}
    </tbody>
</table>

 
Next go to PostContoller create get method and add view for it and before that once build the application I am gettig error as other tables reference
has gone due to above earlier command so time being i am commenting all code in northwindcontroller as I want to focus on post controller

now build the solution 

and then try to add view on create method of get 

While creating a create view template should be create only

Create.cshtml
--------------

@model EntityFrameworkDemo1.Models.Post

@{
    ViewData["Title"] = "Create";
}

<h1>Create</h1>

<h4>Post</h4>
<hr />
<div class="row">
    <div class="col-md-4">
        <form asp-action="Create">
            <div asp-validation-summary="ModelOnly" class="text-danger"></div>
            <div class="form-group">
                <label asp-for="PostId" class="control-label"></label>
                <input asp-for="PostId" class="form-control" />
                <span asp-validation-for="PostId" class="text-danger"></span>
            </div>
            <div class="form-group">
                <label asp-for="DatePublished" class="control-label"></label>
                <input asp-for="DatePublished" class="form-control" />
                <span asp-validation-for="DatePublished" class="text-danger"></span>
            </div>
            <div class="form-group">
                <label asp-for="Body" class="control-label"></label>
                <input asp-for="Body" class="form-control" />
                <span asp-validation-for="Body" class="text-danger"></span>
            </div>
            <div class="form-group">
                <label asp-for="Title" class="control-label"></label>
                <input asp-for="Title" class="form-control" />
                <span asp-validation-for="Title" class="text-danger"></span>
            </div>
            <div class="form-group">
                <input type="submit" value="Create" class="btn btn-primary" />
            </div>
        </form>
    </div>
</div>

<div>
    <a asp-action="Index">Back to List</a>
</div>

desing is like this 

next post method of create 
---------------------------
[HttpPost]
[ValidateAntiForgeryToken]
public ActionResult Create(Post post)
{
   if(ModelState.IsValid)
    {
        cnt.Posts.Add(post);
        cnt.SaveChanges();
        return RedirectToAction("Index");   
    }
   return View(post);
}

and now see by running the application with url port/post/Create 
and go to index and check and also check in db also 

now edit methods let us try 

in Post controller

// GET: PostController/Edit/5
public ActionResult Edit(int id)
{
    Post post = cnt.Posts.Find(id);
    if(post==null)
    {
        return Content("Post Not found");
    }
    return View(post);
}

// POST: PostController/Edit/5
[HttpPost]
[ValidateAntiForgeryToken]
public ActionResult Edit(Post post)
{
    if (ModelState.IsValid)
    {
        cnt.Entry(post).State =
            Microsoft.EntityFrameworkCore.EntityState.Modified;
        cnt.SaveChanges(true);
        return RedirectToAction("Index");
    }
    return View(post);
}

next edit view 
----------------
@model EntityFrameworkDemo1.Models.Post

@{
    ViewData["Title"] = "Edit";
}

<h1>Edit</h1>

<h4>Post</h4>
<hr />
<div class="row"> 
    <div class="col-md-4">
        <form asp-action="Edit">
            <div asp-validation-summary="ModelOnly" class="text-danger"></div>
            <input type="hidden" asp-for="PostId" />
            <div class="form-group">
                <label asp-for="DatePublished" class="control-label"></label>
                <input asp-for="DatePublished" class="form-control" />
                <span asp-validation-for="DatePublished" class="text-danger"></span>
            </div>
            <div class="form-group">
                <label asp-for="Body" class="control-label"></label>
                <input asp-for="Body" class="form-control" />
                <span asp-validation-for="Body" class="text-danger"></span>
            </div>
            <div class="form-group">
                <label asp-for="Title" class="control-label"></label>
                <input asp-for="Title" class="form-control" />
                <span asp-validation-for="Title" class="text-danger"></span>
            </div> 
            <div class="form-group">
                <input type="submit" value="Save" class="btn btn-primary" />
            </div>
        </form>
    </div>
</div>

<div>
    <a asp-action="Index">Back to List</a>
</div>


details action and its view 
---------------------
        public ActionResult Details(int id)
        {
            Post post = cnt.Posts.Find(id);
            if (post == null)
            {
                return Content("post not found");
            }
            return View(post);
        }
view (ws not shwoing id so added postid also manually in desing)
----
@model EntityFrameworkDemo1.Models.Post

@{
    ViewData["Title"] = "Details";
}

<h1>Details</h1>

<div>
    <h4>Post</h4>
    <hr />
    <dl class="row">
        <dt class="col-sm-2">
            @Html.DisplayNameFor(model => model.PostId)
        </dt>
        <dd class="col-sm-10">
            @Html.DisplayFor(model => model.PostId)
        </dd>

        <dt class = "col-sm-2">
            @Html.DisplayNameFor(model => model.DatePublished)
        </dt>
        <dd class = "col-sm-10">
            @Html.DisplayFor(model => model.DatePublished)
        </dd>
        <dt class = "col-sm-2">
            @Html.DisplayNameFor(model => model.Body)
        </dt>
        <dd class = "col-sm-10">
            @Html.DisplayFor(model => model.Body)
        </dd>
        <dt class = "col-sm-2">
            @Html.DisplayNameFor(model => model.Title)
        </dt>
        <dd class = "col-sm-10">
            @Html.DisplayFor(model => model.Title)
        </dd>
    </dl>
</div>
<div>
    <a asp-action="Edit" asp-route-id="@Model?.PostId">Edit</a> |
    <a asp-action="Index">Back to List</a>
</div>


just go to index page and clck details link it will show 

now delete action method and its view 
-------------------------------------
here i am not creting a view for delete because from the index only using get method i am deleting it no post is there it was there 
but i removed it 

  public ActionResult Delete(int id)
  {
      Post post = cnt.Posts.Find(id);
      cnt.Posts.Remove(post);
      cnt.SaveChanges();
      return RedirectToAction("Index");
  }

Total code of post controller 
-----------------------------
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using EntityFrameworkDemo1.Models;


namespace EntityFrameworkDemo1.Controllers
{
    public class PostController : Controller
    {
        NorthwndContext cnt=new NorthwndContext();

        // GET: PostController
        public ActionResult Index()
        {
            return View(cnt.Posts.ToList());
        }

        // GET: PostController/Details/5
        public ActionResult Details(int id)
        {
            Post post = cnt.Posts.Find(id);
            if (post == null)
            {
                return Content("post not found");
            }
            return View(post);
        }

        // GET: PostController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: PostController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Post post)
        {
           if(ModelState.IsValid)
            {
                cnt.Posts.Add(post);
                cnt.SaveChanges();
                return RedirectToAction("Index");   
            }
           return View(post);
        }

        // GET: PostController/Edit/5
        public ActionResult Edit(int id)
        {
            Post post = cnt.Posts.Find(id);
            if(post==null)
            {
                return Content("Post Not found");
            }
            return View(post);
        }

        // POST: PostController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(Post post)
        {
            if (ModelState.IsValid)
            {
                cnt.Entry(post).State =
                    Microsoft.EntityFrameworkCore.EntityState.Modified;
                cnt.SaveChanges(true);
                return RedirectToAction("Index");
            }
            return View(post);
        }

        // GET: PostController/Delete/5
        public ActionResult Delete(int id)
        {
            Post post = cnt.Posts.Find(id);
            cnt.Posts.Remove(post);
            cnt.SaveChanges();
            return RedirectToAction("Index");
        }

        // POST: PostController/Delete/5
       
    }
}





