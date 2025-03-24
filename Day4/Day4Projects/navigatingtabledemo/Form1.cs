
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
