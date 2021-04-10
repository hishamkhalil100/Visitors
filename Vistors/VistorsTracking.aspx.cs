using System;
using System.Globalization;
using System.Linq;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

namespace Vistors
{
    public partial class Vistors_VistorsTracking : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                try
                {
                    // getData();
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
            var dataitem = e.Item.DataItem as VistorTackingResult;
            string day = string.Empty;
            //statues
            if (dataitem.Statues)
            {

                ((HtmlTableRow)e.Item.FindControl("trMain")).Attributes.Add("class", "success");
                ((Label)e.Item.FindControl("lblStatues")).Text = "دخول";
            }
            else
            {
                ((HtmlTableRow)e.Item.FindControl("trMain")).Attributes.Add("class", "danger");
                ((Label)e.Item.FindControl("lblStatues")).Text = "خروج";
            }
            //end status
            // date 
            switch (dataitem.TransactionCreationDate.DayOfWeek.ToString())
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

            ((Label)e.Item.FindControl("lblDate")).Text = new DateHG().GregToHijri(dataitem.TransactionCreationDate.ToString("yyyy/MM/dd"), "yyyy/MM/dd") + " " + day;
            //end date
            //time
            ((Label)e.Item.FindControl("lblTime")).Text = dataitem.TransactionCreationDate.TimeOfDay.ToString(@"hh\:mm\:ss");
            //end time
            //depatrment
            if (dataitem.Department != null && !string.IsNullOrEmpty(dataitem.Department.ToString()))
            {
                ((Label)e.Item.FindControl("lblDepartment")).Text = new VisitorsDataContext().DepartmentsSearch(dataitem.Department).Single<DepartmentsSearchResult>().Department_Name;
            }
            //end department
            //employee
            //((Label)e.Item.FindControl("lblCreatedBy")).Text = new VisitorsDataContext().UsersSearch(dataitem.CreatedBy).Single<UsersSearchResult>().UserName;
            //end employee

        }

        protected void btnSearch_Click(object sender, EventArgs e)
        {
            try
            {
                DateHG cal = new DateHG();
                DateTime? startDate;
                DateTime? endDate;

                if (popupDatepicker.Value != null && !string.IsNullOrEmpty(popupDatepicker.Value.ToString()))
                {
                    startDate = DateTime.ParseExact(cal.HijriToGreg(invertDate(popupDatepicker.Value.ToString())), "yyyy/MM/dd", cal.enCul.DateTimeFormat, DateTimeStyles.AllowWhiteSpaces);
                }
                else
                {
                    startDate = null;
                }
                if (popupDatepickerEnd.Value != null && !string.IsNullOrEmpty(popupDatepickerEnd.Value.ToString()))
                {
                    endDate = DateTime.ParseExact(cal.HijriToGreg(invertDate(popupDatepickerEnd.Value.ToString())), "yyyy/MM/dd", cal.enCul.DateTimeFormat, DateTimeStyles.AllowWhiteSpaces);
                }
                else
                {
                    endDate = null;
                }


                dlUsers.DataSource = new VisitorsDataContext().VistorTacking(null, endDate, startDate).ToList<VistorTackingResult>();
                dlUsers.DataBind();
            }
            catch (Exception ex)
            {
                Helper.LogError(ex);
                Response.Redirect("/Visitors/Error.aspx");
            }
        }
        private void getData()
        {
            VisitorsDataContext obj = new VisitorsDataContext();
            dlUsers.DataSource = obj.VistorTacking(null, null, null).ToList<VistorTackingResult>();
            dlUsers.DataBind();
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