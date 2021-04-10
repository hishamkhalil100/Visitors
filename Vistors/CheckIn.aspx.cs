using System;
using System.Linq;
using System.Web.UI.WebControls;

namespace Vistors
{
    public partial class Vistors_CheckIn : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["status"] != null && Session["status"].ToString().Equals("Success"))
            {
                Session["status"] = string.Empty;
                hfNoti.Value = "successCheckIn";
            }
            if (Session["vistorAdd"] != null && Session["vistorAdd"].ToString().Equals("Success"))
            {
                hfNoti.Value = "successAdd";
                Session["vistorAdd"] = string.Empty;
                //DivMsg.Visible = true;
                //pDivNotifiDesc.Text = "تم! إضافة الزائر بنجاح";
            }
        }
        protected void btnSearch_Click(object sender, EventArgs e)
        {
            try
            {
                VisitorsDataContext objVistors = new VisitorsDataContext();
                int? VistorID = null;
                string name = null;
                if (!txtVistorID.Text.ToString().Equals("") && !txtVistorID.Text.ToString().Equals(string.Empty) && txtVistorID.Text.ToString() != null)
                    VistorID = int.Parse(txtVistorID.Text.ToString());
                if (!txtSearchIDNum.Text.ToString().Equals("") && !txtSearchIDNum.Text.ToString().Equals(string.Empty) && txtSearchIDNum.Text.ToString() != null)
                    name = txtSearchIDNum.Text.ToString();

                var q = objVistors.VistorsSearch(name , null, txtSearchIDNum.Text.ToString(), null, VistorID).ToList<VistorsSearchResult>();
                if (q.Count <= 0)
                {
                    hfNoti.Value = "notFound";


                }
                else
                {
                    hfNoti.Value = "";
                    dlUsers.DataSource = objVistors.VistorsSearch(name, null, txtSearchIDNum.Text.ToString(), null, VistorID);
                    dlUsers.DataBind();
                }
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
                if (e.CommandName.Equals("btnAccept"))
                {
                    bool status = false;
                    if (!((Label)e.Item.FindControl("lblstatus")).Text.ToString().Equals(string.Empty) && ((Label)e.Item.FindControl("lblstatus")).Text.ToString() != null)
                    {
                        status = bool.Parse(((Label)e.Item.FindControl("lblstatus")).Text.ToString());
                    }

                    if (!status)
                    {
                        Response.Redirect("/Visitors/vistors/CheckInDetails.aspx?ID=" + e.CommandArgument.ToString(), false);
                    }
                    else
                    {
                        int? id = null;
                        new VisitorsDataContext().TransationsCreate(int.Parse(e.CommandArgument.ToString()), DateTime.Now, Request.Cookies["UserWebsiteId"].Value, false, null, null, null, ref result, ref id);
                        ((Label)e.Item.FindControl("lblstatus")).Text = "False";
                        ((Button)e.Item.FindControl("btnAccept")).CssClass = "btn active btn-success";
                        ((Button)e.Item.FindControl("btnAccept")).Text = "دخول";
                        hfNoti.Value = "successExit";
                    }
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