<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Login.aspx.cs" Inherits="Login" %>

<!DOCTYPE html>
<html>

<head>
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <title>AdminDesigns - A Responsive HTML5 Admin UI Framework</title>
    <meta name="keywords" content="HTML5 Bootstrap 3 Admin Template UI Theme">
    <meta name="description" content="AdminDesigns - A Responsive HTML5 Admin UI Framework">
    <meta name="author" content="AdminDesigns">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Font CSS (Via CDN) -->
    <link rel='stylesheet' type='text/css' href='http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700'>

    <!-- Theme CSS -->
    <link rel="stylesheet" type="text/css" href="assets\skin\default_skin\css\theme.css">

    <!-- Admin Forms CSS -->
    <link rel="stylesheet" type="text/css" href="assets\admin-tools\admin-forms\css\admin-forms.css">

    <!-- Favicon -->
    <link rel="shortcut icon" href="assets\img\favicon.ico">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
   <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
   <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
   <![endif]-->
</head>

<body class="external-page sb-l-c sb-r-c" style="direction: rtl">

    <!-- Start: Main -->
    <div id="main" class="animated fadeIn">

        <!-- Start: Content-Wrapper -->
        <section id="content_wrapper">
            <div id="DivMsg" runat="server" visible="false" class="alert alert-danger alert-dismissable">
                <i class="fa fa-remove pr10"></i>
                <strong>خطأ!</strong> الرجاء التأكد من اسم المسنخدم وكلمة المرور
            </div>
            <!-- begin canvas animation bg -->
            <div id="canvas-wrapper">
                <canvas id="demo-canvas"></canvas>
            </div>

            <!-- Begin: Content -->
            <section id="content">

                <div class="admin-form theme-info" id="login1">

                    <div class="row mb15 table-layout">

                        <div class="va-m pln">
                            <a href="#" title="Return to Dashboard">
                                <img src="vendor/Images/KFNL.png" title="AdminDesigns Logo" class="img-responsive w250">
                            </a>
                        </div>



                    </div>

                    <div class="panel panel-info mt10 br-n mw500 center-block">

                        <div class="panel-heading heading-border bg-white">
                        </div>

                        <!-- end .form-header section -->
                        <form method="post" runat="server" id="contact">
                            <div class="panel-body bg-light p30">
                                <div class="row">
                                    <div class="col-sm-12">



                                        <div class="section">
                                            <label for="username" class="field-label text-muted fs18 mb10">اسم المستخدم</label>
                                            <label for="username" class="field prepend-icon">
                                                <asp:TextBox runat="server" ID="txtUserName" CssClass="gui-input" placeholder="ادخل اسم المستخدم"></asp:TextBox>
                                                <label for="username" class="field-icon">
                                                    <i class="fa fa-user"></i>
                                                </label>
                                            </label>
                                        </div>
                                        <!-- end section -->

                                        <div class="section">
                                            <label for="username" class="field-label text-muted fs18 mb10">كلمة المرور</label>
                                            <label for="password" class="field prepend-icon">
                                                <asp:TextBox ID="txtPassword" runat="server" CssClass="gui-input" placeholder="ادخل كلمة المرور" TextMode="Password"></asp:TextBox>
                                                <label for="password" class="field-icon">
                                                    <i class="fa fa-lock"></i>
                                                </label>
                                            </label>
                                        </div>
                                        <!-- end section -->

                                    </div>

                                </div>
                            </div>
                            <!-- end .form-body section -->
                            <div class="panel-footer clearfix p10 ph15">
                                <asp:Button runat="server" ID="btnLogin" CssClass="button btn-primary mr10 pull-right" Text="تسجيل الدخول" OnClick="btnLogin_Click" />
                                <label class="switch ib switch-primary pull-left input-align mt10" style="direction: ltr !important">
                                    <input runat="server" type="checkbox" name="remember" id="chkRemberMe" checked="" />
                                    <label for="remember" data-on="نعم" data-off="لا"></label>
                                    <span>تذكرني</span>
                                </label>
                            </div>
                            <!-- end .form-footer section -->
                        </form>
                    </div>
                </div>

            </section>
            <!-- End: Content -->

        </section>
        <!-- End: Content-Wrapper -->

    </div>
    <!-- End: Main -->

    <!-- BEGIN: PAGE SCRIPTS -->

    <!-- jQuery -->
    <script src="vendor\jquery\jquery-1.11.1.min.js"></script>
    <script src="vendor\jquery\jquery_ui\jquery-ui.min.js"></script>

    <!-- CanvasBG Plugin(creates mousehover effect) -->
    <script src="vendor\plugins\canvasbg\canvasbg.js"></script>

    <!-- Theme Javascript -->
    <script src="assets\js\utility\utility.js"></script>
    <script src="assets\js\demo\demo.js"></script>
    <script src="assets\js\main.js"></script>

    <!-- Page Javascript -->
    <script type="text/javascript">
        jQuery(document).ready(function () {

            "use strict";

            // Init Theme Core      
            Core.init();

            // Init Demo JS
            Demo.init();

            // Init CanvasBG and pass target starting location
            CanvasBG.init({
                Loc: {
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 3.3
                },
            });

        });
    </script>

    <!-- END: PAGE SCRIPTS -->

</body>

</html>

