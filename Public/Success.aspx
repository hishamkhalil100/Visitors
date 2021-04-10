<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Success.aspx.cs" Inherits="Public.Public_Success" %>

<!DOCTYPE html>
<html lang="ar-SA">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
    <meta name="description" content="QUOTE - Request a quote for every type of companies">
    <meta name="author" content="Ansonika">
    <title><h2><asp:Literal runat="server" Text="<%$ Resources :Public, welcomeMsg%>" /></h2></title>

    <!-- Favicons-->
    <link rel="shortcut icon" href="assets\img\favicon.ico" type="image/x-icon">
    <link rel="apple-touch-icon" type="image/x-icon" href="assets\img\apple-touch-icon-57x57-precomposed.png">
    <link rel="apple-touch-icon" type="image/x-icon" sizes="72x72" href="assets\img\apple-touch-icon-72x72-precomposed.png">
    <link rel="apple-touch-icon" type="image/x-icon" sizes="114x114" href="assets\img\apple-touch-icon-114x114-precomposed.png">
    <link rel="apple-touch-icon" type="image/x-icon" sizes="144x144" href="assets\img\apple-touch-icon-144x144-precomposed.png">

    <!-- GOOGLE WEB FONT -->
    <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i" rel="stylesheet">

    <!-- BASE CSS -->
    <link href="assets\css\animate.min.css" rel="stylesheet">
    <link href="assets\css\bootstrap.min.css" rel="stylesheet">
    <link href="assets\css\ssss.css" rel="stylesheet">
    <link href="assets\css\style.css" rel="stylesheet">
    <link href="assets\css\icon_fonts\css\all_icons_min.css" rel="stylesheet">
    <link href="assets\css\magnific-popup.min.css" rel="stylesheet">
    <link href="assets\css\skins\square\yellow.css" rel="stylesheet">
    <link rel="”stylesheet”" href="assets\css\skins\square\build.css">
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
            <h1><a href="/Public/Default.aspx" title="Quote"></a></h1>
        </div>


        <nav class="main_nav">
            <ul class="nav nav-tabs">
                <li><a href="Default.aspx?lang=ar">العربية</a></li>
                <li><a href="Default.aspx?lang=en">English</a></li>

            </ul>
        </nav>
    </header>
    <!-- /header -->

    <div class="intro_txt animated fadeInUp success_square" style="left: 43.1%!important">
        <a href="#tab_1" data-toggle="tab" class="nav  control-group">

            <div class="card" style="width: 43.1rem; opacity: 0.92">
                <div class="success-checkmark">
                    <div class="check-icon">
                        <span class="icon-line line-tip"></span>
                        <span class="icon-line line-long"></span>
                        <div class="icon-circle"></div>
                        <div class="icon-fix"></div>
                    </div>
                </div>
                <div class="card-body" style="text-align: center; padding: 1.25rem;">
                    <div class="btn btn-primary align-middle" style="font-size:x-large">
                        <asp:Label id="txtCheckIn" runat="server"   Text="<%$ Resources: Public, successCheckIn%>" />
                        <asp:Label id="txtCheckOut" runat="server"   Text="<%$ Resources: Public, successCheckOut%>" />
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

    

    <!-- /add links -->

    <!-- Modal terms -->

    <!-- /.modal -->

    <!-- SCRIPTS -->
    <!-- Jquery-->
    <script src="assets\js\jquery-3.2.1.min.js"></script>
    <!-- Common script -->
    <script src="assets\js\common_scripts_min.js" charset="utf-8" type="text/javascript"></script>
    <!-- Theme script -->
    <script src="assets\js\functions.js"></script>
    <!-- Google map -->

    <script type="text/javascript">
        $(function () {
            var getUrlParameter = function getUrlParameter(sParam) {
                var sPageURL = window.location.search.substring(1),
                    sURLVariables = sPageURL.split('&'),
                    sParameterName,
                    i;

                for (i = 0; i < sURLVariables.length; i++) {
                    sParameterName = sURLVariables[i].split('=');

                    if (sParameterName[0] === sParam) {
                        return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
                    }
                }
            };

            var tech = getUrlParameter('status');
            if (tech == '0') {
                $('#txtCheckOut').show();
                $('#txtCheckIn').hide();
            } else {
                $('#txtCheckOut').hide();
                $('#txtCheckIn').show();
            }


           
        });


        window.setTimeout(function () {
            window.location.href = '/visitors/Public/Default.aspx';
        }, 5000);


    </script>


</body>

</html>

