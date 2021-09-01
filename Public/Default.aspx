<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="Public.Public_Default" %>

<!DOCTYPE html>
<html lang="ar-SA">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
    <meta name="description" content="QUOTE - Request a quote for every type of companies">
    <meta name="author" content="Ansonika">
    <title>
        <asp:Literal runat="server" Text="<%$ Resources :Public, welcomeMsg%>" /></title>

    <!-- Favicons-->
    <link rel="shortcut icon" href="assets\img\icon.png" type="image/x-icon">
    <link rel="apple-touch-icon" type="image/x-icon" href="assets\img\apple-touch-icon-57x57-precomposed.png">
    <link rel="apple-touch-icon" type="image/x-icon" sizes="72x72" href="assets\img\apple-touch-icon-72x72-precomposed.png">
    <link rel="apple-touch-icon" type="image/x-icon" sizes="114x114" href="assets\img\apple-touch-icon-114x114-precomposed.png">
    <link rel="apple-touch-icon" type="image/x-icon" sizes="144x144" href="assets\img\apple-touch-icon-144x144-precomposed.png">

    <!-- GOOGLE WEB FONT -->
    <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i" rel="stylesheet">

    <!-- BASE CSS -->
    <link href="assets\css\animate.min.css" rel="stylesheet">
    <link href="assets\css\bootstrap.min.css" rel="stylesheet">
    <link href="assets\css\style.css" rel="stylesheet">
    <link href="assets\css\icon_fonts\css\all_icons_min.css" rel="stylesheet">
    <link href="assets\css\magnific-popup.min.css" rel="stylesheet">
    <link href="assets\css\skins\square\yellow.css" rel="stylesheet">
    <link rel="”stylesheet”" href="assets\css\skins\square\yellow.css">
    <!-- YOUR CUSTOM CSS -->
    <link href="assets\css\custom.css" rel="stylesheet">
</head>

<body>

    <div id="loader_form">
        <div data-loader="circle-side-2"></div>
    </div>
    <!-- /Loader_form -->

    <header>
        <div id="logo_home">
            <h1><a href="/Public/Default.aspx"></a></h1>
        </div>


        <nav class="main_nav">
            <ul class="nav nav-tabs">
                <li><a href="Default.aspx?lang=ar">العربية</a></li>
                <li><a href="Default.aspx?lang=en">English</a></li>

            </ul>
        </nav>
    </header>
    <!-- /header -->

   

    <div class="intro_txt animated fadeInUp square" style="left: 60%!important">
        <a href="#tab_2" data-toggle="tab" class="nav  control-group">

            <div class="card" style="width: 18rem; opacity: 0.92">
                <img src="assets/img/check-in-icon-18.png" style="padding: 15px;" class="card-img-top" alt="...">
                <div class="card-body" style="text-align: center; padding: 1.25rem;">
                    <div class="btn btn-primary align-middle">
                        <asp:Literal runat="server" Text="<%$ Resources :Public, signInCurrentUser%>" />
                    </div>
                </div>
            </div>




        </a>

    </div>

    <div class="intro_txt animated fadeInUp square" style="left: 40%!important">
        <a href="#tab_3" data-toggle="tab" class="nav  control-group">

            <div class="card" style="width: 18rem; opacity: 0.92">
                <img src="assets/img/check-out-icon-18.png" style="padding: 15px;" class="card-img-top" alt="...">
                <div class="card-body" style="text-align: center; padding: 1.25rem;">
                    <div class="btn btn-primary align-middle">
                        <asp:Literal runat="server" Text="<%$ Resources :Public, signOutCurrentUser%>" />
                    </div>
                </div>
            </div>




        </a>

    </div>
    <!-- /intro_txt -->

    <video id="my-video" class="video" loop="" muted="" autoplay="" playsinline="">
        <source src="assets\media\KFNLVideo.mp4" type="video/mp4">
    </video>
    <!-- /video -->
    <div class="video_fallback"></div>

    <div class="layer"></div>
    <!-- /mask -->

    <div id="main_container">
        <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">
                            <asp:Literal runat="server" Text="<%$ Resources :Public, error%>" /></h4>
                    </div>
                    <div class="modal-body">
                        <p>
                            <asp:Literal runat="server" Text="<%$ Resources :Public, errorSearchMsg%>" />
                        </p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">
                            <asp:Literal runat="server" Text="<%$ Resources :Public, close%>" /></button>
                    </div>
                </div>

            </div>
        </div>
        <div class="modal fade" id="userNotAllowedModel" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">
                            <asp:Literal runat="server" Text="<%$ Resources :Public, error%>" /></h4>
                    </div>
                    <div class="modal-body">
                        <p>
                            <asp:Literal runat="server" Text="<%$ Resources :Public, errorValidationMsg%>" />
                        </p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">
                            <asp:Literal runat="server" Text="<%$ Resources :Public, close%>" /></button>
                    </div>
                </div>

            </div>
        </div>
        <div id="header_in">
            <a href="#0" class="close_in "><i class="pe-7s-close-circle"></i></a>
        </div>

        <div class="wrapper_in" dir="rtl">
            <div class="container-fluid">
                <div class="tab-content">
                    <div id="wizard_container">
                        <form name="example-1" id="wrapped" method="POST" runat="server" autocomplete="off">
                            
                            <!-- /row -->

                            <div class="tab-pane fade" id="tab_2">

                                <div class="subheader" id="about"></div>
                                <div class="row">
                                    <aside class="col-xl-3 col-lg-4">
                                        <h2>
                                            <asp:Literal runat="server" Text="<%$ Resources :Public, welcomeMsg%>" /></h2>
                                        <!--<p class="lead">An mei sadipscing dissentiet, eos ea partem viderer facilisi.</p>
                                <ul class="list_ok">
                                    <li>Delicata persecuti ei nec, et his minim omnium, aperiam placerat ea vis.</li>
                                    <li>Suavitate vituperatoribus pro ad, cum in quis propriae abhorreant.</li>
                                    <li>Aperiri deterruisset ei mea, sed cu laudem intellegat, eu mutat iuvaret voluptatum mei.</li>
                                </ul>-->
                                    </aside>
                                    <div class="col-xl-9 col-lg-8">



                                        <asp:ScriptManager ID="sm" EnablePageMethods="true" runat="server" />


                                        <asp:HiddenField runat="server" ID="hiddID" />
                                        <asp:HiddenField runat="server" ID="VisitorUUID" />

                                        <input id="website" name="website" type="text" value=""><!-- Leave for security protection, read docs for details -->
                                        <div id="middle-wizard">
                                            <div class="submit ">
                                                <h3 class="main_question">
                                                    <asp:Literal runat="server" Text="<%$ Resources :Public, fillData%>" /></h3>

                                                <div class="row" id="divSearch">
                                                    <div class="col-9">
                                                        <div class="form-group">
                                                            <input id="txtSearchID" type="text" runat="server" name="company_name" class="form-control required " placeholder="<%$ Resources :Public, enterID%>" />
                                                        </div>
                                                    </div>


                                                    <div class="col-3">

                                                        <button id="btnCheckInSearch" type="button" class="hellobutton btn btn-danger">
                                                            <asp:Literal runat="server" Text="<%$ Resources :Public, search%>" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div class="divContent">
                                                    <div class="row">

                                                        <div class="col-sm-12">


                                                            <div class="form-group">
                                                                <input readonly="" type="text" runat="server" name="company_name" class="form-control required txtSearchName" placeholder="<%$ Resources :Public, search%>" />
                                                            </div>
                                                            <div class="form-group">
                                                                <%-- <div class="styled-select">--%>
                                                                <asp:DropDownList ID="ddlDepartments" runat="server" CssClass="form-control required">
                                                                </asp:DropDownList>
                                                                <%--</div>--%>
                                                            </div>

                                                            <div class="form-group">
                                                                <input id="txtNumberOfDependents" runat="server" type="text" min="0" max="100" value="0" class="required form-control" placeholder="<%$ Resources :Public, numberOfcompanions%>" />
                                                            </div>
                                                            <div id="divDependents"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /step 1-->

                                        <!-- /middle-wizard -->
                                        <div class="bottom-wizard">
                                            <asp:Button runat="server" ID="btnLogin" OnClick="btnLogin_OnClick" CssClass="submit btn btn-success" Text="<%$ Resources :Public, checkin%>" />

                                        </div>
                                        <!-- /bottom-wizard -->


                                    </div>
                                </div>
                                <!-- /row -->
                            </div>

                            <div class="tab-pane fade" id="tab_3">

                                <div class="subheader" id="about"></div>
                                <div class="row">
                                    <aside class="col-xl-3 col-lg-4">
                                        <h2>
                                            <asp:Literal runat="server" Text="<%$ Resources :Public, welcomeMsg%>" /></h2>
                                        <!--<p class="lead">An mei sadipscing dissentiet, eos ea partem viderer facilisi.</p>
                                <ul class="list_ok">
                                    <li>Delicata persecuti ei nec, et his minim omnium, aperiam placerat ea vis.</li>
                                    <li>Suavitate vituperatoribus pro ad, cum in quis propriae abhorreant.</li>
                                    <li>Aperiri deterruisset ei mea, sed cu laudem intellegat, eu mutat iuvaret voluptatum mei.</li>
                                </ul>-->
                                    </aside>
                                    <div class="col-xl-9 col-lg-8">






                                        <asp:HiddenField runat="server" ID="HiddenField1" />


                                        <div id="middle-wizard2">
                                            <div class="submit ">
                                                <h3 class="main_question">
                                                    <asp:Literal runat="server" Text="<%$ Resources :Public, fillData%>" /></h3>

                                                <div class="row" id="divSearch2">
                                                    <div class="col-9">
                                                        <div class="form-group">
                                                            <input id="txtSearchIDOut" type="text" runat="server" name="company_name" class="form-control required " placeholder="<%$ Resources :Public, enterID%>" />
                                                        </div>
                                                    </div>


                                                    <div class="col-3">

                                                        <button type="button" id="btnCheckOutSearch" class="hellobutton btn btn-danger">
                                                            <asp:Literal runat="server" Text="<%$ Resources :Public, search%>" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div class="divContent">
                                                    <div class="row">

                                                        <div class="col-sm-12">


                                                            <div class="form-group">
                                                                <input readonly="" type="text" runat="server" name="company_name" class="form-control required txtSearchName" placeholder="<%$ Resources :Public, search%>"/>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /step 1-->

                                        <!-- /middle-wizard -->
                                        <div class="bottom-wizard">
                                            <asp:Button runat="server" ID="btnCheckOut" OnClick="btnCheckOut_OnClick" CssClass="submit btn btn-success" Text="<%$ Resources :Public, checkout%>" />

                                        </div>
                                        <!-- /bottom-wizard -->


                                    </div>
                                </div>
                                <!-- /row -->
                            </div>
                        </form>
                    </div>
                </div>
                <!-- /TAB 1:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: -->


            </div>
            <!-- /TAB 3:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: -->


            <!-- /tab content -->
        </div>

        <!-- /container-fluid -->
        <!-- /wrapper_in -->

    </div>

    <!-- /add links -->

    <!-- Modal terms -->

    <!-- /.modal -->

    <!-- SCRIPTS -->
    <!-- Jquery-->

    <script src="assets\js\jquery-3.2.1.min.js"></script>
    <script>

        var input = document.getElementById("txtSearchID");
        //input.addEventListener("keyup", function (event) {
        //    event.preventDefault();
        //    if (event.keyCode === 13) {
        //        event.preventDefault();
        //        document.getElementById("btnCheckInSearch").click();
        //    }
        //});
        $('#<%=txtSearchID.ClientID%>').keypress(function (e) {


        if (event.keyCode === 13) {
            e.preventDefault();
            document.getElementById("btnCheckInSearch").click();
        }
    });

    $('#<%=txtNumberOfDependents.ClientID%>').on('keyup ', function (e) {


            if (event.keyCode === 13 && $('#<%=txtNumberOfDependents.ClientID%>').val() == 0) {
            e.preventDefault();
            document.getElementById("btnLogin").click();
        } else {
            if (event.keyCode === 13) {
                e.preventDefault();
            } else {
                if (e.type == 'keyup') {
                    document.getElementById("divDependents").innerHTML = "";
                    var divDependents = '';
                    for (var i = 0; i < parseInt($('#<%=txtNumberOfDependents.ClientID%>').val()) ; i++) {

                        divDependents += '<div class="row">' +
                            '<div class="col-6">' +
                                '<div class="form-group">' +
                           
                                    '<input name="txtDependent' + i + '" type="text"  class="required form-control" placeholder="Name..">' +
                                '</div>' +
                            '</div>' +


                                '<div class="col-3">' +
                                    '<div class="form-group radio_questions ">' +

                                        '<label>' +
                                            '<asp:Literal runat="server" Text="<%$ Resources :Public, male%>" />' +
                                                '<input  name="gender' + i + '" runat="server" type="radio" value="<%$ Resources :Public, male%>" class="icheck required"/>' +
                                        '</label>' +
                                     '</div>' +
                                '</div>' +
                                '<div class="col-3">' +
                                    '<div class="form-group radio_questions ">' +
                                        '<label>' +
                                           '<asp:Literal runat="server" Text="<%$ Resources :Public, female%>" />' +

                                            '<input name="gender' + i + '" runat="server" type="radio" value="<%$ Resources :Public, female%>" class="icheck required"/>' +
                                        '</label>' +
                                    '</div>' +

                                '</div>' +
                            '</div>' +
                            '</div>';

                    }
                    document.getElementById("divDependents").innerHTML = divDependents;
                }
            }
        }
    });
    $('#<%=txtSearchIDOut.ClientID%>').keypress(function (e) {


            if (event.keyCode === 13) {
                e.preventDefault();
                document.getElementById("btnCheckOutSearch").click();
            }
        });

        $('#<%=txtSearchIDOut.ClientID%>').keypress(function (e) {


            if (event.keyCode === 13) {
                e.preventDefault();
                document.getElementById("btnCheckOutSearch").click();
            }
        });
    </script>
    <!-- Common script -->
    <script src="assets\js\common_scripts_min.js" charset="utf-8" type="text/javascript"></script>
    <!-- Theme script -->
    <script src="assets\js\functions.js"></script>
    <link href="assets\css\select2.css" rel="stylesheet" />
    <script src="assets\js\select2.js"></script>
    <!-- Google map -->
    <script type="text/javascript">
        $(document).ready(function () {
            //set initial state.


            $('#ckAltID').change(function () {
                if (this.checked) {
                    $('#divddlAltIDType').css('display', 'block');
                    $('#divtxtAltID').css('display', 'block');
                    $('#divtxtNID').css('display', 'none');

                } else {
                    $('#divddlAltIDType').css('display', 'none');
                    $('#divtxtAltID').css('display', 'none');
                    $('#divtxtNID').css('display', 'block');
                }
            });
        });

    </script>
    <script type="text/javascript">
        <%--        $(function () {
            $(".hellobutton").click(function () {
                PageMethods.getVistor($("#<%=txtSearchID.ClientID%>").val(),
                function (result) {
                    alert(result);
                });
        });
    });--%>
        $('#<%=btnLogin.ClientID%>').prop('disabled', true);

        $(function () {
            $(".divContent").hide();
            $(".bottom-wizard").hide();
            $(".h5Exist").hide()
            var emp1;
            $(".hellobutton").click(function () {
                var results = new Array();
                if ($("#<%=txtSearchIDOut.ClientID%>").val() != '') {
                    emp1 = $("#<%=txtSearchIDOut.ClientID%>").val();
                } else {
                    emp1 = $("#<%=txtSearchID.ClientID%>").val();
                }
                // Without array you can use like to construct JSON object  
                // var results = { empList : [{ "ID": "1", "Name": "Manas" },   { "ID": "2", "Name": "Tester" }] };  


                                        $.ajax({
                                            url: '/visitors/WebService.asmx/getVistor',
                                            data: '{"nid":"' + emp1 + '"}',
                                            type: 'POST',
                                            contentType: 'application/json',
                                            dataType: 'json',
                                            beforeSend: function () {

                                            },
                                            success: function (result) {
                                                $("#loadMe").modal("hide");
                                                $.each(result, function (index, emp) {
                                                    if (result.error == "true") {
                                                        alert("An error occurred: " & result.errorMessage);
                                                    } else {
                                                        if (emp.Name != "" && emp.Name != null) {
                                                            $(".divContent").show();
                                                            $(".bottom-wizard").show(); 
                                                            $(".txtSearchName").val(emp.Name);
                                                            $("#<%=hiddID.ClientID%>").val(emp.VisitorID);
                                                            $("#<%=VisitorUUID.ClientID%>").val(emp.UserID);
                                                    $('#<%=btnLogin.ClientID%>').prop('disabled', false);
                                                } else {
                                                    $("#myModal").modal();

                                                }
                                            }

                                        });
                                    },
                                    error: function (xhr) {

                                        $("#myModal").modal();

                                        // alert('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
                                    },
                                    complete: function () {
                                    },
                                    failure: function (jqXHR, textStatus, errorThrown) {
                                    }
                                });
                            


               
            });
        });




     


        $(document).ready(function () {
            $('select').select2({
                dir: "rtl"
            });
        });

    </script>

    <script>
       
    </script>
</body>

</html>

