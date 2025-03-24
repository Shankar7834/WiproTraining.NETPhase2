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
