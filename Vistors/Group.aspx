<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="Group.aspx.cs" Inherits="Vistors.Vistors_Group" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style type="text/css">
        .right {
            float: right !important;
        }
    </style>

    <script>
        function printdiv(printpage) {
            var headstr = "<html><head><title></title>  </head><body><div style=\"margin:0 auto;\"><h1 style=\"text-align:center;\"><img src=\"/vendor/Images/KFNLLOGO.png\"/></h1><h1 style=\"text-align:center;\">إدارة الدراسات والخدمات المرجعية</h1>";
            var header = "<h4 id=\"h4date\" style=\"text-align:center;\"> الجلسات الجماعية </h4></div>";

            var footstr = "</body>";
            var vistorsInfo = document.all.item(printpage).innerHTML;
            var signure = document.getElementById('print_signure').innerHTML;
            var oldstr = document.body.innerHTML;
            var oldheader = document.head.innerHTML;

            var txtnote = "</br></br> <p>ملاحظات</p> <div style=\"border: 1px darkgray solid; min-height: 150px\">" + document.getElementById('ContentPlaceHolder1_txtNote').value + "</div> </br></br>";
            document.head.innerHTML += "<style> html { overflow: hidden; }</style>";
            document.body.innerHTML = headstr + header + vistorsInfo + txtnote + signure + footstr;
                    
            window.print();
            document.head.innerHTML = oldheader;
            document.body.innerHTML = oldstr;
            return false;
        }
    </script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <section id="content_wrapper">
        <section id="content" class="animated fadeIn">
            <div class="content-header">
                <h2>الجلسات<b> الجماعية </b></h2>
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
                                        <div class="col-md-5 right">
                                            <div class="section">
                                                <input type="text" class="span10 ss gui-input" id="txtId1" runat="server" placeholder="رقم عضوية/ هوية المستفيد1" />
                                                <!-- end section -->
                                            </div>
                                        </div>
                                        <div class="col-md-5 right">

                                            <div class="section">
                                                <input type="text" class="span10 ss gui-input" id="txtId2" runat="server" placeholder="رقم عضوية/ هوية المستفيد2" />
                                                <!-- end section -->
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-5 right">
                                            <div class="section">
                                                <input type="text" class="span10 ss gui-input" id="txtId3" runat="server" placeholder="رقم عضوية/ هوية المستفيد3" />
                                                <!-- end section -->
                                            </div>
                                        </div>
                                        <div class="col-md-5 right">
                                            <div class="section">
                                                <input type="text" class="span10 ss gui-input" id="txtId4" runat="server" placeholder="رقم عضوية/ هوية المستفيد4" />
                                                <!-- end section -->
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-5 right">
                                            <div class="section">
                                                <input type="text" class="span10 ss gui-input" id="txtId5" runat="server" placeholder="رقم عضوية/ هوية المستفيد5" />
                                                <!-- end section -->
                                            </div>
                                        </div>
                                        <div class="col-md-5 right">
                                            <div class="section">
                                                <input type="text" class="span10 ss gui-input" id="txtId6" runat="server" placeholder="رقم عضوية/ هوية المستفيد6" />
                                                <!-- end section -->
                                            </div>
                                        </div>
                                        <div class="col-md-2 right">
                                            <div class="section">

                                                <asp:Button ID="btnSearch" runat="server" CssClass="btn active btn-primary" Text="بحث" OnClick="btnSearch_OnClick" />


                                                <!-- end section -->


                                                <!-- end section -->
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="row">
                                        <div class="col-md-12 right">
                                            <div class="section">
                                                <input type="text" class="span10 ss gui-input" id="txtNote" runat="server" placeholder="ملاحظات" />
                                                <!-- end section -->
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="panel-body pn">
                                <div class="table-responsive">
                                    <div id="div_print">

                                        <asp:DataList ID="dlUsers" runat="server" BorderColor="black"
                                            CellPadding="5"
                                            CellSpacing="5"
                                            RepeatDirection="Horizontal"
                                            RepeatLayout="Table"
                                            BorderWidth="0" EnableViewState="false" CssClass="" RepeatColumns="3" Width="100%" OnItemDataBound="dlUsers_OnItemDataBound">
                                            <ItemTemplate>


                                                <div class="mw1000 center-block " style="width: 100%; background-color: #f2f2f2;">
                                                    <div class="media clearfix">

                                                        <div class="media-body va-m pr20">
                                                            <p>
                                                            <h4 class="media-heading">الإسم:
                                                                            <asp:Label runat="server" ID="lblName"></asp:Label>
                                                            </h4>
                                                          
                                                                الجنس:
                                                                            <asp:Label runat="server" ID="lblGender"></asp:Label>
                                                            <br/>
                                                                رقم الجوال:
                                                                            <asp:Label runat="server" ID="lblMobile"></asp:Label>
                                                            <br/>
                                                                الجنسية:
                                                                            <asp:Label runat="server" ID="lblCountry"></asp:Label>
                                                            <br/>
                                                                رقم الهوية:
                                                                            <asp:Label runat="server" ID="lblNID"></asp:Label>
                                                            <br/>
                                                                نوع الهوية:
                                                                            <asp:Label runat="server" ID="lblNIDType"></asp:Label>
                                                          
                                                            </p>  
                                                        </div>
                                                    </div>
                                                </div>





                                            </ItemTemplate>
                                        </asp:DataList>
                                        
                                    </div>
                                    <div id="print_signure">
                                        <asp:DataList ID="dlfooter" runat="server" BorderColor="black"
                                                      CellPadding="5"
                                                      CellSpacing="5"
                                                      RepeatDirection="Vertical"
                                                      RepeatLayout="Table"
                                                      BorderWidth="0" EnableViewState="false" CssClass="" RepeatColumns="3" Width="100%">
                                            <ItemTemplate>


                                                <div class="page-heading mw1000 center-block ">
                                                    <asp:TextBox runat="server" placeholder="توقيع"></asp:TextBox>

                                                </div>
                                            </ItemTemplate>
                                        </asp:DataList>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="panel">
                                <div class="panel-menu p12 admin-form theme-primary">
                                    <div class="row">
                                   
                                        <div class="col-md-2 right">
                                            <div class="section">

                                                <asp:Button ID="Button1" runat="server" CssClass="btn active btn-primary" Text="طباعة" OnClientClick="printdiv('div_print')" />


                                                <!-- end section -->


                                                <!-- end section -->
                                            </div>
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

