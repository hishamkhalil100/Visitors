using System;
using System.Web.UI.WebControls;

namespace Reports
{
    public partial class Reports_VistorsDailyReport : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            // dlUsers.DataSource = new VisitorsDataContext().GetDaysTransctions(null, null);
            // dlUsers.DataBind();
        }

        protected void dlUsers_ItemDataBound(object sender, DataListItemEventArgs e)
        {
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
                    startDate = DateTime.ParseExact(cal.HijriToGreg(invertDate(popupDatepicker.Value.ToString())), "yyyy/MM/dd", cal.enCul.DateTimeFormat);
                    dlUsers.DataSource = new VisitorsDataContext().GetDaysTransctions(startDate, startDate.Value.AddDays(1));// week after  selected date
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