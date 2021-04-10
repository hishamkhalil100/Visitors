using System;
using System.Linq;
using System.Web.UI.WebControls;

namespace Vistors
{
    public partial class Vistors_VistorSearch : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

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

                var q = objVistors.VistorsSearch(name, null, txtSearchIDNum.Text.ToString(), null, VistorID).ToList<VistorsSearchResult>();
                if (q.Count <= 0)
                {
                    hfNoti.Value = "notFound";


                }
                else
                {
                    dlUsers.DataSource = q;
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
                if (e.CommandName.Equals("btnAccept"))
                {

                    Response.Redirect("/visitors/vistors/VistorTracking.aspx?ID=" + e.CommandArgument.ToString(), false);
                }
              
            }
            catch (Exception ex)
            {
                Helper.LogError(ex);
                Response.Redirect("/Visitors/Error.aspx");
            }

        }
    }
}