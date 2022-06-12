using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace FarmerCrossRiver001
{
    public partial class Form1 : Form
    {
        private List<String> _leftList;
        private List<String> _rightList;
        private Dictionary<ListBox, List<String>> _myContentDic;

        public Form1()
        {
            InitializeComponent();
            CreateList();
            SetMyDic();
            SetListBox();
            ChangeData();
        }

        private void ChangeData()
        {
            listBox1.DataSource = null;
            listBox2.DataSource = null;
            listBox1.DataSource = _leftList;
            listBox2.DataSource= _rightList;
        }

        private void CrossRiver()
        {
            var source = _myContentDic.First(x => x.Value.Contains("農夫"));
            var target = _myContentDic.First(x => !x.Value.Contains("農夫"));

            var items = source.Key.SelectedItem == null || source.Key.SelectedItem.ToString() == "農夫" ? new List<string> { "農夫" }:new List<string> { "農夫",source.Key.SelectedItem.ToString() };
            source.Value.RemoveAll(item=>items.Contains(item));
            target.Value.AddRange(items);
        }

        private void SetMyDic()
        {
            _myContentDic = new Dictionary<ListBox, List<String>>();
            _myContentDic.Add(listBox1, _leftList);
            _myContentDic.Add(listBox2, _rightList);
        }

        private void SetListBox()
        {
            listBox1.DataSource = _leftList;
            listBox2.DataSource = _rightList;
            listBox1.SelectionMode = SelectionMode.One;
            listBox2.SelectionMode = SelectionMode.One;
        }

        private void CreateList()
        {
            _leftList = new List<String>() { "農夫", "狼", "羊", "菜" };
            _rightList = new List<String>();
        }

        private void JudgeGameState()
        {
            //贏
            if (_leftList.Count == 0 || _rightList.Count == 4)
            {
                MessageBox.Show("恭喜過關!");
            }
            //輸的情況
            else if (IsLoseGame(_leftList) || IsLoseGame(_rightList))  //左岸沒農夫
            {
                MessageBox.Show("GG失敗!");
            }

        }

        private bool IsLoseGame(List<string> list)
        {
            if (list.Contains("農夫"))
            {
                return false;
            }

            return list.Contains("狼") && list.Contains("羊") || list.Contains("羊") && list.Contains("菜");

        }

        private void goRight_Click(object sender, EventArgs e)
        {
            CrossRiver();
            ChangeData();
            JudgeGameState();
        }

        private void goLeft_Click(object sender, EventArgs e)
        {
            CrossRiver();
            ChangeData();
            JudgeGameState();
        }

        private void reset_Click(object sender, EventArgs e)
        {
            CreateList();
            SetListBox();
            SetMyDic();
            ChangeData();
        }

     
    }
}
