/* JS OBFUSCATED */

(function (_0x39a7x1) {
    'use strict';
    var _0x39a7x2 = _0x39a7x1('.intro_txt');
    var _0x39a7x3 = _0x39a7x1('#main_container');
    var _0x39a7x4 = _0x39a7x1('.layer');
    var _0x39a7x5 = _0x39a7x1('#menu-button-mobile');
    var _0x39a7x6 = _0x39a7x1('.intro_txt  a');
    var _0x39a7x20 = _0x39a7x1('main_nav');
    _0x39a7x2['on']('click', function () {
        _0x39a7x3['addClass']('show_container');
        _0x39a7x4['addClass']('layer-is-visible')
    });
    _0x39a7x1('.close_in')['on']('click', function () {
        _0x39a7x3['removeClass']('show_container');
        _0x39a7x1('.intro_txt a.active')['removeClass']('active');
        _0x39a7x4['removeClass']('layer-is-visible');
        $('#divddlAltIDType').css('display', 'none');
        $('#divtxtAltID').css('display', 'none');
        $('#divtxtNID').css('display', 'block');
        $(".divContent").hide();
        $(".bottom-wizard").hide();
        $("#h5Exist").hide()
        $(".txtSearchName").val('');

    });
    _0x39a7x6['on']('click', function (_0x39a7x7) {
        var _0x39a7x8 = _0x39a7x1(this)['attr']('href');
        _0x39a7x1('.wrapper_in')['animate']({
            scrollTop: _0x39a7x1(_0x39a7x8)['offset']()['top']
        }, 'fast');
        _0x39a7x7['preventDefault']();
        if (_0x39a7x1(window)['width']() <= 767) {
            _0x39a7x5['removeClass']('active');
            _0x39a7x2['slideToggle'](300)
        }
    });
    _0x39a7x5['on']('click', function () {
        _0x39a7x2['slideToggle'](500);
        _0x39a7x1(this)['toggleClass']('active')
    });
    _0x39a7x1(window)['on']('resize', function () {
        var _0x39a7x9 = _0x39a7x1(window)['width']();
        if (_0x39a7x9 <= 767) {
            _0x39a7x2['hide']()

        } else {
            _0x39a7x2['show']()
        }
    });
    var _0x39a7xa = _0x39a7x1('button.backward,button.forward');
    var _0x39a7xb = _0x39a7x1('.wrapper_in');
    if (window['innerWidth'] < 800) {
        _0x39a7xa['on']('click', function () {
            _0x39a7xb['animate']({
                scrollTop: 500
            }, 'slow');
            return false
        })
    };
    if (window['innerWidth'] < 600) {
        _0x39a7xa['on']('click', function () {
            _0x39a7xb['animate']({
                scrollTop: 610
            }, 'slow');
            return false
        })
    };
    _0x39a7x1('.tooltip-1')['tooltip']({
        html: true
    });

    function _0x39a7xc(_0x39a7x7) {
        _0x39a7x1(_0x39a7x7['target'])['prev']('.card-header')['find']('i.indicator')['toggleClass']('icon_minus_alt2 icon_plus_alt2')
    }
    _0x39a7x1('#accordion')['on']('hidden.bs.collapse shown.bs.collapse', _0x39a7xc);

    function _0x39a7xd(_0x39a7x7) {
        _0x39a7x1(_0x39a7x7['target'])['prev']('.panel-heading')['find']('.indicator')['toggleClass']('icon_minus_alt2 icon_plus_alt2')
    }
    _0x39a7x1('.video_modal')['magnificPopup']({
        type: 'iframe'
    });
    _0x39a7x1('.magnific-gallery')['each'](function () {
        _0x39a7x1(this)['magnificPopup']({
            delegate: 'a',
            type: 'image',
            gallery: {
                enabled: true
            }
        })
    });
    _0x39a7x1('.owl-carousel')['owlCarousel']({
        items: 1,
        dots: false,
        loop: true,
        autoplay: true,
        autoHeight: true,
        autoplayTimeout: 3500,
        animateOut: 'fadeOut',
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });
    jQuery(function (_0x39a7x1) {
       // _0x39a7x1('form#wrapped')['attr']('action', 'quote_send.php');
        _0x39a7x1('#wizard_container')['wizard']({
            stepsWrapper: '#wrapped',
            submit: '.submit',
            beforeSelect: function (_0x39a7x10, _0x39a7x11) {
                if (_0x39a7x1('input#website')['val']()['length'] != 0) {
                    return false
                };
                if (!_0x39a7x11['isMovingForward']) {
                    return true
                };
                var _0x39a7x12 = _0x39a7x1(this)['wizard']('state')['step']['find'](':input');
                return !_0x39a7x12['length'] || !!_0x39a7x12['valid']()
            }
        })['validate']({
            errorPlacement: function (_0x39a7xe, _0x39a7xf) {
                if (_0x39a7xf['is'](':radio') || _0x39a7xf['is'](':checkbox')) {
                    _0x39a7xe['insertBefore'](_0x39a7xf['next']())
                } else {
                    _0x39a7xe['insertAfter'](_0x39a7xf)
                }
            }
        });
        _0x39a7x1('#progressbar')['progressbar']();
        _0x39a7x1('#wizard_container')['wizard']({
            afterSelect: function (_0x39a7x10, _0x39a7x11) {
                _0x39a7x1('#progressbar')['progressbar']('value', _0x39a7x11['percentComplete']);
                _0x39a7x1('#location')['text']('(' + _0x39a7x11['stepsComplete'] + '/' + _0x39a7x11['stepsPossible'] + ')')
            }
        })
    });

    _0x39a7x1('input.icheck')['iCheck']({
        checkboxClass: 'icheckbox_square-yellow',
        radioClass: 'iradio_square-yellow'
    })
})(window['jQuery'])