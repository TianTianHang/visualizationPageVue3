import N from "plotly.js-dist";
import { resolveDirective as nt, withDirectives as rt, openBlock as it, createElementBlock as ot } from "vue";
const st = [
  "AfterExport",
  "AfterPlot",
  "Animated",
  "AnimatingFrame",
  "AnimationInterrupted",
  "AutoSize",
  "BeforeExport",
  "ButtonClicked",
  "Click",
  "ClickAnnotation",
  "Deselect",
  "DoubleClick",
  "Framework",
  "Hover",
  "LegendClick",
  "LegendDoubleClick",
  "Relayout",
  "Restyle",
  "Redraw",
  "Selected",
  "Selecting",
  "SliderChange",
  "SliderEnd",
  "SliderStart",
  "Transitioning",
  "TransitionInterrupted",
  "Unhover"
], Q = st.map((v) => v.toLocaleLowerCase()).map((v) => ({
  completeName: "plotly_" + v,
  handler: (E) => (..._) => {
    E.$emit.apply(E, [v, ..._]);
  }
})), ct = [
  "restyle",
  "relayout",
  "update",
  "addTraces",
  "deleteTraces",
  "moveTraces",
  "extendTraces",
  "prependTraces",
  "purge",
  "animate"
], at = ct.reduce((v, E) => (v[E] = function(..._) {
  return N[E].apply(N, [this.$el, ..._]);
}, v), {});
function ut(v) {
  const E = /* @__PURE__ */ Object.create(null);
  return function(A) {
    return E[A] || (E[A] = v(A));
  };
}
const ft = /-(\w)/g, ht = ut((v) => v.replace(ft, (E, _) => _ ? _.toUpperCase() : ""));
var K = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof {} < "u" ? {} : typeof self < "u" ? self : {};
function dt(v) {
  return v && v.__esModule && Object.prototype.hasOwnProperty.call(v, "default") ? v.default : v;
}
var Y = { exports: {} }, D = { exports: {} }, J;
function lt() {
  return J || (J = 1, function(v, E) {
    (function(_, A) {
      v.exports = A();
    })(typeof window < "u" ? window : K, function() {
      if (typeof window > "u")
        return null;
      var _ = typeof window < "u" && window.Math == Math ? window : typeof self < "u" && self.Math == Math ? self : Function("return this")(), A = _.requestAnimationFrame || _.mozRequestAnimationFrame || _.webkitRequestAnimationFrame || function(c) {
        return _.setTimeout(c, 20);
      }, i = _.cancelAnimationFrame || _.mozCancelAnimationFrame || _.webkitCancelAnimationFrame || function(c) {
        _.clearTimeout(c);
      };
      function l(c, f) {
        var u = Object.prototype.toString.call(c), y = u === "[object Array]" || u === "[object NodeList]" || u === "[object HTMLCollection]" || u === "[object Object]" || typeof jQuery < "u" && c instanceof jQuery || typeof Elements < "u" && c instanceof Elements, w = 0, h = c.length;
        if (y)
          for (; w < h; w++)
            f(c[w]);
        else
          f(c);
      }
      function t(c) {
        if (!c.getBoundingClientRect)
          return {
            width: c.offsetWidth,
            height: c.offsetHeight
          };
        var f = c.getBoundingClientRect();
        return {
          width: Math.round(f.width),
          height: Math.round(f.height)
        };
      }
      function n(c, f) {
        Object.keys(f).forEach(function(u) {
          c.style[u] = f[u];
        });
      }
      var r = function(c, f) {
        var u = 0;
        function y() {
          var h = [];
          this.add = function(T) {
            h.push(T);
          };
          var m, O;
          this.call = function(T) {
            for (m = 0, O = h.length; m < O; m++)
              h[m].call(this, T);
          }, this.remove = function(T) {
            var o = [];
            for (m = 0, O = h.length; m < O; m++)
              h[m] !== T && o.push(h[m]);
            h = o;
          }, this.length = function() {
            return h.length;
          };
        }
        function w(h, m) {
          if (!!h) {
            if (h.resizedAttached) {
              h.resizedAttached.add(m);
              return;
            }
            h.resizedAttached = new y(), h.resizedAttached.add(m), h.resizeSensor = document.createElement("div"), h.resizeSensor.dir = "ltr", h.resizeSensor.className = "resize-sensor";
            var O = {
              pointerEvents: "none",
              position: "absolute",
              left: "0px",
              top: "0px",
              right: "0px",
              bottom: "0px",
              overflow: "hidden",
              zIndex: "-1",
              visibility: "hidden",
              maxWidth: "100%"
            }, T = {
              position: "absolute",
              left: "0px",
              top: "0px",
              transition: "0s"
            };
            n(h.resizeSensor, O);
            var o = document.createElement("div");
            o.className = "resize-sensor-expand", n(o, O);
            var s = document.createElement("div");
            n(s, T), o.appendChild(s);
            var e = document.createElement("div");
            e.className = "resize-sensor-shrink", n(e, O);
            var d = document.createElement("div");
            n(d, T), n(d, { width: "200%", height: "200%" }), e.appendChild(d), h.resizeSensor.appendChild(o), h.resizeSensor.appendChild(e), h.appendChild(h.resizeSensor);
            var g = window.getComputedStyle(h), I = g ? g.getPropertyValue("position") : null;
            I !== "absolute" && I !== "relative" && I !== "fixed" && I !== "sticky" && (h.style.position = "relative");
            var x = !1, z = 0, p = t(h), b = 0, R = 0, S = !0;
            u = 0;
            var j = function() {
              var L = h.offsetWidth, P = h.offsetHeight;
              s.style.width = L + 10 + "px", s.style.height = P + 10 + "px", o.scrollLeft = L + 10, o.scrollTop = P + 10, e.scrollLeft = L + 10, e.scrollTop = P + 10;
            }, k = function() {
              if (S) {
                var L = h.offsetWidth === 0 && h.offsetHeight === 0;
                if (L) {
                  u || (u = A(function() {
                    u = 0, k();
                  }));
                  return;
                } else
                  S = !1;
              }
              j();
            };
            h.resizeSensor.resetSensor = k;
            var C = function() {
              z = 0, x && (b = p.width, R = p.height, h.resizedAttached && h.resizedAttached.call(p));
            }, F = function() {
              p = t(h), x = p.width !== b || p.height !== R, x && !z && (z = A(C)), k();
            }, q = function(L, P, B) {
              L.attachEvent ? L.attachEvent("on" + P, B) : L.addEventListener(P, B);
            };
            q(o, "scroll", F), q(e, "scroll", F), u = A(function() {
              u = 0, k();
            });
          }
        }
        l(c, function(h) {
          w(h, f);
        }), this.detach = function(h) {
          u || (i(u), u = 0), r.detach(c, h);
        }, this.reset = function() {
          c.resizeSensor.resetSensor();
        };
      };
      if (r.reset = function(c) {
        l(c, function(f) {
          f.resizeSensor.resetSensor();
        });
      }, r.detach = function(c, f) {
        l(c, function(u) {
          !u || u.resizedAttached && typeof f == "function" && (u.resizedAttached.remove(f), u.resizedAttached.length()) || u.resizeSensor && (u.contains(u.resizeSensor) && u.removeChild(u.resizeSensor), delete u.resizeSensor, delete u.resizedAttached);
        });
      }, typeof MutationObserver < "u") {
        var a = new MutationObserver(function(c) {
          for (var f in c)
            if (c.hasOwnProperty(f))
              for (var u = c[f].addedNodes, y = 0; y < u.length; y++)
                u[y].resizeSensor && r.reset(u[y]);
        });
        document.addEventListener("DOMContentLoaded", function(c) {
          a.observe(document.body, {
            childList: !0,
            subtree: !0
          });
        });
      }
      return r;
    });
  }(D)), D.exports;
}
var U, X;
function pt() {
  if (X)
    return U;
  X = 1;
  var v = "Expected a function", E = 0 / 0, _ = "[object Symbol]", A = /^\s+|\s+$/g, i = /^[-+]0x[0-9a-f]+$/i, l = /^0b[01]+$/i, t = /^0o[0-7]+$/i, n = parseInt, r = typeof {} == "object" && {} && {}.Object === Object && {}, a = typeof self == "object" && self && self.Object === Object && self, c = r || a || Function("return this")(), f = Object.prototype, u = f.toString, y = Math.max, w = Math.min, h = function() {
    return c.Date.now();
  };
  function m(e, d, g) {
    var I, x, z, p, b, R, S = 0, j = !1, k = !1, C = !0;
    if (typeof e != "function")
      throw new TypeError(v);
    d = s(d) || 0, O(g) && (j = !!g.leading, k = "maxWait" in g, z = k ? y(s(g.maxWait) || 0, d) : z, C = "trailing" in g ? !!g.trailing : C);
    function F(M) {
      var $ = I, W = x;
      return I = x = void 0, S = M, p = e.apply(W, $), p;
    }
    function q(M) {
      return S = M, b = setTimeout(B, d), j ? F(M) : p;
    }
    function L(M) {
      var $ = M - R, W = M - S, G = d - $;
      return k ? w(G, z - W) : G;
    }
    function P(M) {
      var $ = M - R, W = M - S;
      return R === void 0 || $ >= d || $ < 0 || k && W >= z;
    }
    function B() {
      var M = h();
      if (P(M))
        return V(M);
      b = setTimeout(B, L(M));
    }
    function V(M) {
      return b = void 0, C && I ? F(M) : (I = x = void 0, p);
    }
    function tt() {
      b !== void 0 && clearTimeout(b), S = 0, I = R = x = b = void 0;
    }
    function et() {
      return b === void 0 ? p : V(h());
    }
    function H() {
      var M = h(), $ = P(M);
      if (I = arguments, x = this, R = M, $) {
        if (b === void 0)
          return q(R);
        if (k)
          return b = setTimeout(B, d), F(R);
      }
      return b === void 0 && (b = setTimeout(B, d)), p;
    }
    return H.cancel = tt, H.flush = et, H;
  }
  function O(e) {
    var d = typeof e;
    return !!e && (d == "object" || d == "function");
  }
  function T(e) {
    return !!e && typeof e == "object";
  }
  function o(e) {
    return typeof e == "symbol" || T(e) && u.call(e) == _;
  }
  function s(e) {
    if (typeof e == "number")
      return e;
    if (o(e))
      return E;
    if (O(e)) {
      var d = typeof e.valueOf == "function" ? e.valueOf() : e;
      e = O(d) ? d + "" : d;
    }
    if (typeof e != "string")
      return e === 0 ? e : +e;
    e = e.replace(A, "");
    var g = l.test(e);
    return g || t.test(e) ? n(e.slice(2), g ? 2 : 8) : i.test(e) ? E : +e;
  }
  return U = m, U;
}
(function(v, E) {
  (function(_, A) {
    v.exports = A(lt(), pt());
  })(K, function(_, A) {
    return function(i) {
      function l(n) {
        if (t[n])
          return t[n].exports;
        var r = t[n] = { exports: {}, id: n, loaded: !1 };
        return i[n].call(r.exports, r, r.exports, l), r.loaded = !0, r.exports;
      }
      var t = {};
      return l.m = i, l.c = t, l.p = "/", l(0);
    }([function(i, l, t) {
      var n, r, a;
      (function(c, f) {
        r = [i, l, t(10), t(38), t(39), t(9), t(37)], n = f, a = typeof n == "function" ? n.apply(l, r) : n, a !== void 0 && (i.exports = a);
      })(this, function(c, f, u, y, w) {
        function h(p) {
          return p && p.__esModule ? p : { default: p };
        }
        function m(p) {
          if (!p)
            return { delay: z, initial: !1 };
          var b = p.initial, R = b !== void 0 && b, S = (0, e.default)(p).map(function(j) {
            return parseInt(j);
          }).find(function(j) {
            return !isNaN(j);
          });
          return S = S || z, { delay: S, initial: R };
        }
        function O(p, b) {
          var R = { root: document.documentElement }, S = new IntersectionObserver(function(j, k) {
            j.forEach(function(C) {
              C.isIntersecting && (b(), k.disconnect());
            });
          }, R);
          return S.observe(p), S;
        }
        function T(p, b) {
          var R = b.value, S = b.arg, j = b.options, k = function() {
            return R(p);
          };
          switch (S) {
            case "debounce":
              k = x(function() {
                return R(p);
              }, j.delay);
              break;
            case "throttle":
              k = x(function() {
                return R(p);
              }, j.delay, { leading: !0, trailing: !0, maxWait: j.delay });
          }
          var C = new d.default(p, k);
          return j.initial && R(p), C;
        }
        function o(p, b, R) {
          var S = b.value, j = b.arg, k = b.modifiers, C = R.context;
          if (!S || typeof S != "function")
            return void console.warn("v-resize should received a function as value");
          var F = m(k);
          return C && C.$el === p && C.$once("hook:deactivated", function() {
            s(p), C.$once("hook:activated", function() {
              o(p, { value: S, arg: j, modifiers: k }, { context: C });
            });
          }), p.offsetParent ? void T(p, { value: S, arg: j, options: F }) : (F.initial = !0, void (p.__visibility__listener__ = O(p, function() {
            return T(p, { value: S, arg: j, options: F });
          })));
        }
        function s(p) {
          p.__visibility__listener__ && p.__visibility__listener__.disconnect(), p.resizeSensor && d.default.detach(p);
        }
        Object.defineProperty(f, "__esModule", { value: !0 });
        var e = h(u), d = h(y), g = h(w), I = g.default.debounce, x = I === void 0 ? g.default : I, z = 150;
        f.default = { inserted: o, unbind: s }, c.exports = f.default;
      });
    }, function(i, l) {
      var t = i.exports = { version: "2.4.0" };
      typeof __e == "number" && (__e = t);
    }, function(i, l, t) {
      i.exports = !t(3)(function() {
        return Object.defineProperty({}, "a", { get: function() {
          return 7;
        } }).a != 7;
      });
    }, function(i, l) {
      i.exports = function(t) {
        try {
          return !!t();
        } catch {
          return !0;
        }
      };
    }, function(i, l) {
      var t = i.exports = typeof window < "u" && window.Math == Math ? window : typeof self < "u" && self.Math == Math ? self : Function("return this")();
      typeof __g == "number" && (__g = t);
    }, function(i, l) {
      i.exports = function(t) {
        return typeof t == "object" ? t !== null : typeof t == "function";
      };
    }, function(i, l) {
      i.exports = function(t) {
        if (t == null)
          throw TypeError("Can't call method on  " + t);
        return t;
      };
    }, function(i, l) {
      var t = Math.ceil, n = Math.floor;
      i.exports = function(r) {
        return isNaN(r = +r) ? 0 : (r > 0 ? n : t)(r);
      };
    }, function(i, l, t) {
      var n = t(23), r = t(6);
      i.exports = function(a) {
        return n(r(a));
      };
    }, function(i, l, t) {
      var n, r, a;
      (function(c, f) {
        r = [], n = f, a = typeof n == "function" ? n.apply(l, r) : n, a !== void 0 && (i.exports = a);
      })(this, function() {
        Array.prototype.find || Object.defineProperty(Array.prototype, "find", { value: function(c) {
          if (this == null)
            throw new TypeError('"this" is null or not defined');
          var f = Object(this), u = f.length >>> 0;
          if (typeof c != "function")
            throw new TypeError("predicate must be a function");
          for (var y = arguments[1], w = 0; w < u; ) {
            var h = f[w];
            if (c.call(y, h, w, f))
              return h;
            w++;
          }
        }, configurable: !0, writable: !0 });
      });
    }, function(i, l, t) {
      i.exports = { default: t(11), __esModule: !0 };
    }, function(i, l, t) {
      t(36), i.exports = t(1).Object.keys;
    }, function(i, l) {
      i.exports = function(t) {
        if (typeof t != "function")
          throw TypeError(t + " is not a function!");
        return t;
      };
    }, function(i, l, t) {
      var n = t(5);
      i.exports = function(r) {
        if (!n(r))
          throw TypeError(r + " is not an object!");
        return r;
      };
    }, function(i, l, t) {
      var n = t(8), r = t(32), a = t(31);
      i.exports = function(c) {
        return function(f, u, y) {
          var w, h = n(f), m = r(h.length), O = a(y, m);
          if (c && u != u) {
            for (; m > O; )
              if (w = h[O++], w != w)
                return !0;
          } else
            for (; m > O; O++)
              if ((c || O in h) && h[O] === u)
                return c || O || 0;
          return !c && -1;
        };
      };
    }, function(i, l) {
      var t = {}.toString;
      i.exports = function(n) {
        return t.call(n).slice(8, -1);
      };
    }, function(i, l, t) {
      var n = t(12);
      i.exports = function(r, a, c) {
        if (n(r), a === void 0)
          return r;
        switch (c) {
          case 1:
            return function(f) {
              return r.call(a, f);
            };
          case 2:
            return function(f, u) {
              return r.call(a, f, u);
            };
          case 3:
            return function(f, u, y) {
              return r.call(a, f, u, y);
            };
        }
        return function() {
          return r.apply(a, arguments);
        };
      };
    }, function(i, l, t) {
      var n = t(5), r = t(4).document, a = n(r) && n(r.createElement);
      i.exports = function(c) {
        return a ? r.createElement(c) : {};
      };
    }, function(i, l) {
      i.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
    }, function(i, l, t) {
      var n = t(4), r = t(1), a = t(16), c = t(21), f = "prototype", u = function(y, w, h) {
        var m, O, T, o = y & u.F, s = y & u.G, e = y & u.S, d = y & u.P, g = y & u.B, I = y & u.W, x = s ? r : r[w] || (r[w] = {}), z = x[f], p = s ? n : e ? n[w] : (n[w] || {})[f];
        s && (h = w);
        for (m in h)
          O = !o && p && p[m] !== void 0, O && m in x || (T = O ? p[m] : h[m], x[m] = s && typeof p[m] != "function" ? h[m] : g && O ? a(T, n) : I && p[m] == T ? function(b) {
            var R = function(S, j, k) {
              if (this instanceof b) {
                switch (arguments.length) {
                  case 0:
                    return new b();
                  case 1:
                    return new b(S);
                  case 2:
                    return new b(S, j);
                }
                return new b(S, j, k);
              }
              return b.apply(this, arguments);
            };
            return R[f] = b[f], R;
          }(T) : d && typeof T == "function" ? a(Function.call, T) : T, d && ((x.virtual || (x.virtual = {}))[m] = T, y & u.R && z && !z[m] && c(z, m, T)));
      };
      u.F = 1, u.G = 2, u.S = 4, u.P = 8, u.B = 16, u.W = 32, u.U = 64, u.R = 128, i.exports = u;
    }, function(i, l) {
      var t = {}.hasOwnProperty;
      i.exports = function(n, r) {
        return t.call(n, r);
      };
    }, function(i, l, t) {
      var n = t(24), r = t(28);
      i.exports = t(2) ? function(a, c, f) {
        return n.f(a, c, r(1, f));
      } : function(a, c, f) {
        return a[c] = f, a;
      };
    }, function(i, l, t) {
      i.exports = !t(2) && !t(3)(function() {
        return Object.defineProperty(t(17)("div"), "a", { get: function() {
          return 7;
        } }).a != 7;
      });
    }, function(i, l, t) {
      var n = t(15);
      i.exports = Object("z").propertyIsEnumerable(0) ? Object : function(r) {
        return n(r) == "String" ? r.split("") : Object(r);
      };
    }, function(i, l, t) {
      var n = t(13), r = t(22), a = t(34), c = Object.defineProperty;
      l.f = t(2) ? Object.defineProperty : function(f, u, y) {
        if (n(f), u = a(u, !0), n(y), r)
          try {
            return c(f, u, y);
          } catch {
          }
        if ("get" in y || "set" in y)
          throw TypeError("Accessors not supported!");
        return "value" in y && (f[u] = y.value), f;
      };
    }, function(i, l, t) {
      var n = t(20), r = t(8), a = t(14)(!1), c = t(29)("IE_PROTO");
      i.exports = function(f, u) {
        var y, w = r(f), h = 0, m = [];
        for (y in w)
          y != c && n(w, y) && m.push(y);
        for (; u.length > h; )
          n(w, y = u[h++]) && (~a(m, y) || m.push(y));
        return m;
      };
    }, function(i, l, t) {
      var n = t(25), r = t(18);
      i.exports = Object.keys || function(a) {
        return n(a, r);
      };
    }, function(i, l, t) {
      var n = t(19), r = t(1), a = t(3);
      i.exports = function(c, f) {
        var u = (r.Object || {})[c] || Object[c], y = {};
        y[c] = f(u), n(n.S + n.F * a(function() {
          u(1);
        }), "Object", y);
      };
    }, function(i, l) {
      i.exports = function(t, n) {
        return { enumerable: !(1 & t), configurable: !(2 & t), writable: !(4 & t), value: n };
      };
    }, function(i, l, t) {
      var n = t(30)("keys"), r = t(35);
      i.exports = function(a) {
        return n[a] || (n[a] = r(a));
      };
    }, function(i, l, t) {
      var n = t(4), r = "__core-js_shared__", a = n[r] || (n[r] = {});
      i.exports = function(c) {
        return a[c] || (a[c] = {});
      };
    }, function(i, l, t) {
      var n = t(7), r = Math.max, a = Math.min;
      i.exports = function(c, f) {
        return c = n(c), c < 0 ? r(c + f, 0) : a(c, f);
      };
    }, function(i, l, t) {
      var n = t(7), r = Math.min;
      i.exports = function(a) {
        return a > 0 ? r(n(a), 9007199254740991) : 0;
      };
    }, function(i, l, t) {
      var n = t(6);
      i.exports = function(r) {
        return Object(n(r));
      };
    }, function(i, l, t) {
      var n = t(5);
      i.exports = function(r, a) {
        if (!n(r))
          return r;
        var c, f;
        if (a && typeof (c = r.toString) == "function" && !n(f = c.call(r)) || typeof (c = r.valueOf) == "function" && !n(f = c.call(r)) || !a && typeof (c = r.toString) == "function" && !n(f = c.call(r)))
          return f;
        throw TypeError("Can't convert object to primitive value");
      };
    }, function(i, l) {
      var t = 0, n = Math.random();
      i.exports = function(r) {
        return "Symbol(".concat(r === void 0 ? "" : r, ")_", (++t + n).toString(36));
      };
    }, function(i, l, t) {
      var n = t(33), r = t(26);
      t(27)("keys", function() {
        return function(a) {
          return r(n(a));
        };
      });
    }, function(i, l) {
      (function(t, n) {
        function r(o) {
          this.time = o.time, this.target = o.target, this.rootBounds = o.rootBounds, this.boundingClientRect = o.boundingClientRect, this.intersectionRect = o.intersectionRect || m(), this.isIntersecting = !!o.intersectionRect;
          var s = this.boundingClientRect, e = s.width * s.height, d = this.intersectionRect, g = d.width * d.height;
          e ? this.intersectionRatio = g / e : this.intersectionRatio = this.isIntersecting ? 1 : 0;
        }
        function a(o, s) {
          var e = s || {};
          if (typeof o != "function")
            throw new Error("callback must be a function");
          if (e.root && e.root.nodeType != 1)
            throw new Error("root must be an Element");
          this._checkForIntersections = f(this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT), this._callback = o, this._observationTargets = [], this._queuedEntries = [], this._rootMarginValues = this._parseRootMargin(e.rootMargin), this.thresholds = this._initThresholds(e.threshold), this.root = e.root || null, this.rootMargin = this._rootMarginValues.map(function(d) {
            return d.value + d.unit;
          }).join(" ");
        }
        function c() {
          return t.performance && performance.now && performance.now();
        }
        function f(o, s) {
          var e = null;
          return function() {
            e || (e = setTimeout(function() {
              o(), e = null;
            }, s));
          };
        }
        function u(o, s, e, d) {
          typeof o.addEventListener == "function" ? o.addEventListener(s, e, d || !1) : typeof o.attachEvent == "function" && o.attachEvent("on" + s, e);
        }
        function y(o, s, e, d) {
          typeof o.removeEventListener == "function" ? o.removeEventListener(s, e, d || !1) : typeof o.detatchEvent == "function" && o.detatchEvent("on" + s, e);
        }
        function w(o, s) {
          var e = Math.max(o.top, s.top), d = Math.min(o.bottom, s.bottom), g = Math.max(o.left, s.left), I = Math.min(o.right, s.right), x = I - g, z = d - e;
          return x >= 0 && z >= 0 && { top: e, bottom: d, left: g, right: I, width: x, height: z };
        }
        function h(o) {
          var s;
          try {
            s = o.getBoundingClientRect();
          } catch {
          }
          return s ? (s.width && s.height || (s = { top: s.top, right: s.right, bottom: s.bottom, left: s.left, width: s.right - s.left, height: s.bottom - s.top }), s) : m();
        }
        function m() {
          return { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
        }
        function O(o, s) {
          for (var e = s; e; ) {
            if (e == o)
              return !0;
            e = T(e);
          }
          return !1;
        }
        function T(o) {
          var s = o.parentNode;
          return s && s.nodeType == 11 && s.host ? s.host : s;
        }
        if ("IntersectionObserver" in t && "IntersectionObserverEntry" in t && "intersectionRatio" in t.IntersectionObserverEntry.prototype)
          return void ("isIntersecting" in t.IntersectionObserverEntry.prototype || Object.defineProperty(t.IntersectionObserverEntry.prototype, "isIntersecting", { get: function() {
            return this.intersectionRatio > 0;
          } }));
        a.prototype.THROTTLE_TIMEOUT = 100, a.prototype.POLL_INTERVAL = null, a.prototype.USE_MUTATION_OBSERVER = !0, a.prototype.observe = function(o) {
          var s = this._observationTargets.some(function(e) {
            return e.element == o;
          });
          if (!s) {
            if (!o || o.nodeType != 1)
              throw new Error("target must be an Element");
            this._registerInstance(), this._observationTargets.push({ element: o, entry: null }), this._monitorIntersections(), this._checkForIntersections();
          }
        }, a.prototype.unobserve = function(o) {
          this._observationTargets = this._observationTargets.filter(function(s) {
            return s.element != o;
          }), this._observationTargets.length || (this._unmonitorIntersections(), this._unregisterInstance());
        }, a.prototype.disconnect = function() {
          this._observationTargets = [], this._unmonitorIntersections(), this._unregisterInstance();
        }, a.prototype.takeRecords = function() {
          var o = this._queuedEntries.slice();
          return this._queuedEntries = [], o;
        }, a.prototype._initThresholds = function(o) {
          var s = o || [0];
          return Array.isArray(s) || (s = [s]), s.sort().filter(function(e, d, g) {
            if (typeof e != "number" || isNaN(e) || e < 0 || e > 1)
              throw new Error("threshold must be a number between 0 and 1 inclusively");
            return e !== g[d - 1];
          });
        }, a.prototype._parseRootMargin = function(o) {
          var s = o || "0px", e = s.split(/\s+/).map(function(d) {
            var g = /^(-?\d*\.?\d+)(px|%)$/.exec(d);
            if (!g)
              throw new Error("rootMargin must be specified in pixels or percent");
            return { value: parseFloat(g[1]), unit: g[2] };
          });
          return e[1] = e[1] || e[0], e[2] = e[2] || e[0], e[3] = e[3] || e[1], e;
        }, a.prototype._monitorIntersections = function() {
          this._monitoringIntersections || (this._monitoringIntersections = !0, this.POLL_INTERVAL ? this._monitoringInterval = setInterval(this._checkForIntersections, this.POLL_INTERVAL) : (u(t, "resize", this._checkForIntersections, !0), u(n, "scroll", this._checkForIntersections, !0), this.USE_MUTATION_OBSERVER && "MutationObserver" in t && (this._domObserver = new MutationObserver(this._checkForIntersections), this._domObserver.observe(n, { attributes: !0, childList: !0, characterData: !0, subtree: !0 }))));
        }, a.prototype._unmonitorIntersections = function() {
          this._monitoringIntersections && (this._monitoringIntersections = !1, clearInterval(this._monitoringInterval), this._monitoringInterval = null, y(t, "resize", this._checkForIntersections, !0), y(n, "scroll", this._checkForIntersections, !0), this._domObserver && (this._domObserver.disconnect(), this._domObserver = null));
        }, a.prototype._checkForIntersections = function() {
          var o = this._rootIsInDom(), s = o ? this._getRootRect() : m();
          this._observationTargets.forEach(function(e) {
            var d = e.element, g = h(d), I = this._rootContainsTarget(d), x = e.entry, z = o && I && this._computeTargetAndRootIntersection(d, s), p = e.entry = new r({ time: c(), target: d, boundingClientRect: g, rootBounds: s, intersectionRect: z });
            x ? o && I ? this._hasCrossedThreshold(x, p) && this._queuedEntries.push(p) : x && x.isIntersecting && this._queuedEntries.push(p) : this._queuedEntries.push(p);
          }, this), this._queuedEntries.length && this._callback(this.takeRecords(), this);
        }, a.prototype._computeTargetAndRootIntersection = function(o, s) {
          if (t.getComputedStyle(o).display != "none") {
            for (var e = h(o), d = e, g = T(o), I = !1; !I; ) {
              var x = null, z = g.nodeType == 1 ? t.getComputedStyle(g) : {};
              if (z.display == "none")
                return;
              if (g == this.root || g == n ? (I = !0, x = s) : g != n.body && g != n.documentElement && z.overflow != "visible" && (x = h(g)), x && (d = w(x, d), !d))
                break;
              g = T(g);
            }
            return d;
          }
        }, a.prototype._getRootRect = function() {
          var o;
          if (this.root)
            o = h(this.root);
          else {
            var s = n.documentElement, e = n.body;
            o = { top: 0, left: 0, right: s.clientWidth || e.clientWidth, width: s.clientWidth || e.clientWidth, bottom: s.clientHeight || e.clientHeight, height: s.clientHeight || e.clientHeight };
          }
          return this._expandRectByRootMargin(o);
        }, a.prototype._expandRectByRootMargin = function(o) {
          var s = this._rootMarginValues.map(function(d, g) {
            return d.unit == "px" ? d.value : d.value * (g % 2 ? o.width : o.height) / 100;
          }), e = { top: o.top - s[0], right: o.right + s[1], bottom: o.bottom + s[2], left: o.left - s[3] };
          return e.width = e.right - e.left, e.height = e.bottom - e.top, e;
        }, a.prototype._hasCrossedThreshold = function(o, s) {
          var e = o && o.isIntersecting ? o.intersectionRatio || 0 : -1, d = s.isIntersecting ? s.intersectionRatio || 0 : -1;
          if (e !== d)
            for (var g = 0; g < this.thresholds.length; g++) {
              var I = this.thresholds[g];
              if (I == e || I == d || I < e != I < d)
                return !0;
            }
        }, a.prototype._rootIsInDom = function() {
          return !this.root || O(n, this.root);
        }, a.prototype._rootContainsTarget = function(o) {
          return O(this.root || n, o);
        }, a.prototype._registerInstance = function() {
        }, a.prototype._unregisterInstance = function() {
        }, t.IntersectionObserver = a, t.IntersectionObserverEntry = r;
      })(window, document);
    }, function(i, l) {
      i.exports = _;
    }, function(i, l) {
      i.exports = A;
    }]);
  });
})(Y);
const vt = /* @__PURE__ */ dt(Y.exports), yt = (v, E) => {
  const _ = v.__vccOpts || v;
  for (const [A, i] of E)
    _[A] = i;
  return _;
}, Z = {};
typeof window < "u" && (Z.resize = vt);
const gt = {
  name: "plotly",
  inheritAttrs: !1,
  directives: Z,
  props: {
    data: {
      type: Array
    },
    layout: {
      type: Object
    },
    frames: {
      type: Array
    },
    id: {
      type: String,
      required: !1,
      default: null
    }
  },
  data() {
    return {
      scheduled: null,
      innerLayout: { ...this.layout }
    };
  },
  mounted() {
    N.newPlot(this.$el, { data: this.data, layout: this.innerLayout, config: this.options, frames: this.frames }), Q.forEach((v) => {
      this.$el.on(v.completeName, v.handler(this));
    });
  },
  watch: {
    data: {
      handler() {
        this.schedule({ replot: !0 });
      },
      deep: !0
    },
    options: {
      handler(v, E) {
        JSON.stringify(v) !== JSON.stringify(E) && this.schedule({ replot: !0 });
      },
      deep: !0
    },
    frames: {
      handler() {
        this.schedule({ replot: !0 });
      },
      deep: !0
    },
    layout(v) {
      this.innerLayout = { ...v }, this.schedule({ replot: !1 });
    }
  },
  computed: {
    options() {
      const v = Object.keys(this.$attrs).reduce((E, _) => (E[ht(_)] = this.$attrs[_], E), {});
      return {
        responsive: !1,
        ...v
      };
    }
  },
  beforeDestroy() {
    Q.forEach((v) => this.$el.removeAllListeners(v.completeName)), N.purge(this.$el);
  },
  methods: {
    ...at,
    onResize() {
      N.Plots.resize(this.$el);
    },
    schedule(v) {
      const { scheduled: E } = this;
      if (E) {
        E.replot = E.replot || v.replot;
        return;
      }
      this.scheduled = v, this.$nextTick(() => {
        const {
          scheduled: { replot: _ }
        } = this;
        if (this.scheduled = null, _) {
          this.react();
          return;
        }
        this.relayout(this.innerLayout);
      });
    },
    toImage(v) {
      const E = Object.assign(this.getPrintOptions(), v);
      return N.toImage(this.$el, E);
    },
    downloadImage(v) {
      const E = `plot--${new Date().toISOString()}`, _ = Object.assign(this.getPrintOptions(), { filename: E }, v);
      return N.downloadImage(this.$el, _);
    },
    getPrintOptions() {
      const { $el: v } = this;
      return {
        format: "png",
        width: v.clientWidth,
        height: v.clientHeight
      };
    },
    react() {
      N.react(this.$el, { data: this.data, layout: this.innerLayout, config: this.options, frames: this.frames });
    }
  }
}, mt = ["id"];
function bt(v, E, _, A, i, l) {
  const t = nt("resize");
  return rt((it(), ot("div", { id: _.id }, null, 8, mt)), [
    [
      t,
      l.onResize,
      "debounce",
      { 100: !0 }
    ]
  ]);
}
const xt = /* @__PURE__ */ yt(gt, [["render", bt]]);
export {
  xt as Plotly
};
