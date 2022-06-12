namespace FarmerCrossRiver001
{
    partial class Form1
    {
        /// <summary>
        /// 必需的设计器变量。
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// 清理所有正在使用的资源。
        /// </summary>
        /// <param name="disposing">如果应释放托管资源，为 true；否则为 false。</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows 窗体设计器生成的代码

        /// <summary>
        /// 设计器支持所需的方法 - 不要修改
        /// 使用代码编辑器修改此方法的内容。
        /// </summary>
        private void InitializeComponent()
        {
            this.listBox1 = new System.Windows.Forms.ListBox();
            this.listBox2 = new System.Windows.Forms.ListBox();
            this.goRight = new System.Windows.Forms.Button();
            this.goLeft = new System.Windows.Forms.Button();
            this.reset = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // listBox1
            // 
            this.listBox1.FormattingEnabled = true;
            this.listBox1.ItemHeight = 15;
            this.listBox1.Location = new System.Drawing.Point(119, 96);
            this.listBox1.Name = "listBox1";
            this.listBox1.Size = new System.Drawing.Size(103, 244);
            this.listBox1.TabIndex = 0;
            // 
            // listBox2
            // 
            this.listBox2.FormattingEnabled = true;
            this.listBox2.ItemHeight = 15;
            this.listBox2.Location = new System.Drawing.Point(496, 96);
            this.listBox2.Name = "listBox2";
            this.listBox2.Size = new System.Drawing.Size(103, 244);
            this.listBox2.TabIndex = 1;
            // 
            // goRight
            // 
            this.goRight.Location = new System.Drawing.Point(324, 127);
            this.goRight.Name = "goRight";
            this.goRight.Size = new System.Drawing.Size(75, 23);
            this.goRight.TabIndex = 2;
            this.goRight.Text = "-->";
            this.goRight.UseVisualStyleBackColor = true;
            this.goRight.Click += new System.EventHandler(this.goRight_Click);
            // 
            // goLeft
            // 
            this.goLeft.Location = new System.Drawing.Point(324, 204);
            this.goLeft.Name = "goLeft";
            this.goLeft.Size = new System.Drawing.Size(75, 30);
            this.goLeft.TabIndex = 3;
            this.goLeft.Text = "<--";
            this.goLeft.UseVisualStyleBackColor = true;
            this.goLeft.Click += new System.EventHandler(this.goLeft_Click);
            // 
            // reset
            // 
            this.reset.Location = new System.Drawing.Point(324, 300);
            this.reset.Name = "reset";
            this.reset.Size = new System.Drawing.Size(75, 23);
            this.reset.TabIndex = 4;
            this.reset.Text = "重新";
            this.reset.UseVisualStyleBackColor = true;
            this.reset.Click += new System.EventHandler(this.reset_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.reset);
            this.Controls.Add(this.goLeft);
            this.Controls.Add(this.goRight);
            this.Controls.Add(this.listBox2);
            this.Controls.Add(this.listBox1);
            this.Name = "Form1";
            this.Text = "Form1";
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.ListBox listBox1;
        private System.Windows.Forms.ListBox listBox2;
        private System.Windows.Forms.Button goRight;
        private System.Windows.Forms.Button goLeft;
        private System.Windows.Forms.Button reset;
    }
}

