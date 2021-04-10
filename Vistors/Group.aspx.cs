using System;
using System.Linq;
using System.Web.UI.WebControls;

namespace Vistors
{
    public partial class Vistors_Group : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {


        }

        protected void btnSearch_OnClick(object sender, EventArgs e)
        {
            var q = new VisitorsDataContext().getVistorsGroupByID(txtId1.Value, txtId2.Value, txtId3.Value, txtId4.Value, txtId5.Value, txtId6.Value).ToList<getVistorsGroupByIDResult>();
            dlUsers.DataSource = q;
            dlUsers.DataBind();
            dlfooter.DataSource = q;
            dlfooter.DataBind();
        }

        protected void dlUsers_OnItemDataBound(object sender, DataListItemEventArgs e)
        {
            Label lblName = (Label)e.Item.FindControl("lblName");
            Label lblGender = (Label)e.Item.FindControl("lblGender");
            Label lblMobile = (Label)e.Item.FindControl("lblMobile");
            Label lblCountry = (Label)e.Item.FindControl("lblCountry");
            Label lblNID = (Label)e.Item.FindControl("lblNID");
            Label lblNIDType = (Label)e.Item.FindControl("lblNIDType");

            getVistorsGroupByIDResult result = (getVistorsGroupByIDResult)e.Item.DataItem;

            lblName.Text = result.Name;
            if ((bool)result.Gender)
            {
                lblGender.Text = "ذكر";
            }
            else
            {
                lblGender.Text = "انثي";
            }

            lblMobile.Text = result.Mobile;
            lblCountry.Text = result.CountryName;
            if (string.IsNullOrEmpty(result.AlternativeID))
            {
                lblNID.Text = result.NationalID;
                lblNIDType.Text = "هوية/إقامة";
            }
            else
            {
                lblNID.Text = result.AlternativeID;
                lblNIDType.Text = result.typeAr;
            }


        }
    }
}