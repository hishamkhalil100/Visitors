using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Login : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request["logout"] == "true")
        {
            HttpCookie UserWebsiteId = new HttpCookie("UserWebsiteId");
            UserWebsiteId.Expires = DateTime.Now.AddDays(-1);
            Response.Cookies.Add(UserWebsiteId);
        }
    }
    protected void btnLogin_Click(object sender, EventArgs e)
    {
        try
        {
            string Msg = string.Empty;
            string UserRoleId = string.Empty;
            string UserId = txtUserName.Text;
            bool isValid = ActiveDirectoryManagment.ValidateUser(txtUserName.Text, txtPassword.Text);
            var q = new VisitorsDataContext().IsValidUser(txtUserName.Text).Single();

            if (q != null && isValid & (bool)!q.UserIsLocked)
            {
                HttpCookie UserWebsiteId = new HttpCookie("UserWebsiteId");
                UserWebsiteId.Value = UserId;
                Response.Cookies.Add(UserWebsiteId);

                HttpCookie UserGender = new HttpCookie("UserGender");
                UserGender.Value = q.UserGender.ToString();
                Response.Cookies.Add(UserGender);

                HttpCookie SecurityType = new HttpCookie("SecurityType");// if it is leader or Manager
                SecurityType.Value = q.UserRole;
                Response.Cookies.Add(SecurityType);

                if (chkRemberMe.Checked)
                {
                    UserWebsiteId.Expires = DateTime.Now.AddDays(30);
                    SecurityType.Expires = DateTime.Now.AddDays(30);
                    UserGender.Expires = DateTime.Now.AddDays(30);
                }
                else
                {
                    UserWebsiteId.Expires = DateTime.Now.AddDays(-1);
                    SecurityType.Expires = DateTime.Now.AddDays(-1);
                    UserGender.Expires = DateTime.Now.AddDays(-1);
                }


                if (Request.QueryString["page"] == null)
                    Response.Redirect("Vistors/CheckIn.aspx");
                else
                    Response.Redirect(Request.QueryString["page"].ToString());


            }
            else
            {
                DivMsg.Visible = true;
            }
        }
        catch (Exception ex)
        {
            DivMsg.Visible = true;
            Helper.LogError(ex);
        }
    }
}