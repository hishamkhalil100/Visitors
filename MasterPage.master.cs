using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class MasterPage : System.Web.UI.MasterPage
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
                spnUserName.InnerText = item.UserName;
                if (!item.UserRole.Equals("admin"))
                {
                    liDailyReport.Visible = false;
                    liEmp.Visible = false;
                    liEmpHeader.Visible = false;
                    liMonthlyReport.Visible = false;
                    liReportsHeader.Visible = false;
                    liWeeklyReport.Visible = false;
                }
                if (Request.RawUrl.ToLower().Contains("report.aspx") || Request.RawUrl.ToLower().Contains("usersmanagement.aspx"))
                {
                    if (!item.UserRole.Equals("admin"))
                    {
                        Response.Redirect("~/login.aspx?page=" + Request.RawUrl);
                    }
                }
            }
        }
    }
}
