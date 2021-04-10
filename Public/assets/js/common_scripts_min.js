! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.Popper = e()
}(this, function() {
    "use strict";

    function t(t) {
        return t && "[object Function]" === {}.toString.call(t)
    }

    function e(t, e) {
        if (1 !== t.nodeType) return [];
        var i = window.getComputedStyle(t, null);
        return e ? i[e] : i
    }

    function i(t) {
        return "HTML" === t.nodeName ? t : t.parentNode || t.host
    }

    function s(t) {
        if (!t || -1 !== ["HTML", "BODY", "#document"].indexOf(t.nodeName)) return window.document.body;
        var n = e(t),
            o = n.overflow,
            r = n.overflowX,
            a = n.overflowY;
        return /(auto|scroll)/.test(o + a + r) ? t : s(i(t))
    }

    function n(t) {
        var i = t && t.offsetParent,
            s = i && i.nodeName;
        return s && "BODY" !== s && "HTML" !== s ? -1 !== ["TD", "TABLE"].indexOf(i.nodeName) && "static" === e(i, "position") ? n(i) : i : window.document.documentElement
    }

    function o(t) {
        return null === t.parentNode ? t : o(t.parentNode)
    }

    function r(t, e) {
        if (!(t && t.nodeType && e && e.nodeType)) return window.document.documentElement;
        var i = t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING,
            s = i ? t : e,
            a = i ? e : t,
            l = document.createRange();
        l.setStart(s, 0), l.setEnd(a, 0);
        var h, c, u = l.commonAncestorContainer;
        if (t !== u && e !== u || s.contains(a)) return "BODY" === (c = (h = u).nodeName) || "HTML" !== c && n(h.firstElementChild) !== h ? n(u) : u;
        var d = o(t);
        return d.host ? r(d.host, e) : r(t, o(e).host)
    }

    function a(t) {
        var e = "top" === (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "top") ? "scrollTop" : "scrollLeft",
            i = t.nodeName;
        if ("BODY" === i || "HTML" === i) {
            var s = window.document.documentElement;
            return (window.document.scrollingElement || s)[e]
        }
        return t[e]
    }

    function l(t, e) {
        var i = "x" === e ? "Left" : "Top",
            s = "Left" == i ? "Right" : "Bottom";
        return +t["border" + i + "Width"].split("px")[0] + +t["border" + s + "Width"].split("px")[0]
    }

    function h(t, e, i, s) {
        return F(e["offset" + t], i["client" + t], i["offset" + t], j() ? i["offset" + t] + s["margin" + ("Height" === t ? "Top" : "Left")] + s["margin" + ("Height" === t ? "Bottom" : "Right")] : 0)
    }

    function c() {
        var t = window.document.body,
            e = window.document.documentElement,
            i = j() && window.getComputedStyle(e);
        return {
            height: h("Height", t, e, i),
            width: h("Width", t, e, i)
        }
    }

    function u(t) {
        return U({}, t, {
            right: t.left + t.width,
            bottom: t.top + t.height
        })
    }

    function d(t) {
        var i = {};
        if (j()) try {
            i = t.getBoundingClientRect();
            var s = a(t, "top"),
                n = a(t, "left");
            i.top += s, i.left += n, i.bottom += s, i.right += n
        } catch (t) {} else i = t.getBoundingClientRect();
        var o = {
                left: i.left,
                top: i.top,
                width: i.right - i.left,
                height: i.bottom - i.top
            },
            r = "HTML" === t.nodeName ? c() : {},
            h = r.width || t.clientWidth || o.right - o.left,
            d = r.height || t.clientHeight || o.bottom - o.top,
            p = t.offsetWidth - h,
            f = t.offsetHeight - d;
        if (p || f) {
            var g = e(t);
            p -= l(g, "x"), f -= l(g, "y"), o.width -= p, o.height -= f
        }
        return u(o)
    }

    function p(t, i) {
        var n = j(),
            o = "HTML" === i.nodeName,
            r = d(t),
            l = d(i),
            h = s(t),
            c = e(i),
            p = +c.borderTopWidth.split("px")[0],
            f = +c.borderLeftWidth.split("px")[0],
            g = u({
                top: r.top - l.top - p,
                left: r.left - l.left - f,
                width: r.width,
                height: r.height
            });
        if (g.marginTop = 0, g.marginLeft = 0, !n && o) {
            var m = +c.marginTop.split("px")[0],
                v = +c.marginLeft.split("px")[0];
            g.top -= p - m, g.bottom -= p - m, g.left -= f - v, g.right -= f - v, g.marginTop = m, g.marginLeft = v
        }
        return (n ? i.contains(h) : i === h && "BODY" !== h.nodeName) && (g = function(t, e) {
            var i = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
                s = a(e, "top"),
                n = a(e, "left"),
                o = i ? -1 : 1;
            return t.top += s * o, t.bottom += s * o, t.left += n * o, t.right += n * o, t
        }(g, i)), g
    }

    function f(t, n, o, l) {
        var h, d, f, g, m, v, _, b = {
                top: 0,
                left: 0
            },
            y = r(t, n);
        if ("viewport" === l) h = y, d = window.document.documentElement, f = p(h, d), g = F(d.clientWidth, window.innerWidth || 0), m = F(d.clientHeight, window.innerHeight || 0), v = a(d), _ = a(d, "left"), b = u({
            top: v - f.top + f.marginTop,
            left: _ - f.left + f.marginLeft,
            width: g,
            height: m
        });
        else {
            var w;
            "scrollParent" === l ? "BODY" === (w = s(i(t))).nodeName && (w = window.document.documentElement) : w = "window" === l ? window.document.documentElement : l;
            var C = p(w, y);
            if ("HTML" !== w.nodeName || function t(s) {
                    var n = s.nodeName;
                    return "BODY" !== n && "HTML" !== n && ("fixed" === e(s, "position") || t(i(s)))
                }(y)) b = C;
            else {
                var x = c(),
                    k = x.height,
                    D = x.width;
                b.top += C.top - C.marginTop, b.bottom = k + C.top, b.left += C.left - C.marginLeft, b.right = D + C.left
            }
        }
        return b.left += o, b.top += o, b.right -= o, b.bottom -= o, b
    }

    function g(t, e, i, s, n) {
        var o = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === t.indexOf("auto")) return t;
        var r = f(i, s, o, n),
            a = {
                top: {
                    width: r.width,
                    height: e.top - r.top
                },
                right: {
                    width: r.right - e.right,
                    height: r.height
                },
                bottom: {
                    width: r.width,
                    height: r.bottom - e.bottom
                },
                left: {
                    width: e.left - r.left,
                    height: r.height
                }
            },
            l = Object.keys(a).map(function(t) {
                return U({
                    key: t
                }, a[t], {
                    area: (e = a[t], e.width * e.height)
                });
                var e
            }).sort(function(t, e) {
                return e.area - t.area
            }),
            h = l.filter(function(t) {
                var e = t.width,
                    s = t.height;
                return e >= i.clientWidth && s >= i.clientHeight
            }),
            c = 0 < h.length ? h[0].key : l[0].key,
            u = t.split("-")[1];
        return c + (u ? "-" + u : "")
    }

    function m(t, e, i) {
        return p(i, r(e, i))
    }

    function v(t) {
        var e = window.getComputedStyle(t),
            i = parseFloat(e.marginTop) + parseFloat(e.marginBottom),
            s = parseFloat(e.marginLeft) + parseFloat(e.marginRight);
        return {
            width: t.offsetWidth + s,
            height: t.offsetHeight + i
        }
    }

    function _(t) {
        var e = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        };
        return t.replace(/left|right|bottom|top/g, function(t) {
            return e[t]
        })
    }

    function b(t, e, i) {
        i = i.split("-")[0];
        var s = v(t),
            n = {
                width: s.width,
                height: s.height
            },
            o = -1 !== ["right", "left"].indexOf(i),
            r = o ? "top" : "left",
            a = o ? "left" : "top",
            l = o ? "height" : "width",
            h = o ? "width" : "height";
        return n[r] = e[r] + e[l] / 2 - s[l] / 2, n[a] = i === a ? e[a] - s[h] : e[_(a)], n
    }

    function y(t, e) {
        return Array.prototype.find ? t.find(e) : t.filter(e)[0]
    }

    function w(e, i, s) {
        return (void 0 === s ? e : e.slice(0, function(t, e, i) {
            if (Array.prototype.findIndex) return t.findIndex(function(t) {
                return t[e] === i
            });
            var s = y(t, function(t) {
                return t[e] === i
            });
            return t.indexOf(s)
        }(e, "name", s))).forEach(function(e) {
            e.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
            var s = e.function || e.fn;
            e.enabled && t(s) && (i.offsets.popper = u(i.offsets.popper), i.offsets.reference = u(i.offsets.reference), i = s(i, e))
        }), i
    }

    function C(t, e) {
        return t.some(function(t) {
            var i = t.name;
            return t.enabled && i === e
        })
    }

    function x(t) {
        for (var e = [!1, "ms", "Webkit", "Moz", "O"], i = t.charAt(0).toUpperCase() + t.slice(1), s = 0; s < e.length - 1; s++) {
            var n = e[s],
                o = n ? "" + n + i : t;
            if (void 0 !== window.document.body.style[o]) return o
        }
        return null
    }

    function k(t, e, i, n) {
        i.updateBound = n, window.addEventListener("resize", i.updateBound, {
            passive: !0
        });
        var o = s(t);
        return function t(e, i, n, o) {
            var r = "BODY" === e.nodeName,
                a = r ? window : e;
            a.addEventListener(i, n, {
                passive: !0
            }), r || t(s(a.parentNode), i, n, o), o.push(a)
        }(o, "scroll", i.updateBound, i.scrollParents), i.scrollElement = o, i.eventsEnabled = !0, i
    }

    function D() {
        var t;
        this.state.eventsEnabled && (window.cancelAnimationFrame(this.scheduleUpdate), this.state = (this.reference, t = this.state, window.removeEventListener("resize", t.updateBound), t.scrollParents.forEach(function(e) {
            e.removeEventListener("scroll", t.updateBound)
        }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t))
    }

    function I(t) {
        return "" !== t && !isNaN(parseFloat(t)) && isFinite(t)
    }

    function E(t, e) {
        Object.keys(e).forEach(function(i) {
            var s = ""; - 1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(i) && I(e[i]) && (s = "px"), t.style[i] = e[i] + s
        })
    }

    function T(t, e, i) {
        var s = y(t, function(t) {
                return t.name === e
            }),
            n = !!s && t.some(function(t) {
                return t.name === i && t.enabled && t.order < s.order
            });
        if (!n) {
            var o = "`" + e + "`";
            console.warn("`" + i + "` modifier is required by " + o + " modifier in order to work, be sure to include it before " + o + "!")
        }
        return n
    }

    function S(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            i = Q.indexOf(t),
            s = Q.slice(i + 1).concat(Q.slice(0, i));
        return e ? s.reverse() : s
    }

    function A(t, e, i, s) {
        var n = [0, 0],
            o = -1 !== ["right", "left"].indexOf(s),
            r = t.split(/(\+|\-)/).map(function(t) {
                return t.trim()
            }),
            a = r.indexOf(y(r, function(t) {
                return -1 !== t.search(/,|\s/)
            }));
        r[a] && -1 === r[a].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
        var l = /\s*,\s*|\s+/,
            h = -1 === a ? [r] : [r.slice(0, a).concat([r[a].split(l)[0]]), [r[a].split(l)[1]].concat(r.slice(a + 1))];
        return (h = h.map(function(t, s) {
            var n = (1 === s ? !o : o) ? "height" : "width",
                r = !1;
            return t.reduce(function(t, e) {
                return "" === t[t.length - 1] && -1 !== ["+", "-"].indexOf(e) ? (t[t.length - 1] = e, r = !0, t) : r ? (t[t.length - 1] += e, r = !1, t) : t.concat(e)
            }, []).map(function(t) {
                return function(t, e, i, s) {
                    var n = t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                        o = +n[1],
                        r = n[2];
                    if (!o) return t;
                    if (0 === r.indexOf("%")) {
                        var a;
                        switch (r) {
                            case "%p":
                                a = i;
                                break;
                            case "%":
                            case "%r":
                            default:
                                a = s
                        }
                        return u(a)[e] / 100 * o
                    }
                    return "vh" === r || "vw" === r ? ("vh" === r ? F(document.documentElement.clientHeight, window.innerHeight || 0) : F(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * o : o
                }(t, n, e, i)
            })
        })).forEach(function(t, e) {
            t.forEach(function(i, s) {
                I(i) && (n[e] += i * ("-" === t[s - 1] ? -1 : 1))
            })
        }), n
    }
    for (var P = Math.min, M = Math.floor, F = Math.max, O = ["native code", "[object MutationObserverConstructor]"], z = "undefined" != typeof window, N = ["Edge", "Trident", "Firefox"], H = 0, $ = 0; $ < N.length; $ += 1)
        if (z && 0 <= navigator.userAgent.indexOf(N[$])) {
            H = 1;
            break
        } var L, W, R = z && (W = window.MutationObserver, O.some(function(t) {
            return -1 < (W || "").toString().indexOf(t)
        })) ? function(t) {
            var e = !1,
                i = 0,
                s = document.createElement("span");
            return new MutationObserver(function() {
                    t(), e = !1
                }).observe(s, {
                    attributes: !0
                }),
                function() {
                    e || (e = !0, s.setAttribute("x-index", i), ++i)
                }
        } : function(t) {
            var e = !1;
            return function() {
                e || (e = !0, setTimeout(function() {
                    e = !1, t()
                }, H))
            }
        },
        j = function() {
            return null == L && (L = -1 !== navigator.appVersion.indexOf("MSIE 10")), L
        },
        B = function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        },
        Y = function() {
            function t(t, e) {
                for (var i, s = 0; s < e.length; s++)(i = e[s]).enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
            }
            return function(e, i, s) {
                return i && t(e.prototype, i), s && t(e, s), e
            }
        }(),
        q = function(t, e, i) {
            return e in t ? Object.defineProperty(t, e, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = i, t
        },
        U = Object.assign || function(t) {
            for (var e, i = 1; i < arguments.length; i++)
                for (var s in e = arguments[i]) Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
            return t
        },
        K = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
        Q = K.slice(3),
        V = "flip",
        X = "clockwise",
        G = "counterclockwise",
        Z = function() {
            function e(i, s) {
                var n = this,
                    o = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                B(this, e), this.scheduleUpdate = function() {
                    return requestAnimationFrame(n.update)
                }, this.update = R(this.update.bind(this)), this.options = U({}, e.Defaults, o), this.state = {
                    isDestroyed: !1,
                    isCreated: !1,
                    scrollParents: []
                }, this.reference = i.jquery ? i[0] : i, this.popper = s.jquery ? s[0] : s, this.options.modifiers = {}, Object.keys(U({}, e.Defaults.modifiers, o.modifiers)).forEach(function(t) {
                    n.options.modifiers[t] = U({}, e.Defaults.modifiers[t] || {}, o.modifiers ? o.modifiers[t] : {})
                }), this.modifiers = Object.keys(this.options.modifiers).map(function(t) {
                    return U({
                        name: t
                    }, n.options.modifiers[t])
                }).sort(function(t, e) {
                    return t.order - e.order
                }), this.modifiers.forEach(function(e) {
                    e.enabled && t(e.onLoad) && e.onLoad(n.reference, n.popper, n.options, e, n.state)
                }), this.update();
                var r = this.options.eventsEnabled;
                r && this.enableEventListeners(), this.state.eventsEnabled = r
            }
            return Y(e, [{
                key: "update",
                value: function() {
                    return function() {
                        if (!this.state.isDestroyed) {
                            var t = {
                                instance: this,
                                styles: {},
                                attributes: {},
                                flipped: !1,
                                offsets: {}
                            };
                            t.offsets.reference = m(this.state, this.popper, this.reference), t.placement = g(this.options.placement, t.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), t.originalPlacement = t.placement, t.offsets.popper = b(this.popper, t.offsets.reference, t.placement), t.offsets.popper.position = "absolute", t = w(this.modifiers, t), this.state.isCreated ? this.options.onUpdate(t) : (this.state.isCreated = !0, this.options.onCreate(t))
                        }
                    }.call(this)
                }
            }, {
                key: "destroy",
                value: function() {
                    return function() {
                        return this.state.isDestroyed = !0, C(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.left = "", this.popper.style.position = "", this.popper.style.top = "", this.popper.style[x("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
                    }.call(this)
                }
            }, {
                key: "enableEventListeners",
                value: function() {
                    return function() {
                        this.state.eventsEnabled || (this.state = k(this.reference, this.options, this.state, this.scheduleUpdate))
                    }.call(this)
                }
            }, {
                key: "disableEventListeners",
                value: function() {
                    return D.call(this)
                }
            }]), e
        }();
    return Z.Utils = ("undefined" == typeof window ? global : window).PopperUtils, Z.placements = K, Z.Defaults = {
        placement: "bottom",
        eventsEnabled: !0,
        removeOnDestroy: !1,
        onCreate: function() {},
        onUpdate: function() {},
        modifiers: {
            shift: {
                order: 100,
                enabled: !0,
                fn: function(t) {
                    var e = t.placement,
                        i = e.split("-")[0],
                        s = e.split("-")[1];
                    if (s) {
                        var n = t.offsets,
                            o = n.reference,
                            r = n.popper,
                            a = -1 !== ["bottom", "top"].indexOf(i),
                            l = a ? "left" : "top",
                            h = a ? "width" : "height",
                            c = {
                                start: q({}, l, o[l]),
                                end: q({}, l, o[l] + o[h] - r[h])
                            };
                        t.offsets.popper = U({}, r, c[s])
                    }
                    return t
                }
            },
            offset: {
                order: 200,
                enabled: !0,
                fn: function(t, e) {
                    var i, s = e.offset,
                        n = t.placement,
                        o = t.offsets,
                        r = o.popper,
                        a = o.reference,
                        l = n.split("-")[0];
                    return i = I(+s) ? [+s, 0] : A(s, r, a, l), "left" === l ? (r.top += i[0], r.left -= i[1]) : "right" === l ? (r.top += i[0], r.left += i[1]) : "top" === l ? (r.left += i[0], r.top -= i[1]) : "bottom" === l && (r.left += i[0], r.top += i[1]), t.popper = r, t
                },
                offset: 0
            },
            preventOverflow: {
                order: 300,
                enabled: !0,
                fn: function(t, e) {
                    var i = e.boundariesElement || n(t.instance.popper);
                    t.instance.reference === i && (i = n(i));
                    var s = f(t.instance.popper, t.instance.reference, e.padding, i);
                    e.boundaries = s;
                    var o = e.priority,
                        r = t.offsets.popper,
                        a = {
                            primary: function(t) {
                                var i = r[t];
                                return r[t] < s[t] && !e.escapeWithReference && (i = F(r[t], s[t])), q({}, t, i)
                            },
                            secondary: function(t) {
                                var i = "right" === t ? "left" : "top",
                                    n = r[i];
                                return r[t] > s[t] && !e.escapeWithReference && (n = P(r[i], s[t] - ("right" === t ? r.width : r.height))), q({}, i, n)
                            }
                        };
                    return o.forEach(function(t) {
                        var e = -1 === ["left", "top"].indexOf(t) ? "secondary" : "primary";
                        r = U({}, r, a[e](t))
                    }), t.offsets.popper = r, t
                },
                priority: ["left", "right", "top", "bottom"],
                padding: 5,
                boundariesElement: "scrollParent"
            },
            keepTogether: {
                order: 400,
                enabled: !0,
                fn: function(t) {
                    var e = t.offsets,
                        i = e.popper,
                        s = e.reference,
                        n = t.placement.split("-")[0],
                        o = M,
                        r = -1 !== ["top", "bottom"].indexOf(n),
                        a = r ? "right" : "bottom",
                        l = r ? "left" : "top",
                        h = r ? "width" : "height";
                    return i[a] < o(s[l]) && (t.offsets.popper[l] = o(s[l]) - i[h]), i[l] > o(s[a]) && (t.offsets.popper[l] = o(s[a])), t
                }
            },
            arrow: {
                order: 500,
                enabled: !0,
                fn: function(t, e) {
                    if (!T(t.instance.modifiers, "arrow", "keepTogether")) return t;
                    var i = e.element;
                    if ("string" == typeof i) {
                        if (!(i = t.instance.popper.querySelector(i))) return t
                    } else if (!t.instance.popper.contains(i)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), t;
                    var s = t.placement.split("-")[0],
                        n = t.offsets,
                        o = n.popper,
                        r = n.reference,
                        a = -1 !== ["left", "right"].indexOf(s),
                        l = a ? "height" : "width",
                        h = a ? "top" : "left",
                        c = a ? "left" : "top",
                        d = a ? "bottom" : "right",
                        p = v(i)[l];
                    r[d] - p < o[h] && (t.offsets.popper[h] -= o[h] - (r[d] - p)), r[h] + p > o[d] && (t.offsets.popper[h] += r[h] + p - o[d]);
                    var f = r[h] + r[l] / 2 - p / 2 - u(t.offsets.popper)[h];
                    return f = F(P(o[l] - p, f), 0), t.arrowElement = i, t.offsets.arrow = {}, t.offsets.arrow[h] = Math.round(f), t.offsets.arrow[c] = "", t
                },
                element: "[x-arrow]"
            },
            flip: {
                order: 600,
                enabled: !0,
                fn: function(t, e) {
                    if (C(t.instance.modifiers, "inner")) return t;
                    if (t.flipped && t.placement === t.originalPlacement) return t;
                    var i = f(t.instance.popper, t.instance.reference, e.padding, e.boundariesElement),
                        s = t.placement.split("-")[0],
                        n = _(s),
                        o = t.placement.split("-")[1] || "",
                        r = [];
                    switch (e.behavior) {
                        case V:
                            r = [s, n];
                            break;
                        case X:
                            r = S(s);
                            break;
                        case G:
                            r = S(s, !0);
                            break;
                        default:
                            r = e.behavior
                    }
                    return r.forEach(function(a, l) {
                        if (s !== a || r.length === l + 1) return t;
                        s = t.placement.split("-")[0], n = _(s);
                        var h, c = t.offsets.popper,
                            u = t.offsets.reference,
                            d = M,
                            p = "left" === s && d(c.right) > d(u.left) || "right" === s && d(c.left) < d(u.right) || "top" === s && d(c.bottom) > d(u.top) || "bottom" === s && d(c.top) < d(u.bottom),
                            f = d(c.left) < d(i.left),
                            g = d(c.right) > d(i.right),
                            m = d(c.top) < d(i.top),
                            v = d(c.bottom) > d(i.bottom),
                            y = "left" === s && f || "right" === s && g || "top" === s && m || "bottom" === s && v,
                            C = -1 !== ["top", "bottom"].indexOf(s),
                            x = !!e.flipVariations && (C && "start" === o && f || C && "end" === o && g || !C && "start" === o && m || !C && "end" === o && v);
                        (p || y || x) && (t.flipped = !0, (p || y) && (s = r[l + 1]), x && (o = "end" === (h = o) ? "start" : "start" === h ? "end" : h), t.placement = s + (o ? "-" + o : ""), t.offsets.popper = U({}, t.offsets.popper, b(t.instance.popper, t.offsets.reference, t.placement)), t = w(t.instance.modifiers, t, "flip"))
                    }), t
                },
                behavior: "flip",
                padding: 5,
                boundariesElement: "viewport"
            },
            inner: {
                order: 700,
                enabled: !1,
                fn: function(t) {
                    var e = t.placement,
                        i = e.split("-")[0],
                        s = t.offsets,
                        n = s.popper,
                        o = s.reference,
                        r = -1 !== ["left", "right"].indexOf(i),
                        a = -1 === ["top", "left"].indexOf(i);
                    return n[r ? "left" : "top"] = o[e] - (a ? n[r ? "width" : "height"] : 0), t.placement = _(e), t.offsets.popper = u(n), t
                }
            },
            hide: {
                order: 800,
                enabled: !0,
                fn: function(t) {
                    if (!T(t.instance.modifiers, "hide", "preventOverflow")) return t;
                    var e = t.offsets.reference,
                        i = y(t.instance.modifiers, function(t) {
                            return "preventOverflow" === t.name
                        }).boundaries;
                    if (e.bottom < i.top || e.left > i.right || e.top > i.bottom || e.right < i.left) {
                        if (!0 === t.hide) return t;
                        t.hide = !0, t.attributes["x-out-of-boundaries"] = ""
                    } else {
                        if (!1 === t.hide) return t;
                        t.hide = !1, t.attributes["x-out-of-boundaries"] = !1
                    }
                    return t
                }
            },
            computeStyle: {
                order: 850,
                enabled: !0,
                fn: function(t, e) {
                    var i = e.x,
                        s = e.y,
                        o = t.offsets.popper,
                        r = y(t.instance.modifiers, function(t) {
                            return "applyStyle" === t.name
                        }).gpuAcceleration;
                    void 0 !== r && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
                    var a, l, h = void 0 === r ? e.gpuAcceleration : r,
                        c = d(n(t.instance.popper)),
                        u = {
                            position: o.position
                        },
                        p = {
                            left: M(o.left),
                            top: M(o.top),
                            bottom: M(o.bottom),
                            right: M(o.right)
                        },
                        f = "bottom" === i ? "top" : "bottom",
                        g = "right" === s ? "left" : "right",
                        m = x("transform");
                    if (l = "bottom" == f ? -c.height + p.bottom : p.top, a = "right" == g ? -c.width + p.right : p.left, h && m) u[m] = "translate3d(" + a + "px, " + l + "px, 0)", u[f] = 0, u[g] = 0, u.willChange = "transform";
                    else {
                        var v = "bottom" == f ? -1 : 1,
                            _ = "right" == g ? -1 : 1;
                        u[f] = l * v, u[g] = a * _, u.willChange = f + ", " + g
                    }
                    var b = {
                        "x-placement": t.placement
                    };
                    return t.attributes = U({}, b, t.attributes), t.styles = U({}, u, t.styles), t
                },
                gpuAcceleration: !0,
                x: "bottom",
                y: "right"
            },
            applyStyle: {
                order: 900,
                enabled: !0,
                fn: function(t) {
                    return E(t.instance.popper, t.styles), e = t.instance.popper, i = t.attributes, Object.keys(i).forEach(function(t) {
                        !1 === i[t] ? e.removeAttribute(t) : e.setAttribute(t, i[t])
                    }), t.offsets.arrow && E(t.arrowElement, t.offsets.arrow), t;
                    var e, i
                },
                onLoad: function(t, e, i, s, n) {
                    var o = m(0, e, t),
                        r = g(i.placement, o, e, t, i.modifiers.flip.boundariesElement, i.modifiers.flip.padding);
                    return e.setAttribute("x-placement", r), E(e, {
                        position: "absolute"
                    }), i
                },
                gpuAcceleration: void 0
            }
        }
    }, Z
}),
function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports, require("jquery"), require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "jquery", "popper.js"], e) : e(t.bootstrap = {}, t.jQuery, t.Popper)
}(this, function(t, e, i) {
    "use strict";

    function s(t, e) {
        for (var i = 0; i < e.length; i++) {
            var s = e[i];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(t, s.key, s)
        }
    }

    function n(t, e, i) {
        return e && s(t.prototype, e), i && s(t, i), t
    }

    function o() {
        return (o = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var i = arguments[e];
                for (var s in i) Object.prototype.hasOwnProperty.call(i, s) && (t[s] = i[s])
            }
            return t
        }).apply(this, arguments)
    }
    e = e && e.hasOwnProperty("default") ? e.default : e, i = i && i.hasOwnProperty("default") ? i.default : i;
    var r, a, l, h, c, u, d, p, f, g, m, v, _, b, y, w, C, x, k, D, I, E, T, S, A, P, M, F, O, z, N, H, $, L, W, R, j, B, Y, q, U, K, Q, V, X, G, Z, J, tt, et, it, st, nt, ot, rt, at, lt, ht, ct, ut, dt, pt, ft, gt, mt, vt, _t, bt, yt, wt, Ct, xt, kt, Dt, It, Et, Tt, St, At, Pt, Mt, Ft, Ot, zt, Nt, Ht, $t, Lt, Wt, Rt, jt, Bt, Yt, qt, Ut, Kt, Qt, Vt, Xt, Gt, Zt, Jt, te, ee, ie, se, ne, oe, re, ae, le, he, ce, ue, de, pe, fe, ge, me, ve, _e, be, ye, we, Ce, xe, ke, De, Ie, Ee, Te, Se, Ae, Pe, Me, Fe, Oe, ze, Ne, He, $e, Le, We, Re, je, Be, Ye, qe, Ue, Ke, Qe, Ve, Xe, Ge, Ze, Je, ti, ei, ii, si, ni, oi, ri, ai, li, hi, ci, ui, di, pi, fi, gi, mi, vi, _i, bi, yi, wi, Ci = function(t) {
            var e = !1;

            function i(e) {
                var i = this,
                    n = !1;
                return t(this).one(s.TRANSITION_END, function() {
                    n = !0
                }), setTimeout(function() {
                    n || s.triggerTransitionEnd(i)
                }, e), this
            }
            var s = {
                TRANSITION_END: "bsTransitionEnd",
                getUID: function(t) {
                    do {
                        t += ~~(1e6 * Math.random())
                    } while (document.getElementById(t));
                    return t
                },
                getSelectorFromElement: function(e) {
                    var i, s = e.getAttribute("data-target");
                    s && "#" !== s || (s = e.getAttribute("href") || ""), "#" === s.charAt(0) && (i = s, s = i = "function" == typeof t.escapeSelector ? t.escapeSelector(i).substr(1) : i.replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1"));
                    try {
                        return t(document).find(s).length > 0 ? s : null
                    } catch (t) {
                        return null
                    }
                },
                reflow: function(t) {
                    return t.offsetHeight
                },
                triggerTransitionEnd: function(i) {
                    t(i).trigger(e.end)
                },
                supportsTransitionEnd: function() {
                    return Boolean(e)
                },
                isElement: function(t) {
                    return (t[0] || t).nodeType
                },
                typeCheckConfig: function(t, e, i) {
                    for (var n in i)
                        if (Object.prototype.hasOwnProperty.call(i, n)) {
                            var o = i[n],
                                r = e[n],
                                a = r && s.isElement(r) ? "element" : (l = r, {}.toString.call(l).match(/\s([a-zA-Z]+)/)[1].toLowerCase());
                            if (!new RegExp(o).test(a)) throw new Error(t.toUpperCase() + ': Option "' + n + '" provided type "' + a + '" but expected type "' + o + '".')
                        } var l
                }
            };
            return e = ("undefined" == typeof window || !window.QUnit) && {
                end: "transitionend"
            }, t.fn.emulateTransitionEnd = i, s.supportsTransitionEnd() && (t.event.special[s.TRANSITION_END] = {
                bindType: e.end,
                delegateType: e.end,
                handle: function(e) {
                    if (t(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
                }
            }), s
        }(e),
        xi = (a = "alert", h = "." + (l = "bs.alert"), c = (r = e).fn[a], u = {
            CLOSE: "close" + h,
            CLOSED: "closed" + h,
            CLICK_DATA_API: "click" + h + ".data-api"
        }, d = "alert", p = "fade", f = "show", g = function() {
            function t(t) {
                this._element = t
            }
            var e = t.prototype;
            return e.close = function(t) {
                t = t || this._element;
                var e = this._getRootElement(t);
                this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
            }, e.dispose = function() {
                r.removeData(this._element, l), this._element = null
            }, e._getRootElement = function(t) {
                var e = Ci.getSelectorFromElement(t),
                    i = !1;
                return e && (i = r(e)[0]), i || (i = r(t).closest("." + d)[0]), i
            }, e._triggerCloseEvent = function(t) {
                var e = r.Event(u.CLOSE);
                return r(t).trigger(e), e
            }, e._removeElement = function(t) {
                var e = this;
                r(t).removeClass(f), Ci.supportsTransitionEnd() && r(t).hasClass(p) ? r(t).one(Ci.TRANSITION_END, function(i) {
                    return e._destroyElement(t, i)
                }).emulateTransitionEnd(150) : this._destroyElement(t)
            }, e._destroyElement = function(t) {
                r(t).detach().trigger(u.CLOSED).remove()
            }, t._jQueryInterface = function(e) {
                return this.each(function() {
                    var i = r(this),
                        s = i.data(l);
                    s || (s = new t(this), i.data(l, s)), "close" === e && s[e](this)
                })
            }, t._handleDismiss = function(t) {
                return function(e) {
                    e && e.preventDefault(), t.close(this)
                }
            }, n(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.0.0"
                }
            }]), t
        }(), r(document).on(u.CLICK_DATA_API, '[data-dismiss="alert"]', g._handleDismiss(new g)), r.fn[a] = g._jQueryInterface, r.fn[a].Constructor = g, r.fn[a].noConflict = function() {
            return r.fn[a] = c, g._jQueryInterface
        }, g),
        ki = (v = "button", b = "." + (_ = "bs.button"), y = ".data-api", w = (m = e).fn[v], C = "active", x = "btn", k = "focus", D = '[data-toggle^="button"]', I = '[data-toggle="buttons"]', E = "input", T = ".active", S = ".btn", A = {
            CLICK_DATA_API: "click" + b + y,
            FOCUS_BLUR_DATA_API: "focus" + b + y + " blur" + b + y
        }, P = function() {
            function t(t) {
                this._element = t
            }
            var e = t.prototype;
            return e.toggle = function() {
                var t = !0,
                    e = !0,
                    i = m(this._element).closest(I)[0];
                if (i) {
                    var s = m(this._element).find(E)[0];
                    if (s) {
                        if ("radio" === s.type)
                            if (s.checked && m(this._element).hasClass(C)) t = !1;
                            else {
                                var n = m(i).find(T)[0];
                                n && m(n).removeClass(C)
                            } if (t) {
                            if (s.hasAttribute("disabled") || i.hasAttribute("disabled") || s.classList.contains("disabled") || i.classList.contains("disabled")) return;
                            s.checked = !m(this._element).hasClass(C), m(s).trigger("change")
                        }
                        s.focus(), e = !1
                    }
                }
                e && this._element.setAttribute("aria-pressed", !m(this._element).hasClass(C)), t && m(this._element).toggleClass(C)
            }, e.dispose = function() {
                m.removeData(this._element, _), this._element = null
            }, t._jQueryInterface = function(e) {
                return this.each(function() {
                    var i = m(this).data(_);
                    i || (i = new t(this), m(this).data(_, i)), "toggle" === e && i[e]()
                })
            }, n(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.0.0"
                }
            }]), t
        }(), m(document).on(A.CLICK_DATA_API, D, function(t) {
            t.preventDefault();
            var e = t.target;
            m(e).hasClass(x) || (e = m(e).closest(S)), P._jQueryInterface.call(m(e), "toggle")
        }).on(A.FOCUS_BLUR_DATA_API, D, function(t) {
            var e = m(t.target).closest(S)[0];
            m(e).toggleClass(k, /^focus(in)?$/.test(t.type))
        }), m.fn[v] = P._jQueryInterface, m.fn[v].Constructor = P, m.fn[v].noConflict = function() {
            return m.fn[v] = w, P._jQueryInterface
        }, P),
        Di = (F = "carousel", z = "." + (O = "bs.carousel"), N = ".data-api", H = (M = e).fn[F], $ = {
            interval: 5e3,
            keyboard: !0,
            slide: !1,
            pause: "hover",
            wrap: !0
        }, L = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean"
        }, W = "next", R = "prev", j = "left", B = "right", Y = {
            SLIDE: "slide" + z,
            SLID: "slid" + z,
            KEYDOWN: "keydown" + z,
            MOUSEENTER: "mouseenter" + z,
            MOUSELEAVE: "mouseleave" + z,
            TOUCHEND: "touchend" + z,
            LOAD_DATA_API: "load" + z + N,
            CLICK_DATA_API: "click" + z + N
        }, q = "carousel", U = "active", K = "slide", Q = "carousel-item-right", V = "carousel-item-left", X = "carousel-item-next", G = "carousel-item-prev", Z = {
            ACTIVE: ".active",
            ACTIVE_ITEM: ".active.carousel-item",
            ITEM: ".carousel-item",
            NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
            INDICATORS: ".carousel-indicators",
            DATA_SLIDE: "[data-slide], [data-slide-to]",
            DATA_RIDE: '[data-ride="carousel"]'
        }, J = function() {
            function t(t, e) {
                this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this._config = this._getConfig(e), this._element = M(t)[0], this._indicatorsElement = M(this._element).find(Z.INDICATORS)[0], this._addEventListeners()
            }
            var e = t.prototype;
            return e.next = function() {
                this._isSliding || this._slide(W)
            }, e.nextWhenVisible = function() {
                !document.hidden && M(this._element).is(":visible") && "hidden" !== M(this._element).css("visibility") && this.next()
            }, e.prev = function() {
                this._isSliding || this._slide(R)
            }, e.pause = function(t) {
                t || (this._isPaused = !0), M(this._element).find(Z.NEXT_PREV)[0] && Ci.supportsTransitionEnd() && (Ci.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
            }, e.cycle = function(t) {
                t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
            }, e.to = function(t) {
                var e = this;
                this._activeElement = M(this._element).find(Z.ACTIVE_ITEM)[0];
                var i = this._getItemIndex(this._activeElement);
                if (!(t > this._items.length - 1 || t < 0))
                    if (this._isSliding) M(this._element).one(Y.SLID, function() {
                        return e.to(t)
                    });
                    else {
                        if (i === t) return this.pause(), void this.cycle();
                        var s = t > i ? W : R;
                        this._slide(s, this._items[t])
                    }
            }, e.dispose = function() {
                M(this._element).off(z), M.removeData(this._element, O), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
            }, e._getConfig = function(t) {
                return t = o({}, $, t), Ci.typeCheckConfig(F, t, L), t
            }, e._addEventListeners = function() {
                var t = this;
                this._config.keyboard && M(this._element).on(Y.KEYDOWN, function(e) {
                    return t._keydown(e)
                }), "hover" === this._config.pause && (M(this._element).on(Y.MOUSEENTER, function(e) {
                    return t.pause(e)
                }).on(Y.MOUSELEAVE, function(e) {
                    return t.cycle(e)
                }), "ontouchstart" in document.documentElement && M(this._element).on(Y.TOUCHEND, function() {
                    t.pause(), t.touchTimeout && clearTimeout(t.touchTimeout), t.touchTimeout = setTimeout(function(e) {
                        return t.cycle(e)
                    }, 500 + t._config.interval)
                }))
            }, e._keydown = function(t) {
                if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {
                    case 37:
                        t.preventDefault(), this.prev();
                        break;
                    case 39:
                        t.preventDefault(), this.next()
                }
            }, e._getItemIndex = function(t) {
                return this._items = M.makeArray(M(t).parent().find(Z.ITEM)), this._items.indexOf(t)
            }, e._getItemByDirection = function(t, e) {
                var i = t === W,
                    s = t === R,
                    n = this._getItemIndex(e),
                    o = this._items.length - 1;
                if ((s && 0 === n || i && n === o) && !this._config.wrap) return e;
                var r = (n + (t === R ? -1 : 1)) % this._items.length;
                return -1 === r ? this._items[this._items.length - 1] : this._items[r]
            }, e._triggerSlideEvent = function(t, e) {
                var i = this._getItemIndex(t),
                    s = this._getItemIndex(M(this._element).find(Z.ACTIVE_ITEM)[0]),
                    n = M.Event(Y.SLIDE, {
                        relatedTarget: t,
                        direction: e,
                        from: s,
                        to: i
                    });
                return M(this._element).trigger(n), n
            }, e._setActiveIndicatorElement = function(t) {
                if (this._indicatorsElement) {
                    M(this._indicatorsElement).find(Z.ACTIVE).removeClass(U);
                    var e = this._indicatorsElement.children[this._getItemIndex(t)];
                    e && M(e).addClass(U)
                }
            }, e._slide = function(t, e) {
                var i, s, n, o = this,
                    r = M(this._element).find(Z.ACTIVE_ITEM)[0],
                    a = this._getItemIndex(r),
                    l = e || r && this._getItemByDirection(t, r),
                    h = this._getItemIndex(l),
                    c = Boolean(this._interval);
                if (t === W ? (i = V, s = X, n = j) : (i = Q, s = G, n = B), l && M(l).hasClass(U)) this._isSliding = !1;
                else if (!this._triggerSlideEvent(l, n).isDefaultPrevented() && r && l) {
                    this._isSliding = !0, c && this.pause(), this._setActiveIndicatorElement(l);
                    var u = M.Event(Y.SLID, {
                        relatedTarget: l,
                        direction: n,
                        from: a,
                        to: h
                    });
                    Ci.supportsTransitionEnd() && M(this._element).hasClass(K) ? (M(l).addClass(s), Ci.reflow(l), M(r).addClass(i), M(l).addClass(i), M(r).one(Ci.TRANSITION_END, function() {
                        M(l).removeClass(i + " " + s).addClass(U), M(r).removeClass(U + " " + s + " " + i), o._isSliding = !1, setTimeout(function() {
                            return M(o._element).trigger(u)
                        }, 0)
                    }).emulateTransitionEnd(600)) : (M(r).removeClass(U), M(l).addClass(U), this._isSliding = !1, M(this._element).trigger(u)), c && this.cycle()
                }
            }, t._jQueryInterface = function(e) {
                return this.each(function() {
                    var i = M(this).data(O),
                        s = o({}, $, M(this).data());
                    "object" == typeof e && (s = o({}, s, e));
                    var n = "string" == typeof e ? e : s.slide;
                    if (i || (i = new t(this, s), M(this).data(O, i)), "number" == typeof e) i.to(e);
                    else if ("string" == typeof n) {
                        if (void 0 === i[n]) throw new TypeError('No method named "' + n + '"');
                        i[n]()
                    } else s.interval && (i.pause(), i.cycle())
                })
            }, t._dataApiClickHandler = function(e) {
                var i = Ci.getSelectorFromElement(this);
                if (i) {
                    var s = M(i)[0];
                    if (s && M(s).hasClass(q)) {
                        var n = o({}, M(s).data(), M(this).data()),
                            r = this.getAttribute("data-slide-to");
                        r && (n.interval = !1), t._jQueryInterface.call(M(s), n), r && M(s).data(O).to(r), e.preventDefault()
                    }
                }
            }, n(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.0.0"
                }
            }, {
                key: "Default",
                get: function() {
                    return $
                }
            }]), t
        }(), M(document).on(Y.CLICK_DATA_API, Z.DATA_SLIDE, J._dataApiClickHandler), M(window).on(Y.LOAD_DATA_API, function() {
            M(Z.DATA_RIDE).each(function() {
                var t = M(this);
                J._jQueryInterface.call(t, t.data())
            })
        }), M.fn[F] = J._jQueryInterface, M.fn[F].Constructor = J, M.fn[F].noConflict = function() {
            return M.fn[F] = H, J._jQueryInterface
        }, J),
        Ii = (et = "collapse", st = "." + (it = "bs.collapse"), nt = (tt = e).fn[et], ot = {
            toggle: !0,
            parent: ""
        }, rt = {
            toggle: "boolean",
            parent: "(string|element)"
        }, at = {
            SHOW: "show" + st,
            SHOWN: "shown" + st,
            HIDE: "hide" + st,
            HIDDEN: "hidden" + st,
            CLICK_DATA_API: "click" + st + ".data-api"
        }, lt = "show", ht = "collapse", ct = "collapsing", ut = "collapsed", dt = "width", pt = "height", ft = {
            ACTIVES: ".show, .collapsing",
            DATA_TOGGLE: '[data-toggle="collapse"]'
        }, gt = function() {
            function t(t, e) {
                this._isTransitioning = !1, this._element = t, this._config = this._getConfig(e), this._triggerArray = tt.makeArray(tt('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]'));
                for (var i = tt(ft.DATA_TOGGLE), s = 0; s < i.length; s++) {
                    var n = i[s],
                        o = Ci.getSelectorFromElement(n);
                    null !== o && tt(o).filter(t).length > 0 && (this._selector = o, this._triggerArray.push(n))
                }
                this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
            }
            var e = t.prototype;
            return e.toggle = function() {
                tt(this._element).hasClass(lt) ? this.hide() : this.show()
            }, e.show = function() {
                var e, i, s = this;
                if (!this._isTransitioning && !tt(this._element).hasClass(lt) && (this._parent && 0 === (e = tt.makeArray(tt(this._parent).find(ft.ACTIVES).filter('[data-parent="' + this._config.parent + '"]'))).length && (e = null), !(e && (i = tt(e).not(this._selector).data(it)) && i._isTransitioning))) {
                    var n = tt.Event(at.SHOW);
                    if (tt(this._element).trigger(n), !n.isDefaultPrevented()) {
                        e && (t._jQueryInterface.call(tt(e).not(this._selector), "hide"), i || tt(e).data(it, null));
                        var o = this._getDimension();
                        tt(this._element).removeClass(ht).addClass(ct), this._element.style[o] = 0, this._triggerArray.length > 0 && tt(this._triggerArray).removeClass(ut).attr("aria-expanded", !0), this.setTransitioning(!0);
                        var r = function() {
                            tt(s._element).removeClass(ct).addClass(ht).addClass(lt), s._element.style[o] = "", s.setTransitioning(!1), tt(s._element).trigger(at.SHOWN)
                        };
                        if (Ci.supportsTransitionEnd()) {
                            var a = "scroll" + (o[0].toUpperCase() + o.slice(1));
                            tt(this._element).one(Ci.TRANSITION_END, r).emulateTransitionEnd(600), this._element.style[o] = this._element[a] + "px"
                        } else r()
                    }
                }
            }, e.hide = function() {
                var t = this;
                if (!this._isTransitioning && tt(this._element).hasClass(lt)) {
                    var e = tt.Event(at.HIDE);
                    if (tt(this._element).trigger(e), !e.isDefaultPrevented()) {
                        var i = this._getDimension();
                        if (this._element.style[i] = this._element.getBoundingClientRect()[i] + "px", Ci.reflow(this._element), tt(this._element).addClass(ct).removeClass(ht).removeClass(lt), this._triggerArray.length > 0)
                            for (var s = 0; s < this._triggerArray.length; s++) {
                                var n = this._triggerArray[s],
                                    o = Ci.getSelectorFromElement(n);
                                if (null !== o) tt(o).hasClass(lt) || tt(n).addClass(ut).attr("aria-expanded", !1)
                            }
                        this.setTransitioning(!0);
                        var r = function() {
                            t.setTransitioning(!1), tt(t._element).removeClass(ct).addClass(ht).trigger(at.HIDDEN)
                        };
                        this._element.style[i] = "", Ci.supportsTransitionEnd() ? tt(this._element).one(Ci.TRANSITION_END, r).emulateTransitionEnd(600) : r()
                    }
                }
            }, e.setTransitioning = function(t) {
                this._isTransitioning = t
            }, e.dispose = function() {
                tt.removeData(this._element, it), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
            }, e._getConfig = function(t) {
                return (t = o({}, ot, t)).toggle = Boolean(t.toggle), Ci.typeCheckConfig(et, t, rt), t
            }, e._getDimension = function() {
                return tt(this._element).hasClass(dt) ? dt : pt
            }, e._getParent = function() {
                var e = this,
                    i = null;
                Ci.isElement(this._config.parent) ? (i = this._config.parent, void 0 !== this._config.parent.jquery && (i = this._config.parent[0])) : i = tt(this._config.parent)[0];
                var s = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';
                return tt(i).find(s).each(function(i, s) {
                    e._addAriaAndCollapsedClass(t._getTargetFromElement(s), [s])
                }), i
            }, e._addAriaAndCollapsedClass = function(t, e) {
                if (t) {
                    var i = tt(t).hasClass(lt);
                    e.length > 0 && tt(e).toggleClass(ut, !i).attr("aria-expanded", i)
                }
            }, t._getTargetFromElement = function(t) {
                var e = Ci.getSelectorFromElement(t);
                return e ? tt(e)[0] : null
            }, t._jQueryInterface = function(e) {
                return this.each(function() {
                    var i = tt(this),
                        s = i.data(it),
                        n = o({}, ot, i.data(), "object" == typeof e && e);
                    if (!s && n.toggle && /show|hide/.test(e) && (n.toggle = !1), s || (s = new t(this, n), i.data(it, s)), "string" == typeof e) {
                        if (void 0 === s[e]) throw new TypeError('No method named "' + e + '"');
                        s[e]()
                    }
                })
            }, n(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.0.0"
                }
            }, {
                key: "Default",
                get: function() {
                    return ot
                }
            }]), t
        }(), tt(document).on(at.CLICK_DATA_API, ft.DATA_TOGGLE, function(t) {
            "A" === t.currentTarget.tagName && t.preventDefault();
            var e = tt(this),
                i = Ci.getSelectorFromElement(this);
            tt(i).each(function() {
                var t = tt(this),
                    i = t.data(it) ? "toggle" : e.data();
                gt._jQueryInterface.call(t, i)
            })
        }), tt.fn[et] = gt._jQueryInterface, tt.fn[et].Constructor = gt, tt.fn[et].noConflict = function() {
            return tt.fn[et] = nt, gt._jQueryInterface
        }, gt),
        Ei = (vt = "dropdown", bt = "." + (_t = "bs.dropdown"), yt = ".data-api", wt = (mt = e).fn[vt], Ct = new RegExp("38|40|27"), xt = {
            HIDE: "hide" + bt,
            HIDDEN: "hidden" + bt,
            SHOW: "show" + bt,
            SHOWN: "shown" + bt,
            CLICK: "click" + bt,
            CLICK_DATA_API: "click" + bt + yt,
            KEYDOWN_DATA_API: "keydown" + bt + yt,
            KEYUP_DATA_API: "keyup" + bt + yt
        }, kt = "disabled", Dt = "show", It = "dropup", Et = "dropright", Tt = "dropleft", St = "dropdown-menu-right", At = "dropdown-menu-left", Pt = "position-static", Mt = '[data-toggle="dropdown"]', Ft = ".dropdown form", Ot = ".dropdown-menu", zt = ".navbar-nav", Nt = ".dropdown-menu .dropdown-item:not(.disabled)", Ht = "top-start", $t = "top-end", Lt = "bottom-start", Wt = "bottom-end", Rt = "right-start", jt = "left-start", Bt = {
            offset: 0,
            flip: !0,
            boundary: "scrollParent"
        }, Yt = {
            offset: "(number|string|function)",
            flip: "boolean",
            boundary: "(string|element)"
        }, qt = function() {
            function t(t, e) {
                this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
            }
            var e = t.prototype;
            return e.toggle = function() {
                if (!this._element.disabled && !mt(this._element).hasClass(kt)) {
                    var e = t._getParentFromElement(this._element),
                        s = mt(this._menu).hasClass(Dt);
                    if (t._clearMenus(), !s) {
                        var n = {
                                relatedTarget: this._element
                            },
                            o = mt.Event(xt.SHOW, n);
                        if (mt(e).trigger(o), !o.isDefaultPrevented()) {
                            if (!this._inNavbar) {
                                if (void 0 === i) throw new TypeError("Bootstrap dropdown require Popper.js (https://popper.js.org)");
                                var r = this._element;
                                mt(e).hasClass(It) && (mt(this._menu).hasClass(At) || mt(this._menu).hasClass(St)) && (r = e), "scrollParent" !== this._config.boundary && mt(e).addClass(Pt), this._popper = new i(r, this._menu, this._getPopperConfig())
                            }
                            "ontouchstart" in document.documentElement && 0 === mt(e).closest(zt).length && mt("body").children().on("mouseover", null, mt.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), mt(this._menu).toggleClass(Dt), mt(e).toggleClass(Dt).trigger(mt.Event(xt.SHOWN, n))
                        }
                    }
                }
            }, e.dispose = function() {
                mt.removeData(this._element, _t), mt(this._element).off(bt), this._element = null, this._menu = null, null !== this._popper && (this._popper.destroy(), this._popper = null)
            }, e.update = function() {
                this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
            }, e._addEventListeners = function() {
                var t = this;
                mt(this._element).on(xt.CLICK, function(e) {
                    e.preventDefault(), e.stopPropagation(), t.toggle()
                })
            }, e._getConfig = function(t) {
                return t = o({}, this.constructor.Default, mt(this._element).data(), t), Ci.typeCheckConfig(vt, t, this.constructor.DefaultType), t
            }, e._getMenuElement = function() {
                if (!this._menu) {
                    var e = t._getParentFromElement(this._element);
                    this._menu = mt(e).find(Ot)[0]
                }
                return this._menu
            }, e._getPlacement = function() {
                var t = mt(this._element).parent(),
                    e = Lt;
                return t.hasClass(It) ? (e = Ht, mt(this._menu).hasClass(St) && (e = $t)) : t.hasClass(Et) ? e = Rt : t.hasClass(Tt) ? e = jt : mt(this._menu).hasClass(St) && (e = Wt), e
            }, e._detectNavbar = function() {
                return mt(this._element).closest(".navbar").length > 0
            }, e._getPopperConfig = function() {
                var t = this,
                    e = {};
                return "function" == typeof this._config.offset ? e.fn = function(e) {
                    return e.offsets = o({}, e.offsets, t._config.offset(e.offsets) || {}), e
                } : e.offset = this._config.offset, {
                    placement: this._getPlacement(),
                    modifiers: {
                        offset: e,
                        flip: {
                            enabled: this._config.flip
                        },
                        preventOverflow: {
                            boundariesElement: this._config.boundary
                        }
                    }
                }
            }, t._jQueryInterface = function(e) {
                return this.each(function() {
                    var i = mt(this).data(_t);
                    if (i || (i = new t(this, "object" == typeof e ? e : null), mt(this).data(_t, i)), "string" == typeof e) {
                        if (void 0 === i[e]) throw new TypeError('No method named "' + e + '"');
                        i[e]()
                    }
                })
            }, t._clearMenus = function(e) {
                if (!e || 3 !== e.which && ("keyup" !== e.type || 9 === e.which))
                    for (var i = mt.makeArray(mt(Mt)), s = 0; s < i.length; s++) {
                        var n = t._getParentFromElement(i[s]),
                            o = mt(i[s]).data(_t),
                            r = {
                                relatedTarget: i[s]
                            };
                        if (o) {
                            var a = o._menu;
                            if (mt(n).hasClass(Dt) && !(e && ("click" === e.type && /input|textarea/i.test(e.target.tagName) || "keyup" === e.type && 9 === e.which) && mt.contains(n, e.target))) {
                                var l = mt.Event(xt.HIDE, r);
                                mt(n).trigger(l), l.isDefaultPrevented() || ("ontouchstart" in document.documentElement && mt("body").children().off("mouseover", null, mt.noop), i[s].setAttribute("aria-expanded", "false"), mt(a).removeClass(Dt), mt(n).removeClass(Dt).trigger(mt.Event(xt.HIDDEN, r)))
                            }
                        }
                    }
            }, t._getParentFromElement = function(t) {
                var e, i = Ci.getSelectorFromElement(t);
                return i && (e = mt(i)[0]), e || t.parentNode
            }, t._dataApiKeydownHandler = function(e) {
                if ((/input|textarea/i.test(e.target.tagName) ? !(32 === e.which || 27 !== e.which && (40 !== e.which && 38 !== e.which || mt(e.target).closest(Ot).length)) : Ct.test(e.which)) && (e.preventDefault(), e.stopPropagation(), !this.disabled && !mt(this).hasClass(kt))) {
                    var i = t._getParentFromElement(this),
                        s = mt(i).hasClass(Dt);
                    if ((s || 27 === e.which && 32 === e.which) && (!s || 27 !== e.which && 32 !== e.which)) {
                        var n = mt(i).find(Nt).get();
                        if (0 !== n.length) {
                            var o = n.indexOf(e.target);
                            38 === e.which && o > 0 && o--, 40 === e.which && o < n.length - 1 && o++, o < 0 && (o = 0), n[o].focus()
                        }
                    } else {
                        if (27 === e.which) {
                            var r = mt(i).find(Mt)[0];
                            mt(r).trigger("focus")
                        }
                        mt(this).trigger("click")
                    }
                }
            }, n(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.0.0"
                }
            }, {
                key: "Default",
                get: function() {
                    return Bt
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return Yt
                }
            }]), t
        }(), mt(document).on(xt.KEYDOWN_DATA_API, Mt, qt._dataApiKeydownHandler).on(xt.KEYDOWN_DATA_API, Ot, qt._dataApiKeydownHandler).on(xt.CLICK_DATA_API + " " + xt.KEYUP_DATA_API, qt._clearMenus).on(xt.CLICK_DATA_API, Mt, function(t) {
            t.preventDefault(), t.stopPropagation(), qt._jQueryInterface.call(mt(this), "toggle")
        }).on(xt.CLICK_DATA_API, Ft, function(t) {
            t.stopPropagation()
        }), mt.fn[vt] = qt._jQueryInterface, mt.fn[vt].Constructor = qt, mt.fn[vt].noConflict = function() {
            return mt.fn[vt] = wt, qt._jQueryInterface
        }, qt),
        Ti = (Kt = "modal", Vt = "." + (Qt = "bs.modal"), Xt = (Ut = e).fn[Kt], Gt = {
            backdrop: !0,
            keyboard: !0,
            focus: !0,
            show: !0
        }, Zt = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            focus: "boolean",
            show: "boolean"
        }, Jt = {
            HIDE: "hide" + Vt,
            HIDDEN: "hidden" + Vt,
            SHOW: "show" + Vt,
            SHOWN: "shown" + Vt,
            FOCUSIN: "focusin" + Vt,
            RESIZE: "resize" + Vt,
            CLICK_DISMISS: "click.dismiss" + Vt,
            KEYDOWN_DISMISS: "keydown.dismiss" + Vt,
            MOUSEUP_DISMISS: "mouseup.dismiss" + Vt,
            MOUSEDOWN_DISMISS: "mousedown.dismiss" + Vt,
            CLICK_DATA_API: "click" + Vt + ".data-api"
        }, te = "modal-scrollbar-measure", ee = "modal-backdrop", ie = "modal-open", se = "fade", ne = "show", oe = {
            DIALOG: ".modal-dialog",
            DATA_TOGGLE: '[data-toggle="modal"]',
            DATA_DISMISS: '[data-dismiss="modal"]',
            FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
            STICKY_CONTENT: ".sticky-top",
            NAVBAR_TOGGLER: ".navbar-toggler"
        }, re = function() {
            function t(t, e) {
                this._config = this._getConfig(e), this._element = t, this._dialog = Ut(t).find(oe.DIALOG)[0], this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._originalBodyPadding = 0, this._scrollbarWidth = 0
            }
            var e = t.prototype;
            return e.toggle = function(t) {
                return this._isShown ? this.hide() : this.show(t)
            }, e.show = function(t) {
                var e = this;
                if (!this._isTransitioning && !this._isShown) {
                    Ci.supportsTransitionEnd() && Ut(this._element).hasClass(se) && (this._isTransitioning = !0);
                    var i = Ut.Event(Jt.SHOW, {
                        relatedTarget: t
                    });
                    Ut(this._element).trigger(i), this._isShown || i.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), Ut(document.body).addClass(ie), this._setEscapeEvent(), this._setResizeEvent(), Ut(this._element).on(Jt.CLICK_DISMISS, oe.DATA_DISMISS, function(t) {
                        return e.hide(t)
                    }), Ut(this._dialog).on(Jt.MOUSEDOWN_DISMISS, function() {
                        Ut(e._element).one(Jt.MOUSEUP_DISMISS, function(t) {
                            Ut(t.target).is(e._element) && (e._ignoreBackdropClick = !0)
                        })
                    }), this._showBackdrop(function() {
                        return e._showElement(t)
                    }))
                }
            }, e.hide = function(t) {
                var e = this;
                if (t && t.preventDefault(), !this._isTransitioning && this._isShown) {
                    var i = Ut.Event(Jt.HIDE);
                    if (Ut(this._element).trigger(i), this._isShown && !i.isDefaultPrevented()) {
                        this._isShown = !1;
                        var s = Ci.supportsTransitionEnd() && Ut(this._element).hasClass(se);
                        s && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), Ut(document).off(Jt.FOCUSIN), Ut(this._element).removeClass(ne), Ut(this._element).off(Jt.CLICK_DISMISS), Ut(this._dialog).off(Jt.MOUSEDOWN_DISMISS), s ? Ut(this._element).one(Ci.TRANSITION_END, function(t) {
                            return e._hideModal(t)
                        }).emulateTransitionEnd(300) : this._hideModal()
                    }
                }
            }, e.dispose = function() {
                Ut.removeData(this._element, Qt), Ut(window, document, this._element, this._backdrop).off(Vt), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._scrollbarWidth = null
            }, e.handleUpdate = function() {
                this._adjustDialog()
            }, e._getConfig = function(t) {
                return t = o({}, Gt, t), Ci.typeCheckConfig(Kt, t, Zt), t
            }, e._showElement = function(t) {
                var e = this,
                    i = Ci.supportsTransitionEnd() && Ut(this._element).hasClass(se);
                this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.scrollTop = 0, i && Ci.reflow(this._element), Ut(this._element).addClass(ne), this._config.focus && this._enforceFocus();
                var s = Ut.Event(Jt.SHOWN, {
                        relatedTarget: t
                    }),
                    n = function() {
                        e._config.focus && e._element.focus(), e._isTransitioning = !1, Ut(e._element).trigger(s)
                    };
                i ? Ut(this._dialog).one(Ci.TRANSITION_END, n).emulateTransitionEnd(300) : n()
            }, e._enforceFocus = function() {
                var t = this;
                Ut(document).off(Jt.FOCUSIN).on(Jt.FOCUSIN, function(e) {
                    document !== e.target && t._element !== e.target && 0 === Ut(t._element).has(e.target).length && t._element.focus()
                })
            }, e._setEscapeEvent = function() {
                var t = this;
                this._isShown && this._config.keyboard ? Ut(this._element).on(Jt.KEYDOWN_DISMISS, function(e) {
                    27 === e.which && (e.preventDefault(), t.hide())
                }) : this._isShown || Ut(this._element).off(Jt.KEYDOWN_DISMISS)
            }, e._setResizeEvent = function() {
                var t = this;
                this._isShown ? Ut(window).on(Jt.RESIZE, function(e) {
                    return t.handleUpdate(e)
                }) : Ut(window).off(Jt.RESIZE)
            }, e._hideModal = function() {
                var t = this;
                this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._isTransitioning = !1, this._showBackdrop(function() {
                    Ut(document.body).removeClass(ie), t._resetAdjustments(), t._resetScrollbar(), Ut(t._element).trigger(Jt.HIDDEN)
                })
            }, e._removeBackdrop = function() {
                this._backdrop && (Ut(this._backdrop).remove(), this._backdrop = null)
            }, e._showBackdrop = function(t) {
                var e = this,
                    i = Ut(this._element).hasClass(se) ? se : "";
                if (this._isShown && this._config.backdrop) {
                    var s = Ci.supportsTransitionEnd() && i;
                    if (this._backdrop = document.createElement("div"), this._backdrop.className = ee, i && Ut(this._backdrop).addClass(i), Ut(this._backdrop).appendTo(document.body), Ut(this._element).on(Jt.CLICK_DISMISS, function(t) {
                            e._ignoreBackdropClick ? e._ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" === e._config.backdrop ? e._element.focus() : e.hide())
                        }), s && Ci.reflow(this._backdrop), Ut(this._backdrop).addClass(ne), !t) return;
                    if (!s) return void t();
                    Ut(this._backdrop).one(Ci.TRANSITION_END, t).emulateTransitionEnd(150)
                } else if (!this._isShown && this._backdrop) {
                    Ut(this._backdrop).removeClass(ne);
                    var n = function() {
                        e._removeBackdrop(), t && t()
                    };
                    Ci.supportsTransitionEnd() && Ut(this._element).hasClass(se) ? Ut(this._backdrop).one(Ci.TRANSITION_END, n).emulateTransitionEnd(150) : n()
                } else t && t()
            }, e._adjustDialog = function() {
                var t = this._element.scrollHeight > document.documentElement.clientHeight;
                !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
            }, e._resetAdjustments = function() {
                this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
            }, e._checkScrollbar = function() {
                var t = document.body.getBoundingClientRect();
                this._isBodyOverflowing = t.left + t.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
            }, e._setScrollbar = function() {
                var t = this;
                if (this._isBodyOverflowing) {
                    Ut(oe.FIXED_CONTENT).each(function(e, i) {
                        var s = Ut(i)[0].style.paddingRight,
                            n = Ut(i).css("padding-right");
                        Ut(i).data("padding-right", s).css("padding-right", parseFloat(n) + t._scrollbarWidth + "px")
                    }), Ut(oe.STICKY_CONTENT).each(function(e, i) {
                        var s = Ut(i)[0].style.marginRight,
                            n = Ut(i).css("margin-right");
                        Ut(i).data("margin-right", s).css("margin-right", parseFloat(n) - t._scrollbarWidth + "px")
                    }), Ut(oe.NAVBAR_TOGGLER).each(function(e, i) {
                        var s = Ut(i)[0].style.marginRight,
                            n = Ut(i).css("margin-right");
                        Ut(i).data("margin-right", s).css("margin-right", parseFloat(n) + t._scrollbarWidth + "px")
                    });
                    var e = document.body.style.paddingRight,
                        i = Ut("body").css("padding-right");
                    Ut("body").data("padding-right", e).css("padding-right", parseFloat(i) + this._scrollbarWidth + "px")
                }
            }, e._resetScrollbar = function() {
                Ut(oe.FIXED_CONTENT).each(function(t, e) {
                    var i = Ut(e).data("padding-right");
                    void 0 !== i && Ut(e).css("padding-right", i).removeData("padding-right")
                }), Ut(oe.STICKY_CONTENT + ", " + oe.NAVBAR_TOGGLER).each(function(t, e) {
                    var i = Ut(e).data("margin-right");
                    void 0 !== i && Ut(e).css("margin-right", i).removeData("margin-right")
                });
                var t = Ut("body").data("padding-right");
                void 0 !== t && Ut("body").css("padding-right", t).removeData("padding-right")
            }, e._getScrollbarWidth = function() {
                var t = document.createElement("div");
                t.className = te, document.body.appendChild(t);
                var e = t.getBoundingClientRect().width - t.clientWidth;
                return document.body.removeChild(t), e
            }, t._jQueryInterface = function(e, i) {
                return this.each(function() {
                    var s = Ut(this).data(Qt),
                        n = o({}, t.Default, Ut(this).data(), "object" == typeof e && e);
                    if (s || (s = new t(this, n), Ut(this).data(Qt, s)), "string" == typeof e) {
                        if (void 0 === s[e]) throw new TypeError('No method named "' + e + '"');
                        s[e](i)
                    } else n.show && s.show(i)
                })
            }, n(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.0.0"
                }
            }, {
                key: "Default",
                get: function() {
                    return Gt
                }
            }]), t
        }(), Ut(document).on(Jt.CLICK_DATA_API, oe.DATA_TOGGLE, function(t) {
            var e, i = this,
                s = Ci.getSelectorFromElement(this);
            s && (e = Ut(s)[0]);
            var n = Ut(e).data(Qt) ? "toggle" : o({}, Ut(e).data(), Ut(this).data());
            "A" !== this.tagName && "AREA" !== this.tagName || t.preventDefault();
            var r = Ut(e).one(Jt.SHOW, function(t) {
                t.isDefaultPrevented() || r.one(Jt.HIDDEN, function() {
                    Ut(i).is(":visible") && i.focus()
                })
            });
            re._jQueryInterface.call(Ut(e), n, this)
        }), Ut.fn[Kt] = re._jQueryInterface, Ut.fn[Kt].Constructor = re, Ut.fn[Kt].noConflict = function() {
            return Ut.fn[Kt] = Xt, re._jQueryInterface
        }, re),
        Si = (le = "tooltip", ce = "." + (he = "bs.tooltip"), ue = (ae = e).fn[le], de = "bs-tooltip", pe = new RegExp("(^|\\s)" + de + "\\S+", "g"), fe = {
            animation: "boolean",
            template: "string",
            title: "(string|element|function)",
            trigger: "string",
            delay: "(number|object)",
            html: "boolean",
            selector: "(string|boolean)",
            placement: "(string|function)",
            offset: "(number|string)",
            container: "(string|element|boolean)",
            fallbackPlacement: "(string|array)",
            boundary: "(string|element)"
        }, ge = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: "right",
            BOTTOM: "bottom",
            LEFT: "left"
        }, me = {
            animation: !0,
            template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            selector: !1,
            placement: "top",
            offset: 0,
            container: !1,
            fallbackPlacement: "flip",
            boundary: "scrollParent"
        }, ve = "show", _e = "out", be = {
            HIDE: "hide" + ce,
            HIDDEN: "hidden" + ce,
            SHOW: "show" + ce,
            SHOWN: "shown" + ce,
            INSERTED: "inserted" + ce,
            CLICK: "click" + ce,
            FOCUSIN: "focusin" + ce,
            FOCUSOUT: "focusout" + ce,
            MOUSEENTER: "mouseenter" + ce,
            MOUSELEAVE: "mouseleave" + ce
        }, ye = "fade", we = "show", Ce = ".tooltip-inner", xe = ".arrow", ke = "hover", De = "focus", Ie = "click", Ee = "manual", Te = function() {
            function t(t, e) {
                if (void 0 === i) throw new TypeError("Bootstrap tooltips require Popper.js (https://popper.js.org)");
                this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners()
            }
            var e = t.prototype;
            return e.enable = function() {
                this._isEnabled = !0
            }, e.disable = function() {
                this._isEnabled = !1
            }, e.toggleEnabled = function() {
                this._isEnabled = !this._isEnabled
            }, e.toggle = function(t) {
                if (this._isEnabled)
                    if (t) {
                        var e = this.constructor.DATA_KEY,
                            i = ae(t.currentTarget).data(e);
                        i || (i = new this.constructor(t.currentTarget, this._getDelegateConfig()), ae(t.currentTarget).data(e, i)), i._activeTrigger.click = !i._activeTrigger.click, i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i)
                    } else {
                        if (ae(this.getTipElement()).hasClass(we)) return void this._leave(null, this);
                        this._enter(null, this)
                    }
            }, e.dispose = function() {
                clearTimeout(this._timeout), ae.removeData(this.element, this.constructor.DATA_KEY), ae(this.element).off(this.constructor.EVENT_KEY), ae(this.element).closest(".modal").off("hide.bs.modal"), this.tip && ae(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, null !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
            }, e.show = function() {
                var e = this;
                if ("none" === ae(this.element).css("display")) throw new Error("Please use show on visible elements");
                var s = ae.Event(this.constructor.Event.SHOW);
                if (this.isWithContent() && this._isEnabled) {
                    ae(this.element).trigger(s);
                    var n = ae.contains(this.element.ownerDocument.documentElement, this.element);
                    if (s.isDefaultPrevented() || !n) return;
                    var o = this.getTipElement(),
                        r = Ci.getUID(this.constructor.NAME);
                    o.setAttribute("id", r), this.element.setAttribute("aria-describedby", r), this.setContent(), this.config.animation && ae(o).addClass(ye);
                    var a = "function" == typeof this.config.placement ? this.config.placement.call(this, o, this.element) : this.config.placement,
                        l = this._getAttachment(a);
                    this.addAttachmentClass(l);
                    var h = !1 === this.config.container ? document.body : ae(this.config.container);
                    ae(o).data(this.constructor.DATA_KEY, this), ae.contains(this.element.ownerDocument.documentElement, this.tip) || ae(o).appendTo(h), ae(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new i(this.element, o, {
                        placement: l,
                        modifiers: {
                            offset: {
                                offset: this.config.offset
                            },
                            flip: {
                                behavior: this.config.fallbackPlacement
                            },
                            arrow: {
                                element: xe
                            },
                            preventOverflow: {
                                boundariesElement: this.config.boundary
                            }
                        },
                        onCreate: function(t) {
                            t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t)
                        },
                        onUpdate: function(t) {
                            e._handlePopperPlacementChange(t)
                        }
                    }), ae(o).addClass(we), "ontouchstart" in document.documentElement && ae("body").children().on("mouseover", null, ae.noop);
                    var c = function() {
                        e.config.animation && e._fixTransition();
                        var t = e._hoverState;
                        e._hoverState = null, ae(e.element).trigger(e.constructor.Event.SHOWN), t === _e && e._leave(null, e)
                    };
                    Ci.supportsTransitionEnd() && ae(this.tip).hasClass(ye) ? ae(this.tip).one(Ci.TRANSITION_END, c).emulateTransitionEnd(t._TRANSITION_DURATION) : c()
                }
            }, e.hide = function(t) {
                var e = this,
                    i = this.getTipElement(),
                    s = ae.Event(this.constructor.Event.HIDE),
                    n = function() {
                        e._hoverState !== ve && i.parentNode && i.parentNode.removeChild(i), e._cleanTipClass(), e.element.removeAttribute("aria-describedby"), ae(e.element).trigger(e.constructor.Event.HIDDEN), null !== e._popper && e._popper.destroy(), t && t()
                    };
                ae(this.element).trigger(s), s.isDefaultPrevented() || (ae(i).removeClass(we), "ontouchstart" in document.documentElement && ae("body").children().off("mouseover", null, ae.noop), this._activeTrigger[Ie] = !1, this._activeTrigger[De] = !1, this._activeTrigger[ke] = !1, Ci.supportsTransitionEnd() && ae(this.tip).hasClass(ye) ? ae(i).one(Ci.TRANSITION_END, n).emulateTransitionEnd(150) : n(), this._hoverState = "")
            }, e.update = function() {
                null !== this._popper && this._popper.scheduleUpdate()
            }, e.isWithContent = function() {
                return Boolean(this.getTitle())
            }, e.addAttachmentClass = function(t) {
                ae(this.getTipElement()).addClass(de + "-" + t)
            }, e.getTipElement = function() {
                return this.tip = this.tip || ae(this.config.template)[0], this.tip
            }, e.setContent = function() {
                var t = ae(this.getTipElement());
                this.setElementContent(t.find(Ce), this.getTitle()), t.removeClass(ye + " " + we)
            }, e.setElementContent = function(t, e) {
                var i = this.config.html;
                "object" == typeof e && (e.nodeType || e.jquery) ? i ? ae(e).parent().is(t) || t.empty().append(e) : t.text(ae(e).text()) : t[i ? "html" : "text"](e)
            }, e.getTitle = function() {
                var t = this.element.getAttribute("data-original-title");
                return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), t
            }, e._getAttachment = function(t) {
                return ge[t.toUpperCase()]
            }, e._setListeners = function() {
                var t = this;
                this.config.trigger.split(" ").forEach(function(e) {
                    if ("click" === e) ae(t.element).on(t.constructor.Event.CLICK, t.config.selector, function(e) {
                        return t.toggle(e)
                    });
                    else if (e !== Ee) {
                        var i = e === ke ? t.constructor.Event.MOUSEENTER : t.constructor.Event.FOCUSIN,
                            s = e === ke ? t.constructor.Event.MOUSELEAVE : t.constructor.Event.FOCUSOUT;
                        ae(t.element).on(i, t.config.selector, function(e) {
                            return t._enter(e)
                        }).on(s, t.config.selector, function(e) {
                            return t._leave(e)
                        })
                    }
                    ae(t.element).closest(".modal").on("hide.bs.modal", function() {
                        return t.hide()
                    })
                }), this.config.selector ? this.config = o({}, this.config, {
                    trigger: "manual",
                    selector: ""
                }) : this._fixTitle()
            }, e._fixTitle = function() {
                var t = typeof this.element.getAttribute("data-original-title");
                (this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
            }, e._enter = function(t, e) {
                var i = this.constructor.DATA_KEY;
                (e = e || ae(t.currentTarget).data(i)) || (e = new this.constructor(t.currentTarget, this._getDelegateConfig()), ae(t.currentTarget).data(i, e)), t && (e._activeTrigger["focusin" === t.type ? De : ke] = !0), ae(e.getTipElement()).hasClass(we) || e._hoverState === ve ? e._hoverState = ve : (clearTimeout(e._timeout), e._hoverState = ve, e.config.delay && e.config.delay.show ? e._timeout = setTimeout(function() {
                    e._hoverState === ve && e.show()
                }, e.config.delay.show) : e.show())
            }, e._leave = function(t, e) {
                var i = this.constructor.DATA_KEY;
                (e = e || ae(t.currentTarget).data(i)) || (e = new this.constructor(t.currentTarget, this._getDelegateConfig()), ae(t.currentTarget).data(i, e)), t && (e._activeTrigger["focusout" === t.type ? De : ke] = !1), e._isWithActiveTrigger() || (clearTimeout(e._timeout), e._hoverState = _e, e.config.delay && e.config.delay.hide ? e._timeout = setTimeout(function() {
                    e._hoverState === _e && e.hide()
                }, e.config.delay.hide) : e.hide())
            }, e._isWithActiveTrigger = function() {
                for (var t in this._activeTrigger)
                    if (this._activeTrigger[t]) return !0;
                return !1
            }, e._getConfig = function(t) {
                return "number" == typeof(t = o({}, this.constructor.Default, ae(this.element).data(), t)).delay && (t.delay = {
                    show: t.delay,
                    hide: t.delay
                }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), Ci.typeCheckConfig(le, t, this.constructor.DefaultType), t
            }, e._getDelegateConfig = function() {
                var t = {};
                if (this.config)
                    for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
                return t
            }, e._cleanTipClass = function() {
                var t = ae(this.getTipElement()),
                    e = t.attr("class").match(pe);
                null !== e && e.length > 0 && t.removeClass(e.join(""))
            }, e._handlePopperPlacementChange = function(t) {
                this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement))
            }, e._fixTransition = function() {
                var t = this.getTipElement(),
                    e = this.config.animation;
                null === t.getAttribute("x-placement") && (ae(t).removeClass(ye), this.config.animation = !1, this.hide(), this.show(), this.config.animation = e)
            }, t._jQueryInterface = function(e) {
                return this.each(function() {
                    var i = ae(this).data(he),
                        s = "object" == typeof e && e;
                    if ((i || !/dispose|hide/.test(e)) && (i || (i = new t(this, s), ae(this).data(he, i)), "string" == typeof e)) {
                        if (void 0 === i[e]) throw new TypeError('No method named "' + e + '"');
                        i[e]()
                    }
                })
            }, n(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.0.0"
                }
            }, {
                key: "Default",
                get: function() {
                    return me
                }
            }, {
                key: "NAME",
                get: function() {
                    return le
                }
            }, {
                key: "DATA_KEY",
                get: function() {
                    return he
                }
            }, {
                key: "Event",
                get: function() {
                    return be
                }
            }, {
                key: "EVENT_KEY",
                get: function() {
                    return ce
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return fe
                }
            }]), t
        }(), ae.fn[le] = Te._jQueryInterface, ae.fn[le].Constructor = Te, ae.fn[le].noConflict = function() {
            return ae.fn[le] = ue, Te._jQueryInterface
        }, Te),
        Ai = (Ae = "popover", Me = "." + (Pe = "bs.popover"), Fe = (Se = e).fn[Ae], Oe = "bs-popover", ze = new RegExp("(^|\\s)" + Oe + "\\S+", "g"), Ne = o({}, Si.Default, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        }), He = o({}, Si.DefaultType, {
            content: "(string|element|function)"
        }), $e = "fade", Le = "show", We = ".popover-header", Re = ".popover-body", je = {
            HIDE: "hide" + Me,
            HIDDEN: "hidden" + Me,
            SHOW: "show" + Me,
            SHOWN: "shown" + Me,
            INSERTED: "inserted" + Me,
            CLICK: "click" + Me,
            FOCUSIN: "focusin" + Me,
            FOCUSOUT: "focusout" + Me,
            MOUSEENTER: "mouseenter" + Me,
            MOUSELEAVE: "mouseleave" + Me
        }, Be = function(t) {
            var e, i;

            function s() {
                return t.apply(this, arguments) || this
            }
            i = t, (e = s).prototype = Object.create(i.prototype), e.prototype.constructor = e, e.__proto__ = i;
            var o = s.prototype;
            return o.isWithContent = function() {
                return this.getTitle() || this._getContent()
            }, o.addAttachmentClass = function(t) {
                Se(this.getTipElement()).addClass(Oe + "-" + t)
            }, o.getTipElement = function() {
                return this.tip = this.tip || Se(this.config.template)[0], this.tip
            }, o.setContent = function() {
                var t = Se(this.getTipElement());
                this.setElementContent(t.find(We), this.getTitle());
                var e = this._getContent();
                "function" == typeof e && (e = e.call(this.element)), this.setElementContent(t.find(Re), e), t.removeClass($e + " " + Le)
            }, o._getContent = function() {
                return this.element.getAttribute("data-content") || this.config.content
            }, o._cleanTipClass = function() {
                var t = Se(this.getTipElement()),
                    e = t.attr("class").match(ze);
                null !== e && e.length > 0 && t.removeClass(e.join(""))
            }, s._jQueryInterface = function(t) {
                return this.each(function() {
                    var e = Se(this).data(Pe),
                        i = "object" == typeof t ? t : null;
                    if ((e || !/destroy|hide/.test(t)) && (e || (e = new s(this, i), Se(this).data(Pe, e)), "string" == typeof t)) {
                        if (void 0 === e[t]) throw new TypeError('No method named "' + t + '"');
                        e[t]()
                    }
                })
            }, n(s, null, [{
                key: "VERSION",
                get: function() {
                    return "4.0.0"
                }
            }, {
                key: "Default",
                get: function() {
                    return Ne
                }
            }, {
                key: "NAME",
                get: function() {
                    return Ae
                }
            }, {
                key: "DATA_KEY",
                get: function() {
                    return Pe
                }
            }, {
                key: "Event",
                get: function() {
                    return je
                }
            }, {
                key: "EVENT_KEY",
                get: function() {
                    return Me
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return He
                }
            }]), s
        }(Si), Se.fn[Ae] = Be._jQueryInterface, Se.fn[Ae].Constructor = Be, Se.fn[Ae].noConflict = function() {
            return Se.fn[Ae] = Fe, Be._jQueryInterface
        }, Be),
        Pi = (qe = "scrollspy", Ke = "." + (Ue = "bs.scrollspy"), Qe = (Ye = e).fn[qe], Ve = {
            offset: 10,
            method: "auto",
            target: ""
        }, Xe = {
            offset: "number",
            method: "string",
            target: "(string|element)"
        }, Ge = {
            ACTIVATE: "activate" + Ke,
            SCROLL: "scroll" + Ke,
            LOAD_DATA_API: "load" + Ke + ".data-api"
        }, Ze = "dropdown-item", Je = "active", ti = {
            DATA_SPY: '[data-spy="scroll"]',
            ACTIVE: ".active",
            NAV_LIST_GROUP: ".nav, .list-group",
            NAV_LINKS: ".nav-link",
            NAV_ITEMS: ".nav-item",
            LIST_ITEMS: ".list-group-item",
            DROPDOWN: ".dropdown",
            DROPDOWN_ITEMS: ".dropdown-item",
            DROPDOWN_TOGGLE: ".dropdown-toggle"
        }, ei = "offset", ii = "position", si = function() {
            function t(t, e) {
                var i = this;
                this._element = t, this._scrollElement = "BODY" === t.tagName ? window : t, this._config = this._getConfig(e), this._selector = this._config.target + " " + ti.NAV_LINKS + "," + this._config.target + " " + ti.LIST_ITEMS + "," + this._config.target + " " + ti.DROPDOWN_ITEMS, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, Ye(this._scrollElement).on(Ge.SCROLL, function(t) {
                    return i._process(t)
                }), this.refresh(), this._process()
            }
            var e = t.prototype;
            return e.refresh = function() {
                var t = this,
                    e = this._scrollElement === this._scrollElement.window ? ei : ii,
                    i = "auto" === this._config.method ? e : this._config.method,
                    s = i === ii ? this._getScrollTop() : 0;
                this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), Ye.makeArray(Ye(this._selector)).map(function(t) {
                    var e, n = Ci.getSelectorFromElement(t);
                    if (n && (e = Ye(n)[0]), e) {
                        var o = e.getBoundingClientRect();
                        if (o.width || o.height) return [Ye(e)[i]().top + s, n]
                    }
                    return null
                }).filter(function(t) {
                    return t
                }).sort(function(t, e) {
                    return t[0] - e[0]
                }).forEach(function(e) {
                    t._offsets.push(e[0]), t._targets.push(e[1])
                })
            }, e.dispose = function() {
                Ye.removeData(this._element, Ue), Ye(this._scrollElement).off(Ke), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
            }, e._getConfig = function(t) {
                if ("string" != typeof(t = o({}, Ve, t)).target) {
                    var e = Ye(t.target).attr("id");
                    e || (e = Ci.getUID(qe), Ye(t.target).attr("id", e)), t.target = "#" + e
                }
                return Ci.typeCheckConfig(qe, t, Xe), t
            }, e._getScrollTop = function() {
                return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
            }, e._getScrollHeight = function() {
                return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
            }, e._getOffsetHeight = function() {
                return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
            }, e._process = function() {
                var t = this._getScrollTop() + this._config.offset,
                    e = this._getScrollHeight(),
                    i = this._config.offset + e - this._getOffsetHeight();
                if (this._scrollHeight !== e && this.refresh(), t >= i) {
                    var s = this._targets[this._targets.length - 1];
                    this._activeTarget !== s && this._activate(s)
                } else {
                    if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();
                    for (var n = this._offsets.length; n--;) {
                        this._activeTarget !== this._targets[n] && t >= this._offsets[n] && (void 0 === this._offsets[n + 1] || t < this._offsets[n + 1]) && this._activate(this._targets[n])
                    }
                }
            }, e._activate = function(t) {
                this._activeTarget = t, this._clear();
                var e = this._selector.split(",");
                e = e.map(function(e) {
                    return e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]'
                });
                var i = Ye(e.join(","));
                i.hasClass(Ze) ? (i.closest(ti.DROPDOWN).find(ti.DROPDOWN_TOGGLE).addClass(Je), i.addClass(Je)) : (i.addClass(Je), i.parents(ti.NAV_LIST_GROUP).prev(ti.NAV_LINKS + ", " + ti.LIST_ITEMS).addClass(Je), i.parents(ti.NAV_LIST_GROUP).prev(ti.NAV_ITEMS).children(ti.NAV_LINKS).addClass(Je)), Ye(this._scrollElement).trigger(Ge.ACTIVATE, {
                    relatedTarget: t
                })
            }, e._clear = function() {
                Ye(this._selector).filter(ti.ACTIVE).removeClass(Je)
            }, t._jQueryInterface = function(e) {
                return this.each(function() {
                    var i = Ye(this).data(Ue);
                    if (i || (i = new t(this, "object" == typeof e && e), Ye(this).data(Ue, i)), "string" == typeof e) {
                        if (void 0 === i[e]) throw new TypeError('No method named "' + e + '"');
                        i[e]()
                    }
                })
            }, n(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.0.0"
                }
            }, {
                key: "Default",
                get: function() {
                    return Ve
                }
            }]), t
        }(), Ye(window).on(Ge.LOAD_DATA_API, function() {
            for (var t = Ye.makeArray(Ye(ti.DATA_SPY)), e = t.length; e--;) {
                var i = Ye(t[e]);
                si._jQueryInterface.call(i, i.data())
            }
        }), Ye.fn[qe] = si._jQueryInterface, Ye.fn[qe].Constructor = si, Ye.fn[qe].noConflict = function() {
            return Ye.fn[qe] = Qe, si._jQueryInterface
        }, si),
        Mi = (ri = "." + (oi = "bs.tab"), ai = (ni = e).fn.tab, li = {
            HIDE: "hide" + ri,
            HIDDEN: "hidden" + ri,
            SHOW: "show" + ri,
            SHOWN: "shown" + ri,
            CLICK_DATA_API: "click" + ri + ".data-api"
        }, hi = "dropdown-menu", ci = "active", ui = "disabled", di = "fade", pi = "show", fi = ".dropdown", gi = ".nav, .list-group", mi = ".active", vi = "> li > .active", _i = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', bi = ".dropdown-toggle", yi = "> .dropdown-menu .active", wi = function() {
            function t(t) {
                this._element = t
            }
            var e = t.prototype;
            return e.show = function() {
                var t = this;
                if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && ni(this._element).hasClass(ci) || ni(this._element).hasClass(ui))) {
                    var e, i, s = ni(this._element).closest(gi)[0],
                        n = Ci.getSelectorFromElement(this._element);
                    if (s) {
                        var o = "UL" === s.nodeName ? vi : mi;
                        i = (i = ni.makeArray(ni(s).find(o)))[i.length - 1]
                    }
                    var r = ni.Event(li.HIDE, {
                            relatedTarget: this._element
                        }),
                        a = ni.Event(li.SHOW, {
                            relatedTarget: i
                        });
                    if (i && ni(i).trigger(r), ni(this._element).trigger(a), !a.isDefaultPrevented() && !r.isDefaultPrevented()) {
                        n && (e = ni(n)[0]), this._activate(this._element, s);
                        var l = function() {
                            var e = ni.Event(li.HIDDEN, {
                                    relatedTarget: t._element
                                }),
                                s = ni.Event(li.SHOWN, {
                                    relatedTarget: i
                                });
                            ni(i).trigger(e), ni(t._element).trigger(s)
                        };
                        e ? this._activate(e, e.parentNode, l) : l()
                    }
                }
            }, e.dispose = function() {
                ni.removeData(this._element, oi), this._element = null
            }, e._activate = function(t, e, i) {
                var s = this,
                    n = ("UL" === e.nodeName ? ni(e).find(vi) : ni(e).children(mi))[0],
                    o = i && Ci.supportsTransitionEnd() && n && ni(n).hasClass(di),
                    r = function() {
                        return s._transitionComplete(t, n, i)
                    };
                n && o ? ni(n).one(Ci.TRANSITION_END, r).emulateTransitionEnd(150) : r()
            }, e._transitionComplete = function(t, e, i) {
                if (e) {
                    ni(e).removeClass(pi + " " + ci);
                    var s = ni(e.parentNode).find(yi)[0];
                    s && ni(s).removeClass(ci), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !1)
                }
                if (ni(t).addClass(ci), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0), Ci.reflow(t), ni(t).addClass(pi), t.parentNode && ni(t.parentNode).hasClass(hi)) {
                    var n = ni(t).closest(fi)[0];
                    n && ni(n).find(bi).addClass(ci), t.setAttribute("aria-expanded", !0)
                }
                i && i()
            }, t._jQueryInterface = function(e) {
                return this.each(function() {
                    var i = ni(this),
                        s = i.data(oi);
                    if (s || (s = new t(this), i.data(oi, s)), "string" == typeof e) {
                        if (void 0 === s[e]) throw new TypeError('No method named "' + e + '"');
                        s[e]()
                    }
                })
            }, n(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.0.0"
                }
            }]), t
        }(), ni(document).on(li.CLICK_DATA_API, _i, function(t) {
            t.preventDefault(), wi._jQueryInterface.call(ni(this), "show")
        }), ni.fn.tab = wi._jQueryInterface, ni.fn.tab.Constructor = wi, ni.fn.tab.noConflict = function() {
            return ni.fn.tab = ai, wi._jQueryInterface
        }, wi);
    ! function(t) {
        if (void 0 === t) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
        var e = t.fn.jquery.split(" ")[0].split(".");
        if (e[0] < 2 && e[1] < 9 || 1 === e[0] && 9 === e[1] && e[2] < 1 || e[0] >= 4) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
    }(e), t.Util = Ci, t.Alert = xi, t.Button = ki, t.Carousel = Di, t.Collapse = Ii, t.Dropdown = Ei, t.Modal = Ti, t.Popover = Ai, t.Scrollspy = Pi, t.Tab = Mi, t.Tooltip = Si, Object.defineProperty(t, "__esModule", {
        value: !0
    })
}),
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? t(require("jquery")) : t(window.jQuery || window.Zepto)
}(function(t) {
    var e, i, s, n, o, r, a = "Close",
        l = "BeforeClose",
        h = "MarkupParse",
        c = "Open",
        u = ".mfp",
        d = "mfp-ready",
        p = "mfp-removing",
        f = "mfp-prevent-close",
        g = function() {},
        m = !!window.jQuery,
        v = t(window),
        _ = function(t, i) {
            e.ev.on("mfp" + t + u, i)
        },
        b = function(e, i, s, n) {
            var o = document.createElement("div");
            return o.className = "mfp-" + e, s && (o.innerHTML = s), n ? i && i.appendChild(o) : (o = t(o), i && o.appendTo(i)), o
        },
        y = function(i, s) {
            e.ev.triggerHandler("mfp" + i, s), e.st.callbacks && (i = i.charAt(0).toLowerCase() + i.slice(1), e.st.callbacks[i] && e.st.callbacks[i].apply(e, t.isArray(s) ? s : [s]))
        },
        w = function(i) {
            return i === r && e.currTemplate.closeBtn || (e.currTemplate.closeBtn = t(e.st.closeMarkup.replace("%title%", e.st.tClose)), r = i), e.currTemplate.closeBtn
        },
        C = function() {
            t.magnificPopup.instance || ((e = new g).init(), t.magnificPopup.instance = e)
        };
    g.prototype = {
        constructor: g,
        init: function() {
            var i = navigator.appVersion;
            e.isIE7 = -1 !== i.indexOf("MSIE 7."), e.isIE8 = -1 !== i.indexOf("MSIE 8."), e.isLowIE = e.isIE7 || e.isIE8, e.isAndroid = /android/gi.test(i), e.isIOS = /iphone|ipad|ipod/gi.test(i), e.supportsTransition = function() {
                var t = document.createElement("p").style,
                    e = ["ms", "O", "Moz", "Webkit"];
                if (void 0 !== t.transition) return !0;
                for (; e.length;)
                    if (e.pop() + "Transition" in t) return !0;
                return !1
            }(), e.probablyMobile = e.isAndroid || e.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), s = t(document), e.popupsCache = {}
        },
        open: function(i) {
            var n;
            if (!1 === i.isObj) {
                e.items = i.items.toArray(), e.index = 0;
                var r, a = i.items;
                for (n = 0; n < a.length; n++)
                    if ((r = a[n]).parsed && (r = r.el[0]), r === i.el[0]) {
                        e.index = n;
                        break
                    }
            } else e.items = t.isArray(i.items) ? i.items : [i.items], e.index = i.index || 0;
            if (!e.isOpen) {
                e.types = [], o = "", i.mainEl && i.mainEl.length ? e.ev = i.mainEl.eq(0) : e.ev = s, i.key ? (e.popupsCache[i.key] || (e.popupsCache[i.key] = {}), e.currTemplate = e.popupsCache[i.key]) : e.currTemplate = {}, e.st = t.extend(!0, {}, t.magnificPopup.defaults, i), e.fixedContentPos = "auto" === e.st.fixedContentPos ? !e.probablyMobile : e.st.fixedContentPos, e.st.modal && (e.st.closeOnContentClick = !1, e.st.closeOnBgClick = !1, e.st.showCloseBtn = !1, e.st.enableEscapeKey = !1), e.bgOverlay || (e.bgOverlay = b("bg").on("click" + u, function() {
                    e.close()
                }), e.wrap = b("wrap").attr("tabindex", -1).on("click" + u, function(t) {
                    e._checkIfClose(t.target) && e.close()
                }), e.container = b("container", e.wrap)), e.contentContainer = b("content"), e.st.preloader && (e.preloader = b("preloader", e.container, e.st.tLoading));
                var l = t.magnificPopup.modules;
                for (n = 0; n < l.length; n++) {
                    var p = l[n];
                    p = p.charAt(0).toUpperCase() + p.slice(1), e["init" + p].call(e)
                }
                y("BeforeOpen"), e.st.showCloseBtn && (e.st.closeBtnInside ? (_(h, function(t, e, i, s) {
                    i.close_replaceWith = w(s.type)
                }), o += " mfp-close-btn-in") : e.wrap.append(w())), e.st.alignTop && (o += " mfp-align-top"), e.fixedContentPos ? e.wrap.css({
                    overflow: e.st.overflowY,
                    overflowX: "hidden",
                    overflowY: e.st.overflowY
                }) : e.wrap.css({
                    top: v.scrollTop(),
                    position: "absolute"
                }), (!1 === e.st.fixedBgPos || "auto" === e.st.fixedBgPos && !e.fixedContentPos) && e.bgOverlay.css({
                    height: s.height(),
                    position: "absolute"
                }), e.st.enableEscapeKey && s.on("keyup" + u, function(t) {
                    27 === t.keyCode && e.close()
                }), v.on("resize" + u, function() {
                    e.updateSize()
                }), e.st.closeOnContentClick || (o += " mfp-auto-cursor"), o && e.wrap.addClass(o);
                var f = e.wH = v.height(),
                    g = {};
                if (e.fixedContentPos && e._hasScrollBar(f)) {
                    var m = e._getScrollbarSize();
                    m && (g.marginRight = m)
                }
                e.fixedContentPos && (e.isIE7 ? t("body, html").css("overflow", "hidden") : g.overflow = "hidden");
                var C = e.st.mainClass;
                return e.isIE7 && (C += " mfp-ie7"), C && e._addClassToMFP(C), e.updateItemHTML(), y("BuildControls"), t("html").css(g), e.bgOverlay.add(e.wrap).prependTo(e.st.prependTo || t(document.body)), e._lastFocusedEl = document.activeElement, setTimeout(function() {
                    e.content ? (e._addClassToMFP(d), e._setFocus()) : e.bgOverlay.addClass(d), s.on("focusin" + u, e._onFocusIn)
                }, 16), e.isOpen = !0, e.updateSize(f), y(c), i
            }
            e.updateItemHTML()
        },
        close: function() {
            e.isOpen && (y(l), e.isOpen = !1, e.st.removalDelay && !e.isLowIE && e.supportsTransition ? (e._addClassToMFP(p), setTimeout(function() {
                e._close()
            }, e.st.removalDelay)) : e._close())
        },
        _close: function() {
            y(a);
            var i = p + " " + d + " ";
            if (e.bgOverlay.detach(), e.wrap.detach(), e.container.empty(), e.st.mainClass && (i += e.st.mainClass + " "), e._removeClassFromMFP(i), e.fixedContentPos) {
                var n = {
                    marginRight: ""
                };
                e.isIE7 ? t("body, html").css("overflow", "") : n.overflow = "", t("html").css(n)
            }
            s.off("keyup.mfp focusin" + u), e.ev.off(u), e.wrap.attr("class", "mfp-wrap").removeAttr("style"), e.bgOverlay.attr("class", "mfp-bg"), e.container.attr("class", "mfp-container"), !e.st.showCloseBtn || e.st.closeBtnInside && !0 !== e.currTemplate[e.currItem.type] || e.currTemplate.closeBtn && e.currTemplate.closeBtn.detach(), e._lastFocusedEl && t(e._lastFocusedEl).focus(), e.currItem = null, e.content = null, e.currTemplate = null, e.prevHeight = 0, y("AfterClose")
        },
        updateSize: function(t) {
            if (e.isIOS) {
                var i = document.documentElement.clientWidth / window.innerWidth,
                    s = window.innerHeight * i;
                e.wrap.css("height", s), e.wH = s
            } else e.wH = t || v.height();
            e.fixedContentPos || e.wrap.css("height", e.wH), y("Resize")
        },
        updateItemHTML: function() {
            var i = e.items[e.index];
            e.contentContainer.detach(), e.content && e.content.detach(), i.parsed || (i = e.parseEl(e.index));
            var s = i.type;
            if (y("BeforeChange", [e.currItem ? e.currItem.type : "", s]), e.currItem = i, !e.currTemplate[s]) {
                var o = !!e.st[s] && e.st[s].markup;
                y("FirstMarkupParse", o), e.currTemplate[s] = !o || t(o)
            }
            n && n !== i.type && e.container.removeClass("mfp-" + n + "-holder");
            var r = e["get" + s.charAt(0).toUpperCase() + s.slice(1)](i, e.currTemplate[s]);
            e.appendContent(r, s), i.preloaded = !0, y("Change", i), n = i.type, e.container.prepend(e.contentContainer), y("AfterChange")
        },
        appendContent: function(t, i) {
            e.content = t, t ? e.st.showCloseBtn && e.st.closeBtnInside && !0 === e.currTemplate[i] ? e.content.find(".mfp-close").length || e.content.append(w()) : e.content = t : e.content = "", y("BeforeAppend"), e.container.addClass("mfp-" + i + "-holder"), e.contentContainer.append(e.content)
        },
        parseEl: function(i) {
            var s, n = e.items[i];
            if (n.tagName ? n = {
                    el: t(n)
                } : (s = n.type, n = {
                    data: n,
                    src: n.src
                }), n.el) {
                for (var o = e.types, r = 0; r < o.length; r++)
                    if (n.el.hasClass("mfp-" + o[r])) {
                        s = o[r];
                        break
                    } n.src = n.el.attr("data-mfp-src"), n.src || (n.src = n.el.attr("href"))
            }
            return n.type = s || e.st.type || "inline", n.index = i, n.parsed = !0, e.items[i] = n, y("ElementParse", n), e.items[i]
        },
        addGroup: function(t, i) {
            var s = function(s) {
                s.mfpEl = this, e._openClick(s, t, i)
            };
            i || (i = {});
            var n = "click.magnificPopup";
            i.mainEl = t, i.items ? (i.isObj = !0, t.off(n).on(n, s)) : (i.isObj = !1, i.delegate ? t.off(n).on(n, i.delegate, s) : (i.items = t, t.off(n).on(n, s)))
        },
        _openClick: function(i, s, n) {
            if ((void 0 !== n.midClick ? n.midClick : t.magnificPopup.defaults.midClick) || 2 !== i.which && !i.ctrlKey && !i.metaKey) {
                var o = void 0 !== n.disableOn ? n.disableOn : t.magnificPopup.defaults.disableOn;
                if (o)
                    if (t.isFunction(o)) {
                        if (!o.call(e)) return !0
                    } else if (v.width() < o) return !0;
                i.type && (i.preventDefault(), e.isOpen && i.stopPropagation()), n.el = t(i.mfpEl), n.delegate && (n.items = s.find(n.delegate)), e.open(n)
            }
        },
        updateStatus: function(t, s) {
            if (e.preloader) {
                i !== t && e.container.removeClass("mfp-s-" + i), s || "loading" !== t || (s = e.st.tLoading);
                var n = {
                    status: t,
                    text: s
                };
                y("UpdateStatus", n), t = n.status, s = n.text, e.preloader.html(s), e.preloader.find("a").on("click", function(t) {
                    t.stopImmediatePropagation()
                }), e.container.addClass("mfp-s-" + t), i = t
            }
        },
        _checkIfClose: function(i) {
            if (!t(i).hasClass(f)) {
                var s = e.st.closeOnContentClick,
                    n = e.st.closeOnBgClick;
                if (s && n) return !0;
                if (!e.content || t(i).hasClass("mfp-close") || e.preloader && i === e.preloader[0]) return !0;
                if (i === e.content[0] || t.contains(e.content[0], i)) {
                    if (s) return !0
                } else if (n && t.contains(document, i)) return !0;
                return !1
            }
        },
        _addClassToMFP: function(t) {
            e.bgOverlay.addClass(t), e.wrap.addClass(t)
        },
        _removeClassFromMFP: function(t) {
            this.bgOverlay.removeClass(t), e.wrap.removeClass(t)
        },
        _hasScrollBar: function(t) {
            return (e.isIE7 ? s.height() : document.body.scrollHeight) > (t || v.height())
        },
        _setFocus: function() {
            (e.st.focus ? e.content.find(e.st.focus).eq(0) : e.wrap).focus()
        },
        _onFocusIn: function(i) {
            if (i.target !== e.wrap[0] && !t.contains(e.wrap[0], i.target)) return e._setFocus(), !1
        },
        _parseMarkup: function(e, i, s) {
            var n;
            s.data && (i = t.extend(s.data, i)), y(h, [e, i, s]), t.each(i, function(t, i) {
                if (void 0 === i || !1 === i) return !0;
                if ((n = t.split("_")).length > 1) {
                    var s = e.find(u + "-" + n[0]);
                    if (s.length > 0) {
                        var o = n[1];
                        "replaceWith" === o ? s[0] !== i[0] && s.replaceWith(i) : "img" === o ? s.is("img") ? s.attr("src", i) : s.replaceWith('<img src="' + i + '" class="' + s.attr("class") + '" />') : s.attr(n[1], i)
                    }
                } else e.find(u + "-" + t).html(i)
            })
        },
        _getScrollbarSize: function() {
            if (void 0 === e.scrollbarSize) {
                var t = document.createElement("div");
                t.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(t), e.scrollbarSize = t.offsetWidth - t.clientWidth, document.body.removeChild(t)
            }
            return e.scrollbarSize
        }
    }, t.magnificPopup = {
        instance: null,
        proto: g.prototype,
        modules: [],
        open: function(e, i) {
            return C(), (e = e ? t.extend(!0, {}, e) : {}).isObj = !0, e.index = i || 0, this.instance.open(e)
        },
        close: function() {
            return t.magnificPopup.instance && t.magnificPopup.instance.close()
        },
        registerModule: function(e, i) {
            i.options && (t.magnificPopup.defaults[e] = i.options), t.extend(this.proto, i.proto), this.modules.push(e)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading..."
        }
    }, t.fn.magnificPopup = function(i) {
        C();
        var s = t(this);
        if ("string" == typeof i)
            if ("open" === i) {
                var n, o = m ? s.data("magnificPopup") : s[0].magnificPopup,
                    r = parseInt(arguments[1], 10) || 0;
                o.items ? n = o.items[r] : (n = s, o.delegate && (n = n.find(o.delegate)), n = n.eq(r)), e._openClick({
                    mfpEl: n
                }, s, o)
            } else e.isOpen && e[i].apply(e, Array.prototype.slice.call(arguments, 1));
        else i = t.extend(!0, {}, i), m ? s.data("magnificPopup", i) : s[0].magnificPopup = i, e.addGroup(s, i);
        return s
    };
    var x, k, D, I = "inline",
        E = function() {
            D && (k.after(D.addClass(x)).detach(), D = null)
        };
    t.magnificPopup.registerModule(I, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                e.types.push(I), _(a + "." + I, function() {
                    E()
                })
            },
            getInline: function(i, s) {
                if (E(), i.src) {
                    var n = e.st.inline,
                        o = t(i.src);
                    if (o.length) {
                        var r = o[0].parentNode;
                        r && r.tagName && (k || (x = n.hiddenClass, k = b(x), x = "mfp-" + x), D = o.after(k).detach().removeClass(x)), e.updateStatus("ready")
                    } else e.updateStatus("error", n.tNotFound), o = t("<div>");
                    return i.inlineElement = o, o
                }
                return e.updateStatus("ready"), e._parseMarkup(s, {}, i), s
            }
        }
    });
    var T, S = "ajax",
        A = function() {
            T && t(document.body).removeClass(T)
        },
        P = function() {
            A(), e.req && e.req.abort()
        };
    t.magnificPopup.registerModule(S, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                e.types.push(S), T = e.st.ajax.cursor, _(a + "." + S, P), _("BeforeChange." + S, P)
            },
            getAjax: function(i) {
                T && t(document.body).addClass(T), e.updateStatus("loading");
                var s = t.extend({
                    url: i.src,
                    success: function(s, n, o) {
                        var r = {
                            data: s,
                            xhr: o
                        };
                        y("ParseAjax", r), e.appendContent(t(r.data), S), i.finished = !0, A(), e._setFocus(), setTimeout(function() {
                            e.wrap.addClass(d)
                        }, 16), e.updateStatus("ready"), y("AjaxContentAdded")
                    },
                    error: function() {
                        A(), i.finished = i.loadError = !0, e.updateStatus("error", e.st.ajax.tError.replace("%url%", i.src))
                    }
                }, e.st.ajax.settings);
                return e.req = t.ajax(s), ""
            }
        }
    });
    var M;
    t.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var i = e.st.image,
                    s = ".image";
                e.types.push("image"), _(c + s, function() {
                    "image" === e.currItem.type && i.cursor && t(document.body).addClass(i.cursor)
                }), _(a + s, function() {
                    i.cursor && t(document.body).removeClass(i.cursor), v.off("resize" + u)
                }), _("Resize" + s, e.resizeImage), e.isLowIE && _("AfterChange", e.resizeImage)
            },
            resizeImage: function() {
                var t = e.currItem;
                if (t && t.img && e.st.image.verticalFit) {
                    var i = 0;
                    e.isLowIE && (i = parseInt(t.img.css("padding-top"), 10) + parseInt(t.img.css("padding-bottom"), 10)), t.img.css("max-height", e.wH - i)
                }
            },
            _onImageHasSize: function(t) {
                t.img && (t.hasSize = !0, M && clearInterval(M), t.isCheckingImgSize = !1, y("ImageHasSize", t), t.imgHidden && (e.content && e.content.removeClass("mfp-loading"), t.imgHidden = !1))
            },
            findImageSize: function(t) {
                var i = 0,
                    s = t.img[0],
                    n = function(o) {
                        M && clearInterval(M), M = setInterval(function() {
                            s.naturalWidth > 0 ? e._onImageHasSize(t) : (i > 200 && clearInterval(M), 3 === ++i ? n(10) : 40 === i ? n(50) : 100 === i && n(500))
                        }, o)
                    };
                n(1)
            },
            getImage: function(i, s) {
                var n = 0,
                    o = function() {
                        i && (i.img[0].complete ? (i.img.off(".mfploader"), i === e.currItem && (e._onImageHasSize(i), e.updateStatus("ready")), i.hasSize = !0, i.loaded = !0, y("ImageLoadComplete")) : ++n < 200 ? setTimeout(o, 100) : r())
                    },
                    r = function() {
                        i && (i.img.off(".mfploader"), i === e.currItem && (e._onImageHasSize(i), e.updateStatus("error", a.tError.replace("%url%", i.src))), i.hasSize = !0, i.loaded = !0, i.loadError = !0)
                    },
                    a = e.st.image,
                    l = s.find(".mfp-img");
                if (l.length) {
                    var h = document.createElement("img");
                    h.className = "mfp-img", i.el && i.el.find("img").length && (h.alt = i.el.find("img").attr("alt")), i.img = t(h).on("load.mfploader", o).on("error.mfploader", r), h.src = i.src, l.is("img") && (i.img = i.img.clone()), (h = i.img[0]).naturalWidth > 0 ? i.hasSize = !0 : h.width || (i.hasSize = !1)
                }
                return e._parseMarkup(s, {
                    title: function(i) {
                        if (i.data && void 0 !== i.data.title) return i.data.title;
                        var s = e.st.image.titleSrc;
                        if (s) {
                            if (t.isFunction(s)) return s.call(e, i);
                            if (i.el) return i.el.attr(s) || ""
                        }
                        return ""
                    }(i),
                    img_replaceWith: i.img
                }, i), e.resizeImage(), i.hasSize ? (M && clearInterval(M), i.loadError ? (s.addClass("mfp-loading"), e.updateStatus("error", a.tError.replace("%url%", i.src))) : (s.removeClass("mfp-loading"), e.updateStatus("ready")), s) : (e.updateStatus("loading"), i.loading = !0, i.hasSize || (i.imgHidden = !0, s.addClass("mfp-loading"), e.findImageSize(i)), s)
            }
        }
    });
    var F;
    t.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(t) {
                return t.is("img") ? t : t.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var t, i = e.st.zoom,
                    s = ".zoom";
                if (i.enabled && e.supportsTransition) {
                    var n, o, r = i.duration,
                        h = function(t) {
                            var e = t.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                s = "all " + i.duration / 1e3 + "s " + i.easing,
                                n = {
                                    position: "fixed",
                                    zIndex: 9999,
                                    left: 0,
                                    top: 0,
                                    "-webkit-backface-visibility": "hidden"
                                },
                                o = "transition";
                            return n["-webkit-" + o] = n["-moz-" + o] = n["-o-" + o] = n[o] = s, e.css(n), e
                        },
                        c = function() {
                            e.content.css("visibility", "visible")
                        };
                    _("BuildControls" + s, function() {
                        if (e._allowZoom()) {
                            if (clearTimeout(n), e.content.css("visibility", "hidden"), !(t = e._getItemToZoom())) return void c();
                            (o = h(t)).css(e._getOffset()), e.wrap.append(o), n = setTimeout(function() {
                                o.css(e._getOffset(!0)), n = setTimeout(function() {
                                    c(), setTimeout(function() {
                                        o.remove(), t = o = null, y("ZoomAnimationEnded")
                                    }, 16)
                                }, r)
                            }, 16)
                        }
                    }), _(l + s, function() {
                        if (e._allowZoom()) {
                            if (clearTimeout(n), e.st.removalDelay = r, !t) {
                                if (!(t = e._getItemToZoom())) return;
                                o = h(t)
                            }
                            o.css(e._getOffset(!0)), e.wrap.append(o), e.content.css("visibility", "hidden"), setTimeout(function() {
                                o.css(e._getOffset())
                            }, 16)
                        }
                    }), _(a + s, function() {
                        e._allowZoom() && (c(), o && o.remove(), t = null)
                    })
                }
            },
            _allowZoom: function() {
                return "image" === e.currItem.type
            },
            _getItemToZoom: function() {
                return !!e.currItem.hasSize && e.currItem.img
            },
            _getOffset: function(i) {
                var s, n = (s = i ? e.currItem.img : e.st.zoom.opener(e.currItem.el || e.currItem)).offset(),
                    o = parseInt(s.css("padding-top"), 10),
                    r = parseInt(s.css("padding-bottom"), 10);
                n.top -= t(window).scrollTop() - o;
                var a = {
                    width: s.width(),
                    height: (m ? s.innerHeight() : s[0].offsetHeight) - r - o
                };
                return void 0 === F && (F = void 0 !== document.createElement("p").style.MozTransform), F ? a["-moz-transform"] = a.transform = "translate(" + n.left + "px," + n.top + "px)" : (a.left = n.left, a.top = n.top), a
            }
        }
    });
    var O = "iframe",
        z = function(t) {
            if (e.currTemplate[O]) {
                var i = e.currTemplate[O].find("iframe");
                i.length && (t || (i[0].src = "//about:blank"), e.isIE8 && i.css("display", t ? "block" : "none"))
            }
        };
    t.magnificPopup.registerModule(O, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                e.types.push(O), _("BeforeChange", function(t, e, i) {
                    e !== i && (e === O ? z() : i === O && z(!0))
                }), _(a + "." + O, function() {
                    z()
                })
            },
            getIframe: function(i, s) {
                var n = i.src,
                    o = e.st.iframe;
                t.each(o.patterns, function() {
                    if (n.indexOf(this.index) > -1) return this.id && (n = "string" == typeof this.id ? n.substr(n.lastIndexOf(this.id) + this.id.length, n.length) : this.id.call(this, n)), n = this.src.replace("%id%", n), !1
                });
                var r = {};
                return o.srcAction && (r[o.srcAction] = n), e._parseMarkup(s, r, i), e.updateStatus("ready"), s
            }
        }
    });
    var N = function(t) {
            var i = e.items.length;
            return t > i - 1 ? t - i : t < 0 ? i + t : t
        },
        H = function(t, e, i) {
            return t.replace(/%curr%/gi, e + 1).replace(/%total%/gi, i)
        };
    t.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var i = e.st.gallery,
                    n = ".mfp-gallery",
                    r = Boolean(t.fn.mfpFastClick);
                if (e.direction = !0, !i || !i.enabled) return !1;
                o += " mfp-gallery", _(c + n, function() {
                    i.navigateByImgClick && e.wrap.on("click" + n, ".mfp-img", function() {
                        if (e.items.length > 1) return e.next(), !1
                    }), s.on("keydown" + n, function(t) {
                        37 === t.keyCode ? e.prev() : 39 === t.keyCode && e.next()
                    })
                }), _("UpdateStatus" + n, function(t, i) {
                    i.text && (i.text = H(i.text, e.currItem.index, e.items.length))
                }), _(h + n, function(t, s, n, o) {
                    var r = e.items.length;
                    n.counter = r > 1 ? H(i.tCounter, o.index, r) : ""
                }), _("BuildControls" + n, function() {
                    if (e.items.length > 1 && i.arrows && !e.arrowLeft) {
                        var s = i.arrowMarkup,
                            n = e.arrowLeft = t(s.replace(/%title%/gi, i.tPrev).replace(/%dir%/gi, "left")).addClass(f),
                            o = e.arrowRight = t(s.replace(/%title%/gi, i.tNext).replace(/%dir%/gi, "right")).addClass(f),
                            a = r ? "mfpFastClick" : "click";
                        n[a](function() {
                            e.prev()
                        }), o[a](function() {
                            e.next()
                        }), e.isIE7 && (b("b", n[0], !1, !0), b("a", n[0], !1, !0), b("b", o[0], !1, !0), b("a", o[0], !1, !0)), e.container.append(n.add(o))
                    }
                }), _("Change" + n, function() {
                    e._preloadTimeout && clearTimeout(e._preloadTimeout), e._preloadTimeout = setTimeout(function() {
                        e.preloadNearbyImages(), e._preloadTimeout = null
                    }, 16)
                }), _(a + n, function() {
                    s.off(n), e.wrap.off("click" + n), e.arrowLeft && r && e.arrowLeft.add(e.arrowRight).destroyMfpFastClick(), e.arrowRight = e.arrowLeft = null
                })
            },
            next: function() {
                e.direction = !0, e.index = N(e.index + 1), e.updateItemHTML()
            },
            prev: function() {
                e.direction = !1, e.index = N(e.index - 1), e.updateItemHTML()
            },
            goTo: function(t) {
                e.direction = t >= e.index, e.index = t, e.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var t, i = e.st.gallery.preload,
                    s = Math.min(i[0], e.items.length),
                    n = Math.min(i[1], e.items.length);
                for (t = 1; t <= (e.direction ? n : s); t++) e._preloadItem(e.index + t);
                for (t = 1; t <= (e.direction ? s : n); t++) e._preloadItem(e.index - t)
            },
            _preloadItem: function(i) {
                if (i = N(i), !e.items[i].preloaded) {
                    var s = e.items[i];
                    s.parsed || (s = e.parseEl(i)), y("LazyLoad", s), "image" === s.type && (s.img = t('<img class="mfp-img" />').on("load.mfploader", function() {
                        s.hasSize = !0
                    }).on("error.mfploader", function() {
                        s.hasSize = !0, s.loadError = !0, y("LazyLoadError", s)
                    }).attr("src", s.src)), s.preloaded = !0
                }
            }
        }
    });
    var $, L, W, R = "retina";
    t.magnificPopup.registerModule(R, {
        options: {
            replaceSrc: function(t) {
                return t.src.replace(/\.\w+$/, function(t) {
                    return "@2x" + t
                })
            },
            ratio: 1
        },
        proto: {
            initRetina: function() {
                if (window.devicePixelRatio > 1) {
                    var t = e.st.retina,
                        i = t.ratio;
                    (i = isNaN(i) ? i() : i) > 1 && (_("ImageHasSize." + R, function(t, e) {
                        e.img.css({
                            "max-width": e.img[0].naturalWidth / i,
                            width: "100%"
                        })
                    }), _("ElementParse." + R, function(e, s) {
                        s.src = t.replaceSrc(s, i)
                    }))
                }
            }
        }
    }), $ = "ontouchstart" in window, L = function() {
        v.off("touchmove" + W + " touchend" + W)
    }, W = ".mfpFastClick", t.fn.mfpFastClick = function(e) {
        return t(this).each(function() {
            var i, s, n, o, r, a, l, h = t(this);
            $ && h.on("touchstart" + W, function(t) {
                r = !1, l = 1, a = t.originalEvent ? t.originalEvent.touches[0] : t.touches[0], n = a.clientX, o = a.clientY, v.on("touchmove" + W, function(t) {
                    a = t.originalEvent ? t.originalEvent.touches : t.touches, l = a.length, a = a[0], (Math.abs(a.clientX - n) > 10 || Math.abs(a.clientY - o) > 10) && (r = !0, L())
                }).on("touchend" + W, function(t) {
                    L(), r || l > 1 || (i = !0, t.preventDefault(), clearTimeout(s), s = setTimeout(function() {
                        i = !1
                    }, 1e3), e())
                })
            }), h.on("click" + W, function() {
                i || e()
            })
        })
    }, t.fn.destroyMfpFastClick = function() {
        t(this).off("touchstart" + W + " click" + W), $ && v.off("touchmove" + W + " touchend" + W)
    }, C()
}),
function(t, e, i, s) {
    function n(e, i) {
        this.settings = null, this.options = t.extend({}, n.Defaults, i), this.$element = t(e), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = {
            time: null,
            target: null,
            pointer: null,
            stage: {
                start: null,
                current: null
            },
            direction: null
        }, this._states = {
            current: {},
            tags: {
                initializing: ["busy"],
                animating: ["busy"],
                dragging: ["interacting"]
            }
        }, t.each(["onResize", "onThrottledResize"], t.proxy(function(e, i) {
            this._handlers[i] = t.proxy(this[i], this)
        }, this)), t.each(n.Plugins, t.proxy(function(t, e) {
            this._plugins[t.charAt(0).toLowerCase() + t.slice(1)] = new e(this)
        }, this)), t.each(n.Workers, t.proxy(function(e, i) {
            this._pipe.push({
                filter: i.filter,
                run: t.proxy(i.run, this)
            })
        }, this)), this.setup(), this.initialize()
    }
    n.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        rewind: !1,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: e,
        fallbackEasing: "swing",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        refreshClass: "owl-refresh",
        loadedClass: "owl-loaded",
        loadingClass: "owl-loading",
        rtlClass: "owl-rtl",
        responsiveClass: "owl-responsive",
        dragClass: "owl-drag",
        itemClass: "owl-item",
        stageClass: "owl-stage",
        stageOuterClass: "owl-stage-outer",
        grabClass: "owl-grab"
    }, n.Width = {
        Default: "default",
        Inner: "inner",
        Outer: "outer"
    }, n.Type = {
        Event: "event",
        State: "state"
    }, n.Plugins = {}, n.Workers = [{
        filter: ["width", "settings"],
        run: function() {
            this._width = this.$element.width()
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(t) {
            t.current = this._items && this._items[this.relative(this._current)]
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            this.$stage.children(".cloned").remove()
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(t) {
            var e = this.settings.margin || "",
                i = !this.settings.autoWidth,
                s = this.settings.rtl,
                n = {
                    width: "auto",
                    "margin-left": s ? e : "",
                    "margin-right": s ? "" : e
                };
            !i && this.$stage.children().css(n), t.css = n
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(t) {
            var e = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
                i = null,
                s = this._items.length,
                n = !this.settings.autoWidth,
                o = [];
            for (t.items = {
                    merge: !1,
                    width: e
                }; s--;) i = this._mergers[s], i = this.settings.mergeFit && Math.min(i, this.settings.items) || i, t.items.merge = i > 1 || t.items.merge, o[s] = n ? e * i : this._items[s].width();
            this._widths = o
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            var e = [],
                i = this._items,
                s = this.settings,
                n = Math.max(2 * s.items, 4),
                o = 2 * Math.ceil(i.length / 2),
                r = s.loop && i.length ? s.rewind ? n : Math.max(n, o) : 0,
                a = "",
                l = "";
            for (r /= 2; r--;) e.push(this.normalize(e.length / 2, !0)), a += i[e[e.length - 1]][0].outerHTML, e.push(this.normalize(i.length - 1 - (e.length - 1) / 2, !0)), l = i[e[e.length - 1]][0].outerHTML + l;
            this._clones = e, t(a).addClass("cloned").appendTo(this.$stage), t(l).addClass("cloned").prependTo(this.$stage)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            for (var t = this.settings.rtl ? 1 : -1, e = this._clones.length + this._items.length, i = -1, s = 0, n = 0, o = []; ++i < e;) s = o[i - 1] || 0, n = this._widths[this.relative(i)] + this.settings.margin, o.push(s + n * t);
            this._coordinates = o
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            var t = this.settings.stagePadding,
                e = this._coordinates,
                i = {
                    width: Math.ceil(Math.abs(e[e.length - 1])) + 2 * t,
                    "padding-left": t || "",
                    "padding-right": t || ""
                };
            this.$stage.css(i)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(t) {
            var e = this._coordinates.length,
                i = !this.settings.autoWidth,
                s = this.$stage.children();
            if (i && t.items.merge)
                for (; e--;) t.css.width = this._widths[this.relative(e)], s.eq(e).css(t.css);
            else i && (t.css.width = t.items.width, s.css(t.css))
        }
    }, {
        filter: ["items"],
        run: function() {
            this._coordinates.length < 1 && this.$stage.removeAttr("style")
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(t) {
            t.current = t.current ? this.$stage.children().index(t.current) : 0, t.current = Math.max(this.minimum(), Math.min(this.maximum(), t.current)), this.reset(t.current)
        }
    }, {
        filter: ["position"],
        run: function() {
            this.animate(this.coordinates(this._current))
        }
    }, {
        filter: ["width", "position", "items", "settings"],
        run: function() {
            var t, e, i, s, n = this.settings.rtl ? 1 : -1,
                o = 2 * this.settings.stagePadding,
                r = this.coordinates(this.current()) + o,
                a = r + this.width() * n,
                l = [];
            for (i = 0, s = this._coordinates.length; i < s; i++) t = this._coordinates[i - 1] || 0, e = Math.abs(this._coordinates[i]) + o * n, (this.op(t, "<=", r) && this.op(t, ">", a) || this.op(e, "<", r) && this.op(e, ">", a)) && l.push(i);
            this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + l.join("), :eq(") + ")").addClass("active"), this.settings.center && (this.$stage.children(".center").removeClass("center"), this.$stage.children().eq(this.current()).addClass("center"))
        }
    }], n.prototype.initialize = function() {
        var e, i, n;
        (this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) && (e = this.$element.find("img"), i = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : s, n = this.$element.children(i).width(), e.length && n <= 0 && this.preloadAutoWidthImages(e));
        this.$element.addClass(this.options.loadingClass), this.$stage = t("<" + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>').wrap('<div class="' + this.settings.stageOuterClass + '"/>'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this.$element.is(":visible") ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized")
    }, n.prototype.setup = function() {
        var e = this.viewport(),
            i = this.options.responsive,
            s = -1,
            n = null;
        i ? (t.each(i, function(t) {
            t <= e && t > s && (s = Number(t))
        }), "function" == typeof(n = t.extend({}, this.options, i[s])).stagePadding && (n.stagePadding = n.stagePadding()), delete n.responsive, n.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + s))) : n = t.extend({}, this.options), this.trigger("change", {
            property: {
                name: "settings",
                value: n
            }
        }), this._breakpoint = s, this.settings = n, this.invalidate("settings"), this.trigger("changed", {
            property: {
                name: "settings",
                value: this.settings
            }
        })
    }, n.prototype.optionsLogic = function() {
        this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
    }, n.prototype.prepare = function(e) {
        var i = this.trigger("prepare", {
            content: e
        });
        return i.data || (i.data = t("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(e)), this.trigger("prepared", {
            content: i.data
        }), i.data
    }, n.prototype.update = function() {
        for (var e = 0, i = this._pipe.length, s = t.proxy(function(t) {
                return this[t]
            }, this._invalidated), n = {}; e < i;)(this._invalidated.all || t.grep(this._pipe[e].filter, s).length > 0) && this._pipe[e].run(n), e++;
        this._invalidated = {}, !this.is("valid") && this.enter("valid")
    }, n.prototype.width = function(t) {
        switch (t = t || n.Width.Default) {
            case n.Width.Inner:
            case n.Width.Outer:
                return this._width;
            default:
                return this._width - 2 * this.settings.stagePadding + this.settings.margin
        }
    }, n.prototype.refresh = function() {
        this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed")
    }, n.prototype.onThrottledResize = function() {
        e.clearTimeout(this.resizeTimer), this.resizeTimer = e.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
    }, n.prototype.onResize = function() {
        return !!this._items.length && (this._width !== this.$element.width() && (!!this.$element.is(":visible") && (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))))
    }, n.prototype.registerEventHandlers = function() {
        t.support.transition && this.$stage.on(t.support.transition.end + ".owl.core", t.proxy(this.onTransitionEnd, this)), !1 !== this.settings.responsive && this.on(e, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", t.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function() {
            return !1
        })), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", t.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", t.proxy(this.onDragEnd, this)))
    }, n.prototype.onDragStart = function(e) {
        var s = null;
        3 !== e.which && (t.support.transform ? s = {
            x: (s = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","))[16 === s.length ? 12 : 4],
            y: s[16 === s.length ? 13 : 5]
        } : (s = this.$stage.position(), s = {
            x: this.settings.rtl ? s.left + this.$stage.width() - this.width() + this.settings.margin : s.left,
            y: s.top
        }), this.is("animating") && (t.support.transform ? this.animate(s.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === e.type), this.speed(0), this._drag.time = (new Date).getTime(), this._drag.target = t(e.target), this._drag.stage.start = s, this._drag.stage.current = s, this._drag.pointer = this.pointer(e), t(i).on("mouseup.owl.core touchend.owl.core", t.proxy(this.onDragEnd, this)), t(i).one("mousemove.owl.core touchmove.owl.core", t.proxy(function(e) {
            var s = this.difference(this._drag.pointer, this.pointer(e));
            t(i).on("mousemove.owl.core touchmove.owl.core", t.proxy(this.onDragMove, this)), Math.abs(s.x) < Math.abs(s.y) && this.is("valid") || (e.preventDefault(), this.enter("dragging"), this.trigger("drag"))
        }, this)))
    }, n.prototype.onDragMove = function(t) {
        var e = null,
            i = null,
            s = null,
            n = this.difference(this._drag.pointer, this.pointer(t)),
            o = this.difference(this._drag.stage.start, n);
        this.is("dragging") && (t.preventDefault(), this.settings.loop ? (e = this.coordinates(this.minimum()), i = this.coordinates(this.maximum() + 1) - e, o.x = ((o.x - e) % i + i) % i + e) : (e = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()), i = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()), s = this.settings.pullDrag ? -1 * n.x / 5 : 0, o.x = Math.max(Math.min(o.x, e + s), i + s)), this._drag.stage.current = o, this.animate(o.x))
    }, n.prototype.onDragEnd = function(e) {
        var s = this.difference(this._drag.pointer, this.pointer(e)),
            n = this._drag.stage.current,
            o = s.x > 0 ^ this.settings.rtl ? "left" : "right";
        t(i).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== s.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(n.x, 0 !== s.x ? o : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = o, (Math.abs(s.x) > 3 || (new Date).getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function() {
            return !1
        })), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"))
    }, n.prototype.closest = function(e, i) {
        var s = -1,
            n = this.width(),
            o = this.coordinates();
        return this.settings.freeDrag || t.each(o, t.proxy(function(t, r) {
            return "left" === i && e > r - 30 && e < r + 30 ? s = t : "right" === i && e > r - n - 30 && e < r - n + 30 ? s = t + 1 : this.op(e, "<", r) && this.op(e, ">", o[t + 1] || r - n) && (s = "left" === i ? t + 1 : t), -1 === s
        }, this)), this.settings.loop || (this.op(e, ">", o[this.minimum()]) ? s = e = this.minimum() : this.op(e, "<", o[this.maximum()]) && (s = e = this.maximum())), s
    }, n.prototype.animate = function(e) {
        var i = this.speed() > 0;
        this.is("animating") && this.onTransitionEnd(), i && (this.enter("animating"), this.trigger("translate")), t.support.transform3d && t.support.transition ? this.$stage.css({
            transform: "translate3d(" + e + "px,0px,0px)",
            transition: this.speed() / 1e3 + "s"
        }) : i ? this.$stage.animate({
            left: e + "px"
        }, this.speed(), this.settings.fallbackEasing, t.proxy(this.onTransitionEnd, this)) : this.$stage.css({
            left: e + "px"
        })
    }, n.prototype.is = function(t) {
        return this._states.current[t] && this._states.current[t] > 0
    }, n.prototype.current = function(t) {
        if (t === s) return this._current;
        if (0 === this._items.length) return s;
        if (t = this.normalize(t), this._current !== t) {
            var e = this.trigger("change", {
                property: {
                    name: "position",
                    value: t
                }
            });
            e.data !== s && (t = this.normalize(e.data)), this._current = t, this.invalidate("position"), this.trigger("changed", {
                property: {
                    name: "position",
                    value: this._current
                }
            })
        }
        return this._current
    }, n.prototype.invalidate = function(e) {
        return "string" === t.type(e) && (this._invalidated[e] = !0, this.is("valid") && this.leave("valid")), t.map(this._invalidated, function(t, e) {
            return e
        })
    }, n.prototype.reset = function(t) {
        (t = this.normalize(t)) !== s && (this._speed = 0, this._current = t, this.suppress(["translate", "translated"]), this.animate(this.coordinates(t)), this.release(["translate", "translated"]))
    }, n.prototype.normalize = function(t, e) {
        var i = this._items.length,
            n = e ? 0 : this._clones.length;
        return !this.isNumeric(t) || i < 1 ? t = s : (t < 0 || t >= i + n) && (t = ((t - n / 2) % i + i) % i + n / 2), t
    }, n.prototype.relative = function(t) {
        return t -= this._clones.length / 2, this.normalize(t, !0)
    }, n.prototype.maximum = function(t) {
        var e, i, s, n = this.settings,
            o = this._coordinates.length;
        if (n.loop) o = this._clones.length / 2 + this._items.length - 1;
        else if (n.autoWidth || n.merge) {
            for (e = this._items.length, i = this._items[--e].width(), s = this.$element.width(); e-- && !((i += this._items[e].width() + this.settings.margin) > s););
            o = e + 1
        } else o = n.center ? this._items.length - 1 : this._items.length - n.items;
        return t && (o -= this._clones.length / 2), Math.max(o, 0)
    }, n.prototype.minimum = function(t) {
        return t ? 0 : this._clones.length / 2
    }, n.prototype.items = function(t) {
        return t === s ? this._items.slice() : (t = this.normalize(t, !0), this._items[t])
    }, n.prototype.mergers = function(t) {
        return t === s ? this._mergers.slice() : (t = this.normalize(t, !0), this._mergers[t])
    }, n.prototype.clones = function(e) {
        var i = this._clones.length / 2,
            n = i + this._items.length,
            o = function(t) {
                return t % 2 == 0 ? n + t / 2 : i - (t + 1) / 2
            };
        return e === s ? t.map(this._clones, function(t, e) {
            return o(e)
        }) : t.map(this._clones, function(t, i) {
            return t === e ? o(i) : null
        })
    }, n.prototype.speed = function(t) {
        return t !== s && (this._speed = t), this._speed
    }, n.prototype.coordinates = function(e) {
        var i, n = 1,
            o = e - 1;
        return e === s ? t.map(this._coordinates, t.proxy(function(t, e) {
            return this.coordinates(e)
        }, this)) : (this.settings.center ? (this.settings.rtl && (n = -1, o = e + 1), i = this._coordinates[e], i += (this.width() - i + (this._coordinates[o] || 0)) / 2 * n) : i = this._coordinates[o] || 0, i = Math.ceil(i))
    }, n.prototype.duration = function(t, e, i) {
        return 0 === i ? 0 : Math.min(Math.max(Math.abs(e - t), 1), 6) * Math.abs(i || this.settings.smartSpeed)
    }, n.prototype.to = function(t, e) {
        var i = this.current(),
            s = null,
            n = t - this.relative(i),
            o = (n > 0) - (n < 0),
            r = this._items.length,
            a = this.minimum(),
            l = this.maximum();
        this.settings.loop ? (!this.settings.rewind && Math.abs(n) > r / 2 && (n += -1 * o * r), (s = (((t = i + n) - a) % r + r) % r + a) !== t && s - n <= l && s - n > 0 && (i = s - n, t = s, this.reset(i))) : t = this.settings.rewind ? (t % (l += 1) + l) % l : Math.max(a, Math.min(l, t)), this.speed(this.duration(i, t, e)), this.current(t), this.$element.is(":visible") && this.update()
    }, n.prototype.next = function(t) {
        t = t || !1, this.to(this.relative(this.current()) + 1, t)
    }, n.prototype.prev = function(t) {
        t = t || !1, this.to(this.relative(this.current()) - 1, t)
    }, n.prototype.onTransitionEnd = function(t) {
        if (t !== s && (t.stopPropagation(), (t.target || t.srcElement || t.originalTarget) !== this.$stage.get(0))) return !1;
        this.leave("animating"), this.trigger("translated")
    }, n.prototype.viewport = function() {
        var s;
        if (this.options.responsiveBaseElement !== e) s = t(this.options.responsiveBaseElement).width();
        else if (e.innerWidth) s = e.innerWidth;
        else {
            if (!i.documentElement || !i.documentElement.clientWidth) throw "Can not detect viewport width.";
            s = i.documentElement.clientWidth
        }
        return s
    }, n.prototype.replace = function(e) {
        this.$stage.empty(), this._items = [], e && (e = e instanceof jQuery ? e : t(e)), this.settings.nestedItemSelector && (e = e.find("." + this.settings.nestedItemSelector)), e.filter(function() {
            return 1 === this.nodeType
        }).each(t.proxy(function(t, e) {
            e = this.prepare(e), this.$stage.append(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)
        }, this)), this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
    }, n.prototype.add = function(e, i) {
        var n = this.relative(this._current);
        i = i === s ? this._items.length : this.normalize(i, !0), e = e instanceof jQuery ? e : t(e), this.trigger("add", {
            content: e,
            position: i
        }), e = this.prepare(e), 0 === this._items.length || i === this._items.length ? (0 === this._items.length && this.$stage.append(e), 0 !== this._items.length && this._items[i - 1].after(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[i].before(e), this._items.splice(i, 0, e), this._mergers.splice(i, 0, 1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)), this._items[n] && this.reset(this._items[n].index()), this.invalidate("items"), this.trigger("added", {
            content: e,
            position: i
        })
    }, n.prototype.remove = function(t) {
        (t = this.normalize(t, !0)) !== s && (this.trigger("remove", {
            content: this._items[t],
            position: t
        }), this._items[t].remove(), this._items.splice(t, 1), this._mergers.splice(t, 1), this.invalidate("items"), this.trigger("removed", {
            content: null,
            position: t
        }))
    }, n.prototype.preloadAutoWidthImages = function(e) {
        e.each(t.proxy(function(e, i) {
            this.enter("pre-loading"), i = t(i), t(new Image).one("load", t.proxy(function(t) {
                i.attr("src", t.target.src), i.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh()
            }, this)).attr("src", i.attr("src") || i.attr("data-src") || i.attr("data-src-retina"))
        }, this))
    }, n.prototype.destroy = function() {
        for (var s in this.$element.off(".owl.core"), this.$stage.off(".owl.core"), t(i).off(".owl.core"), !1 !== this.settings.responsive && (e.clearTimeout(this.resizeTimer), this.off(e, "resize", this._handlers.onThrottledResize)), this._plugins) this._plugins[s].destroy();
        this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel")
    }, n.prototype.op = function(t, e, i) {
        var s = this.settings.rtl;
        switch (e) {
            case "<":
                return s ? t > i : t < i;
            case ">":
                return s ? t < i : t > i;
            case ">=":
                return s ? t <= i : t >= i;
            case "<=":
                return s ? t >= i : t <= i
        }
    }, n.prototype.on = function(t, e, i, s) {
        t.addEventListener ? t.addEventListener(e, i, s) : t.attachEvent && t.attachEvent("on" + e, i)
    }, n.prototype.off = function(t, e, i, s) {
        t.removeEventListener ? t.removeEventListener(e, i, s) : t.detachEvent && t.detachEvent("on" + e, i)
    }, n.prototype.trigger = function(e, i, s, o, r) {
        var a = {
                item: {
                    count: this._items.length,
                    index: this.current()
                }
            },
            l = t.camelCase(t.grep(["on", e, s], function(t) {
                return t
            }).join("-").toLowerCase()),
            h = t.Event([e, "owl", s || "carousel"].join(".").toLowerCase(), t.extend({
                relatedTarget: this
            }, a, i));
        return this._supress[e] || (t.each(this._plugins, function(t, e) {
            e.onTrigger && e.onTrigger(h)
        }), this.register({
            type: n.Type.Event,
            name: e
        }), this.$element.trigger(h), this.settings && "function" == typeof this.settings[l] && this.settings[l].call(this, h)), h
    }, n.prototype.enter = function(e) {
        t.each([e].concat(this._states.tags[e] || []), t.proxy(function(t, e) {
            this._states.current[e] === s && (this._states.current[e] = 0), this._states.current[e]++
        }, this))
    }, n.prototype.leave = function(e) {
        t.each([e].concat(this._states.tags[e] || []), t.proxy(function(t, e) {
            this._states.current[e]--
        }, this))
    }, n.prototype.register = function(e) {
        if (e.type === n.Type.Event) {
            if (t.event.special[e.name] || (t.event.special[e.name] = {}), !t.event.special[e.name].owl) {
                var i = t.event.special[e.name]._default;
                t.event.special[e.name]._default = function(t) {
                    return !i || !i.apply || t.namespace && -1 !== t.namespace.indexOf("owl") ? t.namespace && t.namespace.indexOf("owl") > -1 : i.apply(this, arguments)
                }, t.event.special[e.name].owl = !0
            }
        } else e.type === n.Type.State && (this._states.tags[e.name] ? this._states.tags[e.name] = this._states.tags[e.name].concat(e.tags) : this._states.tags[e.name] = e.tags, this._states.tags[e.name] = t.grep(this._states.tags[e.name], t.proxy(function(i, s) {
            return t.inArray(i, this._states.tags[e.name]) === s
        }, this)))
    }, n.prototype.suppress = function(e) {
        t.each(e, t.proxy(function(t, e) {
            this._supress[e] = !0
        }, this))
    }, n.prototype.release = function(e) {
        t.each(e, t.proxy(function(t, e) {
            delete this._supress[e]
        }, this))
    }, n.prototype.pointer = function(t) {
        var i = {
            x: null,
            y: null
        };
        return (t = (t = t.originalEvent || t || e.event).touches && t.touches.length ? t.touches[0] : t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t).pageX ? (i.x = t.pageX, i.y = t.pageY) : (i.x = t.clientX, i.y = t.clientY), i
    }, n.prototype.isNumeric = function(t) {
        return !isNaN(parseFloat(t))
    }, n.prototype.difference = function(t, e) {
        return {
            x: t.x - e.x,
            y: t.y - e.y
        }
    }, t.fn.owlCarousel = function(e) {
        var i = Array.prototype.slice.call(arguments, 1);
        return this.each(function() {
            var s = t(this),
                o = s.data("owl.carousel");
            o || (o = new n(this, "object" == typeof e && e), s.data("owl.carousel", o), t.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function(e, i) {
                o.register({
                    type: n.Type.Event,
                    name: i
                }), o.$element.on(i + ".owl.carousel.core", t.proxy(function(t) {
                    t.namespace && t.relatedTarget !== this && (this.suppress([i]), o[i].apply(this, [].slice.call(arguments, 1)), this.release([i]))
                }, o))
            })), "string" == typeof e && "_" !== e.charAt(0) && o[e].apply(o, i)
        })
    }, t.fn.owlCarousel.Constructor = n
}(window.Zepto || window.jQuery, window, document),
function(t, e, i, s) {
    var n = function(e) {
        this._core = e, this._interval = null, this._visible = null, this._handlers = {
            "initialized.owl.carousel": t.proxy(function(t) {
                t.namespace && this._core.settings.autoRefresh && this.watch()
            }, this)
        }, this._core.options = t.extend({}, n.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    n.Defaults = {
        autoRefresh: !0,
        autoRefreshInterval: 500
    }, n.prototype.watch = function() {
        this._interval || (this._visible = this._core.$element.is(":visible"), this._interval = e.setInterval(t.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
    }, n.prototype.refresh = function() {
        this._core.$element.is(":visible") !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh())
    }, n.prototype.destroy = function() {
        var t, i;
        for (t in e.clearInterval(this._interval), this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.AutoRefresh = n
}(window.Zepto || window.jQuery, window, document),
function(t, e, i, s) {
    var n = function(e) {
        this._core = e, this._loaded = [], this._handlers = {
            "initialized.owl.carousel change.owl.carousel resized.owl.carousel": t.proxy(function(e) {
                if (e.namespace && this._core.settings && this._core.settings.lazyLoad && (e.property && "position" == e.property.name || "initialized" == e.type))
                    for (var i = this._core.settings, s = i.center && Math.ceil(i.items / 2) || i.items, n = i.center && -1 * s || 0, o = (e.property && void 0 !== e.property.value ? e.property.value : this._core.current()) + n, r = this._core.clones().length, a = t.proxy(function(t, e) {
                            this.load(e)
                        }, this); n++ < s;) this.load(r / 2 + this._core.relative(o)), r && t.each(this._core.clones(this._core.relative(o)), a), o++
            }, this)
        }, this._core.options = t.extend({}, n.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    n.Defaults = {
        lazyLoad: !1
    }, n.prototype.load = function(i) {
        var s = this._core.$stage.children().eq(i),
            n = s && s.find(".owl-lazy");
        !n || t.inArray(s.get(0), this._loaded) > -1 || (n.each(t.proxy(function(i, s) {
            var n, o = t(s),
                r = e.devicePixelRatio > 1 && o.attr("data-src-retina") || o.attr("data-src");
            this._core.trigger("load", {
                element: o,
                url: r
            }, "lazy"), o.is("img") ? o.one("load.owl.lazy", t.proxy(function() {
                o.css("opacity", 1), this._core.trigger("loaded", {
                    element: o,
                    url: r
                }, "lazy")
            }, this)).attr("src", r) : ((n = new Image).onload = t.proxy(function() {
                o.css({
                    "background-image": "url(" + r + ")",
                    opacity: "1"
                }), this._core.trigger("loaded", {
                    element: o,
                    url: r
                }, "lazy")
            }, this), n.src = r)
        }, this)), this._loaded.push(s.get(0)))
    }, n.prototype.destroy = function() {
        var t, e;
        for (t in this.handlers) this._core.$element.off(t, this.handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.Lazy = n
}(window.Zepto || window.jQuery, window, document),
function(t, e, i, s) {
    var n = function(e) {
        this._core = e, this._handlers = {
            "initialized.owl.carousel refreshed.owl.carousel": t.proxy(function(t) {
                t.namespace && this._core.settings.autoHeight && this.update()
            }, this),
            "changed.owl.carousel": t.proxy(function(t) {
                t.namespace && this._core.settings.autoHeight && "position" == t.property.name && this.update()
            }, this),
            "loaded.owl.lazy": t.proxy(function(t) {
                t.namespace && this._core.settings.autoHeight && t.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
            }, this)
        }, this._core.options = t.extend({}, n.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    n.Defaults = {
        autoHeight: !1,
        autoHeightClass: "owl-height"
    }, n.prototype.update = function() {
        var e, i = this._core._current,
            s = i + this._core.settings.items,
            n = this._core.$stage.children().toArray().slice(i, s),
            o = [];
        t.each(n, function(e, i) {
            o.push(t(i).height())
        }), e = Math.max.apply(null, o), this._core.$stage.parent().height(e).addClass(this._core.settings.autoHeightClass)
    }, n.prototype.destroy = function() {
        var t, e;
        for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.AutoHeight = n
}(window.Zepto || window.jQuery, window, document),
function(t, e, i, s) {
    var n = function(e) {
        this._core = e, this._videos = {}, this._playing = null, this._handlers = {
            "initialized.owl.carousel": t.proxy(function(t) {
                t.namespace && this._core.register({
                    type: "state",
                    name: "playing",
                    tags: ["interacting"]
                })
            }, this),
            "resize.owl.carousel": t.proxy(function(t) {
                t.namespace && this._core.settings.video && this.isInFullScreen() && t.preventDefault()
            }, this),
            "refreshed.owl.carousel": t.proxy(function(t) {
                t.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
            }, this),
            "changed.owl.carousel": t.proxy(function(t) {
                t.namespace && "position" === t.property.name && this._playing && this.stop()
            }, this),
            "prepared.owl.carousel": t.proxy(function(e) {
                if (e.namespace) {
                    var i = t(e.content).find(".owl-video");
                    i.length && (i.css("display", "none"), this.fetch(i, t(e.content)))
                }
            }, this)
        }, this._core.options = t.extend({}, n.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", t.proxy(function(t) {
            this.play(t)
        }, this))
    };
    n.Defaults = {
        video: !1,
        videoHeight: !1,
        videoWidth: !1
    }, n.prototype.fetch = function(t, e) {
        var i = t.attr("data-vimeo-id") ? "vimeo" : t.attr("data-vzaar-id") ? "vzaar" : "youtube",
            s = t.attr("data-vimeo-id") || t.attr("data-youtube-id") || t.attr("data-vzaar-id"),
            n = t.attr("data-width") || this._core.settings.videoWidth,
            o = t.attr("data-height") || this._core.settings.videoHeight,
            r = t.attr("href");
        if (!r) throw new Error("Missing video URL.");
        if ((s = r.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/))[3].indexOf("youtu") > -1) i = "youtube";
        else if (s[3].indexOf("vimeo") > -1) i = "vimeo";
        else {
            if (!(s[3].indexOf("vzaar") > -1)) throw new Error("Video URL not supported.");
            i = "vzaar"
        }
        s = s[6], this._videos[r] = {
            type: i,
            id: s,
            width: n,
            height: o
        }, e.attr("data-video", r), this.thumbnail(t, this._videos[r])
    }, n.prototype.thumbnail = function(e, i) {
        var s, n, o = i.width && i.height ? 'style="width:' + i.width + "px;height:" + i.height + 'px;"' : "",
            r = e.find("img"),
            a = "src",
            l = "",
            h = this._core.settings,
            c = function(t) {
                '<div class="owl-video-play-icon"></div>',
                s = h.lazyLoad ? '<div class="owl-video-tn ' + l + '" ' + a + '="' + t + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + t + ')"></div>',
                e.after(s),
                e.after('<div class="owl-video-play-icon"></div>')
            };
        if (e.wrap('<div class="owl-video-wrapper"' + o + "></div>"), this._core.settings.lazyLoad && (a = "data-src", l = "owl-lazy"), r.length) return c(r.attr(a)), r.remove(), !1;
        "youtube" === i.type ? (n = "//img.youtube.com/vi/" + i.id + "/hqdefault.jpg", c(n)) : "vimeo" === i.type ? t.ajax({
            type: "GET",
            url: "//vimeo.com/api/v2/video/" + i.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function(t) {
                n = t[0].thumbnail_large, c(n)
            }
        }) : "vzaar" === i.type && t.ajax({
            type: "GET",
            url: "//vzaar.com/api/videos/" + i.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function(t) {
                n = t.framegrab_url, c(n)
            }
        })
    }, n.prototype.stop = function() {
        this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video")
    }, n.prototype.play = function(e) {
        var i, s = t(e.target).closest("." + this._core.settings.itemClass),
            n = this._videos[s.attr("data-video")],
            o = n.width || "100%",
            r = n.height || this._core.$stage.height();
        this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), s = this._core.items(this._core.relative(s.index())), this._core.reset(s.index()), "youtube" === n.type ? i = '<iframe width="' + o + '" height="' + r + '" src="//www.youtube.com/embed/' + n.id + "?autoplay=1&v=" + n.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === n.type ? i = '<iframe src="//player.vimeo.com/video/' + n.id + '?autoplay=1" width="' + o + '" height="' + r + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' : "vzaar" === n.type && (i = '<iframe frameborder="0"height="' + r + '"width="' + o + '" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/' + n.id + '/player?autoplay=true"></iframe>'), t('<div class="owl-video-frame">' + i + "</div>").insertAfter(s.find(".owl-video")), this._playing = s.addClass("owl-video-playing"))
    }, n.prototype.isInFullScreen = function() {
        var e = i.fullscreenElement || i.mozFullScreenElement || i.webkitFullscreenElement;
        return e && t(e).parent().hasClass("owl-video-frame")
    }, n.prototype.destroy = function() {
        var t, e;
        for (t in this._core.$element.off("click.owl.video"), this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.Video = n
}(window.Zepto || window.jQuery, window, document),
function(t, e, i, s) {
    var n = function(e) {
        this.core = e, this.core.options = t.extend({}, n.Defaults, this.core.options), this.swapping = !0, this.previous = void 0, this.next = void 0, this.handlers = {
            "change.owl.carousel": t.proxy(function(t) {
                t.namespace && "position" == t.property.name && (this.previous = this.core.current(), this.next = t.property.value)
            }, this),
            "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": t.proxy(function(t) {
                t.namespace && (this.swapping = "translated" == t.type)
            }, this),
            "translate.owl.carousel": t.proxy(function(t) {
                t.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
            }, this)
        }, this.core.$element.on(this.handlers)
    };
    n.Defaults = {
        animateOut: !1,
        animateIn: !1
    }, n.prototype.swap = function() {
        if (1 === this.core.settings.items && t.support.animation && t.support.transition) {
            this.core.speed(0);
            var e, i = t.proxy(this.clear, this),
                s = this.core.$stage.children().eq(this.previous),
                n = this.core.$stage.children().eq(this.next),
                o = this.core.settings.animateIn,
                r = this.core.settings.animateOut;
            this.core.current() !== this.previous && (r && (e = this.core.coordinates(this.previous) - this.core.coordinates(this.next), s.one(t.support.animation.end, i).css({
                left: e + "px"
            }).addClass("animated owl-animated-out").addClass(r)), o && n.one(t.support.animation.end, i).addClass("animated owl-animated-in").addClass(o))
        }
    }, n.prototype.clear = function(e) {
        t(e.target).css({
            left: ""
        }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd()
    }, n.prototype.destroy = function() {
        var t, e;
        for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.Animate = n
}(window.Zepto || window.jQuery, window, document),
function(t, e, i, s) {
    var n = function(e) {
        this._core = e, this._timeout = null, this._paused = !1, this._handlers = {
            "changed.owl.carousel": t.proxy(function(t) {
                t.namespace && "settings" === t.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : t.namespace && "position" === t.property.name && this._core.settings.autoplay && this._setAutoPlayInterval()
            }, this),
            "initialized.owl.carousel": t.proxy(function(t) {
                t.namespace && this._core.settings.autoplay && this.play()
            }, this),
            "play.owl.autoplay": t.proxy(function(t, e, i) {
                t.namespace && this.play(e, i)
            }, this),
            "stop.owl.autoplay": t.proxy(function(t) {
                t.namespace && this.stop()
            }, this),
            "mouseover.owl.autoplay": t.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
            }, this),
            "mouseleave.owl.autoplay": t.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
            }, this),
            "touchstart.owl.core": t.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
            }, this),
            "touchend.owl.core": t.proxy(function() {
                this._core.settings.autoplayHoverPause && this.play()
            }, this)
        }, this._core.$element.on(this._handlers), this._core.options = t.extend({}, n.Defaults, this._core.options)
    };
    n.Defaults = {
        autoplay: !1,
        autoplayTimeout: 5e3,
        autoplayHoverPause: !1,
        autoplaySpeed: !1
    }, n.prototype.play = function(t, e) {
        this._paused = !1, this._core.is("rotating") || (this._core.enter("rotating"), this._setAutoPlayInterval())
    }, n.prototype._getNextTimeout = function(s, n) {
        return this._timeout && e.clearTimeout(this._timeout), e.setTimeout(t.proxy(function() {
            this._paused || this._core.is("busy") || this._core.is("interacting") || i.hidden || this._core.next(n || this._core.settings.autoplaySpeed)
        }, this), s || this._core.settings.autoplayTimeout)
    }, n.prototype._setAutoPlayInterval = function() {
        this._timeout = this._getNextTimeout()
    }, n.prototype.stop = function() {
        this._core.is("rotating") && (e.clearTimeout(this._timeout), this._core.leave("rotating"))
    }, n.prototype.pause = function() {
        this._core.is("rotating") && (this._paused = !0)
    }, n.prototype.destroy = function() {
        var t, e;
        for (t in this.stop(), this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.autoplay = n
}(window.Zepto || window.jQuery, window, document),
function(t, e, i, s) {
    "use strict";
    var n = function(e) {
        this._core = e, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
            next: this._core.next,
            prev: this._core.prev,
            to: this._core.to
        }, this._handlers = {
            "prepared.owl.carousel": t.proxy(function(e) {
                e.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + t(e.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>")
            }, this),
            "added.owl.carousel": t.proxy(function(t) {
                t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 0, this._templates.pop())
            }, this),
            "remove.owl.carousel": t.proxy(function(t) {
                t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 1)
            }, this),
            "changed.owl.carousel": t.proxy(function(t) {
                t.namespace && "position" == t.property.name && this.draw()
            }, this),
            "initialized.owl.carousel": t.proxy(function(t) {
                t.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"))
            }, this),
            "refreshed.owl.carousel": t.proxy(function(t) {
                t.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"))
            }, this)
        }, this._core.options = t.extend({}, n.Defaults, this._core.options), this.$element.on(this._handlers)
    };
    n.Defaults = {
        nav: !1,
        navText: ["prev", "next"],
        navSpeed: !1,
        navElement: "div",
        navContainer: !1,
        navContainerClass: "owl-nav",
        navClass: ["owl-prev", "owl-next"],
        slideBy: 1,
        dotClass: "owl-dot",
        dotsClass: "owl-dots",
        dots: !0,
        dotsEach: !1,
        dotsData: !1,
        dotsSpeed: !1,
        dotsContainer: !1
    }, n.prototype.initialize = function() {
        var e, i = this._core.settings;
        for (e in this._controls.$relative = (i.navContainer ? t(i.navContainer) : t("<div>").addClass(i.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = t("<" + i.navElement + ">").addClass(i.navClass[0]).html(i.navText[0]).prependTo(this._controls.$relative).on("click", t.proxy(function(t) {
                this.prev(i.navSpeed)
            }, this)), this._controls.$next = t("<" + i.navElement + ">").addClass(i.navClass[1]).html(i.navText[1]).appendTo(this._controls.$relative).on("click", t.proxy(function(t) {
                this.next(i.navSpeed)
            }, this)), i.dotsData || (this._templates = [t("<div>").addClass(i.dotClass).append(t("<span>")).prop("outerHTML")]), this._controls.$absolute = (i.dotsContainer ? t(i.dotsContainer) : t("<div>").addClass(i.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "div", t.proxy(function(e) {
                var s = t(e.target).parent().is(this._controls.$absolute) ? t(e.target).index() : t(e.target).parent().index();
                e.preventDefault(), this.to(s, i.dotsSpeed)
            }, this)), this._overrides) this._core[e] = t.proxy(this[e], this)
    }, n.prototype.destroy = function() {
        var t, e, i, s;
        for (t in this._handlers) this.$element.off(t, this._handlers[t]);
        for (e in this._controls) this._controls[e].remove();
        for (s in this.overides) this._core[s] = this._overrides[s];
        for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
    }, n.prototype.update = function() {
        var t, e, i = this._core.clones().length / 2,
            s = i + this._core.items().length,
            n = this._core.maximum(!0),
            o = this._core.settings,
            r = o.center || o.autoWidth || o.dotsData ? 1 : o.dotsEach || o.items;
        if ("page" !== o.slideBy && (o.slideBy = Math.min(o.slideBy, o.items)), o.dots || "page" == o.slideBy)
            for (this._pages = [], t = i, e = 0, 0; t < s; t++) {
                if (e >= r || 0 === e) {
                    if (this._pages.push({
                            start: Math.min(n, t - i),
                            end: t - i + r - 1
                        }), Math.min(n, t - i) === n) break;
                    e = 0, 0
                }
                e += this._core.mergers(this._core.relative(t))
            }
    }, n.prototype.draw = function() {
        var e, i = this._core.settings,
            s = this._core.items().length <= i.items,
            n = this._core.relative(this._core.current()),
            o = i.loop || i.rewind;
        this._controls.$relative.toggleClass("disabled", !i.nav || s), i.nav && (this._controls.$previous.toggleClass("disabled", !o && n <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !o && n >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !i.dots || s), i.dots && (e = this._pages.length - this._controls.$absolute.children().length, i.dotsData && 0 !== e ? this._controls.$absolute.html(this._templates.join("")) : e > 0 ? this._controls.$absolute.append(new Array(e + 1).join(this._templates[0])) : e < 0 && this._controls.$absolute.children().slice(e).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(t.inArray(this.current(), this._pages)).addClass("active"))
    }, n.prototype.onTrigger = function(e) {
        var i = this._core.settings;
        e.page = {
            index: t.inArray(this.current(), this._pages),
            count: this._pages.length,
            size: i && (i.center || i.autoWidth || i.dotsData ? 1 : i.dotsEach || i.items)
        }
    }, n.prototype.current = function() {
        var e = this._core.relative(this._core.current());
        return t.grep(this._pages, t.proxy(function(t, i) {
            return t.start <= e && t.end >= e
        }, this)).pop()
    }, n.prototype.getPosition = function(e) {
        var i, s, n = this._core.settings;
        return "page" == n.slideBy ? (i = t.inArray(this.current(), this._pages), s = this._pages.length, e ? ++i : --i, i = this._pages[(i % s + s) % s].start) : (i = this._core.relative(this._core.current()), s = this._core.items().length, e ? i += n.slideBy : i -= n.slideBy), i
    }, n.prototype.next = function(e) {
        t.proxy(this._overrides.to, this._core)(this.getPosition(!0), e)
    }, n.prototype.prev = function(e) {
        t.proxy(this._overrides.to, this._core)(this.getPosition(!1), e)
    }, n.prototype.to = function(e, i, s) {
        var n;
        !s && this._pages.length ? (n = this._pages.length, t.proxy(this._overrides.to, this._core)(this._pages[(e % n + n) % n].start, i)) : t.proxy(this._overrides.to, this._core)(e, i)
    }, t.fn.owlCarousel.Constructor.Plugins.Navigation = n
}(window.Zepto || window.jQuery, window, document),
function(t, e, i, s) {
    "use strict";
    var n = function(i) {
        this._core = i, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
            "initialized.owl.carousel": t.proxy(function(i) {
                i.namespace && "URLHash" === this._core.settings.startPosition && t(e).trigger("hashchange.owl.navigation")
            }, this),
            "prepared.owl.carousel": t.proxy(function(e) {
                if (e.namespace) {
                    var i = t(e.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
                    if (!i) return;
                    this._hashes[i] = e.content
                }
            }, this),
            "changed.owl.carousel": t.proxy(function(i) {
                if (i.namespace && "position" === i.property.name) {
                    var s = this._core.items(this._core.relative(this._core.current())),
                        n = t.map(this._hashes, function(t, e) {
                            return t === s ? e : null
                        }).join();
                    if (!n || e.location.hash.slice(1) === n) return;
                    e.location.hash = n
                }
            }, this)
        }, this._core.options = t.extend({}, n.Defaults, this._core.options), this.$element.on(this._handlers), t(e).on("hashchange.owl.navigation", t.proxy(function(t) {
            var i = e.location.hash.substring(1),
                s = this._core.$stage.children(),
                n = this._hashes[i] && s.index(this._hashes[i]);
            void 0 !== n && n !== this._core.current() && this._core.to(this._core.relative(n), !1, !0)
        }, this))
    };
    n.Defaults = {
        URLhashListener: !1
    }, n.prototype.destroy = function() {
        var i, s;
        for (i in t(e).off("hashchange.owl.navigation"), this._handlers) this._core.$element.off(i, this._handlers[i]);
        for (s in Object.getOwnPropertyNames(this)) "function" != typeof this[s] && (this[s] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.Hash = n
}(window.Zepto || window.jQuery, window, document),
function(t, e, i, s) {
    var n = t("<support>").get(0).style,
        o = "Webkit Moz O ms".split(" "),
        r = {
            transition: {
                end: {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd",
                    transition: "transitionend"
                }
            },
            animation: {
                end: {
                    WebkitAnimation: "webkitAnimationEnd",
                    MozAnimation: "animationend",
                    OAnimation: "oAnimationEnd",
                    animation: "animationend"
                }
            }
        },
        a = function() {
            return !!c("transform")
        },
        l = function() {
            return !!c("perspective")
        },
        h = function() {
            return !!c("animation")
        };

    function c(e, i) {
        var r = !1,
            a = e.charAt(0).toUpperCase() + e.slice(1);
        return t.each((e + " " + o.join(a + " ") + a).split(" "), function(t, e) {
            if (n[e] !== s) return r = !i || e, !1
        }), r
    }

    function u(t) {
        return c(t, !0)
    }(function() {
        return !!c("transition")
    })() && (t.support.transition = new String(u("transition")), t.support.transition.end = r.transition.end[t.support.transition]), h() && (t.support.animation = new String(u("animation")), t.support.animation.end = r.animation.end[t.support.animation]), a() && (t.support.transform = new String(u("transform")), t.support.transform3d = l())
}(window.Zepto || window.jQuery, window, document),
function(t, e) {
    function i(e, i) {
        var n = e.nodeName.toLowerCase();
        if ("area" === n) {
            var o, r = e.parentNode,
                a = r.name;
            return !(!e.href || !a || "map" !== r.nodeName.toLowerCase()) && (!!(o = t("img[usemap=#" + a + "]")[0]) && s(o))
        }
        return (/input|select|textarea|button|object/.test(n) ? !e.disabled : "a" == n && e.href || i) && s(e)
    }

    function s(e) {
        return !t(e).parents().andSelf().filter(function() {
            return "hidden" === t.curCSS(this, "visibility") || t.expr.filters.hidden(this)
        }).length
    }
    t.ui = t.ui || {}, t.ui.version || (t.extend(t.ui, {
        version: "1.8.22",
        keyCode: {
            ALT: 18,
            BACKSPACE: 8,
            CAPS_LOCK: 20,
            COMMA: 188,
            COMMAND: 91,
            COMMAND_LEFT: 91,
            COMMAND_RIGHT: 93,
            CONTROL: 17,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            MENU: 93,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SHIFT: 16,
            SPACE: 32,
            TAB: 9,
            UP: 38,
            WINDOWS: 91
        }
    }), t.fn.extend({
        propAttr: t.fn.prop || t.fn.attr,
        _focus: t.fn.focus,
        focus: function(e, i) {
            return "number" == typeof e ? this.each(function() {
                var s = this;
                setTimeout(function() {
                    t(s).focus(), i && i.call(s)
                }, e)
            }) : this._focus.apply(this, arguments)
        },
        scrollParent: function() {
            var e;
            return e = t.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                return /(relative|absolute|fixed)/.test(t.curCSS(this, "position", 1)) && /(auto|scroll)/.test(t.curCSS(this, "overflow", 1) + t.curCSS(this, "overflow-y", 1) + t.curCSS(this, "overflow-x", 1))
            }).eq(0) : this.parents().filter(function() {
                return /(auto|scroll)/.test(t.curCSS(this, "overflow", 1) + t.curCSS(this, "overflow-y", 1) + t.curCSS(this, "overflow-x", 1))
            }).eq(0), /fixed/.test(this.css("position")) || !e.length ? t(document) : e
        },
        zIndex: function(e) {
            if (void 0 !== e) return this.css("zIndex", e);
            if (this.length)
                for (var i, s, n = t(this[0]); n.length && n[0] !== document;) {
                    if (("absolute" === (i = n.css("position")) || "relative" === i || "fixed" === i) && (s = parseInt(n.css("zIndex"), 10), !isNaN(s) && 0 !== s)) return s;
                    n = n.parent()
                }
            return 0
        },
        disableSelection: function() {
            return this.bind((t.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(t) {
                t.preventDefault()
            })
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        }
    }), t("<a>").outerWidth(1).jquery || t.each(["Width", "Height"], function(e, i) {
        function s(e, i, s, o) {
            return t.each(n, function() {
                i -= parseFloat(t.curCSS(e, "padding" + this, !0)) || 0, s && (i -= parseFloat(t.curCSS(e, "border" + this + "Width", !0)) || 0), o && (i -= parseFloat(t.curCSS(e, "margin" + this, !0)) || 0)
            }), i
        }
        var n = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
            o = i.toLowerCase(),
            r = {
                innerWidth: t.fn.innerWidth,
                innerHeight: t.fn.innerHeight,
                outerWidth: t.fn.outerWidth,
                outerHeight: t.fn.outerHeight
            };
        t.fn["inner" + i] = function(e) {
            return void 0 === e ? r["inner" + i].call(this) : this.each(function() {
                t(this).css(o, s(this, e) + "px")
            })
        }, t.fn["outer" + i] = function(e, n) {
            return "number" != typeof e ? r["outer" + i].call(this, e) : this.each(function() {
                t(this).css(o, s(this, e, !0, n) + "px")
            })
        }
    }), t.extend(t.expr[":"], {
        data: t.expr.createPseudo ? t.expr.createPseudo(function(e) {
            return function(i) {
                return !!t.data(i, e)
            }
        }) : function(e, i, s) {
            return !!t.data(e, s[3])
        },
        focusable: function(e) {
            return i(e, !isNaN(t.attr(e, "tabindex")))
        },
        tabbable: function(e) {
            var s = t.attr(e, "tabindex"),
                n = isNaN(s);
            return (n || s >= 0) && i(e, !n)
        }
    }), t(function() {
        var e = document.body,
            i = e.appendChild(i = document.createElement("div"));
        i.offsetHeight, t.extend(i.style, {
            minHeight: "100px",
            height: "auto",
            padding: 0,
            borderWidth: 0
        }), t.support.minHeight = 100 === i.offsetHeight, t.support.selectstart = "onselectstart" in i, e.removeChild(i).style.display = "none"
    }), t.curCSS || (t.curCSS = t.css), t.extend(t.ui, {
        plugin: {
            add: function(e, i, s) {
                var n = t.ui[e].prototype;
                for (var o in s) n.plugins[o] = n.plugins[o] || [], n.plugins[o].push([i, s[o]])
            },
            call: function(t, e, i) {
                var s = t.plugins[e];
                if (s && t.element[0].parentNode)
                    for (var n = 0; n < s.length; n++) t.options[s[n][0]] && s[n][1].apply(t.element, i)
            }
        },
        contains: function(t, e) {
            return document.compareDocumentPosition ? 16 & t.compareDocumentPosition(e) : t !== e && t.contains(e)
        },
        hasScroll: function(e, i) {
            if ("hidden" === t(e).css("overflow")) return !1;
            var s = i && "left" === i ? "scrollLeft" : "scrollTop",
                n = !1;
            return e[s] > 0 || (e[s] = 1, n = e[s] > 0, e[s] = 0, n)
        },
        isOverAxis: function(t, e, i) {
            return t > e && t < e + i
        },
        isOver: function(e, i, s, n, o, r) {
            return t.ui.isOverAxis(e, s, o) && t.ui.isOverAxis(i, n, r)
        }
    }))
}(jQuery),
function(t, e) {
    if (t.cleanData) {
        var i = t.cleanData;
        t.cleanData = function(e) {
            for (var s, n = 0; null != (s = e[n]); n++) try {
                t(s).triggerHandler("remove")
            } catch (t) {}
            i(e)
        }
    } else {
        var s = t.fn.remove;
        t.fn.remove = function(e, i) {
            return this.each(function() {
                return i || (!e || t.filter(e, [this]).length) && t("*", this).add([this]).each(function() {
                    try {
                        t(this).triggerHandler("remove")
                    } catch (t) {}
                }), s.call(t(this), e, i)
            })
        }
    }
    t.widget = function(e, i, s) {
        var n, o = e.split(".")[0];
        n = o + "-" + (e = e.split(".")[1]), s || (s = i, i = t.Widget), t.expr[":"][n] = function(i) {
            return !!t.data(i, e)
        }, t[o] = t[o] || {}, t[o][e] = function(t, e) {
            arguments.length && this._createWidget(t, e)
        };
        var r = new i;
        r.options = t.extend(!0, {}, r.options), t[o][e].prototype = t.extend(!0, r, {
            namespace: o,
            widgetName: e,
            widgetEventPrefix: t[o][e].prototype.widgetEventPrefix || e,
            widgetBaseClass: n
        }, s), t.widget.bridge(e, t[o][e])
    }, t.widget.bridge = function(e, i) {
        t.fn[e] = function(s) {
            var n = "string" == typeof s,
                o = Array.prototype.slice.call(arguments, 1),
                r = this;
            return s = !n && o.length ? t.extend.apply(null, [!0, s].concat(o)) : s, n && "_" === s.charAt(0) ? r : (n ? this.each(function() {
                var i = t.data(this, e),
                    n = i && t.isFunction(i[s]) ? i[s].apply(i, o) : i;
                if (n !== i && void 0 !== n) return r = n, !1
            }) : this.each(function() {
                var n = t.data(this, e);
                n ? n.option(s || {})._init() : t.data(this, e, new i(s, this))
            }), r)
        }
    }, t.Widget = function(t, e) {
        arguments.length && this._createWidget(t, e)
    }, t.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        options: {
            disabled: !1
        },
        _createWidget: function(e, i) {
            t.data(i, this.widgetName, this), this.element = t(i), this.options = t.extend(!0, {}, this.options, this._getCreateOptions(), e);
            var s = this;
            this.element.bind("remove." + this.widgetName, function() {
                s.destroy()
            }), this._create(), this._trigger("create"), this._init()
        },
        _getCreateOptions: function() {
            return t.metadata && t.metadata.get(this.element[0])[this.widgetName]
        },
        _create: function() {},
        _init: function() {},
        destroy: function() {
            this.element.unbind("." + this.widgetName).removeData(this.widgetName), this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled ui-state-disabled")
        },
        widget: function() {
            return this.element
        },
        option: function(e, i) {
            var s = e;
            if (0 === arguments.length) return t.extend({}, this.options);
            if ("string" == typeof e) {
                if (void 0 === i) return this.options[e];
                (s = {})[e] = i
            }
            return this._setOptions(s), this
        },
        _setOptions: function(e) {
            var i = this;
            return t.each(e, function(t, e) {
                i._setOption(t, e)
            }), this
        },
        _setOption: function(t, e) {
            return this.options[t] = e, "disabled" === t && this.widget()[e ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled", e), this
        },
        enable: function() {
            return this._setOption("disabled", !1)
        },
        disable: function() {
            return this._setOption("disabled", !0)
        },
        _trigger: function(e, i, s) {
            var n, o, r = this.options[e];
            if (s = s || {}, (i = t.Event(i)).type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), i.target = this.element[0], o = i.originalEvent)
                for (n in o) n in i || (i[n] = o[n]);
            return this.element.trigger(i, s), !(t.isFunction(r) && !1 === r.call(this.element[0], i, s) || i.isDefaultPrevented())
        }
    }
}(jQuery),
function(t, e) {
    var i = !1;
    t(document).mouseup(function(t) {
        i = !1
    }), t.widget("ui.mouse", {
        options: {
            cancel: ":input,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var e = this;
            this.element.bind("mousedown." + this.widgetName, function(t) {
                return e._mouseDown(t)
            }).bind("click." + this.widgetName, function(i) {
                if (!0 === t.data(i.target, e.widgetName + ".preventClickEvent")) return t.removeData(i.target, e.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1
            }), this.started = !1
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName), t(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function(e) {
            if (!i) {
                this._mouseStarted && this._mouseUp(e), this._mouseDownEvent = e;
                var s = this,
                    n = 1 == e.which,
                    o = !("string" != typeof this.options.cancel || !e.target.nodeName) && t(e.target).closest(this.options.cancel).length;
                return !(n && !o && this._mouseCapture(e)) || (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    s.mouseDelayMet = !0
                }, this.options.delay)), this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = !1 !== this._mouseStart(e), !this._mouseStarted) ? (e.preventDefault(), !0) : (!0 === t.data(e.target, this.widgetName + ".preventClickEvent") && t.removeData(e.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(t) {
                    return s._mouseMove(t)
                }, this._mouseUpDelegate = function(t) {
                    return s._mouseUp(t)
                }, t(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), e.preventDefault(), i = !0, !0))
            }
        },
        _mouseMove: function(e) {
            return !t.browser.msie || document.documentMode >= 9 || e.button ? this._mouseStarted ? (this._mouseDrag(e), e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = !1 !== this._mouseStart(this._mouseDownEvent, e), this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted) : this._mouseUp(e)
        },
        _mouseUp: function(e) {
            return t(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, e.target == this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(e)), !1
        },
        _mouseDistanceMet: function(t) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function(t) {
            return this.mouseDelayMet
        },
        _mouseStart: function(t) {},
        _mouseDrag: function(t) {},
        _mouseStop: function(t) {},
        _mouseCapture: function(t) {
            return !0
        }
    })
}(jQuery),
function(t, e) {
    t.widget("ui.draggable", t.ui.mouse, {
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1
        },
        _create: function() {
            "original" == this.options.helper && !/^(?:r|a|f)/.test(this.element.css("position")) && (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
        },
        destroy: function() {
            if (this.element.data("draggable")) return this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy(), this
        },
        _mouseCapture: function(e) {
            var i = this.options;
            return !(this.helper || i.disabled || t(e.target).is(".ui-resizable-handle")) && (this.handle = this._getHandle(e), !!this.handle && (i.iframeFix && t(!0 === i.iframeFix ? "iframe" : i.iframeFix).each(function() {
                t('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1e3
                }).css(t(this).offset()).appendTo("body")
            }), !0))
        },
        _mouseStart: function(e) {
            var i = this.options;
            return this.helper = this._createHelper(e), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), t.ui.ddmanager && (t.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offset = this.positionAbs = this.element.offset(), this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            }, t.extend(this.offset, {
                click: {
                    left: e.pageX - this.offset.left,
                    top: e.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }), this.originalPosition = this.position = this._generatePosition(e), this.originalPageX = e.pageX, this.originalPageY = e.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), i.containment && this._setContainment(), !1 === this._trigger("start", e) ? (this._clear(), !1) : (this._cacheHelperProportions(), t.ui.ddmanager && !i.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this._mouseDrag(e, !0), t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e), !0)
        },
        _mouseDrag: function(e, i) {
            if (this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), !i) {
                var s = this._uiHash();
                if (!1 === this._trigger("drag", e, s)) return this._mouseUp({}), !1;
                this.position = s.position
            }
            return this.options.axis && "y" == this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" == this.options.axis || (this.helper[0].style.top = this.position.top + "px"), t.ui.ddmanager && t.ui.ddmanager.drag(this, e), !1
        },
        _mouseStop: function(e) {
            var i = !1;
            t.ui.ddmanager && !this.options.dropBehaviour && (i = t.ui.ddmanager.drop(this, e)), this.dropped && (i = this.dropped, this.dropped = !1);
            for (var s = this.element[0], n = !1; s && (s = s.parentNode);) s == document && (n = !0);
            if (!n && "original" === this.options.helper) return !1;
            if ("invalid" == this.options.revert && !i || "valid" == this.options.revert && i || !0 === this.options.revert || t.isFunction(this.options.revert) && this.options.revert.call(this.element, i)) {
                var o = this;
                t(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                    !1 !== o._trigger("stop", e) && o._clear()
                })
            } else !1 !== this._trigger("stop", e) && this._clear();
            return !1
        },
        _mouseUp: function(e) {
            return !0 === this.options.iframeFix && t("div.ui-draggable-iframeFix").each(function() {
                this.parentNode.removeChild(this)
            }), t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e), t.ui.mouse.prototype._mouseUp.call(this, e)
        },
        cancel: function() {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
        },
        _getHandle: function(e) {
            var i = !this.options.handle || !t(this.options.handle, this.element).length;
            return t(this.options.handle, this.element).find("*").andSelf().each(function() {
                this == e.target && (i = !0)
            }), i
        },
        _createHelper: function(e) {
            var i = this.options,
                s = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e])) : "clone" == i.helper ? this.element.clone().removeAttr("id") : this.element;
            return s.parents("body").length || s.appendTo("parent" == i.appendTo ? this.element[0].parentNode : i.appendTo), s[0] != this.element[0] && !/(fixed|absolute)/.test(s.css("position")) && s.css("position", "absolute"), s
        },
        _adjustOffsetFromHelper: function(e) {
            "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
                left: +e[0],
                top: +e[1] || 0
            }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var e = this.offsetParent.offset();
            return "absolute" == this.cssPosition && this.scrollParent[0] != document && t.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && "html" == this.offsetParent[0].tagName.toLowerCase() && t.browser.msie) && (e = {
                top: 0,
                left: 0
            }), {
                top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if ("relative" == this.cssPosition) {
                var t = this.element.position();
                return {
                    top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var e = this.options;
            if ("parent" == e.containment && (e.containment = this.helper[0].parentNode), "document" != e.containment && "window" != e.containment || (this.containment = ["document" == e.containment ? 0 : t(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, "document" == e.containment ? 0 : t(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, ("document" == e.containment ? 0 : t(window).scrollLeft()) + t("document" == e.containment ? document : window).width() - this.helperProportions.width - this.margins.left, ("document" == e.containment ? 0 : t(window).scrollTop()) + (t("document" == e.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(e.containment) || e.containment.constructor == Array) e.containment.constructor == Array && (this.containment = e.containment);
            else {
                var i = t(e.containment),
                    s = i[0];
                if (!s) return;
                i.offset();
                var n = "hidden" != t(s).css("overflow");
                this.containment = [(parseInt(t(s).css("borderLeftWidth"), 10) || 0) + (parseInt(t(s).css("paddingLeft"), 10) || 0), (parseInt(t(s).css("borderTopWidth"), 10) || 0) + (parseInt(t(s).css("paddingTop"), 10) || 0), (n ? Math.max(s.scrollWidth, s.offsetWidth) : s.offsetWidth) - (parseInt(t(s).css("borderLeftWidth"), 10) || 0) - (parseInt(t(s).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (n ? Math.max(s.scrollHeight, s.offsetHeight) : s.offsetHeight) - (parseInt(t(s).css("borderTopWidth"), 10) || 0) - (parseInt(t(s).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = i
            }
        },
        _convertPositionTo: function(e, i) {
            i || (i = this.position);
            var s = "absolute" == e ? 1 : -1,
                n = (this.options, "absolute" != this.cssPosition || this.scrollParent[0] != document && t.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent),
                o = /(html|body)/i.test(n[0].tagName);
            return {
                top: i.top + this.offset.relative.top * s + this.offset.parent.top * s - (t.browser.safari && t.browser.version < 526 && "fixed" == this.cssPosition ? 0 : ("fixed" == this.cssPosition ? -this.scrollParent.scrollTop() : o ? 0 : n.scrollTop()) * s),
                left: i.left + this.offset.relative.left * s + this.offset.parent.left * s - (t.browser.safari && t.browser.version < 526 && "fixed" == this.cssPosition ? 0 : ("fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() : o ? 0 : n.scrollLeft()) * s)
            }
        },
        _generatePosition: function(e) {
            var i = this.options,
                s = "absolute" != this.cssPosition || this.scrollParent[0] != document && t.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                n = /(html|body)/i.test(s[0].tagName),
                o = e.pageX,
                r = e.pageY;
            if (this.originalPosition) {
                var a;
                if (this.containment) {
                    if (this.relative_container) {
                        var l = this.relative_container.offset();
                        a = [this.containment[0] + l.left, this.containment[1] + l.top, this.containment[2] + l.left, this.containment[3] + l.top]
                    } else a = this.containment;
                    e.pageX - this.offset.click.left < a[0] && (o = a[0] + this.offset.click.left), e.pageY - this.offset.click.top < a[1] && (r = a[1] + this.offset.click.top), e.pageX - this.offset.click.left > a[2] && (o = a[2] + this.offset.click.left), e.pageY - this.offset.click.top > a[3] && (r = a[3] + this.offset.click.top)
                }
                if (i.grid) {
                    var h = i.grid[1] ? this.originalPageY + Math.round((r - this.originalPageY) / i.grid[1]) * i.grid[1] : this.originalPageY;
                    r = a && (h - this.offset.click.top < a[1] || h - this.offset.click.top > a[3]) ? h - this.offset.click.top < a[1] ? h + i.grid[1] : h - i.grid[1] : h;
                    var c = i.grid[0] ? this.originalPageX + Math.round((o - this.originalPageX) / i.grid[0]) * i.grid[0] : this.originalPageX;
                    o = a && (c - this.offset.click.left < a[0] || c - this.offset.click.left > a[2]) ? c - this.offset.click.left < a[0] ? c + i.grid[0] : c - i.grid[0] : c
                }
            }
            return {
                top: r - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (t.browser.safari && t.browser.version < 526 && "fixed" == this.cssPosition ? 0 : "fixed" == this.cssPosition ? -this.scrollParent.scrollTop() : n ? 0 : s.scrollTop()),
                left: o - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (t.browser.safari && t.browser.version < 526 && "fixed" == this.cssPosition ? 0 : "fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() : n ? 0 : s.scrollLeft())
            }
        },
        _clear: function() {
            this.helper.removeClass("ui-draggable-dragging"), this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
        },
        _trigger: function(e, i, s) {
            return s = s || this._uiHash(), t.ui.plugin.call(this, e, [i, s]), "drag" == e && (this.positionAbs = this._convertPositionTo("absolute")), t.Widget.prototype._trigger.call(this, e, i, s)
        },
        plugins: {},
        _uiHash: function(t) {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    }), t.extend(t.ui.draggable, {
        version: "1.8.22"
    }), t.ui.plugin.add("draggable", "connectToSortable", {
        start: function(e, i) {
            var s = t(this).data("draggable"),
                n = s.options,
                o = t.extend({}, i, {
                    item: s.element
                });
            s.sortables = [], t(n.connectToSortable).each(function() {
                var i = t.data(this, "sortable");
                i && !i.options.disabled && (s.sortables.push({
                    instance: i,
                    shouldRevert: i.options.revert
                }), i.refreshPositions(), i._trigger("activate", e, o))
            })
        },
        stop: function(e, i) {
            var s = t(this).data("draggable"),
                n = t.extend({}, i, {
                    item: s.element
                });
            t.each(s.sortables, function() {
                this.instance.isOver ? (this.instance.isOver = 0, s.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = !0), this.instance._mouseStop(e), this.instance.options.helper = this.instance.options._helper, "original" == s.options.helper && this.instance.currentItem.css({
                    top: "auto",
                    left: "auto"
                })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", e, n))
            })
        },
        drag: function(e, i) {
            var s = t(this).data("draggable"),
                n = this;
            t.each(s.sortables, function(o) {
                this.instance.positionAbs = s.positionAbs, this.instance.helperProportions = s.helperProportions, this.instance.offset.click = s.offset.click, this.instance._intersectsWith(this.instance.containerCache) ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = t(n).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
                    return i.helper[0]
                }, e.target = this.instance.currentItem[0], this.instance._mouseCapture(e, !0), this.instance._mouseStart(e, !0, !0), this.instance.offset.click.top = s.offset.click.top, this.instance.offset.click.left = s.offset.click.left, this.instance.offset.parent.left -= s.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= s.offset.parent.top - this.instance.offset.parent.top, s._trigger("toSortable", e), s.dropped = this.instance.element, s.currentItem = s.element, this.instance.fromOutside = s), this.instance.currentItem && this.instance._mouseDrag(e)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", e, this.instance._uiHash(this.instance)), this.instance._mouseStop(e, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), s._trigger("fromSortable", e), s.dropped = !1)
            })
        }
    }), t.ui.plugin.add("draggable", "cursor", {
        start: function(e, i) {
            var s = t("body"),
                n = t(this).data("draggable").options;
            s.css("cursor") && (n._cursor = s.css("cursor")), s.css("cursor", n.cursor)
        },
        stop: function(e, i) {
            var s = t(this).data("draggable").options;
            s._cursor && t("body").css("cursor", s._cursor)
        }
    }), t.ui.plugin.add("draggable", "opacity", {
        start: function(e, i) {
            var s = t(i.helper),
                n = t(this).data("draggable").options;
            s.css("opacity") && (n._opacity = s.css("opacity")), s.css("opacity", n.opacity)
        },
        stop: function(e, i) {
            var s = t(this).data("draggable").options;
            s._opacity && t(i.helper).css("opacity", s._opacity)
        }
    }), t.ui.plugin.add("draggable", "scroll", {
        start: function(e, i) {
            var s = t(this).data("draggable");
            s.scrollParent[0] != document && "HTML" != s.scrollParent[0].tagName && (s.overflowOffset = s.scrollParent.offset())
        },
        drag: function(e, i) {
            var s = t(this).data("draggable"),
                n = s.options,
                o = !1;
            s.scrollParent[0] != document && "HTML" != s.scrollParent[0].tagName ? (n.axis && "x" == n.axis || (s.overflowOffset.top + s.scrollParent[0].offsetHeight - e.pageY < n.scrollSensitivity ? s.scrollParent[0].scrollTop = o = s.scrollParent[0].scrollTop + n.scrollSpeed : e.pageY - s.overflowOffset.top < n.scrollSensitivity && (s.scrollParent[0].scrollTop = o = s.scrollParent[0].scrollTop - n.scrollSpeed)), n.axis && "y" == n.axis || (s.overflowOffset.left + s.scrollParent[0].offsetWidth - e.pageX < n.scrollSensitivity ? s.scrollParent[0].scrollLeft = o = s.scrollParent[0].scrollLeft + n.scrollSpeed : e.pageX - s.overflowOffset.left < n.scrollSensitivity && (s.scrollParent[0].scrollLeft = o = s.scrollParent[0].scrollLeft - n.scrollSpeed))) : (n.axis && "x" == n.axis || (e.pageY - t(document).scrollTop() < n.scrollSensitivity ? o = t(document).scrollTop(t(document).scrollTop() - n.scrollSpeed) : t(window).height() - (e.pageY - t(document).scrollTop()) < n.scrollSensitivity && (o = t(document).scrollTop(t(document).scrollTop() + n.scrollSpeed))), n.axis && "y" == n.axis || (e.pageX - t(document).scrollLeft() < n.scrollSensitivity ? o = t(document).scrollLeft(t(document).scrollLeft() - n.scrollSpeed) : t(window).width() - (e.pageX - t(document).scrollLeft()) < n.scrollSensitivity && (o = t(document).scrollLeft(t(document).scrollLeft() + n.scrollSpeed)))), !1 !== o && t.ui.ddmanager && !n.dropBehaviour && t.ui.ddmanager.prepareOffsets(s, e)
        }
    }), t.ui.plugin.add("draggable", "snap", {
        start: function(e, i) {
            var s = t(this).data("draggable"),
                n = s.options;
            s.snapElements = [], t(n.snap.constructor != String ? n.snap.items || ":data(draggable)" : n.snap).each(function() {
                var e = t(this),
                    i = e.offset();
                this != s.element[0] && s.snapElements.push({
                    item: this,
                    width: e.outerWidth(),
                    height: e.outerHeight(),
                    top: i.top,
                    left: i.left
                })
            })
        },
        drag: function(e, i) {
            for (var s = t(this).data("draggable"), n = s.options, o = n.snapTolerance, r = i.offset.left, a = r + s.helperProportions.width, l = i.offset.top, h = l + s.helperProportions.height, c = s.snapElements.length - 1; c >= 0; c--) {
                var u = s.snapElements[c].left,
                    d = u + s.snapElements[c].width,
                    p = s.snapElements[c].top,
                    f = p + s.snapElements[c].height;
                if (u - o < r && r < d + o && p - o < l && l < f + o || u - o < r && r < d + o && p - o < h && h < f + o || u - o < a && a < d + o && p - o < l && l < f + o || u - o < a && a < d + o && p - o < h && h < f + o) {
                    if ("inner" != n.snapMode) {
                        var g = Math.abs(p - h) <= o,
                            m = Math.abs(f - l) <= o,
                            v = Math.abs(u - a) <= o,
                            _ = Math.abs(d - r) <= o;
                        g && (i.position.top = s._convertPositionTo("relative", {
                            top: p - s.helperProportions.height,
                            left: 0
                        }).top - s.margins.top), m && (i.position.top = s._convertPositionTo("relative", {
                            top: f,
                            left: 0
                        }).top - s.margins.top), v && (i.position.left = s._convertPositionTo("relative", {
                            top: 0,
                            left: u - s.helperProportions.width
                        }).left - s.margins.left), _ && (i.position.left = s._convertPositionTo("relative", {
                            top: 0,
                            left: d
                        }).left - s.margins.left)
                    }
                    var b = g || m || v || _;
                    if ("outer" != n.snapMode) {
                        g = Math.abs(p - l) <= o, m = Math.abs(f - h) <= o, v = Math.abs(u - r) <= o, _ = Math.abs(d - a) <= o;
                        g && (i.position.top = s._convertPositionTo("relative", {
                            top: p,
                            left: 0
                        }).top - s.margins.top), m && (i.position.top = s._convertPositionTo("relative", {
                            top: f - s.helperProportions.height,
                            left: 0
                        }).top - s.margins.top), v && (i.position.left = s._convertPositionTo("relative", {
                            top: 0,
                            left: u
                        }).left - s.margins.left), _ && (i.position.left = s._convertPositionTo("relative", {
                            top: 0,
                            left: d - s.helperProportions.width
                        }).left - s.margins.left)
                    }!s.snapElements[c].snapping && (g || m || v || _ || b) && s.options.snap.snap && s.options.snap.snap.call(s.element, e, t.extend(s._uiHash(), {
                        snapItem: s.snapElements[c].item
                    })), s.snapElements[c].snapping = g || m || v || _ || b
                } else s.snapElements[c].snapping && s.options.snap.release && s.options.snap.release.call(s.element, e, t.extend(s._uiHash(), {
                    snapItem: s.snapElements[c].item
                })), s.snapElements[c].snapping = !1
            }
        }
    }), t.ui.plugin.add("draggable", "stack", {
        start: function(e, i) {
            var s = t(this).data("draggable").options,
                n = t.makeArray(t(s.stack)).sort(function(e, i) {
                    return (parseInt(t(e).css("zIndex"), 10) || 0) - (parseInt(t(i).css("zIndex"), 10) || 0)
                });
            if (n.length) {
                var o = parseInt(n[0].style.zIndex) || 0;
                t(n).each(function(t) {
                    this.style.zIndex = o + t
                }), this[0].style.zIndex = o + n.length
            }
        }
    }), t.ui.plugin.add("draggable", "zIndex", {
        start: function(e, i) {
            var s = t(i.helper),
                n = t(this).data("draggable").options;
            s.css("zIndex") && (n._zIndex = s.css("zIndex")), s.css("zIndex", n.zIndex)
        },
        stop: function(e, i) {
            var s = t(this).data("draggable").options;
            s._zIndex && t(i.helper).css("zIndex", s._zIndex)
        }
    })
}(jQuery),
function(t, e) {
    t.widget("ui.droppable", {
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: !1,
            addClasses: !0,
            greedy: !1,
            hoverClass: !1,
            scope: "default",
            tolerance: "intersect"
        },
        _create: function() {
            var e = this.options,
                i = e.accept;
            this.isover = 0, this.isout = 1, this.accept = t.isFunction(i) ? i : function(t) {
                return t.is(i)
            }, this.proportions = {
                width: this.element[0].offsetWidth,
                height: this.element[0].offsetHeight
            }, t.ui.ddmanager.droppables[e.scope] = t.ui.ddmanager.droppables[e.scope] || [], t.ui.ddmanager.droppables[e.scope].push(this), e.addClasses && this.element.addClass("ui-droppable")
        },
        destroy: function() {
            for (var e = t.ui.ddmanager.droppables[this.options.scope], i = 0; i < e.length; i++) e[i] == this && e.splice(i, 1);
            return this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable"), this
        },
        _setOption: function(e, i) {
            "accept" == e && (this.accept = t.isFunction(i) ? i : function(t) {
                return t.is(i)
            }), t.Widget.prototype._setOption.apply(this, arguments)
        },
        _activate: function(e) {
            var i = t.ui.ddmanager.current;
            this.options.activeClass && this.element.addClass(this.options.activeClass), i && this._trigger("activate", e, this.ui(i))
        },
        _deactivate: function(e) {
            var i = t.ui.ddmanager.current;
            this.options.activeClass && this.element.removeClass(this.options.activeClass), i && this._trigger("deactivate", e, this.ui(i))
        },
        _over: function(e) {
            var i = t.ui.ddmanager.current;
            i && (i.currentItem || i.element)[0] != this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", e, this.ui(i)))
        },
        _out: function(e) {
            var i = t.ui.ddmanager.current;
            i && (i.currentItem || i.element)[0] != this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", e, this.ui(i)))
        },
        _drop: function(e, i) {
            var s = i || t.ui.ddmanager.current;
            if (!s || (s.currentItem || s.element)[0] == this.element[0]) return !1;
            var n = !1;
            return this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function() {
                var e = t.data(this, "droppable");
                if (e.options.greedy && !e.options.disabled && e.options.scope == s.options.scope && e.accept.call(e.element[0], s.currentItem || s.element) && t.ui.intersect(s, t.extend(e, {
                        offset: e.element.offset()
                    }), e.options.tolerance)) return n = !0, !1
            }), !n && (!!this.accept.call(this.element[0], s.currentItem || s.element) && (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", e, this.ui(s)), this.element))
        },
        ui: function(t) {
            return {
                draggable: t.currentItem || t.element,
                helper: t.helper,
                position: t.position,
                offset: t.positionAbs
            }
        }
    }), t.extend(t.ui.droppable, {
        version: "1.8.22"
    }), t.ui.intersect = function(e, i, s) {
        if (!i.offset) return !1;
        var n = (e.positionAbs || e.position.absolute).left,
            o = n + e.helperProportions.width,
            r = (e.positionAbs || e.position.absolute).top,
            a = r + e.helperProportions.height,
            l = i.offset.left,
            h = l + i.proportions.width,
            c = i.offset.top,
            u = c + i.proportions.height;
        switch (s) {
            case "fit":
                return l <= n && o <= h && c <= r && a <= u;
            case "intersect":
                return l < n + e.helperProportions.width / 2 && o - e.helperProportions.width / 2 < h && c < r + e.helperProportions.height / 2 && a - e.helperProportions.height / 2 < u;
            case "pointer":
                var d = (e.positionAbs || e.position.absolute).left + (e.clickOffset || e.offset.click).left,
                    p = (e.positionAbs || e.position.absolute).top + (e.clickOffset || e.offset.click).top;
                return t.ui.isOver(p, d, c, l, i.proportions.height, i.proportions.width);
            case "touch":
                return (r >= c && r <= u || a >= c && a <= u || r < c && a > u) && (n >= l && n <= h || o >= l && o <= h || n < l && o > h);
            default:
                return !1
        }
    }, t.ui.ddmanager = {
        current: null,
        droppables: {
            default: []
        },
        prepareOffsets: function(e, i) {
            var s = t.ui.ddmanager.droppables[e.options.scope] || [],
                n = i ? i.type : null,
                o = (e.currentItem || e.element).find(":data(droppable)").andSelf();
            t: for (var r = 0; r < s.length; r++)
                if (!(s[r].options.disabled || e && !s[r].accept.call(s[r].element[0], e.currentItem || e.element))) {
                    for (var a = 0; a < o.length; a++)
                        if (o[a] == s[r].element[0]) {
                            s[r].proportions.height = 0;
                            continue t
                        } s[r].visible = "none" != s[r].element.css("display"), s[r].visible && ("mousedown" == n && s[r]._activate.call(s[r], i), s[r].offset = s[r].element.offset(), s[r].proportions = {
                        width: s[r].element[0].offsetWidth,
                        height: s[r].element[0].offsetHeight
                    })
                }
        },
        drop: function(e, i) {
            var s = !1;
            return t.each(t.ui.ddmanager.droppables[e.options.scope] || [], function() {
                this.options && (!this.options.disabled && this.visible && t.ui.intersect(e, this, this.options.tolerance) && (s = this._drop.call(this, i) || s), !this.options.disabled && this.visible && this.accept.call(this.element[0], e.currentItem || e.element) && (this.isout = 1, this.isover = 0, this._deactivate.call(this, i)))
            }), s
        },
        dragStart: function(e, i) {
            e.element.parents(":not(body,html)").bind("scroll.droppable", function() {
                e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
            })
        },
        drag: function(e, i) {
            e.options.refreshPositions && t.ui.ddmanager.prepareOffsets(e, i), t.each(t.ui.ddmanager.droppables[e.options.scope] || [], function() {
                if (!this.options.disabled && !this.greedyChild && this.visible) {
                    var s = t.ui.intersect(e, this, this.options.tolerance),
                        n = s || 1 != this.isover ? s && 0 == this.isover ? "isover" : null : "isout";
                    if (n) {
                        var o;
                        if (this.options.greedy) {
                            var r = this.element.parents(":data(droppable):eq(0)");
                            r.length && ((o = t.data(r[0], "droppable")).greedyChild = "isover" == n ? 1 : 0)
                        }
                        o && "isover" == n && (o.isover = 0, o.isout = 1, o._out.call(o, i)), this[n] = 1, this["isout" == n ? "isover" : "isout"] = 0, this["isover" == n ? "_over" : "_out"].call(this, i), o && "isout" == n && (o.isout = 0, o.isover = 1, o._over.call(o, i))
                    }
                }
            })
        },
        dragStop: function(e, i) {
            e.element.parents(":not(body,html)").unbind("scroll.droppable"), e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
        }
    }
}(jQuery),
function(t, e) {
    t.widget("ui.resizable", t.ui.mouse, {
        widgetEventPrefix: "resize",
        options: {
            alsoResize: !1,
            animate: !1,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: !1,
            autoHide: !1,
            containment: !1,
            ghost: !1,
            grid: !1,
            handles: "e,s,se",
            helper: !1,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 1e3
        },
        _create: function() {
            var e = this,
                i = this.options;
            if (this.element.addClass("ui-resizable"), t.extend(this, {
                    _aspectRatio: !!i.aspectRatio,
                    aspectRatio: i.aspectRatio,
                    originalElement: this.element,
                    _proportionallyResizeElements: [],
                    _helper: i.helper || i.ghost || i.animate ? i.helper || "ui-resizable-helper" : null
                }), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(t('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                })), this.element = this.element.parent().data("resizable", this.element.data("resizable")), this.elementIsWrapper = !0, this.element.css({
                    marginLeft: this.originalElement.css("marginLeft"),
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom")
                }), this.originalElement.css({
                    marginLeft: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0
                }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                })), this.originalElement.css({
                    margin: this.originalElement.css("margin")
                }), this._proportionallyResize()), this.handles = i.handles || (t(".ui-resizable-handle", this.element).length ? {
                    n: ".ui-resizable-n",
                    e: ".ui-resizable-e",
                    s: ".ui-resizable-s",
                    w: ".ui-resizable-w",
                    se: ".ui-resizable-se",
                    sw: ".ui-resizable-sw",
                    ne: ".ui-resizable-ne",
                    nw: ".ui-resizable-nw"
                } : "e,s,se"), this.handles.constructor == String) {
                "all" == this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw");
                var s = this.handles.split(",");
                this.handles = {};
                for (var n = 0; n < s.length; n++) {
                    var o = t.trim(s[n]),
                        r = t('<div class="ui-resizable-handle ' + ("ui-resizable-" + o) + '"></div>');
                    r.css({
                        zIndex: i.zIndex
                    }), "se" == o && r.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[o] = ".ui-resizable-" + o, this.element.append(r)
                }
            }
            this._renderAxis = function(e) {
                for (var i in e = e || this.element, this.handles) {
                    if (this.handles[i].constructor == String && (this.handles[i] = t(this.handles[i], this.element).show()), this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
                        var s, n = t(this.handles[i], this.element);
                        s = /sw|ne|nw|se|n|s/.test(i) ? n.outerHeight() : n.outerWidth();
                        var o = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join("");
                        e.css(o, s), this._proportionallyResize()
                    }
                    t(this.handles[i]).length
                }
            }, this._renderAxis(this.element), this._handles = t(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function() {
                if (!e.resizing) {
                    if (this.className) var t = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
                    e.axis = t && t[1] ? t[1] : "se"
                }
            }), i.autoHide && (this._handles.hide(), t(this.element).addClass("ui-resizable-autohide").hover(function() {
                i.disabled || (t(this).removeClass("ui-resizable-autohide"), e._handles.show())
            }, function() {
                i.disabled || e.resizing || (t(this).addClass("ui-resizable-autohide"), e._handles.hide())
            })), this._mouseInit()
        },
        destroy: function() {
            this._mouseDestroy();
            var e = function(e) {
                t(e).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            if (this.elementIsWrapper) {
                e(this.element);
                var i = this.element;
                i.after(this.originalElement.css({
                    position: i.css("position"),
                    width: i.outerWidth(),
                    height: i.outerHeight(),
                    top: i.css("top"),
                    left: i.css("left")
                })).remove()
            }
            return this.originalElement.css("resize", this.originalResizeStyle), e(this.originalElement), this
        },
        _mouseCapture: function(e) {
            var i = !1;
            for (var s in this.handles) t(this.handles[s])[0] == e.target && (i = !0);
            return !this.options.disabled && i
        },
        _mouseStart: function(e) {
            var s = this.options,
                n = this.element.position(),
                o = this.element;
            this.resizing = !0, this.documentScroll = {
                top: t(document).scrollTop(),
                left: t(document).scrollLeft()
            }, (o.is(".ui-draggable") || /absolute/.test(o.css("position"))) && o.css({
                position: "absolute",
                top: n.top,
                left: n.left
            }), this._renderProxy();
            var r = i(this.helper.css("left")),
                a = i(this.helper.css("top"));
            s.containment && (r += t(s.containment).scrollLeft() || 0, a += t(s.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                left: r,
                top: a
            }, this.size = this._helper ? {
                width: o.outerWidth(),
                height: o.outerHeight()
            } : {
                width: o.width(),
                height: o.height()
            }, this.originalSize = this._helper ? {
                width: o.outerWidth(),
                height: o.outerHeight()
            } : {
                width: o.width(),
                height: o.height()
            }, this.originalPosition = {
                left: r,
                top: a
            }, this.sizeDiff = {
                width: o.outerWidth() - o.width(),
                height: o.outerHeight() - o.height()
            }, this.originalMousePosition = {
                left: e.pageX,
                top: e.pageY
            }, this.aspectRatio = "number" == typeof s.aspectRatio ? s.aspectRatio : this.originalSize.width / this.originalSize.height || 1;
            var l = t(".ui-resizable-" + this.axis).css("cursor");
            return t("body").css("cursor", "auto" == l ? this.axis + "-resize" : l), o.addClass("ui-resizable-resizing"), this._propagate("start", e), !0
        },
        _mouseDrag: function(e) {
            var i = this.helper,
                s = (this.options, this.originalMousePosition),
                n = this.axis,
                o = e.pageX - s.left || 0,
                r = e.pageY - s.top || 0,
                a = this._change[n];
            if (!a) return !1;
            var l = a.apply(this, [e, o, r]);
            t.browser.msie && t.browser.version, this.sizeDiff;
            return this._updateVirtualBoundaries(e.shiftKey), (this._aspectRatio || e.shiftKey) && (l = this._updateRatio(l, e)), l = this._respectSize(l, e), this._propagate("resize", e), i.css({
                top: this.position.top + "px",
                left: this.position.left + "px",
                width: this.size.width + "px",
                height: this.size.height + "px"
            }), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), this._updateCache(l), this._trigger("resize", e, this.ui()), !1
        },
        _mouseStop: function(e) {
            this.resizing = !1;
            var i = this.options,
                s = this;
            if (this._helper) {
                var n = this._proportionallyResizeElements,
                    o = n.length && /textarea/i.test(n[0].nodeName),
                    r = o && t.ui.hasScroll(n[0], "left") ? 0 : s.sizeDiff.height,
                    a = o ? 0 : s.sizeDiff.width,
                    l = {
                        width: s.helper.width() - a,
                        height: s.helper.height() - r
                    },
                    h = parseInt(s.element.css("left"), 10) + (s.position.left - s.originalPosition.left) || null,
                    c = parseInt(s.element.css("top"), 10) + (s.position.top - s.originalPosition.top) || null;
                i.animate || this.element.css(t.extend(l, {
                    top: c,
                    left: h
                })), s.helper.height(s.size.height), s.helper.width(s.size.width), this._helper && !i.animate && this._proportionallyResize()
            }
            return t("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", e), this._helper && this.helper.remove(), !1
        },
        _updateVirtualBoundaries: function(t) {
            var e, i, n, o, r, a = this.options;
            r = {
                minWidth: s(a.minWidth) ? a.minWidth : 0,
                maxWidth: s(a.maxWidth) ? a.maxWidth : 1 / 0,
                minHeight: s(a.minHeight) ? a.minHeight : 0,
                maxHeight: s(a.maxHeight) ? a.maxHeight : 1 / 0
            }, (this._aspectRatio || t) && (e = r.minHeight * this.aspectRatio, n = r.minWidth / this.aspectRatio, i = r.maxHeight * this.aspectRatio, o = r.maxWidth / this.aspectRatio, e > r.minWidth && (r.minWidth = e), n > r.minHeight && (r.minHeight = n), i < r.maxWidth && (r.maxWidth = i), o < r.maxHeight && (r.maxHeight = o)), this._vBoundaries = r
        },
        _updateCache: function(t) {
            this.options;
            this.offset = this.helper.offset(), s(t.left) && (this.position.left = t.left), s(t.top) && (this.position.top = t.top), s(t.height) && (this.size.height = t.height), s(t.width) && (this.size.width = t.width)
        },
        _updateRatio: function(t, e) {
            this.options;
            var i = this.position,
                n = this.size,
                o = this.axis;
            return s(t.height) ? t.width = t.height * this.aspectRatio : s(t.width) && (t.height = t.width / this.aspectRatio), "sw" == o && (t.left = i.left + (n.width - t.width), t.top = null), "nw" == o && (t.top = i.top + (n.height - t.height), t.left = i.left + (n.width - t.width)), t
        },
        _respectSize: function(t, e) {
            this.helper;
            var i = this._vBoundaries,
                n = (this._aspectRatio || e.shiftKey, this.axis),
                o = s(t.width) && i.maxWidth && i.maxWidth < t.width,
                r = s(t.height) && i.maxHeight && i.maxHeight < t.height,
                a = s(t.width) && i.minWidth && i.minWidth > t.width,
                l = s(t.height) && i.minHeight && i.minHeight > t.height;
            a && (t.width = i.minWidth), l && (t.height = i.minHeight), o && (t.width = i.maxWidth), r && (t.height = i.maxHeight);
            var h = this.originalPosition.left + this.originalSize.width,
                c = this.position.top + this.size.height,
                u = /sw|nw|w/.test(n),
                d = /nw|ne|n/.test(n);
            a && u && (t.left = h - i.minWidth), o && u && (t.left = h - i.maxWidth), l && d && (t.top = c - i.minHeight), r && d && (t.top = c - i.maxHeight);
            var p = !t.width && !t.height;
            return p && !t.left && t.top ? t.top = null : p && !t.top && t.left && (t.left = null), t
        },
        _proportionallyResize: function() {
            this.options;
            if (this._proportionallyResizeElements.length)
                for (var e = this.helper || this.element, i = 0; i < this._proportionallyResizeElements.length; i++) {
                    var s = this._proportionallyResizeElements[i];
                    if (!this.borderDif) {
                        var n = [s.css("borderTopWidth"), s.css("borderRightWidth"), s.css("borderBottomWidth"), s.css("borderLeftWidth")],
                            o = [s.css("paddingTop"), s.css("paddingRight"), s.css("paddingBottom"), s.css("paddingLeft")];
                        this.borderDif = t.map(n, function(t, e) {
                            return (parseInt(t, 10) || 0) + (parseInt(o[e], 10) || 0)
                        })
                    }
                    t.browser.msie && (t(e).is(":hidden") || t(e).parents(":hidden").length) || s.css({
                        height: e.height() - this.borderDif[0] - this.borderDif[2] || 0,
                        width: e.width() - this.borderDif[1] - this.borderDif[3] || 0
                    })
                }
        },
        _renderProxy: function() {
            var e = this.element,
                i = this.options;
            if (this.elementOffset = e.offset(), this._helper) {
                this.helper = this.helper || t('<div style="overflow:hidden;"></div>');
                var s = t.browser.msie && t.browser.version < 7,
                    n = s ? 1 : 0,
                    o = s ? 2 : -1;
                this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() + o,
                    height: this.element.outerHeight() + o,
                    position: "absolute",
                    left: this.elementOffset.left - n + "px",
                    top: this.elementOffset.top - n + "px",
                    zIndex: ++i.zIndex
                }), this.helper.appendTo("body").disableSelection()
            } else this.helper = this.element
        },
        _change: {
            e: function(t, e, i) {
                return {
                    width: this.originalSize.width + e
                }
            },
            w: function(t, e, i) {
                this.options;
                var s = this.originalSize;
                return {
                    left: this.originalPosition.left + e,
                    width: s.width - e
                }
            },
            n: function(t, e, i) {
                this.options;
                var s = this.originalSize;
                return {
                    top: this.originalPosition.top + i,
                    height: s.height - i
                }
            },
            s: function(t, e, i) {
                return {
                    height: this.originalSize.height + i
                }
            },
            se: function(e, i, s) {
                return t.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [e, i, s]))
            },
            sw: function(e, i, s) {
                return t.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [e, i, s]))
            },
            ne: function(e, i, s) {
                return t.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [e, i, s]))
            },
            nw: function(e, i, s) {
                return t.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [e, i, s]))
            }
        },
        _propagate: function(e, i) {
            t.ui.plugin.call(this, e, [i, this.ui()]), "resize" != e && this._trigger(e, i, this.ui())
        },
        plugins: {},
        ui: function() {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    }), t.extend(t.ui.resizable, {
        version: "1.8.22"
    }), t.ui.plugin.add("resizable", "alsoResize", {
        start: function(e, i) {
            var s = t(this).data("resizable").options,
                n = function(e) {
                    t(e).each(function() {
                        var e = t(this);
                        e.data("resizable-alsoresize", {
                            width: parseInt(e.width(), 10),
                            height: parseInt(e.height(), 10),
                            left: parseInt(e.css("left"), 10),
                            top: parseInt(e.css("top"), 10)
                        })
                    })
                };
            "object" != typeof s.alsoResize || s.alsoResize.parentNode ? n(s.alsoResize) : s.alsoResize.length ? (s.alsoResize = s.alsoResize[0], n(s.alsoResize)) : t.each(s.alsoResize, function(t) {
                n(t)
            })
        },
        resize: function(e, i) {
            var s = t(this).data("resizable"),
                n = s.options,
                o = s.originalSize,
                r = s.originalPosition,
                a = {
                    height: s.size.height - o.height || 0,
                    width: s.size.width - o.width || 0,
                    top: s.position.top - r.top || 0,
                    left: s.position.left - r.left || 0
                },
                l = function(e, s) {
                    t(e).each(function() {
                        var e = t(this),
                            n = t(this).data("resizable-alsoresize"),
                            o = {},
                            r = s && s.length ? s : e.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                        t.each(r, function(t, e) {
                            var i = (n[e] || 0) + (a[e] || 0);
                            i && i >= 0 && (o[e] = i || null)
                        }), e.css(o)
                    })
                };
            "object" != typeof n.alsoResize || n.alsoResize.nodeType ? l(n.alsoResize) : t.each(n.alsoResize, function(t, e) {
                l(t, e)
            })
        },
        stop: function(e, i) {
            t(this).removeData("resizable-alsoresize")
        }
    }), t.ui.plugin.add("resizable", "animate", {
        stop: function(e, i) {
            var s = t(this).data("resizable"),
                n = s.options,
                o = s._proportionallyResizeElements,
                r = o.length && /textarea/i.test(o[0].nodeName),
                a = r && t.ui.hasScroll(o[0], "left") ? 0 : s.sizeDiff.height,
                l = r ? 0 : s.sizeDiff.width,
                h = {
                    width: s.size.width - l,
                    height: s.size.height - a
                },
                c = parseInt(s.element.css("left"), 10) + (s.position.left - s.originalPosition.left) || null,
                u = parseInt(s.element.css("top"), 10) + (s.position.top - s.originalPosition.top) || null;
            s.element.animate(t.extend(h, u && c ? {
                top: u,
                left: c
            } : {}), {
                duration: n.animateDuration,
                easing: n.animateEasing,
                step: function() {
                    var i = {
                        width: parseInt(s.element.css("width"), 10),
                        height: parseInt(s.element.css("height"), 10),
                        top: parseInt(s.element.css("top"), 10),
                        left: parseInt(s.element.css("left"), 10)
                    };
                    o && o.length && t(o[0]).css({
                        width: i.width,
                        height: i.height
                    }), s._updateCache(i), s._propagate("resize", e)
                }
            })
        }
    }), t.ui.plugin.add("resizable", "containment", {
        start: function(e, s) {
            var n = t(this).data("resizable"),
                o = n.options,
                r = n.element,
                a = o.containment,
                l = a instanceof t ? a.get(0) : /parent/.test(a) ? r.parent().get(0) : a;
            if (l)
                if (n.containerElement = t(l), /document/.test(a) || a == document) n.containerOffset = {
                    left: 0,
                    top: 0
                }, n.containerPosition = {
                    left: 0,
                    top: 0
                }, n.parentData = {
                    element: t(document),
                    left: 0,
                    top: 0,
                    width: t(document).width(),
                    height: t(document).height() || document.body.parentNode.scrollHeight
                };
                else {
                    var h = t(l),
                        c = [];
                    t(["Top", "Right", "Left", "Bottom"]).each(function(t, e) {
                        c[t] = i(h.css("padding" + e))
                    }), n.containerOffset = h.offset(), n.containerPosition = h.position(), n.containerSize = {
                        height: h.innerHeight() - c[3],
                        width: h.innerWidth() - c[1]
                    };
                    var u = n.containerOffset,
                        d = n.containerSize.height,
                        p = n.containerSize.width,
                        f = t.ui.hasScroll(l, "left") ? l.scrollWidth : p,
                        g = t.ui.hasScroll(l) ? l.scrollHeight : d;
                    n.parentData = {
                        element: l,
                        left: u.left,
                        top: u.top,
                        width: f,
                        height: g
                    }
                }
        },
        resize: function(e, i) {
            var s = t(this).data("resizable"),
                n = s.options,
                o = (s.containerSize, s.containerOffset),
                r = (s.size, s.position),
                a = s._aspectRatio || e.shiftKey,
                l = {
                    top: 0,
                    left: 0
                },
                h = s.containerElement;
            h[0] != document && /static/.test(h.css("position")) && (l = o), r.left < (s._helper ? o.left : 0) && (s.size.width = s.size.width + (s._helper ? s.position.left - o.left : s.position.left - l.left), a && (s.size.height = s.size.width / s.aspectRatio), s.position.left = n.helper ? o.left : 0), r.top < (s._helper ? o.top : 0) && (s.size.height = s.size.height + (s._helper ? s.position.top - o.top : s.position.top), a && (s.size.width = s.size.height * s.aspectRatio), s.position.top = s._helper ? o.top : 0), s.offset.left = s.parentData.left + s.position.left, s.offset.top = s.parentData.top + s.position.top;
            var c = Math.abs((s._helper, s.offset.left - l.left + s.sizeDiff.width)),
                u = Math.abs((s._helper ? s.offset.top - l.top : s.offset.top - o.top) + s.sizeDiff.height),
                d = s.containerElement.get(0) == s.element.parent().get(0),
                p = /relative|absolute/.test(s.containerElement.css("position"));
            d && p && (c -= s.parentData.left), c + s.size.width >= s.parentData.width && (s.size.width = s.parentData.width - c, a && (s.size.height = s.size.width / s.aspectRatio)), u + s.size.height >= s.parentData.height && (s.size.height = s.parentData.height - u, a && (s.size.width = s.size.height * s.aspectRatio))
        },
        stop: function(e, i) {
            var s = t(this).data("resizable"),
                n = s.options,
                o = (s.position, s.containerOffset),
                r = s.containerPosition,
                a = s.containerElement,
                l = t(s.helper),
                h = l.offset(),
                c = l.outerWidth() - s.sizeDiff.width,
                u = l.outerHeight() - s.sizeDiff.height;
            s._helper && !n.animate && /relative/.test(a.css("position")) && t(this).css({
                left: h.left - r.left - o.left,
                width: c,
                height: u
            }), s._helper && !n.animate && /static/.test(a.css("position")) && t(this).css({
                left: h.left - r.left - o.left,
                width: c,
                height: u
            })
        }
    }), t.ui.plugin.add("resizable", "ghost", {
        start: function(e, i) {
            var s = t(this).data("resizable"),
                n = s.options,
                o = s.size;
            s.ghost = s.originalElement.clone(), s.ghost.css({
                opacity: .25,
                display: "block",
                position: "relative",
                height: o.height,
                width: o.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass("string" == typeof n.ghost ? n.ghost : ""), s.ghost.appendTo(s.helper)
        },
        resize: function(e, i) {
            var s = t(this).data("resizable");
            s.options;
            s.ghost && s.ghost.css({
                position: "relative",
                height: s.size.height,
                width: s.size.width
            })
        },
        stop: function(e, i) {
            var s = t(this).data("resizable");
            s.options;
            s.ghost && s.helper && s.helper.get(0).removeChild(s.ghost.get(0))
        }
    }), t.ui.plugin.add("resizable", "grid", {
        resize: function(e, i) {
            var s = t(this).data("resizable"),
                n = s.options,
                o = s.size,
                r = s.originalSize,
                a = s.originalPosition,
                l = s.axis;
            n._aspectRatio || e.shiftKey;
            n.grid = "number" == typeof n.grid ? [n.grid, n.grid] : n.grid;
            var h = Math.round((o.width - r.width) / (n.grid[0] || 1)) * (n.grid[0] || 1),
                c = Math.round((o.height - r.height) / (n.grid[1] || 1)) * (n.grid[1] || 1);
            /^(se|s|e)$/.test(l) ? (s.size.width = r.width + h, s.size.height = r.height + c) : /^(ne)$/.test(l) ? (s.size.width = r.width + h, s.size.height = r.height + c, s.position.top = a.top - c) : /^(sw)$/.test(l) ? (s.size.width = r.width + h, s.size.height = r.height + c, s.position.left = a.left - h) : (s.size.width = r.width + h, s.size.height = r.height + c, s.position.top = a.top - c, s.position.left = a.left - h)
        }
    });
    var i = function(t) {
            return parseInt(t, 10) || 0
        },
        s = function(t) {
            return !isNaN(parseInt(t, 10))
        }
}(jQuery),
function(t, e) {
    t.widget("ui.selectable", t.ui.mouse, {
        options: {
            appendTo: "body",
            autoRefresh: !0,
            distance: 0,
            filter: "*",
            tolerance: "touch"
        },
        _create: function() {
            var e, i = this;
            this.element.addClass("ui-selectable"), this.dragged = !1, this.refresh = function() {
                (e = t(i.options.filter, i.element[0])).addClass("ui-selectee"), e.each(function() {
                    var e = t(this),
                        i = e.offset();
                    t.data(this, "selectable-item", {
                        element: this,
                        $element: e,
                        left: i.left,
                        top: i.top,
                        right: i.left + e.outerWidth(),
                        bottom: i.top + e.outerHeight(),
                        startselected: !1,
                        selected: e.hasClass("ui-selected"),
                        selecting: e.hasClass("ui-selecting"),
                        unselecting: e.hasClass("ui-unselecting")
                    })
                })
            }, this.refresh(), this.selectees = e.addClass("ui-selectee"), this._mouseInit(), this.helper = t("<div class='ui-selectable-helper'></div>")
        },
        destroy: function() {
            return this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable"), this._mouseDestroy(), this
        },
        _mouseStart: function(e) {
            var i = this;
            if (this.opos = [e.pageX, e.pageY], !this.options.disabled) {
                var s = this.options;
                this.selectees = t(s.filter, this.element[0]), this._trigger("start", e), t(s.appendTo).append(this.helper), this.helper.css({
                    left: e.clientX,
                    top: e.clientY,
                    width: 0,
                    height: 0
                }), s.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
                    var s = t.data(this, "selectable-item");
                    s.startselected = !0, !e.metaKey && !e.ctrlKey && (s.$element.removeClass("ui-selected"), s.selected = !1, s.$element.addClass("ui-unselecting"), s.unselecting = !0, i._trigger("unselecting", e, {
                        unselecting: s.element
                    }))
                }), t(e.target).parents().andSelf().each(function() {
                    var s = t.data(this, "selectable-item");
                    if (s) {
                        var n = !e.metaKey && !e.ctrlKey || !s.$element.hasClass("ui-selected");
                        return s.$element.removeClass(n ? "ui-unselecting" : "ui-selected").addClass(n ? "ui-selecting" : "ui-unselecting"), s.unselecting = !n, s.selecting = n, s.selected = n, n ? i._trigger("selecting", e, {
                            selecting: s.element
                        }) : i._trigger("unselecting", e, {
                            unselecting: s.element
                        }), !1
                    }
                })
            }
        },
        _mouseDrag: function(e) {
            var i = this;
            if (this.dragged = !0, !this.options.disabled) {
                var s = this.options,
                    n = this.opos[0],
                    o = this.opos[1],
                    r = e.pageX,
                    a = e.pageY;
                if (n > r) {
                    var l = r;
                    r = n, n = l
                }
                if (o > a) {
                    l = a;
                    a = o, o = l
                }
                return this.helper.css({
                    left: n,
                    top: o,
                    width: r - n,
                    height: a - o
                }), this.selectees.each(function() {
                    var l = t.data(this, "selectable-item");
                    if (l && l.element != i.element[0]) {
                        var h = !1;
                        "touch" == s.tolerance ? h = !(l.left > r || l.right < n || l.top > a || l.bottom < o) : "fit" == s.tolerance && (h = l.left > n && l.right < r && l.top > o && l.bottom < a), h ? (l.selected && (l.$element.removeClass("ui-selected"), l.selected = !1), l.unselecting && (l.$element.removeClass("ui-unselecting"), l.unselecting = !1), l.selecting || (l.$element.addClass("ui-selecting"), l.selecting = !0, i._trigger("selecting", e, {
                            selecting: l.element
                        }))) : (l.selecting && ((e.metaKey || e.ctrlKey) && l.startselected ? (l.$element.removeClass("ui-selecting"), l.selecting = !1, l.$element.addClass("ui-selected"), l.selected = !0) : (l.$element.removeClass("ui-selecting"), l.selecting = !1, l.startselected && (l.$element.addClass("ui-unselecting"), l.unselecting = !0), i._trigger("unselecting", e, {
                            unselecting: l.element
                        }))), l.selected && !e.metaKey && !e.ctrlKey && !l.startselected && (l.$element.removeClass("ui-selected"), l.selected = !1, l.$element.addClass("ui-unselecting"), l.unselecting = !0, i._trigger("unselecting", e, {
                            unselecting: l.element
                        })))
                    }
                }), !1
            }
        },
        _mouseStop: function(e) {
            var i = this;
            this.dragged = !1;
            this.options;
            return t(".ui-unselecting", this.element[0]).each(function() {
                var s = t.data(this, "selectable-item");
                s.$element.removeClass("ui-unselecting"), s.unselecting = !1, s.startselected = !1, i._trigger("unselected", e, {
                    unselected: s.element
                })
            }), t(".ui-selecting", this.element[0]).each(function() {
                var s = t.data(this, "selectable-item");
                s.$element.removeClass("ui-selecting").addClass("ui-selected"), s.selecting = !1, s.selected = !0, s.startselected = !0, i._trigger("selected", e, {
                    selected: s.element
                })
            }), this._trigger("stop", e), this.helper.remove(), !1
        }
    }), t.extend(t.ui.selectable, {
        version: "1.8.22"
    })
}(jQuery),
function(t, e) {
    t.widget("ui.sortable", t.ui.mouse, {
        widgetEventPrefix: "sort",
        ready: !1,
        options: {
            appendTo: "parent",
            axis: !1,
            connectWith: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            dropOnEmpty: !0,
            forcePlaceholderSize: !1,
            forceHelperSize: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            items: "> *",
            opacity: !1,
            placeholder: !1,
            revert: !1,
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1e3
        },
        _create: function() {
            var t = this.options;
            this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = !!this.items.length && ("x" === t.axis || /left|right/.test(this.items[0].item.css("float")) || /inline|table-cell/.test(this.items[0].item.css("display"))), this.offset = this.element.offset(), this._mouseInit(), this.ready = !0
        },
        destroy: function() {
            t.Widget.prototype.destroy.call(this), this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
            for (var e = this.items.length - 1; e >= 0; e--) this.items[e].item.removeData(this.widgetName + "-item");
            return this
        },
        _setOption: function(e, i) {
            "disabled" === e ? (this.options[e] = i, this.widget()[i ? "addClass" : "removeClass"]("ui-sortable-disabled")) : t.Widget.prototype._setOption.apply(this, arguments)
        },
        _mouseCapture: function(e, i) {
            var s = this;
            if (this.reverting) return !1;
            if (this.options.disabled || "static" == this.options.type) return !1;
            this._refreshItems(e);
            var n = null,
                o = this;
            t(e.target).parents().each(function() {
                if (t.data(this, s.widgetName + "-item") == o) return n = t(this), !1
            });
            if (t.data(e.target, s.widgetName + "-item") == o && (n = t(e.target)), !n) return !1;
            if (this.options.handle && !i) {
                var r = !1;
                if (t(this.options.handle, n).find("*").andSelf().each(function() {
                        this == e.target && (r = !0)
                    }), !r) return !1
            }
            return this.currentItem = n, this._removeCurrentsFromItems(), !0
        },
        _mouseStart: function(e, i, s) {
            var n = this.options;
            if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(e), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
                    top: this.offset.top - this.margins.top,
                    left: this.offset.left - this.margins.left
                }, t.extend(this.offset, {
                    click: {
                        left: e.pageX - this.offset.left,
                        top: e.pageY - this.offset.top
                    },
                    parent: this._getParentOffset(),
                    relative: this._getRelativeOffset()
                }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(e), this.originalPageX = e.pageX, this.originalPageY = e.pageY, n.cursorAt && this._adjustOffsetFromHelper(n.cursorAt), this.domPosition = {
                    prev: this.currentItem.prev()[0],
                    parent: this.currentItem.parent()[0]
                }, this.helper[0] != this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), n.containment && this._setContainment(), n.cursor && (t("body").css("cursor") && (this._storedCursor = t("body").css("cursor")), t("body").css("cursor", n.cursor)), n.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", n.opacity)), n.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", n.zIndex)), this.scrollParent[0] != document && "HTML" != this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", e, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !s)
                for (var o = this.containers.length - 1; o >= 0; o--) this.containers[o]._trigger("activate", e, this._uiHash(this));
            return t.ui.ddmanager && (t.ui.ddmanager.current = this), t.ui.ddmanager && !n.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(e), !0
        },
        _mouseDrag: function(e) {
            if (this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll) {
                var i = this.options,
                    s = !1;
                this.scrollParent[0] != document && "HTML" != this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - e.pageY < i.scrollSensitivity ? this.scrollParent[0].scrollTop = s = this.scrollParent[0].scrollTop + i.scrollSpeed : e.pageY - this.overflowOffset.top < i.scrollSensitivity && (this.scrollParent[0].scrollTop = s = this.scrollParent[0].scrollTop - i.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - e.pageX < i.scrollSensitivity ? this.scrollParent[0].scrollLeft = s = this.scrollParent[0].scrollLeft + i.scrollSpeed : e.pageX - this.overflowOffset.left < i.scrollSensitivity && (this.scrollParent[0].scrollLeft = s = this.scrollParent[0].scrollLeft - i.scrollSpeed)) : (e.pageY - t(document).scrollTop() < i.scrollSensitivity ? s = t(document).scrollTop(t(document).scrollTop() - i.scrollSpeed) : t(window).height() - (e.pageY - t(document).scrollTop()) < i.scrollSensitivity && (s = t(document).scrollTop(t(document).scrollTop() + i.scrollSpeed)), e.pageX - t(document).scrollLeft() < i.scrollSensitivity ? s = t(document).scrollLeft(t(document).scrollLeft() - i.scrollSpeed) : t(window).width() - (e.pageX - t(document).scrollLeft()) < i.scrollSensitivity && (s = t(document).scrollLeft(t(document).scrollLeft() + i.scrollSpeed))), !1 !== s && t.ui.ddmanager && !i.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e)
            }
            this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" == this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" == this.options.axis || (this.helper[0].style.top = this.position.top + "px");
            for (var n = this.items.length - 1; n >= 0; n--) {
                var o = this.items[n],
                    r = o.item[0],
                    a = this._intersectsWithPointer(o);
                if (a && !(r == this.currentItem[0] || this.placeholder[1 == a ? "next" : "prev"]()[0] == r || t.ui.contains(this.placeholder[0], r) || "semi-dynamic" == this.options.type && t.ui.contains(this.element[0], r))) {
                    if (this.direction = 1 == a ? "down" : "up", "pointer" != this.options.tolerance && !this._intersectsWithSides(o)) break;
                    this._rearrange(e, o), this._trigger("change", e, this._uiHash());
                    break
                }
            }
            return this._contactContainers(e), t.ui.ddmanager && t.ui.ddmanager.drag(this, e), this._trigger("sort", e, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
        },
        _mouseStop: function(e, i) {
            if (e) {
                if (t.ui.ddmanager && !this.options.dropBehaviour && t.ui.ddmanager.drop(this, e), this.options.revert) {
                    var s = this,
                        n = s.placeholder.offset();
                    s.reverting = !0, t(this.helper).animate({
                        left: n.left - this.offset.parent.left - s.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
                        top: n.top - this.offset.parent.top - s.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
                    }, parseInt(this.options.revert, 10) || 500, function() {
                        s._clear(e)
                    })
                } else this._clear(e, i);
                return !1
            }
        },
        cancel: function() {
            if (this.dragging) {
                this._mouseUp({
                    target: null
                }), "original" == this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                for (var e = this.containers.length - 1; e >= 0; e--) this.containers[e]._trigger("deactivate", null, this._uiHash(this)), this.containers[e].containerCache.over && (this.containers[e]._trigger("out", null, this._uiHash(this)), this.containers[e].containerCache.over = 0)
            }
            return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" != this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), t.extend(this, {
                helper: null,
                dragging: !1,
                reverting: !1,
                _noFinalSort: null
            }), this.domPosition.prev ? t(this.domPosition.prev).after(this.currentItem) : t(this.domPosition.parent).prepend(this.currentItem)), this
        },
        serialize: function(e) {
            var i = this._getItemsAsjQuery(e && e.connected),
                s = [];
            return e = e || {}, t(i).each(function() {
                var i = (t(e.item || this).attr(e.attribute || "id") || "").match(e.expression || /(.+)[-=_](.+)/);
                i && s.push((e.key || i[1] + "[]") + "=" + (e.key && e.expression ? i[1] : i[2]))
            }), !s.length && e.key && s.push(e.key + "="), s.join("&")
        },
        toArray: function(e) {
            var i = this._getItemsAsjQuery(e && e.connected),
                s = [];
            return e = e || {}, i.each(function() {
                s.push(t(e.item || this).attr(e.attribute || "id") || "")
            }), s
        },
        _intersectsWith: function(t) {
            var e = this.positionAbs.left,
                i = e + this.helperProportions.width,
                s = this.positionAbs.top,
                n = s + this.helperProportions.height,
                o = t.left,
                r = o + t.width,
                a = t.top,
                l = a + t.height,
                h = this.offset.click.top,
                c = this.offset.click.left,
                u = s + h > a && s + h < l && e + c > o && e + c < r;
            return "pointer" == this.options.tolerance || this.options.forcePointerForContainers || "pointer" != this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > t[this.floating ? "width" : "height"] ? u : o < e + this.helperProportions.width / 2 && i - this.helperProportions.width / 2 < r && a < s + this.helperProportions.height / 2 && n - this.helperProportions.height / 2 < l
        },
        _intersectsWithPointer: function(e) {
            var i = "x" === this.options.axis || t.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, e.top, e.height),
                s = "y" === this.options.axis || t.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, e.left, e.width),
                n = i && s,
                o = this._getDragVerticalDirection(),
                r = this._getDragHorizontalDirection();
            return !!n && (this.floating ? r && "right" == r || "down" == o ? 2 : 1 : o && ("down" == o ? 2 : 1))
        },
        _intersectsWithSides: function(e) {
            var i = t.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, e.top + e.height / 2, e.height),
                s = t.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, e.left + e.width / 2, e.width),
                n = this._getDragVerticalDirection(),
                o = this._getDragHorizontalDirection();
            return this.floating && o ? "right" == o && s || "left" == o && !s : n && ("down" == n && i || "up" == n && !i)
        },
        _getDragVerticalDirection: function() {
            var t = this.positionAbs.top - this.lastPositionAbs.top;
            return 0 != t && (t > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function() {
            var t = this.positionAbs.left - this.lastPositionAbs.left;
            return 0 != t && (t > 0 ? "right" : "left")
        },
        refresh: function(t) {
            return this._refreshItems(t), this.refreshPositions(), this
        },
        _connectWith: function() {
            var t = this.options;
            return t.connectWith.constructor == String ? [t.connectWith] : t.connectWith
        },
        _getItemsAsjQuery: function(e) {
            var i = [],
                s = [],
                n = this._connectWith();
            if (n && e)
                for (var o = n.length - 1; o >= 0; o--)
                    for (var r = t(n[o]), a = r.length - 1; a >= 0; a--) {
                        var l = t.data(r[a], this.widgetName);
                        l && l != this && !l.options.disabled && s.push([t.isFunction(l.options.items) ? l.options.items.call(l.element) : t(l.options.items, l.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), l])
                    }
            s.push([t.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : t(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
            for (o = s.length - 1; o >= 0; o--) s[o][0].each(function() {
                i.push(this)
            });
            return t(i)
        },
        _removeCurrentsFromItems: function() {
            for (var t = this.currentItem.find(":data(" + this.widgetName + "-item)"), e = 0; e < this.items.length; e++)
                for (var i = 0; i < t.length; i++) t[i] == this.items[e].item[0] && this.items.splice(e, 1)
        },
        _refreshItems: function(e) {
            this.items = [], this.containers = [this];
            var i = this.items,
                s = [
                    [t.isFunction(this.options.items) ? this.options.items.call(this.element[0], e, {
                        item: this.currentItem
                    }) : t(this.options.items, this.element), this]
                ],
                n = this._connectWith();
            if (n && this.ready)
                for (var o = n.length - 1; o >= 0; o--)
                    for (var r = t(n[o]), a = r.length - 1; a >= 0; a--) {
                        var l = t.data(r[a], this.widgetName);
                        l && l != this && !l.options.disabled && (s.push([t.isFunction(l.options.items) ? l.options.items.call(l.element[0], e, {
                            item: this.currentItem
                        }) : t(l.options.items, l.element), l]), this.containers.push(l))
                    }
            for (o = s.length - 1; o >= 0; o--)
                for (var h = s[o][1], c = s[o][0], u = (a = 0, c.length); a < u; a++) {
                    var d = t(c[a]);
                    d.data(this.widgetName + "-item", h), i.push({
                        item: d,
                        instance: h,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
                }
        },
        refreshPositions: function(e) {
            this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
            for (var i = this.items.length - 1; i >= 0; i--) {
                var s = this.items[i];
                if (s.instance == this.currentContainer || !this.currentContainer || s.item[0] == this.currentItem[0]) {
                    var n = this.options.toleranceElement ? t(this.options.toleranceElement, s.item) : s.item;
                    e || (s.width = n.outerWidth(), s.height = n.outerHeight());
                    var o = n.offset();
                    s.left = o.left, s.top = o.top
                }
            }
            if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
            else
                for (i = this.containers.length - 1; i >= 0; i--) {
                    o = this.containers[i].element.offset();
                    this.containers[i].containerCache.left = o.left, this.containers[i].containerCache.top = o.top, this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), this.containers[i].containerCache.height = this.containers[i].element.outerHeight()
                }
            return this
        },
        _createPlaceholder: function(e) {
            var i = e || this,
                s = i.options;
            if (!s.placeholder || s.placeholder.constructor == String) {
                var n = s.placeholder;
                s.placeholder = {
                    element: function() {
                        var e = t(document.createElement(i.currentItem[0].nodeName)).addClass(n || i.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
                        return n || (e.style.visibility = "hidden"), e
                    },
                    update: function(t, e) {
                        n && !s.forcePlaceholderSize || (e.height() || e.height(i.currentItem.innerHeight() - parseInt(i.currentItem.css("paddingTop") || 0, 10) - parseInt(i.currentItem.css("paddingBottom") || 0, 10)), e.width() || e.width(i.currentItem.innerWidth() - parseInt(i.currentItem.css("paddingLeft") || 0, 10) - parseInt(i.currentItem.css("paddingRight") || 0, 10)))
                    }
                }
            }
            i.placeholder = t(s.placeholder.element.call(i.element, i.currentItem)), i.currentItem.after(i.placeholder), s.placeholder.update(i, i.placeholder)
        },
        _contactContainers: function(e) {
            for (var i = null, s = null, n = this.containers.length - 1; n >= 0; n--)
                if (!t.ui.contains(this.currentItem[0], this.containers[n].element[0]))
                    if (this._intersectsWith(this.containers[n].containerCache)) {
                        if (i && t.ui.contains(this.containers[n].element[0], i.element[0])) continue;
                        i = this.containers[n], s = n
                    } else this.containers[n].containerCache.over && (this.containers[n]._trigger("out", e, this._uiHash(this)), this.containers[n].containerCache.over = 0);
            if (i)
                if (1 === this.containers.length) this.containers[s]._trigger("over", e, this._uiHash(this)), this.containers[s].containerCache.over = 1;
                else if (this.currentContainer != this.containers[s]) {
                for (var o = 1e4, r = null, a = this.positionAbs[this.containers[s].floating ? "left" : "top"], l = this.items.length - 1; l >= 0; l--)
                    if (t.ui.contains(this.containers[s].element[0], this.items[l].item[0])) {
                        var h = this.containers[s].floating ? this.items[l].item.offset().left : this.items[l].item.offset().top;
                        Math.abs(h - a) < o && (o = Math.abs(h - a), r = this.items[l], this.direction = h - a > 0 ? "down" : "up")
                    } if (!r && !this.options.dropOnEmpty) return;
                this.currentContainer = this.containers[s], r ? this._rearrange(e, r, null, !0) : this._rearrange(e, null, this.containers[s].element, !0), this._trigger("change", e, this._uiHash()), this.containers[s]._trigger("change", e, this._uiHash(this)), this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[s]._trigger("over", e, this._uiHash(this)), this.containers[s].containerCache.over = 1
            }
        },
        _createHelper: function(e) {
            var i = this.options,
                s = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e, this.currentItem])) : "clone" == i.helper ? this.currentItem.clone() : this.currentItem;
            return s.parents("body").length || t("parent" != i.appendTo ? i.appendTo : this.currentItem[0].parentNode)[0].appendChild(s[0]), s[0] == this.currentItem[0] && (this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            }), ("" == s[0].style.width || i.forceHelperSize) && s.width(this.currentItem.width()), ("" == s[0].style.height || i.forceHelperSize) && s.height(this.currentItem.height()), s
        },
        _adjustOffsetFromHelper: function(e) {
            "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
                left: +e[0],
                top: +e[1] || 0
            }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var e = this.offsetParent.offset();
            return "absolute" == this.cssPosition && this.scrollParent[0] != document && t.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && "html" == this.offsetParent[0].tagName.toLowerCase() && t.browser.msie) && (e = {
                top: 0,
                left: 0
            }), {
                top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if ("relative" == this.cssPosition) {
                var t = this.currentItem.position();
                return {
                    top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var e = this.options;
            if ("parent" == e.containment && (e.containment = this.helper[0].parentNode), "document" != e.containment && "window" != e.containment || (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, t("document" == e.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (t("document" == e.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), !/^(document|window|parent)$/.test(e.containment)) {
                var i = t(e.containment)[0],
                    s = t(e.containment).offset(),
                    n = "hidden" != t(i).css("overflow");
                this.containment = [s.left + (parseInt(t(i).css("borderLeftWidth"), 10) || 0) + (parseInt(t(i).css("paddingLeft"), 10) || 0) - this.margins.left, s.top + (parseInt(t(i).css("borderTopWidth"), 10) || 0) + (parseInt(t(i).css("paddingTop"), 10) || 0) - this.margins.top, s.left + (n ? Math.max(i.scrollWidth, i.offsetWidth) : i.offsetWidth) - (parseInt(t(i).css("borderLeftWidth"), 10) || 0) - (parseInt(t(i).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, s.top + (n ? Math.max(i.scrollHeight, i.offsetHeight) : i.offsetHeight) - (parseInt(t(i).css("borderTopWidth"), 10) || 0) - (parseInt(t(i).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            }
        },
        _convertPositionTo: function(e, i) {
            i || (i = this.position);
            var s = "absolute" == e ? 1 : -1,
                n = (this.options, "absolute" != this.cssPosition || this.scrollParent[0] != document && t.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent),
                o = /(html|body)/i.test(n[0].tagName);
            return {
                top: i.top + this.offset.relative.top * s + this.offset.parent.top * s - (t.browser.safari && "fixed" == this.cssPosition ? 0 : ("fixed" == this.cssPosition ? -this.scrollParent.scrollTop() : o ? 0 : n.scrollTop()) * s),
                left: i.left + this.offset.relative.left * s + this.offset.parent.left * s - (t.browser.safari && "fixed" == this.cssPosition ? 0 : ("fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() : o ? 0 : n.scrollLeft()) * s)
            }
        },
        _generatePosition: function(e) {
            var i = this.options,
                s = "absolute" != this.cssPosition || this.scrollParent[0] != document && t.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                n = /(html|body)/i.test(s[0].tagName);
            "relative" == this.cssPosition && (this.scrollParent[0] == document || this.scrollParent[0] == this.offsetParent[0]) && (this.offset.relative = this._getRelativeOffset());
            var o = e.pageX,
                r = e.pageY;
            if (this.originalPosition && (this.containment && (e.pageX - this.offset.click.left < this.containment[0] && (o = this.containment[0] + this.offset.click.left), e.pageY - this.offset.click.top < this.containment[1] && (r = this.containment[1] + this.offset.click.top), e.pageX - this.offset.click.left > this.containment[2] && (o = this.containment[2] + this.offset.click.left), e.pageY - this.offset.click.top > this.containment[3] && (r = this.containment[3] + this.offset.click.top)), i.grid)) {
                var a = this.originalPageY + Math.round((r - this.originalPageY) / i.grid[1]) * i.grid[1];
                r = this.containment && (a - this.offset.click.top < this.containment[1] || a - this.offset.click.top > this.containment[3]) ? a - this.offset.click.top < this.containment[1] ? a + i.grid[1] : a - i.grid[1] : a;
                var l = this.originalPageX + Math.round((o - this.originalPageX) / i.grid[0]) * i.grid[0];
                o = this.containment && (l - this.offset.click.left < this.containment[0] || l - this.offset.click.left > this.containment[2]) ? l - this.offset.click.left < this.containment[0] ? l + i.grid[0] : l - i.grid[0] : l
            }
            return {
                top: r - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (t.browser.safari && "fixed" == this.cssPosition ? 0 : "fixed" == this.cssPosition ? -this.scrollParent.scrollTop() : n ? 0 : s.scrollTop()),
                left: o - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (t.browser.safari && "fixed" == this.cssPosition ? 0 : "fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() : n ? 0 : s.scrollLeft())
            }
        },
        _rearrange: function(t, e, i, s) {
            i ? i[0].appendChild(this.placeholder[0]) : e.item[0].parentNode.insertBefore(this.placeholder[0], "down" == this.direction ? e.item[0] : e.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
            var n = this,
                o = this.counter;
            window.setTimeout(function() {
                o == n.counter && n.refreshPositions(!s)
            }, 0)
        },
        _clear: function(e, i) {
            this.reverting = !1;
            var s = [];
            if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] == this.currentItem[0]) {
                for (var n in this._storedCSS) "auto" != this._storedCSS[n] && "static" != this._storedCSS[n] || (this._storedCSS[n] = "");
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else this.currentItem.show();
            if (this.fromOutside && !i && s.push(function(t) {
                    this._trigger("receive", t, this._uiHash(this.fromOutside))
                }), (this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !i && s.push(function(t) {
                    this._trigger("update", t, this._uiHash())
                }), !t.ui.contains(this.element[0], this.currentItem[0])) {
                i || s.push(function(t) {
                    this._trigger("remove", t, this._uiHash())
                });
                for (n = this.containers.length - 1; n >= 0; n--) t.ui.contains(this.containers[n].element[0], this.currentItem[0]) && !i && (s.push(function(t) {
                    return function(e) {
                        t._trigger("receive", e, this._uiHash(this))
                    }
                }.call(this, this.containers[n])), s.push(function(t) {
                    return function(e) {
                        t._trigger("update", e, this._uiHash(this))
                    }
                }.call(this, this.containers[n])))
            }
            for (n = this.containers.length - 1; n >= 0; n--) i || s.push(function(t) {
                return function(e) {
                    t._trigger("deactivate", e, this._uiHash(this))
                }
            }.call(this, this.containers[n])), this.containers[n].containerCache.over && (s.push(function(t) {
                return function(e) {
                    t._trigger("out", e, this._uiHash(this))
                }
            }.call(this, this.containers[n])), this.containers[n].containerCache.over = 0);
            if (this._storedCursor && t("body").css("cursor", this._storedCursor), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" == this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, this.cancelHelperRemoval) {
                if (!i) {
                    this._trigger("beforeStop", e, this._uiHash());
                    for (n = 0; n < s.length; n++) s[n].call(this, e);
                    this._trigger("stop", e, this._uiHash())
                }
                return this.fromOutside = !1, !1
            }
            if (i || this._trigger("beforeStop", e, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] != this.currentItem[0] && this.helper.remove(), this.helper = null, !i) {
                for (n = 0; n < s.length; n++) s[n].call(this, e);
                this._trigger("stop", e, this._uiHash())
            }
            return this.fromOutside = !1, !0
        },
        _trigger: function() {
            !1 === t.Widget.prototype._trigger.apply(this, arguments) && this.cancel()
        },
        _uiHash: function(e) {
            var i = e || this;
            return {
                helper: i.helper,
                placeholder: i.placeholder || t([]),
                position: i.position,
                originalPosition: i.originalPosition,
                offset: i.positionAbs,
                item: i.currentItem,
                sender: e ? e.element : null
            }
        }
    }), t.extend(t.ui.sortable, {
        version: "1.8.22"
    })
}(jQuery), jQuery.effects || function(t, e) {
        function i(e) {
            var i;
            return e && e.constructor == Array && 3 == e.length ? e : (i = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(e)) ? [parseInt(i[1], 10), parseInt(i[2], 10), parseInt(i[3], 10)] : (i = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(e)) ? [2.55 * parseFloat(i[1]), 2.55 * parseFloat(i[2]), 2.55 * parseFloat(i[3])] : (i = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(e)) ? [parseInt(i[1], 16), parseInt(i[2], 16), parseInt(i[3], 16)] : (i = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(e)) ? [parseInt(i[1] + i[1], 16), parseInt(i[2] + i[2], 16), parseInt(i[3] + i[3], 16)] : (i = /rgba\(0, 0, 0, 0\)/.exec(e)) ? a.transparent : a[t.trim(e).toLowerCase()]
        }

        function s() {
            var t, e = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle,
                i = {};
            if (e && e.length && e[0] && e[e[0]])
                for (var s = e.length; s--;) "string" == typeof e[t = e[s]] && (i[t.replace(/\-(\w)/g, function(t, e) {
                    return e.toUpperCase()
                })] = e[t]);
            else
                for (t in e) "string" == typeof e[t] && (i[t] = e[t]);
            return i
        }

        function n(e) {
            var i, s;
            for (i in e)(null == (s = e[i]) || t.isFunction(s) || i in h || /scrollbar/.test(i) || !/color/i.test(i) && isNaN(parseFloat(s))) && delete e[i];
            return e
        }

        function o(e, i, s, n) {
            return "object" == typeof e && (n = i, s = null, e = (i = e).effect), t.isFunction(i) && (n = i, s = null, i = {}), ("number" == typeof i || t.fx.speeds[i]) && (n = s, s = i, i = {}), t.isFunction(s) && (n = s, s = null), i = i || {}, s = s || i.duration, [e, i, s = t.fx.off ? 0 : "number" == typeof s ? s : s in t.fx.speeds ? t.fx.speeds[s] : t.fx.speeds._default, n = n || i.complete]
        }

        function r(e) {
            return !(e && "number" != typeof e && !t.fx.speeds[e]) || "string" == typeof e && !t.effects[e]
        }
        t.effects = {}, t.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "borderColor", "color", "outlineColor"], function(e, s) {
            t.fx.step[s] = function(e) {
                e.colorInit || (e.start = function(e, s) {
                    var n;
                    do {
                        if ("" != (n = (t.curCSS || t.css)(e, s)) && "transparent" != n || t.nodeName(e, "body")) break;
                        s = "backgroundColor"
                    } while (e = e.parentNode);
                    return i(n)
                }(e.elem, s), e.end = i(e.end), e.colorInit = !0), e.elem.style[s] = "rgb(" + Math.max(Math.min(parseInt(e.pos * (e.end[0] - e.start[0]) + e.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt(e.pos * (e.end[1] - e.start[1]) + e.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt(e.pos * (e.end[2] - e.start[2]) + e.start[2], 10), 255), 0) + ")"
            }
        });
        var a = {
                aqua: [0, 255, 255],
                azure: [240, 255, 255],
                beige: [245, 245, 220],
                black: [0, 0, 0],
                blue: [0, 0, 255],
                brown: [165, 42, 42],
                cyan: [0, 255, 255],
                darkblue: [0, 0, 139],
                darkcyan: [0, 139, 139],
                darkgrey: [169, 169, 169],
                darkgreen: [0, 100, 0],
                darkkhaki: [189, 183, 107],
                darkmagenta: [139, 0, 139],
                darkolivegreen: [85, 107, 47],
                darkorange: [255, 140, 0],
                darkorchid: [153, 50, 204],
                darkred: [139, 0, 0],
                darksalmon: [233, 150, 122],
                darkviolet: [148, 0, 211],
                fuchsia: [255, 0, 255],
                gold: [255, 215, 0],
                green: [0, 128, 0],
                indigo: [75, 0, 130],
                khaki: [240, 230, 140],
                lightblue: [173, 216, 230],
                lightcyan: [224, 255, 255],
                lightgreen: [144, 238, 144],
                lightgrey: [211, 211, 211],
                lightpink: [255, 182, 193],
                lightyellow: [255, 255, 224],
                lime: [0, 255, 0],
                magenta: [255, 0, 255],
                maroon: [128, 0, 0],
                navy: [0, 0, 128],
                olive: [128, 128, 0],
                orange: [255, 165, 0],
                pink: [255, 192, 203],
                purple: [128, 0, 128],
                violet: [128, 0, 128],
                red: [255, 0, 0],
                silver: [192, 192, 192],
                white: [255, 255, 255],
                yellow: [255, 255, 0],
                transparent: [255, 255, 255]
            },
            l = ["add", "remove", "toggle"],
            h = {
                border: 1,
                borderBottom: 1,
                borderColor: 1,
                borderLeft: 1,
                borderRight: 1,
                borderTop: 1,
                borderWidth: 1,
                margin: 1,
                padding: 1
            };
        t.effects.animateClass = function(e, i, o, r) {
            return t.isFunction(o) && (r = o, o = null), this.queue(function() {
                var a, h = t(this),
                    c = h.attr("style") || " ",
                    u = n(s.call(this)),
                    d = h.attr("class") || "";
                t.each(l, function(t, i) {
                    e[i] && h[i + "Class"](e[i])
                }), a = n(s.call(this)), h.attr("class", d), h.animate(function(t, e) {
                    var i, s = {
                        _: 0
                    };
                    for (i in e) t[i] != e[i] && (s[i] = e[i]);
                    return s
                }(u, a), {
                    queue: !1,
                    duration: i,
                    easing: o,
                    complete: function() {
                        t.each(l, function(t, i) {
                            e[i] && h[i + "Class"](e[i])
                        }), "object" == typeof h.attr("style") ? (h.attr("style").cssText = "", h.attr("style").cssText = c) : h.attr("style", c), r && r.apply(this, arguments), t.dequeue(this)
                    }
                })
            })
        }, t.fn.extend({
            _addClass: t.fn.addClass,
            addClass: function(e, i, s, n) {
                return i ? t.effects.animateClass.apply(this, [{
                    add: e
                }, i, s, n]) : this._addClass(e)
            },
            _removeClass: t.fn.removeClass,
            removeClass: function(e, i, s, n) {
                return i ? t.effects.animateClass.apply(this, [{
                    remove: e
                }, i, s, n]) : this._removeClass(e)
            },
            _toggleClass: t.fn.toggleClass,
            toggleClass: function(i, s, n, o, r) {
                return "boolean" == typeof s || s === e ? n ? t.effects.animateClass.apply(this, [s ? {
                    add: i
                } : {
                    remove: i
                }, n, o, r]) : this._toggleClass(i, s) : t.effects.animateClass.apply(this, [{
                    toggle: i
                }, s, n, o])
            },
            switchClass: function(e, i, s, n, o) {
                return t.effects.animateClass.apply(this, [{
                    add: i,
                    remove: e
                }, s, n, o])
            }
        }), t.extend(t.effects, {
            version: "1.8.22",
            save: function(t, e) {
                for (var i = 0; i < e.length; i++) null !== e[i] && t.data("ec.storage." + e[i], t[0].style[e[i]])
            },
            restore: function(t, e) {
                for (var i = 0; i < e.length; i++) null !== e[i] && t.css(e[i], t.data("ec.storage." + e[i]))
            },
            setMode: function(t, e) {
                return "toggle" == e && (e = t.is(":hidden") ? "show" : "hide"), e
            },
            getBaseline: function(t, e) {
                var i, s;
                switch (t[0]) {
                    case "top":
                        i = 0;
                        break;
                    case "middle":
                        i = .5;
                        break;
                    case "bottom":
                        i = 1;
                        break;
                    default:
                        i = t[0] / e.height
                }
                switch (t[1]) {
                    case "left":
                        s = 0;
                        break;
                    case "center":
                        s = .5;
                        break;
                    case "right":
                        s = 1;
                        break;
                    default:
                        s = t[1] / e.width
                }
                return {
                    x: s,
                    y: i
                }
            },
            createWrapper: function(e) {
                if (e.parent().is(".ui-effects-wrapper")) return e.parent();
                var i = {
                        width: e.outerWidth(!0),
                        height: e.outerHeight(!0),
                        float: e.css("float")
                    },
                    s = t("<div></div>").addClass("ui-effects-wrapper").css({
                        fontSize: "100%",
                        background: "transparent",
                        border: "none",
                        margin: 0,
                        padding: 0
                    }),
                    n = document.activeElement;
                try {
                    n.id
                } catch (t) {
                    n = document.body
                }
                return e.wrap(s), (e[0] === n || t.contains(e[0], n)) && t(n).focus(), s = e.parent(), "static" == e.css("position") ? (s.css({
                    position: "relative"
                }), e.css({
                    position: "relative"
                })) : (t.extend(i, {
                    position: e.css("position"),
                    zIndex: e.css("z-index")
                }), t.each(["top", "left", "bottom", "right"], function(t, s) {
                    i[s] = e.css(s), isNaN(parseInt(i[s], 10)) && (i[s] = "auto")
                }), e.css({
                    position: "relative",
                    top: 0,
                    left: 0,
                    right: "auto",
                    bottom: "auto"
                })), s.css(i).show()
            },
            removeWrapper: function(e) {
                var i, s = document.activeElement;
                return e.parent().is(".ui-effects-wrapper") ? (i = e.parent().replaceWith(e), (e[0] === s || t.contains(e[0], s)) && t(s).focus(), i) : e
            },
            setTransition: function(e, i, s, n) {
                return n = n || {}, t.each(i, function(t, i) {
                    var o = e.cssUnit(i);
                    o[0] > 0 && (n[i] = o[0] * s + o[1])
                }), n
            }
        }), t.fn.extend({
            effect: function(e, i, s, n) {
                var r = o.apply(this, arguments),
                    a = {
                        options: r[1],
                        duration: r[2],
                        callback: r[3]
                    },
                    l = a.options.mode,
                    h = t.effects[e];
                return t.fx.off || !h ? l ? this[l](a.duration, a.callback) : this.each(function() {
                    a.callback && a.callback.call(this)
                }) : h.call(this, a)
            },
            _show: t.fn.show,
            show: function(t) {
                if (r(t)) return this._show.apply(this, arguments);
                var e = o.apply(this, arguments);
                return e[1].mode = "show", this.effect.apply(this, e)
            },
            _hide: t.fn.hide,
            hide: function(t) {
                if (r(t)) return this._hide.apply(this, arguments);
                var e = o.apply(this, arguments);
                return e[1].mode = "hide", this.effect.apply(this, e)
            },
            __toggle: t.fn.toggle,
            toggle: function(e) {
                if (r(e) || "boolean" == typeof e || t.isFunction(e)) return this.__toggle.apply(this, arguments);
                var i = o.apply(this, arguments);
                return i[1].mode = "toggle", this.effect.apply(this, i)
            },
            cssUnit: function(e) {
                var i = this.css(e),
                    s = [];
                return t.each(["em", "px", "%", "pt"], function(t, e) {
                    i.indexOf(e) > 0 && (s = [parseFloat(i), e])
                }), s
            }
        }), t.easing.jswing = t.easing.swing, t.extend(t.easing, {
            def: "easeOutQuad",
            swing: function(e, i, s, n, o) {
                return t.easing[t.easing.def](e, i, s, n, o)
            },
            easeInQuad: function(t, e, i, s, n) {
                return s * (e /= n) * e + i
            },
            easeOutQuad: function(t, e, i, s, n) {
                return -s * (e /= n) * (e - 2) + i
            },
            easeInOutQuad: function(t, e, i, s, n) {
                return (e /= n / 2) < 1 ? s / 2 * e * e + i : -s / 2 * (--e * (e - 2) - 1) + i
            },
            easeInCubic: function(t, e, i, s, n) {
                return s * (e /= n) * e * e + i
            },
            easeOutCubic: function(t, e, i, s, n) {
                return s * ((e = e / n - 1) * e * e + 1) + i
            },
            easeInOutCubic: function(t, e, i, s, n) {
                return (e /= n / 2) < 1 ? s / 2 * e * e * e + i : s / 2 * ((e -= 2) * e * e + 2) + i
            },
            easeInQuart: function(t, e, i, s, n) {
                return s * (e /= n) * e * e * e + i
            },
            easeOutQuart: function(t, e, i, s, n) {
                return -s * ((e = e / n - 1) * e * e * e - 1) + i
            },
            easeInOutQuart: function(t, e, i, s, n) {
                return (e /= n / 2) < 1 ? s / 2 * e * e * e * e + i : -s / 2 * ((e -= 2) * e * e * e - 2) + i
            },
            easeInQuint: function(t, e, i, s, n) {
                return s * (e /= n) * e * e * e * e + i
            },
            easeOutQuint: function(t, e, i, s, n) {
                return s * ((e = e / n - 1) * e * e * e * e + 1) + i
            },
            easeInOutQuint: function(t, e, i, s, n) {
                return (e /= n / 2) < 1 ? s / 2 * e * e * e * e * e + i : s / 2 * ((e -= 2) * e * e * e * e + 2) + i
            },
            easeInSine: function(t, e, i, s, n) {
                return -s * Math.cos(e / n * (Math.PI / 2)) + s + i
            },
            easeOutSine: function(t, e, i, s, n) {
                return s * Math.sin(e / n * (Math.PI / 2)) + i
            },
            easeInOutSine: function(t, e, i, s, n) {
                return -s / 2 * (Math.cos(Math.PI * e / n) - 1) + i
            },
            easeInExpo: function(t, e, i, s, n) {
                return 0 == e ? i : s * Math.pow(2, 10 * (e / n - 1)) + i
            },
            easeOutExpo: function(t, e, i, s, n) {
                return e == n ? i + s : s * (1 - Math.pow(2, -10 * e / n)) + i
            },
            easeInOutExpo: function(t, e, i, s, n) {
                return 0 == e ? i : e == n ? i + s : (e /= n / 2) < 1 ? s / 2 * Math.pow(2, 10 * (e - 1)) + i : s / 2 * (2 - Math.pow(2, -10 * --e)) + i
            },
            easeInCirc: function(t, e, i, s, n) {
                return -s * (Math.sqrt(1 - (e /= n) * e) - 1) + i
            },
            easeOutCirc: function(t, e, i, s, n) {
                return s * Math.sqrt(1 - (e = e / n - 1) * e) + i
            },
            easeInOutCirc: function(t, e, i, s, n) {
                return (e /= n / 2) < 1 ? -s / 2 * (Math.sqrt(1 - e * e) - 1) + i : s / 2 * (Math.sqrt(1 - (e -= 2) * e) + 1) + i
            },
            easeInElastic: function(t, e, i, s, n) {
                var o = 1.70158,
                    r = 0,
                    a = s;
                if (0 == e) return i;
                if (1 == (e /= n)) return i + s;
                if (r || (r = .3 * n), a < Math.abs(s)) {
                    a = s;
                    o = r / 4
                } else o = r / (2 * Math.PI) * Math.asin(s / a);
                return -a * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e * n - o) * Math.PI / r) + i
            },
            easeOutElastic: function(t, e, i, s, n) {
                var o = 1.70158,
                    r = 0,
                    a = s;
                if (0 == e) return i;
                if (1 == (e /= n)) return i + s;
                if (r || (r = .3 * n), a < Math.abs(s)) {
                    a = s;
                    o = r / 4
                } else o = r / (2 * Math.PI) * Math.asin(s / a);
                return a * Math.pow(2, -10 * e) * Math.sin(2 * (e * n - o) * Math.PI / r) + s + i
            },
            easeInOutElastic: function(t, e, i, s, n) {
                var o = 1.70158,
                    r = 0,
                    a = s;
                if (0 == e) return i;
                if (2 == (e /= n / 2)) return i + s;
                if (r || (r = .3 * n * 1.5), a < Math.abs(s)) {
                    a = s;
                    o = r / 4
                } else o = r / (2 * Math.PI) * Math.asin(s / a);
                return e < 1 ? -.5 * a * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e * n - o) * Math.PI / r) + i : a * Math.pow(2, -10 * (e -= 1)) * Math.sin(2 * (e * n - o) * Math.PI / r) * .5 + s + i
            },
            easeInBack: function(t, i, s, n, o, r) {
                return r == e && (r = 1.70158), n * (i /= o) * i * ((r + 1) * i - r) + s
            },
            easeOutBack: function(t, i, s, n, o, r) {
                return r == e && (r = 1.70158), n * ((i = i / o - 1) * i * ((r + 1) * i + r) + 1) + s
            },
            easeInOutBack: function(t, i, s, n, o, r) {
                return r == e && (r = 1.70158), (i /= o / 2) < 1 ? n / 2 * i * i * ((1 + (r *= 1.525)) * i - r) + s : n / 2 * ((i -= 2) * i * ((1 + (r *= 1.525)) * i + r) + 2) + s
            },
            easeInBounce: function(e, i, s, n, o) {
                return n - t.easing.easeOutBounce(e, o - i, 0, n, o) + s
            },
            easeOutBounce: function(t, e, i, s, n) {
                return (e /= n) < 1 / 2.75 ? 7.5625 * s * e * e + i : e < 2 / 2.75 ? s * (7.5625 * (e -= 1.5 / 2.75) * e + .75) + i : e < 2.5 / 2.75 ? s * (7.5625 * (e -= 2.25 / 2.75) * e + .9375) + i : s * (7.5625 * (e -= 2.625 / 2.75) * e + .984375) + i
            },
            easeInOutBounce: function(e, i, s, n, o) {
                return i < o / 2 ? .5 * t.easing.easeInBounce(e, 2 * i, 0, n, o) + s : .5 * t.easing.easeOutBounce(e, 2 * i - o, 0, n, o) + .5 * n + s
            }
        })
    }(jQuery),
    function(t, e) {
        t.effects.blind = function(e) {
            return this.queue(function() {
                var i = t(this),
                    s = ["position", "top", "bottom", "left", "right"],
                    n = t.effects.setMode(i, e.options.mode || "hide"),
                    o = e.options.direction || "vertical";
                t.effects.save(i, s), i.show();
                var r = t.effects.createWrapper(i).css({
                        overflow: "hidden"
                    }),
                    a = "vertical" == o ? "height" : "width",
                    l = "vertical" == o ? r.height() : r.width();
                "show" == n && r.css(a, 0);
                var h = {};
                h[a] = "show" == n ? l : 0, r.animate(h, e.duration, e.options.easing, function() {
                    "hide" == n && i.hide(), t.effects.restore(i, s), t.effects.removeWrapper(i), e.callback && e.callback.apply(i[0], arguments), i.dequeue()
                })
            })
        }
    }(jQuery),
    function(t, e) {
        t.effects.bounce = function(e) {
            return this.queue(function() {
                var i = t(this),
                    s = ["position", "top", "bottom", "left", "right"],
                    n = t.effects.setMode(i, e.options.mode || "effect"),
                    o = e.options.direction || "up",
                    r = e.options.distance || 20,
                    a = e.options.times || 5,
                    l = e.duration || 250;
                /show|hide/.test(n) && s.push("opacity"), t.effects.save(i, s), i.show(), t.effects.createWrapper(i);
                var h = "up" == o || "down" == o ? "top" : "left",
                    c = "up" == o || "left" == o ? "pos" : "neg";
                r = e.options.distance || ("top" == h ? i.outerHeight(!0) / 3 : i.outerWidth(!0) / 3);
                ("show" == n && i.css("opacity", 0).css(h, "pos" == c ? -r : r), "hide" == n && (r /= 2 * a), "hide" != n && a--, "show" == n) && ((p = {
                    opacity: 1
                })[h] = ("pos" == c ? "+=" : "-=") + r, i.animate(p, l / 2, e.options.easing), r /= 2, a--);
                for (var u = 0; u < a; u++) {
                    var d = {};
                    (f = {})[h] = ("pos" == c ? "-=" : "+=") + r, d[h] = ("pos" == c ? "+=" : "-=") + r, i.animate(f, l / 2, e.options.easing).animate(d, l / 2, e.options.easing), r = "hide" == n ? 2 * r : r / 2
                }
                if ("hide" == n) {
                    var p;
                    (p = {
                        opacity: 0
                    })[h] = ("pos" == c ? "-=" : "+=") + r, i.animate(p, l / 2, e.options.easing, function() {
                        i.hide(), t.effects.restore(i, s), t.effects.removeWrapper(i), e.callback && e.callback.apply(this, arguments)
                    })
                } else {
                    var f;
                    d = {};
                    (f = {})[h] = ("pos" == c ? "-=" : "+=") + r, d[h] = ("pos" == c ? "+=" : "-=") + r, i.animate(f, l / 2, e.options.easing).animate(d, l / 2, e.options.easing, function() {
                        t.effects.restore(i, s), t.effects.removeWrapper(i), e.callback && e.callback.apply(this, arguments)
                    })
                }
                i.queue("fx", function() {
                    i.dequeue()
                }), i.dequeue()
            })
        }
    }(jQuery),
    function(t, e) {
        t.effects.clip = function(e) {
            return this.queue(function() {
                var i = t(this),
                    s = ["position", "top", "bottom", "left", "right", "height", "width"],
                    n = t.effects.setMode(i, e.options.mode || "hide"),
                    o = e.options.direction || "vertical";
                t.effects.save(i, s), i.show();
                var r = t.effects.createWrapper(i).css({
                        overflow: "hidden"
                    }),
                    a = "IMG" == i[0].tagName ? r : i,
                    l = {
                        size: "vertical" == o ? "height" : "width",
                        position: "vertical" == o ? "top" : "left"
                    },
                    h = "vertical" == o ? a.height() : a.width();
                "show" == n && (a.css(l.size, 0), a.css(l.position, h / 2));
                var c = {};
                c[l.size] = "show" == n ? h : 0, c[l.position] = "show" == n ? 0 : h / 2, a.animate(c, {
                    queue: !1,
                    duration: e.duration,
                    easing: e.options.easing,
                    complete: function() {
                        "hide" == n && i.hide(), t.effects.restore(i, s), t.effects.removeWrapper(i), e.callback && e.callback.apply(i[0], arguments), i.dequeue()
                    }
                })
            })
        }
    }(jQuery),
    function(t, e) {
        t.effects.drop = function(e) {
            return this.queue(function() {
                var i = t(this),
                    s = ["position", "top", "bottom", "left", "right", "opacity"],
                    n = t.effects.setMode(i, e.options.mode || "hide"),
                    o = e.options.direction || "left";
                t.effects.save(i, s), i.show(), t.effects.createWrapper(i);
                var r = "up" == o || "down" == o ? "top" : "left",
                    a = "up" == o || "left" == o ? "pos" : "neg",
                    l = e.options.distance || ("top" == r ? i.outerHeight(!0) / 2 : i.outerWidth(!0) / 2);
                "show" == n && i.css("opacity", 0).css(r, "pos" == a ? -l : l);
                var h = {
                    opacity: "show" == n ? 1 : 0
                };
                h[r] = ("show" == n ? "pos" == a ? "+=" : "-=" : "pos" == a ? "-=" : "+=") + l, i.animate(h, {
                    queue: !1,
                    duration: e.duration,
                    easing: e.options.easing,
                    complete: function() {
                        "hide" == n && i.hide(), t.effects.restore(i, s), t.effects.removeWrapper(i), e.callback && e.callback.apply(this, arguments), i.dequeue()
                    }
                })
            })
        }
    }(jQuery),
    function(t, e) {
        t.effects.explode = function(e) {
            return this.queue(function() {
                var i = e.options.pieces ? Math.round(Math.sqrt(e.options.pieces)) : 3,
                    s = e.options.pieces ? Math.round(Math.sqrt(e.options.pieces)) : 3;
                e.options.mode = "toggle" == e.options.mode ? t(this).is(":visible") ? "hide" : "show" : e.options.mode;
                var n = t(this).show().css("visibility", "hidden"),
                    o = n.offset();
                o.top -= parseInt(n.css("marginTop"), 10) || 0, o.left -= parseInt(n.css("marginLeft"), 10) || 0;
                for (var r = n.outerWidth(!0), a = n.outerHeight(!0), l = 0; l < i; l++)
                    for (var h = 0; h < s; h++) n.clone().appendTo("body").wrap("<div></div>").css({
                        position: "absolute",
                        visibility: "visible",
                        left: r / s * -h,
                        top: a / i * -l
                    }).parent().addClass("ui-effects-explode").css({
                        position: "absolute",
                        overflow: "hidden",
                        width: r / s,
                        height: a / i,
                        left: o.left + h * (r / s) + ("show" == e.options.mode ? (h - Math.floor(s / 2)) * (r / s) : 0),
                        top: o.top + l * (a / i) + ("show" == e.options.mode ? (l - Math.floor(i / 2)) * (a / i) : 0),
                        opacity: "show" == e.options.mode ? 0 : 1
                    }).animate({
                        left: o.left + h * (r / s) + ("show" == e.options.mode ? 0 : (h - Math.floor(s / 2)) * (r / s)),
                        top: o.top + l * (a / i) + ("show" == e.options.mode ? 0 : (l - Math.floor(i / 2)) * (a / i)),
                        opacity: "show" == e.options.mode ? 1 : 0
                    }, e.duration || 500);
                setTimeout(function() {
                    "show" == e.options.mode ? n.css({
                        visibility: "visible"
                    }) : n.css({
                        visibility: "visible"
                    }).hide(), e.callback && e.callback.apply(n[0]), n.dequeue(), t("div.ui-effects-explode").remove()
                }, e.duration || 500)
            })
        }
    }(jQuery),
    function(t, e) {
        t.effects.fade = function(e) {
            return this.queue(function() {
                var i = t(this),
                    s = t.effects.setMode(i, e.options.mode || "hide");
                i.animate({
                    opacity: s
                }, {
                    queue: !1,
                    duration: e.duration,
                    easing: e.options.easing,
                    complete: function() {
                        e.callback && e.callback.apply(this, arguments), i.dequeue()
                    }
                })
            })
        }
    }(jQuery),
    function(t, e) {
        t.effects.fold = function(e) {
            return this.queue(function() {
                var i = t(this),
                    s = ["position", "top", "bottom", "left", "right"],
                    n = t.effects.setMode(i, e.options.mode || "hide"),
                    o = e.options.size || 15,
                    r = !!e.options.horizFirst,
                    a = e.duration ? e.duration / 2 : t.fx.speeds._default / 2;
                t.effects.save(i, s), i.show();
                var l = t.effects.createWrapper(i).css({
                        overflow: "hidden"
                    }),
                    h = "show" == n != r,
                    c = h ? ["width", "height"] : ["height", "width"],
                    u = h ? [l.width(), l.height()] : [l.height(), l.width()],
                    d = /([0-9]+)%/.exec(o);
                d && (o = parseInt(d[1], 10) / 100 * u["hide" == n ? 0 : 1]), "show" == n && l.css(r ? {
                    height: 0,
                    width: o
                } : {
                    height: o,
                    width: 0
                });
                var p = {},
                    f = {};
                p[c[0]] = "show" == n ? u[0] : o, f[c[1]] = "show" == n ? u[1] : 0, l.animate(p, a, e.options.easing).animate(f, a, e.options.easing, function() {
                    "hide" == n && i.hide(), t.effects.restore(i, s), t.effects.removeWrapper(i), e.callback && e.callback.apply(i[0], arguments), i.dequeue()
                })
            })
        }
    }(jQuery),
    function(t, e) {
        t.effects.highlight = function(e) {
            return this.queue(function() {
                var i = t(this),
                    s = ["backgroundImage", "backgroundColor", "opacity"],
                    n = t.effects.setMode(i, e.options.mode || "show"),
                    o = {
                        backgroundColor: i.css("backgroundColor")
                    };
                "hide" == n && (o.opacity = 0), t.effects.save(i, s), i.show().css({
                    backgroundImage: "none",
                    backgroundColor: e.options.color || "#ffff99"
                }).animate(o, {
                    queue: !1,
                    duration: e.duration,
                    easing: e.options.easing,
                    complete: function() {
                        "hide" == n && i.hide(), t.effects.restore(i, s), "show" == n && !t.support.opacity && this.style.removeAttribute("filter"), e.callback && e.callback.apply(this, arguments), i.dequeue()
                    }
                })
            })
        }
    }(jQuery),
    function(t, e) {
        t.effects.pulsate = function(e) {
            return this.queue(function() {
                var i = t(this),
                    s = t.effects.setMode(i, e.options.mode || "show"),
                    n = 2 * (e.options.times || 5) - 1,
                    o = e.duration ? e.duration / 2 : t.fx.speeds._default / 2,
                    r = i.is(":visible"),
                    a = 0;
                r || (i.css("opacity", 0).show(), a = 1), ("hide" == s && r || "show" == s && !r) && n--;
                for (var l = 0; l < n; l++) i.animate({
                    opacity: a
                }, o, e.options.easing), a = (a + 1) % 2;
                i.animate({
                    opacity: a
                }, o, e.options.easing, function() {
                    0 == a && i.hide(), e.callback && e.callback.apply(this, arguments)
                }), i.queue("fx", function() {
                    i.dequeue()
                }).dequeue()
            })
        }
    }(jQuery),
    function(t, e) {
        t.effects.puff = function(e) {
            return this.queue(function() {
                var i = t(this),
                    s = t.effects.setMode(i, e.options.mode || "hide"),
                    n = parseInt(e.options.percent, 10) || 150,
                    o = n / 100,
                    r = {
                        height: i.height(),
                        width: i.width()
                    };
                t.extend(e.options, {
                    fade: !0,
                    mode: s,
                    percent: "hide" == s ? n : 100,
                    from: "hide" == s ? r : {
                        height: r.height * o,
                        width: r.width * o
                    }
                }), i.effect("scale", e.options, e.duration, e.callback), i.dequeue()
            })
        }, t.effects.scale = function(e) {
            return this.queue(function() {
                var i = t(this),
                    s = t.extend(!0, {}, e.options),
                    n = t.effects.setMode(i, e.options.mode || "effect"),
                    o = parseInt(e.options.percent, 10) || (0 == parseInt(e.options.percent, 10) ? 0 : "hide" == n ? 0 : 100),
                    r = e.options.direction || "both",
                    a = e.options.origin;
                "effect" != n && (s.origin = a || ["middle", "center"], s.restore = !0);
                var l = {
                    height: i.height(),
                    width: i.width()
                };
                i.from = e.options.from || ("show" == n ? {
                    height: 0,
                    width: 0
                } : l);
                var h = "horizontal" != r ? o / 100 : 1,
                    c = "vertical" != r ? o / 100 : 1;
                i.to = {
                    height: l.height * h,
                    width: l.width * c
                }, e.options.fade && ("show" == n && (i.from.opacity = 0, i.to.opacity = 1), "hide" == n && (i.from.opacity = 1, i.to.opacity = 0)), s.from = i.from, s.to = i.to, s.mode = n, i.effect("size", s, e.duration, e.callback), i.dequeue()
            })
        }, t.effects.size = function(e) {
            return this.queue(function() {
                var i = t(this),
                    s = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
                    n = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
                    o = ["width", "height", "overflow"],
                    r = ["fontSize"],
                    a = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
                    l = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
                    h = t.effects.setMode(i, e.options.mode || "effect"),
                    c = e.options.restore || !1,
                    u = e.options.scale || "both",
                    d = e.options.origin,
                    p = {
                        height: i.height(),
                        width: i.width()
                    };
                if (i.from = e.options.from || p, i.to = e.options.to || p, d) {
                    var f = t.effects.getBaseline(d, p);
                    i.from.top = (p.height - i.from.height) * f.y, i.from.left = (p.width - i.from.width) * f.x, i.to.top = (p.height - i.to.height) * f.y, i.to.left = (p.width - i.to.width) * f.x
                }
                var g = {
                    from: {
                        y: i.from.height / p.height,
                        x: i.from.width / p.width
                    },
                    to: {
                        y: i.to.height / p.height,
                        x: i.to.width / p.width
                    }
                };
                "box" != u && "both" != u || (g.from.y != g.to.y && (s = s.concat(a), i.from = t.effects.setTransition(i, a, g.from.y, i.from), i.to = t.effects.setTransition(i, a, g.to.y, i.to)), g.from.x != g.to.x && (s = s.concat(l), i.from = t.effects.setTransition(i, l, g.from.x, i.from), i.to = t.effects.setTransition(i, l, g.to.x, i.to))), ("content" == u || "both" == u) && g.from.y != g.to.y && (s = s.concat(r), i.from = t.effects.setTransition(i, r, g.from.y, i.from), i.to = t.effects.setTransition(i, r, g.to.y, i.to)), t.effects.save(i, c ? s : n), i.show(), t.effects.createWrapper(i), i.css("overflow", "hidden").css(i.from), "content" != u && "both" != u || (a = a.concat(["marginTop", "marginBottom"]).concat(r), l = l.concat(["marginLeft", "marginRight"]), o = s.concat(a).concat(l), i.find("*[width]").each(function() {
                    var i = t(this);
                    c && t.effects.save(i, o);
                    var s = i.height(),
                        n = i.width();
                    i.from = {
                        height: s * g.from.y,
                        width: n * g.from.x
                    }, i.to = {
                        height: s * g.to.y,
                        width: n * g.to.x
                    }, g.from.y != g.to.y && (i.from = t.effects.setTransition(i, a, g.from.y, i.from), i.to = t.effects.setTransition(i, a, g.to.y, i.to)), g.from.x != g.to.x && (i.from = t.effects.setTransition(i, l, g.from.x, i.from), i.to = t.effects.setTransition(i, l, g.to.x, i.to)), i.css(i.from), i.animate(i.to, e.duration, e.options.easing, function() {
                        c && t.effects.restore(i, o)
                    })
                })), i.animate(i.to, {
                    queue: !1,
                    duration: e.duration,
                    easing: e.options.easing,
                    complete: function() {
                        0 === i.to.opacity && i.css("opacity", i.from.opacity), "hide" == h && i.hide(), t.effects.restore(i, c ? s : n), t.effects.removeWrapper(i), e.callback && e.callback.apply(this, arguments), i.dequeue()
                    }
                })
            })
        }
    }(jQuery),
    function(t, e) {
        t.effects.shake = function(e) {
            return this.queue(function() {
                var i = t(this),
                    s = ["position", "top", "bottom", "left", "right"],
                    n = (t.effects.setMode(i, e.options.mode || "effect"), e.options.direction || "left"),
                    o = e.options.distance || 20,
                    r = e.options.times || 3,
                    a = e.duration || e.options.duration || 140;
                t.effects.save(i, s), i.show(), t.effects.createWrapper(i);
                var l = "up" == n || "down" == n ? "top" : "left",
                    h = "up" == n || "left" == n ? "pos" : "neg",
                    c = {},
                    u = {},
                    d = {};
                c[l] = ("pos" == h ? "-=" : "+=") + o, u[l] = ("pos" == h ? "+=" : "-=") + 2 * o, d[l] = ("pos" == h ? "-=" : "+=") + 2 * o, i.animate(c, a, e.options.easing);
                for (var p = 1; p < r; p++) i.animate(u, a, e.options.easing).animate(d, a, e.options.easing);
                i.animate(u, a, e.options.easing).animate(c, a / 2, e.options.easing, function() {
                    t.effects.restore(i, s), t.effects.removeWrapper(i), e.callback && e.callback.apply(this, arguments)
                }), i.queue("fx", function() {
                    i.dequeue()
                }), i.dequeue()
            })
        }
    }(jQuery),
    function(t, e) {
        t.effects.slide = function(e) {
            return this.queue(function() {
                var i = t(this),
                    s = ["position", "top", "bottom", "left", "right"],
                    n = t.effects.setMode(i, e.options.mode || "show"),
                    o = e.options.direction || "left";
                t.effects.save(i, s), i.show(), t.effects.createWrapper(i).css({
                    overflow: "hidden"
                });
                var r = "up" == o || "down" == o ? "top" : "left",
                    a = "up" == o || "left" == o ? "pos" : "neg",
                    l = e.options.distance || ("top" == r ? i.outerHeight(!0) : i.outerWidth(!0));
                "show" == n && i.css(r, "pos" == a ? isNaN(l) ? "-" + l : -l : l);
                var h = {};
                h[r] = ("show" == n ? "pos" == a ? "+=" : "-=" : "pos" == a ? "-=" : "+=") + l, i.animate(h, {
                    queue: !1,
                    duration: e.duration,
                    easing: e.options.easing,
                    complete: function() {
                        "hide" == n && i.hide(), t.effects.restore(i, s), t.effects.removeWrapper(i), e.callback && e.callback.apply(this, arguments), i.dequeue()
                    }
                })
            })
        }
    }(jQuery),
    function(t, e) {
        t.effects.transfer = function(e) {
            return this.queue(function() {
                var i = t(this),
                    s = t(e.options.to),
                    n = s.offset(),
                    o = {
                        top: n.top,
                        left: n.left,
                        height: s.innerHeight(),
                        width: s.innerWidth()
                    },
                    r = i.offset(),
                    a = t('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(e.options.className).css({
                        top: r.top,
                        left: r.left,
                        height: i.innerHeight(),
                        width: i.innerWidth(),
                        position: "absolute"
                    }).animate(o, e.duration, e.options.easing, function() {
                        a.remove(), e.callback && e.callback.apply(i[0], arguments), i.dequeue()
                    })
            })
        }
    }(jQuery),
    function(t, e) {
        t.widget("ui.accordion", {
            options: {
                active: 0,
                animated: "slide",
                autoHeight: !0,
                clearStyle: !1,
                collapsible: !1,
                event: "click",
                fillSpace: !1,
                header: "> li > :first-child,> :not(li):even",
                icons: {
                    header: "ui-icon-triangle-1-e",
                    headerSelected: "ui-icon-triangle-1-s"
                },
                navigation: !1,
                navigationFilter: function() {
                    return this.href.toLowerCase() === location.href.toLowerCase()
                }
            },
            _create: function() {
                var e = this,
                    i = e.options;
                if (e.running = 0, e.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix"), e.headers = e.element.find(i.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion", function() {
                        i.disabled || t(this).addClass("ui-state-hover")
                    }).bind("mouseleave.accordion", function() {
                        i.disabled || t(this).removeClass("ui-state-hover")
                    }).bind("focus.accordion", function() {
                        i.disabled || t(this).addClass("ui-state-focus")
                    }).bind("blur.accordion", function() {
                        i.disabled || t(this).removeClass("ui-state-focus")
                    }), e.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom"), i.navigation) {
                    var s = e.element.find("a").filter(i.navigationFilter).eq(0);
                    if (s.length) {
                        var n = s.closest(".ui-accordion-header");
                        n.length ? e.active = n : e.active = s.closest(".ui-accordion-content").prev()
                    }
                }
                e.active = e._findActive(e.active || i.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top"), e.active.next().addClass("ui-accordion-content-active"), e._createIcons(), e.resize(), e.element.attr("role", "tablist"), e.headers.attr("role", "tab").bind("keydown.accordion", function(t) {
                    return e._keydown(t)
                }).next().attr("role", "tabpanel"), e.headers.not(e.active || "").attr({
                    "aria-expanded": "false",
                    "aria-selected": "false",
                    tabIndex: -1
                }).next().hide(), e.active.length ? e.active.attr({
                    "aria-expanded": "true",
                    "aria-selected": "true",
                    tabIndex: 0
                }) : e.headers.eq(0).attr("tabIndex", 0), t.browser.safari || e.headers.find("a").attr("tabIndex", -1), i.event && e.headers.bind(i.event.split(" ").join(".accordion ") + ".accordion", function(t) {
                    e._clickHandler.call(e, t, this), t.preventDefault()
                })
            },
            _createIcons: function() {
                var e = this.options;
                e.icons && (t("<span></span>").addClass("ui-icon " + e.icons.header).prependTo(this.headers), this.active.children(".ui-icon").toggleClass(e.icons.header).toggleClass(e.icons.headerSelected), this.element.addClass("ui-accordion-icons"))
            },
            _destroyIcons: function() {
                this.headers.children(".ui-icon").remove(), this.element.removeClass("ui-accordion-icons")
            },
            destroy: function() {
                var e = this.options;
                this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex"), this.headers.find("a").removeAttr("tabIndex"), this._destroyIcons();
                var i = this.headers.next().css("display", "").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");
                return (e.autoHeight || e.fillHeight) && i.css("height", ""), t.Widget.prototype.destroy.call(this)
            },
            _setOption: function(e, i) {
                t.Widget.prototype._setOption.apply(this, arguments), "active" == e && this.activate(i), "icons" == e && (this._destroyIcons(), i && this._createIcons()), "disabled" == e && this.headers.add(this.headers.next())[i ? "addClass" : "removeClass"]("ui-accordion-disabled ui-state-disabled")
            },
            _keydown: function(e) {
                if (!(this.options.disabled || e.altKey || e.ctrlKey)) {
                    var i = t.ui.keyCode,
                        s = this.headers.length,
                        n = this.headers.index(e.target),
                        o = !1;
                    switch (e.keyCode) {
                        case i.RIGHT:
                        case i.DOWN:
                            o = this.headers[(n + 1) % s];
                            break;
                        case i.LEFT:
                        case i.UP:
                            o = this.headers[(n - 1 + s) % s];
                            break;
                        case i.SPACE:
                        case i.ENTER:
                            this._clickHandler({
                                target: e.target
                            }, e.target), e.preventDefault()
                    }
                    return !o || (t(e.target).attr("tabIndex", -1), t(o).attr("tabIndex", 0), o.focus(), !1)
                }
            },
            resize: function() {
                var e, i = this.options;
                if (i.fillSpace) {
                    if (t.browser.msie) {
                        var s = this.element.parent().css("overflow");
                        this.element.parent().css("overflow", "hidden")
                    }
                    e = this.element.parent().height(), t.browser.msie && this.element.parent().css("overflow", s), this.headers.each(function() {
                        e -= t(this).outerHeight(!0)
                    }), this.headers.next().each(function() {
                        t(this).height(Math.max(0, e - t(this).innerHeight() + t(this).height()))
                    }).css("overflow", "auto")
                } else i.autoHeight && (e = 0, this.headers.next().each(function() {
                    e = Math.max(e, t(this).height("").height())
                }).height(e));
                return this
            },
            activate: function(t) {
                this.options.active = t;
                var e = this._findActive(t)[0];
                return this._clickHandler({
                    target: e
                }, e), this
            },
            _findActive: function(e) {
                return e ? "number" == typeof e ? this.headers.filter(":eq(" + e + ")") : this.headers.not(this.headers.not(e)) : !1 === e ? t([]) : this.headers.filter(":eq(0)")
            },
            _clickHandler: function(e, i) {
                var s = this.options;
                if (!s.disabled)
                    if (e.target) {
                        var n = t(e.currentTarget || i),
                            o = n[0] === this.active[0];
                        if (s.active = (!s.collapsible || !o) && this.headers.index(n), !(this.running || !s.collapsible && o)) {
                            var r = this.active,
                                a = (c = n.next(), l = this.active.next(), h = {
                                    options: s,
                                    newHeader: o && s.collapsible ? t([]) : n,
                                    oldHeader: this.active,
                                    newContent: o && s.collapsible ? t([]) : c,
                                    oldContent: l
                                }, this.headers.index(this.active[0]) > this.headers.index(n[0]));
                            this.active = o ? t([]) : n, this._toggle(c, l, h, o, a), r.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(s.icons.headerSelected).addClass(s.icons.header), o || (n.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(s.icons.header).addClass(s.icons.headerSelected), n.next().addClass("ui-accordion-content-active"))
                        }
                    } else {
                        if (!s.collapsible) return;
                        this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(s.icons.headerSelected).addClass(s.icons.header), this.active.next().addClass("ui-accordion-content-active");
                        var l = this.active.next(),
                            h = {
                                options: s,
                                newHeader: t([]),
                                oldHeader: s.active,
                                newContent: t([]),
                                oldContent: l
                            },
                            c = this.active = t([]);
                        this._toggle(c, l, h)
                    }
            },
            _toggle: function(e, i, s, n, o) {
                var r = this,
                    a = r.options;
                r.toShow = e, r.toHide = i, r.data = s;
                var l = function() {
                    if (r) return r._completed.apply(r, arguments)
                };
                if (r._trigger("changestart", null, r.data), r.running = 0 === i.size() ? e.size() : i.size(), a.animated) {
                    var h = {};
                    h = a.collapsible && n ? {
                        toShow: t([]),
                        toHide: i,
                        complete: l,
                        down: o,
                        autoHeight: a.autoHeight || a.fillSpace
                    } : {
                        toShow: e,
                        toHide: i,
                        complete: l,
                        down: o,
                        autoHeight: a.autoHeight || a.fillSpace
                    }, a.proxied || (a.proxied = a.animated), a.proxiedDuration || (a.proxiedDuration = a.duration), a.animated = t.isFunction(a.proxied) ? a.proxied(h) : a.proxied, a.duration = t.isFunction(a.proxiedDuration) ? a.proxiedDuration(h) : a.proxiedDuration;
                    var c = t.ui.accordion.animations,
                        u = a.duration,
                        d = a.animated;
                    d && !c[d] && !t.easing[d] && (d = "slide"), c[d] || (c[d] = function(t) {
                        this.slide(t, {
                            easing: d,
                            duration: u || 700
                        })
                    }), c[d](h)
                } else a.collapsible && n ? e.toggle() : (i.hide(), e.show()), l(!0);
                i.prev().attr({
                    "aria-expanded": "false",
                    "aria-selected": "false",
                    tabIndex: -1
                }).blur(), e.prev().attr({
                    "aria-expanded": "true",
                    "aria-selected": "true",
                    tabIndex: 0
                }).focus()
            },
            _completed: function(t) {
                this.running = t ? 0 : --this.running, this.running || (this.options.clearStyle && this.toShow.add(this.toHide).css({
                    height: "",
                    overflow: ""
                }), this.toHide.removeClass("ui-accordion-content-active"), this.toHide.length && (this.toHide.parent()[0].className = this.toHide.parent()[0].className), this._trigger("change", null, this.data))
            }
        }), t.extend(t.ui.accordion, {
            version: "1.8.22",
            animations: {
                slide: function(e, i) {
                    if ((e = t.extend({
                            easing: "swing",
                            duration: 300
                        }, e, i)).toHide.size())
                        if (e.toShow.size()) {
                            var s, n = e.toShow.css("overflow"),
                                o = 0,
                                r = {},
                                a = {},
                                l = e.toShow;
                            s = l[0].style.width, l.width(l.parent().width() - parseFloat(l.css("paddingLeft")) - parseFloat(l.css("paddingRight")) - (parseFloat(l.css("borderLeftWidth")) || 0) - (parseFloat(l.css("borderRightWidth")) || 0)), t.each(["height", "paddingTop", "paddingBottom"], function(i, s) {
                                a[s] = "hide";
                                var n = ("" + t.css(e.toShow[0], s)).match(/^([\d+-.]+)(.*)$/);
                                r[s] = {
                                    value: n[1],
                                    unit: n[2] || "px"
                                }
                            }), e.toShow.css({
                                height: 0,
                                overflow: "hidden"
                            }).show(), e.toHide.filter(":hidden").each(e.complete).end().filter(":visible").animate(a, {
                                step: function(t, i) {
                                    "height" == i.prop && (o = i.end - i.start == 0 ? 0 : (i.now - i.start) / (i.end - i.start)), e.toShow[0].style[i.prop] = o * r[i.prop].value + r[i.prop].unit
                                },
                                duration: e.duration,
                                easing: e.easing,
                                complete: function() {
                                    e.autoHeight || e.toShow.css("height", ""), e.toShow.css({
                                        width: s,
                                        overflow: n
                                    }), e.complete()
                                }
                            })
                        } else e.toHide.animate({
                            height: "hide",
                            paddingTop: "hide",
                            paddingBottom: "hide"
                        }, e);
                    else e.toShow.animate({
                        height: "show",
                        paddingTop: "show",
                        paddingBottom: "show"
                    }, e)
                },
                bounceslide: function(t) {
                    this.slide(t, {
                        easing: t.down ? "easeOutBounce" : "swing",
                        duration: t.down ? 1e3 : 200
                    })
                }
            }
        })
    }(jQuery),
    function(t, e) {
        var i = 0;
        t.widget("ui.autocomplete", {
            options: {
                appendTo: "body",
                autoFocus: !1,
                delay: 300,
                minLength: 1,
                position: {
                    my: "left top",
                    at: "left bottom",
                    collision: "none"
                },
                source: null
            },
            pending: 0,
            _create: function() {
                var e, i = this,
                    s = this.element[0].ownerDocument;
                this.isMultiLine = this.element.is("textarea"), this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off").attr({
                    role: "textbox",
                    "aria-autocomplete": "list",
                    "aria-haspopup": "true"
                }).bind("keydown.autocomplete", function(s) {
                    if (!i.options.disabled && !i.element.propAttr("readOnly")) {
                        e = !1;
                        var n = t.ui.keyCode;
                        switch (s.keyCode) {
                            case n.PAGE_UP:
                                i._move("previousPage", s);
                                break;
                            case n.PAGE_DOWN:
                                i._move("nextPage", s);
                                break;
                            case n.UP:
                                i._keyEvent("previous", s);
                                break;
                            case n.DOWN:
                                i._keyEvent("next", s);
                                break;
                            case n.ENTER:
                            case n.NUMPAD_ENTER:
                                i.menu.active && (e = !0, s.preventDefault());
                            case n.TAB:
                                if (!i.menu.active) return;
                                i.menu.select(s);
                                break;
                            case n.ESCAPE:
                                i.element.val(i.term), i.close(s);
                                break;
                            default:
                                clearTimeout(i.searching), i.searching = setTimeout(function() {
                                    i.term != i.element.val() && (i.selectedItem = null, i.search(null, s))
                                }, i.options.delay)
                        }
                    }
                }).bind("keypress.autocomplete", function(t) {
                    e && (e = !1, t.preventDefault())
                }).bind("focus.autocomplete", function() {
                    i.options.disabled || (i.selectedItem = null, i.previous = i.element.val())
                }).bind("blur.autocomplete", function(t) {
                    i.options.disabled || (clearTimeout(i.searching), i.closing = setTimeout(function() {
                        i.close(t), i._change(t)
                    }, 150))
                }), this._initSource(), this.menu = t("<ul></ul>").addClass("ui-autocomplete").appendTo(t(this.options.appendTo || "body", s)[0]).mousedown(function(e) {
                    var s = i.menu.element[0];
                    t(e.target).closest(".ui-menu-item").length || setTimeout(function() {
                        t(document).one("mousedown", function(e) {
                            e.target !== i.element[0] && e.target !== s && !t.ui.contains(s, e.target) && i.close()
                        })
                    }, 1), setTimeout(function() {
                        clearTimeout(i.closing)
                    }, 13)
                }).menu({
                    focus: function(t, e) {
                        var s = e.item.data("item.autocomplete");
                        !1 !== i._trigger("focus", t, {
                            item: s
                        }) && /^key/.test(t.originalEvent.type) && i.element.val(s.value)
                    },
                    selected: function(t, e) {
                        var n = e.item.data("item.autocomplete"),
                            o = i.previous;
                        i.element[0] !== s.activeElement && (i.element.focus(), i.previous = o, setTimeout(function() {
                            i.previous = o, i.selectedItem = n
                        }, 1)), !1 !== i._trigger("select", t, {
                            item: n
                        }) && i.element.val(n.value), i.term = i.element.val(), i.close(t), i.selectedItem = n
                    },
                    blur: function(t, e) {
                        i.menu.element.is(":visible") && i.element.val() !== i.term && i.element.val(i.term)
                    }
                }).zIndex(this.element.zIndex() + 1).css({
                    top: 0,
                    left: 0
                }).hide().data("menu"), t.fn.bgiframe && this.menu.element.bgiframe(), i.beforeunloadHandler = function() {
                    i.element.removeAttr("autocomplete")
                }, t(window).bind("beforeunload", i.beforeunloadHandler)
            },
            destroy: function() {
                this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup"), this.menu.element.remove(), t(window).unbind("beforeunload", this.beforeunloadHandler), t.Widget.prototype.destroy.call(this)
            },
            _setOption: function(e, i) {
                t.Widget.prototype._setOption.apply(this, arguments), "source" === e && this._initSource(), "appendTo" === e && this.menu.element.appendTo(t(i || "body", this.element[0].ownerDocument)[0]), "disabled" === e && i && this.xhr && this.xhr.abort()
            },
            _initSource: function() {
                var e, i, s = this;
                t.isArray(this.options.source) ? (e = this.options.source, this.source = function(i, s) {
                    s(t.ui.autocomplete.filter(e, i.term))
                }) : "string" == typeof this.options.source ? (i = this.options.source, this.source = function(e, n) {
                    s.xhr && s.xhr.abort(), s.xhr = t.ajax({
                        url: i,
                        data: e,
                        dataType: "json",
                        success: function(t, e) {
                            n(t)
                        },
                        error: function() {
                            n([])
                        }
                    })
                }) : this.source = this.options.source
            },
            search: function(t, e) {
                return t = null != t ? t : this.element.val(), this.term = this.element.val(), t.length < this.options.minLength ? this.close(e) : (clearTimeout(this.closing), !1 !== this._trigger("search", e) ? this._search(t) : void 0)
            },
            _search: function(t) {
                this.pending++, this.element.addClass("ui-autocomplete-loading"), this.source({
                    term: t
                }, this._response())
            },
            _response: function() {
                var t = this,
                    e = ++i;
                return function(s) {
                    e === i && t.__response(s), t.pending--, t.pending || t.element.removeClass("ui-autocomplete-loading")
                }
            },
            __response: function(t) {
                !this.options.disabled && t && t.length ? (t = this._normalize(t), this._suggest(t), this._trigger("open")) : this.close()
            },
            close: function(t) {
                clearTimeout(this.closing), this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.deactivate(), this._trigger("close", t))
            },
            _change: function(t) {
                this.previous !== this.element.val() && this._trigger("change", t, {
                    item: this.selectedItem
                })
            },
            _normalize: function(e) {
                return e.length && e[0].label && e[0].value ? e : t.map(e, function(e) {
                    return "string" == typeof e ? {
                        label: e,
                        value: e
                    } : t.extend({
                        label: e.label || e.value,
                        value: e.value || e.label
                    }, e)
                })
            },
            _suggest: function(e) {
                var i = this.menu.element.empty().zIndex(this.element.zIndex() + 1);
                this._renderMenu(i, e), this.menu.deactivate(), this.menu.refresh(), i.show(), this._resizeMenu(), i.position(t.extend({
                    of: this.element
                }, this.options.position)), this.options.autoFocus && this.menu.next(new t.Event("mouseover"))
            },
            _resizeMenu: function() {
                var t = this.menu.element;
                t.outerWidth(Math.max(t.width("").outerWidth() + 1, this.element.outerWidth()))
            },
            _renderMenu: function(e, i) {
                var s = this;
                t.each(i, function(t, i) {
                    s._renderItem(e, i)
                })
            },
            _renderItem: function(e, i) {
                return t("<li></li>").data("item.autocomplete", i).append(t("<a></a>").text(i.label)).appendTo(e)
            },
            _move: function(t, e) {
                if (this.menu.element.is(":visible")) return this.menu.first() && /^previous/.test(t) || this.menu.last() && /^next/.test(t) ? (this.element.val(this.term), void this.menu.deactivate()) : void this.menu[t](e);
                this.search(null, e)
            },
            widget: function() {
                return this.menu.element
            },
            _keyEvent: function(t, e) {
                this.isMultiLine && !this.menu.element.is(":visible") || (this._move(t, e), e.preventDefault())
            }
        }), t.extend(t.ui.autocomplete, {
            escapeRegex: function(t) {
                return t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
            },
            filter: function(e, i) {
                var s = new RegExp(t.ui.autocomplete.escapeRegex(i), "i");
                return t.grep(e, function(t) {
                    return s.test(t.label || t.value || t)
                })
            }
        })
    }(jQuery),
    function(t) {
        t.widget("ui.menu", {
            _create: function() {
                var e = this;
                this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({
                    role: "listbox",
                    "aria-activedescendant": "ui-active-menuitem"
                }).click(function(i) {
                    t(i.target).closest(".ui-menu-item a").length && (i.preventDefault(), e.select(i))
                }), this.refresh()
            },
            refresh: function() {
                var e = this;
                this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "menuitem").children("a").addClass("ui-corner-all").attr("tabindex", -1).mouseenter(function(i) {
                    e.activate(i, t(this).parent())
                }).mouseleave(function() {
                    e.deactivate()
                })
            },
            activate: function(t, e) {
                if (this.deactivate(), this.hasScroll()) {
                    var i = e.offset().top - this.element.offset().top,
                        s = this.element.scrollTop(),
                        n = this.element.height();
                    i < 0 ? this.element.scrollTop(s + i) : i >= n && this.element.scrollTop(s + i - n + e.height())
                }
                this.active = e.eq(0).children("a").addClass("ui-state-hover").attr("id", "ui-active-menuitem").end(), this._trigger("focus", t, {
                    item: e
                })
            },
            deactivate: function() {
                this.active && (this.active.children("a").removeClass("ui-state-hover").removeAttr("id"), this._trigger("blur"), this.active = null)
            },
            next: function(t) {
                this.move("next", ".ui-menu-item:first", t)
            },
            previous: function(t) {
                this.move("prev", ".ui-menu-item:last", t)
            },
            first: function() {
                return this.active && !this.active.prevAll(".ui-menu-item").length
            },
            last: function() {
                return this.active && !this.active.nextAll(".ui-menu-item").length
            },
            move: function(t, e, i) {
                if (this.active) {
                    var s = this.active[t + "All"](".ui-menu-item").eq(0);
                    s.length ? this.activate(i, s) : this.activate(i, this.element.children(e))
                } else this.activate(i, this.element.children(e))
            },
            nextPage: function(e) {
                if (this.hasScroll()) {
                    if (!this.active || this.last()) return void this.activate(e, this.element.children(".ui-menu-item:first"));
                    var i = this.active.offset().top,
                        s = this.element.height(),
                        n = this.element.children(".ui-menu-item").filter(function() {
                            var e = t(this).offset().top - i - s + t(this).height();
                            return e < 10 && e > -10
                        });
                    n.length || (n = this.element.children(".ui-menu-item:last")), this.activate(e, n)
                } else this.activate(e, this.element.children(".ui-menu-item").filter(!this.active || this.last() ? ":first" : ":last"))
            },
            previousPage: function(e) {
                if (this.hasScroll()) {
                    if (!this.active || this.first()) return void this.activate(e, this.element.children(".ui-menu-item:last"));
                    var i = this.active.offset().top,
                        s = this.element.height(),
                        n = this.element.children(".ui-menu-item").filter(function() {
                            var e = t(this).offset().top - i + s - t(this).height();
                            return e < 10 && e > -10
                        });
                    n.length || (n = this.element.children(".ui-menu-item:first")), this.activate(e, n)
                } else this.activate(e, this.element.children(".ui-menu-item").filter(!this.active || this.first() ? ":last" : ":first"))
            },
            hasScroll: function() {
                return this.element.height() < this.element[t.fn.prop ? "prop" : "attr"]("scrollHeight")
            },
            select: function(t) {
                this._trigger("selected", t, {
                    item: this.active
                })
            }
        })
    }(jQuery),
    function(t, e) {
        var i, s, n, o, r = "ui-button ui-widget ui-state-default ui-corner-all",
            a = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
            l = function() {
                var e = t(this).find(":ui-button");
                setTimeout(function() {
                    e.button("refresh")
                }, 1)
            },
            h = function(e) {
                var i = e.name,
                    s = e.form,
                    n = t([]);
                return i && (n = s ? t(s).find("[name='" + i + "']") : t("[name='" + i + "']", e.ownerDocument).filter(function() {
                    return !this.form
                })), n
            };
        t.widget("ui.button", {
            options: {
                disabled: null,
                text: !0,
                label: null,
                icons: {
                    primary: null,
                    secondary: null
                }
            },
            _create: function() {
                this.element.closest("form").unbind("reset.button").bind("reset.button", l), "boolean" != typeof this.options.disabled ? this.options.disabled = !!this.element.propAttr("disabled") : this.element.propAttr("disabled", this.options.disabled), this._determineButtonType(), this.hasTitle = !!this.buttonElement.attr("title");
                var e = this,
                    a = this.options,
                    c = "checkbox" === this.type || "radio" === this.type,
                    u = "ui-state-hover" + (c ? "" : " ui-state-active"),
                    d = "ui-state-focus";
                null === a.label && (a.label = this.buttonElement.html()), this.buttonElement.addClass(r).attr("role", "button").bind("mouseenter.button", function() {
                    a.disabled || (t(this).addClass("ui-state-hover"), this === i && t(this).addClass("ui-state-active"))
                }).bind("mouseleave.button", function() {
                    a.disabled || t(this).removeClass(u)
                }).bind("click.button", function(t) {
                    a.disabled && (t.preventDefault(), t.stopImmediatePropagation())
                }), this.element.bind("focus.button", function() {
                    e.buttonElement.addClass(d)
                }).bind("blur.button", function() {
                    e.buttonElement.removeClass(d)
                }), c && (this.element.bind("change.button", function() {
                    o || e.refresh()
                }), this.buttonElement.bind("mousedown.button", function(t) {
                    a.disabled || (o = !1, s = t.pageX, n = t.pageY)
                }).bind("mouseup.button", function(t) {
                    a.disabled || s === t.pageX && n === t.pageY || (o = !0)
                })), "checkbox" === this.type ? this.buttonElement.bind("click.button", function() {
                    if (a.disabled || o) return !1;
                    t(this).toggleClass("ui-state-active"), e.buttonElement.attr("aria-pressed", e.element[0].checked)
                }) : "radio" === this.type ? this.buttonElement.bind("click.button", function() {
                    if (a.disabled || o) return !1;
                    t(this).addClass("ui-state-active"), e.buttonElement.attr("aria-pressed", "true");
                    var i = e.element[0];
                    h(i).not(i).map(function() {
                        return t(this).button("widget")[0]
                    }).removeClass("ui-state-active").attr("aria-pressed", "false")
                }) : (this.buttonElement.bind("mousedown.button", function() {
                    if (a.disabled) return !1;
                    t(this).addClass("ui-state-active"), i = this, t(document).one("mouseup", function() {
                        i = null
                    })
                }).bind("mouseup.button", function() {
                    if (a.disabled) return !1;
                    t(this).removeClass("ui-state-active")
                }).bind("keydown.button", function(e) {
                    if (a.disabled) return !1;
                    (e.keyCode == t.ui.keyCode.SPACE || e.keyCode == t.ui.keyCode.ENTER) && t(this).addClass("ui-state-active")
                }).bind("keyup.button", function() {
                    t(this).removeClass("ui-state-active")
                }), this.buttonElement.is("a") && this.buttonElement.keyup(function(e) {
                    e.keyCode === t.ui.keyCode.SPACE && t(this).click()
                })), this._setOption("disabled", a.disabled), this._resetButton()
            },
            _determineButtonType: function() {
                if (this.element.is(":checkbox") ? this.type = "checkbox" : this.element.is(":radio") ? this.type = "radio" : this.element.is("input") ? this.type = "input" : this.type = "button", "checkbox" === this.type || "radio" === this.type) {
                    var t = this.element.parents().filter(":last"),
                        e = "label[for='" + this.element.attr("id") + "']";
                    this.buttonElement = t.find(e), this.buttonElement.length || (t = t.length ? t.siblings() : this.element.siblings(), this.buttonElement = t.filter(e), this.buttonElement.length || (this.buttonElement = t.find(e))), this.element.addClass("ui-helper-hidden-accessible");
                    var i = this.element.is(":checked");
                    i && this.buttonElement.addClass("ui-state-active"), this.buttonElement.attr("aria-pressed", i)
                } else this.buttonElement = this.element
            },
            widget: function() {
                return this.buttonElement
            },
            destroy: function() {
                this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(r + " ui-state-hover ui-state-active  " + a).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), this.hasTitle || this.buttonElement.removeAttr("title"), t.Widget.prototype.destroy.call(this)
            },
            _setOption: function(e, i) {
                t.Widget.prototype._setOption.apply(this, arguments), "disabled" !== e ? this._resetButton() : i ? this.element.propAttr("disabled", !0) : this.element.propAttr("disabled", !1)
            },
            refresh: function() {
                var e = this.element.is(":disabled");
                e !== this.options.disabled && this._setOption("disabled", e), "radio" === this.type ? h(this.element[0]).each(function() {
                    t(this).is(":checked") ? t(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : t(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
                }) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
            },
            _resetButton: function() {
                if ("input" !== this.type) {
                    var e = this.buttonElement.removeClass(a),
                        i = t("<span></span>", this.element[0].ownerDocument).addClass("ui-button-text").html(this.options.label).appendTo(e.empty()).text(),
                        s = this.options.icons,
                        n = s.primary && s.secondary,
                        o = [];
                    s.primary || s.secondary ? (this.options.text && o.push("ui-button-text-icon" + (n ? "s" : s.primary ? "-primary" : "-secondary")), s.primary && e.prepend("<span class='ui-button-icon-primary ui-icon " + s.primary + "'></span>"), s.secondary && e.append("<span class='ui-button-icon-secondary ui-icon " + s.secondary + "'></span>"), this.options.text || (o.push(n ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || e.attr("title", i))) : o.push("ui-button-text-only"), e.addClass(o.join(" "))
                } else this.options.label && this.element.val(this.options.label)
            }
        }), t.widget("ui.buttonset", {
            options: {
                items: ":button, :submit, :reset, :checkbox, :radio, a, :data(button)"
            },
            _create: function() {
                this.element.addClass("ui-buttonset")
            },
            _init: function() {
                this.refresh()
            },
            _setOption: function(e, i) {
                "disabled" === e && this.buttons.button("option", e, i), t.Widget.prototype._setOption.apply(this, arguments)
            },
            refresh: function() {
                var e = "rtl" === this.element.css("direction");
                this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function() {
                    return t(this).button("widget")[0]
                }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(e ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(e ? "ui-corner-left" : "ui-corner-right").end().end()
            },
            destroy: function() {
                this.element.removeClass("ui-buttonset"), this.buttons.map(function() {
                    return t(this).button("widget")[0]
                }).removeClass("ui-corner-left ui-corner-right").end().button("destroy"), t.Widget.prototype.destroy.call(this)
            }
        })
    }(jQuery),
    function($, undefined) {
        function Datepicker() {
            this.debug = !1, this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
                closeText: "Done",
                prevText: "Prev",
                nextText: "Next",
                currentText: "Today",
                monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                weekHeader: "Wk",
                dateFormat: "mm/dd/yy",
                firstDay: 0,
                isRTL: !1,
                showMonthAfterYear: !1,
                yearSuffix: ""
            }, this._defaults = {
                showOn: "focus",
                showAnim: "fadeIn",
                showOptions: {},
                defaultDate: null,
                appendText: "",
                buttonText: "...",
                buttonImage: "",
                buttonImageOnly: !1,
                hideIfNoPrevNext: !1,
                navigationAsDateFormat: !1,
                gotoCurrent: !1,
                changeMonth: !1,
                changeYear: !1,
                yearRange: "c-10:c+10",
                showOtherMonths: !1,
                selectOtherMonths: !1,
                showWeek: !1,
                calculateWeek: this.iso8601Week,
                shortYearCutoff: "+10",
                minDate: null,
                maxDate: null,
                duration: "fast",
                beforeShowDay: null,
                beforeShow: null,
                onSelect: null,
                onChangeMonthYear: null,
                onClose: null,
                numberOfMonths: 1,
                showCurrentAtPos: 0,
                stepMonths: 1,
                stepBigMonths: 12,
                altField: "",
                altFormat: "",
                constrainInput: !0,
                showButtonPanel: !1,
                autoSize: !1,
                disabled: !1
            }, $.extend(this._defaults, this.regional[""]), this.dpDiv = bindHover($('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
        }

        function bindHover(t) {
            var e = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
            return t.bind("mouseout", function(t) {
                var i = $(t.target).closest(e);
                i.length && i.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover")
            }).bind("mouseover", function(i) {
                var s = $(i.target).closest(e);
                !$.datepicker._isDisabledDatepicker(instActive.inline ? t.parent()[0] : instActive.input[0]) && s.length && (s.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), s.addClass("ui-state-hover"), s.hasClass("ui-datepicker-prev") && s.addClass("ui-datepicker-prev-hover"), s.hasClass("ui-datepicker-next") && s.addClass("ui-datepicker-next-hover"))
            })
        }

        function extendRemove(t, e) {
            for (var i in $.extend(t, e), e) null != e[i] && e[i] != undefined || (t[i] = e[i]);
            return t
        }

        function isArray(t) {
            return t && ($.browser.safari && "object" == typeof t && t.length || t.constructor && t.constructor.toString().match(/\Array\(\)/))
        }
        $.extend($.ui, {
            datepicker: {
                version: "1.8.22"
            }
        });
        var PROP_NAME = "datepicker",
            dpuuid = (new Date).getTime(),
            instActive;
        $.extend(Datepicker.prototype, {
            markerClassName: "hasDatepicker",
            maxRows: 4,
            log: function() {
                this.debug && console.log.apply("", arguments)
            },
            _widgetDatepicker: function() {
                return this.dpDiv
            },
            setDefaults: function(t) {
                return extendRemove(this._defaults, t || {}), this
            },
            _attachDatepicker: function(target, settings) {
                var inlineSettings = null;
                for (var attrName in this._defaults) {
                    var attrValue = target.getAttribute("date:" + attrName);
                    if (attrValue) {
                        inlineSettings = inlineSettings || {};
                        try {
                            inlineSettings[attrName] = eval(attrValue)
                        } catch (t) {
                            inlineSettings[attrName] = attrValue
                        }
                    }
                }
                var nodeName = target.nodeName.toLowerCase(),
                    inline = "div" == nodeName || "span" == nodeName;
                target.id || (this.uuid += 1, target.id = "dp" + this.uuid);
                var inst = this._newInst($(target), inline);
                inst.settings = $.extend({}, settings || {}, inlineSettings || {}), "input" == nodeName ? this._connectDatepicker(target, inst) : inline && this._inlineDatepicker(target, inst)
            },
            _newInst: function(t, e) {
                return {
                    id: t[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1"),
                    input: t,
                    selectedDay: 0,
                    selectedMonth: 0,
                    selectedYear: 0,
                    drawMonth: 0,
                    drawYear: 0,
                    inline: e,
                    dpDiv: e ? bindHover($('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')) : this.dpDiv
                }
            },
            _connectDatepicker: function(t, e) {
                var i = $(t);
                e.append = $([]), e.trigger = $([]), i.hasClass(this.markerClassName) || (this._attachments(i, e), i.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function(t, i, s) {
                    e.settings[i] = s
                }).bind("getData.datepicker", function(t, i) {
                    return this._get(e, i)
                }), this._autoSize(e), $.data(t, PROP_NAME, e), e.settings.disabled && this._disableDatepicker(t))
            },
            _attachments: function(t, e) {
                var i = this._get(e, "appendText"),
                    s = this._get(e, "isRTL");
                e.append && e.append.remove(), i && (e.append = $('<span class="' + this._appendClass + '">' + i + "</span>"), t[s ? "before" : "after"](e.append)), t.unbind("focus", this._showDatepicker), e.trigger && e.trigger.remove();
                var n = this._get(e, "showOn");
                if (("focus" == n || "both" == n) && t.focus(this._showDatepicker), "button" == n || "both" == n) {
                    var o = this._get(e, "buttonText"),
                        r = this._get(e, "buttonImage");
                    e.trigger = $(this._get(e, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
                        src: r,
                        alt: o,
                        title: o
                    }) : $('<button type="button"></button>').addClass(this._triggerClass).html("" == r ? o : $("<img/>").attr({
                        src: r,
                        alt: o,
                        title: o
                    }))), t[s ? "before" : "after"](e.trigger), e.trigger.click(function() {
                        return $.datepicker._datepickerShowing && $.datepicker._lastInput == t[0] ? $.datepicker._hideDatepicker() : $.datepicker._datepickerShowing && $.datepicker._lastInput != t[0] ? ($.datepicker._hideDatepicker(), $.datepicker._showDatepicker(t[0])) : $.datepicker._showDatepicker(t[0]), !1
                    })
                }
            },
            _autoSize: function(t) {
                if (this._get(t, "autoSize") && !t.inline) {
                    var e = new Date(2009, 11, 20),
                        i = this._get(t, "dateFormat");
                    if (i.match(/[DM]/)) {
                        var s = function(t) {
                            for (var e = 0, i = 0, s = 0; s < t.length; s++) t[s].length > e && (e = t[s].length, i = s);
                            return i
                        };
                        e.setMonth(s(this._get(t, i.match(/MM/) ? "monthNames" : "monthNamesShort"))), e.setDate(s(this._get(t, i.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - e.getDay())
                    }
                    t.input.attr("size", this._formatDate(t, e).length)
                }
            },
            _inlineDatepicker: function(t, e) {
                var i = $(t);
                i.hasClass(this.markerClassName) || (i.addClass(this.markerClassName).append(e.dpDiv).bind("setData.datepicker", function(t, i, s) {
                    e.settings[i] = s
                }).bind("getData.datepicker", function(t, i) {
                    return this._get(e, i)
                }), $.data(t, PROP_NAME, e), this._setDate(e, this._getDefaultDate(e), !0), this._updateDatepicker(e), this._updateAlternate(e), e.settings.disabled && this._disableDatepicker(t), e.dpDiv.css("display", "block"))
            },
            _dialogDatepicker: function(t, e, i, s, n) {
                var o = this._dialogInst;
                if (!o) {
                    this.uuid += 1;
                    var r = "dp" + this.uuid;
                    this._dialogInput = $('<input type="text" id="' + r + '" style="position: absolute; top: -100px; width: 0px;"/>'), this._dialogInput.keydown(this._doKeyDown), $("body").append(this._dialogInput), (o = this._dialogInst = this._newInst(this._dialogInput, !1)).settings = {}, $.data(this._dialogInput[0], PROP_NAME, o)
                }
                if (extendRemove(o.settings, s || {}), e = e && e.constructor == Date ? this._formatDate(o, e) : e, this._dialogInput.val(e), this._pos = n ? n.length ? n : [n.pageX, n.pageY] : null, !this._pos) {
                    var a = document.documentElement.clientWidth,
                        l = document.documentElement.clientHeight,
                        h = document.documentElement.scrollLeft || document.body.scrollLeft,
                        c = document.documentElement.scrollTop || document.body.scrollTop;
                    this._pos = [a / 2 - 100 + h, l / 2 - 150 + c]
                }
                return this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), o.settings.onSelect = i, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), $.blockUI && $.blockUI(this.dpDiv), $.data(this._dialogInput[0], PROP_NAME, o), this
            },
            _destroyDatepicker: function(t) {
                var e = $(t),
                    i = $.data(t, PROP_NAME);
                if (e.hasClass(this.markerClassName)) {
                    var s = t.nodeName.toLowerCase();
                    $.removeData(t, PROP_NAME), "input" == s ? (i.append.remove(), i.trigger.remove(), e.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" == s || "span" == s) && e.removeClass(this.markerClassName).empty()
                }
            },
            _enableDatepicker: function(t) {
                var e = $(t),
                    i = $.data(t, PROP_NAME);
                if (e.hasClass(this.markerClassName)) {
                    var s = t.nodeName.toLowerCase();
                    if ("input" == s) t.disabled = !1, i.trigger.filter("button").each(function() {
                        this.disabled = !1
                    }).end().filter("img").css({
                        opacity: "1.0",
                        cursor: ""
                    });
                    else if ("div" == s || "span" == s) {
                        var n = e.children("." + this._inlineClass);
                        n.children().removeClass("ui-state-disabled"), n.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled")
                    }
                    this._disabledInputs = $.map(this._disabledInputs, function(e) {
                        return e == t ? null : e
                    })
                }
            },
            _disableDatepicker: function(t) {
                var e = $(t),
                    i = $.data(t, PROP_NAME);
                if (e.hasClass(this.markerClassName)) {
                    var s = t.nodeName.toLowerCase();
                    if ("input" == s) t.disabled = !0, i.trigger.filter("button").each(function() {
                        this.disabled = !0
                    }).end().filter("img").css({
                        opacity: "0.5",
                        cursor: "default"
                    });
                    else if ("div" == s || "span" == s) {
                        var n = e.children("." + this._inlineClass);
                        n.children().addClass("ui-state-disabled"), n.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled", "disabled")
                    }
                    this._disabledInputs = $.map(this._disabledInputs, function(e) {
                        return e == t ? null : e
                    }), this._disabledInputs[this._disabledInputs.length] = t
                }
            },
            _isDisabledDatepicker: function(t) {
                if (!t) return !1;
                for (var e = 0; e < this._disabledInputs.length; e++)
                    if (this._disabledInputs[e] == t) return !0;
                return !1
            },
            _getInst: function(t) {
                try {
                    return $.data(t, PROP_NAME)
                } catch (t) {
                    throw "Missing instance data for this datepicker"
                }
            },
            _optionDatepicker: function(t, e, i) {
                var s = this._getInst(t);
                if (2 == arguments.length && "string" == typeof e) return "defaults" == e ? $.extend({}, $.datepicker._defaults) : s ? "all" == e ? $.extend({}, s.settings) : this._get(s, e) : null;
                var n = e || {};
                if ("string" == typeof e && ((n = {})[e] = i), s) {
                    this._curInst == s && this._hideDatepicker();
                    var o = this._getDateDatepicker(t, !0),
                        r = this._getMinMaxDate(s, "min"),
                        a = this._getMinMaxDate(s, "max");
                    extendRemove(s.settings, n), null !== r && n.dateFormat !== undefined && n.minDate === undefined && (s.settings.minDate = this._formatDate(s, r)), null !== a && n.dateFormat !== undefined && n.maxDate === undefined && (s.settings.maxDate = this._formatDate(s, a)), this._attachments($(t), s), this._autoSize(s), this._setDate(s, o), this._updateAlternate(s), this._updateDatepicker(s)
                }
            },
            _changeDatepicker: function(t, e, i) {
                this._optionDatepicker(t, e, i)
            },
            _refreshDatepicker: function(t) {
                var e = this._getInst(t);
                e && this._updateDatepicker(e)
            },
            _setDateDatepicker: function(t, e) {
                var i = this._getInst(t);
                i && (this._setDate(i, e), this._updateDatepicker(i), this._updateAlternate(i))
            },
            _getDateDatepicker: function(t, e) {
                var i = this._getInst(t);
                return i && !i.inline && this._setDateFromField(i, e), i ? this._getDate(i) : null
            },
            _doKeyDown: function(t) {
                var e = $.datepicker._getInst(t.target),
                    i = !0,
                    s = e.dpDiv.is(".ui-datepicker-rtl");
                if (e._keyEvent = !0, $.datepicker._datepickerShowing) switch (t.keyCode) {
                    case 9:
                        $.datepicker._hideDatepicker(), i = !1;
                        break;
                    case 13:
                        var n = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", e.dpDiv);
                        n[0] && $.datepicker._selectDay(t.target, e.selectedMonth, e.selectedYear, n[0]);
                        var o = $.datepicker._get(e, "onSelect");
                        if (o) {
                            var r = $.datepicker._formatDate(e);
                            o.apply(e.input ? e.input[0] : null, [r, e])
                        } else $.datepicker._hideDatepicker();
                        return !1;
                    case 27:
                        $.datepicker._hideDatepicker();
                        break;
                    case 33:
                        $.datepicker._adjustDate(t.target, t.ctrlKey ? -$.datepicker._get(e, "stepBigMonths") : -$.datepicker._get(e, "stepMonths"), "M");
                        break;
                    case 34:
                        $.datepicker._adjustDate(t.target, t.ctrlKey ? +$.datepicker._get(e, "stepBigMonths") : +$.datepicker._get(e, "stepMonths"), "M");
                        break;
                    case 35:
                        (t.ctrlKey || t.metaKey) && $.datepicker._clearDate(t.target), i = t.ctrlKey || t.metaKey;
                        break;
                    case 36:
                        (t.ctrlKey || t.metaKey) && $.datepicker._gotoToday(t.target), i = t.ctrlKey || t.metaKey;
                        break;
                    case 37:
                        (t.ctrlKey || t.metaKey) && $.datepicker._adjustDate(t.target, s ? 1 : -1, "D"), i = t.ctrlKey || t.metaKey, t.originalEvent.altKey && $.datepicker._adjustDate(t.target, t.ctrlKey ? -$.datepicker._get(e, "stepBigMonths") : -$.datepicker._get(e, "stepMonths"), "M");
                        break;
                    case 38:
                        (t.ctrlKey || t.metaKey) && $.datepicker._adjustDate(t.target, -7, "D"), i = t.ctrlKey || t.metaKey;
                        break;
                    case 39:
                        (t.ctrlKey || t.metaKey) && $.datepicker._adjustDate(t.target, s ? -1 : 1, "D"), i = t.ctrlKey || t.metaKey, t.originalEvent.altKey && $.datepicker._adjustDate(t.target, t.ctrlKey ? +$.datepicker._get(e, "stepBigMonths") : +$.datepicker._get(e, "stepMonths"), "M");
                        break;
                    case 40:
                        (t.ctrlKey || t.metaKey) && $.datepicker._adjustDate(t.target, 7, "D"), i = t.ctrlKey || t.metaKey;
                        break;
                    default:
                        i = !1
                } else 36 == t.keyCode && t.ctrlKey ? $.datepicker._showDatepicker(this) : i = !1;
                i && (t.preventDefault(), t.stopPropagation())
            },
            _doKeyPress: function(t) {
                var e = $.datepicker._getInst(t.target);
                if ($.datepicker._get(e, "constrainInput")) {
                    var i = $.datepicker._possibleChars($.datepicker._get(e, "dateFormat")),
                        s = String.fromCharCode(t.charCode == undefined ? t.keyCode : t.charCode);
                    return t.ctrlKey || t.metaKey || s < " " || !i || i.indexOf(s) > -1
                }
            },
            _doKeyUp: function(t) {
                var e = $.datepicker._getInst(t.target);
                if (e.input.val() != e.lastVal) try {
                    $.datepicker.parseDate($.datepicker._get(e, "dateFormat"), e.input ? e.input.val() : null, $.datepicker._getFormatConfig(e)) && ($.datepicker._setDateFromField(e), $.datepicker._updateAlternate(e), $.datepicker._updateDatepicker(e))
                } catch (t) {
                    $.datepicker.log(t)
                }
                return !0
            },
            _showDatepicker: function(t) {
                if ("input" != (t = t.target || t).nodeName.toLowerCase() && (t = $("input", t.parentNode)[0]), !$.datepicker._isDisabledDatepicker(t) && $.datepicker._lastInput != t) {
                    var e = $.datepicker._getInst(t);
                    $.datepicker._curInst && $.datepicker._curInst != e && ($.datepicker._curInst.dpDiv.stop(!0, !0), e && $.datepicker._datepickerShowing && $.datepicker._hideDatepicker($.datepicker._curInst.input[0]));
                    var i = $.datepicker._get(e, "beforeShow"),
                        s = i ? i.apply(t, [t, e]) : {};
                    if (!1 !== s) {
                        extendRemove(e.settings, s), e.lastVal = null, $.datepicker._lastInput = t, $.datepicker._setDateFromField(e), $.datepicker._inDialog && (t.value = ""), $.datepicker._pos || ($.datepicker._pos = $.datepicker._findPos(t), $.datepicker._pos[1] += t.offsetHeight);
                        var n = !1;
                        $(t).parents().each(function() {
                            return !(n |= "fixed" == $(this).css("position"))
                        }), n && $.browser.opera && ($.datepicker._pos[0] -= document.documentElement.scrollLeft, $.datepicker._pos[1] -= document.documentElement.scrollTop);
                        var o = {
                            left: $.datepicker._pos[0],
                            top: $.datepicker._pos[1]
                        };
                        if ($.datepicker._pos = null, e.dpDiv.empty(), e.dpDiv.css({
                                position: "absolute",
                                display: "block",
                                top: "-1000px"
                            }), $.datepicker._updateDatepicker(e), o = $.datepicker._checkOffset(e, o, n), e.dpDiv.css({
                                position: $.datepicker._inDialog && $.blockUI ? "static" : n ? "fixed" : "absolute",
                                display: "none",
                                left: o.left + "px",
                                top: o.top + "px"
                            }), !e.inline) {
                            var r = $.datepicker._get(e, "showAnim"),
                                a = $.datepicker._get(e, "duration"),
                                l = function() {
                                    var t = e.dpDiv.find("iframe.ui-datepicker-cover");
                                    if (t.length) {
                                        var i = $.datepicker._getBorders(e.dpDiv);
                                        t.css({
                                            left: -i[0],
                                            top: -i[1],
                                            width: e.dpDiv.outerWidth(),
                                            height: e.dpDiv.outerHeight()
                                        })
                                    }
                                };
                            e.dpDiv.zIndex($(t).zIndex() + 1), $.datepicker._datepickerShowing = !0, $.effects && $.effects[r] ? e.dpDiv.show(r, $.datepicker._get(e, "showOptions"), a, l) : e.dpDiv[r || "show"](r ? a : null, l), (!r || !a) && l(), e.input.is(":visible") && !e.input.is(":disabled") && e.input.focus(), $.datepicker._curInst = e
                        }
                    }
                }
            },
            _updateDatepicker: function(t) {
                this.maxRows = 4;
                var e = $.datepicker._getBorders(t.dpDiv);
                instActive = t, t.dpDiv.empty().append(this._generateHTML(t)), this._attachHandlers(t);
                var i = t.dpDiv.find("iframe.ui-datepicker-cover");
                !i.length || i.css({
                    left: -e[0],
                    top: -e[1],
                    width: t.dpDiv.outerWidth(),
                    height: t.dpDiv.outerHeight()
                }), t.dpDiv.find("." + this._dayOverClass + " a").mouseover();
                var s = this._getNumberOfMonths(t),
                    n = s[1];
                if (t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), n > 1 && t.dpDiv.addClass("ui-datepicker-multi-" + n).css("width", 17 * n + "em"), t.dpDiv[(1 != s[0] || 1 != s[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), t.dpDiv[(this._get(t, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), t == $.datepicker._curInst && $.datepicker._datepickerShowing && t.input && t.input.is(":visible") && !t.input.is(":disabled") && t.input[0] != document.activeElement && t.input.focus(), t.yearshtml) {
                    var o = t.yearshtml;
                    setTimeout(function() {
                        o === t.yearshtml && t.yearshtml && t.dpDiv.find("select.ui-datepicker-year:first").replaceWith(t.yearshtml), o = t.yearshtml = null
                    }, 0)
                }
            },
            _getBorders: function(t) {
                var e = function(t) {
                    return {
                        thin: 1,
                        medium: 2,
                        thick: 3
                    } [t] || t
                };
                return [parseFloat(e(t.css("border-left-width"))), parseFloat(e(t.css("border-top-width")))]
            },
            _checkOffset: function(t, e, i) {
                var s = t.dpDiv.outerWidth(),
                    n = t.dpDiv.outerHeight(),
                    o = t.input ? t.input.outerWidth() : 0,
                    r = t.input ? t.input.outerHeight() : 0,
                    a = document.documentElement.clientWidth + (i ? 0 : $(document).scrollLeft()),
                    l = document.documentElement.clientHeight + (i ? 0 : $(document).scrollTop());
                return e.left -= this._get(t, "isRTL") ? s - o : 0, e.left -= i && e.left == t.input.offset().left ? $(document).scrollLeft() : 0, e.top -= i && e.top == t.input.offset().top + r ? $(document).scrollTop() : 0, e.left -= Math.min(e.left, e.left + s > a && a > s ? Math.abs(e.left + s - a) : 0), e.top -= Math.min(e.top, e.top + n > l && l > n ? Math.abs(n + r) : 0), e
            },
            _findPos: function(t) {
                for (var e = this._getInst(t), i = this._get(e, "isRTL"); t && ("hidden" == t.type || 1 != t.nodeType || $.expr.filters.hidden(t));) t = t[i ? "previousSibling" : "nextSibling"];
                var s = $(t).offset();
                return [s.left, s.top]
            },
            _hideDatepicker: function(t) {
                var e = this._curInst;
                if (e && (!t || e == $.data(t, PROP_NAME)) && this._datepickerShowing) {
                    var i = this._get(e, "showAnim"),
                        s = this._get(e, "duration"),
                        n = function() {
                            $.datepicker._tidyDialog(e)
                        };
                    $.effects && $.effects[i] ? e.dpDiv.hide(i, $.datepicker._get(e, "showOptions"), s, n) : e.dpDiv["slideDown" == i ? "slideUp" : "fadeIn" == i ? "fadeOut" : "hide"](i ? s : null, n), i || n(), this._datepickerShowing = !1;
                    var o = this._get(e, "onClose");
                    o && o.apply(e.input ? e.input[0] : null, [e.input ? e.input.val() : "", e]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                        position: "absolute",
                        left: "0",
                        top: "-100px"
                    }), $.blockUI && ($.unblockUI(), $("body").append(this.dpDiv))), this._inDialog = !1
                }
            },
            _tidyDialog: function(t) {
                t.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
            },
            _checkExternalClick: function(t) {
                if ($.datepicker._curInst) {
                    var e = $(t.target),
                        i = $.datepicker._getInst(e[0]);
                    (e[0].id != $.datepicker._mainDivId && 0 == e.parents("#" + $.datepicker._mainDivId).length && !e.hasClass($.datepicker.markerClassName) && !e.closest("." + $.datepicker._triggerClass).length && $.datepicker._datepickerShowing && (!$.datepicker._inDialog || !$.blockUI) || e.hasClass($.datepicker.markerClassName) && $.datepicker._curInst != i) && $.datepicker._hideDatepicker()
                }
            },
            _adjustDate: function(t, e, i) {
                var s = $(t),
                    n = this._getInst(s[0]);
                this._isDisabledDatepicker(s[0]) || (this._adjustInstDate(n, e + ("M" == i ? this._get(n, "showCurrentAtPos") : 0), i), this._updateDatepicker(n))
            },
            _gotoToday: function(t) {
                var e = $(t),
                    i = this._getInst(e[0]);
                if (this._get(i, "gotoCurrent") && i.currentDay) i.selectedDay = i.currentDay, i.drawMonth = i.selectedMonth = i.currentMonth, i.drawYear = i.selectedYear = i.currentYear;
                else {
                    var s = new Date;
                    i.selectedDay = s.getDate(), i.drawMonth = i.selectedMonth = s.getMonth(), i.drawYear = i.selectedYear = s.getFullYear()
                }
                this._notifyChange(i), this._adjustDate(e)
            },
            _selectMonthYear: function(t, e, i) {
                var s = $(t),
                    n = this._getInst(s[0]);
                n["selected" + ("M" == i ? "Month" : "Year")] = n["draw" + ("M" == i ? "Month" : "Year")] = parseInt(e.options[e.selectedIndex].value, 10), this._notifyChange(n), this._adjustDate(s)
            },
            _selectDay: function(t, e, i, s) {
                var n = $(t);
                if (!$(s).hasClass(this._unselectableClass) && !this._isDisabledDatepicker(n[0])) {
                    var o = this._getInst(n[0]);
                    o.selectedDay = o.currentDay = $("a", s).html(), o.selectedMonth = o.currentMonth = e, o.selectedYear = o.currentYear = i, this._selectDate(t, this._formatDate(o, o.currentDay, o.currentMonth, o.currentYear))
                }
            },
            _clearDate: function(t) {
                var e = $(t);
                this._getInst(e[0]);
                this._selectDate(e, "")
            },
            _selectDate: function(t, e) {
                var i = $(t),
                    s = this._getInst(i[0]);
                e = null != e ? e : this._formatDate(s), s.input && s.input.val(e), this._updateAlternate(s);
                var n = this._get(s, "onSelect");
                n ? n.apply(s.input ? s.input[0] : null, [e, s]) : s.input && s.input.trigger("change"), s.inline ? this._updateDatepicker(s) : (this._hideDatepicker(), this._lastInput = s.input[0], "object" != typeof s.input[0] && s.input.focus(), this._lastInput = null)
            },
            _updateAlternate: function(t) {
                var e = this._get(t, "altField");
                if (e) {
                    var i = this._get(t, "altFormat") || this._get(t, "dateFormat"),
                        s = this._getDate(t),
                        n = this.formatDate(i, s, this._getFormatConfig(t));
                    $(e).each(function() {
                        $(this).val(n)
                    })
                }
            },
            noWeekends: function(t) {
                var e = t.getDay();
                return [e > 0 && e < 6, ""]
            },
            iso8601Week: function(t) {
                var e = new Date(t.getTime());
                e.setDate(e.getDate() + 4 - (e.getDay() || 7));
                var i = e.getTime();
                return e.setMonth(0), e.setDate(1), Math.floor(Math.round((i - e) / 864e5) / 7) + 1
            },
            parseDate: function(t, e, i) {
                if (null == t || null == e) throw "Invalid arguments";
                if ("" == (e = "object" == typeof e ? e.toString() : e + "")) return null;
                var s = (i ? i.shortYearCutoff : null) || this._defaults.shortYearCutoff;
                s = "string" != typeof s ? s : (new Date).getFullYear() % 100 + parseInt(s, 10);
                for (var n = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort, o = (i ? i.dayNames : null) || this._defaults.dayNames, r = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort, a = (i ? i.monthNames : null) || this._defaults.monthNames, l = -1, h = -1, c = -1, u = -1, d = !1, p = function(e) {
                        var i = _ + 1 < t.length && t.charAt(_ + 1) == e;
                        return i && _++, i
                    }, f = function(t) {
                        var i = p(t),
                            s = new RegExp("^\\d{1," + ("@" == t ? 14 : "!" == t ? 20 : "y" == t && i ? 4 : "o" == t ? 3 : 2) + "}"),
                            n = e.substring(v).match(s);
                        if (!n) throw "Missing number at position " + v;
                        return v += n[0].length, parseInt(n[0], 10)
                    }, g = function(t, i, s) {
                        var n = $.map(p(t) ? s : i, function(t, e) {
                                return [
                                    [e, t]
                                ]
                            }).sort(function(t, e) {
                                return -(t[1].length - e[1].length)
                            }),
                            o = -1;
                        if ($.each(n, function(t, i) {
                                var s = i[1];
                                if (e.substr(v, s.length).toLowerCase() == s.toLowerCase()) return o = i[0], v += s.length, !1
                            }), -1 != o) return o + 1;
                        throw "Unknown name at position " + v
                    }, m = function() {
                        if (e.charAt(v) != t.charAt(_)) throw "Unexpected literal at position " + v;
                        v++
                    }, v = 0, _ = 0; _ < t.length; _++)
                    if (d) "'" != t.charAt(_) || p("'") ? m() : d = !1;
                    else switch (t.charAt(_)) {
                        case "d":
                            c = f("d");
                            break;
                        case "D":
                            g("D", n, o);
                            break;
                        case "o":
                            u = f("o");
                            break;
                        case "m":
                            h = f("m");
                            break;
                        case "M":
                            h = g("M", r, a);
                            break;
                        case "y":
                            l = f("y");
                            break;
                        case "@":
                            l = (b = new Date(f("@"))).getFullYear(), h = b.getMonth() + 1, c = b.getDate();
                            break;
                        case "!":
                            var b;
                            l = (b = new Date((f("!") - this._ticksTo1970) / 1e4)).getFullYear(), h = b.getMonth() + 1, c = b.getDate();
                            break;
                        case "'":
                            p("'") ? m() : d = !0;
                            break;
                        default:
                            m()
                    }
                if (v < e.length) throw "Extra/unparsed characters found in date: " + e.substring(v);
                if (-1 == l ? l = (new Date).getFullYear() : l < 100 && (l += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (l <= s ? 0 : -100)), u > -1)
                    for (h = 1, c = u;;) {
                        var y = this._getDaysInMonth(l, h - 1);
                        if (c <= y) break;
                        h++, c -= y
                    }
                if ((b = this._daylightSavingAdjust(new Date(l, h - 1, c))).getFullYear() != l || b.getMonth() + 1 != h || b.getDate() != c) throw "Invalid date";
                return b
            },
            ATOM: "yy-mm-dd",
            COOKIE: "D, dd M yy",
            ISO_8601: "yy-mm-dd",
            RFC_822: "D, d M y",
            RFC_850: "DD, dd-M-y",
            RFC_1036: "D, d M y",
            RFC_1123: "D, d M yy",
            RFC_2822: "D, d M yy",
            RSS: "D, d M y",
            TICKS: "!",
            TIMESTAMP: "@",
            W3C: "yy-mm-dd",
            _ticksTo1970: 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 1e7,
            formatDate: function(t, e, i) {
                if (!e) return "";
                var s = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
                    n = (i ? i.dayNames : null) || this._defaults.dayNames,
                    o = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
                    r = (i ? i.monthNames : null) || this._defaults.monthNames,
                    a = function(e) {
                        var i = d + 1 < t.length && t.charAt(d + 1) == e;
                        return i && d++, i
                    },
                    l = function(t, e, i) {
                        var s = "" + e;
                        if (a(t))
                            for (; s.length < i;) s = "0" + s;
                        return s
                    },
                    h = function(t, e, i, s) {
                        return a(t) ? s[e] : i[e]
                    },
                    c = "",
                    u = !1;
                if (e)
                    for (var d = 0; d < t.length; d++)
                        if (u) "'" != t.charAt(d) || a("'") ? c += t.charAt(d) : u = !1;
                        else switch (t.charAt(d)) {
                            case "d":
                                c += l("d", e.getDate(), 2);
                                break;
                            case "D":
                                c += h("D", e.getDay(), s, n);
                                break;
                            case "o":
                                c += l("o", Math.round((new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime() - new Date(e.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                                break;
                            case "m":
                                c += l("m", e.getMonth() + 1, 2);
                                break;
                            case "M":
                                c += h("M", e.getMonth(), o, r);
                                break;
                            case "y":
                                c += a("y") ? e.getFullYear() : (e.getYear() % 100 < 10 ? "0" : "") + e.getYear() % 100;
                                break;
                            case "@":
                                c += e.getTime();
                                break;
                            case "!":
                                c += 1e4 * e.getTime() + this._ticksTo1970;
                                break;
                            case "'":
                                a("'") ? c += "'" : u = !0;
                                break;
                            default:
                                c += t.charAt(d)
                        }
                return c
            },
            _possibleChars: function(t) {
                for (var e = "", i = !1, s = function(e) {
                        var i = n + 1 < t.length && t.charAt(n + 1) == e;
                        return i && n++, i
                    }, n = 0; n < t.length; n++)
                    if (i) "'" != t.charAt(n) || s("'") ? e += t.charAt(n) : i = !1;
                    else switch (t.charAt(n)) {
                        case "d":
                        case "m":
                        case "y":
                        case "@":
                            e += "0123456789";
                            break;
                        case "D":
                        case "M":
                            return null;
                        case "'":
                            s("'") ? e += "'" : i = !0;
                            break;
                        default:
                            e += t.charAt(n)
                    }
                return e
            },
            _get: function(t, e) {
                return t.settings[e] !== undefined ? t.settings[e] : this._defaults[e]
            },
            _setDateFromField: function(t, e) {
                if (t.input.val() != t.lastVal) {
                    var i, s, n = this._get(t, "dateFormat"),
                        o = t.lastVal = t.input ? t.input.val() : null;
                    i = s = this._getDefaultDate(t);
                    var r = this._getFormatConfig(t);
                    try {
                        i = this.parseDate(n, o, r) || s
                    } catch (t) {
                        this.log(t), o = e ? "" : o
                    }
                    t.selectedDay = i.getDate(), t.drawMonth = t.selectedMonth = i.getMonth(), t.drawYear = t.selectedYear = i.getFullYear(), t.currentDay = o ? i.getDate() : 0, t.currentMonth = o ? i.getMonth() : 0, t.currentYear = o ? i.getFullYear() : 0, this._adjustInstDate(t)
                }
            },
            _getDefaultDate: function(t) {
                return this._restrictMinMax(t, this._determineDate(t, this._get(t, "defaultDate"), new Date))
            },
            _determineDate: function(t, e, i) {
                var s, n, o = null == e || "" === e ? i : "string" == typeof e ? function(e) {
                    try {
                        return $.datepicker.parseDate($.datepicker._get(t, "dateFormat"), e, $.datepicker._getFormatConfig(t))
                    } catch (t) {}
                    for (var i = (e.toLowerCase().match(/^c/) ? $.datepicker._getDate(t) : null) || new Date, s = i.getFullYear(), n = i.getMonth(), o = i.getDate(), r = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, a = r.exec(e); a;) {
                        switch (a[2] || "d") {
                            case "d":
                            case "D":
                                o += parseInt(a[1], 10);
                                break;
                            case "w":
                            case "W":
                                o += 7 * parseInt(a[1], 10);
                                break;
                            case "m":
                            case "M":
                                n += parseInt(a[1], 10), o = Math.min(o, $.datepicker._getDaysInMonth(s, n));
                                break;
                            case "y":
                            case "Y":
                                s += parseInt(a[1], 10), o = Math.min(o, $.datepicker._getDaysInMonth(s, n))
                        }
                        a = r.exec(e)
                    }
                    return new Date(s, n, o)
                }(e) : "number" == typeof e ? isNaN(e) ? i : (s = e, (n = new Date).setDate(n.getDate() + s), n) : new Date(e.getTime());
                return (o = o && "Invalid Date" == o.toString() ? i : o) && (o.setHours(0), o.setMinutes(0), o.setSeconds(0), o.setMilliseconds(0)), this._daylightSavingAdjust(o)
            },
            _daylightSavingAdjust: function(t) {
                return t ? (t.setHours(t.getHours() > 12 ? t.getHours() + 2 : 0), t) : null
            },
            _setDate: function(t, e, i) {
                var s = !e,
                    n = t.selectedMonth,
                    o = t.selectedYear,
                    r = this._restrictMinMax(t, this._determineDate(t, e, new Date));
                t.selectedDay = t.currentDay = r.getDate(), t.drawMonth = t.selectedMonth = t.currentMonth = r.getMonth(), t.drawYear = t.selectedYear = t.currentYear = r.getFullYear(), (n != t.selectedMonth || o != t.selectedYear) && !i && this._notifyChange(t), this._adjustInstDate(t), t.input && t.input.val(s ? "" : this._formatDate(t))
            },
            _getDate: function(t) {
                return !t.currentYear || t.input && "" == t.input.val() ? null : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay))
            },
            _attachHandlers: function(t) {
                var e = this._get(t, "stepMonths"),
                    i = "#" + t.id;
                t.dpDiv.find("[data-handler]").map(function() {
                    var t = {
                        prev: function() {
                            window["DP_jQuery_" + dpuuid].datepicker._adjustDate(i, -e, "M")
                        },
                        next: function() {
                            window["DP_jQuery_" + dpuuid].datepicker._adjustDate(i, +e, "M")
                        },
                        hide: function() {
                            window["DP_jQuery_" + dpuuid].datepicker._hideDatepicker()
                        },
                        today: function() {
                            window["DP_jQuery_" + dpuuid].datepicker._gotoToday(i)
                        },
                        selectDay: function() {
                            return window["DP_jQuery_" + dpuuid].datepicker._selectDay(i, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
                        },
                        selectMonth: function() {
                            return window["DP_jQuery_" + dpuuid].datepicker._selectMonthYear(i, this, "M"), !1
                        },
                        selectYear: function() {
                            return window["DP_jQuery_" + dpuuid].datepicker._selectMonthYear(i, this, "Y"), !1
                        }
                    };
                    $(this).bind(this.getAttribute("data-event"), t[this.getAttribute("data-handler")])
                })
            },
            _generateHTML: function(t) {
                var e = new Date;
                e = this._daylightSavingAdjust(new Date(e.getFullYear(), e.getMonth(), e.getDate()));
                var i = this._get(t, "isRTL"),
                    s = this._get(t, "showButtonPanel"),
                    n = this._get(t, "hideIfNoPrevNext"),
                    o = this._get(t, "navigationAsDateFormat"),
                    r = this._getNumberOfMonths(t),
                    a = this._get(t, "showCurrentAtPos"),
                    l = this._get(t, "stepMonths"),
                    h = 1 != r[0] || 1 != r[1],
                    c = this._daylightSavingAdjust(t.currentDay ? new Date(t.currentYear, t.currentMonth, t.currentDay) : new Date(9999, 9, 9)),
                    u = this._getMinMaxDate(t, "min"),
                    d = this._getMinMaxDate(t, "max"),
                    p = t.drawMonth - a,
                    f = t.drawYear;
                if (p < 0 && (p += 12, f--), d) {
                    var g = this._daylightSavingAdjust(new Date(d.getFullYear(), d.getMonth() - r[0] * r[1] + 1, d.getDate()));
                    for (g = u && g < u ? u : g; this._daylightSavingAdjust(new Date(f, p, 1)) > g;) --p < 0 && (p = 11, f--)
                }
                t.drawMonth = p, t.drawYear = f;
                var m = this._get(t, "prevText");
                m = o ? this.formatDate(m, this._daylightSavingAdjust(new Date(f, p - l, 1)), this._getFormatConfig(t)) : m;
                var v = this._canAdjustMonth(t, -1, f, p) ? '<a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click" title="' + m + '"><span class="ui-icon ui-icon-circle-triangle-' + (i ? "e" : "w") + '">' + m + "</span></a>" : n ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + m + '"><span class="ui-icon ui-icon-circle-triangle-' + (i ? "e" : "w") + '">' + m + "</span></a>",
                    _ = this._get(t, "nextText");
                _ = o ? this.formatDate(_, this._daylightSavingAdjust(new Date(f, p + l, 1)), this._getFormatConfig(t)) : _;
                var b = this._canAdjustMonth(t, 1, f, p) ? '<a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click" title="' + _ + '"><span class="ui-icon ui-icon-circle-triangle-' + (i ? "w" : "e") + '">' + _ + "</span></a>" : n ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + _ + '"><span class="ui-icon ui-icon-circle-triangle-' + (i ? "w" : "e") + '">' + _ + "</span></a>",
                    y = this._get(t, "currentText"),
                    w = this._get(t, "gotoCurrent") && t.currentDay ? c : e;
                y = o ? this.formatDate(y, w, this._getFormatConfig(t)) : y;
                var C = t.inline ? "" : '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">' + this._get(t, "closeText") + "</button>",
                    x = s ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (i ? C : "") + (this._isInRange(t, w) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-handler="today" data-event="click">' + y + "</button>" : "") + (i ? "" : C) + "</div>" : "",
                    k = parseInt(this._get(t, "firstDay"), 10);
                k = isNaN(k) ? 0 : k;
                for (var D = this._get(t, "showWeek"), I = this._get(t, "dayNames"), E = (this._get(t, "dayNamesShort"), this._get(t, "dayNamesMin")), T = this._get(t, "monthNames"), S = this._get(t, "monthNamesShort"), A = this._get(t, "beforeShowDay"), P = this._get(t, "showOtherMonths"), M = this._get(t, "selectOtherMonths"), F = (this._get(t, "calculateWeek") || this.iso8601Week, this._getDefaultDate(t)), O = "", z = 0; z < r[0]; z++) {
                    var N = "";
                    this.maxRows = 4;
                    for (var H = 0; H < r[1]; H++) {
                        var L = this._daylightSavingAdjust(new Date(f, p, t.selectedDay)),
                            W = " ui-corner-all",
                            R = "";
                        if (h) {
                            if (R += '<div class="ui-datepicker-group', r[1] > 1) switch (H) {
                                case 0:
                                    R += " ui-datepicker-group-first", W = " ui-corner-" + (i ? "right" : "left");
                                    break;
                                case r[1] - 1:
                                    R += " ui-datepicker-group-last", W = " ui-corner-" + (i ? "left" : "right");
                                    break;
                                default:
                                    R += " ui-datepicker-group-middle", W = ""
                            }
                            R += '">'
                        }
                        R += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + W + '">' + (/all|left/.test(W) && 0 == z ? i ? b : v : "") + (/all|right/.test(W) && 0 == z ? i ? v : b : "") + this._generateMonthYearHeader(t, p, f, u, d, z > 0 || H > 0, T, S) + '</div><table class="ui-datepicker-calendar"><thead><tr>';
                        for (var j = D ? '<th class="ui-datepicker-week-col">' + this._get(t, "weekHeader") + "</th>" : "", B = 0; B < 7; B++) {
                            var Y = (B + k) % 7;
                            j += "<th" + ((B + k + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + '><span title="' + I[Y] + '">' + E[Y] + "</span></th>"
                        }
                        R += j + "</tr></thead><tbody>";
                        var q = this._getDaysInMonth(f, p);
                        f == t.selectedYear && p == t.selectedMonth && (t.selectedDay = Math.min(t.selectedDay, q));
                        var U = (this._getFirstDayOfMonth(f, p) - k + 7) % 7,
                            K = Math.ceil((U + q) / 7),
                            Q = h && this.maxRows > K ? this.maxRows : K;
                        this.maxRows = Q;
                        for (var V = this._daylightSavingAdjust(new Date(f, p, 1 - U)), X = 0; X < Q; X++) {
                            R += "<tr>";
                            var G = D ? '<td class="ui-datepicker-week-col">' + this._get(t, "calculateWeek")(V) + "</td>" : "";
                            for (B = 0; B < 7; B++) {
                                var Z = A ? A.apply(t.input ? t.input[0] : null, [V]) : [!0, ""],
                                    J = V.getMonth() != p,
                                    tt = J && !M || !Z[0] || u && V < u || d && V > d;
                                G += '<td class="' + ((B + k + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (J ? " ui-datepicker-other-month" : "") + (V.getTime() == L.getTime() && p == t.selectedMonth && t._keyEvent || F.getTime() == V.getTime() && F.getTime() == L.getTime() ? " " + this._dayOverClass : "") + (tt ? " " + this._unselectableClass + " ui-state-disabled" : "") + (J && !P ? "" : " " + Z[1] + (V.getTime() == c.getTime() ? " " + this._currentClass : "") + (V.getTime() == e.getTime() ? " ui-datepicker-today" : "")) + '"' + (J && !P || !Z[2] ? "" : ' title="' + Z[2] + '"') + (tt ? "" : ' data-handler="selectDay" data-event="click" data-month="' + V.getMonth() + '" data-year="' + V.getFullYear() + '"') + ">" + (J && !P ? "&#xa0;" : tt ? '<span class="ui-state-default">' + V.getDate() + "</span>" : '<a class="ui-state-default' + (V.getTime() == e.getTime() ? " ui-state-highlight" : "") + (V.getTime() == c.getTime() ? " ui-state-active" : "") + (J ? " ui-priority-secondary" : "") + '" href="#">' + V.getDate() + "</a>") + "</td>", V.setDate(V.getDate() + 1), V = this._daylightSavingAdjust(V)
                            }
                            R += G + "</tr>"
                        }++p > 11 && (p = 0, f++), N += R += "</tbody></table>" + (h ? "</div>" + (r[0] > 0 && H == r[1] - 1 ? '<div class="ui-datepicker-row-break"></div>' : "") : "")
                    }
                    O += N
                }
                return O += x + ($.browser.msie && parseInt($.browser.version, 10) < 7 && !t.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : ""), t._keyEvent = !1, O
            },
            _generateMonthYearHeader: function(t, e, i, s, n, o, r, a) {
                var l = this._get(t, "changeMonth"),
                    h = this._get(t, "changeYear"),
                    c = this._get(t, "showMonthAfterYear"),
                    u = '<div class="ui-datepicker-title">',
                    d = "";
                if (o || !l) d += '<span class="ui-datepicker-month">' + r[e] + "</span>";
                else {
                    var p = s && s.getFullYear() == i,
                        f = n && n.getFullYear() == i;
                    d += '<select class="ui-datepicker-month" data-handler="selectMonth" data-event="change">';
                    for (var g = 0; g < 12; g++)(!p || g >= s.getMonth()) && (!f || g <= n.getMonth()) && (d += '<option value="' + g + '"' + (g == e ? ' selected="selected"' : "") + ">" + a[g] + "</option>");
                    d += "</select>"
                }
                if (c || (u += d + (!o && l && h ? "" : "&#xa0;")), !t.yearshtml)
                    if (t.yearshtml = "", o || !h) u += '<span class="ui-datepicker-year">' + i + "</span>";
                    else {
                        var m = this._get(t, "yearRange").split(":"),
                            v = (new Date).getFullYear(),
                            _ = function(t) {
                                var e = t.match(/c[+-].*/) ? i + parseInt(t.substring(1), 10) : t.match(/[+-].*/) ? v + parseInt(t, 10) : parseInt(t, 10);
                                return isNaN(e) ? v : e
                            },
                            b = _(m[0]),
                            y = Math.max(b, _(m[1] || ""));
                        for (b = s ? Math.max(b, s.getFullYear()) : b, y = n ? Math.min(y, n.getFullYear()) : y, t.yearshtml += '<select class="ui-datepicker-year" data-handler="selectYear" data-event="change">'; b <= y; b++) t.yearshtml += '<option value="' + b + '"' + (b == i ? ' selected="selected"' : "") + ">" + b + "</option>";
                        t.yearshtml += "</select>", u += t.yearshtml, t.yearshtml = null
                    } return u += this._get(t, "yearSuffix"), c && (u += (!o && l && h ? "" : "&#xa0;") + d), u += "</div>"
            },
            _adjustInstDate: function(t, e, i) {
                var s = t.drawYear + ("Y" == i ? e : 0),
                    n = t.drawMonth + ("M" == i ? e : 0),
                    o = Math.min(t.selectedDay, this._getDaysInMonth(s, n)) + ("D" == i ? e : 0),
                    r = this._restrictMinMax(t, this._daylightSavingAdjust(new Date(s, n, o)));
                t.selectedDay = r.getDate(), t.drawMonth = t.selectedMonth = r.getMonth(), t.drawYear = t.selectedYear = r.getFullYear(), ("M" == i || "Y" == i) && this._notifyChange(t)
            },
            _restrictMinMax: function(t, e) {
                var i = this._getMinMaxDate(t, "min"),
                    s = this._getMinMaxDate(t, "max"),
                    n = i && e < i ? i : e;
                return n = s && n > s ? s : n
            },
            _notifyChange: function(t) {
                var e = this._get(t, "onChangeMonthYear");
                e && e.apply(t.input ? t.input[0] : null, [t.selectedYear, t.selectedMonth + 1, t])
            },
            _getNumberOfMonths: function(t) {
                var e = this._get(t, "numberOfMonths");
                return null == e ? [1, 1] : "number" == typeof e ? [1, e] : e
            },
            _getMinMaxDate: function(t, e) {
                return this._determineDate(t, this._get(t, e + "Date"), null)
            },
            _getDaysInMonth: function(t, e) {
                return 32 - this._daylightSavingAdjust(new Date(t, e, 32)).getDate()
            },
            _getFirstDayOfMonth: function(t, e) {
                return new Date(t, e, 1).getDay()
            },
            _canAdjustMonth: function(t, e, i, s) {
                var n = this._getNumberOfMonths(t),
                    o = this._daylightSavingAdjust(new Date(i, s + (e < 0 ? e : n[0] * n[1]), 1));
                return e < 0 && o.setDate(this._getDaysInMonth(o.getFullYear(), o.getMonth())), this._isInRange(t, o)
            },
            _isInRange: function(t, e) {
                var i = this._getMinMaxDate(t, "min"),
                    s = this._getMinMaxDate(t, "max");
                return (!i || e.getTime() >= i.getTime()) && (!s || e.getTime() <= s.getTime())
            },
            _getFormatConfig: function(t) {
                var e = this._get(t, "shortYearCutoff");
                return {
                    shortYearCutoff: e = "string" != typeof e ? e : (new Date).getFullYear() % 100 + parseInt(e, 10),
                    dayNamesShort: this._get(t, "dayNamesShort"),
                    dayNames: this._get(t, "dayNames"),
                    monthNamesShort: this._get(t, "monthNamesShort"),
                    monthNames: this._get(t, "monthNames")
                }
            },
            _formatDate: function(t, e, i, s) {
                e || (t.currentDay = t.selectedDay, t.currentMonth = t.selectedMonth, t.currentYear = t.selectedYear);
                var n = e ? "object" == typeof e ? e : this._daylightSavingAdjust(new Date(s, i, e)) : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
                return this.formatDate(this._get(t, "dateFormat"), n, this._getFormatConfig(t))
            }
        }), $.fn.datepicker = function(t) {
            if (!this.length) return this;
            $.datepicker.initialized || ($(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv), $.datepicker.initialized = !0);
            var e = Array.prototype.slice.call(arguments, 1);
            return "string" != typeof t || "isDisabled" != t && "getDate" != t && "widget" != t ? "option" == t && 2 == arguments.length && "string" == typeof arguments[1] ? $.datepicker["_" + t + "Datepicker"].apply($.datepicker, [this[0]].concat(e)) : this.each(function() {
                "string" == typeof t ? $.datepicker["_" + t + "Datepicker"].apply($.datepicker, [this].concat(e)) : $.datepicker._attachDatepicker(this, t)
            }) : $.datepicker["_" + t + "Datepicker"].apply($.datepicker, [this[0]].concat(e))
        }, $.datepicker = new Datepicker, $.datepicker.initialized = !1, $.datepicker.uuid = (new Date).getTime(), $.datepicker.version = "1.8.22", window["DP_jQuery_" + dpuuid] = $
    }(jQuery),
    function(t, e) {
        var i = "ui-dialog ui-widget ui-widget-content ui-corner-all ",
            s = {
                buttons: !0,
                height: !0,
                maxHeight: !0,
                maxWidth: !0,
                minHeight: !0,
                minWidth: !0,
                width: !0
            },
            n = {
                maxHeight: !0,
                maxWidth: !0,
                minHeight: !0,
                minWidth: !0
            },
            o = t.attrFn || {
                val: !0,
                css: !0,
                html: !0,
                text: !0,
                data: !0,
                width: !0,
                height: !0,
                offset: !0,
                click: !0
            };
        t.widget("ui.dialog", {
            options: {
                autoOpen: !0,
                buttons: {},
                closeOnEscape: !0,
                closeText: "close",
                dialogClass: "",
                draggable: !0,
                hide: null,
                height: "auto",
                maxHeight: !1,
                maxWidth: !1,
                minHeight: 150,
                minWidth: 150,
                modal: !1,
                position: {
                    my: "center",
                    at: "center",
                    collision: "fit",
                    using: function(e) {
                        var i = t(this).css(e).offset().top;
                        i < 0 && t(this).css("top", e.top - i)
                    }
                },
                resizable: !0,
                show: null,
                stack: !0,
                title: "",
                width: 300,
                zIndex: 1e3
            },
            _create: function() {
                this.originalTitle = this.element.attr("title"), "string" != typeof this.originalTitle && (this.originalTitle = ""), this.options.title = this.options.title || this.originalTitle;
                var e = this,
                    s = e.options,
                    n = s.title || "&#160;",
                    o = t.ui.dialog.getTitleId(e.element),
                    r = (e.uiDialog = t("<div></div>")).appendTo(document.body).hide().addClass(i + s.dialogClass).css({
                        zIndex: s.zIndex
                    }).attr("tabIndex", -1).css("outline", 0).keydown(function(i) {
                        s.closeOnEscape && !i.isDefaultPrevented() && i.keyCode && i.keyCode === t.ui.keyCode.ESCAPE && (e.close(i), i.preventDefault())
                    }).attr({
                        role: "dialog",
                        "aria-labelledby": o
                    }).mousedown(function(t) {
                        e.moveToTop(!1, t)
                    }),
                    a = (e.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(r), (e.uiDialogTitlebar = t("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(r)),
                    l = t('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role", "button").hover(function() {
                        l.addClass("ui-state-hover")
                    }, function() {
                        l.removeClass("ui-state-hover")
                    }).focus(function() {
                        l.addClass("ui-state-focus")
                    }).blur(function() {
                        l.removeClass("ui-state-focus")
                    }).click(function(t) {
                        return e.close(t), !1
                    }).appendTo(a);
                (e.uiDialogTitlebarCloseText = t("<span></span>")).addClass("ui-icon ui-icon-closethick").text(s.closeText).appendTo(l), t("<span></span>").addClass("ui-dialog-title").attr("id", o).html(n).prependTo(a);
                t.isFunction(s.beforeclose) && !t.isFunction(s.beforeClose) && (s.beforeClose = s.beforeclose), a.find("*").add(a).disableSelection(), s.draggable && t.fn.draggable && e._makeDraggable(), s.resizable && t.fn.resizable && e._makeResizable(), e._createButtons(s.buttons), e._isOpen = !1, t.fn.bgiframe && r.bgiframe()
            },
            _init: function() {
                this.options.autoOpen && this.open()
            },
            destroy: function() {
                return this.overlay && this.overlay.destroy(), this.uiDialog.hide(), this.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"), this.uiDialog.remove(), this.originalTitle && this.element.attr("title", this.originalTitle), this
            },
            widget: function() {
                return this.uiDialog
            },
            close: function(e) {
                var i, s, n = this;
                if (!1 !== n._trigger("beforeClose", e)) return n.overlay && n.overlay.destroy(), n.uiDialog.unbind("keypress.ui-dialog"), n._isOpen = !1, n.options.hide ? n.uiDialog.hide(n.options.hide, function() {
                    n._trigger("close", e)
                }) : (n.uiDialog.hide(), n._trigger("close", e)), t.ui.dialog.overlay.resize(), n.options.modal && (i = 0, t(".ui-dialog").each(function() {
                    this !== n.uiDialog[0] && (s = t(this).css("z-index"), isNaN(s) || (i = Math.max(i, s)))
                }), t.ui.dialog.maxZ = i), n
            },
            isOpen: function() {
                return this._isOpen
            },
            moveToTop: function(e, i) {
                var s, n = this,
                    o = n.options;
                return o.modal && !e || !o.stack && !o.modal ? n._trigger("focus", i) : (o.zIndex > t.ui.dialog.maxZ && (t.ui.dialog.maxZ = o.zIndex), n.overlay && (t.ui.dialog.maxZ += 1, n.overlay.$el.css("z-index", t.ui.dialog.overlay.maxZ = t.ui.dialog.maxZ)), s = {
                    scrollTop: n.element.scrollTop(),
                    scrollLeft: n.element.scrollLeft()
                }, t.ui.dialog.maxZ += 1, n.uiDialog.css("z-index", t.ui.dialog.maxZ), n.element.attr(s), n._trigger("focus", i), n)
            },
            open: function() {
                if (!this._isOpen) {
                    var e = this,
                        i = e.options,
                        s = e.uiDialog;
                    return e.overlay = i.modal ? new t.ui.dialog.overlay(e) : null, e._size(), e._position(i.position), s.show(i.show), e.moveToTop(!0), i.modal && s.bind("keydown.ui-dialog", function(e) {
                        if (e.keyCode === t.ui.keyCode.TAB) {
                            var i = t(":tabbable", this),
                                s = i.filter(":first"),
                                n = i.filter(":last");
                            return e.target !== n[0] || e.shiftKey ? e.target === s[0] && e.shiftKey ? (n.focus(1), !1) : void 0 : (s.focus(1), !1)
                        }
                    }), t(e.element.find(":tabbable").get().concat(s.find(".ui-dialog-buttonpane :tabbable").get().concat(s.get()))).eq(0).focus(), e._isOpen = !0, e._trigger("open"), e
                }
            },
            _createButtons: function(e) {
                var i = this,
                    s = !1,
                    n = t("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),
                    r = t("<div></div>").addClass("ui-dialog-buttonset").appendTo(n);
                i.uiDialog.find(".ui-dialog-buttonpane").remove(), "object" == typeof e && null !== e && t.each(e, function() {
                    return !(s = !0)
                }), s && (t.each(e, function(e, s) {
                    s = t.isFunction(s) ? {
                        click: s,
                        text: e
                    } : s;
                    var n = t('<button type="button"></button>').click(function() {
                        s.click.apply(i.element[0], arguments)
                    }).appendTo(r);
                    t.each(s, function(t, e) {
                        "click" !== t && (t in o ? n[t](e) : n.attr(t, e))
                    }), t.fn.button && n.button()
                }), n.appendTo(i.uiDialog))
            },
            _makeDraggable: function() {
                function e(t) {
                    return {
                        position: t.position,
                        offset: t.offset
                    }
                }
                var i, s = this,
                    n = s.options,
                    o = t(document);
                s.uiDialog.draggable({
                    cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                    handle: ".ui-dialog-titlebar",
                    containment: "document",
                    start: function(o, r) {
                        i = "auto" === n.height ? "auto" : t(this).height(), t(this).height(t(this).height()).addClass("ui-dialog-dragging"), s._trigger("dragStart", o, e(r))
                    },
                    drag: function(t, i) {
                        s._trigger("drag", t, e(i))
                    },
                    stop: function(r, a) {
                        n.position = [a.position.left - o.scrollLeft(), a.position.top - o.scrollTop()], t(this).removeClass("ui-dialog-dragging").height(i), s._trigger("dragStop", r, e(a)), t.ui.dialog.overlay.resize()
                    }
                })
            },
            _makeResizable: function(e) {
                function i(t) {
                    return {
                        originalPosition: t.originalPosition,
                        originalSize: t.originalSize,
                        position: t.position,
                        size: t.size
                    }
                }
                e = void 0 === e ? this.options.resizable : e;
                var s = this,
                    n = s.options,
                    o = s.uiDialog.css("position"),
                    r = "string" == typeof e ? e : "n,e,s,w,se,sw,ne,nw";
                s.uiDialog.resizable({
                    cancel: ".ui-dialog-content",
                    containment: "document",
                    alsoResize: s.element,
                    maxWidth: n.maxWidth,
                    maxHeight: n.maxHeight,
                    minWidth: n.minWidth,
                    minHeight: s._minHeight(),
                    handles: r,
                    start: function(e, n) {
                        t(this).addClass("ui-dialog-resizing"), s._trigger("resizeStart", e, i(n))
                    },
                    resize: function(t, e) {
                        s._trigger("resize", t, i(e))
                    },
                    stop: function(e, o) {
                        t(this).removeClass("ui-dialog-resizing"), n.height = t(this).height(), n.width = t(this).width(), s._trigger("resizeStop", e, i(o)), t.ui.dialog.overlay.resize()
                    }
                }).css("position", o).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
            },
            _minHeight: function() {
                var t = this.options;
                return "auto" === t.height ? t.minHeight : Math.min(t.minHeight, t.height)
            },
            _position: function(e) {
                var i, s = [],
                    n = [0, 0];
                e ? (("string" == typeof e || "object" == typeof e && "0" in e) && (1 === (s = e.split ? e.split(" ") : [e[0], e[1]]).length && (s[1] = s[0]), t.each(["left", "top"], function(t, e) {
                    +s[t] === s[t] && (n[t] = s[t], s[t] = e)
                }), e = {
                    my: s.join(" "),
                    at: s.join(" "),
                    offset: n.join(" ")
                }), e = t.extend({}, t.ui.dialog.prototype.options.position, e)) : e = t.ui.dialog.prototype.options.position, (i = this.uiDialog.is(":visible")) || this.uiDialog.show(), this.uiDialog.css({
                    top: 0,
                    left: 0
                }).position(t.extend({
                    of: window
                }, e)), i || this.uiDialog.hide()
            },
            _setOptions: function(e) {
                var i = this,
                    o = {},
                    r = !1;
                t.each(e, function(t, e) {
                    i._setOption(t, e), t in s && (r = !0), t in n && (o[t] = e)
                }), r && this._size(), this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", o)
            },
            _setOption: function(e, s) {
                var n = this.uiDialog;
                switch (e) {
                    case "beforeclose":
                        e = "beforeClose";
                        break;
                    case "buttons":
                        this._createButtons(s);
                        break;
                    case "closeText":
                        this.uiDialogTitlebarCloseText.text("" + s);
                        break;
                    case "dialogClass":
                        n.removeClass(this.options.dialogClass).addClass(i + s);
                        break;
                    case "disabled":
                        s ? n.addClass("ui-dialog-disabled") : n.removeClass("ui-dialog-disabled");
                        break;
                    case "draggable":
                        var o = n.is(":data(draggable)");
                        o && !s && n.draggable("destroy"), !o && s && this._makeDraggable();
                        break;
                    case "position":
                        this._position(s);
                        break;
                    case "resizable":
                        var r = n.is(":data(resizable)");
                        r && !s && n.resizable("destroy"), r && "string" == typeof s && n.resizable("option", "handles", s), !r && !1 !== s && this._makeResizable(s);
                        break;
                    case "title":
                        t(".ui-dialog-title", this.uiDialogTitlebar).html("" + (s || "&#160;"))
                }
                t.Widget.prototype._setOption.apply(this, arguments)
            },
            _size: function() {
                var e, i, s = this.options,
                    n = this.uiDialog.is(":visible");
                if (this.element.show().css({
                        width: "auto",
                        minHeight: 0,
                        height: 0
                    }), s.minWidth > s.width && (s.width = s.minWidth), e = this.uiDialog.css({
                        height: "auto",
                        width: s.width
                    }).height(), i = Math.max(0, s.minHeight - e), "auto" === s.height)
                    if (t.support.minHeight) this.element.css({
                        minHeight: i,
                        height: "auto"
                    });
                    else {
                        this.uiDialog.show();
                        var o = this.element.css("height", "auto").height();
                        n || this.uiDialog.hide(), this.element.height(Math.max(o, i))
                    }
                else this.element.height(Math.max(s.height - e, 0));
                this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
            }
        }), t.extend(t.ui.dialog, {
            version: "1.8.22",
            uuid: 0,
            maxZ: 0,
            getTitleId: function(t) {
                var e = t.attr("id");
                return e || (this.uuid += 1, e = this.uuid), "ui-dialog-title-" + e
            },
            overlay: function(e) {
                this.$el = t.ui.dialog.overlay.create(e)
            }
        }), t.extend(t.ui.dialog.overlay, {
            instances: [],
            oldInstances: [],
            maxZ: 0,
            events: t.map("focus,mousedown,mouseup,keydown,keypress,click".split(","), function(t) {
                return t + ".dialog-overlay"
            }).join(" "),
            create: function(e) {
                0 === this.instances.length && (setTimeout(function() {
                    t.ui.dialog.overlay.instances.length && t(document).bind(t.ui.dialog.overlay.events, function(e) {
                        if (t(e.target).zIndex() < t.ui.dialog.overlay.maxZ) return !1
                    })
                }, 1), t(document).bind("keydown.dialog-overlay", function(i) {
                    e.options.closeOnEscape && !i.isDefaultPrevented() && i.keyCode && i.keyCode === t.ui.keyCode.ESCAPE && (e.close(i), i.preventDefault())
                }), t(window).bind("resize.dialog-overlay", t.ui.dialog.overlay.resize));
                var i = (this.oldInstances.pop() || t("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({
                    width: this.width(),
                    height: this.height()
                });
                return t.fn.bgiframe && i.bgiframe(), this.instances.push(i), i
            },
            destroy: function(e) {
                var i = t.inArray(e, this.instances); - 1 != i && this.oldInstances.push(this.instances.splice(i, 1)[0]), 0 === this.instances.length && t([document, window]).unbind(".dialog-overlay"), e.remove();
                var s = 0;
                t.each(this.instances, function() {
                    s = Math.max(s, this.css("z-index"))
                }), this.maxZ = s
            },
            height: function() {
                var e;
                return t.browser.msie && t.browser.version < 7 ? (e = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)) < Math.max(document.documentElement.offsetHeight, document.body.offsetHeight) ? t(window).height() + "px" : e + "px" : t(document).height() + "px"
            },
            width: function() {
                var e;
                return t.browser.msie ? (e = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth)) < Math.max(document.documentElement.offsetWidth, document.body.offsetWidth) ? t(window).width() + "px" : e + "px" : t(document).width() + "px"
            },
            resize: function() {
                var e = t([]);
                t.each(t.ui.dialog.overlay.instances, function() {
                    e = e.add(this)
                }), e.css({
                    width: 0,
                    height: 0
                }).css({
                    width: t.ui.dialog.overlay.width(),
                    height: t.ui.dialog.overlay.height()
                })
            }
        }), t.extend(t.ui.dialog.overlay.prototype, {
            destroy: function() {
                t.ui.dialog.overlay.destroy(this.$el)
            }
        })
    }(jQuery),
    function(t, e) {
        t.ui = t.ui || {};
        var i = /left|center|right/,
            s = /top|center|bottom/,
            n = "center",
            o = {},
            r = t.fn.position,
            a = t.fn.offset;
        t.fn.position = function(e) {
                if (!e || !e.of) return r.apply(this, arguments);
                e = t.extend({}, e);
                var a, l, h, c = t(e.of),
                    u = c[0],
                    d = (e.collision || "flip").split(" "),
                    p = e.offset ? e.offset.split(" ") : [0, 0];
                return 9 === u.nodeType ? (a = c.width(), l = c.height(), h = {
                    top: 0,
                    left: 0
                }) : u.setTimeout ? (a = c.width(), l = c.height(), h = {
                    top: c.scrollTop(),
                    left: c.scrollLeft()
                }) : u.preventDefault ? (e.at = "left top", a = l = 0, h = {
                    top: e.of.pageY,
                    left: e.of.pageX
                }) : (a = c.outerWidth(), l = c.outerHeight(), h = c.offset()), t.each(["my", "at"], function() {
                    var t = (e[this] || "").split(" ");
                    1 === t.length && (t = i.test(t[0]) ? t.concat([n]) : s.test(t[0]) ? [n].concat(t) : [n, n]), t[0] = i.test(t[0]) ? t[0] : n, t[1] = s.test(t[1]) ? t[1] : n, e[this] = t
                }), 1 === d.length && (d[1] = d[0]), p[0] = parseInt(p[0], 10) || 0, 1 === p.length && (p[1] = p[0]), p[1] = parseInt(p[1], 10) || 0, "right" === e.at[0] ? h.left += a : e.at[0] === n && (h.left += a / 2), "bottom" === e.at[1] ? h.top += l : e.at[1] === n && (h.top += l / 2), h.left += p[0], h.top += p[1], this.each(function() {
                    var i, s = t(this),
                        r = s.outerWidth(),
                        c = s.outerHeight(),
                        u = parseInt(t.curCSS(this, "marginLeft", !0)) || 0,
                        f = parseInt(t.curCSS(this, "marginTop", !0)) || 0,
                        g = r + u + (parseInt(t.curCSS(this, "marginRight", !0)) || 0),
                        m = c + f + (parseInt(t.curCSS(this, "marginBottom", !0)) || 0),
                        v = t.extend({}, h);
                    "right" === e.my[0] ? v.left -= r : e.my[0] === n && (v.left -= r / 2), "bottom" === e.my[1] ? v.top -= c : e.my[1] === n && (v.top -= c / 2), o.fractions || (v.left = Math.round(v.left), v.top = Math.round(v.top)), i = {
                        left: v.left - u,
                        top: v.top - f
                    }, t.each(["left", "top"], function(s, n) {
                        t.ui.position[d[s]] && t.ui.position[d[s]][n](v, {
                            targetWidth: a,
                            targetHeight: l,
                            elemWidth: r,
                            elemHeight: c,
                            collisionPosition: i,
                            collisionWidth: g,
                            collisionHeight: m,
                            offset: p,
                            my: e.my,
                            at: e.at
                        })
                    }), t.fn.bgiframe && s.bgiframe(), s.offset(t.extend(v, {
                        using: e.using
                    }))
                })
            }, t.ui.position = {
                fit: {
                    left: function(e, i) {
                        var s = t(window),
                            n = i.collisionPosition.left + i.collisionWidth - s.width() - s.scrollLeft();
                        e.left = n > 0 ? e.left - n : Math.max(e.left - i.collisionPosition.left, e.left)
                    },
                    top: function(e, i) {
                        var s = t(window),
                            n = i.collisionPosition.top + i.collisionHeight - s.height() - s.scrollTop();
                        e.top = n > 0 ? e.top - n : Math.max(e.top - i.collisionPosition.top, e.top)
                    }
                },
                flip: {
                    left: function(e, i) {
                        if (i.at[0] !== n) {
                            var s = t(window),
                                o = i.collisionPosition.left + i.collisionWidth - s.width() - s.scrollLeft(),
                                r = "left" === i.my[0] ? -i.elemWidth : "right" === i.my[0] ? i.elemWidth : 0,
                                a = "left" === i.at[0] ? i.targetWidth : -i.targetWidth,
                                l = -2 * i.offset[0];
                            e.left += i.collisionPosition.left < 0 ? r + a + l : o > 0 ? r + a + l : 0
                        }
                    },
                    top: function(e, i) {
                        if (i.at[1] !== n) {
                            var s = t(window),
                                o = i.collisionPosition.top + i.collisionHeight - s.height() - s.scrollTop(),
                                r = "top" === i.my[1] ? -i.elemHeight : "bottom" === i.my[1] ? i.elemHeight : 0,
                                a = "top" === i.at[1] ? i.targetHeight : -i.targetHeight,
                                l = -2 * i.offset[1];
                            e.top += i.collisionPosition.top < 0 ? r + a + l : o > 0 ? r + a + l : 0
                        }
                    }
                }
            }, t.offset.setOffset || (t.offset.setOffset = function(e, i) {
                /static/.test(t.curCSS(e, "position")) && (e.style.position = "relative");
                var s = t(e),
                    n = s.offset(),
                    o = parseInt(t.curCSS(e, "top", !0), 10) || 0,
                    r = parseInt(t.curCSS(e, "left", !0), 10) || 0,
                    a = {
                        top: i.top - n.top + o,
                        left: i.left - n.left + r
                    };
                "using" in i ? i.using.call(e, a) : s.css(a)
            }, t.fn.offset = function(e) {
                var i = this[0];
                return i && i.ownerDocument ? e ? t.isFunction(e) ? this.each(function(i) {
                    t(this).offset(e.call(this, i, t(this).offset()))
                }) : this.each(function() {
                    t.offset.setOffset(this, e)
                }) : a.call(this) : null
            }),
            function() {
                var e, i, s, n, r, a = document.getElementsByTagName("body")[0],
                    l = document.createElement("div");
                for (var h in e = document.createElement(a ? "div" : "body"), s = {
                        visibility: "hidden",
                        width: 0,
                        height: 0,
                        border: 0,
                        margin: 0,
                        background: "none"
                    }, a && t.extend(s, {
                        position: "absolute",
                        left: "-1000px",
                        top: "-1000px"
                    }), s) e.style[h] = s[h];
                e.appendChild(l), (i = a || document.documentElement).insertBefore(e, i.firstChild), l.style.cssText = "position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;", n = t(l).offset(function(t, e) {
                    return e
                }).offset(), e.innerHTML = "", i.removeChild(e), r = n.top + n.left + (a ? 2e3 : 0), o.fractions = r > 21 && r < 22
            }()
    }(jQuery),
    function(t, e) {
        t.widget("ui.progressbar", {
            options: {
                value: 0,
                max: 100
            },
            min: 0,
            _create: function() {
                this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                    role: "progressbar",
                    "aria-valuemin": this.min,
                    "aria-valuemax": this.options.max,
                    "aria-valuenow": this._value()
                }), this.valueDiv = t("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element), this.oldValue = this._value(), this._refreshValue()
            },
            destroy: function() {
                this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.valueDiv.remove(), t.Widget.prototype.destroy.apply(this, arguments)
            },
            value: function(t) {
                return void 0 === t ? this._value() : (this._setOption("value", t), this)
            },
            _setOption: function(e, i) {
                "value" === e && (this.options.value = i, this._refreshValue(), this._value() === this.options.max && this._trigger("complete")), t.Widget.prototype._setOption.apply(this, arguments)
            },
            _value: function() {
                var t = this.options.value;
                return "number" != typeof t && (t = 0), Math.min(this.options.max, Math.max(this.min, t))
            },
            _percentage: function() {
                return 100 * this._value() / this.options.max
            },
            _refreshValue: function() {
                var t = this.value(),
                    e = this._percentage();
                this.oldValue !== t && (this.oldValue = t, this._trigger("change")), this.valueDiv.toggle(t > this.min).toggleClass("ui-corner-right", t === this.options.max).width(e.toFixed(0) + "%"), this.element.attr("aria-valuenow", t)
            }
        }), t.extend(t.ui.progressbar, {
            version: "1.8.22"
        })
    }(jQuery),
    function(t, e) {
        t.widget("ui.slider", t.ui.mouse, {
            widgetEventPrefix: "slide",
            options: {
                animate: !1,
                distance: 0,
                max: 100,
                min: 0,
                orientation: "horizontal",
                range: !1,
                step: 1,
                value: 0,
                values: null
            },
            _create: function() {
                var e = this,
                    i = this.options,
                    s = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                    n = i.values && i.values.length || 1,
                    o = [];
                this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all" + (i.disabled ? " ui-slider-disabled ui-disabled" : "")), this.range = t([]), i.range && (!0 === i.range && (i.values || (i.values = [this._valueMin(), this._valueMin()]), i.values.length && 2 !== i.values.length && (i.values = [i.values[0], i.values[0]])), this.range = t("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header" + ("min" === i.range || "max" === i.range ? " ui-slider-range-" + i.range : "")));
                for (var r = s.length; r < n; r += 1) o.push("<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>");
                this.handles = s.add(t(o.join("")).appendTo(e.element)), this.handle = this.handles.eq(0), this.handles.add(this.range).filter("a").click(function(t) {
                    t.preventDefault()
                }).hover(function() {
                    i.disabled || t(this).addClass("ui-state-hover")
                }, function() {
                    t(this).removeClass("ui-state-hover")
                }).focus(function() {
                    i.disabled ? t(this).blur() : (t(".ui-slider .ui-state-focus").removeClass("ui-state-focus"), t(this).addClass("ui-state-focus"))
                }).blur(function() {
                    t(this).removeClass("ui-state-focus")
                }), this.handles.each(function(e) {
                    t(this).data("index.ui-slider-handle", e)
                }), this.handles.keydown(function(i) {
                    var s, n, o, r = t(this).data("index.ui-slider-handle");
                    if (!e.options.disabled) {
                        switch (i.keyCode) {
                            case t.ui.keyCode.HOME:
                            case t.ui.keyCode.END:
                            case t.ui.keyCode.PAGE_UP:
                            case t.ui.keyCode.PAGE_DOWN:
                            case t.ui.keyCode.UP:
                            case t.ui.keyCode.RIGHT:
                            case t.ui.keyCode.DOWN:
                            case t.ui.keyCode.LEFT:
                                if (i.preventDefault(), !e._keySliding && (e._keySliding = !0, t(this).addClass("ui-state-active"), !1 === e._start(i, r))) return
                        }
                        switch (o = e.options.step, s = n = e.options.values && e.options.values.length ? e.values(r) : e.value(), i.keyCode) {
                            case t.ui.keyCode.HOME:
                                n = e._valueMin();
                                break;
                            case t.ui.keyCode.END:
                                n = e._valueMax();
                                break;
                            case t.ui.keyCode.PAGE_UP:
                                n = e._trimAlignValue(s + (e._valueMax() - e._valueMin()) / 5);
                                break;
                            case t.ui.keyCode.PAGE_DOWN:
                                n = e._trimAlignValue(s - (e._valueMax() - e._valueMin()) / 5);
                                break;
                            case t.ui.keyCode.UP:
                            case t.ui.keyCode.RIGHT:
                                if (s === e._valueMax()) return;
                                n = e._trimAlignValue(s + o);
                                break;
                            case t.ui.keyCode.DOWN:
                            case t.ui.keyCode.LEFT:
                                if (s === e._valueMin()) return;
                                n = e._trimAlignValue(s - o)
                        }
                        e._slide(i, r, n)
                    }
                }).keyup(function(i) {
                    var s = t(this).data("index.ui-slider-handle");
                    e._keySliding && (e._keySliding = !1, e._stop(i, s), e._change(i, s), t(this).removeClass("ui-state-active"))
                }), this._refreshValue(), this._animateOff = !1
            },
            destroy: function() {
                return this.handles.remove(), this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider"), this._mouseDestroy(), this
            },
            _mouseCapture: function(e) {
                var i, s, n, o, r, a, l, h, c = this.options;
                return !c.disabled && (this.elementSize = {
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight()
                }, this.elementOffset = this.element.offset(), i = {
                    x: e.pageX,
                    y: e.pageY
                }, s = this._normValueFromMouse(i), n = this._valueMax() - this._valueMin() + 1, r = this, this.handles.each(function(e) {
                    var i = Math.abs(s - r.values(e));
                    n > i && (n = i, o = t(this), a = e)
                }), !0 === c.range && this.values(1) === c.min && (a += 1, o = t(this.handles[a])), !1 !== this._start(e, a) && (this._mouseSliding = !0, r._handleIndex = a, o.addClass("ui-state-active").focus(), l = o.offset(), h = !t(e.target).parents().andSelf().is(".ui-slider-handle"), this._clickOffset = h ? {
                    left: 0,
                    top: 0
                } : {
                    left: e.pageX - l.left - o.width() / 2,
                    top: e.pageY - l.top - o.height() / 2 - (parseInt(o.css("borderTopWidth"), 10) || 0) - (parseInt(o.css("borderBottomWidth"), 10) || 0) + (parseInt(o.css("marginTop"), 10) || 0)
                }, this.handles.hasClass("ui-state-hover") || this._slide(e, a, s), this._animateOff = !0, !0))
            },
            _mouseStart: function(t) {
                return !0
            },
            _mouseDrag: function(t) {
                var e = {
                        x: t.pageX,
                        y: t.pageY
                    },
                    i = this._normValueFromMouse(e);
                return this._slide(t, this._handleIndex, i), !1
            },
            _mouseStop: function(t) {
                return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(t, this._handleIndex), this._change(t, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
            },
            _detectOrientation: function() {
                this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
            },
            _normValueFromMouse: function(t) {
                var e, i, s, n, o;
                return "horizontal" === this.orientation ? (e = this.elementSize.width, i = t.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (e = this.elementSize.height, i = t.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), (s = i / e) > 1 && (s = 1), s < 0 && (s = 0), "vertical" === this.orientation && (s = 1 - s), n = this._valueMax() - this._valueMin(), o = this._valueMin() + s * n, this._trimAlignValue(o)
            },
            _start: function(t, e) {
                var i = {
                    handle: this.handles[e],
                    value: this.value()
                };
                return this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._trigger("start", t, i)
            },
            _slide: function(t, e, i) {
                var s, n, o;
                this.options.values && this.options.values.length ? (s = this.values(e ? 0 : 1), 2 === this.options.values.length && !0 === this.options.range && (0 === e && i > s || 1 === e && i < s) && (i = s), i !== this.values(e) && ((n = this.values())[e] = i, o = this._trigger("slide", t, {
                    handle: this.handles[e],
                    value: i,
                    values: n
                }), s = this.values(e ? 0 : 1), !1 !== o && this.values(e, i, !0))) : i !== this.value() && (!1 !== (o = this._trigger("slide", t, {
                    handle: this.handles[e],
                    value: i
                })) && this.value(i))
            },
            _stop: function(t, e) {
                var i = {
                    handle: this.handles[e],
                    value: this.value()
                };
                this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._trigger("stop", t, i)
            },
            _change: function(t, e) {
                if (!this._keySliding && !this._mouseSliding) {
                    var i = {
                        handle: this.handles[e],
                        value: this.value()
                    };
                    this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._trigger("change", t, i)
                }
            },
            value: function(t) {
                return arguments.length ? (this.options.value = this._trimAlignValue(t), this._refreshValue(), void this._change(null, 0)) : this._value()
            },
            values: function(e, i) {
                var s, n, o;
                if (arguments.length > 1) return this.options.values[e] = this._trimAlignValue(i), this._refreshValue(), void this._change(null, e);
                if (!arguments.length) return this._values();
                if (!t.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(e) : this.value();
                for (s = this.options.values, n = arguments[0], o = 0; o < s.length; o += 1) s[o] = this._trimAlignValue(n[o]), this._change(null, o);
                this._refreshValue()
            },
            _setOption: function(e, i) {
                var s, n = 0;
                switch (t.isArray(this.options.values) && (n = this.options.values.length), t.Widget.prototype._setOption.apply(this, arguments), e) {
                    case "disabled":
                        i ? (this.handles.filter(".ui-state-focus").blur(), this.handles.removeClass("ui-state-hover"), this.handles.propAttr("disabled", !0), this.element.addClass("ui-disabled")) : (this.handles.propAttr("disabled", !1), this.element.removeClass("ui-disabled"));
                        break;
                    case "orientation":
                        this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue();
                        break;
                    case "value":
                        this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                        break;
                    case "values":
                        for (this._animateOff = !0, this._refreshValue(), s = 0; s < n; s += 1) this._change(null, s);
                        this._animateOff = !1
                }
            },
            _value: function() {
                var t = this.options.value;
                return t = this._trimAlignValue(t)
            },
            _values: function(t) {
                var e, i, s;
                if (arguments.length) return e = this.options.values[t], e = this._trimAlignValue(e);
                for (i = this.options.values.slice(), s = 0; s < i.length; s += 1) i[s] = this._trimAlignValue(i[s]);
                return i
            },
            _trimAlignValue: function(t) {
                if (t <= this._valueMin()) return this._valueMin();
                if (t >= this._valueMax()) return this._valueMax();
                var e = this.options.step > 0 ? this.options.step : 1,
                    i = (t - this._valueMin()) % e,
                    s = t - i;
                return 2 * Math.abs(i) >= e && (s += i > 0 ? e : -e), parseFloat(s.toFixed(5))
            },
            _valueMin: function() {
                return this.options.min
            },
            _valueMax: function() {
                return this.options.max
            },
            _refreshValue: function() {
                var e, i, s, n, o, r = this.options.range,
                    a = this.options,
                    l = this,
                    h = !this._animateOff && a.animate,
                    c = {};
                this.options.values && this.options.values.length ? this.handles.each(function(s, n) {
                    e = (l.values(s) - l._valueMin()) / (l._valueMax() - l._valueMin()) * 100, c["horizontal" === l.orientation ? "left" : "bottom"] = e + "%", t(this).stop(1, 1)[h ? "animate" : "css"](c, a.animate), !0 === l.options.range && ("horizontal" === l.orientation ? (0 === s && l.range.stop(1, 1)[h ? "animate" : "css"]({
                        left: e + "%"
                    }, a.animate), 1 === s && l.range[h ? "animate" : "css"]({
                        width: e - i + "%"
                    }, {
                        queue: !1,
                        duration: a.animate
                    })) : (0 === s && l.range.stop(1, 1)[h ? "animate" : "css"]({
                        bottom: e + "%"
                    }, a.animate), 1 === s && l.range[h ? "animate" : "css"]({
                        height: e - i + "%"
                    }, {
                        queue: !1,
                        duration: a.animate
                    }))), i = e
                }) : (s = this.value(), n = this._valueMin(), o = this._valueMax(), e = o !== n ? (s - n) / (o - n) * 100 : 0, c["horizontal" === l.orientation ? "left" : "bottom"] = e + "%", this.handle.stop(1, 1)[h ? "animate" : "css"](c, a.animate), "min" === r && "horizontal" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({
                    width: e + "%"
                }, a.animate), "max" === r && "horizontal" === this.orientation && this.range[h ? "animate" : "css"]({
                    width: 100 - e + "%"
                }, {
                    queue: !1,
                    duration: a.animate
                }), "min" === r && "vertical" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({
                    height: e + "%"
                }, a.animate), "max" === r && "vertical" === this.orientation && this.range[h ? "animate" : "css"]({
                    height: 100 - e + "%"
                }, {
                    queue: !1,
                    duration: a.animate
                }))
            }
        }), t.extend(t.ui.slider, {
            version: "1.8.22"
        })
    }(jQuery),
    function(t, e) {
        var i = 0,
            s = 0;
        t.widget("ui.tabs", {
            options: {
                add: null,
                ajaxOptions: null,
                cache: !1,
                cookie: null,
                collapsible: !1,
                disable: null,
                disabled: [],
                enable: null,
                event: "click",
                fx: null,
                idPrefix: "ui-tabs-",
                load: null,
                panelTemplate: "<div></div>",
                remove: null,
                select: null,
                show: null,
                spinner: "<em>Loading&#8230;</em>",
                tabTemplate: "<li><a href='#{href}'><span>#{label}</span></a></li>"
            },
            _create: function() {
                this._tabify(!0)
            },
            _setOption: function(t, e) {
                if ("selected" == t) {
                    if (this.options.collapsible && e == this.options.selected) return;
                    this.select(e)
                } else this.options[t] = e, this._tabify()
            },
            _tabId: function(t) {
                return t.title && t.title.replace(/\s/g, "_").replace(/[^\w\u00c0-\uFFFF-]/g, "") || this.options.idPrefix + ++i
            },
            _sanitizeSelector: function(t) {
                return t.replace(/:/g, "\\:")
            },
            _cookie: function() {
                var e = this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + ++s);
                return t.cookie.apply(null, [e].concat(t.makeArray(arguments)))
            },
            _ui: function(t, e) {
                return {
                    tab: t,
                    panel: e,
                    index: this.anchors.index(t)
                }
            },
            _cleanup: function() {
                this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function() {
                    var e = t(this);
                    e.html(e.data("label.tabs")).removeData("label.tabs")
                })
            },
            _tabify: function(e) {
                function i(e, i) {
                    e.css("display", ""), !t.support.opacity && i.opacity && e[0].style.removeAttribute("filter")
                }
                var s, n, o = this,
                    r = this.options,
                    a = /^#.+/;
                this.list = this.element.find("ol,ul").eq(0), this.lis = t(" > li:has(a[href])", this.list), this.anchors = this.lis.map(function() {
                    return t("a", this)[0]
                }), this.panels = t([]), this.anchors.each(function(e, i) {
                    var s, n = t(i).attr("href"),
                        l = n.split("#")[0];
                    if (l && (l === location.toString().split("#")[0] || (s = t("base")[0]) && l === s.href) && (n = i.hash, i.href = n), a.test(n)) o.panels = o.panels.add(o.element.find(o._sanitizeSelector(n)));
                    else if (n && "#" !== n) {
                        t.data(i, "href.tabs", n), t.data(i, "load.tabs", n.replace(/#.*$/, ""));
                        var h = o._tabId(i);
                        i.href = "#" + h;
                        var c = o.element.find("#" + h);
                        c.length || (c = t(r.panelTemplate).attr("id", h).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(o.panels[e - 1] || o.list)).data("destroy.tabs", !0), o.panels = o.panels.add(c)
                    } else r.disabled.push(e)
                }), e ? (this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all"), this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"), this.lis.addClass("ui-state-default ui-corner-top"), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom"), void 0 === r.selected ? (location.hash && this.anchors.each(function(t, e) {
                    if (e.hash == location.hash) return r.selected = t, !1
                }), "number" != typeof r.selected && r.cookie && (r.selected = parseInt(o._cookie(), 10)), "number" != typeof r.selected && this.lis.filter(".ui-tabs-selected").length && (r.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"))), r.selected = r.selected || (this.lis.length ? 0 : -1)) : null === r.selected && (r.selected = -1), r.selected = r.selected >= 0 && this.anchors[r.selected] || r.selected < 0 ? r.selected : 0, r.disabled = t.unique(r.disabled.concat(t.map(this.lis.filter(".ui-state-disabled"), function(t, e) {
                    return o.lis.index(t)
                }))).sort(), -1 != t.inArray(r.selected, r.disabled) && r.disabled.splice(t.inArray(r.selected, r.disabled), 1), this.panels.addClass("ui-tabs-hide"), this.lis.removeClass("ui-tabs-selected ui-state-active"), r.selected >= 0 && this.anchors.length && (o.element.find(o._sanitizeSelector(o.anchors[r.selected].hash)).removeClass("ui-tabs-hide"), this.lis.eq(r.selected).addClass("ui-tabs-selected ui-state-active"), o.element.queue("tabs", function() {
                    o._trigger("show", null, o._ui(o.anchors[r.selected], o.element.find(o._sanitizeSelector(o.anchors[r.selected].hash))[0]))
                }), this.load(r.selected)), t(window).bind("unload", function() {
                    o.lis.add(o.anchors).unbind(".tabs"), o.lis = o.anchors = o.panels = null
                })) : r.selected = this.lis.index(this.lis.filter(".ui-tabs-selected")), this.element[r.collapsible ? "addClass" : "removeClass"]("ui-tabs-collapsible"), r.cookie && this._cookie(r.selected, r.cookie);
                for (var l, h = 0; l = this.lis[h]; h++) t(l)[-1 == t.inArray(h, r.disabled) || t(l).hasClass("ui-tabs-selected") ? "removeClass" : "addClass"]("ui-state-disabled");
                if (!1 === r.cache && this.anchors.removeData("cache.tabs"), this.lis.add(this.anchors).unbind(".tabs"), "mouseover" !== r.event) {
                    var c = function(t, e) {
                            e.is(":not(.ui-state-disabled)") && e.addClass("ui-state-" + t)
                        },
                        u = function(t, e) {
                            e.removeClass("ui-state-" + t)
                        };
                    this.lis.bind("mouseover.tabs", function() {
                        c("hover", t(this))
                    }), this.lis.bind("mouseout.tabs", function() {
                        u("hover", t(this))
                    }), this.anchors.bind("focus.tabs", function() {
                        c("focus", t(this).closest("li"))
                    }), this.anchors.bind("blur.tabs", function() {
                        u("focus", t(this).closest("li"))
                    })
                }
                r.fx && (t.isArray(r.fx) ? (s = r.fx[0], n = r.fx[1]) : s = n = r.fx);
                var d = n ? function(e, s) {
                        t(e).closest("li").addClass("ui-tabs-selected ui-state-active"), s.hide().removeClass("ui-tabs-hide").animate(n, n.duration || "normal", function() {
                            i(s, n), o._trigger("show", null, o._ui(e, s[0]))
                        })
                    } : function(e, i) {
                        t(e).closest("li").addClass("ui-tabs-selected ui-state-active"), i.removeClass("ui-tabs-hide"), o._trigger("show", null, o._ui(e, i[0]))
                    },
                    p = s ? function(t, e) {
                        e.animate(s, s.duration || "normal", function() {
                            o.lis.removeClass("ui-tabs-selected ui-state-active"), e.addClass("ui-tabs-hide"), i(e, s), o.element.dequeue("tabs")
                        })
                    } : function(t, e, i) {
                        o.lis.removeClass("ui-tabs-selected ui-state-active"), e.addClass("ui-tabs-hide"), o.element.dequeue("tabs")
                    };
                this.anchors.bind(r.event + ".tabs", function() {
                    var e = this,
                        i = t(e).closest("li"),
                        s = o.panels.filter(":not(.ui-tabs-hide)"),
                        n = o.element.find(o._sanitizeSelector(e.hash));
                    if (i.hasClass("ui-tabs-selected") && !r.collapsible || i.hasClass("ui-state-disabled") || i.hasClass("ui-state-processing") || o.panels.filter(":animated").length || !1 === o._trigger("select", null, o._ui(this, n[0]))) return this.blur(), !1;
                    if (r.selected = o.anchors.index(this), o.abort(), r.collapsible) {
                        if (i.hasClass("ui-tabs-selected")) return r.selected = -1, r.cookie && o._cookie(r.selected, r.cookie), o.element.queue("tabs", function() {
                            p(e, s)
                        }).dequeue("tabs"), this.blur(), !1;
                        if (!s.length) return r.cookie && o._cookie(r.selected, r.cookie), o.element.queue("tabs", function() {
                            d(e, n)
                        }), o.load(o.anchors.index(this)), this.blur(), !1
                    }
                    if (r.cookie && o._cookie(r.selected, r.cookie), !n.length) throw "jQuery UI Tabs: Mismatching fragment identifier.";
                    s.length && o.element.queue("tabs", function() {
                        p(e, s)
                    }), o.element.queue("tabs", function() {
                        d(e, n)
                    }), o.load(o.anchors.index(this)), t.browser.msie && this.blur()
                }), this.anchors.bind("click.tabs", function() {
                    return !1
                })
            },
            _getIndex: function(t) {
                return "string" == typeof t && (t = this.anchors.index(this.anchors.filter("[href$='" + t + "']"))), t
            },
            destroy: function() {
                var e = this.options;
                return this.abort(), this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs"), this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"), this.anchors.each(function() {
                    var e = t.data(this, "href.tabs");
                    e && (this.href = e);
                    var i = t(this).unbind(".tabs");
                    t.each(["href", "load", "cache"], function(t, e) {
                        i.removeData(e + ".tabs")
                    })
                }), this.lis.unbind(".tabs").add(this.panels).each(function() {
                    t.data(this, "destroy.tabs") ? t(this).remove() : t(this).removeClass(["ui-state-default", "ui-corner-top", "ui-tabs-selected", "ui-state-active", "ui-state-hover", "ui-state-focus", "ui-state-disabled", "ui-tabs-panel", "ui-widget-content", "ui-corner-bottom", "ui-tabs-hide"].join(" "))
                }), e.cookie && this._cookie(null, e.cookie), this
            },
            add: function(e, i, s) {
                void 0 === s && (s = this.anchors.length);
                var n = this,
                    o = this.options,
                    r = t(o.tabTemplate.replace(/#\{href\}/g, e).replace(/#\{label\}/g, i)),
                    a = e.indexOf("#") ? this._tabId(t("a", r)[0]) : e.replace("#", "");
                r.addClass("ui-state-default ui-corner-top").data("destroy.tabs", !0);
                var l = n.element.find("#" + a);
                return l.length || (l = t(o.panelTemplate).attr("id", a).data("destroy.tabs", !0)), l.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide"), s >= this.lis.length ? (r.appendTo(this.list), l.appendTo(this.list[0].parentNode)) : (r.insertBefore(this.lis[s]), l.insertBefore(this.panels[s])), o.disabled = t.map(o.disabled, function(t, e) {
                    return t >= s ? ++t : t
                }), this._tabify(), 1 == this.anchors.length && (o.selected = 0, r.addClass("ui-tabs-selected ui-state-active"), l.removeClass("ui-tabs-hide"), this.element.queue("tabs", function() {
                    n._trigger("show", null, n._ui(n.anchors[0], n.panels[0]))
                }), this.load(0)), this._trigger("add", null, this._ui(this.anchors[s], this.panels[s])), this
            },
            remove: function(e) {
                e = this._getIndex(e);
                var i = this.options,
                    s = this.lis.eq(e).remove(),
                    n = this.panels.eq(e).remove();
                return s.hasClass("ui-tabs-selected") && this.anchors.length > 1 && this.select(e + (e + 1 < this.anchors.length ? 1 : -1)), i.disabled = t.map(t.grep(i.disabled, function(t, i) {
                    return t != e
                }), function(t, i) {
                    return t >= e ? --t : t
                }), this._tabify(), this._trigger("remove", null, this._ui(s.find("a")[0], n[0])), this
            },
            enable: function(e) {
                e = this._getIndex(e);
                var i = this.options;
                if (-1 != t.inArray(e, i.disabled)) return this.lis.eq(e).removeClass("ui-state-disabled"), i.disabled = t.grep(i.disabled, function(t, i) {
                    return t != e
                }), this._trigger("enable", null, this._ui(this.anchors[e], this.panels[e])), this
            },
            disable: function(t) {
                t = this._getIndex(t);
                var e = this.options;
                return t != e.selected && (this.lis.eq(t).addClass("ui-state-disabled"), e.disabled.push(t), e.disabled.sort(), this._trigger("disable", null, this._ui(this.anchors[t], this.panels[t]))), this
            },
            select: function(t) {
                if (-1 == (t = this._getIndex(t))) {
                    if (!this.options.collapsible || -1 == this.options.selected) return this;
                    t = this.options.selected
                }
                return this.anchors.eq(t).trigger(this.options.event + ".tabs"), this
            },
            load: function(e) {
                e = this._getIndex(e);
                var i = this,
                    s = this.options,
                    n = this.anchors.eq(e)[0],
                    o = t.data(n, "load.tabs");
                if (this.abort(), o && (0 === this.element.queue("tabs").length || !t.data(n, "cache.tabs"))) {
                    if (this.lis.eq(e).addClass("ui-state-processing"), s.spinner) {
                        var r = t("span", n);
                        r.data("label.tabs", r.html()).html(s.spinner)
                    }
                    return this.xhr = t.ajax(t.extend({}, s.ajaxOptions, {
                        url: o,
                        success: function(o, r) {
                            i.element.find(i._sanitizeSelector(n.hash)).html(o), i._cleanup(), s.cache && t.data(n, "cache.tabs", !0), i._trigger("load", null, i._ui(i.anchors[e], i.panels[e]));
                            try {
                                s.ajaxOptions.success(o, r)
                            } catch (t) {}
                        },
                        error: function(t, o, r) {
                            i._cleanup(), i._trigger("load", null, i._ui(i.anchors[e], i.panels[e]));
                            try {
                                s.ajaxOptions.error(t, o, e, n)
                            } catch (r) {}
                        }
                    })), i.element.dequeue("tabs"), this
                }
                this.element.dequeue("tabs")
            },
            abort: function() {
                return this.element.queue([]), this.panels.stop(!1, !0), this.element.queue("tabs", this.element.queue("tabs").splice(-2, 2)), this.xhr && (this.xhr.abort(), delete this.xhr), this._cleanup(), this
            },
            url: function(t, e) {
                return this.anchors.eq(t).removeData("cache.tabs").data("load.tabs", e), this
            },
            length: function() {
                return this.anchors.length
            }
        }), t.extend(t.ui.tabs, {
            version: "1.8.22"
        }), t.extend(t.ui.tabs.prototype, {
            rotation: null,
            rotate: function(t, e) {
                var i = this,
                    s = this.options,
                    n = i._rotate || (i._rotate = function(e) {
                        clearTimeout(i.rotation), i.rotation = setTimeout(function() {
                            var t = s.selected;
                            i.select(++t < i.anchors.length ? t : 0)
                        }, t), e && e.stopPropagation()
                    }),
                    o = i._unrotate || (i._unrotate = e ? function(t) {
                        n()
                    } : function(t) {
                        t.clientX && i.rotate(null)
                    });
                return t ? (this.element.bind("tabsshow", n), this.anchors.bind(s.event + ".tabs", o), n()) : (clearTimeout(i.rotation), this.element.unbind("tabsshow", n), this.anchors.unbind(s.event + ".tabs", o), delete this._rotate, delete this._unrotate), this
            }
        })
    }(jQuery),
    function(t, e) {
        var i = 0,
            s = {},
            n = {},
            o = Array.prototype.slice,
            r = function(e) {
                return t.isArray(e) ? e : [e]
            },
            a = "disabled",
            l = "wizard",
            h = "default",
            c = "number",
            u = "boolean";
        t.each("branch form header step wrapper".split(" "), function() {
            s[this] = "." + (n[this] = l + "-" + this)
        }), t.widget("kf." + l, {
            version: "1.0.0",
            options: {
                animations: {
                    show: {
                        options: {
                            duration: 0
                        },
                        properties: {
                            opacity: "show"
                        }
                    },
                    hide: {
                        options: {
                            duration: 0
                        },
                        properties: {
                            opacity: "hide"
                        }
                    }
                },
                backward: ".backward",
                branches: ".branch",
                disabled: !1,
                enableSubmit: !1,
                forward: ".forward",
                header: ":header:first",
                initialStep: 0,
                stateAttribute: "data-state",
                stepClasses: {
                    current: "current",
                    exclude: "exclude",
                    stop: "stop",
                    submit: "submit",
                    unidirectional: "unidirectional"
                },
                steps: ".step",
                submit: ":submit",
                transitions: {},
                unidirectional: !1,
                afterBackward: null,
                afterDestroy: null,
                afterForward: null,
                afterSelect: null,
                beforeBackward: null,
                beforeDestroy: null,
                beforeForward: null,
                beforeSelect: null,
                create: null
            },
            _create: function() {
                var e, o, a = this,
                    c = a.options,
                    u = a.element,
                    d = u.find(c.steps).eq(0).parent();
                u[0].elements ? e = u : (e = u.find("form")).length || (e = u.closest("form")), (o = u.find(c.header)).length || (o = e.find(c.header)), a.elements = {
                    form: e.addClass(n.form),
                    submit: e.find(c.submit),
                    forward: e.find(c.forward),
                    backward: e.find(c.backward),
                    header: o.addClass(n.header),
                    steps: u.find(c.steps).hide().addClass(n.step),
                    branches: u.find(c.branches).add(d).addClass(n.branch),
                    stepsWrapper: d.addClass(n.wrapper),
                    wizard: u.addClass(l)
                }, d.attr("id") || d.attr("id", l + "-" + ++i), a.elements.forward.click(function(t) {
                    t.preventDefault(), a.forward(t)
                }), a.elements.backward.click(function(t) {
                    t.preventDefault(), a.backward(t)
                }), a._currentState = {
                    branchesActivated: [],
                    stepsActivated: []
                }, a._stepCount = a.elements.steps.length, a._lastStepIndex = a._stepCount - 1, a._branchLabels = [], a.elements.steps.each(function(e) {
                    a._branchLabels[e] = t(this).parent().attr("id")
                }), a._excludesFilter = function() {
                    return !t(this).hasClass(c.stepClasses.exclude)
                }, c.transitions[h] || (c.transitions[h] = function(t) {
                    return a.stepIndex(t.nextAll(s.step))
                }), a.select.apply(a, r(c.initialStep))
            },
            _fastForward: function(i, s, n) {
                var o = 0,
                    r = this,
                    a = r._currentState.stepIndex,
                    l = [a];
                t.isFunction(s) && (n = s, s = e),
                    function e() {
                        r._transition(a, function(h, c) {
                            if (-1 === (a = r.stepIndex(h, c))) throw new Error('[_fastForward]: Invalid step "' + h + '"');
                            if (t.inArray(a, l) >= 0) throw new Error('[_fastForward]: Recursion detected on step "' + h + '"');
                            l.push(a), a === r._lastStepIndex || (s ? ++o : a) === i ? n.call(r, a, l) : e()
                        })
                    }()
            },
            _find: function(e, i, s) {
                var n, o, a, l, h, u = [],
                    d = i instanceof jQuery ? i : t(i);

                function p(t, e) {
                    if (e === l) return n = e, !1
                }
                if (null !== e && d.length)
                    for (o = 0, a = (e = r(e)).length; o < a; o++) n = null, (h = typeof(l = e[o])) === c ? n = d.get(l) : "string" === h ? n = document.getElementById(l.replace("#", "")) : "object" === h && (l instanceof jQuery && l.length && (l = l[0]), l.nodeType && d.each(p)), n && u.push(n);
                return !1 === s ? u : t(u)
            },
            _move: function(i, s, n, o, r) {
                var a = this,
                    l = a._currentState;

                function h(i, s) {
                    r.call(a, i, t.isArray(o) ? o : !1 !== o ? s : e)
                }
                typeof s === u && (r = o, o = n, n = s, s = e), !0 === n ? i > 0 ? a._fastForward(i, n, h) : r.call(a, l.stepsActivated[Math.max(0, i + (l.stepsActivated.length - 1))]) : -1 !== (i = a.stepIndex(i, s)) && (i > l.stepIndex ? a._fastForward(i, h) : h.call(a, i))
            },
            _state: function(e, i) {
                if (!this.isValidStepIndex(e)) return null;
                this.options;
                var n = t.extend(!0, {}, this._currentState);
                i = r(i || e), n.step = this.elements.steps.eq(e), n.branch = n.step.parent(), n.branchStepCount = n.branch.children(s.step).length, n.isMovingForward = e > n.stepIndex, n.stepIndexInBranch = n.branch.children(s.step).index(n.step);
                for (var o, a, l, h = 0, c = i.length; h < c; h++) e = i[h], o = this._branchLabels[e], !n.stepIndex || n.stepIndex < e ? t.inArray(e, n.stepsActivated) < 0 && (n.stepsActivated.push(e), t.inArray(o, n.branchesActivated) < 0 && n.branchesActivated.push(o)) : n.stepIndex > e && (a = t.inArray(o, n.branchesActivated) + 1, l = t.inArray(e, n.stepsActivated) + 1, a > 0 && n.branchesActivated.splice(a, n.branchesActivated.length - 1), l > 0 && n.stepsActivated.splice(l, n.stepsActivated.length - 1)), n.stepIndex = e, n.branchLabel = o;
                return n.stepsComplete = Math.max(0, this._find(n.stepsActivated, this.elements.steps).filter(this._excludesFilter).length - 1), n.stepsPossible = Math.max(0, this._find(n.branchesActivated, this.elements.branches).children(s.step).filter(this._excludesFilter).length - 1), t.extend(n, {
                    branchLabel: this._branchLabels[e],
                    isFirstStep: 0 === e,
                    isFirstStepInBranch: 0 === n.stepIndexInBranch,
                    isLastStep: e === this._lastStepIndex,
                    isLastStepInBranch: n.stepIndexInBranch === n.branchStepCount - 1,
                    percentComplete: 100 * n.stepsComplete / n.stepsPossible,
                    stepsRemaining: n.stepsPossible - n.stepsComplete
                }), n
            },
            _transition: function(i, s, n) {
                var a = this;
                t.isFunction(i) ? (n = i, i = a._currentState.stepIndex, s = e) : t.isFunction(s) && (n = s, s = e);
                var l, c = a.options,
                    u = a.step(i, s),
                    d = u.attr(c.stateAttribute),
                    p = d ? c.transitions[d] : c.transitions[h];
                return (l = t.isFunction(p) ? p.call(a, u, function() {
                    return n.apply(a, o.call(arguments))
                }) : d) !== e && !1 !== l && n.apply(a, r(l)), l
            },
            _update: function(e, i) {
                var s = this._currentState,
                    n = this.options;
                if (s.step) {
                    if (n.disabled || !i || i.stepIndex === s.stepIndex || !this._trigger("beforeSelect", e, i) || i.isMovingForward && !this._trigger("beforeForward", e, i) || !i.isMovingForward && !this._trigger("beforeBackward", e, i)) return;
                    s.step.removeClass(n.stepClasses.current).animate(n.animations.hide.properties, t.extend({}, n.animations.hide.options))
                }
                this._currentState = i, i.step.addClass(n.stepClasses.current).animate(n.animations.show.properties, t.extend({}, n.animations.show.options)), i.isFirstStep || n.unidirectional || i.step.hasClass(n.stepClasses.unidirectional) ? this.elements.backward.attr(a, !0) : this.elements.backward.removeAttr(a), i.isLastStepInBranch && !i.step.attr(n.stateAttribute) || i.step.hasClass(n.stepClasses.stop) ? this.elements.forward.attr(a, !0) : this.elements.forward.removeAttr(a), n.enableSubmit || i.step.hasClass(n.stepClasses.submit) ? this.elements.submit.removeAttr(a) : this.elements.submit.attr(a, !0), s.step && (this._trigger("afterSelect", e, i), this._trigger(i.isMovingForward ? "afterForward" : "afterBackward", e, i))
            },
            backward: function(t, i) {
                typeof t === c && (i = t, t = e), i === e && (i = 1), this._currentState.isFirstStep || typeof i !== c || this._move(-i, !0, !1, function(e, i) {
                    this._update(t, this._state(e, i))
                })
            },
            branch: function(t) {
                return arguments.length ? this._find(t, this.elements.branches) : this._currentState.branch
            },
            branches: function(t) {
                return arguments.length ? this.branch(t).children(s.branch) : this.elements.branches
            },
            branchesActivated: function() {
                return this._find(this._currentState.branchesActivated, this.elements.branches)
            },
            destroy: function() {
                var e = this.elements;
                this._trigger("beforeDestroy", null, this.state()) && (this.element.removeClass(l), e.form.removeClass(n.form), e.header.removeClass(n.header), e.steps.show().removeClass(n.step), e.stepsWrapper.removeClass(n.wrapper), e.branches.removeClass(n.branch), t.Widget.prototype.destroy.call(this), this._trigger("afterDestroy"))
            },
            form: function() {
                return this.elements.form
            },
            forward: function(t, i, s) {
                typeof t === c && (s = i, i = t, t = e), i === e && (i = 1), this._currentState.isLastStep || typeof i !== c || this._move(i, !0, s, function(e, i) {
                    this._update(t, this._state(e, i))
                })
            },
            isValidStep: function(t, e) {
                return this.isValidStepIndex(this.stepIndex(t, e))
            },
            isValidStepIndex: function(t) {
                return typeof t === c && t >= 0 && t <= this._lastStepIndex
            },
            stepCount: function() {
                return this._stepCount
            },
            select: function(i, s, n, o, r) {
                i instanceof t.Event || (r = o, o = n, n = s, s = i, i = e), s !== e && (t.isArray(s) ? (r = o, o = n, n = s[1], s = s[0]) : typeof n === u ? (r = o, o = n, n = e) : t.isArray(n) && (r = n, n = e), this._move(s, n, o, r, function(t, e) {
                    this._update(i, this._state(t, e))
                }))
            },
            state: function(i, s, n) {
                return arguments.length ? (t.isArray(i) ? (n = s, s = i[1], i = i[0]) : t.isArray(s) && (n = s, s = e), this._state(this.stepIndex(i, s), n)) : this._currentState
            },
            step: function(i, s) {
                return arguments.length ? (t.isArray(i) && (s = i[1], i = i[0]), typeof i === c ? o = this._find(i, s !== e ? this.steps(s) : this.elements.steps) : (o = this._find(i, this.elements.steps.add(this.elements.branches))) && o.hasClass(n.branch) && (o = this._find(s || 0, this.steps(o))), o) : this._currentState.step;
                var o
            },
            stepIndex: function(i, n, o) {
                return arguments.length ? (t.isArray(i) ? (o = n, n = i[1], i = i[0]) : typeof n === u && (o = n, n = e), (r = this.step(i, n)) ? (o ? r.siblings(s.step).andSelf() : this.elements.steps).index(r) : -1) : this._currentState.stepIndex;
                var r
            },
            steps: function(t) {
                return arguments.length ? this.branch(t).children(s.step) : this.elements.steps
            },
            stepsActivated: function() {
                return this._find(this._currentState.stepsActivated, this.elements.steps)
            },
            submit: function() {
                this.elements.form.submit()
            }
        })
    }(jQuery),
    function(t) {
        t.extend(t.fn, {
            validate: function(e) {
                if (this.length) {
                    var i = t.data(this[0], "validator");
                    return i || (this.attr("novalidate", "novalidate"), i = new t.validator(e, this[0]), t.data(this[0], "validator", i), i.settings.onsubmit && (this.validateDelegate(":submit", "click", function(e) {
                        i.settings.submitHandler && (i.submitButton = e.target), t(e.target).hasClass("cancel") && (i.cancelSubmit = !0), void 0 !== t(e.target).attr("formnovalidate") && (i.cancelSubmit = !0)
                    }), this.submit(function(e) {
                        function s() {
                            var s;
                            return !i.settings.submitHandler || (i.submitButton && (s = t("<input type='hidden'/>").attr("name", i.submitButton.name).val(t(i.submitButton).val()).appendTo(i.currentForm)), i.settings.submitHandler.call(i, i.currentForm, e), i.submitButton && s.remove(), !1)
                        }
                        return i.settings.debug && e.preventDefault(), i.cancelSubmit ? (i.cancelSubmit = !1, s()) : i.form() ? i.pendingRequest ? (i.formSubmitted = !0, !1) : s() : (i.focusInvalid(), !1)
                    })), i)
                }
                e && e.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing.")
            },
            valid: function() {
                if (t(this[0]).is("form")) return this.validate().form();
                var e = !0,
                    i = t(this[0].form).validate();
                return this.each(function() {
                    e = e && i.element(this)
                }), e
            },
            removeAttrs: function(e) {
                var i = {},
                    s = this;
                return t.each(e.split(/\s/), function(t, e) {
                    i[e] = s.attr(e), s.removeAttr(e)
                }), i
            },
            rules: function(e, i) {
                var s = this[0];
                if (e) {
                    var n = t.data(s.form, "validator").settings,
                        o = n.rules,
                        r = t.validator.staticRules(s);
                    switch (e) {
                        case "add":
                            t.extend(r, t.validator.normalizeRule(i)), delete r.messages, o[s.name] = r, i.messages && (n.messages[s.name] = t.extend(n.messages[s.name], i.messages));
                            break;
                        case "remove":
                            if (!i) return delete o[s.name], r;
                            var a = {};
                            return t.each(i.split(/\s/), function(t, e) {
                                a[e] = r[e], delete r[e]
                            }), a
                    }
                }
                var l = t.validator.normalizeRules(t.extend({}, t.validator.classRules(s), t.validator.attributeRules(s), t.validator.dataRules(s), t.validator.staticRules(s)), s);
                if (l.required) {
                    var h = l.required;
                    delete l.required, l = t.extend({
                        required: h
                    }, l)
                }
                return l
            }
        }), t.extend(t.expr[":"], {
            blank: function(e) {
                return !t.trim("" + t(e).val())
            },
            filled: function(e) {
                return !!t.trim("" + t(e).val())
            },
            unchecked: function(e) {
                return !t(e).prop("checked")
            }
        }), t.validator = function(e, i) {
            this.settings = t.extend(!0, {}, t.validator.defaults, e), this.currentForm = i, this.init()
        }, t.validator.format = function(e, i) {
            return 1 === arguments.length ? function() {
                var i = t.makeArray(arguments);
                return i.unshift(e), t.validator.format.apply(this, i)
            } : (arguments.length > 2 && i.constructor !== Array && (i = t.makeArray(arguments).slice(1)), i.constructor !== Array && (i = [i]), t.each(i, function(t, i) {
                e = e.replace(new RegExp("\\{" + t + "\\}", "g"), function() {
                    return i
                })
            }), e)
        }, t.extend(t.validator, {
            defaults: {
                messages: {},
                groups: {},
                rules: {},
                errorClass: "error",
                validClass: "valid",
                errorElement: "span",
                focusInvalid: !0,
                errorContainer: t([]),
                errorLabelContainer: t([]),
                onsubmit: !0,
                ignore: ":hidden",
                ignoreTitle: !1,
                onfocusin: function(t, e) {
                    this.lastActive = t, this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, t, this.settings.errorClass, this.settings.validClass), this.addWrapper(this.errorsFor(t)).hide())
                },
                onfocusout: function(t, e) {
                    this.checkable(t) || !(t.name in this.submitted) && this.optional(t) || this.element(t)
                },
                onkeyup: function(t, e) {
                    9 === e.which && "" === this.elementValue(t) || (t.name in this.submitted || t === this.lastElement) && this.element(t)
                },
                onclick: function(t, e) {
                    t.name in this.submitted ? this.element(t) : t.parentNode.name in this.submitted && this.element(t.parentNode)
                },
                highlight: function(e, i, s) {
                    "radio" === e.type ? this.findByName(e.name).addClass(i).removeClass(s) : t(e).addClass(i).removeClass(s)
                },
                unhighlight: function(e, i, s) {
                    "radio" === e.type ? this.findByName(e.name).removeClass(i).addClass(s) : t(e).removeClass(i).addClass(s)
                }
            },
            setDefaults: function(e) {
                t.extend(t.validator.defaults, e)
            },
            messages: {
                required: "\u062D\u0642\u0644 \u0645\u0637\u0644\u0648\u0628",
                remote: "Please fix this field.",
                email: "Wrong email.",
                url: "Please enter a valid URL.",
                date: "Please enter a valid date.",
                dateISO: "Please enter a valid date (ISO).",
                number: "Please enter a valid number.",
                digits: "Please enter only digits.",
                creditcard: "Please enter a valid credit card number.",
                equalTo: "Please enter the same value again.",
                maxlength: t.validator.format("Please enter no more than {0} characters."),
                minlength: t.validator.format("\u0631\u0642\u0645 \u062E\u0637\u0623"),
                rangelength: t.validator.format("Please enter a value between {0} and {1} characters long."),
                range: t.validator.format("Please enter a value between {0} and {1}."),
                max: t.validator.format("Please enter a value less than or equal to {0}."),
                min: t.validator.format("Please enter a value greater than or equal to {0}.")
            },
            autoCreateRanges: !1,
            prototype: {
                init: function() {
                    this.labelContainer = t(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || t(this.currentForm), this.containers = t(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                    var e = this.groups = {};
                    t.each(this.settings.groups, function(i, s) {
                        "string" == typeof s && (s = s.split(/\s/)), t.each(s, function(t, s) {
                            e[s] = i
                        })
                    });
                    var i = this.settings.rules;

                    function s(e) {
                        var i = t.data(this[0].form, "validator"),
                            s = "on" + e.type.replace(/^validate/, "");
                        i && i.settings[s] && i.settings[s].call(i, this[0], e)
                    }
                    t.each(i, function(e, s) {
                        i[e] = t.validator.normalizeRule(s)
                    }), t(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", s).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", s), this.settings.invalidHandler && t(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
                },
                form: function() {
                    return this.checkForm(), t.extend(this.submitted, this.errorMap), this.invalid = t.extend({}, this.errorMap), this.valid() || t(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
                },
                checkForm: function() {
                    this.prepareForm();
                    for (var t = 0, e = this.currentElements = this.elements(); e[t]; t++) this.check(e[t]);
                    return this.valid()
                },
                element: function(e) {
                    e = this.validationTargetFor(this.clean(e)), this.lastElement = e, this.prepareElement(e), this.currentElements = t(e);
                    var i = !1 !== this.check(e);
                    return i ? delete this.invalid[e.name] : this.invalid[e.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), i
                },
                showErrors: function(e) {
                    if (e) {
                        for (var i in t.extend(this.errorMap, e), this.errorList = [], e) this.errorList.push({
                            message: e[i],
                            element: this.findByName(i)[0]
                        });
                        this.successList = t.grep(this.successList, function(t) {
                            return !(t.name in e)
                        })
                    }
                    this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
                },
                resetForm: function() {
                    t.fn.resetForm && t(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue")
                },
                numberOfInvalids: function() {
                    return this.objectLength(this.invalid)
                },
                objectLength: function(t) {
                    var e = 0;
                    for (var i in t) e++;
                    return e
                },
                hideErrors: function() {
                    this.addWrapper(this.toHide).hide()
                },
                valid: function() {
                    return 0 === this.size()
                },
                size: function() {
                    return this.errorList.length
                },
                focusInvalid: function() {
                    if (this.settings.focusInvalid) try {
                        t(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                    } catch (t) {}
                },
                findLastActive: function() {
                    var e = this.lastActive;
                    return e && 1 === t.grep(this.errorList, function(t) {
                        return t.element.name === e.name
                    }).length && e
                },
                elements: function() {
                    var e = this,
                        i = {};
                    return t(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function() {
                        return !this.name && e.settings.debug && window.console && console.error("%o has no name assigned", this), !(this.name in i || !e.objectLength(t(this).rules())) && (i[this.name] = !0, !0)
                    })
                },
                clean: function(e) {
                    return t(e)[0]
                },
                errors: function() {
                    var e = this.settings.errorClass.replace(" ", ".");
                    return t(this.settings.errorElement + "." + e, this.errorContext)
                },
                reset: function() {
                    this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = t([]), this.toHide = t([]), this.currentElements = t([])
                },
                prepareForm: function() {
                    this.reset(), this.toHide = this.errors().add(this.containers)
                },
                prepareElement: function(t) {
                    this.reset(), this.toHide = this.errorsFor(t)
                },
                elementValue: function(e) {
                    var i = t(e).attr("type"),
                        s = t(e).val();
                    return "radio" === i || "checkbox" === i ? t("input[name='" + t(e).attr("name") + "']:checked").val() : "string" == typeof s ? s.replace(/\r/g, "") : s
                },
                check: function(e) {
                    e = this.validationTargetFor(this.clean(e));
                    var i, s = t(e).rules(),
                        n = !1,
                        o = this.elementValue(e);
                    for (var r in s) {
                        var a = {
                            method: r,
                            parameters: s[r]
                        };
                        try {
                            if ("dependency-mismatch" === (i = t.validator.methods[r].call(this, o, e, a.parameters))) {
                                n = !0;
                                continue
                            }
                            if (n = !1, "pending" === i) return void(this.toHide = this.toHide.not(this.errorsFor(e)));
                            if (!i) return this.formatAndAdd(e, a), !1
                        } catch (t) {
                            throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + e.id + ", check the '" + a.method + "' method.", t), t
                        }
                    }
                    if (!n) return this.objectLength(s) && this.successList.push(e), !0
                },
                customDataMessage: function(e, i) {
                    return t(e).data("msg-" + i.toLowerCase()) || e.attributes && t(e).attr("data-msg-" + i.toLowerCase())
                },
                customMessage: function(t, e) {
                    var i = this.settings.messages[t];
                    return i && (i.constructor === String ? i : i[e])
                },
                findDefined: function() {
                    for (var t = 0; t < arguments.length; t++)
                        if (void 0 !== arguments[t]) return arguments[t]
                },
                defaultMessage: function(e, i) {
                    return this.findDefined(this.customMessage(e.name, i), this.customDataMessage(e, i), !this.settings.ignoreTitle && e.title || void 0, t.validator.messages[i], "<strong>Warning: No message defined for " + e.name + "</strong>")
                },
                formatAndAdd: function(e, i) {
                    var s = this.defaultMessage(e, i.method),
                        n = /\$?\{(\d+)\}/g;
                    "function" == typeof s ? s = s.call(this, i.parameters, e) : n.test(s) && (s = t.validator.format(s.replace(n, "{$1}"), i.parameters)), this.errorList.push({
                        message: s,
                        element: e
                    }), this.errorMap[e.name] = s, this.submitted[e.name] = s
                },
                addWrapper: function(t) {
                    return this.settings.wrapper && (t = t.add(t.parent(this.settings.wrapper))), t
                },
                defaultShowErrors: function() {
                    var t, e;
                    for (t = 0; this.errorList[t]; t++) {
                        var i = this.errorList[t];
                        this.settings.highlight && this.settings.highlight.call(this, i.element, this.settings.errorClass, this.settings.validClass), this.showLabel(i.element, i.message)
                    }
                    if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                        for (t = 0; this.successList[t]; t++) this.showLabel(this.successList[t]);
                    if (this.settings.unhighlight)
                        for (t = 0, e = this.validElements(); e[t]; t++) this.settings.unhighlight.call(this, e[t], this.settings.errorClass, this.settings.validClass);
                    this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
                },
                validElements: function() {
                    return this.currentElements.not(this.invalidElements())
                },
                invalidElements: function() {
                    return t(this.errorList).map(function() {
                        return this.element
                    })
                },
                showLabel: function(e, i) {
                    var s = this.errorsFor(e);
                    s.length ? (s.removeClass(this.settings.validClass).addClass(this.settings.errorClass), s.html(i)) : (s = t("<" + this.settings.errorElement + ">").attr("for", this.idOrName(e)).addClass(this.settings.errorClass).html(i || ""), this.settings.wrapper && (s = s.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.append(s).length || (this.settings.errorPlacement ? this.settings.errorPlacement(s, t(e)) : s.insertAfter(e))), !i && this.settings.success && (s.text(""), "string" == typeof this.settings.success ? s.addClass(this.settings.success) : this.settings.success(s, e)), this.toShow = this.toShow.add(s)
                },
                errorsFor: function(e) {
                    var i = this.idOrName(e);
                    return this.errors().filter(function() {
                        return t(this).attr("for") === i
                    })
                },
                idOrName: function(t) {
                    return this.groups[t.name] || (this.checkable(t) ? t.name : t.id || t.name)
                },
                validationTargetFor: function(t) {
                    return this.checkable(t) && (t = this.findByName(t.name).not(this.settings.ignore)[0]), t
                },
                checkable: function(t) {
                    return /radio|checkbox/i.test(t.type)
                },
                findByName: function(e) {
                    return t(this.currentForm).find("[name='" + e + "']")
                },
                getLength: function(e, i) {
                    switch (i.nodeName.toLowerCase()) {
                        case "select":
                            return t("option:selected", i).length;
                        case "input":
                            if (this.checkable(i)) return this.findByName(i.name).filter(":checked").length
                    }
                    return e.length
                },
                depend: function(t, e) {
                    return !this.dependTypes[typeof t] || this.dependTypes[typeof t](t, e)
                },
                dependTypes: {
                    boolean: function(t, e) {
                        return t
                    },
                    string: function(e, i) {
                        return !!t(e, i.form).length
                    },
                    function: function(t, e) {
                        return t(e)
                    }
                },
                optional: function(e) {
                    var i = this.elementValue(e);
                    return !t.validator.methods.required.call(this, i, e) && "dependency-mismatch"
                },
                startRequest: function(t) {
                    this.pending[t.name] || (this.pendingRequest++, this.pending[t.name] = !0)
                },
                stopRequest: function(e, i) {
                    this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[e.name], i && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (t(this.currentForm).submit(), this.formSubmitted = !1) : !i && 0 === this.pendingRequest && this.formSubmitted && (t(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
                },
                previousValue: function(e) {
                    return t.data(e, "previousValue") || t.data(e, "previousValue", {
                        old: null,
                        valid: !0,
                        message: this.defaultMessage(e, "remote")
                    })
                }
            },
            classRuleSettings: {
                required: {
                    required: !0
                },
                email: {
                    email: !0
                },
                url: {
                    url: !0
                },
                date: {
                    date: !0
                },
                dateISO: {
                    dateISO: !0
                },
                number: {
                    number: !0
                },
                digits: {
                    digits: !0
                },
                creditcard: {
                    creditcard: !0
                }
            },
            addClassRules: function(e, i) {
                e.constructor === String ? this.classRuleSettings[e] = i : t.extend(this.classRuleSettings, e)
            },
            classRules: function(e) {
                var i = {},
                    s = t(e).attr("class");
                return s && t.each(s.split(" "), function() {
                    this in t.validator.classRuleSettings && t.extend(i, t.validator.classRuleSettings[this])
                }), i
            },
            attributeRules: function(e) {
                var i = {},
                    s = t(e),
                    n = s[0].getAttribute("type");
                for (var o in t.validator.methods) {
                    var r;
                    "required" === o ? ("" === (r = s.get(0).getAttribute(o)) && (r = !0), r = !!r) : r = s.attr(o), /min|max/.test(o) && (null === n || /number|range|text/.test(n)) && (r = Number(r)), r ? i[o] = r : n === o && "range" !== n && (i[o] = !0)
                }
                return i.maxlength && /-1|2147483647|524288/.test(i.maxlength) && delete i.maxlength, i
            },
            dataRules: function(e) {
                var i, s, n = {},
                    o = t(e);
                for (i in t.validator.methods) void 0 !== (s = o.data("rule-" + i.toLowerCase())) && (n[i] = s);
                return n
            },
            staticRules: function(e) {
                var i = {},
                    s = t.data(e.form, "validator");
                return s.settings.rules && (i = t.validator.normalizeRule(s.settings.rules[e.name]) || {}), i
            },
            normalizeRules: function(e, i) {
                return t.each(e, function(s, n) {
                    if (!1 !== n) {
                        if (n.param || n.depends) {
                            var o = !0;
                            switch (typeof n.depends) {
                                case "string":
                                    o = !!t(n.depends, i.form).length;
                                    break;
                                case "function":
                                    o = n.depends.call(i, i)
                            }
                            o ? e[s] = void 0 === n.param || n.param : delete e[s]
                        }
                    } else delete e[s]
                }), t.each(e, function(s, n) {
                    e[s] = t.isFunction(n) ? n(i) : n
                }), t.each(["minlength", "maxlength"], function() {
                    e[this] && (e[this] = Number(e[this]))
                }), t.each(["rangelength", "range"], function() {
                    var i;
                    e[this] && (t.isArray(e[this]) ? e[this] = [Number(e[this][0]), Number(e[this][1])] : "string" == typeof e[this] && (i = e[this].split(/[\s,]+/), e[this] = [Number(i[0]), Number(i[1])]))
                }), t.validator.autoCreateRanges && (e.min && e.max && (e.range = [e.min, e.max], delete e.min, delete e.max), e.minlength && e.maxlength && (e.rangelength = [e.minlength, e.maxlength], delete e.minlength, delete e.maxlength)), e
            },
            normalizeRule: function(e) {
                if ("string" == typeof e) {
                    var i = {};
                    t.each(e.split(/\s/), function() {
                        i[this] = !0
                    }), e = i
                }
                return e
            },
            addMethod: function(e, i, s) {
                t.validator.methods[e] = i, t.validator.messages[e] = void 0 !== s ? s : t.validator.messages[e], i.length < 3 && t.validator.addClassRules(e, t.validator.normalizeRule(e))
            },
            methods: {
                required: function(e, i, s) {
                    if (!this.depend(s, i)) return "dependency-mismatch";
                    if ("select" === i.nodeName.toLowerCase()) {
                        var n = t(i).val();
                        return n && n.length > 0
                    }
                    return this.checkable(i) ? this.getLength(e, i) > 0 : t.trim(e).length > 0
                },
                email: function(t, e) {
                    return this.optional(e) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(t)
                },
                url: function(t, e) {
                    return this.optional(e) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(t)
                },
                date: function(t, e) {
                    return this.optional(e) || !/Invalid|NaN/.test(new Date(t).toString())
                },
                dateISO: function(t, e) {
                    return this.optional(e) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(t)
                },
                number: function(t, e) {
                    return this.optional(e) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)
                },
                digits: function(t, e) {
                    return this.optional(e) || /^\d+$/.test(t)
                },
                creditcard: function(t, e) {
                    if (this.optional(e)) return "dependency-mismatch";
                    if (/[^0-9 \-]+/.test(t)) return !1;
                    for (var i = 0, s = 0, n = !1, o = (t = t.replace(/\D/g, "")).length - 1; o >= 0; o--) {
                        var r = t.charAt(o);
                        s = parseInt(r, 10), n && (s *= 2) > 9 && (s -= 9), i += s, n = !n
                    }
                    return i % 10 == 0
                },
                minlength: function(e, i, s) {
                    var n = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
                    return this.optional(i) || n >= s
                },
                maxlength: function(e, i, s) {
                    var n = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
                    return this.optional(i) || n <= s
                },
                rangelength: function(e, i, s) {
                    var n = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
                    return this.optional(i) || n >= s[0] && n <= s[1]
                },
                min: function(t, e, i) {
                    return this.optional(e) || t >= i
                },
                max: function(t, e, i) {
                    return this.optional(e) || t <= i
                },
                range: function(t, e, i) {
                    return this.optional(e) || t >= i[0] && t <= i[1]
                },
                equalTo: function(e, i, s) {
                    var n = t(s);
                    return this.settings.onfocusout && n.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                        t(i).valid()
                    }), e === n.val()
                },
                remote: function(e, i, s) {
                    if (this.optional(i)) return "dependency-mismatch";
                    var n = this.previousValue(i);
                    if (this.settings.messages[i.name] || (this.settings.messages[i.name] = {}), n.originalMessage = this.settings.messages[i.name].remote, this.settings.messages[i.name].remote = n.message, s = "string" == typeof s && {
                            url: s
                        } || s, n.old === e) return n.valid;
                    n.old = e;
                    var o = this;
                    this.startRequest(i);
                    var r = {};
                    return r[i.name] = e, t.ajax(t.extend(!0, {
                        url: s,
                        mode: "abort",
                        port: "validate" + i.name,
                        dataType: "json",
                        data: r,
                        success: function(s) {
                            o.settings.messages[i.name].remote = n.originalMessage;
                            var r = !0 === s || "true" === s;
                            if (r) {
                                var a = o.formSubmitted;
                                o.prepareElement(i), o.formSubmitted = a, o.successList.push(i), delete o.invalid[i.name], o.showErrors()
                            } else {
                                var l = {},
                                    h = s || o.defaultMessage(i, "remote");
                                l[i.name] = n.message = t.isFunction(h) ? h(e) : h, o.invalid[i.name] = !0, o.showErrors(l)
                            }
                            n.valid = r, o.stopRequest(i, r)
                        }
                    }, s)), "pending"
                }
            }
        }), t.format = t.validator.format
    }(jQuery),
    function(t) {
        var e = {};
        if (t.ajaxPrefilter) t.ajaxPrefilter(function(t, i, s) {
            var n = t.port;
            "abort" === t.mode && (e[n] && e[n].abort(), e[n] = s)
        });
        else {
            var i = t.ajax;
            t.ajax = function(s) {
                var n = ("mode" in s ? s : t.ajaxSettings).mode,
                    o = ("port" in s ? s : t.ajaxSettings).port;
                return "abort" === n ? (e[o] && e[o].abort(), e[o] = i.apply(this, arguments), e[o]) : i.apply(this, arguments)
            }
        }
    }(jQuery),
    function(t) {
        t.extend(t.fn, {
            validateDelegate: function(e, i, s) {
                return this.bind(i, function(i) {
                    var n = t(i.target);
                    if (n.is(e)) return s.apply(n, arguments)
                })
            }
        })
    }(jQuery),
    function(t) {
        var e = "iCheck",
            i = e + "-helper",
            s = "checkbox",
            n = "radio",
            o = "checked",
            r = "un" + o,
            a = "disabled",
            l = "determinate",
            h = "in" + l,
            c = "update",
            u = "type",
            d = "click",
            p = "touchbegin.i touchend.i",
            f = "addClass",
            g = "removeClass",
            m = "trigger",
            v = "label",
            _ = "cursor",
            b = /ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent);

        function y(t, e, i) {
            var s = t[0],
                r = /er/.test(i) ? h : /bl/.test(i) ? a : o,
                d = i == c ? {
                    checked: s[o],
                    disabled: s[a],
                    indeterminate: "true" == t.attr(h) || "false" == t.attr(l)
                } : s[r];
            if (/^(ch|di|in)/.test(i) && !d) w(t, r);
            else if (/^(un|en|de)/.test(i) && d) C(t, r);
            else if (i == c)
                for (var p in d) d[p] ? w(t, p, !0) : C(t, p, !0);
            else e && "toggle" != i || (e || t[m]("ifClicked"), d ? s[u] !== n && C(t, r) : w(t, r))
        }

        function w(s, c, d) {
            var p = s[0],
                m = s.parent(),
                v = c == o,
                b = c == h,
                y = c == a,
                w = b ? l : v ? r : "enabled",
                x = k(s, w + D(p[u])),
                E = k(s, c + D(p[u]));
            if (!0 !== p[c]) {
                if (!d && c == o && p[u] == n && p.name) {
                    var T = s.closest("form"),
                        S = 'input[name="' + p.name + '"]';
                    (S = T.length ? T.find(S) : t(S)).each(function() {
                        this !== p && t(this).data(e) && C(t(this), c)
                    })
                }
                b ? (p[c] = !0, p[o] && C(s, o, "force")) : (d || (p[c] = !0), v && p[h] && C(s, h, !1)), I(s, v, c, d)
            }
            p[a] && k(s, _, !0) && m.find("." + i).css(_, "default"), m[f](E || k(s, c) || ""), m.attr("role") && !b && m.attr("aria-" + (y ? a : o), "true"), m[g](x || k(s, w) || "")
        }

        function C(t, e, s) {
            var n = t[0],
                c = t.parent(),
                d = e == o,
                p = e == h,
                m = e == a,
                v = p ? l : d ? r : "enabled",
                b = k(t, v + D(n[u])),
                y = k(t, e + D(n[u]));
            !1 !== n[e] && (!p && s && "force" != s || (n[e] = !1), I(t, d, v, s)), !n[a] && k(t, _, !0) && c.find("." + i).css(_, "pointer"), c[g](y || k(t, e) || ""), c.attr("role") && !p && c.attr("aria-" + (m ? a : o), "false"), c[f](b || k(t, v) || "")
        }

        function x(i, s) {
            i.data(e) && (i.parent().html(i.attr("style", i.data(e).s || "")), s && i[m](s), i.off(".i").unwrap(), t(v + '[for="' + i[0].id + '"]').add(i.closest(v)).off(".i"))
        }

        function k(t, i, s) {
            if (t.data(e)) return t.data(e).o[i + (s ? "" : "Class")]
        }

        function D(t) {
            return t.charAt(0).toUpperCase() + t.slice(1)
        }

        function I(t, e, i, s) {
            s || (e && t[m]("ifToggled"), t[m]("ifChanged")[m]("if" + D(i)))
        }
        t.fn[e] = function(r, l) {
            var _ = 'input[type="' + s + '"], input[type="' + n + '"]',
                k = t(),
                D = function(e) {
                    e.each(function() {
                        var e = t(this);
                        k = e.is(_) ? k.add(e) : k.add(e.find(_))
                    })
                };
            if (/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(r)) return r = r.toLowerCase(), D(this), k.each(function() {
                var e = t(this);
                "destroy" == r ? x(e, "ifDestroyed") : y(e, !0, r), t.isFunction(l) && l()
            });
            if ("object" != typeof r && r) return this;
            var I = t.extend({
                    checkedClass: o,
                    disabledClass: a,
                    indeterminateClass: h,
                    labelHover: !0
                }, r),
                E = I.handle,
                T = I.hoverClass || "hover",
                S = I.focusClass || "focus",
                A = I.activeClass || "active",
                P = !!I.labelHover,
                M = I.labelHoverClass || "hover",
                F = 0 | ("" + I.increaseArea).replace("%", "");
            return E != s && E != n || (_ = 'input[type="' + E + '"]'), F < -50 && (F = -50), D(this), k.each(function() {
                var r = t(this);
                x(r);
                var l, h = this,
                    _ = h.id,
                    k = -F + "%",
                    D = 100 + 2 * F + "%",
                    E = {
                        position: "absolute",
                        top: k,
                        left: k,
                        display: "block",
                        width: D,
                        height: D,
                        margin: 0,
                        padding: 0,
                        background: "#fff",
                        border: 0,
                        opacity: 0
                    },
                    O = b ? {
                        position: "absolute",
                        visibility: "hidden"
                    } : F ? E : {
                        position: "absolute",
                        opacity: 0
                    },
                    z = h[u] == s ? I.checkboxClass || "i" + s : I.radioClass || "i" + n,
                    N = t(v + '[for="' + _ + '"]').add(r.closest(v)),
                    H = !!I.aria,
                    $ = e + "-" + Math.random().toString(36).substr(2, 6),
                    L = '<div class="' + z + '" ' + (H ? 'role="' + h[u] + '" ' : "");
                H && N.each(function() {
                    L += 'aria-labelledby="', this.id ? L += this.id : (this.id = $, L += $), L += '"'
                }), L = r.wrap(L + "/>")[m]("ifCreated").parent().append(I.insert), l = t('<ins class="' + i + '"/>').css(E).appendTo(L), r.data(e, {
                    o: I,
                    s: r.attr("style")
                }).css(O), I.inheritClass && L[f](h.className || ""), I.inheritID && _ && L.attr("id", e + "-" + _), "static" == L.css("position") && L.css("position", "relative"), y(r, !0, c), N.length && N.on(d + ".i mouseover.i mouseout.i " + p, function(e) {
                    var i = e[u],
                        s = t(this);
                    if (!h[a]) {
                        if (i == d) {
                            if (t(e.target).is("a")) return;
                            y(r, !1, !0)
                        } else P && (/ut|nd/.test(i) ? (L[g](T), s[g](M)) : (L[f](T), s[f](M)));
                        if (!b) return !1;
                        e.stopPropagation()
                    }
                }), r.on(d + ".i focus.i blur.i keyup.i keydown.i keypress.i", function(t) {
                    var e = t[u],
                        i = t.keyCode;
                    return e != d && ("keydown" == e && 32 == i ? (h[u] == n && h[o] || (h[o] ? C(r, o) : w(r, o)), !1) : void("keyup" == e && h[u] == n ? !h[o] && w(r, o) : /us|ur/.test(e) && L["blur" == e ? g : f](S)))
                }), l.on(d + " mousedown mouseup mouseover mouseout " + p, function(t) {
                    var e = t[u],
                        i = /wn|up/.test(e) ? A : T;
                    if (!h[a]) {
                        if (e == d ? y(r, !1, !0) : (/wn|er|in/.test(e) ? L[f](i) : L[g](i + " " + A), N.length && P && i == T && N[/ut|nd/.test(e) ? g : f](M)), !b) return !1;
                        t.stopPropagation()
                    }
                })
            })
        }
    }(window.jQuery || window.Zepto), $("form").on("submit", function() {
        var t = $("form#wrapped");
        t.validate(), t.valid() && $("#loader_form").fadeIn()
    });