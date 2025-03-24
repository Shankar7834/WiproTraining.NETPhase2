
When to Use Context API?

When you only need global state for themes, authentication, or simple data.
When Redux is overkill for your application.
When you want to avoid prop drilling. 


This example demonstrates how to use Context API and the useContext hook to manage a global authentication state in a React application.

steps
---------
Create a Context (AuthContext.js)
Wrap the Application with the Provider (index.js or App.js)
Consume the Context in Child Components (Login.js and Dashboard.js)
Toggle Authentication State


now create a app with name usecontextdemo


and then do intial set up now which u do 

USECONTEXTDEMO
│── node_modules
│── public
│   │── index.html
│   │── manifest.json
│── src
│   │── App.css
│   │── App.js
│   │── index.css
│   │── index.js
│── package-lock.json
│── package.json
│── README.md


App.js 
--------

import './App.css';

function App() {
  return (
    <div className="App">
    <h1>Hello World</h1>
    </div>
  );
}

export default App;


index.js 
---------
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


so this is the left out code after the set up okay 

now add one file with the name AuthContext.js in src folder only 

step 1 :
----------

This context manages the authentication state (logged in or logged out).
so here i am creating a context .

AuthContext.js 
---------------
import React, { createContext, useState } from "react";

// Create AuthContext
export const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

  
    function login()
    {
        setIsAuthenticated(true);
    }
    const logout = () => setIsAuthenticated(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


step 2:
---------
2. Wrap the Application with the Provider (index.js)
Ensure all components have access to AuthContext.


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
 
);

step 3:
--------
3. Create a Login Component (Login.js)
This component will allow users to log in and log out.


import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

const Login = () => {
    const { isAuthenticated, login, logout } = useContext(AuthContext);

    return (
        <div>
            <h2>{isAuthenticated ? "Welcome, User!" : "Please log in"}</h2>
            {isAuthenticated ? (
                <button onClick={logout}>Logout</button>
            ) : (
                <button onClick={login}>Login</button>
            )}
        </div>
    );
};

export default Login;


step 4:
---------
4. Create a Dashboard Component (DashBoard.js)
This component will only be accessible when the user is logged in.


import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

const DashBoard = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <div>
            <h2>Dashboard</h2>
            {isAuthenticated ? <p>Welcome to your dashboard!</p> : <p>Please log in to access this page.</p>}
        </div>
    );
};

export default DashBoard;


step 5:
--------
5. Main Application (App.js)
Include both Login and Dashboard components.


import React from "react";
import Login from "./Login";
import DashBoard from "./DashBoard";

const App = () => {
  return (
    <div>
      <h1>React Context API Example</h1>
      <Login />
      <DashBoard />
    </div>
  );
};

export default App;



How It Works
The AuthContext stores authentication state.
The AuthProvider makes state available to all child components.
The Login component toggles authentication (login and logout functions).
The Dashboard component checks authentication and conditionally displays content.


Output Behavior
Initially: "Please log in" with a "Login" button.
After clicking Login:
"Welcome, User!" is displayed.
"Logout" button appears.
Dashboard becomes accessible.
Clicking Logout:
Reverts to the logged-out state.


Why Use Context API?
✔ Avoids prop drilling (no need to pass props manually).
✔ Simplifies state management without Redux.
✔ Great for global states like authentication, themes, and language settings.

 

Git Basics 
***********
All of you install git in your laptop 

https://git-scm.com/downloads

go to above link and download local git into your laptop 


open gitbash

go to drive https://drive.google.com/drive/folders/1AKrv_IbdPOVkZJsZ9W1ESrUkK5lHnZ7c?usp=sharing

and in phase 2 day 3 reduxopedia download the folder from there into local disk and from there copy this folder after extracting into gitdemos fodler 

so afer pasting it in gitdemos folder u though gitbash again try to reach that routopedia folder okay 

after reaching theee through gitbash write the folowinng commadns to upload in github 


git init 

to make the folder initlized with git it will keep an aye on the fodler which u have created 

then type git status 

it will tell that u have not commited yet means u have not tranferred thses files to any online repository he is sayinng 

so before commiting any files here commit means saving till today like that before commitingn i need to send them to staging state staging state means before getting commited 
that state is called staging state 

git add . this wwill send all files to staging state means before comminting i am sending them to this stage 

now again do 

git status   all will be shown in grren symbol means they are ready to be commited or saved 

git commit -m "first uplaod "

now again git status 

and then say git log 

to see when i had done commit and what is the message 

now i want to upload this folder to github why because my system may crash or for safety reasons i want to uplaod 


now go to gitgub and create a repsotory with name reduxopedia 


 write this command to establsih connection with remote repsoitory 
 
$ git remote add origin https://github.com/raghuponde/reduxopedia.git

To check whether connection has happned or not with the remote origin here origin means that remote url 
$ git remote -v

then u can see like this 
  
origin  https://github.com/raghuponde/reduxopedia.git (fetch)
origin  https://github.com/raghuponde/reduxopedia.git (push)

now write the command to push your code to this online repsototy 

git push -u origin master 

now it will be uploaded and now refresh the browser of github 

now this uploaded folder or this online repsoitory i want to clone it or copy it in another fodler say d drive copyproject folder i want to copy 

Note when u copy the fodler from repository no need to put git init there as anyhting which is there in github it is already git intilized only 


$ git clone https://github.com/raghuponde/reduxopedia.git


so here the url u will get it from  clicking code and https url 

now if u go to reduxopedia it is already intilized with git 

now i  delete images in images folder of copied reduxopedia 

then git status 

raghavendra@LAPTOP-4G8BHPK9 MINGW64 /d/copyproject/reduxopedia (master)
$ git status
On branch master
Your branch is up to date with 'origin/master'.

Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        deleted:    src/images/logo192.png
        deleted:    src/images/logo512.png

no changes added to commit (use "git add" and/or "git commit -a")

raghavendra@LAPTOP-4G8BHPK9 MINGW64 /d/copyproject/reduxopedia (master)
$

Telling me that i ha ddeleted two images 

now say git add .

then git stauts  showing green about to be commited 

git commit -m "two images deledt "


then git log 

raghavendra@LAPTOP-4G8BHPK9 MINGW64 /d/copyproject/reduxopedia (master)
$ git log
commit de0d68a720ed34ee9171bc1a8b3bed6b62012fa9 (HEAD -> master)
Author: raghu <raghu070882@gmail.com>
Date:   Tue Mar 4 10:41:38 2025 +0530

    two files deleted

commit 50c4ad9301ee4e623a436bb496a7954f081a43c7 (origin/master, origin/HEAD)
Author: raghu <raghu070882@gmail.com>
Date:   Tue Mar 4 10:19:07 2025 +0530

    firt uplaod

now this project i want to uplaod in reduxopedia 

git remote -v 

see the origin so connection is still there 

so now i had deeted the images now if upload i will overrite earlier repository and i cannot see images which i have deleted 

git push -u origin master 

this will uplaod latest and refesh the page of respsiotry again 


All commands at one place for git hub upload 
----------------------------------------------
git init 
git status 
git add .
git status
git commit -m " some message "


here create a repository in github with the name of your local folder 
  
git remote -v  (if u dont see the remote connection)
$ git remote add origin https://github.com/raghuponde/reduxopedia.git
git remote -v (now u can see the remote connection from local git )
git push -u origin master 
refresh the page

for cloning 
----------
from any folder  

git clone url 

go to that folder u can find git initlized repository 


so any chnage u do in local say git add . and git status and check all should be green and do commit and push it to main branch so 

ADO.NET (ACTIVEX DATA OBJECT.NET)
********************************

In organiztions,bussiness applications need to manage voluminious data .Data is stored in a related database in the form of related tables.retriving and manipulating data directly from database requires knowledge of database commands so overcome this drawback and we need to provide an friendly interface where user can just click the button and everything gets done automatically so we require a technology which is called ado.net means activex data objects .net so it means it is a part of .NET framework architecture .It is a model used by .net applications to communicate with the database for retriving ,accessing and updating data.so ado.net is an interface between client applications and datasources.

A client application can be windows application ,web application or other client applications such as office 
and data sources can be database ,text files ,xml files and can be webserver also holding some other database or other related information.This model is designed in such a way that a developer can access and write to wide variety of data sources such as Microsoft sql server and xml.By using ADO.NET data can be retrived from one data source and and saved in another.For example data can be retrived from microsoft excel and then saved in xml document.


The data residing in a database is retrived through data provider.The data provider is set of components including
the connection,coomand,datareader and dataadapter objects.It provides data to application and updates database
with changes made in application.

add dependency System.Data.sqlclinet from mange nugget packages 
now i am showing demo on connected architecture which is data reader class 

ado.net classes :
-----------------
1)sqlconnection :This class is used to establish connection between front end and back end it has got two methods 
one is open() and other is close() as we are working in connection oreiented architecture of the database we need these methods using open() method we can open already established connection and using close() method we can anyhow close the connection.
so this is for the namespace using System.Data.sqlclient ;
and if u are using System.Data.Oledb then the class will be oledbconnection class only prefix changes as we are going to do maximum programs in sql server i am using in built provider of sql server 2005 so i am using sql connection class only ...and all terms will come like this only 


2)sqlcommand class : This class is used to send sql statements to back end using this class we can execute all sql statements 
it has got 3 methods 

1)executereader () :This method is used to execute select statement this method gives collection of rows and columns and this method returns sqldatareader class so we have to catch the value in sqldatareader object 

2)executescalar( ): This method executes select statement and returns only one row from  the backend .

3)executenonquery () : This method is used to execute dml statements like insert,update and delete and it has used to execute  procedures,functions etc also .

so maximum we will be using executenonquery() method only here 

3)sqldatareader: Using this class we can store single table it works as forward record set only and i datareader by default the cursor is located before first record and column index starts at 0 and ends at fieldcount- 1

it has got two methods :
read() : this method is used to change the cursor postion to next record
close() : using this method we can reset datareader values after getting values from database.

so let us write our first program where i can insert,update ,delete and then select and say next also to move forward records and then i will include one combobox also for selecting values from it to display according to the ids and using this id i will jump to another form of related table and fill or do insert update and delete on child table as well

First go the database and create the following related tables like this 

use Wipro4

drop table student;
create table student(studentid int primary key,studentname varchar(30));

create table course(courseid int primary key ,coursename varchar(30),duration  int,
studentid int foreign key references student(studentid));

select * from student;
select * from course;

insert into student values(101,'ravi')

open one windows application and design the interface like this 

----------------------------------------------combobox -----------

student id --------------------

student name :---------------------

insert | update | delete | display |next| displayall

------------------------------------------------------------------

open this application in normal windows only not in .net framework winforms so c# all plotform desktop drops down u need to selct 

give name Ado.netDemo as project name .net core 8.0 let it be so start desinging it as per above 

now click the insert button first 

insert button code along with sqlconnection codes intially
-----------------------------------------------------------
using System.Data.SqlClient;
namespace Ado.netDemo
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }
        SqlConnection cnn = new SqlConnection(@"data source=LAPTOP-4G8BHPK9\SQLEXPRESS;initial catalog=Wipro4;Integrated Security=true;");
        private void button1_Click(object sender, EventArgs e)
        {
            cnn.Open();
            SqlCommand cmd = new SqlCommand("insert into student values(@studid1,@studname1)", cnn);
            cmd.Parameters.AddWithValue("@studid1",Convert.ToInt16(textBox1.Text));
            cmd.Parameters.AddWithValue("@studname1", textBox2.Text);
           int rowsAffected= cmd.ExecuteNonQuery();
            if (rowsAffected > 0)
            {
                MessageBox.Show("studnent inserted ");
            }
            else
            {
                MessageBox.Show("studnet not inserted");
            }
            cnn.Close();

        }
    }
}

now i will put at  a time update and delete logic also in this below code


using System.Data.SqlClient;
namespace Ado.netDemo
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }
        SqlConnection cnn = new SqlConnection(@"data source=LAPTOP-4G8BHPK9\SQLEXPRESS;initial catalog=Wipro4;Integrated Security=true;");
        private void button1_Click(object sender, EventArgs e)
        {
            cnn.Open();
            SqlCommand cmd = new SqlCommand("insert into student values(@studid1,@studname1)", cnn);
            cmd.Parameters.AddWithValue("@studid1", Convert.ToInt16(textBox1.Text));
            cmd.Parameters.AddWithValue("@studname1", textBox2.Text);
            int rowsAffected = cmd.ExecuteNonQuery();
            if (rowsAffected > 0)
            {
                MessageBox.Show("studnent inserted ");
            }
            else
            {
                MessageBox.Show("studnet not inserted");
            }
            cnn.Close();

        }

        private void button2_Click(object sender, EventArgs e)
        {
            cnn.Open();
            SqlCommand cmd = new SqlCommand("update student set studentname=@studentname1 where studentid=@studentid1", cnn);
            cmd.Parameters.AddWithValue("@studentname1", textBox2.Text);
            cmd.Parameters.AddWithValue("@studentid1", Convert.ToInt16(textBox1.Text));
            int rowsAffected = cmd.ExecuteNonQuery();
            if (rowsAffected > 0)
            {
                MessageBox.Show("student updated ");

            }
            else
            {
                MessageBox.Show("student not updated");
            }
            cnn.Close();
        }

        private void button3_Click(object sender, EventArgs e)
        {
            cnn.Open();
            SqlCommand cmd = new SqlCommand("delete from student where studentid=@studentid1", cnn);
            cmd.Parameters.AddWithValue("@studentid1", Convert.ToInt32(textBox1.Text));
            int rowsAffeceted = cmd.ExecuteNonQuery();
            if (rowsAffeceted > 0)
            {
                MessageBox.Show("student deleted  ");

            }
            else
            {
                MessageBox.Show("student not deleted");
            }
            cnn.Close();
        }
    }
}

see here u have to put osme value in textbox1 in ordeer to update and delete as for which u want to update and delete it shoudl be known

now furthe code for display and next 


using System.Data.SqlClient;
namespace Ado.netDemo
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }
        SqlConnection cnn = new SqlConnection(@"data source=LAPTOP-4G8BHPK9\SQLEXPRESS;initial catalog=Wipro4;Integrated Security=true;");
        private void button1_Click(object sender, EventArgs e)
        {
            cnn.Open();
            SqlCommand cmd = new SqlCommand("insert into student values(@studid1,@studname1)", cnn);
            cmd.Parameters.AddWithValue("@studid1", Convert.ToInt16(textBox1.Text));
            cmd.Parameters.AddWithValue("@studname1", textBox2.Text);
            int rowsAffected = cmd.ExecuteNonQuery();
            if (rowsAffected > 0)
            {
                MessageBox.Show("studnent inserted ");
            }
            else
            {
                MessageBox.Show("studnet not inserted");
            }
            cnn.Close();

        }

        private void button2_Click(object sender, EventArgs e)
        {
            cnn.Open();
            SqlCommand cmd = new SqlCommand("update student set studentname=@studentname1 where studentid=@studentid1", cnn);
            cmd.Parameters.AddWithValue("@studentname1", textBox2.Text);
            cmd.Parameters.AddWithValue("@studentid1", Convert.ToInt16(textBox1.Text));
            int rowsAffected = cmd.ExecuteNonQuery();
            if (rowsAffected > 0)
            {
                MessageBox.Show("student updated ");

            }
            else
            {
                MessageBox.Show("student not updated");
            }
            cnn.Close();
        }

        private void button3_Click(object sender, EventArgs e)
        {
            cnn.Open();
            SqlCommand cmd = new SqlCommand("delete from student where studentid=@studentid1", cnn);
            cmd.Parameters.AddWithValue("@studentid1", Convert.ToInt32(textBox1.Text));
            int rowsAffeceted = cmd.ExecuteNonQuery();
            if (rowsAffeceted > 0)
            {
                MessageBox.Show("student deleted  ");

            }
            else
            {
                MessageBox.Show("student not deleted");
            }
            cnn.Close();
        }
        SqlDataReader dr;
        private void button4_Click(object sender, EventArgs e)
        {
            cnn.Open();
            SqlCommand cmd = new SqlCommand("select * from student", cnn);
            dr = cmd.ExecuteReader();//now this reader is pointing to table so first row u want to read 
            dr.Read();// cursor will now point to first row 
            textBox1.Text = dr[0].ToString();
            textBox2.Text = dr[1].ToString();
            //note here dont close the connection because in next button next row i will read 
            // u can see first row only 
        }

        private void button5_Click(object sender, EventArgs e)
        {
            dr.Read();//whnever u clck this button cursor will point to next row and while poinitn it is reading also 
            textBox1.Text = dr[0].ToString();
            textBox2.Text = dr[1].ToString();
        }

         private void button6_Click(object sender, EventArgs e)
        {
            cnn.Open();
            SqlCommand cmd = new SqlCommand("select * from student", cnn);
            dr = cmd.ExecuteReader(); 
            while (dr.Read())
            {
                MessageBox.Show("Studentid:" + dr[0].ToString() + "\n studentname:" + dr[1].ToString());
            }
        }
        
    }
}

Note  i had not closed the connection as i want to read next row vale in next button click 

now double click on the form area you will get form load event so in this form load event i want to upload ids of students in drop down 

private void Form1_Load(object sender, EventArgs e)
{
    cnn.Open();
    SqlCommand cmd = new SqlCommand("select studentid from student", cnn);
    dr = cmd.ExecuteReader();
    comboBox1.Refresh();
    while (dr.Read())
    {
        this.comboBox1.Items.Add(dr[0].ToString());
    }
    cnn.Close();
}

then now double clik the drop down and in slected chnage event write this code 

 private void comboBox1_SelectedIndexChanged(object sender, EventArgs e)
 {
     cnn.Open();
     SqlCommand cmd = new SqlCommand("select * from student where studentid="
         + Convert.ToInt16(comboBox1.Text), cnn);
     dr = cmd.ExecuteReader();
     dr.Read();
     textBox1.Text = dr[0].ToString();
     textBox2.Text = dr[1].ToString();
     cnn.Close();
 }

 now aadd one button and expand  it and say on it courseregister 

 now i am having a value of studentid the value i want to pass to another form which i will create it will be Form2 default name it wil have 

 here i will write two methods one is set method and another is get method when i am in this first form after clicking the courseregister button 

 i will get the value of studentid whatever is there  in textbox1 and that i will set in Form2 let us see now how to do it

 so add one button and one as as Form2.cs which will have design like this 

   right click on project --->add--->Form(windows form) -->default name be Form2.cs

   Course Form
--------------------------------
| courseid       [__________] |
| coursename     [__________] |
| Duration       [__________] |
| whichstudent   [__________] |
--------------------------------
|  [ Insert ]  [ Update ]  [ Delete ] |
--------------------------------
Brackets [__________] represent input fields.

Buttons [ Insert ] [ Update ] [ Delete ] are at the bottom.

Here anybody can do sql injection means he can go to text box and write sql command like select * from table name so to provide security 
i will not write the commands direclty i will use stored procedure 

stored Procedure may return or may not return a value .
In store procedure parameters will be passed and will do some logic using those parameters 
  it acts  a precompiled object when you want to do permanent changes in the database we go for stored procedures

syntax 
---------
create proc <procname>(parameters list)
 as
 begin 


logic writtne here 


end 

call astored procedure 

exec <procname> paarameters list 

so now i am creating a Stored procedure on the table course where I will write a stored procedure for inserting updating and deleting the course table

So go to Sql Server and write a store procedure on insert course like this

Being in Wipro4 database only 

create proc insertcourse (@cid int ,@cname varchar(40),@duration int,@sid1 int)
as
begin
insert into course values(@cid,@cname,@duration,@sid1)
end

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


Now i have to jump from student form to course form means what ever the primary key of student should be there as foriegn key in course form 

so what i will do i will create a get property in student form  and i will create set proeprty in course form form 

add one button in student form which is course register 

now go to code.cs file of student means right click on the form and say view code 

 public string getstudentid
 {
     get
     {
         return textBox1.Text;
     }
 }
 
 above ia a get proeprty 
 
 and now goto form2 whihc is course there also right clik on the form and say view code and write like this anywhere on top of any button clcik event 
 
  public string setstudentid
 {
     set
     {
         textBox4.Text = value;
     }
 }



Now in button7 of studetn form write liek this code
 private void button7_Click(object sender, EventArgs e)
 {
     Form2 f2=new Form2();
     f2.setstudentid = getstudentid;
     f2.Show();
 }


you can make the textbox4 of Form2 as read onlly so that no body can modify the froeign key 

Now click the insert button and using ado net and using a stored procedure i'll insert values inside the course table
  also written code for update and delete plase check it 

  
  using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Data.SqlClient;
namespace Ado.netDemo
{
    public partial class Form2 : Form
    {
        public Form2()
        {
            InitializeComponent();
        }

        public string setstudentid
        {
            set
            {
                textBox4.Text = value;
            }
        }
        SqlConnection cnn = new SqlConnection(@"data source=LAPTOP-4G8BHPK9\SQLEXPRESS;initial catalog=Wipro4;Integrated Security=true;");
        private void button1_Click(object sender, EventArgs e)
        {
            cnn.Open();
            int cid = Convert.ToInt32(textBox1.Text);
            string cname = textBox2.Text;
            int duration = Convert.ToInt32(textBox3.Text);
            int studid = Convert.ToInt32(textBox4.Text);
            SqlCommand cmd = new SqlCommand("insertcourse", cnn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@cid", cid);
            cmd.Parameters.AddWithValue("@cname", cname);
            cmd.Parameters.AddWithValue("@duration", duration);
            cmd.Parameters.AddWithValue("@sid1", studid);
            int rowsAffcted = cmd.ExecuteNonQuery();
            if (rowsAffcted > 0)
            {
                MessageBox.Show("course added ");
            }
            else
            {
                MessageBox.Show("course not added ");
            }
            cnn.Close();


        }

        private void button2_Click(object sender, EventArgs e)
        {
            cnn.Open();
            int cid = Convert.ToInt32(textBox1.Text);
            string cname = textBox2.Text;
            int duration = Convert.ToInt32(textBox3.Text);
            int studid = Convert.ToInt32(textBox4.Text);
            SqlCommand cmd = new SqlCommand("updatecourse", cnn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@cid", cid);
            cmd.Parameters.AddWithValue("@cname", cname);
            cmd.Parameters.AddWithValue("@duration", duration);
            cmd.Parameters.AddWithValue("@sid1", studid);
            int rowsAffcted = cmd.ExecuteNonQuery();
            if (rowsAffcted > 0)
            {
                MessageBox.Show("course updated ");
            }
            else
            {
                MessageBox.Show("course not updated ");
            }
            cnn.Close();
        }

        private void button3_Click(object sender, EventArgs e)
        {
            cnn.Open();

            int studid = Convert.ToInt32(textBox4.Text);
            SqlCommand cmd = new SqlCommand("deletecourse", cnn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@sid1", studid);
            int rowsAffcted = cmd.ExecuteNonQuery();
            if (rowsAffcted > 0)
            {
                MessageBox.Show("course deleted and cascadingly student also got deleted ");
            }
            else
            {
                MessageBox.Show("Nothing has been deleted  ");
            }
            cnn.Close();
        }
    }
}

update logic 
-------------
 what u do the student who has registered the course for that student only jump to course formm and u know course id so on text box1 keep the course id and modify other column details and click    the update button to see the chnages refer db tabels of course

delete logic
-----------
here in sp both values of student and course will be deleetd and u have to just select the student id who has taken courses 
   
Disconnected architecture of  ADO.NET
----------------------------------------
DATASET TECHNOLOGY :
--------------------
All features in backend are present in dataset ,so if we want all the  ado.net features we can get it  from dataset.The Dataset is having collection of datatables,so dataset is connectionless database management system,Dataset is having collection of data relations,in dataset we can create dataviews, using dataset we can integrate with xml,so dataset improves the application performance ,In dataset we can generate sql statements automatically.

when using connectionless we use xml file ,so we store dataset values into xml .Many subclasses are provided in dataset.

         DB
         |
     ----------------
     |   Dataset   |
     ----------------
         |
     ----------------
     | DataTables  |
     ----------------
         |
     ----------------
     |  DataTable  |
     ----------------
         |
   --------------------------------
   |                              |
----------------        -------------------
|  DataRows  |        |   Data Column   |
----------------        -------------------
   |                              |
----------------        -------------------
|   DataRow   |        |   Data Column   |
----------------        -------------------
                                  |
                          -------------------
                          |  Data Relation  |
                          -------------------

so dataset is collection of tables so which is nothing but DataTables class and in which each table is represented by DataTable class and each DataTable class is having set of rows and columns which are represnted by DataRows for set of rows to retrive and DataColumns  which will have collection of columns. 

under set of rows each row is represnted by a DataRow class and under set of columns each column is represnted by DataColumn class and DataRelation class as we cannot show relationship in rows but when column comes datarelation class comes into picture like this we are having these many classes in dataset and each one has its own use and properties defined for it .


so this is brief history of dataset architecture .

we should remeber the following commands which we will be using while connecting and retriving values from dataset technology .

1)DataTable=ds.Tables["emp"]

if u have given a dataset if u want to retrive one table into DataTable class use above formula and generally what ever u want to retrive create their classes with objects in global section class and use it which we will be seeing in the programming part.above here emp is the employee table name okay 

so in the DataTable class i can store one table from the dataset 

2)DataRow=dt.Rows[0];  or DataRow=ds.tables["emp"].rows[0];
            
so In DataRow class we can store one row from the datatable as well as from the DataSet;
as mentioned above 

3)DataColumn=ds.tables["emp"].columns["eno"]; or DataColumn=dt.Columns["empno"];

There is one class which is called DataAdapter class and it is communicator between DataSet and Back End using single dataadapter class we can store one table in dataset so using multiple dataadapter classes we can store multiple tables in dataset.

DataGrid :It is a  databound control , we can display datasource form dataset and from datatable in this datagrid control. 

   
There ar some drawabacks in connected architecture 

--->I need to be always connected to the database server I need to open and close the connection based on the requirement 

---->I can work with only one table at  a time means i cannot work with multiple tables

---->I can move forwared direction only in data reader class or in connected architecute i cannot navifate fully ...


Now let us go with demo 

I will be using northwind db for this 

Now create a new project with winforms .net framework 

put one data grid by going to all winform --->choose items--->.net framework components -->data grid of winforms u have to select and put it on form the data grid 


add Dependency again using Nugget package Add the package using system.data.sql client
Right click on the references manage nugget packages because this is net framework windows application
so it is framework so use 4.6.1 versin of system.data.sqlclient 


now double click the form not the grid form so that in form load i can write the code 

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Data.SqlClient;
namespace datasetdemo1
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }
        SqlConnection cnn = new SqlConnection(@"data source=LAPTOP-4G8BHPK9\SQLEXPRESS;initial catalog=NORTHWND;Integrated Security=true;");
        DataSet ds = new DataSet();
        SqlDataAdapter ad1;
        SqlDataAdapter ad2;
        private void Form1_Load(object sender, EventArgs e)
        {
            ad1 = new SqlDataAdapter("select * from Customers", cnn);
            ad2 = new SqlDataAdapter("select * from Products", cnn);
            ad1.Fill(ds, "cc");
            ad2.Fill(ds, "pp");
            dataGrid1.DataSource = ds;

        }
    }
}

Now i want to traverse the table forward direction and back ward direaction 

openn a new windows appliation of .net core not framework and desing the interfce like this 

  Student Form
---------------------------------
| studentid     [__________]    |
| Studentname   [__________]    |
---------------------------------
|  [ << ]  [ > ]  [ < ]  [ >> ]  |
---------------------------------

in the form load event i want to take student table into datatable class 

  so in Form  load event code is like this 
and other button clik codes are like this 

using System.Data;
using System.Data.SqlClient;
namespace navigatingtabledemo
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }
        DataSet ds = new DataSet();
        DataTable dt = new DataTable();

        DataRow dr;
        int rn;
        SqlConnection cnn = new SqlConnection(@"data source=LAPTOP-4G8BHPK9\SQLEXPRESS;initial catalog=Wipro4;Integrated Security=true;");
        private void button1_Click(object sender, EventArgs e)
        {
            rn = 0;
            dr = dt.Rows[rn];
            textBox1.Text = dr[0].ToString();
            textBox2.Text = dr[1].ToString();

        }

        private void Form1_Load(object sender, EventArgs e)
        {
            SqlDataAdapter ad = new SqlDataAdapter("select * from student", cnn);
            ad.Fill(ds, "ss");
            dt = ds.Tables["ss"];
        }

        private void button2_Click(object sender, EventArgs e)
        {
            rn = rn + 1;
            if (rn <= dt.Rows.Count - 1)
            {
                dr = dt.Rows[rn];
                textBox1.Text = dr[0].ToString();
                textBox2.Text = dr[1].ToString();

            }
            else
            {
                rn = rn - 1;
                MessageBox.Show("end of the record ..");
            }
        }

        private void button3_Click(object sender, EventArgs e)
        {
            rn = rn - 1;
            if (rn >= 0)
            {
                dr = dt.Rows[rn];
                textBox1.Text = dr[0].ToString();
                textBox2.Text = dr[1].ToString();

            }
            else
            {
                rn = rn + 1;
                MessageBox.Show("end of the record ..");
            }
        }

        private void button4_Click(object sender, EventArgs e)
        {
            rn = dt.Rows.Count - 1;
            dr = dt.Rows[rn];
            textBox1.Text = dr[0].ToString();
            textBox2.Text = dr[1].ToString();
        }
    }
}

      


  
