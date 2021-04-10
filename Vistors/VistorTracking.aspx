<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="VistorTracking.aspx.cs" Inherits="Vistors.Vistors_VistorTracking" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <!-- OR for ThemeRoller styling
    <link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/themes/south-street/jquery-ui.css">
    <link rel="stylesheet" href="ui-southstreet.datepick.css">
    -->
    <link href="assets/Calenders/jquery.calendars.picker.css" rel="stylesheet" />
    <!-- OR for ThemeRoller styling
    <link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/themes/south-street/jquery-ui.css">
    <link rel="stylesheet" href="ui-southstreet.datepick.css">
    -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js">
    </script>

    <script src="assets/Calenders/jquery.plugin.js"></script>
    <!--<script src="jquery.calendars.all.js"></script><!-- Use instead of calendars, plus, and picker below -->

    <script src="assets/Calenders/jquery.calendars.js"></script>
    <script src="assets/Calenders/jquery.calendars.plus.js"></script>
    <script src="assets/Calenders/jquery.calendars.picker.js"></script>
    <!--<script src="jquery.calendars.picker.ext.js"></script><!-- Include for ThemeRoller styling -->
    <script src="assets/Calenders/jquery.calendars.ummalqura.js"></script>
    <script src="assets/Calenders/jquery.calendars.ummalqura-ar.js"></script>
    <link href="assets/Calenders/jquery.calendars.picker.css" rel="stylesheet" />
    <script>
        $(function () {
            //	$.calendars.picker.setDefaults({renderer: $.calendars.picker.themeRollerRenderer}); // Requires jquery.calendars.picker.ext.js
            var calendar = $.calendars.instance('UmmAlQura', 'ar');

            $('#ContentPlaceHolder1_popupDatepicker').calendarsPicker({ calendar: calendar });

            $('#ContentPlaceHolder1_popupDatepickerEnd').calendarsPicker({ calendar: calendar });
            $('.calendars').width = $('#ContentPlaceHolder1_popupDatepicker').width;
        });

        //function showDateStart(date) {
        //    //document.getElementById("lblStart").innerHTML = date;
        //    document.getElementById('lblStart').innerText = date;
        //}
        //function showDateEnd(date) {
        //    //document.getElementById("lblStart").innerHTML = date;
        //    document.getElementById('lblEnd').innerText = date;
        //}
        //function btnSubmetClicked() {
        //    alert(document.getElementById('ContentPlaceHolder1_popupDatepicker').value);
        //    window.location.href(window.location.href + "&SDate=" + document.getElementById('lblstart').innerText + "&EDate=" + document.getElementById('lblEnd').innerText);
        //}
        function printdiv(printpage) {
            //var headstr = "<html><head><title></title><style type=\"text/css\">@media print {table {page-break-inside: auto;}tr {page-break-inside: avoid;page-break-after: auto;}}</style><link rel=\"stylesheet\" type=\"text/css\" href=\"assets\skin\default_skin\css\theme.css\" /><link href=\"assets/admin-tools/admin-forms/css/admin-forms.css\" rel=\"stylesheet\" /><link href=\"assets/fonts/font-awesome-4.7.0/css/font-awesome.css\" rel=\"stylesheet\" /><link rel='stylesheet' type='text/css' href='http://fonts.googleapis.com/css?family=Open+Sans:300,400,600' /></head><body style=\"direction:rtl;\"><div style=\"margin:0 auto;\"><h1 style=\"text-align:center;\"><img src=\"vendor/Images/KFNLLOGO.png\" /></h1><br /><br /><br /><h1 style=\"text-align:center;\">برنامج الزوار</h1>";

            var datestart = document.getElementById("ContentPlaceHolder1_popupDatepicker").getAttribute("value");

            //var fromToDate = "<h4 id=\"h4date\" style=\"text-align:center;\"> احصائية اسبوعية من تاريخ " + datestart + "</h4></div>";
            var dateEnd = document.getElementById("ContentPlaceHolder1_popupDatepickerEnd").getAttribute("value");
            ////if (datestart != null && dateEnd != null) {
            ////    fromToDate = "<h4 id=\"h4date\" style=\"text-align:center;\"> احصائية من تاريخ " + datestart + " الى تاريخ " + dateEnd + "</h4></div>";
            ////} else if (datestart != null && dateEnd == null) {
            ////    fromToDate = "<h4 id=\"h4date\" style=\"text-align:center;\"> احصائية من تاريخ " + datestart + "</h4></div>";

            ////} else if (datestart == null && dateEnd != null) {
            ////    fromToDate = "<h4 id=\"h4date\" style=\"text-align:center;\"> الى تاريخ " + dateEnd + "</h4></div>";
            ////}
            ////else {
            ////  fromToDate = "</div>";
            ////}
            //var footstr = "</body></html>";
            //var newstr = document.all.item(printpage).innerHTML;
            //var oldstr = document.body.innerHTML;
            //document.body.innerHTML = headstr + fromToDate + newstr + footstr;
            window.open("/Reports/DailyReportPrint.aspx?date=" + datestart);
            //document.body.innerHTML = oldstr;
            return false;
        }
    </script>
    <style type="text/css">
        .ss option:hover {
            background-color: #0aa89e;
        }

        .ss option:active {
            background-color: #0aa89e;
        }

        /*.ss select : {
            background-color: #0aa89e;
        }*/

        .ss first-child select {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
        }

        .ss select::-ms-expand { /* for IE 11 */
            display: none;
        }

        @media print {
            table {
                page-break-inside: auto;
            }

            tr {
                page-break-inside: avoid;
                page-break-after: auto;
            }
        }
    </style>
    <style type="text/css">
        .rblStyle label {
            float: left;
            margin-right: 5px;
            margin-left: 15px;
        }

        .textTable th {
            text-align: center;
        }

        .textTable td {
            text-align: center;
        }

        .calendars-month-year {
            width: 49% !important;
        }

        .borderLeft {
            border-left: 1px solid #ddd !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section id="content_wrapper">
        <section id="content" class="animated fadeIn">
            <div class="content-header">
                <h2>استعلام  <b>عن  </b>زائر</h2>
            </div>
            <div class="page-heading mw1000 center-block ">
                <div class="media clearfix">
                    <div class="media-left pr30 mw320">
                        <a runat="server" id="hrefProfileImg" class="gallery-item" href="/assets/img/stock/3.jpg">
                            <asp:Image runat="server" ID="imgProfile" ImageUrl="/assets/img/stock/3.jpg" CssClass="img-responsive" alt="" />
                        </a>
                    </div>
                    <div class="media-body va-m pr20">
                        <h2 class="media-heading">الإسم:
                            <asp:Label runat="server" ID="lblName" ></asp:Label>
                        </h2>
                        <p class="mt10">
                            الجنس:
                            <asp:Label runat="server" ID="lblGender" ></asp:Label>
                        </p>
                        <p>
                            رقم الجوال:
                            <asp:Label runat="server" ID="lblMobile" ></asp:Label>
                        </p>
                        <p>
                            الجنسية:
                            <asp:Label runat="server" ID="lblCountry" ></asp:Label>
                        </p>
                        <p>
                            رقم الهوية:
                            <asp:Label runat="server" ID="lblNID" ></asp:Label>
                        </p>
                        <p>
                            نوع الهوية:
                            <asp:Label runat="server" ID="lnlNIDType" ></asp:Label>
                        </p>

                    </div>
                </div>
            </div>

            <!-- Begin: Content -->

            <!-- Begin: Content Header -->
            <!-- Validation Example -->
            <div class="admin-form theme-primary mw1000 center-block">

                <div class="panel heading-border">
                    <form method="post" runat="server" id="adminform">
                        <asp:ScriptManager ID="ScriptManager1" runat="server">
                        </asp:ScriptManager>

                        <div class="panel-body bg-light">

                            <!-- .section-divider -->
                            <div class="panel">
                                <div class="panel-menu p12 admin-form theme-primary">
                                    <div class="row">

                                        <div class="col-md-2">
                                            <div class="section">

                                                <asp:Button ID="btnSearch" runat="server" CssClass="btn active btn-primary" Text="بحث" OnClick="btnSearch_Click" />


                                                <!-- end section -->


                                                <!-- end section -->
                                            </div>
                                        </div>
                                        <div class="col-md-5">
                                            <div class="section">

                                                <label class="field prepend-icon" for="IDNum">
                                                    <input type="text" class="span10 ss gui-input" id="popupDatepicker" runat="server" name="txtStart" placeholder="تاريخ النهاية" />

                                                    <label class="field-icon" for="IDNum">
                                                        <i class="fa fa-calendar"></i>
                                                    </label>
                                                </label>

                                                <!-- end section -->


                                                <!-- end section -->
                                            </div>
                                        </div>
                                        <div class="col-md-5 ">
                                            <div class="section">

                                                <label class="field prepend-icon" for="IDNum">
                                                    <input type="text" class="span10 ss gui-input" id="popupDatepickerEnd" runat="server" name="popupDatepickerEnd" placeholder="تاريخ البداية" />

                                                    <label class="field-icon" for="IDNum">
                                                        <i class="fa fa-calendar"></i>
                                                    </label>
                                                </label>

                                                <!-- end section -->


                                                <!-- end section -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="panel-body pn">
                                    <div class="table-responsive">
                                        <div id="div_print">
                                            <table class="table admin-form theme-warning tc-checkbox-1 fs13">
                                                <thead>
                                                    <tr class="bg-light">
                                                        <th class="text-center">التاريخ <span class="fa fa-calendar"></span></th>
                                                        <th class="text-center">الوقت</th>
                                                        <th class="text-center">الحالة</th>
                                                        <th class="text-center">الإدارة</th>
                                                        <th class="text-center">عدد التابعين</th>
                                                        <th class="text-center">اسم الموظف</th>
                                                        <th class="text-center mnw200">ملاحظات</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <asp:DataList ID="dlUsers" runat="server" RepeatLayout="Flow" EnableViewState="false" CssClass="table admin-form theme-warning tc-checkbox-1 fs13" RepeatDirection="Horizontal" OnItemDataBound="dlUsers_ItemDataBound">
                                                        <ItemTemplate>
                                                            <tr runat="server" id="trMain">
                                                                <td class="text-center ">
                                                                    <%--  <asp:Button ID="btnAccept" runat="server" CommandArgument='<%# Eval("refNO") %>' CommandName="addref" CssClass="btn active btn-success" Text="قبول" />--%>
                                                                    <asp:Label runat="server" ID="lblDate" ></asp:Label>
                                                                </td>
                                                                <td class="text-center"><asp:Label runat="server" ID ="lblTime"></asp:Label></td>
                                                                <td class="text-center"><asp:Label runat="server" ID ="lblStatues"></asp:Label></td>
                                                                <td class="text-center"><asp:Label runat="server" ID ="lblDepartment"></asp:Label></td>
                                                                <td class="text-center"><%# Eval("NumberOfDependents") %></td>
                                                                <td class="text-center"><asp:Label runat="server" ID ="lblCreatedBy"></asp:Label></td>
                                                                <td class="text-center"><%# Eval("Note") %></td>
                                                            </tr>

                                                        </ItemTemplate>
                                                    </asp:DataList>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <!-- end .form-footer section -->
                    </form>
                </div>
            </div>
            <!-- end: .admin-form -->
        </section>
    </section>
</asp:Content>


