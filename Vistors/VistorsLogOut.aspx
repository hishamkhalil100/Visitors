<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="VistorsLogOut.aspx.cs" Inherits="Vistors.Vistors_VistorsLogOut" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
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
                    <h2>تسجيل <b>خروج </b>زائر </h2>
                </div>

                <!-- Validation Example -->
                <div class="admin-form theme-primary mw1000 center-block" style="padding-bottom: 175px;">

                    <div class="panel heading-border">
                        <form method="post" runat="server" id="adminform">
                            <asp:ScriptManager ID="ScriptManager1" runat="server">
                            </asp:ScriptManager>
                            <div class="panel-body bg-light">

                                <!-- .section-divider -->
                                <div class="panel">

                                    <div class="panel-body pn">
                                        <div class="table-responsive">

                                            <table class="table admin-form theme-warning tc-checkbox-1 fs13">
                                                <thead>
                                                    <tr class="bg-light">
                                                        <th class="text-center">رقم الزائر</th>
                                                        <th class="text-center">اسم الزائر</th>
                                                        <th class="text-center">رقم الهوية</th>
                                                        <th class="text-center">رقم الجوال</th>
                                                        <th class="text-center">تسجيل خروج</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <asp:DataList ID="dlUsers" runat="server" RepeatLayout="Flow" EnableViewState="false" CssClass="table admin-form theme-warning tc-checkbox-1 fs13" RepeatDirection="Horizontal" OnItemCommand="dlUsers_ItemCommand" OnItemDataBound="dlUsers_ItemDataBound">
                                                        <ItemTemplate>
                                                            <tr>
                                                                <td class="text-center ">
                                                                    <%--  <asp:Button ID="btnAccept" runat="server" CommandArgument='<%# Eval("refNO") %>' CommandName="addref" CssClass="btn active btn-success" Text="قبول" />--%>
                                                                    <asp:Label runat="server" ID="lblID" Text='<%# Eval("ID") %>'></asp:Label>
                                                                </td>
                                                                <td class="text-center"><%# Eval("Name") %></td>
                                                                <td class="text-center"><%# Eval("CivilId")%></td>
                                                                <td class="text-center"><%# Eval("MobileNo") %></td>
                                                                <td class="text-center">
                                                                    <asp:Label ID="lblStatus" runat="server" Text='<%# Eval("st") %>' Visible="false"></asp:Label>
                                                                    <asp:Button ID="btnAccept" runat="server" CommandArgument='<%# Eval("ID") %>' CommandName="btnAccept" CssClass="btn active btn-success" Text="خروج" />
                                                                </td>
                                                            </tr>

                                                        </ItemTemplate>
                                                    </asp:DataList>
                                                </tbody>
                                            </table>
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


