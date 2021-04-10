<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="CheckInDetails.aspx.cs" Inherits="Vistors.Vistors_CheckInDetails" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="vendor\jquery\jquery-1.11.1.min.js"></script>
    <script src="vendor\jquery\jquery_ui\jquery-ui.min.js"></script>
    <script type="text/javascript">

        jQuery(document).ready(function () {

            $(".aspNetDisabled").removeClass("aspNetDisabled").addClass("gui-input");
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
   
    <!-- Start: Content-Wrapper -->
    <section id="content_wrapper">
         <div id="DivMsg" runat="server" visible="false" class="alert alert-danger alert-dismissable">
                <i class="fa fa-remove pr10"></i>
                <strong>خطأ!</strong>الرجاء الإتصال بمسؤول النظام
             <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
            </div>
        <!-- Begin: Content -->
        <section id="content" class="table-layout animated fadeIn">

            <!-- begin: .tray-center -->
            <div class="tray tray-center">

                <!-- Begin: Content Header -->
                <div class="content-header">
                    <h2>تسجيل دخول <b>زائر </b></h2>
                </div>

                <!-- Validation Example -->
                <div class="admin-form theme-primary mw1000 center-block" style="padding-bottom: 175px;">

                    <div class="panel heading-border">

                        <form method="post" runat="server" id="adminform">

                            <div class="panel-body bg-light">

                                <div class="section-divider mt20 mb40">
                                    <span>من فضلك ادخل المعلومات المطلوبة </span>
                                </div>
                                <!-- .section-divider -->

                                <div class="section" id="spy1">

                                    <label for="IDNum" class="field prepend-icon">
                                        <asp:TextBox runat="server" name="firstname" ID="txtIDNum" class="gui-input " placeholder="رقم الهوية..." Enabled="false"></asp:TextBox>
                                        <label for="txtIDNum" class="field-icon">
                                            <i class="fa fa-id-card-o"></i>
                                        </label>
                                    </label>
                                </div>
                                <!-- end .section row section -->

                                <div class="section">
                                    <label for="name" class="field prepend-icon">
                                        <asp:TextBox runat="server" type="text" name="name" ID="txtName" class="gui-input" placeholder="الإسم الثلاثي..." Enabled="false"></asp:TextBox>
                                        <label for="txtName" class="field-icon">
                                            <i class="fa fa-user"></i>
                                        </label>
                                    </label>

                                </div>
                                <!-- end section -->

                                <div class="section">
                                    <label for="mobile" class="field prepend-icon">
                                        <asp:TextBox runat="server" name="mobile" ID="txtMobile" class="gui-input" placeholder="رقم الجوال..." Enabled="false"></asp:TextBox>
                                        <label for="txtMobile" class="field-icon">
                                            <i class="glyphicon glyphicon-phone "></i>
                                        </label>
                                    </label>
                                </div>

                                <div class="row " style="display: flex">
                                    <div class="col-md-12 mb20" id="divCkManualTime" runat="server" >
                                        <div class="option ">
                                            <label class="option option-primary">
                                                <asp:CheckBox ID="ckManualTime" runat="server" Checked="false" OnCheckedChanged="ckManualTime_CheckedChanged" AutoPostBack="true" />
                                                <span class="checkbox"></span> وقت يدوي
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-md-4" id="divHours" runat="server" visible="false" >
                                        <div class="section">
                                            <label class="field prepend-icon">
                                                <asp:TextBox ID="txtHours" runat="server" CssClass="gui-input" placeholder="الساعة" TextMode="Number" ></asp:TextBox>
                                                <label for="firstname" class="field-icon">
                                                    <i class="fa fa-clock-o"></i>
                                                </label>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-md-4" id="divMinutes" runat="server" visible="false">
                                        <div class="section">
                                            <label class="field prepend-icon">
                                                <asp:TextBox runat="server" ID="txtMinute" CssClass="gui-input" placeholder="الدقيقة" TextMode="Number"></asp:TextBox>
                                                <label for="firstname" class="field-icon">
                                                    <i class="fa fa-hourglass"></i>
                                                </label>
                                            </label>
                                        </div>
                                    </div>

                                </div>


                                <div class="section">
                                    <label class="field select">
                                        <asp:DropDownList ID="ddlDepartments" runat="server" ></asp:DropDownList>
                                    </label>
                                </div>
                                <div class="section">

                                    <label for="IDNum" class="field prepend-icon">
                                        <asp:TextBox runat="server" name="firstname" ID="txtNumberOfDependents" class="gui-input " placeholder="عدد المرافقين..."></asp:TextBox>
                                        <label for="txtIDNum" class="field-icon">
                                            <i class="fa fa-user-circle"></i>
                                        </label>
                                    </label>
                                </div>
                                <div class="section">
                                    <label for="comment" class="field prepend-icon">
                                        <asp:TextBox runat="server"   class="gui-textarea" ID="txtNote" name="comment" placeholder="ملاحظات..." TextMode="MultiLine"></asp:TextBox>
                                        <label for="comment" class="field-icon">
                                            <i class="fa fa-comments"></i>
                                        </label>
                                    </label>
                                </div>
                                <!-- end section -->
                 
                                <!-- end .section section -->
                            </div>
                            <!-- end .form-body section -->
                            <div class="panel-footer text-right">
                                <asp:Button runat="server" ID="btnSave" type="submit" class="btn active btn-success btn-blocky valid" Text="تسجيل دخول" OnClick="btnSave_Click" ></asp:Button>
                                <asp:Button runat="server" ID="btnReset" type="reset" class="button valid" Text="إلغاء" OnClick="btnReset_Click"></asp:Button>
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

