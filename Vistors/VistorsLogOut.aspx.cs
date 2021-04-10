using System;
using System.Linq;
using System.Web.UI.WebControls;

namespace Vistors
{
    public partial class Vistors_VistorsLogOut : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                VisitorsDataContext objVistors = new VisitorsDataContext();
                if (Request.Cookies["UserGender"] == null)
                {
                    Response.Redirect("~/Login.aspx?page=" + Request.RawUrl, false);
                }
                // bool userGender = bool.Parse(Request.Cookies["UserGender"].Value.ToString());
                //if (userGender)
                //{
                //    //apply new SP HERE 
                //    dlUsers.DataSource = objVistors.GetCheckInVistors(null);
                //    dlUsers.DataBind();
                //}
                //else
                //{
                dlUsers.DataSource = objVistors.GetCheckInVistors(null);
                dlUsers.DataBind();
                // }
            }
            catch (Exception ex)
            {
                Helper.LogError(ex);
                Response.Redirect("/Visitors/Error.aspx");
            }


        }


        protected void dlUsers_ItemCommand(object source, DataListCommandEventArgs e)
        {
            try
            {
                int? result = null;
                int? id = null;
                if (e.CommandName.Equals("btnAccept"))
                {
                    VisitorsDataContext objVistors = new VisitorsDataContext();
                    objVistors.TransationsCreate(int.Parse(e.CommandArgument.ToString()), DateTime.Now, Request.Cookies["UserWebsiteId"].Value, false, null, null, null, ref result, ref id);

                    if (Request.Cookies["UserGender"] == null)
                    {
                        Response.Redirect("~/Login.aspx?page=" + Request.RawUrl, false);
                    }
                    bool userGender = bool.Parse(Request.Cookies["UserGender"].Value.ToString());
                    if (userGender)
                    {
                        //apply new SP HERE 
                        dlUsers.DataSource = objVistors.GetCheckInVistors(true);
                        dlUsers.DataBind();
                    }
                    else
                    {
                        dlUsers.DataSource = objVistors.GetCheckInVistors(false);
                        dlUsers.DataBind();
                    }
                    DivMsg.Visible = true;
                    pDivNotifiDesc.Text = "تم! تسجيل خروج الزائر بنجاح";
                }
            }
            catch (Exception ex)
            {
                Helper.LogError(ex);
                Response.Redirect("/Visitors/Error.aspx");
            }
        }

        protected void dlUsers_ItemDataBound(object sender, DataListItemEventArgs e)
        {
            bool status = false;
            var q = new VisitorsDataContext().getLastTransaction(int.Parse(((Label)e.Item.FindControl("lblID")).Text.ToString())).ToList<getLastTransactionResult>();
            foreach (var item in q)
            {
                status = item.Statues;
                ((Label)e.Item.FindControl("lblstatus")).Text = item.Statues.ToString();
            }

            if (status)
            {
                ((Button)e.Item.FindControl("btnAccept")).CssClass = "btn active btn-danger";
                ((Button)e.Item.FindControl("btnAccept")).Text = "خروج";
            }
            else
            {
                ((Button)e.Item.FindControl("btnAccept")).CssClass = "btn active btn-success";
                ((Button)e.Item.FindControl("btnAccept")).Text = "دخول";
            }



        }
    }
}