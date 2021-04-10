using System;
using System.Linq;

namespace Vistors
{
    public partial class Vistors_CheckInDetails : System.Web.UI.Page
    {
        #region Events
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {

                try
                {
                    // for cheack if vistor already logged in 
                    var q = new VisitorsDataContext().getLastTransaction(int.Parse(Request["ID"].ToString())).ToList<getLastTransactionResult>();
                    foreach (var item in q)
                    {
                        if (!item.Statues)
                        {

                            getData();
                            GetAllDepartments();
                        }
                        else
                        {

                          //  Response.Redirect("/Visitors/Error.aspx");
                        }
                    }
                    // for cheack if vistor exists
                    if (q.Count == 0)
                    {
                        var query = new VisitorsDataContext().VistorsSearch(null, null, null, null, int.Parse(Request["ID"].ToString())).ToList<VistorsSearchResult>();
                        if (query.Count == 0)
                        {
                            Response.Redirect("/Visitors/Error.aspx");
                        }
                        else
                        {
                            getData();
                            GetAllDepartments();
                        }
                    }
                }
                catch (Exception ex)
                {
                    Helper.LogError(ex);
                    Response.Redirect("/Visitors/Error.aspx");
                }
            }

        }

        protected void btnSave_Click(object sender, EventArgs e)
        {
            int? result = null;
            try
            {
                result = insert();
            }
            catch (Exception ex)
            {
                Helper.LogError(ex);
                result = -2;

            }
            finally
            {
                if (result == 1)
                {
                    Session["status"] = "Success";

                    Response.Redirect("/Visitors/vistors/CheckIn.aspx");

                }
                else if (result == -2)
                {
                    DivMsg.Visible = true;

                }
            }
        }

        protected void btnReset_Click(object sender, EventArgs e)
        {
            Response.Redirect("/Visitors/vistors/CheckIn.aspx");
        }

        protected void ckManualTime_CheckedChanged(object sender, EventArgs e)
        {
            if (ckManualTime.Checked)
            {
                divCkManualTime.Attributes.Remove("class");
                divCkManualTime.Attributes.Add("class", "col-md-4  mt10");
                divHours.Visible = true;
                divMinutes.Visible = true;
            }
            else
            {
                divCkManualTime.Attributes.Remove("class");
                divCkManualTime.Attributes.Add("class", "col-md-12  mb20");
                divHours.Visible = false;
                divMinutes.Visible = false;
            }
        }
        #endregion
        #region Methods
        private void getData()
        {
            VisitorsDataContext objVisitorsDataContext = new VisitorsDataContext();
            var item = new VisitorsDataContext().VistorsSearch(null, null, null, null, int.Parse(Request["ID"].ToString())).Single<VistorsSearchResult>();
            txtIDNum.Text = item.VisitorID.ToString();
            txtMobile.Text = item.MobileNo;
            txtName.Text = item.Name;

        }
        private void GetAllDepartments()
        {

            var query = (from w in new VisitorsDataContext().GetAllDepartments() orderby w.Priority select w).ToList<GetAllDepartmentsResult>();


            ddlDepartments.DataTextField = "Department_Name";
            ddlDepartments.DataValueField = "Department_ID";
            ddlDepartments.DataSource = query;
            ddlDepartments.DataBind();


        }

        private int? insert()
        {
            DateTime dt;
            int? result = null;
            int NumberOfDependents = 0;
            if (ckManualTime.Checked)
            {
                dt = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, int.Parse(txtHours.Text), int.Parse(txtMinute.Text), 1);
            }
            else
            {
                dt = DateTime.Now;
            }
            if (!txtNumberOfDependents.Text.Trim().Equals(string.Empty))
            {
                NumberOfDependents = int.Parse(txtNumberOfDependents.Text);
            }

            int? id = null;
            new VisitorsDataContext().TransationsCreate(int.Parse(Request["ID"].ToString()), dt, Request.Cookies["UserWebsiteId"].Value, true, txtNote.Text, NumberOfDependents, int.Parse(ddlDepartments.SelectedValue), ref result, ref id);

            return result;

        }
        #endregion
    }
}