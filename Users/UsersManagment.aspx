<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="UsersManagment.aspx.cs" Inherits="Users.Users_UsersManagment" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">


    <form method="post" runat="server" id="adminform">
        <asp:ScriptManager runat="server"></asp:ScriptManager>
        <section id="content_wrapper">
               <div id="DivMsg" runat="server" visible="false" >
                <i class="fa fa-remove pr10"></i>
               <asp:Label runat="server" ID="pDivNotifiDesc"></asp:Label>
             <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
            </div>
            <!-- Begin: Content -->
            <section id="content" class="table-layout animated fadeIn">

                <!-- begin: .tray-center -->
                <div class="tray tray-center">

                    <!-- Begin: Content Header -->
                    <div class="content-header">
                        <h2>إضافة <b>موظف </b>جديد</h2>
                    </div>

                    <!-- Validation Example -->
                    <div class="admin-form theme-primary mw1000 center-block" style="padding-bottom: 175px;">

                        <div class="panel heading-border">

                            <div class="panel-body bg-light">

                                <div class="section-divider mt20 mb40">
                                    <span>من فضلك ادخل المعلومات المطلوبة </span>
                                </div>
                                <!-- .section-divider -->
                                <div class="section">
                                    <label class="field select">
                                        <asp:DropDownList ID="ddlDepartments" runat="server" AutoPostBack="true" OnSelectedIndexChanged="ddlDepartments_SelectedIndexChanged" ></asp:DropDownList>
                                    </label>
                                </div>
                                <div class="section">
                                    <label class="field select">
                                        <asp:DropDownList ID="ddlUsers" runat="server" CssClass="input-large m-wrap input-error tooltips" ></asp:DropDownList>
                                    </label>
                                </div>
                                <div class="section" id="spy1">

                                    <label for="txtUserName" class="field prepend-icon">
                                        <asp:TextBox runat="server" name="firstname" ID="txtUserName" class="gui-input" placeholder="اسم الموظف..."></asp:TextBox>
                                        <label for="txtUserName" class="field-icon">
                                            <i class="fa fa-id-card-o" style="color: red"></i>
                                        </label>
                                    </label>

                                    <!-- end section -->


                                    <!-- end section -->
                                </div>
                               <!-- end section -->
                                <div class="section row">

                                    <div class="panel-body  ">
                                        <div class="row">
                                            <div class="col-sm-12">
                                                <label class="control-label mb15">الجنس</label>
                                                <div class="form-group">
                                                    <div class="col-sm-12 pl15">

                                                        <div class="radio-custom square radio-info mb5 ml5" style="float: right">
                                                            <input runat="server" type="radio" id="rbMale" checked="true" name="radioExamplea" />
                                                            <label for="ContentPlaceHolder1_rbMale">ذكر</label>
                                                        </div>
                                                        <div class="radio-custom square radio-alert mb5  " style="float: right">
                                                            <input runat="server" type="radio" id="rbFemale" name="radioExamplea" />
                                                            <label for="ContentPlaceHolder1_rbFemale">انثي</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="section row">

                                    <div class="panel-body  ">
                                        <div class="row">

                                            <div class="col-sm-12">
                                                <label class="control-label mb15">الصلاحية</label>
                                                <div class="form-group">
                                                    <div class="col-sm-12 pl15">

                                                        <div class="radio-custom square radio-info mb5 ml5" style="float: right">
                                                            <input runat="server" type="radio" id="rbManger" name="radioExample" />
                                                            <label for="ContentPlaceHolder1_rbManger">مدير</label>
                                                        </div>
                                                        <div class="radio-custom square radio-alert mb5  " style="float: right">
                                                            <input runat="server" type="radio" id="rbEmp" name="radioExample" checked="true" />
                                                            <label for="ContentPlaceHolder1_rbEmp">موظف</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                                <!-- end .section section -->
                            </div>
                            <!-- end .form-body section -->
                            <div class="panel-footer text-right">
                                <asp:Button runat="server" ID="btnSave" type="submit" class="btn active btn-success btn-blocky valid" Text="حفظ" OnClick="btnSave_Click"></asp:Button>
                                <asp:Button runat="server" ID="btnReset" type="reset" class="button valid" Text="إلغاء" OnClick="btnReset_Click"></asp:Button>
                            </div>
                            <!-- end .form-footer section -->


                            
                        </div>



                         <div class="panel heading-border">
                       
                                <div class="section-divider mt40 mb40">
                                    <span>الموظفين </span>
                                </div>
                          <div class="section">
                            <div class="table-responsive">

                                <table class="table admin-form theme-warning tc-checkbox-1 fs13">
                                    <thead>
                                        <tr class="primary bg-light">
                                            <th class="text-center">اسم الموظف</th>
                                            <th class="text-center">الخيارات</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <asp:DataList ID="dlUsers" runat="server" RepeatLayout="Flow" CssClass="table admin-form theme-warning tc-checkbox-1 fs13" RepeatDirection="Horizontal" OnItemCommand="dlUsers_ItemCommand" OnItemDataBound="dlUsers_ItemDataBound">
                                            <ItemTemplate>
                                                <tr class="">
                                                    <td class="text-center ">
                                                        <asp:Label ID="lblUserName" runat="server" Text='<%# Eval("UserName")%>' />
                                                        <asp:Label ID="lblID" runat="server" Text='<%# Eval("UserID")%>' Visible="false" />
                                                    </td>

                                                    <td class="text-center ">
                                                        <asp:LinkButton ID="lnkbtnEdit" runat="server" CssClass="btn btn-rounded btn-info  " CommandArgument='<%# DataBinder.Eval(Container.DataItem,"UserID") %>' CommandName="edititem"><i class="icon-pencil icon-white"></i> &nbsp; تعديل</asp:LinkButton>
                                                        <asp:LinkButton ID="lnkbtnState" runat="server" CommandArgument='<%# DataBinder.Eval(Container.DataItem,"UserID") %>' CommandName="stateitem">
                                                            <i class="icon-eye-open"></i>&nbsp;
                                                    <asp:Label ID="lblUserState" runat="server"></asp:Label>
                                                        </asp:LinkButton>
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
                    <!-- end: .admin-form -->
                    
                </div>
                <!-- end: .tray-center -->


            </section>
            <!-- End: Content -->
            </section>
            <!-- Begin: Content -->
    </form>
</asp:Content>

