using System;
using System.Globalization;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Reports
{
    public partial class Reports_VistorsWeeklyReport : System.Web.UI.Page
    {
        private int _totalPer1;
        private int _totalPer2;
        private int _totalPer3;
        private int _totalPer4;
        private int _totalPer5;
        private int _totalPer6;
        private int _totalPer7;
        private int _totalPer8;
        private int _totalPer9;
        private int _totalPer10;
        private int _totalPer11;
        private int _sumTotal;
        private int _sumMale;
        private int _sumFemale;
        protected void Page_Load(object sender, EventArgs e)
        {
            // dlUsers.DataSource = new VisitorsDataContext().GetDaysTransctions(null, null);
            // dlUsers.DataBind();
        }

        protected void dlUsers_ItemDataBound(object sender, DataListItemEventArgs e)
        {
            if (e.Item.ItemType != ListItemType.Footer)
            {
                //start filling footer data
                _totalPer1 += int.Parse(DataBinder.Eval(e.Item.DataItem, "per1").ToString());
                _totalPer2 += int.Parse(DataBinder.Eval(e.Item.DataItem, "per2").ToString());
                _totalPer3 += int.Parse(DataBinder.Eval(e.Item.DataItem, "per3").ToString());
                _totalPer4 += int.Parse(DataBinder.Eval(e.Item.DataItem, "per4").ToString());
                _totalPer5 += int.Parse(DataBinder.Eval(e.Item.DataItem, "per5").ToString());
                _totalPer6 += int.Parse(DataBinder.Eval(e.Item.DataItem, "per6").ToString());
                _totalPer7 += int.Parse(DataBinder.Eval(e.Item.DataItem, "per7").ToString());
                _totalPer8 += int.Parse(DataBinder.Eval(e.Item.DataItem, "per8").ToString());
                _totalPer9 += int.Parse(DataBinder.Eval(e.Item.DataItem, "per9").ToString());
                _totalPer10 += int.Parse(DataBinder.Eval(e.Item.DataItem, "per10").ToString());
                _totalPer11 += int.Parse(DataBinder.Eval(e.Item.DataItem, "per11").ToString());
                _sumTotal += int.Parse(DataBinder.Eval(e.Item.DataItem, "Total").ToString());
                _sumMale += int.Parse(DataBinder.Eval(e.Item.DataItem, "Male").ToString());
                _sumFemale += int.Parse(DataBinder.Eval(e.Item.DataItem, "Female").ToString());
                //end filling footer data
                Label lblDate = (Label)e.Item.FindControl("lblDate");
                DateTime date = DateTime.Parse(lblDate.Text);
                String day = string.Empty;
                switch (date.DayOfWeek.ToString())
                {
                    case "Sunday":
                        day = "الأحد";
                        break;
                    case "Monday":
                        day = "الإثنين";
                        break;
                    case "Tuesday":
                        day = "الثلاثاء";
                        break;
                    case "Wednesday":
                        day = "الإربعاء";
                        break;
                    case "Thursday":
                        day = "الخميس";
                        break;
                    case "Friday":
                        day = "الجمعة";
                        break;
                    case "Saturday":
                        day = "السبت";
                        break;

                }

                DateHG cal = new DateHG();
                lblDate.Text = cal.GregToHijri(date.ToString()) + "  " + day;
            }
            else
            {
                ((Label)e.Item.FindControl("lblTotalPer1")).Text = _totalPer1.ToString();
                ((Label)e.Item.FindControl("lblTotalPer2")).Text = _totalPer2.ToString();
                ((Label)e.Item.FindControl("lblTotalPer3")).Text = _totalPer3.ToString();
                ((Label)e.Item.FindControl("lblTotalPer4")).Text = _totalPer4.ToString();
                ((Label)e.Item.FindControl("lblTotalPer5")).Text = _totalPer5.ToString();
                ((Label)e.Item.FindControl("lblTotalPer6")).Text = _totalPer6.ToString();
                ((Label)e.Item.FindControl("lblTotalPer7")).Text = _totalPer7.ToString();
                ((Label)e.Item.FindControl("lblTotalPer8")).Text = _totalPer8.ToString();
                ((Label)e.Item.FindControl("lblTotalPer9")).Text = _totalPer9.ToString();
                ((Label)e.Item.FindControl("lblTotalPer10")).Text = _totalPer10.ToString();
                ((Label)e.Item.FindControl("lblTotalPer11")).Text = _totalPer11.ToString();
                ((Label)e.Item.FindControl("lblSumTotal")).Text = _sumTotal.ToString();
                ((Label)e.Item.FindControl("lblSumMale")).Text = _sumMale.ToString();
                ((Label)e.Item.FindControl("lblSumFemale")).Text = _sumFemale.ToString();
            }
        }

        protected void btnPrint_Click(object sender, EventArgs e)
        {

        }

        protected void btnSearch_Click(object sender, EventArgs e)
        {
            try
            {
                DateHG cal = new DateHG();
                DateTime? startDate;
                if (!string.IsNullOrEmpty(popupDatepicker.Value))
                {
                    startDate = DateTime.ParseExact(cal.HijriToGreg(invertDate(popupDatepicker.Value.ToString())), "yyyy/MM/dd", cal.enCul.DateTimeFormat, DateTimeStyles.AllowWhiteSpaces);
                    dlUsers.DataSource = new VisitorsDataContext().GetDaysTransctions(startDate, startDate.Value.AddDays(7));// week after  selected date
                    dlUsers.DataBind();
                }
            }
            catch (Exception ex)
            {
                Helper.LogError(ex);
                Response.Redirect("/Visitors/Error.aspx");
            }
        }
        private string invertDate(string date)
        {
            string[] arr = date.Split('/');
            string invDate = string.Empty;
            for (int i = arr.Length - 1; i >= 0; i--)
            {
                if (i == 0)
                    invDate += arr[i];
                else
                    invDate += arr[i] + "/";

            }
            return invDate;
        }
    }
}