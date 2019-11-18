/*
import {Component} from '@angular/core';
import {DragulaService} from "ng2-dragula";
import {FormBuilder, FormGroup} from "@angular/forms";

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {DomSanitizer} from '@angular/platform-browser';
import {NavController} from "ionic-angular";
import {PdfViewerPage} from "../pdfViewer/pdf_viewer";
import {Subscription} from "rxjs";
import {ExamData, Question, Section, SubSection} from "../../models/data";


pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
    selector: 'page-add-draggable-exam',
    templateUrl: 'add_draggable_exam.html'
})
export class AddDraggleExamPage {

    language: string = "en";
    COPYABLE = "COPYABLE";
    pdfUrl: any;
    pdfDocGenerator: any = null;
    docDefinition = null;


    constructor(private dragulaService: DragulaService,
                private _FB: FormBuilder,
                private sanitizer: DomSanitizer,
                private navController: NavController
    ) {


        let group = dragulaService.createGroup(this.COPYABLE, {

            accepts: (el, target, source, sibling) => {
                // To avoid dragging from right to left container
                return target.id !== 'left';
            },
            moves: function (el, container, handle) {
                return container.id !== 'right';
            }
        });
    }


    initQuestions(description, questionNumber, points, possibleAnswers): FormGroup {
        return this._FB.group({
            description: description,
            questionNumber: questionNumber,
            points: points,
            possibleAnswers: possibleAnswers,
            answerCoordinates: '',
            isMandatory: false,
            questionType: ''
        });
    }


    initSections(topic, topicNumber, topicPoints): FormGroup {
        return this._FB.group({
            topic: topic,
            topicNumber: topicNumber,
            topicPoints: topicPoints,
            subSections: this._FB.array([
                this.initSubSections('', '', '', ''),
            ])
        });
    }

    initSubSections(subTopic, subTopicNumber, subTopicPoints, subTopicDescription): FormGroup {
        return this._FB.group({
            subTopic: subTopic,
            subTopicNumber: subTopicNumber,
            subTopicPoints: subTopicPoints,
            subTopicDescription: subTopicDescription,
            questions: this._FB.array([
                this.initQuestions('', '', '', ''),
            ])
        });
    }

    public examHeader = {
        matriculationNo: '',
        semester: '',
        course: '',
        year: '',
        instructor: '',
        fullName: ''
    };

    public section = {
        topic: '',
        topicNumber: '',
        topicPoints: ''
    };

    public subSection = {
        subTopic: '',
        subTopicNumber: '',
        subTopicPoints: '',
        subTopicDescription: ''
    };

    public question = {
        description: '',
        questionNumber: '',
        points: '',
        possibleAnswers: '',
        answerCoordinates: '',
        isMandatory: false,
        questionType: ''
    };

    examData = [];
    sections = [];
    subSections = [];
    questions = [];

    saveExamData() {


    }

    /!*let data = [];

    form.sections.map(function (topic) {

        data.push(
            {
                stack: [

                    {
                        canvas: [{
                            type: 'line',
                            x1: 0,
                            y1: 5,
                            x2: 500,
                            y2: 5,
                            lineWidth: 1,
                            lineCap: 'square',
                            alignment: 'justify'
                        }],
                        text: topic.topicNumber + topic.topic + topic.topicPoints,
                        style: 'header',
                        alignment: 'justify'
                    },
                    {
                        canvas: [{
                            type: 'line',
                            x1: 0,
                            y1: 5,
                            x2: 500,
                            y2: 5,
                            lineWidth: 1,
                            lineCap: 'square',
                            alignment: 'justify'
                        }]
                    }
                ]
            }
        );


        topic.subSections.map(function (subTopic) {

            data.push({
                    stack: [
                        {
                            canvas: [{
                                type: 'line',
                                x1: 0,
                                y1: 5,
                                x2: 500,
                                y2: 5,
                                lineWidth: 1,
                                lineCap: 'square',
                                alignment: 'justify'
                            }],
                            text: subTopic.subTopicNumber.concat(subTopic.subTopic, subTopic.subTopicPoints),
                            style: 'subheader',
                            alignment: 'justify'
                        },
                        {
                            canvas: [{
                                type: 'line',
                                x1: 0,
                                y1: 5,
                                x2: 500,
                                y2: 5,
                                lineWidth: 1,
                                lineCap: 'square',
                                alignment: 'justify'
                            }]
                        }
                    ]
                }
            );


            data.push({text: subTopic.subTopicDescription, style: 'description', alignment: 'justify'});
            subTopic.questions.map(function (question) {

                data.push(
                    {
                        stack: [
                            {
                                text: question.questionNumber.concat("\t", question.description, "\t\t", question.points, "\n"),
                                style: 'description'
                            },
                            {
                                canvas: [{
                                    type: 'rect',
                                    x: 0,
                                    y: 0,
                                    w: 500,
                                    h: 100,
                                    lineWidth: 1,
                                    lineColor: 'black',
                                    alignment: 'justify'
                                }]
                            }
                        ]
                    }
                );
            });
        });
    });


    this.docDefinition = {
        footer: function (currentPage, pageCount) {
            return currentPage.toString() + ' of ' + pageCount;
        },
        header: function (currentPage, pageCount, pageSize) {
            // you can apply any logic and return any valid pdfmake element
            if (currentPage == 1)

                return [
                    {
                        canvas: [{
                            type: 'line',
                            x1: 0,
                            y1: 0,
                            x2: 500,
                            y2: 0,
                            lineWidth: 5,
                            lineCap: 'square',
                            alignment: 'justify'
                        }]
                    },
                    {
                        canvas: [{
                            type: 'line',
                            x1: 0,
                            y1: 5,
                            x2: 500,
                            y2: 5,
                            lineWidth: 2,
                            lineCap: 'square',
                            alignment: 'justify'
                        }],
                        text: form.course + form.semester + form.year + '\nfullName:_______________ ' + "matriculation_no: " + form.matriculation_no + "\t" + currentPage.toString() + ' of ' + pageCount,
                        style: 'normalText'
                    }
                ]
            else
                return [
                    {
                        text: form.course + form.semester + form.year + '\nfullName:_______________ ' + "matriculation_no: " + form.matriculation_no,
                        style: 'normalText',
                        alignment: 'justify',
                        canvas: [{
                            type: 'line',
                            x1: 0,
                            y1: 10,
                            x2: 500,
                            y2: 10,
                            lineWidth: 5,
                            lineCap: 'square',
                            alignment: 'justify'
                        }]
                    }
                ]
        },
        pageSize: {width: 891, height: 630},
        pageOrientation: 'portrait',

        content: data,

        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: 0
            },
            subheader: {
                fontSize: 15,
                bold: true,
                margin: 0
            },
            normalText: {
                fontSize: 10,
                margin: 0,
                alignment: 'center'
            },
            quote: {
                italics: true
            },
            small: {
                fontSize: 8
            },
            description: {
                fontSize: 10,
                margin: 0
            }
        }
    };

    console.log("data is:", data)
    this.pdfDocGenerator = pdfMake.createPdf(this.docDefinition);
    this.pdfDocGenerator.getDataUrl((dataUrl) => {
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(dataUrl);
        this.navController.push(PdfViewerPage, {src: this.pdfUrl});
    });
}*!/

    onChange(event) {
        console.log("event ", event)
    }

    /!*ngModelChange(e) {
        if (e = e || t.event) {
            var n = this || e.target || t,
                r = n[K[e.type][X]];
            if (r)
                if (1 === r.length) p(r[0], n, e);
                else
                    for (var o = r.slice(), i = 0; i < o.length && (!e || !0 !== e[rt]); i++) p(o[i], n, e)
        }
    }

    blur(e) {
        if (e = e || t.event) {
            var n = this || e.target || t,
                r = n[K[e.type][X]];
            if (r)
                if (1 === r.length) p(r[0], n, e);
                else
                    for (var o = r.slice(), i = 0; i < o.length && (!e || !0 !== e[rt]); i++) p(o[i], n, e)
        }
    }


    focus(e) {
        if (e = e || t.event) {
            var n = this || e.target || t,
                r = n[K[e.type][X]];
            if (r)
                if (1 === r.length) p(r[0], n, e);
                else
                    for (var o = r.slice(), i = 0; i < o.length && (!e || !0 !== e[rt]); i++) p(o[i], n, e)
        }
    }


    keydown(e) {
        if (e = e || t.event) {
            var n = this || e.target || t,
                r = n[K[e.type][X]];
            if (r)
                if (1 === r.length) p(r[0], n, e);
                else
                    for (var o = r.slice(), i = 0; i < o.length && (!e || !0 !== e[rt]); i++) p(o[i], n, e)
        }
    }


    input(e) {
        if (e = e || t.event) {
            var n = this || e.target || t,
                r = n[K[e.type][X]];
            if (r)
                if (1 === r.length) p(r[0], n, e);
                else
                    for (var o = r.slice(), i = 0; i < o.length && (!e || !0 !== e[rt]); i++) p(o[i], n, e)
        }
    }
*!/

/!*
!

    function(t) {
        "use strict";

        function e(t, e) {
            return e = {exports: {}}, t(e, e.exports), e.exports
        }

        function n(t) {
            return isFinite(t = +t) && 0 != t ? t < 0 ? -n(-t) : Math.log(t + Math.sqrt(t * t + 1)) : t
        }

        function r(t, e) {
            var n, o, i = arguments.length < 3 ? t : arguments[2];
            return v(t) === i ? t[e] : (n = dn.f(t, e)) ? M(n, "value") ? n.value : void 0 !== n.get ? n.get.call(i) : void 0 : p(o = bt(t)) ? r(o, e, i) : void 0
        }

        function o(t, e, n) {
            var r, i, a = arguments.length < 4 ? t : arguments[3], u = dn.f(v(t), e);
            if (!u) {
                if (p(i = bt(t))) return o(i, e, n, a);
                u = E(0)
            }
            return M(u, "value") ? !(!1 === u.writable || !p(a)) && (r = dn.f(a, e) || E(0), r.value = n, T.f(a, e, r), !0) : void 0 !== u.set && (u.set.call(a, n), !0)
        }

        var i = Math.ceil, a = Math.floor, u = function (t) {
                return isNaN(t = +t) ? 0 : (t > 0 ? a : i)(t)
            }, c = function (t) {
                if (void 0 == t) throw TypeError("Can't call method on  " + t);
                return t
            }, s = function (t) {
                return function (e, n) {
                    var r, o, i = String(c(e)), a = u(n), s = i.length;
                    return a < 0 || a >= s ? t ? "" : void 0 : (r = i.charCodeAt(a), r < 55296 || r > 56319 || a + 1 === s || (o = i.charCodeAt(a + 1)) < 56320 || o > 57343 ? t ? i.charAt(a) : r : t ? i.slice(a, a + 2) : o - 56320 + (r - 55296 << 10) + 65536)
                }
            },
            f = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {},
            l = e(function (t) {
                var e = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
                "number" == typeof __g && (__g = e)
            }), h = e(function (t) {
                var e = t.exports = {version: "2.5.1"};
                "number" == typeof __e && (__e = e)
            }), p = function (t) {
                return "object" == typeof t ? null !== t : "function" == typeof t
            }, v = function (t) {
                if (!p(t)) throw TypeError(t + " is not an object!");
                return t
            }, d = function (t) {
                try {
                    return !!t()
                } catch (t) {
                    return !0
                }
            }, g = !d(function () {
                return 7 != Object.defineProperty({}, "a", {
                    get: function () {
                        return 7
                    }
                }).a
            }), y = l.document, m = p(y) && p(y.createElement), b = function (t) {
                return m ? y.createElement(t) : {}
            }, _ = !g && !d(function () {
                return 7 != Object.defineProperty(b("div"), "a", {
                    get: function () {
                        return 7
                    }
                }).a
            }), k = function (t, e) {
                if (!p(t)) return t;
                var n, r;
                if (e && "function" == typeof(n = t.toString) && !p(r = n.call(t))) return r;
                if ("function" == typeof(n = t.valueOf) && !p(r = n.call(t))) return r;
                if (!e && "function" == typeof(n = t.toString) && !p(r = n.call(t))) return r;
                throw TypeError("Can't convert object to primitive value")
            }, w = Object.defineProperty, S = g ? Object.defineProperty : function (t, e, n) {
                if (v(t), e = k(e, !0), v(n), _) try {
                    return w(t, e, n)
                } catch (t) {
                }
                if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
                return "value" in n && (t[e] = n.value), t
            }, T = {f: S}, E = function (t, e) {
                return {enumerable: !(1 & t), configurable: !(2 & t), writable: !(4 & t), value: e}
            }, O = g ? function (t, e, n) {
                return T.f(t, e, E(1, n))
            } : function (t, e, n) {
                return t[e] = n, t
            }, P = {}.hasOwnProperty, M = function (t, e) {
                return P.call(t, e)
            }, F = 0, j = Math.random(), D = function (t) {
                return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++F + j).toString(36))
            }, x = e(function (t) {
                var e = D("src"), n = Function.toString, r = ("" + n).split("toString");
                h.inspectSource = function (t) {
                    return n.call(t)
                }, (t.exports = function (t, n, o, i) {
                    var a = "function" == typeof o;
                    a && (M(o, "name") || O(o, "name", n)), t[n] !== o && (a && (M(o, e) || O(o, e, t[n] ? "" + t[n] : r.join(String(n)))), t === l ? t[n] = o : i ? t[n] ? t[n] = o : O(t, n, o) : (delete t[n], O(t, n, o)))
                })(Function.prototype, "toString", function () {
                    return "function" == typeof this && this[e] || n.call(this)
                })
            }), I = function (t) {
                if ("function" != typeof t) throw TypeError(t + " is not a function!");
                return t
            }, A = function (t, e, n) {
                if (I(t), void 0 === e) return t;
                switch (n) {
                    case 1:
                        return function (n) {
                            return t.call(e, n)
                        };
                    case 2:
                        return function (n, r) {
                            return t.call(e, n, r)
                        };
                    case 3:
                        return function (n, r, o) {
                            return t.call(e, n, r, o)
                        }
                }
                return function () {
                    return t.apply(e, arguments)
                }
            }, L = function (t, e, n) {
                var r, o, i, a, u = t & L.F, c = t & L.G, s = t & L.S, f = t & L.P, p = t & L.B,
                    v = c ? l : s ? l[e] || (l[e] = {}) : (l[e] || {}).prototype, d = c ? h : h[e] || (h[e] = {}),
                    g = d.prototype || (d.prototype = {});
                c && (n = e);
                for (r in n) o = !u && v && void 0 !== v[r], i = (o ? v : n)[r], a = p && o ? A(i, l) : f && "function" == typeof i ? A(Function.call, i) : i, v && x(v, r, i, t & L.U), d[r] != i && O(d, r, a), f && g[r] != i && (g[r] = i)
            };
        l.core = h, L.F = 1, L.G = 2, L.S = 4, L.P = 8, L.B = 16, L.W = 32, L.U = 64, L.R = 128;
        var R = L, N = {}, C = {}.toString, z = function (t) {
                return C.call(t).slice(8, -1)
            }, Z = Object("z").propertyIsEnumerable(0) ? Object : function (t) {
                return "String" == z(t) ? t.split("") : Object(t)
            }, H = function (t) {
                return Z(c(t))
            }, W = Math.min, B = function (t) {
                return t > 0 ? W(u(t), 9007199254740991) : 0
            }, q = Math.max, U = Math.min, V = function (t, e) {
                return t = u(t), t < 0 ? q(t + e, 0) : U(t, e)
            }, G = function (t) {
                return function (e, n, r) {
                    var o, i = H(e), a = B(i.length), u = V(r, a);
                    if (t && n != n) {
                        for (; a > u;) if ((o = i[u++]) != o) return !0
                    } else for (; a > u; u++) if ((t || u in i) && i[u] === n) return t || u || 0;
                    return !t && -1
                }
            }, X = l["__core-js_shared__"] || (l["__core-js_shared__"] = {}), Y = function (t) {
                return X[t] || (X[t] = {})
            }, K = Y("keys"), J = function (t) {
                return K[t] || (K[t] = D(t))
            }, $ = G(!1), Q = J("IE_PROTO"), tt = function (t, e) {
                var n, r = H(t), o = 0, i = [];
                for (n in r) n != Q && M(r, n) && i.push(n);
                for (; e.length > o;) M(r, n = e[o++]) && (~$(i, n) || i.push(n));
                return i
            },
            et = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(","),
            nt = Object.keys || function (t) {
                return tt(t, et)
            }, rt = g ? Object.defineProperties : function (t, e) {
                v(t);
                for (var n, r = nt(e), o = r.length, i = 0; o > i;) T.f(t, n = r[i++], e[n]);
                return t
            }, ot = l.document, it = ot && ot.documentElement, at = J("IE_PROTO"), ut = function () {
            }, ct = function () {
                var t, e = b("iframe"), n = et.length;
                for (e.style.display = "none", it.appendChild(e), e.src = "javascript:", t = e.contentWindow.document, t.open(), t.write("<script>document.F=Object<\/script>"), t.close(), ct = t.F; n--;) delete ct.prototype[et[n]];
                return ct()
            }, st = Object.create || function (t, e) {
                var n;
                return null !== t ? (ut.prototype = v(t), n = new ut, ut.prototype = null, n[at] = t) : n = ct(), void 0 === e ? n : rt(n, e)
            }, ft = e(function (t) {
                var e = Y("wks"), n = l.Symbol, r = "function" == typeof n;
                (t.exports = function (t) {
                    return e[t] || (e[t] = r && n[t] || (r ? n : D)("Symbol." + t))
                }).store = e
            }), lt = T.f, ht = ft("toStringTag"), pt = function (t, e, n) {
                t && !M(t = n ? t : t.prototype, ht) && lt(t, ht, {configurable: !0, value: e})
            }, vt = {};
        O(vt, ft("iterator"), function () {
            return this
        });
        var dt = function (t, e, n) {
            t.prototype = st(vt, {next: E(1, n)}), pt(t, e + " Iterator")
        }, gt = function (t) {
            return Object(c(t))
        }, yt = J("IE_PROTO"), mt = Object.prototype, bt = Object.getPrototypeOf || function (t) {
            return t = gt(t), M(t, yt) ? t[yt] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? mt : null
        }, _t = ft("iterator"), kt = !([].keys && "next" in [].keys()), wt = function () {
            return this
        }, St = function (t, e, n, r, o, i, a) {
            dt(n, e, r);
            var u, c, s, f = function (t) {
                    if (!kt && t in v) return v[t];
                    switch (t) {
                        case"keys":
                        case"values":
                            return function () {
                                return new n(this, t)
                            }
                    }
                    return function () {
                        return new n(this, t)
                    }
                }, l = e + " Iterator", h = "values" == o, p = !1, v = t.prototype,
                d = v[_t] || v["@@iterator"] || o && v[o], g = d || f(o), y = o ? h ? f("entries") : g : void 0,
                m = "Array" == e ? v.entries || d : d;
            if (m && (s = bt(m.call(new t))) !== Object.prototype && s.next && (pt(s, l, !0), M(s, _t) || O(s, _t, wt)), h && d && "values" !== d.name && (p = !0, g = function () {
                return d.call(this)
            }), (kt || p || !v[_t]) && O(v, _t, g), N[e] = g, N[l] = wt, o) if (u = {
                values: h ? g : f("values"),
                keys: i ? g : f("keys"),
                entries: y
            }, a) for (c in u) c in v || x(v, c, u[c]); else R(R.P + R.F * (kt || p), e, u);
            return u
        }, Tt = s(!0);
        St(String, "String", function (t) {
            this._t = String(t), this._i = 0
        }, function () {
            var t, e = this._t, n = this._i;
            return n >= e.length ? {value: void 0, done: !0} : (t = Tt(e, n), this._i += t.length, {value: t, done: !1})
        });
        var Et = Array.isArray || function (t) {
            return "Array" == z(t)
        };
        R(R.S, "Array", {isArray: Et});
        var Ot = function (t, e, n, r) {
            try {
                return r ? e(v(n)[0], n[1]) : e(n)
            } catch (e) {
                var o = t.return;
                throw void 0 !== o && v(o.call(t)), e
            }
        }, Pt = ft("iterator"), Mt = Array.prototype, Ft = function (t) {
            return void 0 !== t && (N.Array === t || Mt[Pt] === t)
        }, jt = function (t, e, n) {
            e in t ? T.f(t, e, E(0, n)) : t[e] = n
        }, Dt = ft("toStringTag"), xt = "Arguments" == z(function () {
            return arguments
        }()), It = function (t, e) {
            try {
                return t[e]
            } catch (t) {
            }
        }, At = function (t) {
            var e, n, r;
            return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof(n = It(e = Object(t), Dt)) ? n : xt ? z(e) : "Object" == (r = z(e)) && "function" == typeof e.callee ? "Arguments" : r
        }, Lt = ft("iterator"), Rt = h.getIteratorMethod = function (t) {
            if (void 0 != t) return t[Lt] || t["@@iterator"] || N[At(t)]
        }, Nt = ft("iterator"), Ct = !1;
        try {
            var zt = [7][Nt]();
            zt.return = function () {
                Ct = !0
            }, Array.from(zt, function () {
                throw 2
            })
        } catch (t) {
        }
        var Zt = function (t, e) {
            if (!e && !Ct) return !1;
            var n = !1;
            try {
                var r = [7], o = r[Nt]();
                o.next = function () {
                    return {done: n = !0}
                }, r[Nt] = function () {
                    return o
                }, t(r)
            } catch (t) {
            }
            return n
        };
        R(R.S + R.F * !Zt(function (t) {
            Array.from(t)
        }), "Array", {
            from: function (t) {
                var e, n, r, o, i = gt(t), a = "function" == typeof this ? this : Array, u = arguments.length,
                    c = u > 1 ? arguments[1] : void 0, s = void 0 !== c, f = 0, l = Rt(i);
                if (s && (c = A(c, u > 2 ? arguments[2] : void 0, 2)), void 0 == l || a == Array && Ft(l)) for (e = B(i.length), n = new a(e); e > f; f++) jt(n, f, s ? c(i[f], f) : i[f]); else for (o = l.call(i), n = new a; !(r = o.next()).done; f++) jt(n, f, s ? Ot(o, c, [r.value, f], !0) : r.value);
                return n.length = f, n
            }
        }), R(R.S + R.F * d(function () {
            function t() {
            }

            return !(Array.of.call(t) instanceof t)
        }), "Array", {
            of: function () {
                for (var t = 0, e = arguments.length, n = new ("function" == typeof this ? this : Array)(e); e > t;) jt(n, t, arguments[t++]);
                return n.length = e, n
            }
        });
        var Ht = function (t, e) {
            return !!t && d(function () {
                e ? t.call(null, function () {
                }, 1) : t.call(null)
            })
        }, Wt = [].join;
        R(R.P + R.F * (Z != Object || !Ht(Wt)), "Array", {
            join: function (t) {
                return Wt.call(H(this), void 0 === t ? "," : t)
            }
        });
        var Bt = [].slice;
        R(R.P + R.F * d(function () {
            it && Bt.call(it)
        }), "Array", {
            slice: function (t, e) {
                var n = B(this.length), r = z(this);
                if (e = void 0 === e ? n : e, "Array" == r) return Bt.call(this, t, e);
                for (var o = V(t, n), i = V(e, n), a = B(i - o), u = Array(a), c = 0; c < a; c++) u[c] = "String" == r ? this.charAt(o + c) : this[o + c];
                return u
            }
        });
        var qt = [].sort, Ut = [1, 2, 3];
        R(R.P + R.F * (d(function () {
            Ut.sort(void 0)
        }) || !d(function () {
            Ut.sort(null)
        }) || !Ht(qt)), "Array", {
            sort: function (t) {
                return void 0 === t ? qt.call(gt(this)) : qt.call(gt(this), I(t))
            }
        });
        var Vt = ft("species"), Gt = function (t) {
            var e;
            return Et(t) && (e = t.constructor, "function" != typeof e || e !== Array && !Et(e.prototype) || (e = void 0), p(e) && null === (e = e[Vt]) && (e = void 0)), void 0 === e ? Array : e
        }, Xt = function (t, e) {
            return new (Gt(t))(e)
        }, Yt = function (t, e) {
            var n = 1 == t, r = 2 == t, o = 3 == t, i = 4 == t, a = 6 == t, u = 5 == t || a, c = e || Xt;
            return function (e, s, f) {
                for (var l, h, p = gt(e), v = Z(p), d = A(s, f, 3), g = B(v.length), y = 0, m = n ? c(e, g) : r ? c(e, 0) : void 0; g > y; y++) if ((u || y in v) && (l = v[y], h = d(l, y, p), t)) if (n) m[y] = h; else if (h) switch (t) {
                    case 3:
                        return !0;
                    case 5:
                        return l;
                    case 6:
                        return y;
                    case 2:
                        m.push(l)
                } else if (i) return !1;
                return a ? -1 : o || i ? i : m
            }
        }, Kt = Yt(0), Jt = Ht([].forEach, !0);
        R(R.P + R.F * !Jt, "Array", {
            forEach: function (t) {
                return Kt(this, t, arguments[1])
            }
        });
        var $t = Yt(1);
        R(R.P + R.F * !Ht([].map, !0), "Array", {
            map: function (t) {
                return $t(this, t, arguments[1])
            }
        });
        var Qt = Yt(2);
        R(R.P + R.F * !Ht([].filter, !0), "Array", {
            filter: function (t) {
                return Qt(this, t, arguments[1])
            }
        });
        var te = Yt(3);
        R(R.P + R.F * !Ht([].some, !0), "Array", {
            some: function (t) {
                return te(this, t, arguments[1])
            }
        });
        var ee = Yt(4);
        R(R.P + R.F * !Ht([].every, !0), "Array", {
            every: function (t) {
                return ee(this, t, arguments[1])
            }
        });
        var ne = function (t, e, n, r, o) {
            I(e);
            var i = gt(t), a = Z(i), u = B(i.length), c = o ? u - 1 : 0, s = o ? -1 : 1;
            if (n < 2) for (; ;) {
                if (c in a) {
                    r = a[c], c += s;
                    break
                }
                if (c += s, o ? c < 0 : u <= c) throw TypeError("Reduce of empty array with no initial value")
            }
            for (; o ? c >= 0 : u > c; c += s) c in a && (r = e(r, a[c], c, i));
            return r
        };
        R(R.P + R.F * !Ht([].reduce, !0), "Array", {
            reduce: function (t) {
                return ne(this, t, arguments.length, arguments[1], !1)
            }
        }), R(R.P + R.F * !Ht([].reduceRight, !0), "Array", {
            reduceRight: function (t) {
                return ne(this, t, arguments.length, arguments[1], !0)
            }
        });
        var re = G(!1), oe = [].indexOf, ie = !!oe && 1 / [1].indexOf(1, -0) < 0;
        R(R.P + R.F * (ie || !Ht(oe)), "Array", {
            indexOf: function (t) {
                return ie ? oe.apply(this, arguments) || 0 : re(this, t, arguments[1])
            }
        });
        var ae = [].lastIndexOf, ue = !!ae && 1 / [1].lastIndexOf(1, -0) < 0;
        R(R.P + R.F * (ue || !Ht(ae)), "Array", {
            lastIndexOf: function (t) {
                if (ue) return ae.apply(this, arguments) || 0;
                var e = H(this), n = B(e.length), r = n - 1;
                for (arguments.length > 1 && (r = Math.min(r, u(arguments[1]))), r < 0 && (r = n + r); r >= 0; r--) if (r in e && e[r] === t) return r || 0;
                return -1
            }
        });
        var ce = [].copyWithin || function (t, e) {
            var n = gt(this), r = B(n.length), o = V(t, r), i = V(e, r),
                a = arguments.length > 2 ? arguments[2] : void 0, u = Math.min((void 0 === a ? r : V(a, r)) - i, r - o),
                c = 1;
            for (i < o && o < i + u && (c = -1, i += u - 1, o += u - 1); u-- > 0;) i in n ? n[o] = n[i] : delete n[o], o += c, i += c;
            return n
        }, se = ft("unscopables"), fe = Array.prototype;
        void 0 == fe[se] && O(fe, se, {});
        var le = function (t) {
            fe[se][t] = !0
        };
        R(R.P, "Array", {copyWithin: ce}), le("copyWithin");
        var he = function (t) {
            for (var e = gt(this), n = B(e.length), r = arguments.length, o = V(r > 1 ? arguments[1] : void 0, n), i = r > 2 ? arguments[2] : void 0, a = void 0 === i ? n : V(i, n); a > o;) e[o++] = t;
            return e
        };
        R(R.P, "Array", {fill: he}), le("fill");
        var pe = Yt(5), ve = !0;
        "find" in [] && Array(1).find(function () {
            ve = !1
        }), R(R.P + R.F * ve, "Array", {
            find: function (t) {
                return pe(this, t, arguments.length > 1 ? arguments[1] : void 0)
            }
        }), le("find");
        var de = Yt(6), ge = !0;
        "findIndex" in [] && Array(1).findIndex(function () {
            ge = !1
        }), R(R.P + R.F * ge, "Array", {
            findIndex: function (t) {
                return de(this, t, arguments.length > 1 ? arguments[1] : void 0)
            }
        }), le("findIndex");
        var ye = ft("species"), me = function (t) {
            var e = l[t];
            g && e && !e[ye] && T.f(e, ye, {
                configurable: !0, get: function () {
                    return this
                }
            })
        };
        me("Array");
        var be = function (t, e) {
            return {value: e, done: !!t}
        }, _e = St(Array, "Array", function (t, e) {
            this._t = H(t), this._i = 0, this._k = e
        }, function () {
            var t = this._t, e = this._k, n = this._i++;
            return !t || n >= t.length ? (this._t = void 0, be(1)) : "keys" == e ? be(0, n) : "values" == e ? be(0, t[n]) : be(0, [n, t[n]])
        }, "values");
        N.Arguments = N.Array, le("keys"), le("values"), le("entries");
        var ke = h.Array;
        R(R.S, "Date", {
            now: function () {
                return (new Date).getTime()
            }
        }), R(R.P + R.F * d(function () {
            return null !== new Date(NaN).toJSON() || 1 !== Date.prototype.toJSON.call({
                toISOString: function () {
                    return 1
                }
            })
        }), "Date", {
            toJSON: function (t) {
                var e = gt(this), n = k(e);
                return "number" != typeof n || isFinite(n) ? e.toISOString() : null
            }
        });
        var we = Date.prototype.getTime, Se = Date.prototype.toISOString, Te = function (t) {
            return t > 9 ? t : "0" + t
        }, Ee = d(function () {
            return "0385-07-25T07:06:39.999Z" != Se.call(new Date(-5e13 - 1))
        }) || !d(function () {
            Se.call(new Date(NaN))
        }) ? function () {
            if (!isFinite(we.call(this))) throw RangeError("Invalid time value");
            var t = this, e = t.getUTCFullYear(), n = t.getUTCMilliseconds(), r = e < 0 ? "-" : e > 9999 ? "+" : "";
            return r + ("00000" + Math.abs(e)).slice(r ? -6 : -4) + "-" + Te(t.getUTCMonth() + 1) + "-" + Te(t.getUTCDate()) + "T" + Te(t.getUTCHours()) + ":" + Te(t.getUTCMinutes()) + ":" + Te(t.getUTCSeconds()) + "." + (n > 99 ? n : "0" + Te(n)) + "Z"
        } : Se;
        R(R.P + R.F * (Date.prototype.toISOString !== Ee), "Date", {toISOString: Ee});
        var Oe = Date.prototype, Pe = Oe.toString, Me = Oe.getTime;
        new Date(NaN) + "" != "Invalid Date" && x(Oe, "toString", function () {
            var t = Me.call(this);
            return t === t ? Pe.call(this) : "Invalid Date"
        });
        var Fe = function (t) {
            if ("string" !== t && "number" !== t && "default" !== t) throw TypeError("Incorrect hint");
            return k(v(this), "number" != t)
        }, je = ft("toPrimitive"), De = Date.prototype;
        je in De || O(De, je, Fe);
        var xe = function (t, e, n) {
            var r = void 0 === n;
            switch (e.length) {
                case 0:
                    return r ? t() : t.call(n);
                case 1:
                    return r ? t(e[0]) : t.call(n, e[0]);
                case 2:
                    return r ? t(e[0], e[1]) : t.call(n, e[0], e[1]);
                case 3:
                    return r ? t(e[0], e[1], e[2]) : t.call(n, e[0], e[1], e[2]);
                case 4:
                    return r ? t(e[0], e[1], e[2], e[3]) : t.call(n, e[0], e[1], e[2], e[3])
            }
            return t.apply(n, e)
        }, Ie = [].slice, Ae = {}, Le = function (t, e, n) {
            if (!(e in Ae)) {
                for (var r = [], o = 0; o < e; o++) r[o] = "a[" + o + "]";
                Ae[e] = Function("F,a", "return new F(" + r.join(",") + ")")
            }
            return Ae[e](t, n)
        }, Re = Function.bind || function (t) {
            var e = I(this), n = Ie.call(arguments, 1), r = function () {
                var o = n.concat(Ie.call(arguments));
                return this instanceof r ? Le(e, o.length, o) : xe(e, o, t)
            };
            return p(e.prototype) && (r.prototype = e.prototype), r
        };
        R(R.P, "Function", {bind: Re});
        var Ne = T.f, Ce = Function.prototype, ze = /^\s*function ([^ (]*)/;
        "name" in Ce || g && Ne(Ce, "name", {
            configurable: !0, get: function () {
                try {
                    return ("" + this).match(ze)[1]
                } catch (t) {
                    return ""
                }
            }
        });
        var Ze = ft("hasInstance"), He = Function.prototype;
        Ze in He || T.f(He, Ze, {
            value: function (t) {
                if ("function" != typeof this || !p(t)) return !1;
                if (!p(this.prototype)) return t instanceof this;
                for (; t = bt(t);) if (this.prototype === t) return !0;
                return !1
            }
        });
        var We = {};
        We[ft("toStringTag")] = "z", We + "" != "[object z]" && x(Object.prototype, "toString", function () {
            return "[object " + At(this) + "]"
        }, !0);
        for (var Be = ft("iterator"), qe = ft("toStringTag"), Ue = N.Array, Ve = {
            CSSRuleList: !0,
            CSSStyleDeclaration: !1,
            CSSValueList: !1,
            ClientRectList: !1,
            DOMRectList: !1,
            DOMStringList: !1,
            DOMTokenList: !0,
            DataTransferItemList: !1,
            FileList: !1,
            HTMLAllCollection: !1,
            HTMLCollection: !1,
            HTMLFormElement: !1,
            HTMLSelectElement: !1,
            MediaList: !0,
            MimeTypeArray: !1,
            NamedNodeMap: !1,
            NodeList: !0,
            PaintRequestList: !1,
            Plugin: !1,
            PluginArray: !1,
            SVGLengthList: !1,
            SVGNumberList: !1,
            SVGPathSegList: !1,
            SVGPointList: !1,
            SVGStringList: !1,
            SVGTransformList: !1,
            SourceBufferList: !1,
            StyleSheetList: !0,
            TextTrackCueList: !1,
            TextTrackList: !1,
            TouchList: !1
        }, Ge = nt(Ve), Xe = 0; Xe < Ge.length; Xe++) {
            var Ye, Ke = Ge[Xe], Je = Ve[Ke], $e = l[Ke], Qe = $e && $e.prototype;
            if (Qe && (Qe[Be] || O(Qe, Be, Ue), Qe[qe] || O(Qe, qe, Ke), N[Ke] = Ue, Je)) for (Ye in _e) Qe[Ye] || x(Qe, Ye, _e[Ye], !0)
        }
        var tn = function (t, e, n) {
                for (var r in e) x(t, r, e[r], n);
                return t
            }, en = function (t, e, n, r) {
                if (!(t instanceof e) || void 0 !== r && r in t) throw TypeError(n + ": incorrect invocation!");
                return t
            }, nn = e(function (t) {
                var e = {}, n = {}, r = t.exports = function (t, r, o, i, a) {
                    var u, c, s, f, l = a ? function () {
                        return t
                    } : Rt(t), h = A(o, i, r ? 2 : 1), p = 0;
                    if ("function" != typeof l) throw TypeError(t + " is not iterable!");
                    if (Ft(l)) {
                        for (u = B(t.length); u > p; p++) if ((f = r ? h(v(c = t[p])[0], c[1]) : h(t[p])) === e || f === n) return f
                    } else for (s = l.call(t); !(c = s.next()).done;) if ((f = Ot(s, h, c.value, r)) === e || f === n) return f
                };
                r.BREAK = e, r.RETURN = n
            }), rn = e(function (t) {
                var e = D("meta"), n = T.f, r = 0, o = Object.isExtensible || function () {
                    return !0
                }, i = !d(function () {
                    return o(Object.preventExtensions({}))
                }), a = function (t) {
                    n(t, e, {value: {i: "O" + ++r, w: {}}})
                }, u = function (t, n) {
                    if (!p(t)) return "symbol" == typeof t ? t : ("string" == typeof t ? "S" : "P") + t;
                    if (!M(t, e)) {
                        if (!o(t)) return "F";
                        if (!n) return "E";
                        a(t)
                    }
                    return t[e].i
                }, c = function (t, n) {
                    if (!M(t, e)) {
                        if (!o(t)) return !0;
                        if (!n) return !1;
                        a(t)
                    }
                    return t[e].w
                }, s = function (t) {
                    return i && f.NEED && o(t) && !M(t, e) && a(t), t
                }, f = t.exports = {KEY: e, NEED: !1, fastKey: u, getWeak: c, onFreeze: s}
            }), on = function (t, e) {
                if (!p(t) || t._t !== e) throw TypeError("Incompatible receiver, " + e + " required!");
                return t
            }, an = T.f, un = rn.fastKey, cn = g ? "_s" : "size", sn = function (t, e) {
                var n, r = un(e);
                if ("F" !== r) return t._i[r];
                for (n = t._f; n; n = n.n) if (n.k == e) return n
            }, fn = {
                getConstructor: function (t, e, n, r) {
                    var o = t(function (t, i) {
                        en(t, o, e, "_i"), t._t = e, t._i = st(null), t._f = void 0, t._l = void 0, t[cn] = 0, void 0 != i && nn(i, n, t[r], t)
                    });
                    return tn(o.prototype, {
                        clear: function () {
                            for (var t = on(this, e), n = t._i, r = t._f; r; r = r.n) r.r = !0, r.p && (r.p = r.p.n = void 0), delete n[r.i];
                            t._f = t._l = void 0, t[cn] = 0
                        }, delete: function (t) {
                            var n = on(this, e), r = sn(n, t);
                            if (r) {
                                var o = r.n, i = r.p;
                                delete n._i[r.i], r.r = !0, i && (i.n = o), o && (o.p = i), n._f == r && (n._f = o), n._l == r && (n._l = i), n[cn]--
                            }
                            return !!r
                        }, forEach: function (t) {
                            on(this, e);
                            for (var n, r = A(t, arguments.length > 1 ? arguments[1] : void 0, 3); n = n ? n.n : this._f;) for (r(n.v, n.k, this); n && n.r;) n = n.p
                        }, has: function (t) {
                            return !!sn(on(this, e), t)
                        }
                    }), g && an(o.prototype, "size", {
                        get: function () {
                            return on(this, e)[cn]
                        }
                    }), o
                }, def: function (t, e, n) {
                    var r, o, i = sn(t, e);
                    return i ? i.v = n : (t._l = i = {
                        i: o = un(e, !0),
                        k: e,
                        v: n,
                        p: r = t._l,
                        n: void 0,
                        r: !1
                    }, t._f || (t._f = i), r && (r.n = i), t[cn]++, "F" !== o && (t._i[o] = i)), t
                }, getEntry: sn, setStrong: function (t, e, n) {
                    St(t, e, function (t, n) {
                        this._t = on(t, e), this._k = n, this._l = void 0
                    }, function () {
                        for (var t = this, e = t._k, n = t._l; n && n.r;) n = n.p;
                        return t._t && (t._l = n = n ? n.n : t._t._f) ? "keys" == e ? be(0, n.k) : "values" == e ? be(0, n.v) : be(0, [n.k, n.v]) : (t._t = void 0, be(1))
                    }, n ? "entries" : "values", !n, !0), me(e)
                }
            }, ln = {}.propertyIsEnumerable, hn = {f: ln}, pn = Object.getOwnPropertyDescriptor,
            vn = g ? pn : function (t, e) {
                if (t = H(t), e = k(e, !0), _) try {
                    return pn(t, e)
                } catch (t) {
                }
                if (M(t, e)) return E(!hn.f.call(t, e), t[e])
            }, dn = {f: vn}, gn = function (t, e) {
                if (v(t), !p(e) && null !== e) throw TypeError(e + ": can't set as prototype!")
            }, yn = {
                set: Object.setPrototypeOf || ("__proto__" in {} ? function (t, e, n) {
                    try {
                        n = A(Function.call, dn.f(Object.prototype, "__proto__").set, 2), n(t, []), e = !(t instanceof Array)
                    } catch (t) {
                        e = !0
                    }
                    return function (t, r) {
                        return gn(t, r), e ? t.__proto__ = r : n(t, r), t
                    }
                }({}, !1) : void 0), check: gn
            }, mn = yn.set, bn = function (t, e, n) {
                var r, o = e.constructor;
                return o !== n && "function" == typeof o && (r = o.prototype) !== n.prototype && p(r) && mn && mn(t, r), t
            }, _n = function (t, e, n, r, o, i) {
                var a = l[t], u = a, c = o ? "set" : "add", s = u && u.prototype, f = {}, h = function (t) {
                    var e = s[t];
                    x(s, t, "delete" == t ? function (t) {
                        return !(i && !p(t)) && e.call(this, 0 === t ? 0 : t)
                    } : "has" == t ? function (t) {
                        return !(i && !p(t)) && e.call(this, 0 === t ? 0 : t)
                    } : "get" == t ? function (t) {
                        return i && !p(t) ? void 0 : e.call(this, 0 === t ? 0 : t)
                    } : "add" == t ? function (t) {
                        return e.call(this, 0 === t ? 0 : t), this
                    } : function (t, n) {
                        return e.call(this, 0 === t ? 0 : t, n), this
                    })
                };
                if ("function" == typeof u && (i || s.forEach && !d(function () {
                    (new u).entries().next()
                }))) {
                    var v = new u, g = v[c](i ? {} : -0, 1) != v, y = d(function () {
                        v.has(1)
                    }), m = Zt(function (t) {
                        new u(t)
                    }), b = !i && d(function () {
                        for (var t = new u, e = 5; e--;) t[c](e, e);
                        return !t.has(-0)
                    });
                    m || (u = e(function (e, n) {
                        en(e, u, t);
                        var r = bn(new a, e, u);
                        return void 0 != n && nn(n, o, r[c], r), r
                    }), u.prototype = s, s.constructor = u), (y || b) && (h("delete"), h("has"), o && h("get")), (b || g) && h(c), i && s.clear && delete s.clear
                } else u = r.getConstructor(e, t, o, c), tn(u.prototype, n), rn.NEED = !0;
                return pt(u, t), f[t] = u, R(R.G + R.W + R.F * (u != a), f), i || r.setStrong(u, t, o), u
            }, kn = _n("Map", function (t) {
                return function () {
                    return t(this, arguments.length > 0 ? arguments[0] : void 0)
                }
            }, {
                get: function (t) {
                    var e = fn.getEntry(on(this, "Map"), t);
                    return e && e.v
                }, set: function (t, e) {
                    return fn.def(on(this, "Map"), 0 === t ? 0 : t, e)
                }
            }, fn, !0), wn = Math.log1p || function (t) {
                return (t = +t) > -1e-8 && t < 1e-8 ? t - t * t / 2 : Math.log(1 + t)
            }, Sn = Math.sqrt, Tn = Math.acosh;
        R(R.S + R.F * !(Tn && 710 == Math.floor(Tn(Number.MAX_VALUE)) && Tn(1 / 0) == 1 / 0), "Math", {
            acosh: function (t) {
                return (t = +t) < 1 ? NaN : t > 94906265.62425156 ? Math.log(t) + Math.LN2 : wn(t - 1 + Sn(t - 1) * Sn(t + 1))
            }
        });
        var En = Math.asinh;
        R(R.S + R.F * !(En && 1 / En(0) > 0), "Math", {asinh: n});
        var On = Math.atanh;
        R(R.S + R.F * !(On && 1 / On(-0) < 0), "Math", {
            atanh: function (t) {
                return 0 == (t = +t) ? t : Math.log((1 + t) / (1 - t)) / 2
            }
        });
        var Pn = Math.sign || function (t) {
            return 0 == (t = +t) || t != t ? t : t < 0 ? -1 : 1
        };
        R(R.S, "Math", {
            cbrt: function (t) {
                return Pn(t = +t) * Math.pow(Math.abs(t), 1 / 3)
            }
        }), R(R.S, "Math", {
            clz32: function (t) {
                return (t >>>= 0) ? 31 - Math.floor(Math.log(t + .5) * Math.LOG2E) : 32
            }
        });
        var Mn = Math.exp;
        R(R.S, "Math", {
            cosh: function (t) {
                return (Mn(t = +t) + Mn(-t)) / 2
            }
        });
        var Fn = Math.expm1,
            jn = !Fn || Fn(10) > 22025.465794806718 || Fn(10) < 22025.465794806718 || -2e-17 != Fn(-2e-17) ? function (t) {
                return 0 == (t = +t) ? t : t > -1e-6 && t < 1e-6 ? t + t * t / 2 : Math.exp(t) - 1
            } : Fn;
        R(R.S + R.F * (jn != Math.expm1), "Math", {expm1: jn});
        var Dn = Math.pow, xn = Dn(2, -52), In = Dn(2, -23), An = Dn(2, 127) * (2 - In), Ln = Dn(2, -126),
            Rn = function (t) {
                return t + 1 / xn - 1 / xn
            }, Nn = Math.fround || function (t) {
                var e, n, r = Math.abs(t), o = Pn(t);
                return r < Ln ? o * Rn(r / Ln / In) * Ln * In : (e = (1 + In / xn) * r, n = e - (e - r), n > An || n != n ? o * (1 / 0) : o * n)
            };
        R(R.S, "Math", {fround: Nn});
        var Cn = Math.abs;
        R(R.S, "Math", {
            hypot: function (t, e) {
                for (var n, r, o = 0, i = 0, a = arguments.length, u = 0; i < a;) n = Cn(arguments[i++]), u < n ? (r = u / n, o = o * r * r + 1, u = n) : n > 0 ? (r = n / u, o += r * r) : o += n;
                return u === 1 / 0 ? 1 / 0 : u * Math.sqrt(o)
            }
        });
        var zn = Math.imul;
        R(R.S + R.F * d(function () {
            return -5 != zn(4294967295, 5) || 2 != zn.length
        }), "Math", {
            imul: function (t, e) {
                var n = +t, r = +e, o = 65535 & n, i = 65535 & r;
                return 0 | o * i + ((65535 & n >>> 16) * i + o * (65535 & r >>> 16) << 16 >>> 0)
            }
        }), R(R.S, "Math", {
            log10: function (t) {
                return Math.log(t) * Math.LOG10E
            }
        }), R(R.S, "Math", {log1p: wn}), R(R.S, "Math", {
            log2: function (t) {
                return Math.log(t) / Math.LN2
            }
        }), R(R.S, "Math", {sign: Pn});
        var Zn = Math.exp;
        R(R.S + R.F * d(function () {
            return -2e-17 != !Math.sinh(-2e-17)
        }), "Math", {
            sinh: function (t) {
                return Math.abs(t = +t) < 1 ? (jn(t) - jn(-t)) / 2 : (Zn(t - 1) - Zn(-t - 1)) * (Math.E / 2)
            }
        });
        var Hn = Math.exp;
        R(R.S, "Math", {
            tanh: function (t) {
                var e = jn(t = +t), n = jn(-t);
                return e == 1 / 0 ? 1 : n == 1 / 0 ? -1 : (e - n) / (Hn(t) + Hn(-t))
            }
        }), R(R.S, "Math", {
            trunc: function (t) {
                return (t > 0 ? Math.floor : Math.ceil)(t)
            }
        });
        var Wn = et.concat("length", "prototype"), Bn = Object.getOwnPropertyNames || function (t) {
                return tt(t, Wn)
            }, qn = {f: Bn}, Un = "\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff", Vn = "[" + Un + "]", Gn = "​",
            Xn = RegExp("^" + Vn + Vn + "*"), Yn = RegExp(Vn + Vn + "*$"), Kn = function (t, e, n) {
                var r = {}, o = d(function () {
                    return !!Un[t]() || Gn[t]() != Gn
                }), i = r[t] = o ? e(Jn) : Un[t];
                n && (r[n] = i), R(R.P + R.F * o, "String", r)
            }, Jn = Kn.trim = function (t, e) {
                return t = String(c(t)), 1 & e && (t = t.replace(Xn, "")), 2 & e && (t = t.replace(Yn, "")), t
            }, $n = Kn, Qn = qn.f, tr = dn.f, er = T.f, nr = $n.trim, rr = l.Number, or = rr, ir = rr.prototype,
            ar = "Number" == z(st(ir)), ur = "trim" in String.prototype, cr = function (t) {
                var e = k(t, !1);
                if ("string" == typeof e && e.length > 2) {
                    e = ur ? e.trim() : nr(e, 3);
                    var n, r, o, i = e.charCodeAt(0);
                    if (43 === i || 45 === i) {
                        if (88 === (n = e.charCodeAt(2)) || 120 === n) return NaN
                    } else if (48 === i) {
                        switch (e.charCodeAt(1)) {
                            case 66:
                            case 98:
                                r = 2, o = 49;
                                break;
                            case 79:
                            case 111:
                                r = 8, o = 55;
                                break;
                            default:
                                return +e
                        }
                        for (var a, u = e.slice(2), c = 0, s = u.length; c < s; c++) if ((a = u.charCodeAt(c)) < 48 || a > o) return NaN;
                        return parseInt(u, r)
                    }
                }
                return +e
            };
        if (!rr(" 0o1") || !rr("0b1") || rr("+0x1")) {
            rr = function (t) {
                var e = arguments.length < 1 ? 0 : t, n = this;
                return n instanceof rr && (ar ? d(function () {
                    ir.valueOf.call(n)
                }) : "Number" != z(n)) ? bn(new or(cr(e)), n, rr) : cr(e)
            };
            for (var sr, fr = g ? Qn(or) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","), lr = 0; fr.length > lr; lr++) M(or, sr = fr[lr]) && !M(rr, sr) && er(rr, sr, tr(or, sr));
            rr.prototype = ir, ir.constructor = rr, x(l, "Number", rr)
        }
        var hr = function (t, e) {
                if ("number" != typeof t && "Number" != z(t)) throw TypeError(e);
                return +t
            }, pr = function (t) {
                var e = String(c(this)), n = "", r = u(t);
                if (r < 0 || r == 1 / 0) throw RangeError("Count can't be negative");
                for (; r > 0; (r >>>= 1) && (e += e)) 1 & r && (n += e);
                return n
            }, vr = 1..toFixed, dr = Math.floor, gr = [0, 0, 0, 0, 0, 0], yr = "Number.toFixed: incorrect invocation!",
            mr = function (t, e) {
                for (var n = -1, r = e; ++n < 6;) r += t * gr[n], gr[n] = r % 1e7, r = dr(r / 1e7)
            }, br = function (t) {
                for (var e = 6, n = 0; --e >= 0;) n += gr[e], gr[e] = dr(n / t), n = n % t * 1e7
            }, _r = function () {
                for (var t = 6, e = ""; --t >= 0;) if ("" !== e || 0 === t || 0 !== gr[t]) {
                    var n = String(gr[t]);
                    e = "" === e ? n : e + pr.call("0", 7 - n.length) + n
                }
                return e
            }, kr = function (t, e, n) {
                return 0 === e ? n : e % 2 == 1 ? kr(t, e - 1, n * t) : kr(t * t, e / 2, n)
            }, wr = function (t) {
                for (var e = 0, n = t; n >= 4096;) e += 12, n /= 4096;
                for (; n >= 2;) e += 1, n /= 2;
                return e
            };
        R(R.P + R.F * (!!vr && ("0.000" !== 8e-5.toFixed(3) || "1" !== .9.toFixed(0) || "1.25" !== 1.255.toFixed(2) || "1000000000000000128" !== (0xde0b6b3a7640080).toFixed(0)) || !d(function () {
            vr.call({})
        })), "Number", {
            toFixed: function (t) {
                var e, n, r, o, i = hr(this, yr), a = u(t), c = "", s = "0";
                if (a < 0 || a > 20) throw RangeError(yr);
                if (i != i) return "NaN";
                if (i <= -1e21 || i >= 1e21) return String(i);
                if (i < 0 && (c = "-", i = -i), i > 1e-21) if (e = wr(i * kr(2, 69, 1)) - 69, n = e < 0 ? i * kr(2, -e, 1) : i / kr(2, e, 1), n *= 4503599627370496, (e = 52 - e) > 0) {
                    for (mr(0, n), r = a; r >= 7;) mr(1e7, 0), r -= 7;
                    for (mr(kr(10, r, 1), 0), r = e - 1; r >= 23;) br(1 << 23), r -= 23;
                    br(1 << r), mr(1, 1), br(2), s = _r()
                } else mr(0, n), mr(1 << -e, 0), s = _r() + pr.call("0", a);
                return a > 0 ? (o = s.length, s = c + (o <= a ? "0." + pr.call("0", a - o) + s : s.slice(0, o - a) + "." + s.slice(o - a))) : s = c + s, s
            }
        });
        var Sr = 1..toPrecision;
        R(R.P + R.F * (d(function () {
            return "1" !== Sr.call(1, void 0)
        }) || !d(function () {
            Sr.call({})
        })), "Number", {
            toPrecision: function (t) {
                var e = hr(this, "Number#toPrecision: incorrect invocation!");
                return void 0 === t ? Sr.call(e) : Sr.call(e, t)
            }
        }), R(R.S, "Number", {EPSILON: Math.pow(2, -52)});
        var Tr = l.isFinite;
        R(R.S, "Number", {
            isFinite: function (t) {
                return "number" == typeof t && Tr(t)
            }
        });
        var Er = Math.floor, Or = function (t) {
            return !p(t) && isFinite(t) && Er(t) === t
        };
        R(R.S, "Number", {isInteger: Or}), R(R.S, "Number", {
            isNaN: function (t) {
                return t != t
            }
        });
        var Pr = Math.abs;
        R(R.S, "Number", {
            isSafeInteger: function (t) {
                return Or(t) && Pr(t) <= 9007199254740991
            }
        }), R(R.S, "Number", {MAX_SAFE_INTEGER: 9007199254740991}), R(R.S, "Number", {MIN_SAFE_INTEGER: -9007199254740991});
        var Mr = l.parseFloat, Fr = $n.trim, jr = 1 / Mr(Un + "-0") != -1 / 0 ? function (t) {
            var e = Fr(String(t), 3), n = Mr(e);
            return 0 === n && "-" == e.charAt(0) ? -0 : n
        } : Mr;
        R(R.S + R.F * (Number.parseFloat != jr), "Number", {parseFloat: jr});
        var Dr = l.parseInt, xr = $n.trim, Ir = /^[-+]?0[xX]/,
            Ar = 8 !== Dr(Un + "08") || 22 !== Dr(Un + "0x16") ? function (t, e) {
                var n = xr(String(t), 3);
                return Dr(n, e >>> 0 || (Ir.test(n) ? 16 : 10))
            } : Dr;
        R(R.S + R.F * (Number.parseInt != Ar), "Number", {parseInt: Ar});
        var Lr = ft, Rr = {f: Lr}, Nr = T.f, Cr = Object.getOwnPropertySymbols, zr = {f: Cr}, Zr = function (t) {
                var e = nt(t), n = zr.f;
                if (n) for (var r, o = n(t), i = hn.f, a = 0; o.length > a;) i.call(t, r = o[a++]) && e.push(r);
                return e
            }, Hr = qn.f, Wr = {}.toString,
            Br = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
            qr = function (t) {
                try {
                    return Hr(t)
                } catch (t) {
                    return Br.slice()
                }
            }, Ur = function (t) {
                return Br && "[object Window]" == Wr.call(t) ? qr(t) : Hr(H(t))
            }, Vr = {f: Ur}, Gr = rn.KEY, Xr = dn.f, Yr = T.f, Kr = Vr.f, Jr = l.Symbol, $r = l.JSON,
            Qr = $r && $r.stringify, to = ft("_hidden"), eo = ft("toPrimitive"), no = {}.propertyIsEnumerable,
            ro = Y("symbol-registry"), oo = Y("symbols"), io = Y("op-symbols"), ao = Object.prototype,
            uo = "function" == typeof Jr, co = l.QObject, so = !co || !co.prototype || !co.prototype.findChild,
            fo = g && d(function () {
                return 7 != st(Yr({}, "a", {
                    get: function () {
                        return Yr(this, "a", {value: 7}).a
                    }
                })).a
            }) ? function (t, e, n) {
                var r = Xr(ao, e);
                r && delete ao[e], Yr(t, e, n), r && t !== ao && Yr(ao, e, r)
            } : Yr, lo = function (t) {
                var e = oo[t] = st(Jr.prototype);
                return e._k = t, e
            }, ho = uo && "symbol" == typeof Jr.iterator ? function (t) {
                return "symbol" == typeof t
            } : function (t) {
                return t instanceof Jr
            }, po = function (t, e, n) {
                return t === ao && po(io, e, n), v(t), e = k(e, !0), v(n), M(oo, e) ? (n.enumerable ? (M(t, to) && t[to][e] && (t[to][e] = !1), n = st(n, {enumerable: E(0, !1)})) : (M(t, to) || Yr(t, to, E(1, {})), t[to][e] = !0), fo(t, e, n)) : Yr(t, e, n)
            }, vo = function (t, e) {
                v(t);
                for (var n, r = Zr(e = H(e)), o = 0, i = r.length; i > o;) po(t, n = r[o++], e[n]);
                return t
            }, go = function (t, e) {
                return void 0 === e ? st(t) : vo(st(t), e)
            }, yo = function (t) {
                var e = no.call(this, t = k(t, !0));
                return !(this === ao && M(oo, t) && !M(io, t)) && (!(e || !M(this, t) || !M(oo, t) || M(this, to) && this[to][t]) || e)
            }, mo = function (t, e) {
                if (t = H(t), e = k(e, !0), t !== ao || !M(oo, e) || M(io, e)) {
                    var n = Xr(t, e);
                    return !n || !M(oo, e) || M(t, to) && t[to][e] || (n.enumerable = !0), n
                }
            }, bo = function (t) {
                for (var e, n = Kr(H(t)), r = [], o = 0; n.length > o;) M(oo, e = n[o++]) || e == to || e == Gr || r.push(e);
                return r
            }, _o = function (t) {
                for (var e, n = t === ao, r = Kr(n ? io : H(t)), o = [], i = 0; r.length > i;) !M(oo, e = r[i++]) || n && !M(ao, e) || o.push(oo[e]);
                return o
            };
        uo || (Jr = function () {
            if (this instanceof Jr) throw TypeError("Symbol is not a constructor!");
            var t = D(arguments.length > 0 ? arguments[0] : void 0), e = function (n) {
                this === ao && e.call(io, n), M(this, to) && M(this[to], t) && (this[to][t] = !1), fo(this, t, E(1, n))
            };
            return g && so && fo(ao, t, {configurable: !0, set: e}), lo(t)
        }, x(Jr.prototype, "toString", function () {
            return this._k
        }), dn.f = mo, T.f = po, qn.f = Vr.f = bo, hn.f = yo, zr.f = _o, g && x(ao, "propertyIsEnumerable", yo, !0), Rr.f = function (t) {
            return lo(ft(t))
        }), R(R.G + R.W + R.F * !uo, {Symbol: Jr});
        for (var ko = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), wo = 0; ko.length > wo;) ft(ko[wo++]);
        for (var So = nt(ft.store), To = 0; So.length > To;) !function (t) {
            var e = h.Symbol || (h.Symbol = l.Symbol || {});
            "_" == t.charAt(0) || t in e || Nr(e, t, {value: Rr.f(t)})
        }(So[To++]);
        R(R.S + R.F * !uo, "Symbol", {
            for: function (t) {
                return M(ro, t += "") ? ro[t] : ro[t] = Jr(t)
            }, keyFor: function (t) {
                if (!ho(t)) throw TypeError(t + " is not a symbol!");
                for (var e in ro) if (ro[e] === t) return e
            }, useSetter: function () {
                so = !0
            }, useSimple: function () {
                so = !1
            }
        }), R(R.S + R.F * !uo, "Object", {
            create: go,
            defineProperty: po,
            defineProperties: vo,
            getOwnPropertyDescriptor: mo,
            getOwnPropertyNames: bo,
            getOwnPropertySymbols: _o
        }), $r && R(R.S + R.F * (!uo || d(function () {
            var t = Jr();
            return "[null]" != Qr([t]) || "{}" != Qr({a: t}) || "{}" != Qr(Object(t))
        })), "JSON", {
            stringify: function (t) {
                if (void 0 !== t && !ho(t)) {
                    for (var e, n, r = [t], o = 1; arguments.length > o;) r.push(arguments[o++]);
                    return e = r[1], "function" == typeof e && (n = e), !n && Et(e) || (e = function (t, e) {
                        if (n && (e = n.call(this, t, e)), !ho(e)) return e
                    }), r[1] = e, Qr.apply($r, r)
                }
            }
        }), Jr.prototype[eo] || O(Jr.prototype, eo, Jr.prototype.valueOf), pt(Jr, "Symbol"), pt(Math, "Math", !0), pt(l.JSON, "JSON", !0), R(R.S, "Object", {create: st}), R(R.S + R.F * !g, "Object", {defineProperty: T.f}), R(R.S + R.F * !g, "Object", {defineProperties: rt});
        var Eo = function (t, e) {
            var n = (h.Object || {})[t] || Object[t], r = {};
            r[t] = e(n), R(R.S + R.F * d(function () {
                n(1)
            }), "Object", r)
        }, Oo = dn.f;
        Eo("getOwnPropertyDescriptor", function () {
            return function (t, e) {
                return Oo(H(t), e)
            }
        }), Eo("getPrototypeOf", function () {
            return function (t) {
                return bt(gt(t))
            }
        }), Eo("keys", function () {
            return function (t) {
                return nt(gt(t))
            }
        }), Eo("getOwnPropertyNames", function () {
            return Vr.f
        });
        var Po = rn.onFreeze;
        Eo("freeze", function (t) {
            return function (e) {
                return t && p(e) ? t(Po(e)) : e
            }
        });
        var Mo = rn.onFreeze;
        Eo("seal", function (t) {
            return function (e) {
                return t && p(e) ? t(Mo(e)) : e
            }
        });
        var Fo = rn.onFreeze;
        Eo("preventExtensions", function (t) {
            return function (e) {
                return t && p(e) ? t(Fo(e)) : e
            }
        }), Eo("isFrozen", function (t) {
            return function (e) {
                return !p(e) || !!t && t(e)
            }
        }), Eo("isSealed", function (t) {
            return function (e) {
                return !p(e) || !!t && t(e)
            }
        }), Eo("isExtensible", function (t) {
            return function (e) {
                return !!p(e) && (!t || t(e))
            }
        });
        var jo = Object.assign, Do = !jo || d(function () {
            var t = {}, e = {}, n = Symbol(), r = "abcdefghijklmnopqrst";
            return t[n] = 7, r.split("").forEach(function (t) {
                e[t] = t
            }), 7 != jo({}, t)[n] || Object.keys(jo({}, e)).join("") != r
        }) ? function (t, e) {
            for (var n = gt(t), r = arguments.length, o = 1, i = zr.f, a = hn.f; r > o;) for (var u, c = Z(arguments[o++]), s = i ? nt(c).concat(i(c)) : nt(c), f = s.length, l = 0; f > l;) a.call(c, u = s[l++]) && (n[u] = c[u]);
            return n
        } : jo;
        R(R.S + R.F, "Object", {assign: Do});
        var xo = Object.is || function (t, e) {
            return t === e ? 0 !== t || 1 / t == 1 / e : t != t && e != e
        };
        R(R.S, "Object", {is: xo}), R(R.S, "Object", {setPrototypeOf: yn.set}), R(R.G + R.F * (parseFloat != jr), {parseFloat: jr}), R(R.G + R.F * (parseInt != Ar), {parseInt: Ar});
        var Io = (l.Reflect || {}).apply, Ao = Function.apply;
        R(R.S + R.F * !d(function () {
            Io(function () {
            })
        }), "Reflect", {
            apply: function (t, e, n) {
                var r = I(t), o = v(n);
                return Io ? Io(r, e, o) : Ao.call(r, e, o)
            }
        });
        var Lo = (l.Reflect || {}).construct, Ro = d(function () {
            function t() {
            }

            return !(Lo(function () {
            }, [], t) instanceof t)
        }), No = !d(function () {
            Lo(function () {
            })
        });
        R(R.S + R.F * (Ro || No), "Reflect", {
            construct: function (t, e) {
                I(t), v(e);
                var n = arguments.length < 3 ? t : I(arguments[2]);
                if (No && !Ro) return Lo(t, e, n);
                if (t == n) {
                    switch (e.length) {
                        case 0:
                            return new t;
                        case 1:
                            return new t(e[0]);
                        case 2:
                            return new t(e[0], e[1]);
                        case 3:
                            return new t(e[0], e[1], e[2]);
                        case 4:
                            return new t(e[0], e[1], e[2], e[3])
                    }
                    var r = [null];
                    return r.push.apply(r, e), new (Re.apply(t, r))
                }
                var o = n.prototype, i = st(p(o) ? o : Object.prototype), a = Function.apply.call(t, i, e);
                return p(a) ? a : i
            }
        }), R(R.S + R.F * d(function () {
            Reflect.defineProperty(T.f({}, 1, {value: 1}), 1, {value: 2})
        }), "Reflect", {
            defineProperty: function (t, e, n) {
                v(t), e = k(e, !0), v(n);
                try {
                    return T.f(t, e, n), !0
                } catch (t) {
                    return !1
                }
            }
        });
        var Co = dn.f;
        R(R.S, "Reflect", {
            deleteProperty: function (t, e) {
                var n = Co(v(t), e);
                return !(n && !n.configurable) && delete t[e]
            }
        });
        var zo = function (t) {
            this._t = v(t), this._i = 0;
            var e, n = this._k = [];
            for (e in t) n.push(e)
        };
        dt(zo, "Object", function () {
            var t, e = this, n = e._k;
            do {
                if (e._i >= n.length) return {value: void 0, done: !0}
            } while (!((t = n[e._i++]) in e._t));
            return {value: t, done: !1}
        }), R(R.S, "Reflect", {
            enumerate: function (t) {
                return new zo(t)
            }
        }), R(R.S, "Reflect", {get: r}), R(R.S, "Reflect", {
            getOwnPropertyDescriptor: function (t, e) {
                return dn.f(v(t), e)
            }
        }), R(R.S, "Reflect", {
            getPrototypeOf: function (t) {
                return bt(v(t))
            }
        }), R(R.S, "Reflect", {
            has: function (t, e) {
                return e in t
            }
        });
        var Zo = Object.isExtensible;
        R(R.S, "Reflect", {
            isExtensible: function (t) {
                return v(t), !Zo || Zo(t)
            }
        });
        var Ho = l.Reflect, Wo = Ho && Ho.ownKeys || function (t) {
            var e = qn.f(v(t)), n = zr.f;
            return n ? e.concat(n(t)) : e
        };
        R(R.S, "Reflect", {ownKeys: Wo});
        var Bo = Object.preventExtensions;
        R(R.S, "Reflect", {
            preventExtensions: function (t) {
                v(t);
                try {
                    return Bo && Bo(t), !0
                } catch (t) {
                    return !1
                }
            }
        }), R(R.S, "Reflect", {set: o}), yn && R(R.S, "Reflect", {
            setPrototypeOf: function (t, e) {
                yn.check(t, e);
                try {
                    return yn.set(t, e), !0
                } catch (t) {
                    return !1
                }
            }
        });
        var qo = ft("match"), Uo = function (t) {
            var e;
            return p(t) && (void 0 !== (e = t[qo]) ? !!e : "RegExp" == z(t))
        }, Vo = function () {
            var t = v(this), e = "";
            return t.global && (e += "g"), t.ignoreCase && (e += "i"), t.multiline && (e += "m"), t.unicode && (e += "u"), t.sticky && (e += "y"), e
        }, Go = T.f, Xo = qn.f, Yo = l.RegExp, Ko = Yo, Jo = Yo.prototype, $o = /a/g, Qo = /a/g, ti = new Yo($o) !== $o;
        if (g && (!ti || d(function () {
            return Qo[ft("match")] = !1, Yo($o) != $o || Yo(Qo) == Qo || "/a/i" != Yo($o, "i")
        }))) {
            Yo = function (t, e) {
                var n = this instanceof Yo, r = Uo(t), o = void 0 === e;
                return !n && r && t.constructor === Yo && o ? t : bn(ti ? new Ko(r && !o ? t.source : t, e) : Ko((r = t instanceof Yo) ? t.source : t, r && o ? Vo.call(t) : e), n ? this : Jo, Yo)
            };
            for (var ei = Xo(Ko), ni = 0; ei.length > ni;) !function (t) {
                t in Yo || Go(Yo, t, {
                    configurable: !0, get: function () {
                        return Ko[t]
                    }, set: function (e) {
                        Ko[t] = e
                    }
                })
            }(ei[ni++]);
            Jo.constructor = Yo, Yo.prototype = Jo, x(l, "RegExp", Yo)
        }
        me("RegExp"), g && "g" != /./g.flags && T.f(RegExp.prototype, "flags", {configurable: !0, get: Vo});
        var ri = /./.toString, oi = function (t) {
            x(RegExp.prototype, "toString", t, !0)
        };
        d(function () {
            return "/a/b" != ri.call({source: "a", flags: "b"})
        }) ? oi(function () {
            var t = v(this);
            return "/".concat(t.source, "/", "flags" in t ? t.flags : !g && t instanceof RegExp ? Vo.call(t) : void 0)
        }) : "toString" != ri.name && oi(function () {
            return ri.call(this)
        });
        var ii = function (t, e, n) {
            var r = ft(t), o = n(c, r, ""[t]), i = o[0], a = o[1];
            d(function () {
                var e = {};
                return e[r] = function () {
                    return 7
                }, 7 != ""[t](e)
            }) && (x(String.prototype, t, i), O(RegExp.prototype, r, 2 == e ? function (t, e) {
                return a.call(t, this, e)
            } : function (t) {
                return a.call(t, this)
            }))
        };
        ii("match", 1, function (t, e, n) {
            return [function (n) {
                var r = t(this), o = void 0 == n ? void 0 : n[e];
                return void 0 !== o ? o.call(n, r) : new RegExp(n)[e](String(r))
            }, n]
        }), ii("replace", 2, function (t, e, n) {
            return [function (r, o) {
                var i = t(this), a = void 0 == r ? void 0 : r[e];
                return void 0 !== a ? a.call(r, i, o) : n.call(String(i), r, o)
            }, n]
        }), ii("search", 1, function (t, e, n) {
            return [function (n) {
                var r = t(this), o = void 0 == n ? void 0 : n[e];
                return void 0 !== o ? o.call(n, r) : new RegExp(n)[e](String(r))
            }, n]
        }), ii("split", 2, function (t, e, n) {
            var r = Uo, o = n, i = [].push, a = "length";
            if ("c" == "abbc".split(/(b)*!/)[1] || 4 != "test".split(/(?:)/, -1)[a] || 2 != "ab".split(/(?:ab)*!/)[a] || 4 != ".".split(/(.?)(.?)/)[a] || ".".split(/()()/)[a] > 1 || "".split(/.?/)[a]) {
                var u = void 0 === /()??/.exec("")[1];
                n = function (t, e) {
                    var n = String(this);
                    if (void 0 === t && 0 === e) return [];
                    if (!r(t)) return o.call(n, t, e);
                    var c, s, f, l, h, p = [],
                        v = (t.ignoreCase ? "i" : "") + (t.multiline ? "m" : "") + (t.unicode ? "u" : "") + (t.sticky ? "y" : ""),
                        d = 0, g = void 0 === e ? 4294967295 : e >>> 0, y = new RegExp(t.source, v + "g");
                    for (u || (c = new RegExp("^" + y.source + "$(?!\\s)", v)); (s = y.exec(n)) && !((f = s.index + s[0][a]) > d && (p.push(n.slice(d, s.index)), !u && s[a] > 1 && s[0].replace(c, function () {
                        for (h = 1; h < arguments[a] - 2; h++) void 0 === arguments[h] && (s[h] = void 0)
                    }), s[a] > 1 && s.index < n[a] && i.apply(p, s.slice(1)), l = s[0][a], d = f, p[a] >= g));) y.lastIndex === s.index && y.lastIndex++;
                    return d === n[a] ? !l && y.test("") || p.push("") : p.push(n.slice(d)), p[a] > g ? p.slice(0, g) : p
                }
            } else "0".split(void 0, 0)[a] && (n = function (t, e) {
                return void 0 === t && 0 === e ? [] : o.call(this, t, e)
            });
            return [function (r, o) {
                var i = t(this), a = void 0 == r ? void 0 : r[e];
                return void 0 !== a ? a.call(r, i, o) : n.call(String(i), r, o)
            }, n]
        });
        var ai = _n("Set", function (t) {
            return function () {
                return t(this, arguments.length > 0 ? arguments[0] : void 0)
            }
        }, {
            add: function (t) {
                return fn.def(on(this, "Set"), t = 0 === t ? 0 : t, t)
            }
        }, fn), ui = String.fromCharCode, ci = String.fromCodePoint;
        R(R.S + R.F * (!!ci && 1 != ci.length), "String", {
            fromCodePoint: function (t) {
                for (var e, n = [], r = arguments.length, o = 0; r > o;) {
                    if (e = +arguments[o++], V(e, 1114111) !== e) throw RangeError(e + " is not a valid code point");
                    n.push(e < 65536 ? ui(e) : ui(55296 + ((e -= 65536) >> 10), e % 1024 + 56320))
                }
                return n.join("")
            }
        }), R(R.S, "String", {
            raw: function (t) {
                for (var e = H(t.raw), n = B(e.length), r = arguments.length, o = [], i = 0; n > i;) o.push(String(e[i++])), i < r && o.push(String(arguments[i]));
                return o.join("")
            }
        }), $n("trim", function (t) {
            return function () {
                return t(this, 3)
            }
        });
        var si = s(!1);
        R(R.P, "String", {
            codePointAt: function (t) {
                return si(this, t)
            }
        });
        var fi = function (t, e, n) {
            if (Uo(e)) throw TypeError("String#" + n + " doesn't accept regex!");
            return String(c(t))
        }, li = ft("match"), hi = function (t) {
            var e = /./;
            try {
                "/./"[t](e)
            } catch (n) {
                try {
                    return e[li] = !1, !"/./"[t](e)
                } catch (t) {
                }
            }
            return !0
        }, pi = "".endsWith;
        R(R.P + R.F * hi("endsWith"), "String", {
            endsWith: function (t) {
                var e = fi(this, t, "endsWith"), n = arguments.length > 1 ? arguments[1] : void 0, r = B(e.length),
                    o = void 0 === n ? r : Math.min(B(n), r), i = String(t);
                return pi ? pi.call(e, i, o) : e.slice(o - i.length, o) === i
            }
        });
        R(R.P + R.F * hi("includes"), "String", {
            includes: function (t) {
                return !!~fi(this, t, "includes").indexOf(t, arguments.length > 1 ? arguments[1] : void 0)
            }
        }), R(R.P, "String", {repeat: pr});
        var vi = "".startsWith;
        R(R.P + R.F * hi("startsWith"), "String", {
            startsWith: function (t) {
                var e = fi(this, t, "startsWith"),
                    n = B(Math.min(arguments.length > 1 ? arguments[1] : void 0, e.length)), r = String(t);
                return vi ? vi.call(e, r, n) : e.slice(n, n + r.length) === r
            }
        });
        var di = /"/g, gi = function (t, e, n, r) {
            var o = String(c(t)), i = "<" + e;
            return "" !== n && (i += " " + n + '="' + String(r).replace(di, "&quot;") + '"'), i + ">" + o + "</" + e + ">"
        }, yi = function (t, e) {
            var n = {};
            n[t] = e(gi), R(R.P + R.F * d(function () {
                var e = ""[t]('"');
                return e !== e.toLowerCase() || e.split('"').length > 3
            }), "String", n)
        };
        yi("anchor", function (t) {
            return function (e) {
                return t(this, "a", "name", e)
            }
        }), yi("big", function (t) {
            return function () {
                return t(this, "big", "", "")
            }
        }), yi("blink", function (t) {
            return function () {
                return t(this, "blink", "", "")
            }
        }), yi("bold", function (t) {
            return function () {
                return t(this, "b", "", "")
            }
        }), yi("fixed", function (t) {
            return function () {
                return t(this, "tt", "", "")
            }
        }), yi("fontcolor", function (t) {
            return function (e) {
                return t(this, "font", "color", e)
            }
        }), yi("fontsize", function (t) {
            return function (e) {
                return t(this, "font", "size", e)
            }
        }), yi("italics", function (t) {
            return function () {
                return t(this, "i", "", "")
            }
        }), yi("link", function (t) {
            return function (e) {
                return t(this, "a", "href", e)
            }
        }), yi("small", function (t) {
            return function () {
                return t(this, "small", "", "")
            }
        }), yi("strike", function (t) {
            return function () {
                return t(this, "strike", "", "")
            }
        }), yi("sub", function (t) {
            return function () {
                return t(this, "sub", "", "")
            }
        }), yi("sup", function (t) {
            return function () {
                return t(this, "sup", "", "")
            }
        });
        for (var mi, bi = D("typed_array"), _i = D("view"), ki = !(!l.ArrayBuffer || !l.DataView), wi = ki, Si = 0, Ti = "Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array".split(","); Si < 9;) (mi = l[Ti[Si++]]) ? (O(mi.prototype, bi, !0), O(mi.prototype, _i, !0)) : wi = !1;
        var Ei = {ABV: ki, CONSTR: wi, TYPED: bi, VIEW: _i}, Oi = function (t) {
                if (void 0 === t) return 0;
                var e = u(t), n = B(e);
                if (e !== n) throw RangeError("Wrong length!");
                return n
            }, Pi = e(function (t, e) {
                function n(t, e, n) {
                    var r, o, i, a = Array(n), u = 8 * n - e - 1, c = (1 << u) - 1, s = c >> 1,
                        f = 23 === e ? j(2, -24) - j(2, -77) : 0, l = 0, h = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
                    for (t = F(t), t != t || t === P ? (o = t != t ? 1 : 0, r = c) : (r = D(x(t) / I), t * (i = j(2, -r)) < 1 && (r--, i *= 2), t += r + s >= 1 ? f / i : f * j(2, 1 - s), t * i >= 2 && (r++, i /= 2), r + s >= c ? (o = 0, r = c) : r + s >= 1 ? (o = (t * i - 1) * j(2, e), r += s) : (o = t * j(2, s - 1) * j(2, e), r = 0)); e >= 8; a[l++] = 255 & o, o /= 256, e -= 8) ;
                    for (r = r << e | o, u += e; u > 0; a[l++] = 255 & r, r /= 256, u -= 8) ;
                    return a[--l] |= 128 * h, a
                }

                function r(t, e, n) {
                    var r, o = 8 * n - e - 1, i = (1 << o) - 1, a = i >> 1, u = o - 7, c = n - 1, s = t[c--], f = 127 & s;
                    for (s >>= 7; u > 0; f = 256 * f + t[c], c--, u -= 8) ;
                    for (r = f & (1 << -u) - 1, f >>= -u, u += e; u > 0; r = 256 * r + t[c], c--, u -= 8) ;
                    if (0 === f) f = 1 - a; else {
                        if (f === i) return r ? NaN : s ? -P : P;
                        r += j(2, e), f -= a
                    }
                    return (s ? -1 : 1) * r * j(2, f - e)
                }

                function o(t) {
                    return t[3] << 24 | t[2] << 16 | t[1] << 8 | t[0]
                }

                function i(t) {
                    return [255 & t]
                }

                function a(t) {
                    return [255 & t, t >> 8 & 255]
                }

                function c(t) {
                    return [255 & t, t >> 8 & 255, t >> 16 & 255, t >> 24 & 255]
                }

                function s(t) {
                    return n(t, 52, 8)
                }

                function f(t) {
                    return n(t, 23, 4)
                }

                function h(t, e, n) {
                    m(t[b], e, {
                        get: function () {
                            return this[n]
                        }
                    })
                }

                function p(t, e, n, r) {
                    var o = +n, i = Oi(o);
                    if (i + e > t[L]) throw E(_);
                    var a = t[A]._b, u = i + t[R], c = a.slice(u, u + e);
                    return r ? c : c.reverse()
                }

                function v(t, e, n, r, o, i) {
                    var a = +n, u = Oi(a);
                    if (u + e > t[L]) throw E(_);
                    for (var c = t[A]._b, s = u + t[R], f = r(+o), l = 0; l < e; l++) c[s + l] = f[i ? l : e - l - 1]
                }

                var y = qn.f, m = T.f, b = "prototype", _ = "Wrong index!", k = l.ArrayBuffer, w = l.DataView, S = l.Math,
                    E = l.RangeError, P = l.Infinity, M = k, F = S.abs, j = S.pow, D = S.floor, x = S.log, I = S.LN2,
                    A = g ? "_b" : "buffer", L = g ? "_l" : "byteLength", R = g ? "_o" : "byteOffset";
                if (Ei.ABV) {
                    if (!d(function () {
                        k(1)
                    }) || !d(function () {
                        new k(-1)
                    }) || d(function () {
                        return new k, new k(1.5), new k(NaN), "ArrayBuffer" != k.name
                    })) {
                        k = function (t) {
                            return en(this, k), new M(Oi(t))
                        };
                        for (var N, C = k[b] = M[b], z = y(M), Z = 0; z.length > Z;) (N = z[Z++]) in k || O(k, N, M[N]);
                        C.constructor = k
                    }
                    var H = new w(new k(2)), W = w[b].setInt8;
                    H.setInt8(0, 2147483648), H.setInt8(1, 2147483649), !H.getInt8(0) && H.getInt8(1) || tn(w[b], {
                        setInt8: function (t, e) {
                            W.call(this, t, e << 24 >> 24)
                        }, setUint8: function (t, e) {
                            W.call(this, t, e << 24 >> 24)
                        }
                    }, !0)
                } else k = function (t) {
                    en(this, k, "ArrayBuffer");
                    var e = Oi(t);
                    this._b = he.call(Array(e), 0), this[L] = e
                }, w = function (t, e, n) {
                    en(this, w, "DataView"), en(t, k, "DataView");
                    var r = t[L], o = u(e);
                    if (o < 0 || o > r) throw E("Wrong offset!");
                    if (n = void 0 === n ? r - o : B(n), o + n > r) throw E("Wrong length!");
                    this[A] = t, this[R] = o, this[L] = n
                }, g && (h(k, "byteLength", "_l"), h(w, "buffer", "_b"), h(w, "byteLength", "_l"), h(w, "byteOffset", "_o")), tn(w[b], {
                    getInt8: function (t) {
                        return p(this, 1, t)[0] << 24 >> 24
                    }, getUint8: function (t) {
                        return p(this, 1, t)[0]
                    }, getInt16: function (t) {
                        var e = p(this, 2, t, arguments[1]);
                        return (e[1] << 8 | e[0]) << 16 >> 16
                    }, getUint16: function (t) {
                        var e = p(this, 2, t, arguments[1]);
                        return e[1] << 8 | e[0]
                    }, getInt32: function (t) {
                        return o(p(this, 4, t, arguments[1]))
                    }, getUint32: function (t) {
                        return o(p(this, 4, t, arguments[1])) >>> 0
                    }, getFloat32: function (t) {
                        return r(p(this, 4, t, arguments[1]), 23, 4)
                    }, getFloat64: function (t) {
                        return r(p(this, 8, t, arguments[1]), 52, 8)
                    }, setInt8: function (t, e) {
                        v(this, 1, t, i, e)
                    }, setUint8: function (t, e) {
                        v(this, 1, t, i, e)
                    }, setInt16: function (t, e) {
                        v(this, 2, t, a, e, arguments[2])
                    }, setUint16: function (t, e) {
                        v(this, 2, t, a, e, arguments[2])
                    }, setInt32: function (t, e) {
                        v(this, 4, t, c, e, arguments[2])
                    }, setUint32: function (t, e) {
                        v(this, 4, t, c, e, arguments[2])
                    }, setFloat32: function (t, e) {
                        v(this, 4, t, f, e, arguments[2])
                    }, setFloat64: function (t, e) {
                        v(this, 8, t, s, e, arguments[2])
                    }
                });
                pt(k, "ArrayBuffer"), pt(w, "DataView"), O(w[b], Ei.VIEW, !0), e.ArrayBuffer = k, e.DataView = w
            }), Mi = ft("species"), Fi = function (t, e) {
                var n, r = v(t).constructor;
                return void 0 === r || void 0 == (n = v(r)[Mi]) ? e : I(n)
            }, ji = l.ArrayBuffer, Di = Pi.ArrayBuffer, xi = Pi.DataView, Ii = Ei.ABV && ji.isView, Ai = Di.prototype.slice,
            Li = Ei.VIEW;
        R(R.G + R.W + R.F * (ji !== Di), {ArrayBuffer: Di}), R(R.S + R.F * !Ei.CONSTR, "ArrayBuffer", {
            isView: function (t) {
                return Ii && Ii(t) || p(t) && Li in t
            }
        }), R(R.P + R.U + R.F * d(function () {
            return !new Di(2).slice(1, void 0).byteLength
        }), "ArrayBuffer", {
            slice: function (t, e) {
                if (void 0 !== Ai && void 0 === e) return Ai.call(v(this), t);
                for (var n = v(this).byteLength, r = V(t, n), o = V(void 0 === e ? n : e, n), i = new (Fi(this, Di))(B(o - r)), a = new xi(this), u = new xi(i), c = 0; r < o;) u.setUint8(c++, a.getUint8(r++));
                return i
            }
        }), me("ArrayBuffer"), R(R.G + R.W + R.F * !Ei.ABV, {DataView: Pi.DataView});
        var Ri = e(function (t) {
            if (g) {
                var e = l, n = d, r = R, o = Ei, i = Pi, a = A, c = en, s = E, f = O, h = tn, v = u, y = B, m = Oi,
                    b = V, _ = k, w = M, S = At, P = p, F = gt, j = Ft, x = st, I = bt, L = qn.f, C = Rt, z = D, Z = ft,
                    H = Yt, W = G, q = Fi, U = _e, X = N, Y = Zt, K = me, J = he, $ = ce, Q = T, tt = dn, et = Q.f,
                    nt = tt.f, rt = e.RangeError, ot = e.TypeError, it = e.Uint8Array, at = Array.prototype,
                    ut = i.ArrayBuffer, ct = i.DataView, lt = H(0), ht = H(2), pt = H(3), vt = H(4), dt = H(5),
                    yt = H(6), mt = W(!0), _t = W(!1), kt = U.values, wt = U.keys, St = U.entries, Tt = at.lastIndexOf,
                    Et = at.reduce, Ot = at.reduceRight, Pt = at.join, Mt = at.sort, jt = at.slice, Dt = at.toString,
                    xt = at.toLocaleString, It = Z("iterator"), Lt = Z("toStringTag"), Nt = z("typed_constructor"),
                    Ct = z("def_constructor"), zt = o.CONSTR, Ht = o.TYPED, Wt = o.VIEW, Bt = H(1, function (t, e) {
                        return Xt(q(t, t[Ct]), e)
                    }), qt = n(function () {
                        return 1 === new it(new Uint16Array([1]).buffer)[0]
                    }), Ut = !!it && !!it.prototype.set && n(function () {
                        new it(1).set({})
                    }), Vt = function (t, e) {
                        var n = v(t);
                        if (n < 0 || n % e) throw rt("Wrong offset!");
                        return n
                    }, Gt = function (t) {
                        if (P(t) && Ht in t) return t;
                        throw ot(t + " is not a typed array!")
                    }, Xt = function (t, e) {
                        if (!(P(t) && Nt in t)) throw ot("It is not a typed array constructor!");
                        return new t(e)
                    }, Kt = function (t, e) {
                        return Jt(q(t, t[Ct]), e)
                    }, Jt = function (t, e) {
                        for (var n = 0, r = e.length, o = Xt(t, r); r > n;) o[n] = e[n++];
                        return o
                    }, $t = function (t, e, n) {
                        et(t, e, {
                            get: function () {
                                return this._d[n]
                            }
                        })
                    }, Qt = function (t) {
                        var e, n, r, o, i, u, c = F(t), s = arguments.length, f = s > 1 ? arguments[1] : void 0,
                            l = void 0 !== f, h = C(c);
                        if (void 0 != h && !j(h)) {
                            for (u = h.call(c), r = [], e = 0; !(i = u.next()).done; e++) r.push(i.value);
                            c = r
                        }
                        for (l && s > 2 && (f = a(f, arguments[2], 2)), e = 0, n = y(c.length), o = Xt(this, n); n > e; e++) o[e] = l ? f(c[e], e) : c[e];
                        return o
                    }, te = function () {
                        for (var t = 0, e = arguments.length, n = Xt(this, e); e > t;) n[t] = arguments[t++];
                        return n
                    }, ee = !!it && n(function () {
                        xt.call(new it(1))
                    }), ne = function () {
                        return xt.apply(ee ? jt.call(Gt(this)) : Gt(this), arguments)
                    }, re = {
                        copyWithin: function (t, e) {
                            return $.call(Gt(this), t, e, arguments.length > 2 ? arguments[2] : void 0)
                        }, every: function (t) {
                            return vt(Gt(this), t, arguments.length > 1 ? arguments[1] : void 0)
                        }, fill: function (t) {
                            return J.apply(Gt(this), arguments)
                        }, filter: function (t) {
                            return Kt(this, ht(Gt(this), t, arguments.length > 1 ? arguments[1] : void 0))
                        }, find: function (t) {
                            return dt(Gt(this), t, arguments.length > 1 ? arguments[1] : void 0)
                        }, findIndex: function (t) {
                            return yt(Gt(this), t, arguments.length > 1 ? arguments[1] : void 0)
                        }, forEach: function (t) {
                            lt(Gt(this), t, arguments.length > 1 ? arguments[1] : void 0)
                        }, indexOf: function (t) {
                            return _t(Gt(this), t, arguments.length > 1 ? arguments[1] : void 0)
                        }, includes: function (t) {
                            return mt(Gt(this), t, arguments.length > 1 ? arguments[1] : void 0)
                        }, join: function (t) {
                            return Pt.apply(Gt(this), arguments)
                        }, lastIndexOf: function (t) {
                            return Tt.apply(Gt(this), arguments)
                        }, map: function (t) {
                            return Bt(Gt(this), t, arguments.length > 1 ? arguments[1] : void 0)
                        }, reduce: function (t) {
                            return Et.apply(Gt(this), arguments)
                        }, reduceRight: function (t) {
                            return Ot.apply(Gt(this), arguments)
                        }, reverse: function () {
                            for (var t, e = this, n = Gt(e).length, r = Math.floor(n / 2), o = 0; o < r;) t = e[o], e[o++] = e[--n], e[n] = t;
                            return e
                        }, some: function (t) {
                            return pt(Gt(this), t, arguments.length > 1 ? arguments[1] : void 0)
                        }, sort: function (t) {
                            return Mt.call(Gt(this), t)
                        }, subarray: function (t, e) {
                            var n = Gt(this), r = n.length, o = b(t, r);
                            return new (q(n, n[Ct]))(n.buffer, n.byteOffset + o * n.BYTES_PER_ELEMENT, y((void 0 === e ? r : b(e, r)) - o))
                        }
                    }, oe = function (t, e) {
                        return Kt(this, jt.call(Gt(this), t, e))
                    }, ie = function (t) {
                        Gt(this);
                        var e = Vt(arguments[1], 1), n = this.length, r = F(t), o = y(r.length), i = 0;
                        if (o + e > n) throw rt("Wrong length!");
                        for (; i < o;) this[e + i] = r[i++]
                    }, ae = {
                        entries: function () {
                            return St.call(Gt(this))
                        }, keys: function () {
                            return wt.call(Gt(this))
                        }, values: function () {
                            return kt.call(Gt(this))
                        }
                    }, ue = function (t, e) {
                        return P(t) && t[Ht] && "symbol" != typeof e && e in t && String(+e) == String(e)
                    }, se = function (t, e) {
                        return ue(t, e = _(e, !0)) ? s(2, t[e]) : nt(t, e)
                    }, fe = function (t, e, n) {
                        return !(ue(t, e = _(e, !0)) && P(n) && w(n, "value")) || w(n, "get") || w(n, "set") || n.configurable || w(n, "writable") && !n.writable || w(n, "enumerable") && !n.enumerable ? et(t, e, n) : (t[e] = n.value, t)
                    };
                zt || (tt.f = se, Q.f = fe), r(r.S + r.F * !zt, "Object", {
                    getOwnPropertyDescriptor: se,
                    defineProperty: fe
                }), n(function () {
                    Dt.call({})
                }) && (Dt = xt = function () {
                    return Pt.call(this)
                });
                var le = h({}, re);
                h(le, ae), f(le, It, ae.values), h(le, {
                    slice: oe, set: ie, constructor: function () {
                    }, toString: Dt, toLocaleString: ne
                }), $t(le, "buffer", "b"), $t(le, "byteOffset", "o"), $t(le, "byteLength", "l"), $t(le, "length", "e"), et(le, Lt, {
                    get: function () {
                        return this[Ht]
                    }
                }), t.exports = function (t, i, a, u) {
                    u = !!u;
                    var s = t + (u ? "Clamped" : "") + "Array", l = "get" + t, h = "set" + t, p = e[s], v = p || {},
                        d = p && I(p), g = !p || !o.ABV, b = {}, _ = p && p.prototype, k = function (t, e) {
                            var n = t._d;
                            return n.v[l](e * i + n.o, qt)
                        }, w = function (t, e, n) {
                            var r = t._d;
                            u && (n = (n = Math.round(n)) < 0 ? 0 : n > 255 ? 255 : 255 & n), r.v[h](e * i + r.o, n, qt)
                        }, T = function (t, e) {
                            et(t, e, {
                                get: function () {
                                    return k(this, e)
                                }, set: function (t) {
                                    return w(this, e, t)
                                }, enumerable: !0
                            })
                        };
                    g ? (p = a(function (t, e, n, r) {
                        c(t, p, s, "_d");
                        var o, a, u, l, h = 0, v = 0;
                        if (P(e)) {
                            if (!(e instanceof ut || "ArrayBuffer" == (l = S(e)) || "SharedArrayBuffer" == l)) return Ht in e ? Jt(p, e) : Qt.call(p, e);
                            o = e, v = Vt(n, i);
                            var d = e.byteLength;
                            if (void 0 === r) {
                                if (d % i) throw rt("Wrong length!");
                                if ((a = d - v) < 0) throw rt("Wrong length!")
                            } else if ((a = y(r) * i) + v > d) throw rt("Wrong length!");
                            u = a / i
                        } else u = m(e), a = u * i, o = new ut(a);
                        for (f(t, "_d", {b: o, o: v, l: a, e: u, v: new ct(o)}); h < u;) T(t, h++)
                    }), _ = p.prototype = x(le), f(_, "constructor", p)) : n(function () {
                        p(1)
                    }) && n(function () {
                        new p(-1)
                    }) && Y(function (t) {
                        new p, new p(null), new p(1.5), new p(t)
                    }, !0) || (p = a(function (t, e, n, r) {
                        c(t, p, s);
                        var o;
                        return P(e) ? e instanceof ut || "ArrayBuffer" == (o = S(e)) || "SharedArrayBuffer" == o ? void 0 !== r ? new v(e, Vt(n, i), r) : void 0 !== n ? new v(e, Vt(n, i)) : new v(e) : Ht in e ? Jt(p, e) : Qt.call(p, e) : new v(m(e))
                    }), lt(d !== Function.prototype ? L(v).concat(L(d)) : L(v), function (t) {
                        t in p || f(p, t, v[t])
                    }), p.prototype = _, _.constructor = p);
                    var E = _[It], O = !!E && ("values" == E.name || void 0 == E.name), M = ae.values;
                    f(p, Nt, !0), f(_, Ht, s), f(_, Wt, !0), f(_, Ct, p), (u ? new p(1)[Lt] == s : Lt in _) || et(_, Lt, {
                        get: function () {
                            return s
                        }
                    }), b[s] = p, r(r.G + r.W + r.F * (p != v), b), r(r.S, s, {BYTES_PER_ELEMENT: i}), r(r.S + r.F * n(function () {
                        v.of.call(p, 1)
                    }), s, {
                        from: Qt,
                        of: te
                    }), "BYTES_PER_ELEMENT" in _ || f(_, "BYTES_PER_ELEMENT", i), r(r.P, s, re), K(s), r(r.P + r.F * Ut, s, {set: ie}), r(r.P + r.F * !O, s, ae), _.toString != Dt && (_.toString = Dt), r(r.P + r.F * n(function () {
                        new p(1).slice()
                    }), s, {slice: oe}), r(r.P + r.F * (n(function () {
                        return [1, 2].toLocaleString() != new p([1, 2]).toLocaleString()
                    }) || !n(function () {
                        _.toLocaleString.call([1, 2])
                    })), s, {toLocaleString: ne}), X[s] = O ? E : M, O || f(_, It, M)
                }
            } else t.exports = function () {
            }
        });
        Ri("Int8", 1, function (t) {
            return function (e, n, r) {
                return t(this, e, n, r)
            }
        }), Ri("Uint8", 1, function (t) {
            return function (e, n, r) {
                return t(this, e, n, r)
            }
        }), Ri("Uint8", 1, function (t) {
            return function (e, n, r) {
                return t(this, e, n, r)
            }
        }, !0), Ri("Int16", 2, function (t) {
            return function (e, n, r) {
                return t(this, e, n, r)
            }
        }), Ri("Uint16", 2, function (t) {
            return function (e, n, r) {
                return t(this, e, n, r)
            }
        }), Ri("Int32", 4, function (t) {
            return function (e, n, r) {
                return t(this, e, n, r)
            }
        }), Ri("Uint32", 4, function (t) {
            return function (e, n, r) {
                return t(this, e, n, r)
            }
        }), Ri("Float32", 4, function (t) {
            return function (e, n, r) {
                return t(this, e, n, r)
            }
        }), Ri("Float64", 8, function (t) {
            return function (e, n, r) {
                return t(this, e, n, r)
            }
        });
        var Ni = rn.getWeak, Ci = Yt(5), zi = Yt(6), Zi = 0, Hi = function (t) {
            return t._l || (t._l = new Wi)
        }, Wi = function () {
            this.a = []
        }, Bi = function (t, e) {
            return Ci(t.a, function (t) {
                return t[0] === e
            })
        };
        Wi.prototype = {
            get: function (t) {
                var e = Bi(this, t);
                if (e) return e[1]
            }, has: function (t) {
                return !!Bi(this, t)
            }, set: function (t, e) {
                var n = Bi(this, t);
                n ? n[1] = e : this.a.push([t, e])
            }, delete: function (t) {
                var e = zi(this.a, function (e) {
                    return e[0] === t
                });
                return ~e && this.a.splice(e, 1), !!~e
            }
        };
        var qi = {
            getConstructor: function (t, e, n, r) {
                var o = t(function (t, i) {
                    en(t, o, e, "_i"), t._t = e, t._i = Zi++, t._l = void 0, void 0 != i && nn(i, n, t[r], t)
                });
                return tn(o.prototype, {
                    delete: function (t) {
                        if (!p(t)) return !1;
                        var n = Ni(t);
                        return !0 === n ? Hi(on(this, e)).delete(t) : n && M(n, this._i) && delete n[this._i]
                    }, has: function (t) {
                        if (!p(t)) return !1;
                        var n = Ni(t);
                        return !0 === n ? Hi(on(this, e)).has(t) : n && M(n, this._i)
                    }
                }), o
            }, def: function (t, e, n) {
                var r = Ni(v(e), !0);
                return !0 === r ? Hi(t).set(e, n) : r[t._i] = n, t
            }, ufstore: Hi
        }, Ui = e(function (t) {
            var e, n = Yt(0), r = rn.getWeak, o = Object.isExtensible, i = qi.ufstore, a = {}, u = function (t) {
                return function () {
                    return t(this, arguments.length > 0 ? arguments[0] : void 0)
                }
            }, c = {
                get: function (t) {
                    if (p(t)) {
                        var e = r(t);
                        return !0 === e ? i(on(this, "WeakMap")).get(t) : e ? e[this._i] : void 0
                    }
                }, set: function (t, e) {
                    return qi.def(on(this, "WeakMap"), t, e)
                }
            }, s = t.exports = _n("WeakMap", u, c, qi, !0, !0);
            d(function () {
                return 7 != (new s).set((Object.freeze || Object)(a), 7).get(a)
            }) && (e = qi.getConstructor(u, "WeakMap"), Do(e.prototype, c), rn.NEED = !0, n(["delete", "has", "get", "set"], function (t) {
                var n = s.prototype, r = n[t];
                x(n, t, function (n, i) {
                    if (p(n) && !o(n)) {
                        this._f || (this._f = new e);
                        var a = this._f[t](n, i);
                        return "set" == t ? this : a
                    }
                    return r.call(this, n, i)
                })
            }))
        });
        _n("WeakSet", function (t) {
            return function () {
                return t(this, arguments.length > 0 ? arguments[0] : void 0)
            }
        }, {
            add: function (t) {
                return qi.def(on(this, "WeakSet"), t, !0)
            }
        }, qi, !1, !0);
        var Vi = Y("metadata"), Gi = Vi.store || (Vi.store = new Ui), Xi = function (t, e, n) {
            var r = Gi.get(t);
            if (!r) {
                if (!n) return;
                Gi.set(t, r = new kn)
            }
            var o = r.get(e);
            if (!o) {
                if (!n) return;
                r.set(e, o = new kn)
            }
            return o
        }, Yi = function (t, e, n) {
            var r = Xi(e, n, !1);
            return void 0 !== r && r.has(t)
        }, Ki = function (t, e, n) {
            var r = Xi(e, n, !1);
            return void 0 === r ? void 0 : r.get(t)
        }, Ji = function (t, e, n, r) {
            Xi(n, r, !0).set(t, e)
        }, $i = function (t, e) {
            var n = Xi(t, e, !1), r = [];
            return n && n.forEach(function (t, e) {
                r.push(e)
            }), r
        }, Qi = function (t) {
            return void 0 === t || "symbol" == typeof t ? t : String(t)
        }, ta = function (t) {
            R(R.S, "Reflect", t)
        }, ea = {store: Gi, map: Xi, has: Yi, get: Ki, set: Ji, keys: $i, key: Qi, exp: ta}, na = ea.key, ra = ea.set;
        ea.exp({
            defineMetadata: function (t, e, n, r) {
                ra(t, e, v(n), na(r))
            }
        });
        var oa = ea.key, ia = ea.map, aa = ea.store;
        ea.exp({
            deleteMetadata: function (t, e) {
                var n = arguments.length < 3 ? void 0 : oa(arguments[2]), r = ia(v(e), n, !1);
                if (void 0 === r || !r.delete(t)) return !1;
                if (r.size) return !0;
                var o = aa.get(e);
                return o.delete(n), !!o.size || aa.delete(e)
            }
        });
        var ua = ea.has, ca = ea.get, sa = ea.key, fa = function (t, e, n) {
            if (ua(t, e, n)) return ca(t, e, n);
            var r = bt(e);
            return null !== r ? fa(t, r, n) : void 0
        };
        ea.exp({
            getMetadata: function (t, e) {
                return fa(t, v(e), arguments.length < 3 ? void 0 : sa(arguments[2]))
            }
        });
        var la = function (t, e) {
            var n = [];
            return nn(t, !1, n.push, n, e), n
        }, ha = ea.keys, pa = ea.key, va = function (t, e) {
            var n = ha(t, e), r = bt(t);
            if (null === r) return n;
            var o = va(r, e);
            return o.length ? n.length ? la(new ai(n.concat(o))) : o : n
        };
        ea.exp({
            getMetadataKeys: function (t) {
                return va(v(t), arguments.length < 2 ? void 0 : pa(arguments[1]))
            }
        });
        var da = ea.get, ga = ea.key;
        ea.exp({
            getOwnMetadata: function (t, e) {
                return da(t, v(e), arguments.length < 3 ? void 0 : ga(arguments[2]))
            }
        });
        var ya = ea.keys, ma = ea.key;
        ea.exp({
            getOwnMetadataKeys: function (t) {
                return ya(v(t), arguments.length < 2 ? void 0 : ma(arguments[1]))
            }
        });
        var ba = ea.has, _a = ea.key, ka = function (t, e, n) {
            if (ba(t, e, n)) return !0;
            var r = bt(e);
            return null !== r && ka(t, r, n)
        };
        ea.exp({
            hasMetadata: function (t, e) {
                return ka(t, v(e), arguments.length < 3 ? void 0 : _a(arguments[2]))
            }
        });
        var wa = ea.has, Sa = ea.key;
        ea.exp({
            hasOwnMetadata: function (t, e) {
                return wa(t, v(e), arguments.length < 3 ? void 0 : Sa(arguments[2]))
            }
        });
        var Ta = ea.key, Ea = ea.set;
        ea.exp({
            metadata: function (t, e) {
                return function (n, r) {
                    Ea(t, e, (void 0 !== r ? v : I)(n), Ta(r))
                }
            }
        });
        e(function (t, e) {
            !function (t, e) {
                e()
            }(0, function () {
                function t(t, e) {
                    for (var n = t.length - 1; n >= 0; n--) typeof t[n] === I && (t[n] = Zone.current.wrap(t[n], e + "_" + n));
                    return t
                }

                function e(e, r) {
                    for (var o = e.constructor.name, i = 0; i < r.length; i++) !function (i) {
                        var a = r[i], u = e[a];
                        if (u) {
                            if (!n(Object.getOwnPropertyDescriptor(e, a))) return "continue";
                            e[a] = function (e) {
                                var n = function () {
                                    return e.apply(this, t(arguments, o + "." + a))
                                };
                                return c(n, e), n
                            }(u)
                        }
                    }(i)
                }

                function n(t) {
                    return !t || !1 !== t.writable && (typeof t.get !== I || typeof t.set !== A)
                }

                function r(t, e, n) {
                    var r = Object.getOwnPropertyDescriptor(t, e);
                    if (!r && n) {
                        Object.getOwnPropertyDescriptor(n, e) && (r = {enumerable: !0, configurable: !0})
                    }
                    if (r && r.configurable) {
                        delete r.writable, delete r.value;
                        var o = r.get, i = e.substr(2), a = Z[i];
                        a || (a = Z[i] = D("ON_PROPERTY" + i)), r.set = function (e) {
                            var n = this;
                            if (n || t !== x || (n = x), n) {
                                n[a] && n.removeEventListener(i, H), "function" == typeof e ? (n[a] = e, n.addEventListener(i, H, !1)) : n[a] = null
                            }
                        }, r.get = function () {
                            var n = this;
                            if (n || t !== x || (n = x), !n) return null;
                            var i = n[a];
                            if (i) return i;
                            if (o) {
                                var u = o && o.apply(this);
                                if (u) return r.set.apply(this, [u]), typeof n[L] === I && n.removeAttribute(e), u
                            }
                            return null
                        }, Object.defineProperty(t, e, r)
                    }
                }

                function o(t, e, n) {
                    if (e) for (var o = 0; o < e.length; o++) r(t, "on" + e[o], n); else {
                        var i = [];
                        for (var a in t) "on" == a.substr(0, 2) && i.push(a);
                        for (var u = 0; u < i.length; u++) r(t, i[u], n)
                    }
                }

                function i(e) {
                    var n = x[e];
                    if (n) {
                        x[D(e)] = n, x[e] = function () {
                            var r = t(arguments, e);
                            switch (r.length) {
                                case 0:
                                    this[W] = new n;
                                    break;
                                case 1:
                                    this[W] = new n(r[0]);
                                    break;
                                case 2:
                                    this[W] = new n(r[0], r[1]);
                                    break;
                                case 3:
                                    this[W] = new n(r[0], r[1], r[2]);
                                    break;
                                case 4:
                                    this[W] = new n(r[0], r[1], r[2], r[3]);
                                    break;
                                default:
                                    throw new Error("Arg list too long.")
                            }
                        }, c(x[e], n);
                        var r, o = new n(function () {
                        });
                        for (r in o) "XMLHttpRequest" === e && "responseBlob" === r || function (t) {
                            "function" == typeof o[t] ? x[e].prototype[t] = function () {
                                return this[W][t].apply(this[W], arguments)
                            } : Object.defineProperty(x[e].prototype, t, {
                                set: function (n) {
                                    "function" == typeof n ? (this[W][t] = Zone.current.wrap(n, e + "." + t), c(this[W][t], n)) : this[W][t] = n
                                }, get: function () {
                                    return this[W][t]
                                }
                            })
                        }(r);
                        for (r in n) "prototype" !== r && n.hasOwnProperty(r) && (x[e][r] = n[r])
                    }
                }

                function a(t, e, r) {
                    for (var o = t; o && !o.hasOwnProperty(e);) o = Object.getPrototypeOf(o);
                    !o && t[e] && (o = t);
                    var i, a = D(e);
                    if (o && !(i = o[a])) {
                        i = o[a] = o[e];
                        if (n(o && Object.getOwnPropertyDescriptor(o, e))) {
                            var u = r(i, a, e);
                            o[e] = function () {
                                return u(this, arguments)
                            }, c(o[e], i)
                        }
                    }
                    return i
                }

                function u(t, e, n) {
                    function r(t) {
                        var e = t.data;
                        return e.args[e.callbackIndex] = function () {
                            t.invoke.apply(this, arguments)
                        }, o.apply(e.target, e.args), t
                    }

                    var o = null;
                    o = a(t, e, function (t) {
                        return function (e, o) {
                            var i = n(e, o);
                            if (i.callbackIndex >= 0 && "function" == typeof o[i.callbackIndex]) {
                                return Zone.current.scheduleMacroTask(i.name, o[i.callbackIndex], i, r, null)
                            }
                            return t.apply(e, o)
                        }
                    })
                }

                function c(t, e) {
                    t[D("OriginalDelegate")] = e
                }

                function s() {
                    if (B) return q;
                    B = !0;
                    try {
                        var t = window.navigator.userAgent;
                        t.indexOf("MSIE ");
                        return -1 === t.indexOf("MSIE ") && -1 === t.indexOf("Trident/") && -1 === t.indexOf("Edge/") || (q = !0), q
                    } catch (t) {
                    }
                }

                function l(t, e, n) {
                    for (var r = n && n.addEventListenerFnName || "addEventListener", o = n && n.removeEventListenerFnName || "removeEventListener", i = n && n.listenersFnName || "eventListeners", a = n && n.removeAllFnName || "removeAllListeners", u = D(r), s = "." + r + ":", f = "prependListener", l = "." + f + ":", p = function (t, e, n) {
                        if (!t.isRemoved) {
                            var r = t.callback;
                            typeof r === tt && r.handleEvent && (t.callback = function (t) {
                                return r.handleEvent(t)
                            }, t.originalDelegate = r), t.invoke(t, e, [n]);
                            var i = t.options;
                            if (i && "object" == typeof i && i.once) {
                                var a = t.originalDelegate ? t.originalDelegate : t.callback;
                                e[o].apply(e, [n.type, a, i])
                            }
                        }
                    }, v = function (e) {
                        if (e = e || t.event) {
                            var n = this || e.target || t, r = n[K[e.type][X]];
                            if (r) if (1 === r.length) p(r[0], n, e); else for (var o = r.slice(), i = 0; i < o.length && (!e || !0 !== e[rt]); i++) p(o[i], n, e)
                        }
                    }, d = function (e) {
                        if (e = e || t.event) {
                            var n = this || e.target || t, r = n[K[e.type][G]];
                            if (r) if (1 === r.length) p(r[0], n, e); else for (var o = r.slice(), i = 0; i < o.length && (!e || !0 !== e[rt]); i++) p(o[i], n, e)
                        }
                    }, g = [], y = 0; y < e.length; y++) g[y] = function (e, n) {
                        if (!e) return !1;
                        var p = !0;
                        n && void 0 !== n.useGlobalCallback && (p = n.useGlobalCallback);
                        var g = n && n.validateHandler, y = !0;
                        n && void 0 !== n.checkDuplicate && (y = n.checkDuplicate);
                        var m = !1;
                        n && void 0 !== n.returnTarget && (m = n.returnTarget);
                        for (var b = e; b && !b.hasOwnProperty(r);) b = Object.getPrototypeOf(b);
                        if (!b && e[r] && (b = e), !b) return !1;
                        if (b[u]) return !1;
                        var _, k = {}, w = b[u] = b[r], S = b[D(o)] = b[o], T = b[D(i)] = b[i], E = b[D(a)] = b[a];
                        n && n.prependEventListenerFnName && (_ = b[D(n.prependEventListenerFnName)] = b[n.prependEventListenerFnName]);
                        var O = function (t) {
                                if (!k.isExisting) return w.apply(k.target, [k.eventName, k.capture ? d : v, k.options])
                            }, P = function (t) {
                                if (!t.isRemoved) {
                                    var e = K[t.eventName], n = void 0;
                                    e && (n = e[t.capture ? G : X]);
                                    var r = n && t.target[n];
                                    if (r) for (var o = 0; o < r.length; o++) {
                                        var i = r[o];
                                        if (i === t) {
                                            r.splice(o, 1), t.isRemoved = !0, 0 === r.length && (t.allRemoved = !0, t.target[n] = null);
                                            break
                                        }
                                    }
                                }
                                if (t.allRemoved) return S.apply(t.target, [t.eventName, t.capture ? d : v, t.options])
                            }, M = function (t) {
                                return w.apply(k.target, [k.eventName, t.invoke, k.options])
                            }, F = function (t) {
                                return _.apply(k.target, [k.eventName, t.invoke, k.options])
                            }, j = function (t) {
                                return S.apply(t.target, [t.eventName, t.invoke, t.options])
                            }, x = p ? O : M, I = p ? P : j, A = function (t, e) {
                                var n = typeof e;
                                return n === Q && t.callback === e || n === tt && t.originalDelegate === e
                            }, L = n && n.compareTaskCallbackVsDelegate ? n.compareTaskCallbackVsDelegate : A,
                            R = function (e, n, r, o, i, a) {
                                return void 0 === i && (i = !1), void 0 === a && (a = !1), function () {
                                    var u = this || t, c = (Zone.current, arguments[1]);
                                    if (!c) return e.apply(this, arguments);
                                    var s = !1;
                                    if (typeof c !== Q) {
                                        if (!c.handleEvent) return e.apply(this, arguments);
                                        s = !0
                                    }
                                    if (!g || g(e, c, u, arguments)) {
                                        var f, l = arguments[0], h = arguments[2], v = !1;
                                        void 0 === h ? f = !1 : !0 === h ? f = !0 : !1 === h ? f = !1 : (f = !!h && !!h.capture, v = !!h && !!h.once);
                                        var d, m = Zone.current, b = K[l];
                                        if (b) d = b[f ? G : X]; else {
                                            var _ = l + X, w = l + G, S = et + _, T = et + w;
                                            K[l] = {}, K[l][X] = S, K[l][G] = T, d = f ? T : S
                                        }
                                        var E = u[d], O = !1;
                                        if (E) {
                                            if (O = !0, y) for (var P = 0; P < E.length; P++) if (L(E[P], c)) return
                                        } else E = u[d] = [];
                                        var M, F = u.constructor[$], j = J[F];
                                        j && (M = j[l]), M || (M = F + n + l), k.options = h, v && (k.options.once = !1), k.target = u, k.capture = f, k.eventName = l, k.isExisting = O;
                                        var D = p ? Y : null, x = m.scheduleEventTask(M, c, D, r, o);
                                        return v && (h.once = !0), x.options = h, x.target = u, x.capture = f, x.eventName = l, s && (x.originalDelegate = c), a ? E.unshift(x) : E.push(x), i ? u : void 0
                                    }
                                }
                            };
                        return b[r] = R(w, s, x, I, m), _ && (b[f] = R(_, l, F, I, m, !0)), b[o] = function () {
                            var e, n = this || t, r = arguments[0], o = arguments[2];
                            e = void 0 !== o && (!0 === o || !1 !== o && (!!o && !!o.capture));
                            var i = arguments[1];
                            if (!i) return S.apply(this, arguments);
                            if (!g || g(S, i, n, arguments)) {
                                var a, u = K[r];
                                u && (a = u[e ? G : X]);
                                var c = a && n[a];
                                if (c) for (var s = 0; s < c.length; s++) {
                                    var f = c[s];
                                    if (L(f, i)) return c.splice(s, 1), f.isRemoved = !0, 0 === c.length && (f.allRemoved = !0, n[a] = null), void f.zone.cancelTask(f)
                                }
                            }
                        }, b[i] = function () {
                            for (var e = this || t, n = arguments[0], r = [], o = h(e, n), i = 0; i < o.length; i++) {
                                var a = o[i], u = a.originalDelegate ? a.originalDelegate : a.callback;
                                r.push(u)
                            }
                            return r
                        }, b[a] = function () {
                            var e = this || t, n = arguments[0];
                            if (n) {
                                var r = K[n];
                                if (r) {
                                    var i = r[X], u = r[G], c = e[i], s = e[u];
                                    if (c) for (var f = V(c), l = 0; l < f.length; l++) {
                                        var h = f[l], p = h.originalDelegate ? h.originalDelegate : h.callback;
                                        this[o].apply(this, [n, p, h.options])
                                    }
                                    if (s) for (var f = V(s), l = 0; l < f.length; l++) {
                                        var h = f[l], p = h.originalDelegate ? h.originalDelegate : h.callback;
                                        this[o].apply(this, [n, p, h.options])
                                    }
                                }
                            } else {
                                for (var v = Object.keys(e), l = 0; l < v.length; l++) {
                                    var d = v[l], g = nt.exec(d), y = g && g[1];
                                    y && "removeListener" !== y && this[a].apply(this, [y])
                                }
                                this[a].apply(this, ["removeListener"])
                            }
                        }, c(b[r], w), c(b[o], S), E && c(b[a], E), T && c(b[i], T), !0
                    }(e[y], n);
                    return g
                }

                function h(t, e) {
                    var n = [];
                    for (var r in t) {
                        var o = nt.exec(r), i = o && o[1];
                        if (i && (!e || i === e)) {
                            var a = t[r];
                            if (a) for (var u = 0; u < a.length; u++) n.push(a[u])
                        }
                    }
                    return n
                }

                function p(t, e) {
                    var n = t.Event;
                    n && n.prototype && e.patchMethod(n.prototype, "stopImmediatePropagation", function (t) {
                        return function (t, e) {
                            t[rt] = !0
                        }
                    })
                }

                function v(t, e, n, r) {
                    function o(e) {
                        function n() {
                            try {
                                e.invoke.apply(this, arguments)
                            } finally {
                                typeof r.handleId === f ? delete s[r.handleId] : r.handleId && (r.handleId[ot] = null)
                            }
                        }

                        var r = e.data;
                        return r.args[0] = n, r.handleId = u.apply(t, r.args), e
                    }

                    function i(t) {
                        return c(t.data.handleId)
                    }

                    var u = null, c = null;
                    e += r, n += r;
                    var s = {}, f = "number";
                    u = a(t, e, function (n) {
                        return function (a, u) {
                            if ("function" == typeof u[0]) {
                                var c = Zone.current, l = {
                                    handleId: null,
                                    isPeriodic: "Interval" === r,
                                    delay: "Timeout" === r || "Interval" === r ? u[1] || 0 : null,
                                    args: u
                                }, h = c.scheduleMacroTask(e, u[0], l, o, i);
                                if (!h) return h;
                                var p = h.data.handleId;
                                return typeof p === f ? s[p] = h : p && (p[ot] = h), p && p.ref && p.unref && "function" == typeof p.ref && "function" == typeof p.unref && (h.ref = p.ref.bind(p), h.unref = p.unref.bind(p)), typeof p === f || p ? p : h
                            }
                            return n.apply(t, u)
                        }
                    }), c = a(t, n, function (e) {
                        return function (n, r) {
                            var o, i = r[0];
                            typeof i === f ? o = s[i] : (o = i && i[ot]) || (o = i), o && "string" == typeof o.type ? "notScheduled" !== o.state && (o.cancelFn && o.data.isPeriodic || 0 === o.runCount) && (typeof i === f ? delete s[i] : i && (i[ot] = null), o.zone.cancelTask(o)) : e.apply(t, r)
                        }
                    })
                }

                function d() {
                    Object.defineProperty = function (t, e, n) {
                        if (y(t, e)) throw new TypeError("Cannot assign to read only property '" + e + "' of " + t);
                        var r = n.configurable;
                        return e !== st && (n = m(t, e, n)), b(t, e, n, r)
                    }, Object.defineProperties = function (t, e) {
                        return Object.keys(e).forEach(function (n) {
                            Object.defineProperty(t, n, e[n])
                        }), t
                    }, Object.create = function (t, e) {
                        return typeof e !== ft || Object.isFrozen(e) || Object.keys(e).forEach(function (n) {
                            e[n] = m(t, n, e[n])
                        }), ut(t, e)
                    }, Object.getOwnPropertyDescriptor = function (t, e) {
                        var n = at(t, e);
                        return y(t, e) && (n.configurable = !1), n
                    }
                }

                function g(t, e, n) {
                    var r = n.configurable;
                    return n = m(t, e, n), b(t, e, n, r)
                }

                function y(t, e) {
                    return t && t[ct] && t[ct][e]
                }

                function m(t, e, n) {
                    return n.configurable = !0, n.configurable || (t[ct] || it(t, ct, {
                        writable: !0,
                        value: {}
                    }), t[ct][e] = !0), n
                }

                function b(t, e, n, r) {
                    try {
                        return it(t, e, n)
                    } catch (i) {
                        if (!n.configurable) throw i;
                        typeof r == lt ? delete n.configurable : n.configurable = r;
                        try {
                            return it(t, e, n)
                        } catch (r) {
                            var o = null;
                            try {
                                o = JSON.stringify(n)
                            } catch (t) {
                                o = o.toString()
                            }
                            console.log("Attempting to configure '" + e + "' with descriptor '" + o + "' on object '" + t + "' and got error, giving up: " + r)
                        }
                    }
                }

                function _(t, e) {
                    var n = e.WebSocket;
                    e.EventTarget || l(e, [n.prototype]), e.WebSocket = function (t, e) {
                        var r, i, a = arguments.length > 1 ? new n(t, e) : new n(t),
                            u = Object.getOwnPropertyDescriptor(a, "onmessage");
                        return u && !1 === u.configurable ? (r = Object.create(a), i = a, ["addEventListener", "removeEventListener", "send", "close"].forEach(function (t) {
                            r[t] = function () {
                                var e = Array.prototype.slice.call(arguments);
                                if ("addEventListener" === t || "removeEventListener" === t) {
                                    var n = e.length > 0 ? e[0] : void 0;
                                    if (n) {
                                        var o = Zone.__symbol__("ON_PROPERTY" + n);
                                        a[o] = r[o]
                                    }
                                }
                                return a[t].apply(a, e)
                            }
                        })) : r = a, o(r, ["close", "error", "message", "open"], i), r
                    };
                    var r = e.WebSocket;
                    for (var i in n) r[i] = n[i]
                }

                function k(t, e, n) {
                    if (!n) return e;
                    var r = n.filter(function (e) {
                        return e.target === t
                    });
                    if (!r || 0 === r.length) return e;
                    var o = r[0].ignoreProperties;
                    return e.filter(function (t) {
                        return -1 === o.indexOf(t)
                    })
                }

                function w(t, e, n, r) {
                    o(t, k(t, e, n), r)
                }

                function S(t, e) {
                    if (!N || z) {
                        var n = "undefined" != typeof WebSocket;
                        if (T()) {
                            var r = e.__Zone_ignore_on_properties;
                            if (C) {
                                w(window, Mt.concat(["messageerror"]), r, Object.getPrototypeOf(window)), w(Document.prototype, Mt, r), void 0 !== window.SVGElement && w(window.SVGElement.prototype, Mt, r), w(Element.prototype, Mt, r), w(HTMLElement.prototype, Mt, r), w(HTMLMediaElement.prototype, gt, r), w(HTMLFrameSetElement.prototype, vt.concat(wt), r), w(HTMLBodyElement.prototype, vt.concat(wt), r), w(HTMLFrameElement.prototype, kt, r), w(HTMLIFrameElement.prototype, kt, r);
                                var o = window.HTMLMarqueeElement;
                                o && w(o.prototype, St, r);
                                var a = window.Worker;
                                a && w(a.prototype, Pt, r)
                            }
                            w(XMLHttpRequest.prototype, Tt, r);
                            var u = e.XMLHttpRequestEventTarget;
                            u && w(u && u.prototype, Tt, r), "undefined" != typeof IDBIndex && (w(IDBIndex.prototype, Et, r), w(IDBRequest.prototype, Et, r), w(IDBOpenDBRequest.prototype, Et, r), w(IDBDatabase.prototype, Et, r), w(IDBTransaction.prototype, Et, r), w(IDBCursor.prototype, Et, r)), n && w(WebSocket.prototype, Ot, r)
                        } else E(), i("XMLHttpRequest"), n && _(t, e)
                    }
                }

                function T() {
                    if ((C || z) && !Object.getOwnPropertyDescriptor(HTMLElement.prototype, "onclick") && "undefined" != typeof Element) {
                        var t = Object.getOwnPropertyDescriptor(Element.prototype, "onclick");
                        if (t && !t.configurable) return !1
                    }
                    var e = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, "onreadystatechange");
                    if (e) {
                        Object.defineProperty(XMLHttpRequest.prototype, "onreadystatechange", {
                            enumerable: !0,
                            configurable: !0,
                            get: function () {
                                return !0
                            }
                        });
                        var n = new XMLHttpRequest, r = !!n.onreadystatechange;
                        return Object.defineProperty(XMLHttpRequest.prototype, "onreadystatechange", e || {}), r
                    }
                    var o = D("fakeonreadystatechange");
                    Object.defineProperty(XMLHttpRequest.prototype, "onreadystatechange", {
                        enumerable: !0,
                        configurable: !0,
                        get: function () {
                            return this[o]
                        },
                        set: function (t) {
                            this[o] = t
                        }
                    });
                    var n = new XMLHttpRequest, i = function () {
                    };
                    n.onreadystatechange = i;
                    var r = n[o] === i;
                    return n.onreadystatechange = null, r
                }

                function E() {
                    for (var t = 0; t < Mt.length; t++) !function (t) {
                        var e = Mt[t], n = "on" + e;
                        self.addEventListener(e, function (t) {
                            var e, r, o = t.target;
                            for (r = o ? o.constructor.name + "." + n : "unknown." + n; o;) o[n] && !o[n][Ft] && (e = Zone.current.wrap(o[n], r), e[Ft] = o[n], o[n] = e), o = o.parentElement
                        }, !0)
                    }(t)
                }

                function O(t, e) {
                    var n = "Anchor,Area,Audio,BR,Base,BaseFont,Body,Button,Canvas,Content,DList,Directory,Div,Embed,FieldSet,Font,Form,Frame,FrameSet,HR,Head,Heading,Html,IFrame,Image,Input,Keygen,LI,Label,Legend,Link,Map,Marquee,Media,Menu,Meta,Meter,Mod,OList,Object,OptGroup,Option,Output,Paragraph,Pre,Progress,Quote,Script,Select,Source,Span,Style,TableCaption,TableCell,TableCol,Table,TableRow,TableSection,TextArea,Title,Track,UList,Unknown,Video",
                        r = "ApplicationCache,EventSource,FileReader,InputMethodContext,MediaController,MessagePort,Node,Performance,SVGElementInstance,SharedWorker,TextTrack,TextTrackCue,TextTrackList,WebKitNamedFlow,Window,Worker,WorkerGlobalScope,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload,IDBRequest,IDBOpenDBRequest,IDBDatabase,IDBTransaction,IDBCursor,DBIndex,WebSocket".split(","),
                        o = [], i = t.wtf, a = n.split(",");
                    i ? o = a.map(function (t) {
                        return "HTML" + t + "Element"
                    }).concat(r) : t.EventTarget ? o.push("EventTarget") : o = r;
                    for (var u = t.__Zone_disable_IE_check || !1, c = t.__Zone_enable_cross_context_check || !1, f = s(), h = "function __BROWSERTOOLS_CONSOLE_SAFEFUNC() { [native code] }", p = 0; p < Mt.length; p++) {
                        var v = Mt[p], d = v + X, g = v + G, y = et + d, m = et + g;
                        K[v] = {}, K[v][X] = y, K[v][G] = m
                    }
                    for (var p = 0; p < n.length; p++) for (var b = a[p], _ = J[b] = {}, k = 0; k < Mt.length; k++) {
                        var v = Mt[k];
                        _[v] = b + ".addEventListener:" + v
                    }
                    for (var w = function (t, e, n, r) {
                        if (!u && f) if (c) try {
                            var o = e.toString();
                            if ("[object FunctionWrapper]" === o || o == h) return t.apply(n, r), !1
                        } catch (e) {
                            return t.apply(n, r), !1
                        } else {
                            var o = e.toString();
                            if ("[object FunctionWrapper]" === o || o == h) return t.apply(n, r), !1
                        } else if (c) try {
                            e.toString()
                        } catch (e) {
                            return t.apply(n, r), !1
                        }
                        return !0
                    }, S = [], p = 0; p < o.length; p++) {
                        var T = t[o[p]];
                        S.push(T && T.prototype)
                    }
                    return l(t, S, {validateHandler: w}), e.patchEventTarget = l, !0
                }

                function P(t, e) {
                    p(t, e)
                }

                function M(t) {
                    if ((C || z) && "registerElement" in t.document) {
                        var e = document.registerElement,
                            n = ["createdCallback", "attachedCallback", "detachedCallback", "attributeChangedCallback"];
                        document.registerElement = function (t, r) {
                            return r && r.prototype && n.forEach(function (t) {
                                var e = "Document.registerElement::" + t;
                                if (r.prototype.hasOwnProperty(t)) {
                                    var n = Object.getOwnPropertyDescriptor(r.prototype, t);
                                    n && n.value ? (n.value = Zone.current.wrap(n.value, e), g(r.prototype, t, n)) : r.prototype[t] = Zone.current.wrap(r.prototype[t], e)
                                } else r.prototype[t] && (r.prototype[t] = Zone.current.wrap(r.prototype[t], e))
                            }), e.apply(document, [t, r])
                        }, c(document.registerElement, e)
                    }
                }

                var F = (function (t) {
                    function e(t) {
                        u && u.mark && u.mark(t)
                    }

                    function n(t, e) {
                        u && u.measure && u.measure(t, e)
                    }

                    function r(e) {
                        0 === x && 0 === g.length && (s || t[v] && (s = t[v].resolve(0)), s ? s[d](o) : t[p](o, 0)), e && g.push(e)
                    }

                    function o() {
                        if (!y) {
                            for (y = !0; g.length;) {
                                var t = g;
                                g = [];
                                for (var e = 0; e < t.length; e++) {
                                    var n = t[e];
                                    try {
                                        n.zone.runTask(n, null, null)
                                    } catch (t) {
                                        F.onUnhandledError(t)
                                    }
                                }
                            }
                            c[a("ignoreConsoleErrorUncaughtError")];
                            F.microtaskDrainDone(), y = !1
                        }
                    }

                    function i() {
                    }

                    function a(t) {
                        return "__zone_symbol__" + t
                    }

                    var u = t.performance;
                    if (e("Zone"), t.Zone) throw new Error("Zone already loaded.");
                    var c = function () {
                        function r(t, e) {
                            this._properties = null, this._parent = t, this._name = e ? e.name || "unnamed" : "<root>", this._properties = e && e.properties || {}, this._zoneDelegate = new l(this, this._parent && this._parent._zoneDelegate, e)
                        }

                        return r.assertZonePatched = function () {
                            if (t.Promise !== M.ZoneAwarePromise) throw new Error("Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)")
                        }, Object.defineProperty(r, "root", {
                            get: function () {
                                for (var t = r.current; t.parent;) t = t.parent;
                                return t
                            }, enumerable: !0, configurable: !0
                        }), Object.defineProperty(r, "current", {
                            get: function () {
                                return j.zone
                            }, enumerable: !0, configurable: !0
                        }), Object.defineProperty(r, "currentTask", {
                            get: function () {
                                return D
                            }, enumerable: !0, configurable: !0
                        }), r.__load_patch = function (o, i) {
                            if (M.hasOwnProperty(o)) throw Error("Already loaded patch: " + o);
                            if (!t["__Zone_disable_" + o]) {
                                var a = "Zone:" + o;
                                e(a), M[o] = i(t, r, F), n(a, a)
                            }
                        }, Object.defineProperty(r.prototype, "parent", {
                            get: function () {
                                return this._parent
                            }, enumerable: !0, configurable: !0
                        }), Object.defineProperty(r.prototype, "name", {
                            get: function () {
                                return this._name
                            }, enumerable: !0, configurable: !0
                        }), r.prototype.get = function (t) {
                            var e = this.getZoneWith(t);
                            if (e) return e._properties[t]
                        }, r.prototype.getZoneWith = function (t) {
                            for (var e = this; e;) {
                                if (e._properties.hasOwnProperty(t)) return e;
                                e = e._parent
                            }
                            return null
                        }, r.prototype.fork = function (t) {
                            if (!t) throw new Error("ZoneSpec required!");
                            return this._zoneDelegate.fork(this, t)
                        }, r.prototype.wrap = function (t, e) {
                            if ("function" != typeof t) throw new Error("Expecting function got: " + t);
                            var n = this._zoneDelegate.intercept(this, t, e), r = this;
                            return function () {
                                return r.runGuarded(n, this, arguments, e)
                            }
                        }, r.prototype.run = function (t, e, n, r) {
                            void 0 === e && (e = void 0), void 0 === n && (n = null), void 0 === r && (r = null), j = {
                                parent: j,
                                zone: this
                            };
                            try {
                                return this._zoneDelegate.invoke(this, t, e, n, r)
                            } finally {
                                j = j.parent
                            }
                        }, r.prototype.runGuarded = function (t, e, n, r) {
                            void 0 === e && (e = null), void 0 === n && (n = null), void 0 === r && (r = null), j = {
                                parent: j,
                                zone: this
                            };
                            try {
                                try {
                                    return this._zoneDelegate.invoke(this, t, e, n, r)
                                } catch (t) {
                                    if (this._zoneDelegate.handleError(this, t)) throw t
                                }
                            } finally {
                                j = j.parent
                            }
                        }, r.prototype.runTask = function (t, e, n) {
                            if (t.zone != this) throw new Error("A task can only be run in the zone of creation! (Creation: " + (t.zone || m).name + "; Execution: " + this.name + ")");
                            if (t.state !== b || t.type !== P) {
                                var r = t.state != w;
                                r && t._transitionTo(w, k), t.runCount++;
                                var o = D;
                                D = t, j = {parent: j, zone: this};
                                try {
                                    t.type == O && t.data && !t.data.isPeriodic && (t.cancelFn = null);
                                    try {
                                        return this._zoneDelegate.invokeTask(this, t, e, n)
                                    } catch (t) {
                                        if (this._zoneDelegate.handleError(this, t)) throw t
                                    }
                                } finally {
                                    t.state !== b && t.state !== T && (t.type == P || t.data && t.data.isPeriodic ? r && t._transitionTo(k, w) : (t.runCount = 0, this._updateTaskCount(t, -1), r && t._transitionTo(b, w, b))), j = j.parent, D = o
                                }
                            }
                        }, r.prototype.scheduleTask = function (t) {
                            if (t.zone && t.zone !== this) for (var e = this; e;) {
                                if (e === t.zone) throw Error("can not reschedule task to " + this.name + " which is descendants of the original zone " + t.zone.name);
                                e = e.parent
                            }
                            t._transitionTo(_, b);
                            var n = [];
                            t._zoneDelegates = n, t._zone = this;
                            try {
                                t = this._zoneDelegate.scheduleTask(this, t)
                            } catch (e) {
                                throw t._transitionTo(T, _, b), this._zoneDelegate.handleError(this, e), e
                            }
                            return t._zoneDelegates === n && this._updateTaskCount(t, 1), t.state == _ && t._transitionTo(k, _), t
                        }, r.prototype.scheduleMicroTask = function (t, e, n, r) {
                            return this.scheduleTask(new h(E, t, e, n, r, null))
                        }, r.prototype.scheduleMacroTask = function (t, e, n, r, o) {
                            return this.scheduleTask(new h(O, t, e, n, r, o))
                        }, r.prototype.scheduleEventTask = function (t, e, n, r, o) {
                            return this.scheduleTask(new h(P, t, e, n, r, o))
                        }, r.prototype.cancelTask = function (t) {
                            if (t.zone != this) throw new Error("A task can only be cancelled in the zone of creation! (Creation: " + (t.zone || m).name + "; Execution: " + this.name + ")");
                            t._transitionTo(S, k, w);
                            try {
                                this._zoneDelegate.cancelTask(this, t)
                            } catch (e) {
                                throw t._transitionTo(T, S), this._zoneDelegate.handleError(this, e), e
                            }
                            return this._updateTaskCount(t, -1), t._transitionTo(b, S), t.runCount = 0, t
                        }, r.prototype._updateTaskCount = function (t, e) {
                            var n = t._zoneDelegates;
                            -1 == e && (t._zoneDelegates = null);
                            for (var r = 0; r < n.length; r++) n[r]._updateTaskCount(t.type, e)
                        }, r
                    }();
                    c.__symbol__ = a;
                    var s, f = {
                            name: "", onHasTask: function (t, e, n, r) {
                                return t.hasTask(n, r)
                            }, onScheduleTask: function (t, e, n, r) {
                                return t.scheduleTask(n, r)
                            }, onInvokeTask: function (t, e, n, r, o, i) {
                                return t.invokeTask(n, r, o, i)
                            }, onCancelTask: function (t, e, n, r) {
                                return t.cancelTask(n, r)
                            }
                        }, l = function () {
                            function t(t, e, n) {
                                this._taskCounts = {
                                    microTask: 0,
                                    macroTask: 0,
                                    eventTask: 0
                                }, this.zone = t, this._parentDelegate = e, this._forkZS = n && (n && n.onFork ? n : e._forkZS), this._forkDlgt = n && (n.onFork ? e : e._forkDlgt), this._forkCurrZone = n && (n.onFork ? this.zone : e.zone), this._interceptZS = n && (n.onIntercept ? n : e._interceptZS), this._interceptDlgt = n && (n.onIntercept ? e : e._interceptDlgt), this._interceptCurrZone = n && (n.onIntercept ? this.zone : e.zone), this._invokeZS = n && (n.onInvoke ? n : e._invokeZS), this._invokeDlgt = n && (n.onInvoke ? e : e._invokeDlgt), this._invokeCurrZone = n && (n.onInvoke ? this.zone : e.zone), this._handleErrorZS = n && (n.onHandleError ? n : e._handleErrorZS), this._handleErrorDlgt = n && (n.onHandleError ? e : e._handleErrorDlgt), this._handleErrorCurrZone = n && (n.onHandleError ? this.zone : e.zone), this._scheduleTaskZS = n && (n.onScheduleTask ? n : e._scheduleTaskZS), this._scheduleTaskDlgt = n && (n.onScheduleTask ? e : e._scheduleTaskDlgt), this._scheduleTaskCurrZone = n && (n.onScheduleTask ? this.zone : e.zone), this._invokeTaskZS = n && (n.onInvokeTask ? n : e._invokeTaskZS), this._invokeTaskDlgt = n && (n.onInvokeTask ? e : e._invokeTaskDlgt), this._invokeTaskCurrZone = n && (n.onInvokeTask ? this.zone : e.zone), this._cancelTaskZS = n && (n.onCancelTask ? n : e._cancelTaskZS), this._cancelTaskDlgt = n && (n.onCancelTask ? e : e._cancelTaskDlgt), this._cancelTaskCurrZone = n && (n.onCancelTask ? this.zone : e.zone), this._hasTaskZS = null, this._hasTaskDlgt = null, this._hasTaskDlgtOwner = null, this._hasTaskCurrZone = null;
                                var r = n && n.onHasTask, o = e && e._hasTaskZS;
                                (r || o) && (this._hasTaskZS = r ? n : f, this._hasTaskDlgt = e, this._hasTaskDlgtOwner = this, this._hasTaskCurrZone = t, n.onScheduleTask || (this._scheduleTaskZS = f, this._scheduleTaskDlgt = e, this._scheduleTaskCurrZone = this.zone), n.onInvokeTask || (this._invokeTaskZS = f, this._invokeTaskDlgt = e, this._invokeTaskCurrZone = this.zone), n.onCancelTask || (this._cancelTaskZS = f, this._cancelTaskDlgt = e, this._cancelTaskCurrZone = this.zone))
                            }

                            return t.prototype.fork = function (t, e) {
                                return this._forkZS ? this._forkZS.onFork(this._forkDlgt, this.zone, t, e) : new c(t, e)
                            }, t.prototype.intercept = function (t, e, n) {
                                return this._interceptZS ? this._interceptZS.onIntercept(this._interceptDlgt, this._interceptCurrZone, t, e, n) : e
                            }, t.prototype.invoke = function (t, e, n, r, o) {
                                return this._invokeZS ? this._invokeZS.onInvoke(this._invokeDlgt, this._invokeCurrZone, t, e, n, r, o) : e.apply(n, r)
                            }, t.prototype.handleError = function (t, e) {
                                return !this._handleErrorZS || this._handleErrorZS.onHandleError(this._handleErrorDlgt, this._handleErrorCurrZone, t, e)
                            }, t.prototype.scheduleTask = function (t, e) {
                                var n = e;
                                if (this._scheduleTaskZS) this._hasTaskZS && n._zoneDelegates.push(this._hasTaskDlgtOwner), (n = this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this._scheduleTaskCurrZone, t, e)) || (n = e); else if (e.scheduleFn) e.scheduleFn(e); else {
                                    if (e.type != E) throw new Error("Task is missing scheduleFn.");
                                    r(e)
                                }
                                return n
                            }, t.prototype.invokeTask = function (t, e, n, r) {
                                return this._invokeTaskZS ? this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this._invokeTaskCurrZone, t, e, n, r) : e.callback.apply(n, r)
                            }, t.prototype.cancelTask = function (t, e) {
                                var n;
                                if (this._cancelTaskZS) n = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this._cancelTaskCurrZone, t, e); else {
                                    if (!e.cancelFn) throw Error("Task is not cancelable");
                                    n = e.cancelFn(e)
                                }
                                return n
                            }, t.prototype.hasTask = function (t, e) {
                                try {
                                    return this._hasTaskZS && this._hasTaskZS.onHasTask(this._hasTaskDlgt, this._hasTaskCurrZone, t, e)
                                } catch (e) {
                                    this.handleError(t, e)
                                }
                            }, t.prototype._updateTaskCount = function (t, e) {
                                var n = this._taskCounts, r = n[t], o = n[t] = r + e;
                                if (o < 0) throw new Error("More tasks executed then were scheduled.");
                                if (0 == r || 0 == o) {
                                    var i = {
                                        microTask: n.microTask > 0,
                                        macroTask: n.macroTask > 0,
                                        eventTask: n.eventTask > 0,
                                        change: t
                                    };
                                    this.hasTask(this.zone, i)
                                }
                            }, t
                        }(), h = function () {
                            function e(n, r, o, i, a, u) {
                                this._zone = null, this.runCount = 0, this._zoneDelegates = null, this._state = "notScheduled", this.type = n, this.source = r, this.data = i, this.scheduleFn = a, this.cancelFn = u, this.callback = o;
                                var c = this;
                                n === P && i && i.isUsingGlobalCallback ? this.invoke = e.invokeTask : this.invoke = function () {
                                    return e.invokeTask.apply(t, [c, this, arguments])
                                }
                            }

                            return e.invokeTask = function (t, e, n) {
                                t || (t = this), x++;
                                try {
                                    return t.runCount++, t.zone.runTask(t, e, n)
                                } finally {
                                    1 == x && o(), x--
                                }
                            }, Object.defineProperty(e.prototype, "zone", {
                                get: function () {
                                    return this._zone
                                }, enumerable: !0, configurable: !0
                            }), Object.defineProperty(e.prototype, "state", {
                                get: function () {
                                    return this._state
                                }, enumerable: !0, configurable: !0
                            }), e.prototype.cancelScheduleRequest = function () {
                                this._transitionTo(b, _)
                            }, e.prototype._transitionTo = function (t, e, n) {
                                if (this._state !== e && this._state !== n) throw new Error(this.type + " '" + this.source + "': can not transition to '" + t + "', expecting state '" + e + "'" + (n ? " or '" + n + "'" : "") + ", was '" + this._state + "'.");
                                this._state = t, t == b && (this._zoneDelegates = null)
                            }, e.prototype.toString = function () {
                                return this.data && void 0 !== this.data.handleId ? this.data.handleId : Object.prototype.toString.call(this)
                            }, e.prototype.toJSON = function () {
                                return {
                                    type: this.type,
                                    state: this.state,
                                    source: this.source,
                                    zone: this.zone.name,
                                    invoke: this.invoke,
                                    scheduleFn: this.scheduleFn,
                                    cancelFn: this.cancelFn,
                                    runCount: this.runCount,
                                    callback: this.callback
                                }
                            }, e
                        }(), p = a("setTimeout"), v = a("Promise"), d = a("then"), g = [], y = !1, m = {name: "NO ZONE"},
                        b = "notScheduled", _ = "scheduling", k = "scheduled", w = "running", S = "canceling",
                        T = "unknown", E = "microTask", O = "macroTask", P = "eventTask", M = {}, F = {
                            symbol: a,
                            currentZoneFrame: function () {
                                return j
                            },
                            onUnhandledError: i,
                            microtaskDrainDone: i,
                            scheduleMicroTask: r,
                            showUncaughtError: function () {
                                return !c[a("ignoreConsoleErrorUncaughtError")]
                            },
                            patchEventTarget: function () {
                                return []
                            },
                            patchOnProperties: i,
                            patchMethod: function () {
                                return i
                            },
                            setNativePromise: function (t) {
                                s = t.resolve(0)
                            }
                        }, j = {parent: null, zone: new c(null, null)}, D = null, x = 0;
                    n("Zone", "Zone"), t.Zone = c
                }("undefined" != typeof window && window || "undefined" != typeof self && self || f), function (t, e) {
                    var n = "function" == typeof Symbol && t[Symbol.iterator];
                    if (!n) return t;
                    var r, o, i = n.call(t), a = [];
                    try {
                        for (; (void 0 === e || e-- > 0) && !(r = i.next()).done;) a.push(r.value)
                    } catch (t) {
                        o = {error: t}
                    } finally {
                        try {
                            r && !r.done && (n = i.return) && n.call(i)
                        } finally {
                            if (o) throw o.error
                        }
                    }
                    return a
                }), j = function (t) {
                    var e = "function" == typeof Symbol && t[Symbol.iterator], n = 0;
                    return e ? e.call(t) : {
                        next: function () {
                            return t && n >= t.length && (t = void 0), {value: t && t[n++], done: !t}
                        }
                    }
                };
                Zone.__load_patch("ZoneAwarePromise", function (t, e, n) {
                    function r(t) {
                        n.onUnhandledError(t);
                        try {
                            var r = e[g];
                            r && "function" == typeof r && r.apply(this, [t])
                        } catch (t) {
                        }
                    }

                    function o(t) {
                        return t && t.then
                    }

                    function i(t) {
                        return t
                    }

                    function a(t) {
                        return x.reject(t)
                    }

                    function u(t, e) {
                        return function (n) {
                            try {
                                c(t, e, n)
                            } catch (e) {
                                c(t, !1, e)
                            }
                        }
                    }

                    function c(t, r, o) {
                        var i = T();
                        if (t === o) throw new TypeError(E);
                        if (t[y] === _) {
                            var a = null;
                            try {
                                typeof o !== O && typeof o !== P || (a = o && o.then)
                            } catch (e) {
                                return i(function () {
                                    c(t, !1, e)
                                })(), t
                            }
                            if (r !== w && o instanceof x && o.hasOwnProperty(y) && o.hasOwnProperty(m) && o[y] !== _) s(o), c(t, o[y], o[m]); else if (r !== w && typeof a === P) try {
                                a.apply(o, [i(u(t, r)), i(u(t, !1))])
                            } catch (e) {
                                i(function () {
                                    c(t, !1, e)
                                })()
                            } else {
                                t[y] = r;
                                var l = t[m];
                                t[m] = o, r === w && o instanceof Error && (o[M] = e.currentTask);
                                for (var h = 0; h < l.length;) f(t, l[h++], l[h++], l[h++], l[h++]);
                                if (0 == l.length && r == w) {
                                    t[y] = S;
                                    try {
                                        throw new Error("Uncaught (in promise): " + o + (o && o.stack ? "\n" + o.stack : ""))
                                    } catch (r) {
                                        var v = r;
                                        v.rejection = o, v.promise = t, v.zone = e.current, v.task = e.currentTask, p.push(v), n.scheduleMicroTask()
                                    }
                                }
                            }
                        }
                        return t
                    }

                    function s(t) {
                        if (t[y] === S) {
                            try {
                                var n = e[D];
                                n && typeof n === P && n.apply(this, [{rejection: t[m], promise: t}])
                            } catch (t) {
                            }
                            t[y] = w;
                            for (var r = 0; r < p.length; r++) t === p[r].promise && p.splice(r, 1)
                        }
                    }

                    function f(t, e, n, r, o) {
                        s(t);
                        var u = t[y] ? typeof r === P ? r : i : typeof o === P ? o : a;
                        e.scheduleMicroTask(b, function () {
                            try {
                                c(n, !0, e.run(u, void 0, [t[m]]))
                            } catch (t) {
                                c(n, !1, t)
                            }
                        })
                    }

                    function l(t) {
                        var e = t.prototype, n = e.then;
                        e[d] = n;
                        var r = Object.getOwnPropertyDescriptor(t.prototype, "then");
                        r && !1 === r.writable && r.configurable && Object.defineProperty(t.prototype, "then", {writable: !0}), t.prototype.then = function (t, e) {
                            var r = this;
                            return new x(function (t, e) {
                                n.call(r, t, e)
                            }).then(t, e)
                        }, t[R] = !0
                    }

                    var h = n.symbol, p = [], v = h("Promise"), d = h("then");
                    n.onUnhandledError = function (t) {
                        if (n.showUncaughtError()) {
                            var e = t && t.rejection;
                            e ? console.error("Unhandled Promise rejection:", e instanceof Error ? e.message : e, "; Zone:", t.zone.name, "; Task:", t.task && t.task.source, "; Value:", e, e instanceof Error ? e.stack : void 0) : console.error(t)
                        }
                    }, n.microtaskDrainDone = function () {
                        for (; p.length;) for (; p.length;) !function () {
                            var t = p.shift();
                            try {
                                t.zone.runGuarded(function () {
                                    throw t
                                })
                            } catch (t) {
                                r(t)
                            }
                        }()
                    };
                    var g = h("unhandledPromiseRejectionHandler"), y = h("state"), m = h("value"), b = "Promise.then",
                        _ = null, k = !0, w = !1, S = 0, T = function () {
                            var t = !1;
                            return function (e) {
                                return function () {
                                    t || (t = !0, e.apply(null, arguments))
                                }
                            }
                        }, E = "Promise resolved with itself", O = "object", P = "function", M = h("currentTask"),
                        D = h("rejectionHandledHandler"), x = function () {
                            function t(e) {
                                var n = this;
                                if (!(n instanceof t)) throw new Error("Must be an instanceof Promise.");
                                n[y] = _, n[m] = [];
                                try {
                                    e && e(u(n, k), u(n, w))
                                } catch (t) {
                                    c(n, !1, t)
                                }
                            }

                            return t.toString = function () {
                                return "function ZoneAwarePromise() { [native code] }"
                            }, t.resolve = function (t) {
                                return c(new this(null), k, t)
                            }, t.reject = function (t) {
                                return c(new this(null), w, t)
                            }, t.race = function (t) {
                                function e(t) {
                                    a && (a = r(t))
                                }

                                function n(t) {
                                    a && (a = i(t))
                                }

                                var r, i, a = new this(function (t, e) {
                                    n = F([t, e], 2), r = n[0], i = n[1];
                                    var n
                                });
                                try {
                                    for (var u = j(t), c = u.next(); !c.done; c = u.next()) {
                                        var s = c.value;
                                        o(s) || (s = this.resolve(s)), s.then(e, n)
                                    }
                                } catch (t) {
                                    f = {error: t}
                                } finally {
                                    try {
                                        c && !c.done && (l = u.return) && l.call(u)
                                    } finally {
                                        if (f) throw f.error
                                    }
                                }
                                return a;
                                var f, l
                            }, t.all = function (t) {
                                var e, n, r = new this(function (t, r) {
                                    e = t, n = r
                                }), i = 0, a = [];
                                try {
                                    for (var u = j(t), c = u.next(); !c.done; c = u.next()) {
                                        var s = c.value;
                                        o(s) || (s = this.resolve(s)), s.then(function (t) {
                                            return function (n) {
                                                a[t] = n, --i || e(a)
                                            }
                                        }(i), n), i++
                                    }
                                } catch (t) {
                                    f = {error: t}
                                } finally {
                                    try {
                                        c && !c.done && (l = u.return) && l.call(u)
                                    } finally {
                                        if (f) throw f.error
                                    }
                                }
                                return i || e(a), r;
                                var f, l
                            }, t.prototype.then = function (t, n) {
                                var r = new this.constructor(null), o = e.current;
                                return this[y] == _ ? this[m].push(o, r, t, n) : f(this, o, r, t, n), r
                            }, t.prototype.catch = function (t) {
                                return this.then(null, t)
                            }, t
                        }();
                    x.resolve = x.resolve, x.reject = x.reject, x.race = x.race, x.all = x.all;
                    var I = t[v] = t.Promise, A = e.__symbol__("ZoneAwarePromise"),
                        L = Object.getOwnPropertyDescriptor(t, "Promise");
                    L && !L.configurable || (L && delete L.writable, L && delete L.value, L || (L = {
                        configurable: !0,
                        enumerable: !0
                    }), L.get = function () {
                        return t[A] ? t[A] : t[v]
                    }, L.set = function (e) {
                        e === x ? t[A] = e : (t[v] = e, e.prototype[d] || l(e), n.setNativePromise(e))
                    }, Object.defineProperty(t, "Promise", L)), t.Promise = x;
                    var R = h("thenPatched");
                    if (I) {
                        l(I);
                        var N = t.fetch;
                        typeof N == P && (t.fetch = function (t) {
                            return function () {
                                var e = t.apply(this, arguments);
                                if (e instanceof x) return e;
                                var n = e.constructor;
                                return n[R] || l(n), e
                            }
                        }(N))
                    }
                    return Promise[e.__symbol__("uncaughtPromiseErrors")] = p, x
                });
                var D = Zone.__symbol__,
                    x = "object" == typeof window && window || "object" == typeof self && self || f, I = "function",
                    A = "undefined", L = "removeAttribute",
                    R = "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope,
                    N = !("nw" in x) && void 0 !== x.process && "[object process]" === {}.toString.call(x.process),
                    C = !N && !R && !("undefined" == typeof window || !window.HTMLElement),
                    z = void 0 !== x.process && "[object process]" === {}.toString.call(x.process) && !R && !("undefined" == typeof window || !window.HTMLElement),
                    Z = {}, H = function (t) {
                        if (t = t || x.event) {
                            var e = Z[t.type];
                            e || (e = Z[t.type] = D("ON_PROPERTY" + t.type));
                            var n = this || t.target || x, r = n[e], o = r && r.apply(this, arguments);
                            return void 0 == o || o || t.preventDefault(), o
                        }
                    }, W = D("originalInstance"), B = !1, q = !1;
                Zone.__load_patch("toString", function (t, e, n) {
                    var r = e.__zone_symbol__originalToString = Function.prototype.toString, o = D("OriginalDelegate"),
                        i = D("Promise"), a = D("Error");
                    Function.prototype.toString = function () {
                        if ("function" == typeof this) {
                            var e = this[o];
                            if (e) return "function" == typeof e ? r.apply(this[o], arguments) : Object.prototype.toString.call(e);
                            if (this === Promise) {
                                var n = t[i];
                                if (n) return r.apply(n, arguments)
                            }
                            if (this === Error) {
                                var u = t[a];
                                if (u) return r.apply(u, arguments)
                            }
                        }
                        return r.apply(this, arguments)
                    };
                    var u = Object.prototype.toString;
                    Object.prototype.toString = function () {
                        return this instanceof Promise ? "[object Promise]" : u.apply(this, arguments)
                    }
                });
                var U = function (t, e) {
                        var n = "function" == typeof Symbol && t[Symbol.iterator];
                        if (!n) return t;
                        var r, o, i = n.call(t), a = [];
                        try {
                            for (; (void 0 === e || e-- > 0) && !(r = i.next()).done;) a.push(r.value)
                        } catch (t) {
                            o = {error: t}
                        } finally {
                            try {
                                r && !r.done && (n = i.return) && n.call(i)
                            } finally {
                                if (o) throw o.error
                            }
                        }
                        return a
                    }, V = function () {
                        for (var t = [], e = 0; e < arguments.length; e++) t = t.concat(U(arguments[e]));
                        return t
                    }, G = "true", X = "false", Y = {isUsingGlobalCallback: !0}, K = {}, J = {}, $ = "name", Q = "function",
                    tt = "object", et = "__zone_symbol__", nt = /^__zone_symbol__(\w+)(true|false)$/,
                    rt = "__zone_symbol__propagationStopped", ot = D("zoneTask"),
                    it = Object[D("defineProperty")] = Object.defineProperty,
                    at = Object[D("getOwnPropertyDescriptor")] = Object.getOwnPropertyDescriptor, ut = Object.create,
                    ct = D("unconfigurables"), st = "prototype", ft = "object", lt = "undefined",
                    ht = ["abort", "animationcancel", "animationend", "animationiteration", "auxclick", "beforeinput", "blur", "cancel", "canplay", "canplaythrough", "change", "compositionstart", "compositionupdate", "compositionend", "cuechange", "click", "close", "contextmenu", "curechange", "dblclick", "drag", "dragend", "dragenter", "dragexit", "dragleave", "dragover", "drop", "durationchange", "emptied", "ended", "error", "focus", "focusin", "focusout", "gotpointercapture", "input", "invalid", "keydown", "keypress", "keyup", "load", "loadstart", "loadeddata", "loadedmetadata", "lostpointercapture", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseout", "mouseover", "mouseup", "mousewheel", "orientationchange", "pause", "play", "playing", "pointercancel", "pointerdown", "pointerenter", "pointerleave", "pointerlockchange", "mozpointerlockchange", "webkitpointerlockerchange", "pointerlockerror", "mozpointerlockerror", "webkitpointerlockerror", "pointermove", "pointout", "pointerover", "pointerup", "progress", "ratechange", "reset", "resize", "scroll", "seeked", "seeking", "select", "selectionchange", "selectstart", "show", "sort", "stalled", "submit", "suspend", "timeupdate", "volumechange", "touchcancel", "touchmove", "touchstart", "touchend", "transitioncancel", "transitionend", "waiting", "wheel"],
                    pt = ["afterscriptexecute", "beforescriptexecute", "DOMContentLoaded", "fullscreenchange", "mozfullscreenchange", "webkitfullscreenchange", "msfullscreenchange", "fullscreenerror", "mozfullscreenerror", "webkitfullscreenerror", "msfullscreenerror", "readystatechange", "visibilitychange"],
                    vt = ["absolutedeviceorientation", "afterinput", "afterprint", "appinstalled", "beforeinstallprompt", "beforeprint", "beforeunload", "devicelight", "devicemotion", "deviceorientation", "deviceorientationabsolute", "deviceproximity", "hashchange", "languagechange", "message", "mozbeforepaint", "offline", "online", "paint", "pageshow", "pagehide", "popstate", "rejectionhandled", "storage", "unhandledrejection", "unload", "userproximity", "vrdisplyconnected", "vrdisplaydisconnected", "vrdisplaypresentchange"],
                    dt = ["beforecopy", "beforecut", "beforepaste", "copy", "cut", "paste", "dragstart", "loadend", "animationstart", "search", "transitionrun", "transitionstart", "webkitanimationend", "webkitanimationiteration", "webkitanimationstart", "webkittransitionend"],
                    gt = ["encrypted", "waitingforkey", "msneedkey", "mozinterruptbegin", "mozinterruptend"],
                    yt = ["activate", "afterupdate", "ariarequest", "beforeactivate", "beforedeactivate", "beforeeditfocus", "beforeupdate", "cellchange", "controlselect", "dataavailable", "datasetchanged", "datasetcomplete", "errorupdate", "filterchange", "layoutcomplete", "losecapture", "move", "moveend", "movestart", "propertychange", "resizeend", "resizestart", "rowenter", "rowexit", "rowsdelete", "rowsinserted", "command", "compassneedscalibration", "deactivate", "help", "mscontentzoom", "msmanipulationstatechanged", "msgesturechange", "msgesturedoubletap", "msgestureend", "msgesturehold", "msgesturestart", "msgesturetap", "msgotpointercapture", "msinertiastart", "mslostpointercapture", "mspointercancel", "mspointerdown", "mspointerenter", "mspointerhover", "mspointerleave", "mspointermove", "mspointerout", "mspointerover", "mspointerup", "pointerout", "mssitemodejumplistitemremoved", "msthumbnailclick", "stop", "storagecommit"],
                    mt = ["webglcontextrestored", "webglcontextlost", "webglcontextcreationerror"],
                    bt = ["autocomplete", "autocompleteerror"], _t = ["toggle"], kt = ["load"],
                    wt = ["blur", "error", "focus", "load", "resize", "scroll", "messageerror"],
                    St = ["bounce", "finish", "start"],
                    Tt = ["loadstart", "progress", "abort", "error", "load", "progress", "timeout", "loadend", "readystatechange"],
                    Et = ["upgradeneeded", "complete", "abort", "success", "error", "blocked", "versionchange", "close"],
                    Ot = ["close", "error", "open", "message"], Pt = ["error", "message"],
                    Mt = ht.concat(mt, bt, _t, pt, vt, dt, yt), Ft = D("unbound");
                Zone.__load_patch("util", function (t, e, n) {
                    n.patchOnProperties = o, n.patchMethod = a
                }), Zone.__load_patch("timers", function (t, e, n) {
                    v(t, "set", "clear", "Timeout"), v(t, "set", "clear", "Interval"), v(t, "set", "clear", "Immediate")
                }), Zone.__load_patch("requestAnimationFrame", function (t, e, n) {
                    v(t, "request", "cancel", "AnimationFrame"), v(t, "mozRequest", "mozCancel", "AnimationFrame"), v(t, "webkitRequest", "webkitCancel", "AnimationFrame")
                }), Zone.__load_patch("blocking", function (t, e, n) {
                    for (var r = ["alert", "prompt", "confirm"], o = 0; o < r.length; o++) {
                        a(t, r[o], function (n, r, o) {
                            return function (r, i) {
                                return e.current.run(n, t, i, o)
                            }
                        })
                    }
                }), Zone.__load_patch("EventTarget", function (t, e, n) {
                    P(t, n), O(t, n);
                    var r = t.XMLHttpRequestEventTarget;
                    r && r.prototype && n.patchEventTarget(t, [r.prototype]), i("MutationObserver"), i("WebKitMutationObserver"), i("IntersectionObserver"), i("FileReader")
                }), Zone.__load_patch("on_property", function (t, e, n) {
                    S(n, t), d(), M(t)
                }), Zone.__load_patch("canvas", function (t, e, n) {
                    var r = t.HTMLCanvasElement;
                    void 0 !== r && r.prototype && r.prototype.toBlob && u(r.prototype, "toBlob", function (t, e) {
                        return {name: "HTMLCanvasElement.toBlob", target: t, callbackIndex: 0, args: e}
                    })
                }), Zone.__load_patch("XHR", function (t, e, n) {
                    !function (t) {
                        function n(t) {
                            return t[r]
                        }

                        function s(t) {
                            XMLHttpRequest[u] = !1;
                            var e = t.data, n = e.target, o = n[i];
                            v || (v = n[h], d = n[p]), o && d.apply(n, [y, o]);
                            var a = n[i] = function () {
                                n.readyState === n.DONE && !e.aborted && XMLHttpRequest[u] && t.state === m && t.invoke()
                            };
                            return v.apply(n, [y, a]), n[r] || (n[r] = t), _.apply(n, e.args), XMLHttpRequest[u] = !0, t
                        }

                        function f() {
                        }

                        function l(t) {
                            var e = t.data;
                            return e.aborted = !0, k.apply(e.target, e.args)
                        }

                        var h = D("addEventListener"), p = D("removeEventListener"), v = XMLHttpRequest.prototype[h],
                            d = XMLHttpRequest.prototype[p];
                        if (!v) {
                            var g = t.XMLHttpRequestEventTarget;
                            g && (v = g.prototype[h], d = g.prototype[p])
                        }
                        var y = "readystatechange", m = "scheduled",
                            b = a(t.XMLHttpRequest.prototype, "open", function () {
                                return function (t, e) {
                                    return t[o] = 0 == e[2], t[c] = e[1], b.apply(t, e)
                                }
                            }), _ = a(t.XMLHttpRequest.prototype, "send", function () {
                                return function (t, n) {
                                    var r = e.current;
                                    if (t[o]) return _.apply(t, n);
                                    var i = {target: t, url: t[c], isPeriodic: !1, delay: null, args: n, aborted: !1};
                                    return r.scheduleMacroTask("XMLHttpRequest.send", f, i, s, l)
                                }
                            }), k = a(t.XMLHttpRequest.prototype, "abort", function (t) {
                                return function (t, e) {
                                    var r = n(t);
                                    if (r && "string" == typeof r.type) {
                                        if (null == r.cancelFn || r.data && r.data.aborted) return;
                                        r.zone.cancelTask(r)
                                    }
                                }
                            })
                    }(t);
                    var r = D("xhrTask"), o = D("xhrSync"), i = D("xhrListener"), u = D("xhrScheduled"), c = D("xhrURL")
                }), Zone.__load_patch("geolocation", function (t, n, r) {
                    t.navigator && t.navigator.geolocation && e(t.navigator.geolocation, ["getCurrentPosition", "watchPosition"])
                }), Zone.__load_patch("PromiseRejectionEvent", function (t, e, n) {
                    function r(e) {
                        return function (n) {
                            h(t, e).forEach(function (r) {
                                var o = t.PromiseRejectionEvent;
                                if (o) {
                                    var i = new o(e, {
                                        promise: n.promise, reason: n.rejection
                                    });
                                    r.invoke(i)
                                }
                            })
                        }
                    }

                    t.PromiseRejectionEvent && (e[D("unhandledPromiseRejectionHandler")] = r("unhandledrejection"), e[D("rejectionHandledHandler")] = r("rejectionhandled"))
                })
            })
        });
        !function () {
            "function" != typeof Element.prototype.matches && (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector || function (t) {
                for (var e = this, n = (e.document || e.ownerDocument).querySelectorAll(t), r = 0; n[r] && n[r] !== e;) ++r;
                return Boolean(n[r])
            }), "function" != typeof Element.prototype.closest && (Element.prototype.closest = function (t) {
                for (var e = this; e && 1 === e.nodeType;) {
                    if (e.matches(t)) return e;
                    e = e.parentNode
                }
                return null
            });
            var t = window;
            t.requestAnimationFrame || (t.requestAnimationFrame = t.webkitRequestAnimationFrame, t.cancelAnimationFrame = t.webkitCancelAnimationFrame || t.webkitCancelRequestAnimationFrame, t.requestAnimationFrame || (t.requestAnimationFrame = function (e, n) {
                var r = (new Date).getTime(), o = Math.max(0, 16 - (r - lastTime)), i = t.setTimeout(function () {
                    e(r + o)
                }, o);
                return lastTime = r + o, i
            }), t.cancelAnimationFrame || (t.cancelAnimationFrame = function (t) {
                clearTimeout(t)
            }))
        }(), t.__moduleExports = ke
    }

(
    this
.
    MyBundle = this.MyBundle || {}
);
*!/


}
*/
