using System;
using System.Globalization;
using System.Threading;

namespace Public
{
    public partial class Public_Success : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {


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
    }
}