/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const B = globalThis, G = B.ShadowRoot && (B.ShadyCSS === void 0 || B.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, V = Symbol(), K = /* @__PURE__ */ new WeakMap();
let lt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== V)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (G && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = K.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && K.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const _t = (r) => new lt(typeof r == "string" ? r : r + "", void 0, V), gt = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, n) => s + ((o) => {
    if (o._$cssResult$ === !0)
      return o.cssText;
    if (typeof o == "number")
      return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[n + 1], r[0]);
  return new lt(e, r, V);
}, $t = (r, t) => {
  if (G)
    r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else
    for (const e of t) {
      const s = document.createElement("style"), i = B.litNonce;
      i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
    }
}, Y = G ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules)
    e += s.cssText;
  return _t(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: mt, defineProperty: vt, getOwnPropertyDescriptor: At, getOwnPropertyNames: yt, getOwnPropertySymbols: Et, getPrototypeOf: bt } = Object, g = globalThis, q = g.trustedTypes, wt = q ? q.emptyScript : "", L = g.reactiveElementPolyfillSupport, S = (r, t) => r, D = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? wt : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, j = (r, t) => !mt(r, t), J = { attribute: !0, type: String, converter: D, reflect: !1, hasChanged: j };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), g.litPropertyMetadata ?? (g.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class y extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = J) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && vt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: n } = At(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get() {
      return i == null ? void 0 : i.call(this);
    }, set(o) {
      const h = i == null ? void 0 : i.call(this);
      n.call(this, o), this.requestUpdate(t, h, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? J;
  }
  static _$Ei() {
    if (this.hasOwnProperty(S("elementProperties")))
      return;
    const t = bt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(S("finalized")))
      return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(S("properties"))) {
      const e = this.properties, s = [...yt(e), ...Et(e)];
      for (const i of s)
        this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0)
        for (const [s, i] of e)
          this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s)
        e.unshift(Y(i));
    } else
      t !== void 0 && e.push(Y(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$Eg = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$ES(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$E_ ?? (this._$E_ = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$E_) == null || e.delete(t);
  }
  _$ES() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys())
      this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return $t(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$E_) == null || t.forEach((e) => {
      var s;
      return (s = e.hostConnected) == null ? void 0 : s.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$E_) == null || t.forEach((e) => {
      var s;
      return (s = e.hostDisconnected) == null ? void 0 : s.call(e);
    });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$EO(t, e) {
    var n;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const o = (((n = s.converter) == null ? void 0 : n.toAttribute) !== void 0 ? s.converter : D).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const o = s.getPropertyOptions(i), h = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((n = o.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? o.converter : D;
      this._$Em = i, this[i] = h.fromAttribute(e, o.type), this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, n) {
    if (t !== void 0) {
      if (s ?? (s = this.constructor.getPropertyOptions(t)), !(s.hasChanged ?? j)(i ? n : this[t], e))
        return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$Eg = this._$EP());
  }
  C(t, e, s) {
    this._$AL.has(t) || this._$AL.set(t, e), s.reflect === !0 && this._$Em !== t && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(t);
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$Eg;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending)
      return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, o] of this._$Ep)
          this[n] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0)
        for (const [n, o] of i)
          o.wrapped !== !0 || this._$AL.has(n) || this[n] === void 0 || this.C(n, this[n], o);
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$E_) == null || s.forEach((i) => {
        var n;
        return (n = i.hostUpdate) == null ? void 0 : n.call(i);
      }), this.update(e)) : this._$ET();
    } catch (i) {
      throw t = !1, this._$ET(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$E_) == null || e.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$ET() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$Eg;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Ej && (this._$Ej = this._$Ej.forEach((e) => this._$EO(e, this[e]))), this._$ET();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[S("elementProperties")] = /* @__PURE__ */ new Map(), y[S("finalized")] = /* @__PURE__ */ new Map(), L == null || L({ ReactiveElement: y }), (g.reactiveElementVersions ?? (g.reactiveElementVersions = [])).push("2.0.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x = globalThis, F = x.trustedTypes, Q = F ? F.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, ct = "$lit$", _ = `lit$${(Math.random() + "").slice(9)}$`, dt = "?" + _, St = `<${dt}>`, v = document, C = () => v.createComment(""), R = (r) => r === null || typeof r != "object" && typeof r != "function", ut = Array.isArray, xt = (r) => ut(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", H = `[ 	
\f\r]`, w = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Z = /-->/g, tt = />/g, $ = RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), et = /'/g, st = /"/g, pt = /^(?:script|style|textarea|title)$/i, Tt = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), Ct = Tt(1), E = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), it = /* @__PURE__ */ new WeakMap(), m = v.createTreeWalker(v, 129);
function ft(r, t) {
  if (!Array.isArray(r) || !r.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return Q !== void 0 ? Q.createHTML(t) : t;
}
const Rt = (r, t) => {
  const e = r.length - 1, s = [];
  let i, n = t === 2 ? "<svg>" : "", o = w;
  for (let h = 0; h < e; h++) {
    const a = r[h];
    let c, u, l = -1, p = 0;
    for (; p < a.length && (o.lastIndex = p, u = o.exec(a), u !== null); )
      p = o.lastIndex, o === w ? u[1] === "!--" ? o = Z : u[1] !== void 0 ? o = tt : u[2] !== void 0 ? (pt.test(u[2]) && (i = RegExp("</" + u[2], "g")), o = $) : u[3] !== void 0 && (o = $) : o === $ ? u[0] === ">" ? (o = i ?? w, l = -1) : u[1] === void 0 ? l = -2 : (l = o.lastIndex - u[2].length, c = u[1], o = u[3] === void 0 ? $ : u[3] === '"' ? st : et) : o === st || o === et ? o = $ : o === Z || o === tt ? o = w : (o = $, i = void 0);
    const f = o === $ && r[h + 1].startsWith("/>") ? " " : "";
    n += o === w ? a + St : l >= 0 ? (s.push(c), a.slice(0, l) + ct + a.slice(l) + _ + f) : a + _ + (l === -2 ? h : f);
  }
  return [ft(r, n + (r[e] || "<?>") + (t === 2 ? "</svg>" : "")), s];
};
class U {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const h = t.length - 1, a = this.parts, [c, u] = Rt(t, e);
    if (this.el = U.createElement(c, s), m.currentNode = this.el.content, e === 2) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (i = m.nextNode()) !== null && a.length < h; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes())
          for (const l of i.getAttributeNames())
            if (l.endsWith(ct)) {
              const p = u[o++], f = i.getAttribute(l).split(_), M = /([.?@])?(.*)/.exec(p);
              a.push({ type: 1, index: n, name: M[2], strings: f, ctor: M[1] === "." ? Pt : M[1] === "?" ? It : M[1] === "@" ? Mt : O }), i.removeAttribute(l);
            } else
              l.startsWith(_) && (a.push({ type: 6, index: n }), i.removeAttribute(l));
        if (pt.test(i.tagName)) {
          const l = i.textContent.split(_), p = l.length - 1;
          if (p > 0) {
            i.textContent = F ? F.emptyScript : "";
            for (let f = 0; f < p; f++)
              i.append(l[f], C()), m.nextNode(), a.push({ type: 2, index: ++n });
            i.append(l[p], C());
          }
        }
      } else if (i.nodeType === 8)
        if (i.data === dt)
          a.push({ type: 2, index: n });
        else {
          let l = -1;
          for (; (l = i.data.indexOf(_, l + 1)) !== -1; )
            a.push({ type: 7, index: n }), l += _.length - 1;
        }
      n++;
    }
  }
  static createElement(t, e) {
    const s = v.createElement("template");
    return s.innerHTML = t, s;
  }
}
function b(r, t, e = r, s) {
  var o, h;
  if (t === E)
    return t;
  let i = s !== void 0 ? (o = e._$Co) == null ? void 0 : o[s] : e._$Cl;
  const n = R(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((h = i == null ? void 0 : i._$AO) == null || h.call(i, !1), n === void 0 ? i = void 0 : (i = new n(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = b(r, i._$AS(r, t.values), i, s)), t;
}
class Ut {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? v).importNode(e, !0);
    m.currentNode = i;
    let n = m.nextNode(), o = 0, h = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let c;
        a.type === 2 ? c = new P(n, n.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (c = new Bt(n, this, t)), this._$AV.push(c), a = s[++h];
      }
      o !== (a == null ? void 0 : a.index) && (n = m.nextNode(), o++);
    }
    return m.currentNode = v, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV)
      s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class P {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = b(this, t, e), R(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== E && this._(t) : t._$litType$ !== void 0 ? this.g(t) : t.nodeType !== void 0 ? this.$(t) : xt(t) ? this.T(t) : this._(t);
  }
  k(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  $(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.k(t));
  }
  _(t) {
    this._$AH !== d && R(this._$AH) ? this._$AA.nextSibling.data = t : this.$(v.createTextNode(t)), this._$AH = t;
  }
  g(t) {
    var n;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = U.createElement(ft(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i)
      this._$AH.p(e);
    else {
      const o = new Ut(i, this), h = o.u(this.options);
      o.p(e), this.$(h), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = it.get(t.strings);
    return e === void 0 && it.set(t.strings, e = new U(t)), e;
  }
  T(t) {
    ut(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const n of t)
      i === e.length ? e.push(s = new P(this.k(C()), this.k(C()), this, this.options)) : s = e[i], s._$AI(n), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const i = t.nextSibling;
      t.remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class O {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, n) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  _$AI(t, e = this, s, i) {
    const n = this.strings;
    let o = !1;
    if (n === void 0)
      t = b(this, t, e, 0), o = !R(t) || t !== this._$AH && t !== E, o && (this._$AH = t);
    else {
      const h = t;
      let a, c;
      for (t = n[0], a = 0; a < n.length - 1; a++)
        c = b(this, h[s + a], e, a), c === E && (c = this._$AH[a]), o || (o = !R(c) || c !== this._$AH[a]), c === d ? t = d : t !== d && (t += (c ?? "") + n[a + 1]), this._$AH[a] = c;
    }
    o && !i && this.O(t);
  }
  O(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Pt extends O {
  constructor() {
    super(...arguments), this.type = 3;
  }
  O(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class It extends O {
  constructor() {
    super(...arguments), this.type = 4;
  }
  O(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class Mt extends O {
  constructor(t, e, s, i, n) {
    super(t, e, s, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = b(this, t, e, 0) ?? d) === E)
      return;
    const s = this._$AH, i = t === d && s !== d || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== d && (s === d || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Bt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    b(this, t);
  }
}
const k = x.litHtmlPolyfillSupport;
k == null || k(U, P), (x.litHtmlVersions ?? (x.litHtmlVersions = [])).push("3.1.0");
const Dt = (r, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new P(t.insertBefore(C(), n), n, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class T extends y {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Dt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return E;
  }
}
var ht;
T._$litElement$ = !0, T.finalized = !0, (ht = globalThis.litElementHydrateSupport) == null || ht.call(globalThis, { LitElement: T });
const W = globalThis.litElementPolyfillSupport;
W == null || W({ LitElement: T });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.0.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ft = (r) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(r, t);
  }) : customElements.define(r, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Nt = { attribute: !0, type: String, converter: D, reflect: !1, hasChanged: j }, Ot = (r = Nt, t, e) => {
  const { kind: s, metadata: i } = e;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), n.set(e.name, r), s === "accessor") {
    const { name: o } = e;
    return { set(h) {
      const a = t.get.call(this);
      t.set.call(this, h), this.requestUpdate(o, a, r);
    }, init(h) {
      return h !== void 0 && this.C(o, void 0, r), h;
    } };
  }
  if (s === "setter") {
    const { name: o } = e;
    return function(h) {
      const a = this[o];
      t.call(this, h), this.requestUpdate(o, a, r);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function X(r) {
  return (t, e) => typeof e == "object" ? Ot(r, t, e) : ((s, i, n) => {
    const o = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, o ? { ...s, wrapped: !0 } : s), o ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(r, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rt = (r, t, e) => (e.configurable = !0, e.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(r, t, e), e);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Lt(r, t) {
  return (e, s, i) => {
    const n = (o) => {
      var h;
      return ((h = o.renderRoot) == null ? void 0 : h.querySelector(r)) ?? null;
    };
    if (t) {
      const { get: o, set: h } = typeof s == "object" ? e : i ?? (() => {
        const a = Symbol();
        return { get() {
          return this[a];
        }, set(c) {
          this[a] = c;
        } };
      })();
      return rt(e, s, { get() {
        let a = o.call(this);
        return a === void 0 && (a = n(this), (a !== null || this.hasUpdated) && h.call(this, a)), a;
      } });
    }
    return rt(e, s, { get() {
      return n(this);
    } });
  };
}
class Ht {
  /**
   * Create a shader object.
   * @constructor
   * @param {WebGL2RenderingContext} glContext Context to create the shader with
   * @param {string} vSource Source code for vertex shader
   * @param {string} fSource Source code for fragment shader
   */
  constructor(t, e, s) {
    this.gl = t, this.program = this.createShaderProgram(e, s);
  }
  createShaderProgram(t, e) {
    const s = this.gl, i = s.createProgram();
    if (!i)
      throw new Error("Failed to create shader program");
    const n = this.createGLShader(t, s.VERTEX_SHADER), o = this.createGLShader(e, s.FRAGMENT_SHADER);
    if (s.attachShader(i, n), s.attachShader(i, o), s.linkProgram(i), !s.getProgramParameter(i, s.LINK_STATUS)) {
      const h = s.getProgramInfoLog(i);
      throw new Error("Shader program failed to link: " + h);
    }
    return s.deleteShader(n), s.deleteShader(o), i;
  }
  /**
   * Create a WebGL shader.
   * @param {string} source Shader source code
   * @param {number} type Represents a WebGL shader type
   * @return {WebGLShader} A handle to the new WebGL shader
   */
  createGLShader(t, e) {
    const s = this.gl, i = s.createShader(e);
    if (!i)
      throw console.error("Failed to create shader of type " + e);
    if (s.shaderSource(i, t), s.compileShader(i), !s.getShaderParameter(i, s.COMPILE_STATUS)) {
      const n = s.getShaderInfoLog(i);
      throw new Error("Shader compiler error: " + n);
    }
    return i;
  }
  /**
   * Send a 2-float uniform to to GPU memory.
   * @param {string} name Name for uniform in shader code
   * @param {number} x First float value
   * @param {number} y Second float value
   * @return {boolean} Did the call succeed?
   */
  uniform2f(t, e, s) {
    this.use();
    const i = this.gl.getUniformLocation(this.program, t);
    return i == -1 ? (this.disable(), !1) : (this.gl.uniform2f(i, e, s), this.disable(), !0);
  }
  /**
   * Instruct WebGL to bind this shader program.
   */
  use() {
    this.gl.useProgram(this.program);
  }
  /**
   * Instruct WebGL to unbind shaders.
   */
  disable() {
    this.gl.useProgram(null);
  }
  /**
   * Delete this shader from GPU memory.
   */
  delete() {
    this.disable(), this.gl.deleteProgram(this.program);
  }
}
function nt(r, t) {
  return new Ht(r, t.Vertex, t.Fragment);
}
const kt = `#version 300 es
layout(location = 0) in vec2 a_pos;

void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`, Wt = `#version 300 es
precision highp float;
uniform sampler2D u_state;
uniform vec2 u_scale;
out vec4 color;

int cell_value(vec2 offset) {
  //Compute uvs from pixel space coordinates
  vec2 state_coords = (gl_FragCoord.xy + offset) / u_scale;
  return int(texture(u_state, state_coords));
}

int neighbors() {
  int count = 0;

  //Sum up all states
  count += cell_value(vec2(0,  1));
  count += cell_value(vec2(1,  1));
  count += cell_value(vec2(1,  0));
  count += cell_value(vec2(1, -1));
  count += cell_value(vec2(0, -1));
  count += cell_value(vec2(-1,-1));
  count += cell_value(vec2(-1, 0));
  count += cell_value(vec2(-1, 1));

  return count;
}

void main() {
  //Grab number of neighbors
  int n = neighbors();

  if (n < 2) {
    color = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }
  if (n > 3) {
    color = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }
  if (n == 3) {
    color = vec4(1.0, 1.0, 1.0, 1.0);
    return;
  }
  else {
    float state_color = float(cell_value(vec2(0.0, 0.0)));
    color = vec4(state_color, state_color, state_color, 1.0);
    return;
  }
}
`, zt = `#version 300 es
precision highp float;
layout(location = 0) in vec2 a_pos;
out vec2 v_texcoord;

void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
  v_texcoord = vec2((a_pos.x + 1.0)/2.0, (a_pos.y + 1.0)/2.0);
}
`, Gt = `#version 300 es
precision highp float;

in vec2 v_texcoord;

uniform sampler2D u_texture;
out vec4 color;

void main() {
  color = texture(u_texture, v_texcoord);
}
`, Vt = {
  Vertex: kt,
  Fragment: Wt
}, jt = {
  Vertex: zt,
  Fragment: Gt
}, N = class N {
  /** Create a SimulationApp.
   * @constructor
   * @param {HTMLCanvasElement} canvas A canvas to draw the game on.
   * @param {number} cellWidth The width of a grid cell in pixels.
   */
  constructor(t, e) {
    this.width = 0, this.height = 0, this.widthInCells = 0, this.heightInCells = 0, this.curFBIndex = 0, this.canvas = t, this.cellWidth = e, this.regenerateBoundaries();
    const s = this.gl = this.getWebGLContext(t), i = s.createFramebuffer();
    if (!i)
      throw new ReferenceError("Framebuffer creation failed");
    this.framebuffer = i, this.curFBIndex = 0, this.FBTextures = [this.createTexture(), this.createTexture()], this.regenerateBufferTextures(0.5);
    const n = s.createVertexArray();
    if (!n)
      throw new ReferenceError("Vertex Array Object creation failed");
    this.vao = n, s.bindVertexArray(this.vao);
    const o = s.createBuffer();
    s.bindBuffer(s.ARRAY_BUFFER, o), s.bufferData(s.ARRAY_BUFFER, N.QUAD_VERTICES, s.STATIC_DRAW), s.enableVertexAttribArray(0), s.vertexAttribPointer(0, 2, s.FLOAT, !1, 0, 0), this.updateShader = nt(s, Vt), this.drawShader = nt(s, jt), this.draw();
  }
  /**
   * Destroy the simulation.
   */
  destroy() {
    const t = this.gl;
    t.bindTexture(t.TEXTURE_2D, null), t.deleteTexture(this.FBTextures[0]), t.deleteTexture(this.FBTextures[1]), t.bindFramebuffer(t.FRAMEBUFFER, null), t.deleteFramebuffer(this.framebuffer), t.deleteVertexArray(this.vao), this.updateShader.delete(), this.drawShader.delete();
  }
  /**
   * Set all grid cells to "dead."
   */
  clear() {
    const t = this.gl, e = new Uint8Array(4 * this.heightInCells * this.widthInCells);
    e.fill(0), e.fill(255, 3, e.length), t.bindTexture(t.TEXTURE_2D, this.FBTextures[this.curFBIndex]), t.texImage2D(
      t.TEXTURE_2D,
      0,
      t.RGBA,
      this.widthInCells,
      this.heightInCells,
      0,
      t.RGBA,
      t.UNSIGNED_BYTE,
      e
    ), this.draw();
  }
  /**
   * Change the cell width of the simulation.
   * @param {number} width The new cell width
   */
  changeCellWidth(t) {
    this.cellWidth = t, this.regenerateBoundaries(), this.clear(), this.draw();
  }
  /**
   * Mouse input at a particular pixel coordinate in the simulation.
   * @param {number} x x coordinate in pixels
   * @param {number} y y coordinate in pixels
   * @param {boolean} killCell Should inputs kill cells?
   */
  mouseInput(t, e = !1) {
    const s = {
      x: Math.floor(t.x / this.cellWidth),
      y: this.heightInCells - (Math.floor(t.y / this.cellWidth) + 1)
    }, i = this.gl, n = e ? 0 : 255, o = new Uint8Array([n, n, n, 255]);
    i.bindTexture(i.TEXTURE_2D, this.FBTextures[this.curFBIndex]), i.texSubImage2D(
      i.TEXTURE_2D,
      0,
      s.x,
      s.y,
      1,
      1,
      i.RGBA,
      i.UNSIGNED_BYTE,
      o
    ), this.draw();
  }
  /**
   * Randomize the simulation's cells.
   * @param {number} percentageAlive Ratio of alive/dead cells
   */
  randomize(t = 0.5) {
    this.regenerateBufferTextures(t), this.draw();
  }
  /**
   * A simulation update tick.
   */
  update() {
    const t = this.gl;
    t.bindFramebuffer(t.FRAMEBUFFER, this.framebuffer), t.viewport(0, 0, this.widthInCells, this.heightInCells);
    const e = this.curFBIndex ^ 1, s = this.FBTextures[this.curFBIndex], i = this.FBTextures[e];
    t.bindTexture(t.TEXTURE_2D, s), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, i, 0), this.updateShader.uniform2f("u_scale", this.widthInCells, this.heightInCells), t.clearColor(0, 0, 0, 1), t.clear(t.COLOR_BUFFER_BIT), this.updateShader.use(), t.bindVertexArray(this.vao), t.drawArrays(t.TRIANGLE_STRIP, 0, 4), this.curFBIndex = e, this.draw();
  }
  /**
   * Creates a `WebGLTexture`, sets the expected parameters, and returns it.
   * @returns The new `WebGLTexture`.
   */
  createTexture() {
    const t = this.gl, e = t.createTexture();
    if (!e)
      throw new ReferenceError("Texture creation failed");
    return t.bindTexture(t.TEXTURE_2D, e), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST), e;
  }
  /**
   * Draw the simulation to canvas.
   */
  draw() {
    const t = this.gl;
    t.bindFramebuffer(t.FRAMEBUFFER, null), t.viewport(0, 0, this.width, this.height), t.bindTexture(t.TEXTURE_2D, this.FBTextures[this.curFBIndex]), t.clearColor(0, 0, 0, 1), t.clear(t.COLOR_BUFFER_BIT), this.drawShader.use(), t.drawArrays(t.TRIANGLE_STRIP, 0, 4);
  }
  /**
   * Set the simulation boundaries based on canvas dimensions.
   */
  regenerateBoundaries() {
    this.width = this.canvas.width = this.canvas.clientWidth, this.height = this.canvas.height = this.canvas.clientHeight, this.widthInCells = Math.round(this.width / this.cellWidth), this.heightInCells = Math.round(this.height / this.cellWidth);
  }
  /**
   * Generate new buffer textures.
   * @param {number} fractionAlive Ratio of alive/dead cells
   */
  regenerateBufferTextures(t = 0.5) {
    const e = this.gl, s = this.widthInCells * this.heightInCells;
    for (let i = 0; i < 2; i++) {
      const n = this.randomizedTextureArray(s, t);
      e.bindTexture(e.TEXTURE_2D, this.FBTextures[i]), e.texImage2D(
        e.TEXTURE_2D,
        0,
        e.RGBA,
        this.widthInCells,
        this.heightInCells,
        0,
        e.RGBA,
        e.UNSIGNED_BYTE,
        n
      );
    }
  }
  /**
   * Get an array of rgba values for an input number of pixels.
   * @param {number} pixels Pixel count
   * @param {number} fractionAlive Ratio of alive/dead cells
   * @return {Uint8Array} An array of rgba values
   */
  randomizedTextureArray(t, e = 0.5) {
    const s = new Uint8Array(4 * t);
    for (let i = 0; i < s.length; i += 4) {
      const n = Math.random() < e ? 255 : 0;
      s[i] = n, s[i + 1] = n, s[i + 2] = n, s[i + 3] = 255;
    }
    return s;
  }
  /**
   * Get a WebGL rendering context from an input canvas object.
   * @param {HTMLCanvasElement} canvas The input canvas
   * @return {WebGL2RenderingContext} The resulting context
   */
  getWebGLContext(t) {
    const e = t.getContext("webgl2", { antialias: !1 });
    if (!e)
      throw new Error("No WebGL2 context available");
    return e;
  }
};
N.QUAD_VERTICES = new Float32Array([-1, -1, -1, 1, 1, -1, 1, 1]);
let z = N;
function ot(r, t) {
  const e = r.getBoundingClientRect();
  return {
    x: t.x - e.left,
    y: t.y - e.top
  };
}
var Xt = Object.defineProperty, Kt = Object.getOwnPropertyDescriptor, I = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Kt(t, e) : t, n = r.length - 1, o; n >= 0; n--)
    (o = r[n]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && Xt(t, e, i), i;
};
const at = 0, Yt = "r", qt = "c", Jt = "s", Qt = " ";
let A = class extends T {
  constructor() {
    super(), this.cellWidth = 5, this.randomizeRatio = 0.5, this.updateTimestep = 100, this.application = null, this.isMouseDown = !1, this.isPaused = !1, this.handleMouseDown = (r) => {
      if (!(!this.application || !this.canvas) && r.button == at) {
        this.isMouseDown = !0;
        const t = r.ctrlKey, e = ot(this.canvas, {
          x: r.x,
          y: r.y
        });
        this.application.mouseInput(e, t);
      }
    }, this.handleMouseMove = (r) => {
      if (!this.isMouseDown || !this.application || !this.canvas)
        return;
      const t = r.ctrlKey, e = ot(this.canvas, { x: r.x, y: r.y });
      this.application.mouseInput(e, t);
    }, this.handleMouseUp = (r) => {
      r.button == at && this.isMouseDown && (this.isMouseDown = !1);
    }, this.handleKeyUp = (r) => {
      if (!(!this.application || !this.canvas))
        switch (r.key) {
          case Yt:
            this.application.randomize(this.randomizeRatio);
            break;
          case qt:
            this.application.clear();
            break;
          case Jt:
            this.isPaused && this.application.update();
            break;
          case Qt:
            this.isPaused = !this.isPaused, r.preventDefault();
            break;
        }
    };
  }
  render() {
    return Ct` <canvas id="webgl-gol-canvas"></canvas> `;
  }
  connectedCallback() {
    super.connectedCallback(), setTimeout(() => {
      if (this.canvas == null)
        throw new Error("Canvas not available");
      this.application = new z(this.canvas, this.cellWidth), window.addEventListener("keyup", this.handleKeyUp, { passive: !0 }), window.addEventListener("mouseup", this.handleMouseUp, { passive: !0 }), this.addEventListener("mousemove", this.handleMouseMove, { passive: !0 }), this.addEventListener("mousedown", this.handleMouseDown, { passive: !0 }), this.updateStep();
    });
  }
  disconnectedCallback() {
    var r;
    super.disconnectedCallback(), window.removeEventListener("keyup", this.handleKeyUp), window.removeEventListener("mouseup", this.handleMouseUp), this.removeEventListener("mousemove", this.handleMouseMove), this.removeEventListener("mousedown", this.handleMouseDown), (r = this.application) == null || r.destroy();
  }
  updateStep() {
    this.application && !this.isPaused && this.application.update(), setTimeout(() => {
      this.updateStep();
    }, this.updateTimestep);
  }
};
A.styles = gt`
    :host {
      display: block;
      width: 100%;
      height: 100vh;
    }

    #webgl-gol-canvas {
      width: 100%;
      height: 100%;
    }
  `;
I([
  X({ type: Number, attribute: !0 })
], A.prototype, "cellWidth", 2);
I([
  X({ type: Number, attribute: !0 })
], A.prototype, "randomizeRatio", 2);
I([
  X({ type: Number, attribute: !0 })
], A.prototype, "updateTimestep", 2);
I([
  Lt("#webgl-gol-canvas", !0)
], A.prototype, "canvas", 2);
A = I([
  Ft("webgl-gol")
], A);
export {
  A as WebGLGol
};
