<%@ Page Language="C#" AutoEventWireup="true" CodeFile="WeeklyReportPrint.aspx.cs" Inherits="Reports.Reports_WeeklyReportPrint" %>

<!DOCTYPE html>

<html>
<head>
    <title></title>
   <style type="text/css">
        @media print {
            table {
                page-break-inside: auto;
            }

            tr {
                page-break-inside: avoid;
                page-break-after: auto;
                color: gray !important;
            }

            body {
                background-color: #FFFFFF;
                background-image: none;
                color: #000000;
            }

            #ad {
                display: none;
            }

            #leftbar {
                display: none;
            }

            #contentarea {
                width: 100%;
            }
        }
    </style>
    <link rel="stylesheet" type="text/css" href="/assets/skin/default_skin/css/theme.css" />

    <!-- Admin Forms CSS -->
    <link href="/assets/admin-tools/admin-forms/css/admin-forms.css" rel="stylesheet" />
    <link href="/assets/fonts/font-awesome-4.7.0/css/font-awesome.css" rel="stylesheet" />
    <link rel='stylesheet' type='text/css' href='http://fonts.googleapis.com/css?family=Open+Sans:300,400,600' />
    <script type="text/javascript">

        //window.print();
        //setTimeout(window.close, 0);
    </script>
</head>
<body style="direction: rtl; background: #fff" onload="window.print()" onfocus="window.close()">
    <div style="margin: 0 auto;">
        <h1 style="text-align: center;">
            <img src="/vendor/Images/KFNLLOGO.png" /></h1>

        <h1 style="text-align: center;">برنامج الزوار</h1>
        <h4 id="h4date" style="text-align: center;">احصائية اسبوعية بعدد الزوار من تاريخ
            <asp:Label ID="lbldate" runat="server"></asp:Label>
        </h4>
    </div>
    <table class="table admin-form theme-warning tc-checkbox-1 fs13">
        <thead>
            <tr>
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

                                                            <FooterTemplate>
                                                                <td class="text-center">المجموع</td>
                                                                <td class="text-center"><asp:Label runat="server" ID="lblTotalPer1"></asp:Label></td>
                                                                <td class="text-center"><asp:Label runat="server" ID="lblTotalPer2"></asp:Label></td>
                                                                <td class="text-center"><asp:Label runat="server" ID="lblTotalPer3"></asp:Label></td>
                                                                <td class="text-center"><asp:Label runat="server" ID="lblTotalPer4"></asp:Label></td>
                                                                <td class="text-center"><asp:Label runat="server" ID="lblTotalPer5"></asp:Label></td>
                                                                <td class="text-center"><asp:Label runat="server" ID="lblTotalPer6"></asp:Label></td>
                                                                <td class="text-center"><asp:Label runat="server" ID="lblTotalPer7"></asp:Label></td>
                                                                <td class="text-center"><asp:Label runat="server" ID="lblTotalPer8"></asp:Label></td>
                                                                <td class="text-center"><asp:Label runat="server" ID="lblTotalPer9"></asp:Label></td>
                                                                <td class="text-center"><asp:Label runat="server" ID="lblTotalPer10"></asp:Label></td>
                                                                <td class="text-center"><asp:Label runat="server" ID="lblTotalPer11"></asp:Label></td>
                                                                <td class="text-center"><asp:Label runat="server" ID="lblSumTotal"></asp:Label></td>
                                                                <td class="text-center"><asp:Label runat="server" ID="lblSumMale"></asp:Label></td>
                                                                <td class="text-center"><asp:Label runat="server" ID="lblSumFemale"></asp:Label></td>
                                                            </FooterTemplate>
                                                        </asp:DataList>
        </tbody>
    </table>
</body>
</html>
