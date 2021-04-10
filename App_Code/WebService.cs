using System;
using System.Collections.Generic;
using System.Configuration;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web.Script.Serialization;
using System.Web.Services;
using Newtonsoft.Json;
using RestSharp;

/// <summary>
/// Summary description for WebService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
[System.ComponentModel.ToolboxItem(false)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
 [System.Web.Script.Services.ScriptService]
public class WebService : System.Web.Services.WebService
{

    [WebMethod]
    public PublicSearchResult getVistor(string nid)
    {
        VisitorsDataContext objVistors = new VisitorsDataContext();
        PublicSearchResult v = new PublicSearchResult();


        var q = objVistors.PublicSearch(nid).Single<PublicSearchResult>();
        v.CivilId = q.CivilId;
        v.VisitorID = q.VisitorID;
        v.UserID = q.UserID;
        v.Name = q.Name;
        return v;

    }
    [WebMethod]
    //      [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]

    public void HelloWorld()
    {
        JavaScriptSerializer js = new JavaScriptSerializer();
        Context.Response.Clear();
        Context.Response.ContentType = "application/json";
        HelloWorldData data = new HelloWorldData();
        data.Message = "HelloWorld";
        Context.Response.Write(js.Serialize(data));


    }
    [WebMethod]
    public string UserAccessCheck(string userId, bool isRef)
    {
        try
        {

            string date = "";
            if (new DateHG().IsGreg(DateTime.Now.ToString("MM/dd/yyyy")))
            {
                date = DateTime.Now.ToString("MM/dd/yyyy");
            }
            else
            {
                date = new DateHG().HijriToGreg(DateTime.Now.ToString("MM/dd/yyyy"), "MM/dd/yyyy");
            }
            RestClient client = null;
            if (isRef)
                client = new RestClient("https://kfnl.gov.sa/Ar/EServices/wfs/_api/web/lists/getbytitle('ScheduleAppointment')/items?$select=Name,Email,Qualification,Mobile,Iqama_x002f_ID,Date,Time&$filter=Date eq \'" + date + "\' and ID eq " + userId)
                //var client = new RestClient("https://kfnl.gov.sa/Ar/EServices/wfs/_api/web/lists/getbytitle(\'ScheduleAppointment\')/items?$select=Name,Email,Qualification,Mobile,Iqama_x002f_ID,Date&$filter=Date%20eq%20%27" + DateTime.Now.ToString("mm/dd/yyyy") + "%27%20and%20Iqama_x002f_ID%20eq%" + userId)
                {
                    Timeout = -1
                };
            else
            {
                client = new RestClient("https://kfnl.gov.sa/Ar/EServices/wfs/_api/web/lists/getbytitle('ScheduleAppointment')/items?$select=Name,Email,Qualification,Mobile,Iqama_x002f_ID,Date,Time&$filter=Date eq \'" + date + "\' and Iqama_x002f_ID eq " + userId)
                //var client = new RestClient("https://kfnl.gov.sa/Ar/EServices/wfs/_api/web/lists/getbytitle(\'ScheduleAppointment\')/items?$select=Name,Email,Qualification,Mobile,Iqama_x002f_ID,Date&$filter=Date%20eq%20%27" + DateTime.Now.ToString("mm/dd/yyyy") + "%27%20and%20Iqama_x002f_ID%20eq%" + userId)
                {
                    Timeout = -1
                };
            }
            var request = new RestRequest(Method.GET);
            IRestResponse response = client.Execute(request);
            Console.WriteLine(response.Content);
            // return client.BaseUrl.ToString();
            // return response.Content;
            dynamic stuff = JsonConvert.DeserializeObject(response.Content);
            var val = stuff.value;

            Console.WriteLine(response.Content);
            for (int i = 0; i < val.Count; i++)
            {
                return stuff["value"][0]["Name"];
            }
            return "";
        }
        catch (Exception ex)
        {
            Helper.LogError(ex);
            return "";
        }
    }
    // Use your logic to convert bitmap to byte...
    [WebMethod]
    public string SaveImage(string base64String, string fileName)
    {
        byte[] imageBytes = Convert.FromBase64String(base64String);
        using (var ms = new MemoryStream(imageBytes, 0,
                                         imageBytes.Length))
        {
            // Convert byte[] to Image
            ms.Write(imageBytes, 0, imageBytes.Length);
            Image image = Image.FromStream(ms, true);
            image.Save(Server.MapPath(ConfigurationManager.AppSettings["Image"].ToString()) + fileName);
        }
        //string completeFilePath = string.Empty;
        //string filePathInServer = "/mmmm/aaaaa.jpg";
        //if (uploadedFile != null)
        //{
        //    // Maybe some logic to get the file path in the server... Say Server.MapPath... or hard coded path in the server.. whatever you wish
        //    completeFilePath = "/mmmm/aaaaa.jpg";
        //    FileStream fileStream = new FileStream(completeFilePath, FileMode.Create, FileAccess.Write);
        //    fileStream.Write(uploadedFile, 0, uploadedFile.Length);
        //    fileStream.Close();
        //    fileStream.Dispose();
        //}
        return "dddddd";
    }
    [WebMethod]
    //  [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string[] GetCustomers(string prefix)
    {
        List<string> customers = new List<string>();
        VisitorsDataContext obj = new VisitorsDataContext();
        var q = obj.NamesSearch(prefix).ToList<NamesSearchResult>();
        foreach (var item in q)
        {
            customers.Add(item.name);
        }
        return customers.ToArray();
    }
}


public class HelloWorldData
{
    public String Message;
}

