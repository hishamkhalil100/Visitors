<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="CheckIn.aspx.cs" Inherits="Vistors.Vistors_CheckIn" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript">
        jQuery(document).ready(function () {

            "use strict";

            // Init Theme Core    
            Core.init();

            // Enable Demo Loading    
            Demo.init();

            // A "stack" controls the direction and position
            // of a notification. Here we create an array w
            // with several custom stacks that we use later
            var Stacks = {
                stack_top_right: {
                    "dir1": "down",
                    "dir2": "left",
                    "push": "top",
                    "spacing1": 10,
                    "spacing2": 10
                },
                stack_top_left: {
                    "dir1": "down",
                    "dir2": "right",
                    "push": "top",
                    "spacing1": 10,
                    "spacing2": 10
                },
                stack_bottom_left: {
                    "dir1": "right",
                    "dir2": "up",
                    "push": "top",
                    "spacing1": 10,
                    "spacing2": 10
                },
                stack_bottom_right: {
                    "dir1": "left",
                    "dir2": "up",
                    "push": "top",
                    "spacing1": 10,
                    "spacing2": 10
                },
                stack_bar_top: {
                    "dir1": "down",
                    "dir2": "right",
                    "push": "top",
                    "spacing1": 0,
                    "spacing2": 0
                },
                stack_bar_bottom: {
                    "dir1": "up",
                    "dir2": "right",
                    "spacing1": 0,
                    "spacing2": 0
                },
                stack_context: {
                    "dir1": "down",
                    "dir2": "left",
                    "context": $("#stack-context")
                },
            }

            // PNotify Plugin Event Init
            $('.notification').on('click', function (e) {
                var noteStyle = $(this).data('note-style');
                var noteShadow = $(this).data('note-shadow');
                var noteOpacity = $(this).data('note-opacity');
                var noteStack = $(this).data('note-stack');
                var width = "290px";

                // If notification stack or opacity is not defined set a default
                var noteStack = noteStack ? noteStack : "stack_top_right";
                var noteOpacity = noteOpacity ? noteOpacity : "1";

                // We modify the width option if the selected stack is a fullwidth style
                function findWidth() {
                    if (noteStack == "stack_bar_top") {
                        return "100%";
                    }
                    if (noteStack == "stack_bar_bottom") {
                        return "70%";
                    } else {
                        return "290px";
                    }
                }

                // Create new Notification
                new PNotify({
                    title: 'Bootstrap Themed',
                    text: 'Look at my beautiful styling! ^_^',
                    shadow: noteShadow,
                    opacity: noteOpacity,
                    addclass: noteStack,
                    type: noteStyle,
                    stack: Stacks[noteStack],
                    width: findWidth(),
                    delay: 1400
                });

            });


        });
    </script>
    <script>
        $(function () {
            var myHidden = document.getElementById('<%= hfNoti.ClientID %>');

            if (myHidden)//checking whether it is found on DOM, but not necessary
            {
                if (myHidden.value == 'successAdd') {
                    new PNotify({
                        title: 'تم',
                        text: 'تم إضافة الزائر بنجاح',
                        type: 'success',
                        icon: 'ui-icon ui-icon-signal-diag'
                    });
                }
                else if (myHidden.value == 'successCheckIn') {
                    new PNotify({
                        title: 'تم',
                        text: 'تم تسجيل دخول الزائر بنجاح',
                        type: 'success',
                        icon: 'ui-icon ui-icon-signal-diag'
                    });
                }
                if (myHidden.value == 'successExit') {
                    new PNotify({
                        title: 'تم',
                        text: 'تم تسجيل خروج الزائر بنجاح',
                        type: 'success',
                        icon: 'ui-icon ui-icon-signal-diag'
                    });
                }
                else if (myHidden.value == 'notFound') {

                    //$("#dialog-confirm").dialog({
                    //    resizable: false,
                    //    height: "auto",
                    //    width: 400,
                    //    modal: true,
                    //    buttons: {
                    //        "Delete all items": function () {
                    //            $(this).dialog("close");
                    //        },
                    //        Cancel: function () {
                    //            $(this).dialog("close");
                    //        }
                    //    }
                    //});
                    $("#myModal").modal();

                }

            }

            function addUser() {
                var valid = true;

                return valid;
            }

        });
    </script>
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
                    <h2>تسجيل <b>دخول </b>زائر </h2>
                </div>



                <!-- Validation Example -->
                <div class="admin-form theme-primary mw1000 center-block" style="padding-bottom: 175px;">

                    <div class="panel heading-border">
                        <form runat="server" id="adminform">
                            <%--<div class="modal fade mt70" id="myModal" role="dialog">
                                <div class="modal-dialog">

                                    <!-- Modal content-->
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                                            <h4 class="modal-title">عفوا...</h4>
                                        </div>
                                        <div class="modal-body">
                                            <p>هذا الزائر غير موجود هل تريد اضافته؟</p>
                                        </div>
                                        <div class="modal-footer">
                                            <asp:Button runat="server" ID="btnAddUser" CssClass="btn btn-primary"  OnClick="btnAddUser_Click" Text="موافق"></asp:Button>
                                            <asp:Button runat="server" class="btn btn-danger" data-dismiss="modal" Text="اغلاق"></asp:Button>

                                        </div>
                                    </div>

                                </div>
                            </div>--%>
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
                                            <div class="col-md-3">
                                                <div class="section">

                                                    <label class="field prepend-icon" for="txtSearchName">
                                                        <asp:TextBox ID="txtSearchName" CssClass="gui-input" placeholder="اسم الزائر..." runat="server" />
                                                        <label class="field-icon" for="txtSearchName">
                                                            <i class="fa fa-user"></i>
                                                        </label>
                                                    </label>

                                                    <!-- end section -->


                                                    <!-- end section -->
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="section">



                                                    <%--<div class="col-md-5" id="divtxtAlternativeID" runat="server" visible="false">
                                                        <label class="field prepend-icon">
                                                            <asp:TextBox ID="txtAlternativeID" runat="server" CssClass="gui-input" placeholder="رقم البطاقة"></asp:TextBox>
                                                            <label for="firstname" class="field-icon">
                                                                <i class="fa fa-id-card-o"></i>
                                                            </label>
                                                        </label>
                                                        <asp:Label ID="txtAlternativeIDError" runat="server" Font-Size="0.85em" ForeColor="#de888a" Text="من فضلك ادخل رقم البطاقة" Visible="false"></asp:Label>
                                                    </div>--%>
                                                   <%-- <div class="col-md-5" id="divddlAlternativeIDType" runat="server" visible="false">

                                                        <label class="field select">
                                                            <asp:DropDownList ID="ddlAlternativeIDType" runat="server">
                                                                <asp:ListItem Text="جواز سفر" Value="1" Selected="True"></asp:ListItem>
                                                                <asp:ListItem Text="بطاقة عمل" Value="2"></asp:ListItem>
                                                                <asp:ListItem Text="تصريح اخر" Value="3"></asp:ListItem>
                                                            </asp:DropDownList>
                                                        </label>
                                                    </div>--%>
                                                    <div runat="server" id="divNID">
                                                        <div class="col-md-10">

                                                            <label for="txtSearchIDNum" class="field prepend-icon">
                                                                <asp:TextBox runat="server" name="firstname" ID="txtSearchIDNum" class="gui-input " placeholder="رقم الهوية..."></asp:TextBox>
                                                                <label for="txtSearchIDNum" class="field-icon">
                                                                    <i class="fa fa-id-card-o" style="color: red"></i>
                                                                </label>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <%--<div class="col-md-2 mt10">
                                                        <div class="option ">
                                                            <label class="option option-primary">
                                                                <asp:CheckBox ID="ckAlternativeID" runat="server" Checked="false" OnCheckedChanged="ckAlternativeID_CheckedChanged" AutoPostBack="true" />
                                                                <span class="checkbox"></span>بطاقة اخرى
                                                            </label>
                                                        </div>
                                                    </div>--%>
                                                    <%--                                                    <label class="field prepend-icon" for="txtSearchIDNum">
                                                        <asp:TextBox ID="txtSearchIDNum" CssClass="gui-input" placeholder="رقم الهوية..." runat="server" />
                                                        <label class="field-icon" for="txtSearchIDNum">
                                                            <i class="fa fa-id-card-o"></i>
                                                        </label>
                                                    </label>--%>

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
                                                        <th class="text-center">تسجيل دخول / خروج</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <asp:DataList ID="dlUsers" runat="server" RepeatLayout="Flow" CssClass="table admin-form theme-warning tc-checkbox-1 fs13" RepeatDirection="Horizontal" OnItemCommand="dlUsers_ItemCommand" OnItemDataBound="dlUsers_ItemDataBound">
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
                                                                    <asp:Label ID="lblStatus" runat="server" Visible="false"></asp:Label>
                                                                    <asp:Label ID="lblVisitorUUID" runat="server" Text='<%# Eval("UserID") %>'  Visible="false"></asp:Label>
                                                                    <asp:Button ID="btnAccept" runat="server" CommandArgument='<%# Eval("VisitorID") %>' CommandName="btnAccept" CssClass="btn active btn-success" Text="دخول" />
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
