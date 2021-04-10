<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="VistorSearch.aspx.cs" Inherits="Vistors.Vistors_VistorSearch" %>

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
                    <h2>استعلام <b>عن  </b>زائر </h2>
                </div>
               


                <!-- Validation Example -->
                <div class="admin-form theme-primary mw1000 center-block" style="padding-bottom: 175px;">

                    <div class="panel heading-border">
                        <form runat="server" id="adminform">
                            <asp:HiddenField ID="hfNoti" runat="server" Value="aaaa" />
                            <asp:ScriptManager runat="server"></asp:ScriptManager>

                            <div class="panel-body bg-light">

                                <div class="section-divider mt20 mb40">
                                    <span>من فضلك ادخل ادخل حقول البحث </span>
                                </div>
                                <!-- .section-divider -->
                                <div class="panel">
                                    <div class="panel-menu p12 admin-form theme-primary">
                                        <div class="row">
                                            <div class="col-md-1">
                                                <div class="section">
                                                    <asp:Button ID="btnSearch" runat="server" CssClass="btn active btn-primary vali" Text="بحث" OnClick="btnSearch_Click" />

                                                </div>
                                            </div>
                                            <div class="col-md-2">
                                                <div class="section">

                                                    <label class="field prepend-icon" for="txtVistorID">
                                                        <asp:TextBox ID="txtVistorID" CssClass="gui-input" placeholder="رقم الزائر..." runat="server" />
                                                        <label class="field-icon" for="txtVistorID">
                                                            <i class="fa fa-hashtag"></i>
                                                        </label>
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="section">

                                                    <label class="field prepend-icon" for="txtSearchName">
                                                        <asp:TextBox ID="txtSearchName" CssClass="gui-input" placeholder="اسم الزائر... لا يمكن البحث بالاسم مؤقتا" runat="server" Enabled="False" />
                                                        <label class="field-icon" for="txtSearchName">
                                                            <i class="fa fa-user"></i>
                                                        </label>
                                                    </label>

                                                    <!-- end section -->


                                                    <!-- end section -->
                                                </div>
                                            </div>

                                            <div class="col-md-5">
                                                <div class="section">
                                                    <div runat="server" id="divNID">
                                                        <div class="col-md-12">

                                                            <label for="txtSearchIDNum" class="field prepend-icon">
                                                                <asp:TextBox runat="server" name="firstname" ID="txtSearchIDNum" class="gui-input " placeholder="رقم الهوية..."></asp:TextBox>
                                                                <label for="txtSearchIDNum" class="field-icon">
                                                                    <i class="fa fa-id-card-o" style="color: red"></i>
                                                                </label>
                                                            </label>
                                                        </div>
                                                    </div>
                                                  
                                                    <!-- end section -->


                                                    <!-- end section -->
                                                </div>
                                            </div>



                                        </div>
                                    </div>
                                    <div class="panel-body pn">
                                        <div class="table-responsive" runat="server" id="divTable">

                                            <table class="table admin-form theme-warning tc-checkbox-1 fs13">
                                                <thead>
                                                    <tr class="bg-light">
                                                        <th class="text-center">رقم الزائر</th>
                                                        <th class="text-center">اسم الزائر</th>
                                                        <th class="text-center">رقم الهوية</th>
                                                        <th class="text-center">رقم الجوال</th>
                                                        <th class="text-center">استعلام</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <asp:DataList ID="dlUsers" runat="server" RepeatLayout="Flow" CssClass="table admin-form theme-warning tc-checkbox-1 fs13" RepeatDirection="Horizontal" OnItemCommand="dlUsers_ItemCommand" >
                                                        <ItemTemplate>
                                                            <tr>
                                                                <td class="text-center ">
                                                                    <%--  <asp:Button ID="btnAccept" runat="server" CommandArgument='<%# Eval("refNO") %>' CommandName="addref" CssClass="btn active btn-success" Text="قبول" />--%>
                                                                    <asp:Label runat="server" ID="lblID" Text='<%# Eval("VisitorID") %>'></asp:Label>
                                                                </td>
                                                                <td class="text-center"><%# Eval("name") %></td>
                                                                <td class="text-center"><%# Eval("CivilId")%></td>
                                                                <td class="text-center"><%# Eval("MobileNo") %></td>
                                                                <td class="text-center">
                                                                    <asp:Button ID="btnAccept" runat="server" CommandArgument='<%# Eval("VisitorID") %>' CommandName="btnAccept" CssClass="btn active btn-success" Text="استعلام" />
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

