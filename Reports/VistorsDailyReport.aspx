<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="VistorsDailyReport.aspx.cs" Inherits="Reports.Reports_VistorsDailyReport" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
   <!-- OR for ThemeRoller styling
    <link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/themes/south-street/jquery-ui.css">
    <link rel="stylesheet" href="ui-southstreet.datepick.css">
    -->
    <link href="/assets/Calenders/jquery.calendars.picker.css" rel="stylesheet" />
    <!-- OR for ThemeRoller styling
    <link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/themes/south-street/jquery-ui.css">
    <link rel="stylesheet" href="ui-southstreet.datepick.css">
    -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js">
    </script>

    <script src="/assets/Calenders/jquery.plugin.js"></script>
    <!--<script src="jquery.calendars.all.js"></script><!-- Use instead of calendars, plus, and picker below -->

    <script src="/assets/Calenders/jquery.calendars.js"></script>
    <script src="/assets/Calenders/jquery.calendars.plus.js"></script>
    <script src="/assets/Calenders/jquery.calendars.picker.js"></script>
    <!--<script src="jquery.calendars.picker.ext.js"></script><!-- Include for ThemeRoller styling -->
    <script src="/assets/Calenders/jquery.calendars.ummalqura.js"></script>
    <script src="/assets/Calenders/jquery.calendars.ummalqura-ar.js"></script>
    <link href="/assets/Calenders/jquery.calendars.picker.css" rel="stylesheet" />
    <script>
        $(function () {
            //	$.calendars.picker.setDefaults({renderer: $.calendars.picker.themeRollerRenderer}); // Requires jquery.calendars.picker.ext.js
            var calendar = $.calendars.instance('UmmAlQura', 'ar');

            $('#ContentPlaceHolder1_popupDatepicker').calendarsPicker({ calendar: calendar });


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
            ////var dateEnd = document.getElementById("ContentPlaceHolder1_popupDatepickerEnd").getAttribute("value");
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
            window.open("/visitors/Reports/DailyReportPrint.aspx?date=" + datestart);
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
        <div id="DivMsg" runat="server" visible="false" class="alert alert-success alert-dismissable">
            <asp:Label runat="server" ID="pDivNotifiDesc"></asp:Label>

            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
        </div>
        <!-- Begin: Content -->
        <section id="content" class="table-layout animated fadeIn">

            <!-- begin: .tray-center -->
            <div class="tray tray-center">

                <!-- Begin: Content Header -->
                <div class="content-header">
                    <h2>إحصائية <b>يومية </b>بعدد الزوار</h2>
                </div>

                <!-- Validation Example -->
                <div class="admin-form theme-primary mw1000 center-block" style="padding-bottom: 175px;">

                    <div class="panel heading-border">
                        <form method="post" runat="server" id="adminform" >
                            <asp:ScriptManager ID="ScriptManager1" runat="server">
                            </asp:ScriptManager>

                            <div class="panel-body bg-light">

                                <!-- .section-divider -->
                                <div class="panel">
                                    <div class="panel-menu p12 admin-form theme-primary">
                                        <div class="row">
                                            <div class="col-md-3">
                                                <div class="section">

                                                    <asp:Button ID="btnPrint" runat="server" CssClass="btn active btn-primary" Text="طباعة" OnClientClick="printdiv('div_print');" />


                                                    <!-- end section -->


                                                    <!-- end section -->
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="section">

                                                    <asp:Button ID="btnSearch" runat="server" CssClass="btn active btn-primary" Text="بحث" OnClick="btnSearch_Click" />


                                                    <!-- end section -->


                                                    <!-- end section -->
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="section">

                                                    <label class="field prepend-icon" for="IDNum">
                                                        <input type="text" class="span10 ss gui-input" id="popupDatepicker" runat="server" name="txtStart" placeholder="تاريخ البداية" />

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
                                                            <th class="text-center">اليوم <span class="fa fa-calendar"></span></th>
                                                            <th class="text-center">8-9</th>
                                                            <th class="text-center">9-10</th>
                                                            <th class="text-center">10-11</th>
                                                            <th class="text-center">11-12</th>
                                                            <th class="text-center">12-1</th>
                                                            <th class="text-center">1-2</th>
                                                            <th class="text-center">2-3</th>
                                                            <th class="text-center">3-4</th>
                                                            <th class="text-center">4-5</th>
                                                            <th class="text-center">5-6</th>
                                                            <th class="text-center">6-7</th>
                                                            <th class="text-center">الإجمالي <span class="fa fa-plus"></span></th>
                                                            <th class="text-center">باحثين <span class="fa fa-male"></span></th>
                                                            <th class="text-center">باحثات <span class="fa fa-female"></span></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <asp:DataList ID="dlUsers" runat="server" RepeatLayout="Flow" EnableViewState="false" CssClass="table admin-form theme-warning tc-checkbox-1 fs13" RepeatDirection="Horizontal" OnItemDataBound="dlUsers_ItemDataBound">
                                                            <ItemTemplate>
                                                                <tr>
                                                                    <td class="text-center ">
                                                                        <%--  <asp:Button ID="btnAccept" runat="server" CommandArgument='<%# Eval("refNO") %>' CommandName="addref" CssClass="btn active btn-success" Text="قبول" />--%>
                                                                        <asp:Label runat="server" ID="lblDate" Text='<%# Eval("TransactionCreationDate") %>'></asp:Label>
                                                                    </td>
                                                                    <td class="text-center"><%# Eval("Per1") %></td>
                                                                    <td class="text-center"><%# Eval("Per2") %></td>
                                                                    <td class="text-center"><%# Eval("Per3") %></td>
                                                                    <td class="text-center"><%# Eval("Per4") %></td>
                                                                    <td class="text-center"><%# Eval("Per5") %></td>
                                                                    <td class="text-center"><%# Eval("Per6") %></td>
                                                                    <td class="text-center"><%# Eval("Per7") %></td>
                                                                    <td class="text-center"><%# Eval("Per8") %></td>
                                                                    <td class="text-center"><%# Eval("Per9") %></td>
                                                                    <td class="text-center"><%# Eval("Per10") %></td>
                                                                    <td class="text-center"><%# Eval("Per11") %></td>
                                                                    <td class="text-center"><%# Eval("Total") %></td>
                                                                    <td class="text-center"><%# Eval("Male")%></td>
                                                                    <td class="text-center"><%# Eval("Female") %></td>
                                                                    <td class="text-center"></td>
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
            </div>
            <!-- end: .tray-center -->
        </section>
        <!-- End: Content -->
    </section>
</asp:Content>


