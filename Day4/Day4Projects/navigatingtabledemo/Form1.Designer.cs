namespace navigatingtabledemo
{
    partial class Form1
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            label1 = new Label();
            label2 = new Label();
            textBox1 = new TextBox();
            textBox2 = new TextBox();
            button1 = new Button();
            button2 = new Button();
            button3 = new Button();
            button4 = new Button();
            SuspendLayout();
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Font = new Font("Segoe UI", 16F, FontStyle.Bold);
            label1.Location = new Point(170, 213);
            label1.Name = "label1";
            label1.Size = new Size(162, 45);
            label1.TabIndex = 0;
            label1.Text = "studentid";
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Font = new Font("Segoe UI", 16F, FontStyle.Bold);
            label2.Location = new Point(117, 311);
            label2.Name = "label2";
            label2.Size = new Size(215, 45);
            label2.TabIndex = 1;
            label2.Text = "studentname";
            // 
            // textBox1
            // 
            textBox1.Font = new Font("Segoe UI", 16F, FontStyle.Bold);
            textBox1.Location = new Point(356, 199);
            textBox1.Name = "textBox1";
            textBox1.Size = new Size(150, 50);
            textBox1.TabIndex = 2;
            // 
            // textBox2
            // 
            textBox2.Font = new Font("Segoe UI", 16F, FontStyle.Bold);
            textBox2.Location = new Point(356, 311);
            textBox2.Name = "textBox2";
            textBox2.Size = new Size(276, 50);
            textBox2.TabIndex = 3;
            // 
            // button1
            // 
            button1.Font = new Font("Segoe UI", 16F, FontStyle.Bold);
            button1.Location = new Point(155, 466);
            button1.Name = "button1";
            button1.Size = new Size(112, 110);
            button1.TabIndex = 4;
            button1.Text = "<<";
            button1.UseVisualStyleBackColor = true;
            button1.Click += button1_Click;
            // 
            // button2
            // 
            button2.Font = new Font("Segoe UI", 16F, FontStyle.Bold);
            button2.Location = new Point(307, 466);
            button2.Name = "button2";
            button2.Size = new Size(112, 110);
            button2.TabIndex = 5;
            button2.Text = ">";
            button2.UseVisualStyleBackColor = true;
            button2.Click += button2_Click;
            // 
            // button3
            // 
            button3.Font = new Font("Segoe UI", 16F, FontStyle.Bold);
            button3.Location = new Point(444, 466);
            button3.Name = "button3";
            button3.Size = new Size(112, 110);
            button3.TabIndex = 6;
            button3.Text = "<";
            button3.UseVisualStyleBackColor = true;
            button3.Click += button3_Click;
            // 
            // button4
            // 
            button4.Font = new Font("Segoe UI", 16F, FontStyle.Bold);
            button4.Location = new Point(576, 466);
            button4.Name = "button4";
            button4.Size = new Size(112, 110);
            button4.TabIndex = 7;
            button4.Text = ">>";
            button4.UseVisualStyleBackColor = true;
            button4.Click += button4_Click;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(10F, 25F);
            AutoScaleMode = AutoScaleMode.Font;
            BackColor = Color.FromArgb(255, 192, 255);
            ClientSize = new Size(1238, 850);
            Controls.Add(button4);
            Controls.Add(button3);
            Controls.Add(button2);
            Controls.Add(button1);
            Controls.Add(textBox2);
            Controls.Add(textBox1);
            Controls.Add(label2);
            Controls.Add(label1);
            Name = "Form1";
            Text = "Form1";
            Load += Form1_Load;
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Label label1;
        private Label label2;
        private TextBox textBox1;
        private TextBox textBox2;
        private Button button1;
        private Button button2;
        private Button button3;
        private Button button4;
    }
}
