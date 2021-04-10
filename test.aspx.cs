using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class test : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

        UserAccessCheck("2217514260");
    }
    public string UserAccessCheck(string userId)
    {
        try
        {


            var client = new RestClient("https://kfnl.gov.sa/Ar/EServices/wfs/_api/web/lists/getbytitle(\'ScheduleAppointment\')/items?$filter=Date%20eq%20%27" + DateTime.Now.ToString("MM/dd/yyyy") + "%27%20and%20Iqama_x002f_ID%20eq%20" + userId)
                //var client = new RestClient("https://kfnl.gov.sa/Ar/EServices/wfs/_api/web/lists/getbytitle(\'ScheduleAppointment\')/items?$select=Name,Email,Qualification,Mobile,Iqama_x002f_ID,Date&$filter=Date%20eq%20%27" + DateTime.Now.ToString("mm/dd/yyyy") + "%27%20and%20Iqama_x002f_ID%20eq%" + userId)
                {
                    Timeout = -1
                };
            var request = new RestRequest(Method.GET);
            IRestResponse response = client.Execute(request);
            Console.WriteLine(response.Content);
            dynamic stuff = JsonConvert.DeserializeObject(response.Content);
            var val = stuff.value;

            Console.WriteLine(response.Content);
            for (int i = 0; i < val.Count; i++)
            {
                return val[i]["Iqama_x002f_ID"];
            }
            return stuff["value"][0]["Iqama_x002f_ID"];
        }
        catch (Exception ex)
        {
            return ex.StackTrace;
        }
    }
}