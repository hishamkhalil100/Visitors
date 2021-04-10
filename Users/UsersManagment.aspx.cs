using System;
using System.Linq;
using System.Web.UI.WebControls;

namespace Users
{
    public partial class Users_UsersManagment : System.Web.UI.Page
    {
        #region Event
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (!IsPostBack)
                {   
                    GetAllDepartments();
                    BindData();
                }
                else
                {
                    BindData();
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
            string id = ((Label)e.Item.FindControl("lblID")).Text;
            var q = new VisitorsDataContext().UsersSearch(id).Single();
            if ((bool)q.UserIsLocked)
            {
                ((LinkButton)e.Item.FindControl("lnkbtnState")).Attributes.Remove("class");
                ((LinkButton)e.Item.FindControl("lnkbtnState")).Attributes.Add("class", "btn btn-rounded btn-danger");
                ((Label)e.Item.FindControl("lblUserState")).Text = "تفعيل   ";

            }
            else
            {
                ((LinkButton)e.Item.FindControl("lnkbtnState")).Attributes.Remove("class");
                ((LinkButton)e.Item.FindControl("lnkbtnState")).Attributes.Add("class", "btn btn-rounded btn-success");
                ((Label)e.Item.FindControl("lblUserState")).Text = "تعطيل";
            }
        }

        protected void dlUsers_ItemCommand(object source, DataListCommandEventArgs e)
        {
            try
            {

                if (e.CommandName.ToString() == "edititem")
                {
                    ViewState["ID"] = e.CommandArgument.ToString();
                    GetData();
                }

                if (e.CommandName.ToString() == "stateitem")
                {
                    new VisitorsDataContext().UserIsLockedEdit(e.CommandArgument.ToString());
                    DivMsg.Visible = true;
                    DivMsg.Attributes.Add("class", "alert alert-success alert-dismissable");
                    pDivNotifiDesc.Text = "تم! تعديل حالة الموظف بنجاح";
                    Reset();
                    BindData();

                }
            }
            catch (Exception ex)
            {
                Helper.LogError(ex);
                Response.Redirect("/Visitors/Error.aspx");

            }
        }

        protected void btnSave_Click(object sender, EventArgs e)
        {
            int? result = null;

            //edit case 
            if (ViewState["ID"] != null)
            {
                try
                {
                    result = Edit();
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
                        ViewState["ID"] = null;
                        ddlDepartments.Enabled = true;
                        ddlUsers.Enabled = true;

                        DivMsg.Visible = true;
                        DivMsg.Attributes.Add("class", "alert alert-success alert-dismissable");
                        pDivNotifiDesc.Text = "تم تعديل الموظف بنجاح";
                    }
                    else if (result == -2)
                    {

                        DivMsg.Visible = true;
                        DivMsg.Attributes.Add("class", "alert alert-danger  alert-dismissable");
                        pDivNotifiDesc.Text = "خطأ ! عذرا اتصل بمسؤول النظام";

                    }
                    Reset();
                    BindData();
                }
            }
            // add case 
            else
            {
                try
                {
                    result = Insert();
                }
                catch (Exception ex)
                {
                    Helper.LogError(ex);
                    // case of user is aready in the system 
                    var query = new VisitorsDataContext().GetAllUsers().ToList<GetAllUsersResult>();
                    result = -2;
                    foreach (var item in query)
                    {
                        if (ddlUsers.SelectedValue.Equals(item.UserID))
                        {
                            result = -3;
                            break;
                        }

                    }
                }
                finally
                {
                    if (result == 1)
                    {
                        DivMsg.Visible = true;
                        DivMsg.Attributes.Add("class", "alert alert-success alert-dismissable");
                        pDivNotifiDesc.Text = "تم إضافة الموظف بنجاح";
                    }
                    else if (result == -2)
                    {
                        DivMsg.Visible = true;
                        DivMsg.Attributes.Add("class", "alert alert-danger  alert-dismissable");
                        pDivNotifiDesc.Text = "خطأ ! عذرا اتصل بمسؤول النظام";
                    }
                    else if (result == -3)
                    {
                        DivMsg.Visible = true;
                        DivMsg.Attributes.Add("class", "alert alert-danger  alert-dismissable");
                        pDivNotifiDesc.Text = "عذرا هذا الموظف موجود مسبقا";
                    }
                    Reset();
                    BindData();
                }
            }
        }

        protected void btnReset_Click(object sender, EventArgs e)
        {
            Reset();
        }
        protected void ddlDepartments_SelectedIndexChanged(object sender, EventArgs e)
        {
            GetAllUsersByDepartment();
        }
        #endregion

        #region methods
        private void GetAllDepartments()
        {
            try
            {
                var query = new VisitorsDataContext().GetAllDepartments().ToList<GetAllDepartmentsResult>();
                ddlDepartments.DataTextField = "Department_Name";
                ddlDepartments.DataValueField = "Department_Domain";
                ddlDepartments.DataSource = query;
                ddlDepartments.DataBind();
                GetAllUsersByDepartment();
            }
            catch (Exception ex)
            {
                Helper.LogError(ex);
                Response.Redirect("/Visitors/Error.aspx");
            }
        }
        private void GetAllUsersByDepartment()
        {
            try
            {
                ddlUsers.DataTextField = "DisplayName";
                ddlUsers.DataValueField = "UserName";
                ddlUsers.DataSource = new ActiveDirectoryManagment().GetAdUsersByGroup(ddlDepartments.SelectedValue);
                ddlUsers.DataBind();
            }
            catch (Exception ex)
            {
                Helper.LogError(ex);
                Response.Redirect("/Visitors/Error.aspx");
            }
        }
        private int? Insert()
        {

            int? result = null;
            string role = string.Empty;
            bool gender = true;
            if (rbManger.Checked)
            {
                role = "admin";
            }
            else
            {
                role = "user";
            }
            if (rbFemale.Checked)
            {
                gender = false;
            }
            new VisitorsDataContext().UsersAdd(ddlUsers.SelectedValue.ToString(), txtUserName.Text.ToString(), role, gender, ref result);
            return result;
        }
        private int? Edit()
        {
            bool gender = true;
            int? result = null;
            string role = string.Empty;
            if (rbManger.Checked)
            {
                role = "admin";
            }
            else
            {
                role = "user";
            }
            if (rbFemale.Checked)
            {
                gender = false;
            }
            new VisitorsDataContext().UsersEdit(ViewState["ID"].ToString(), txtUserName.Text.ToString(), role, gender, ref result);
            return result;
        }
        private void BindData()
        {
            var Query = new VisitorsDataContext().GetAllUsers().ToList<GetAllUsersResult>();
            dlUsers.DataSource = Query;
            dlUsers.DataBind();
        }
        private void GetData()
        {
            if (ViewState["ID"] != null)
            {
                string ID = ViewState["ID"].ToString();


                var QUERY = new VisitorsDataContext().UsersSearch(ID).ToList<UsersSearchResult>();

                foreach (var item in QUERY)
                {
                    txtUserName.Text = item.UserName;
                    string role = string.Empty;
                    if (item.UserRole.Equals("admin"))
                    {
                        rbManger.Checked = true;
                        rbEmp.Checked = false;
                    }
                    else
                    {
                        rbManger.Checked = false;
                        rbEmp.Checked = true;
                    }
                    if (!item.UserGender)
                    {
                        rbFemale.Checked = true;
                    }
                    ddlDepartments.SelectedValue = ActiveDirectoryManagment.GetDepartment(ID);
                    GetAllUsersByDepartment();
                    ddlUsers.SelectedValue = ID;
                }
                ddlDepartments.Enabled = false;
                ddlUsers.Enabled = false;
            }
        }
        private void Reset()
        {
            if (ViewState["ID"] != null)
            {
                GetData();
            }
            else
            {
                GetAllDepartments();
                GetAllUsersByDepartment();
                txtUserName.Text = string.Empty;
                rbEmp.Checked = true;// employee
            }
        }
        #endregion
    }
}