using System;
using ws.jawalbsms.dll;
using context = System.Web.HttpContext;


public class Helper
{
    private static String exepurl;
    public Helper()
    {
        //
        // TODO: Add constructor logic here
        //
    }
    public static void LogError(Exception ex)
    {
        try
        {
            exepurl = context.Current.Request.Url.ToString();
            new VisitorsDataContext().LogErrorsAdd(ex.Message, ex.GetType().Name, ex.StackTrace, exepurl);

        }
        catch
        {

        }
    }
    public static void SendSms(string mobileNumber, int vistorId, bool isEnglish)
    {
        try
        {
            //WebClient client = new WebClient();

            //// string url = "https://www.hisms.ws/api.php?send_sms&username=966543757112&password=123456789&numbers=##MOBILE##&sender=KFNL&message=##MESSAGE##&date=##DATE##&time=##TIME##";
            //string url =
            //    Convert.ToString(
            //        "http://www.jawalbsms.ws/api.php/sendsms?user=kfnl.gov&amp;pass=Kfnl123456789&amp;to=##MOBILE##&amp;sender=KFNL&amp;message=##MESSAGE##");
            //// url = url.Replace("##MESSAGE##", "Service ID:"+sid+ System.Environment.NewLine+ "Message:From King Fahad National Library E-Services Portal");
            //url = url.Replace("##MESSAGE##",
            //    "مرحبا بكم في بوابة مكتبة الملك فهد الوطنية, الرجاء ادخال رمز التحقق هذا " + vistorID +
            //    " لتفعيل حسابك");
            //url = url.Replace("##MOBILE##", txtMobileNumber);
            //// url = url.Replace("##DATE##", DateTime.Now.ToString("yyyy-MM-dd", new CultureInfo("en-US")));
            //// url = url.Replace("##TIME##", DateTime.Now.ToString("HH:mm", new CultureInfo("en-US")));
            //byte[] html = client.DownloadData(url);
            //UTF8Encoding utf = new UTF8Encoding();
            //string mystring = utf.GetString(html);

            if (isEnglish)
            {
                Services sms = new Services();
                sms.SendSMS("kfnl.gov", "Kfnl123456789", "KFNL", mobileNumber, "Welcome to King Fahad National Library your ID number is: " + vistorId);


            }
            else
            {
                Services sms = new Services();
                sms.Send_SMS("kfnl.gov", "Kfnl123456789", "KFNL",
                    mobileNumber, "مرحبا بكم في مكتبة الملك فهد الوطنية رقم العضوية الخاص بكم هو " + vistorId);
            }
        }
        catch (Exception ex)
        {
            LogError(ex);

        }
    }

}