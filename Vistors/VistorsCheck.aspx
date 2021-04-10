<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="VistorsCheck.aspx.cs" Inherits="Vistors.Vistors_VistorsCheck" %>

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
                    <h2>الإستعلام عن  <b>موعد </b>زائر </h2>
                </div>



                <!-- Validation Example -->
                <div class="admin-form theme-primary mw1000 center-block" style="padding-bottom: 175px;">

                    <div class="panel heading-border">
                        <form runat="server" id="adminform">
                            <div class="modal fade mt70" id="validModal" role="dialog">
                                <div class="modal-dialog">

                                    <!-- Modal content-->
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                                            <h4 class="modal-title">شكرا...</h4>
                                        </div>
                                        <div class="modal-body" style="text-align: center">
                                            <img src="../assets/img/plugins/iconfinder_Tick_Mark_Dark.png" width="250" height="300" alt="">
                                            <h1>عزيزي المستفيد/ة</h1><h1 id="hName" style="color:dimgrey"></h1><h1> شكرا لك يمكنك الدخول</h1>
                                        </div>
                                        <div class="modal-footer">
                                            <asp:Button runat="server" class="btn btn-danger" data-dismiss="modal" Text="اغلاق"></asp:Button>

                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="modal fade mt70" id="invalidModal" role="dialog">
                                <div class="modal-dialog">

                                    <!-- Modal content-->
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                                            <h4 class="modal-title">خطأ...</h4>
                                        </div>
                                        <div class="modal-body" style="text-align: center">
                                            <img src="../assets/img/plugins/iconfinder_Close_Icon_Dark.png" width="250" height="300"/>
                                            <h1>عزيزي المستفيد الرجاء التأكد من حجز موعد</h1>
                                        </div>
                                        <div class="modal-footer">
                                            <asp:Button runat="server" class="btn btn-danger" data-dismiss="modal" Text="اغلاق"></asp:Button>

                                        </div>
                                    </div>

                                </div>
                            </div>
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
                                            <div class="col-md-2">
                                                <div class="section">
                                                    <asp:Button ID="btnSearch" runat="server" CssClass="btn active btn-primary vali btnSearch" OnClientClick="return false;" Text="بحث" />

                                                </div>
                                            </div>


                                            <div class="col-md-10">
                                                <div class="section">




                                                    <div runat="server" id="divNID">
                                                         <div class="col-md-6">

                                                            <label for="txtSearchRefNum" class="field prepend-icon">
                                                                <asp:TextBox runat="server" name="firstname" ID="txtSearchRefNum" class="gui-input " placeholder="رقم الحجز..."></asp:TextBox>
                                                                <label for="txtSearchRefNum" class="field-icon">
                                                                    <i class="fa fa-id-card-o" style="color: red"></i>
                                                                </label>
                                                            </label>
                                                        </div>
                                                        <div class="col-md-6">

                                                            <label for="txtSearchIDNum" class="field prepend-icon">
                                                                <asp:TextBox runat="server" name="firstname" ID="txtSearchIDNum" class="gui-input " placeholder="رقم الهوية..."></asp:TextBox>
                                                                <label for="txtSearchIDNum" class="field-icon">
                                                                    <i class="fa fa-id-card-o" style="color: red"></i>
                                                                </label>
                                                            </label>
                                                        </div>

                                                       
                                                    </div>

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
    <script>

        $(function () {
            var emp1;
            var isRef;
            $(".btnSearch").click(function () {
                var results = new Array();
                if ($("#<%=txtSearchIDNum.ClientID%>").val() != '') {
                    emp1 = $("#<%=txtSearchIDNum.ClientID%>").val();
                    isRef = false;
               } else {
                    emp1 = $("#<%=txtSearchRefNum.ClientID%>").val();
                    isRef = true;
               }
               // Without array you can use like to construct JSON object  
               // var results = { empList : [{ "ID": "1", "Name": "Manas" },   { "ID": "2", "Name": "Tester" }] };  
               $.ajax({
                   url: '/visitors/WebService.asmx/UserAccessCheck',
                   data: '{"userId":"' + emp1 + '","isRef":' + isRef + '}',
                   type: 'POST',
                   contentType: 'application/json',
                   dataType: 'json',
                   beforeSend: function () {

                   },
                   success: function (result) {

                       $.each(result,
                           function (index, emp) {
                               if (result.error == "true") {
                                   alert("An error occurred: " & result.errorMessage);
                               } else {
                                   if (emp == null || emp == '') {
                                       $("#invalidModal").modal();
                                   }
                                   else {
                                       $("#hName").html(emp);
                                       $("#validModal").modal();
                                   }
                               }

                           });
                   },
                   error: function (xhr) {

                       //  alert("An error occurred: " & result.errorMessage);
                       // $("#userNotAllowedModel").modal();
                       $("#invalidModal").modal();
                       alert('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
                   },
                   complete: function () {
                   },
                   failure: function (jqXHR, textStatus, errorThrown) {
                   }
               });



           });
       });
    </script>
</asp:Content>


