using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Web.UI.WebControls;

namespace Public
{
    public partial class Public_Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //Response.Write("Current Culture is " + CultureInfo.CurrentCulture.EnglishName);
            if (!IsPostBack)
            {
            
                GetAllDepartments();

            }
        }
        protected override void InitializeCulture()
        {


            CultureInfo culture = null;
            if (Request.Params["lang"] != null)
            {
                if (Request.Params["lang"].Equals("en"))
                {

                    culture = CultureInfo.CreateSpecificCulture("en-US");
                }
                else
                {
                    culture = CultureInfo.CreateSpecificCulture("ar-SA");

                }
            }
            else
            {
                culture = CultureInfo.CreateSpecificCulture("ar-SA");
            }

            Thread.CurrentThread.CurrentCulture = culture;

            Thread.CurrentThread.CurrentUICulture = culture;

            base.InitializeCulture();
        }
    
     

        private void GetAllDepartments()
        {

            var query = (from w in new VisitorsDataContext().GetAllDepartments() orderby w.Priority select w).ToList<GetAllDepartmentsResult>();
            if (Request.Params["lang"] != null)
            {
                if (Request.Params["lang"].Equals("en"))
                {
                    ddlDepartments.DataTextField = "Department_Name_En";

                }
                else
                {
                    ddlDepartments.DataTextField = "Department_Name";
                }
            }
            else
            {
                ddlDepartments.DataTextField = "Department_Name";
            }


            ddlDepartments.DataValueField = "Department_ID";
            ddlDepartments.DataSource = query;

            ddlDepartments.DataBind();
            if (CultureInfo.CurrentCulture.Name.Contains("en"))
            {
                ddlDepartments.Items.Insert(0, new ListItem("Please Select Department", String.Empty));
                ddlDepartments.SelectedIndex = 0;
            }
            else
            {
                ddlDepartments.Items.Insert(0, new ListItem("إختر الإدارة المعنية", String.Empty));
                ddlDepartments.SelectedIndex = 0;
            }


        }

      

     


        protected void btnLogin_OnClick(object sender, EventArgs e)
        {
            int? result = null;
            try
            {
                result = chickIn();
                addDepentdents(result);
            }
            catch (Exception ex)
            {
                Helper.LogError(ex);
                result = -2;

            }
            finally
            {
                if (result != -2)
                {
                    Session["status"] = "Success";

                    Response.Redirect("/visitors/Public/Success.aspx");

                }
                else if (result == -2)
                {
                    //DivMsg.Visible = true;

                }
            }
        }
        protected void btnCheckOut_OnClick(object sender, EventArgs e)
        {
            int? result = null;
            try
            {

                result = chickOut();

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

                    Response.Redirect("/visitors/Public/Success.aspx?lang=" + Thread.CurrentThread.CurrentCulture + "&status=0");

                }
                else if (result == -2)
                {
                    //DivMsg.Visible = true;

                }
            }
        }

        private int? chickIn()
        {

            int? result = null;
            int? id = null;
            int NumberOfDependents = 0;

            if (!txtNumberOfDependents.Value.Trim().Equals(string.Empty))
            {
                NumberOfDependents = int.Parse(txtNumberOfDependents.Value);
            }
            new VisitorsDataContext().TransationsCreate(int.Parse(hiddID.Value.ToString()), DateTime.Now, "Vistor", true, null, NumberOfDependents, int.Parse(ddlDepartments.SelectedValue), ref result, ref id);

            return id;
        }
        private int? addDepentdents(int? id)
        {

            int? result = null;
            int NumberOfDependents = 0;
            List<Depentdent> depentdensList = new List<Depentdent>();
            if (!txtNumberOfDependents.Value.Trim().Equals(string.Empty))
            {
                NumberOfDependents = int.Parse(txtNumberOfDependents.Value);
            }

            if (NumberOfDependents > 0 && id != null)
            {
                for (int i = 0; i < NumberOfDependents; i++)
                {
                    if (Request.Form["gender" + i].Equals("ذكر") ||
                        Request.Form["gender" + i].ToLower().Equals("male"))
                    {

                        depentdensList.Add(new Depentdent()
                        {
                            Gender = true,
                            Name = Request.Form["txtDependent" + i].ToString(),
                            TransactionId = id.Value
                        });
                    }
                    else
                    {
                        depentdensList.Add(new Depentdent()
                        {
                            Gender = false,
                            Name = Request.Form["txtDependent" + i].ToString(),
                            TransactionId = id.Value
                        });
                    }
                }
            }
            else
            {
                return 1;
            }

            foreach (var ITEM in depentdensList)
            {
                int? result2 = null;
                new VisitorsDataContext().DependentsAdd(ITEM.Name, ITEM.Gender, ITEM.TransactionId, ref result2);
            }
            //new VisitorsDataContext().TransationsCreate(int.Parse(hiddID.Value.ToString()), DateTime.Now, "Vistor", true, null, NumberOfDependents, int.Parse(ddlDepartments.SelectedValue), ref result);

            return result;
        }
        private int? chickOut()
        {

            int? result = null;
            int? id = null;
            int NumberOfDependents = 0;
            if (!txtNumberOfDependents.Value.Trim().Equals(string.Empty))
            {
                NumberOfDependents = int.Parse(txtNumberOfDependents.Value);
            }
            new VisitorsDataContext().TransationsCreate(int.Parse(hiddID.Value.ToString()), DateTime.Now, "Vistor", false, null, null, null, ref result, ref id);

            return result;
        }
    }
}