using System;
using System.Globalization;
using System.Linq;
using System.Web.UI.WebControls;

namespace Reports
{
    public partial class Reports_DailyReportPrint : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Cookies["UserWebsiteId"] == null)
                Response.Redirect("~/Login.aspx?page=" + Request.RawUrl);

            if (!IsPostBack)
            {
                var q = new VisitorsDataContext().UsersSearch(Request.Cookies["UserWebsiteId"].Value.ToString()).ToList<UsersSearchResult>();
                foreach (var item in q)
                {
                    if (item.UserRole.Equals("admin"))
                    {
                        //liItemsAdd.Visible = true;
                        //liItemsSearch.Visible = true;
                        //liUsersManagement.Visible = true;
                        //liStatistics.Visible = true;
                    }
                    else if (item.UserRole.Equals("user"))
                    {
                        //liItemsAdd.Visible = true;
                        //liItemsSearch.Visible = true;
                        //liUsersManagement.Visible = false;
                        //liStatistics.Visible = false;
                    }
                    if (Request.RawUrl.Contains("Statistics.aspx") || Request.RawUrl.Contains("UsersManagement.aspx"))
                    {
                        if (item.UserRole.Equals("user"))
                        {
                            Response.Redirect("~/Default.aspx?page=" + Request.RawUrl);
                        }
                    }
                }

                DateHG cal = new DateHG();
                DateTime? startDate;
                try
                {
                    if (!string.IsNullOrEmpty(Request["date"].ToString()))
                    {
                        lbldate.Text = Request["date"].ToString();
                        startDate = DateTime.ParseExact(cal.HijriToGreg(invertDate(Request["date"].ToString())), "yyyy/MM/dd", cal.enCul.DateTimeFormat, DateTimeStyles.AllowWhiteSpaces);
                        dlUsers.DataSource = new VisitorsDataContext().GetDaysTransctions(startDate, startDate.Value.AddDays(1));// week after  selected date
                        dlUsers.DataBind();
                    }
                    else
                    {
                        Response.Redirect("VistorsDailyReport.aspx");
                    }
                }
                catch (NullReferenceException)
                {
                    Response.Redirect("VistorsDailyReport.aspx");

                }
                catch (Exception ex)
                {
                    Helper.LogError(ex);
                    Response.Redirect("/Visitors/Error.aspx");
                }
            }
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