/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var _a;
const t$2 = globalThis, e$4 = t$2.ShadowRoot && (void 0 === t$2.ShadyCSS || t$2.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s$2 = Symbol(), o$3 = /* @__PURE__ */ new WeakMap();
let n$3 = class n {
  constructor(t2, e2, o2) {
    if (this._$cssResult$ = true, o2 !== s$2)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.o;
    const s2 = this.t;
    if (e$4 && void 0 === t2) {
      const e2 = void 0 !== s2 && 1 === s2.length;
      e2 && (t2 = o$3.get(s2)), void 0 === t2 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e2 && o$3.set(s2, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
};
const r$4 = (t2) => new n$3("string" == typeof t2 ? t2 : t2 + "", void 0, s$2), i$2 = (t2, ...e2) => {
  const o2 = 1 === t2.length ? t2[0] : e2.reduce((e3, s2, o3) => e3 + ((t3) => {
    if (true === t3._$cssResult$)
      return t3.cssText;
    if ("number" == typeof t3)
      return t3;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s2) + t2[o3 + 1], t2[0]);
  return new n$3(o2, t2, s$2);
}, S$1 = (s2, o2) => {
  if (e$4)
    s2.adoptedStyleSheets = o2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet);
  else
    for (const e2 of o2) {
      const o3 = document.createElement("style"), n3 = t$2.litNonce;
      void 0 !== n3 && o3.setAttribute("nonce", n3), o3.textContent = e2.cssText, s2.appendChild(o3);
    }
}, c$2 = e$4 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const s2 of t3.cssRules)
    e2 += s2.cssText;
  return r$4(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: i$1, defineProperty: e$3, getOwnPropertyDescriptor: r$3, getOwnPropertyNames: h$1, getOwnPropertySymbols: o$2, getPrototypeOf: n$2 } = Object, a$1 = globalThis, c$1 = a$1.trustedTypes, l$1 = c$1 ? c$1.emptyScript : "", p$1 = a$1.reactiveElementPolyfillSupport, d$1 = (t2, s2) => t2, u$1 = { toAttribute(t2, s2) {
  switch (s2) {
    case Boolean:
      t2 = t2 ? l$1 : null;
      break;
    case Object:
    case Array:
      t2 = null == t2 ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, s2) {
  let i2 = t2;
  switch (s2) {
    case Boolean:
      i2 = null !== t2;
      break;
    case Number:
      i2 = null === t2 ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        i2 = JSON.parse(t2);
      } catch (t3) {
        i2 = null;
      }
  }
  return i2;
} }, f$1 = (t2, s2) => !i$1(t2, s2), y$1 = { attribute: true, type: String, converter: u$1, reflect: false, hasChanged: f$1 };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), a$1.litPropertyMetadata ?? (a$1.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class b extends HTMLElement {
  static addInitializer(t2) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t2);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t2, s2 = y$1) {
    if (s2.state && (s2.attribute = false), this._$Ei(), this.elementProperties.set(t2, s2), !s2.noAccessor) {
      const i2 = Symbol(), r2 = this.getPropertyDescriptor(t2, i2, s2);
      void 0 !== r2 && e$3(this.prototype, t2, r2);
    }
  }
  static getPropertyDescriptor(t2, s2, i2) {
    const { get: e2, set: h2 } = r$3(this.prototype, t2) ?? { get() {
      return this[s2];
    }, set(t3) {
      this[s2] = t3;
    } };
    return { get() {
      return e2 == null ? void 0 : e2.call(this);
    }, set(s3) {
      const r2 = e2 == null ? void 0 : e2.call(this);
      h2.call(this, s3), this.requestUpdate(t2, r2, i2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) ?? y$1;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d$1("elementProperties")))
      return;
    const t2 = n$2(this);
    t2.finalize(), void 0 !== t2.l && (this.l = [...t2.l]), this.elementProperties = new Map(t2.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d$1("finalized")))
      return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d$1("properties"))) {
      const t3 = this.properties, s2 = [...h$1(t3), ...o$2(t3)];
      for (const i2 of s2)
        this.createProperty(i2, t3[i2]);
    }
    const t2 = this[Symbol.metadata];
    if (null !== t2) {
      const s2 = litPropertyMetadata.get(t2);
      if (void 0 !== s2)
        for (const [t3, i2] of s2)
          this.elementProperties.set(t3, i2);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t3, s2] of this.elementProperties) {
      const i2 = this._$Eu(t3, s2);
      void 0 !== i2 && this._$Eh.set(i2, t3);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s2) {
    const i2 = [];
    if (Array.isArray(s2)) {
      const e2 = new Set(s2.flat(1 / 0).reverse());
      for (const s3 of e2)
        i2.unshift(c$2(s3));
    } else
      void 0 !== s2 && i2.push(c$2(s2));
    return i2;
  }
  static _$Eu(t2, s2) {
    const i2 = s2.attribute;
    return false === i2 ? void 0 : "string" == typeof i2 ? i2 : "string" == typeof t2 ? t2.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var _a2;
    this._$Eg = new Promise((t2) => this.enableUpdating = t2), this._$AL = /* @__PURE__ */ new Map(), this._$ES(), this.requestUpdate(), (_a2 = this.constructor.l) == null ? void 0 : _a2.forEach((t2) => t2(this));
  }
  addController(t2) {
    var _a2;
    (this._$E_ ?? (this._$E_ = /* @__PURE__ */ new Set())).add(t2), void 0 !== this.renderRoot && this.isConnected && ((_a2 = t2.hostConnected) == null ? void 0 : _a2.call(t2));
  }
  removeController(t2) {
    var _a2;
    (_a2 = this._$E_) == null ? void 0 : _a2.delete(t2);
  }
  _$ES() {
    const t2 = /* @__PURE__ */ new Map(), s2 = this.constructor.elementProperties;
    for (const i2 of s2.keys())
      this.hasOwnProperty(i2) && (t2.set(i2, this[i2]), delete this[i2]);
    t2.size > 0 && (this._$Ep = t2);
  }
  createRenderRoot() {
    const t2 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S$1(t2, this.constructor.elementStyles), t2;
  }
  connectedCallback() {
    var _a2;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (_a2 = this._$E_) == null ? void 0 : _a2.forEach((t2) => {
      var _a3;
      return (_a3 = t2.hostConnected) == null ? void 0 : _a3.call(t2);
    });
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var _a2;
    (_a2 = this._$E_) == null ? void 0 : _a2.forEach((t2) => {
      var _a3;
      return (_a3 = t2.hostDisconnected) == null ? void 0 : _a3.call(t2);
    });
  }
  attributeChangedCallback(t2, s2, i2) {
    this._$AK(t2, i2);
  }
  _$EO(t2, s2) {
    var _a2;
    const i2 = this.constructor.elementProperties.get(t2), e2 = this.constructor._$Eu(t2, i2);
    if (void 0 !== e2 && true === i2.reflect) {
      const r2 = (void 0 !== ((_a2 = i2.converter) == null ? void 0 : _a2.toAttribute) ? i2.converter : u$1).toAttribute(s2, i2.type);
      this._$Em = t2, null == r2 ? this.removeAttribute(e2) : this.setAttribute(e2, r2), this._$Em = null;
    }
  }
  _$AK(t2, s2) {
    var _a2;
    const i2 = this.constructor, e2 = i2._$Eh.get(t2);
    if (void 0 !== e2 && this._$Em !== e2) {
      const t3 = i2.getPropertyOptions(e2), r2 = "function" == typeof t3.converter ? { fromAttribute: t3.converter } : void 0 !== ((_a2 = t3.converter) == null ? void 0 : _a2.fromAttribute) ? t3.converter : u$1;
      this._$Em = e2, this[e2] = r2.fromAttribute(s2, t3.type), this._$Em = null;
    }
  }
  requestUpdate(t2, s2, i2, e2 = false, r2) {
    if (void 0 !== t2) {
      if (i2 ?? (i2 = this.constructor.getPropertyOptions(t2)), !(i2.hasChanged ?? f$1)(e2 ? r2 : this[t2], s2))
        return;
      this.C(t2, s2, i2);
    }
    false === this.isUpdatePending && (this._$Eg = this._$EP());
  }
  C(t2, s2, i2) {
    this._$AL.has(t2) || this._$AL.set(t2, s2), true === i2.reflect && this._$Em !== t2 && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(t2);
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$Eg;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return null != t2 && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var _a2;
    if (!this.isUpdatePending)
      return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [t4, s3] of this._$Ep)
          this[t4] = s3;
        this._$Ep = void 0;
      }
      const t3 = this.constructor.elementProperties;
      if (t3.size > 0)
        for (const [s3, i2] of t3)
          true !== i2.wrapped || this._$AL.has(s3) || void 0 === this[s3] || this.C(s3, this[s3], i2);
    }
    let t2 = false;
    const s2 = this._$AL;
    try {
      t2 = this.shouldUpdate(s2), t2 ? (this.willUpdate(s2), (_a2 = this._$E_) == null ? void 0 : _a2.forEach((t3) => {
        var _a3;
        return (_a3 = t3.hostUpdate) == null ? void 0 : _a3.call(t3);
      }), this.update(s2)) : this._$ET();
    } catch (s3) {
      throw t2 = false, this._$ET(), s3;
    }
    t2 && this._$AE(s2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var _a2;
    (_a2 = this._$E_) == null ? void 0 : _a2.forEach((t3) => {
      var _a3;
      return (_a3 = t3.hostUpdated) == null ? void 0 : _a3.call(t3);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$ET() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$Eg;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$Ej && (this._$Ej = this._$Ej.forEach((t3) => this._$EO(t3, this[t3]))), this._$ET();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
}
b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[d$1("elementProperties")] = /* @__PURE__ */ new Map(), b[d$1("finalized")] = /* @__PURE__ */ new Map(), p$1 == null ? void 0 : p$1({ ReactiveElement: b }), (a$1.reactiveElementVersions ?? (a$1.reactiveElementVersions = [])).push("2.0.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1 = globalThis, i = t$1.trustedTypes, s$1 = i ? i.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, e$2 = "$lit$", h = `lit$${(Math.random() + "").slice(9)}$`, o$1 = "?" + h, n$1 = `<${o$1}>`, r$2 = document, l = () => r$2.createComment(""), c = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, a = Array.isArray, u = (t2) => a(t2) || "function" == typeof (t2 == null ? void 0 : t2[Symbol.iterator]), d = "[ 	\n\f\r]", f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v = /-->/g, _ = />/g, m = RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), p = /'/g, g = /"/g, $ = /^(?:script|style|textarea|title)$/i, y = (t2) => (i2, ...s2) => ({ _$litType$: t2, strings: i2, values: s2 }), x = y(1), w = Symbol.for("lit-noChange"), T = Symbol.for("lit-nothing"), A = /* @__PURE__ */ new WeakMap(), E = r$2.createTreeWalker(r$2, 129);
function C(t2, i2) {
  if (!Array.isArray(t2) || !t2.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return void 0 !== s$1 ? s$1.createHTML(i2) : i2;
}
const P = (t2, i2) => {
  const s2 = t2.length - 1, o2 = [];
  let r2, l2 = 2 === i2 ? "<svg>" : "", c2 = f;
  for (let i3 = 0; i3 < s2; i3++) {
    const s3 = t2[i3];
    let a2, u2, d2 = -1, y2 = 0;
    for (; y2 < s3.length && (c2.lastIndex = y2, u2 = c2.exec(s3), null !== u2); )
      y2 = c2.lastIndex, c2 === f ? "!--" === u2[1] ? c2 = v : void 0 !== u2[1] ? c2 = _ : void 0 !== u2[2] ? ($.test(u2[2]) && (r2 = RegExp("</" + u2[2], "g")), c2 = m) : void 0 !== u2[3] && (c2 = m) : c2 === m ? ">" === u2[0] ? (c2 = r2 ?? f, d2 = -1) : void 0 === u2[1] ? d2 = -2 : (d2 = c2.lastIndex - u2[2].length, a2 = u2[1], c2 = void 0 === u2[3] ? m : '"' === u2[3] ? g : p) : c2 === g || c2 === p ? c2 = m : c2 === v || c2 === _ ? c2 = f : (c2 = m, r2 = void 0);
    const x2 = c2 === m && t2[i3 + 1].startsWith("/>") ? " " : "";
    l2 += c2 === f ? s3 + n$1 : d2 >= 0 ? (o2.push(a2), s3.slice(0, d2) + e$2 + s3.slice(d2) + h + x2) : s3 + h + (-2 === d2 ? i3 : x2);
  }
  return [C(t2, l2 + (t2[s2] || "<?>") + (2 === i2 ? "</svg>" : "")), o2];
};
class V {
  constructor({ strings: t2, _$litType$: s2 }, n3) {
    let r2;
    this.parts = [];
    let c2 = 0, a2 = 0;
    const u2 = t2.length - 1, d2 = this.parts, [f2, v2] = P(t2, s2);
    if (this.el = V.createElement(f2, n3), E.currentNode = this.el.content, 2 === s2) {
      const t3 = this.el.content.firstChild;
      t3.replaceWith(...t3.childNodes);
    }
    for (; null !== (r2 = E.nextNode()) && d2.length < u2; ) {
      if (1 === r2.nodeType) {
        if (r2.hasAttributes())
          for (const t3 of r2.getAttributeNames())
            if (t3.endsWith(e$2)) {
              const i2 = v2[a2++], s3 = r2.getAttribute(t3).split(h), e2 = /([.?@])?(.*)/.exec(i2);
              d2.push({ type: 1, index: c2, name: e2[2], strings: s3, ctor: "." === e2[1] ? k : "?" === e2[1] ? H : "@" === e2[1] ? I : R }), r2.removeAttribute(t3);
            } else
              t3.startsWith(h) && (d2.push({ type: 6, index: c2 }), r2.removeAttribute(t3));
        if ($.test(r2.tagName)) {
          const t3 = r2.textContent.split(h), s3 = t3.length - 1;
          if (s3 > 0) {
            r2.textContent = i ? i.emptyScript : "";
            for (let i2 = 0; i2 < s3; i2++)
              r2.append(t3[i2], l()), E.nextNode(), d2.push({ type: 2, index: ++c2 });
            r2.append(t3[s3], l());
          }
        }
      } else if (8 === r2.nodeType)
        if (r2.data === o$1)
          d2.push({ type: 2, index: c2 });
        else {
          let t3 = -1;
          for (; -1 !== (t3 = r2.data.indexOf(h, t3 + 1)); )
            d2.push({ type: 7, index: c2 }), t3 += h.length - 1;
        }
      c2++;
    }
  }
  static createElement(t2, i2) {
    const s2 = r$2.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function N(t2, i2, s2 = t2, e2) {
  var _a2, _b;
  if (i2 === w)
    return i2;
  let h2 = void 0 !== e2 ? (_a2 = s2._$Co) == null ? void 0 : _a2[e2] : s2._$Cl;
  const o2 = c(i2) ? void 0 : i2._$litDirective$;
  return (h2 == null ? void 0 : h2.constructor) !== o2 && ((_b = h2 == null ? void 0 : h2._$AO) == null ? void 0 : _b.call(h2, false), void 0 === o2 ? h2 = void 0 : (h2 = new o2(t2), h2._$AT(t2, s2, e2)), void 0 !== e2 ? (s2._$Co ?? (s2._$Co = []))[e2] = h2 : s2._$Cl = h2), void 0 !== h2 && (i2 = N(t2, h2._$AS(t2, i2.values), h2, e2)), i2;
}
class S {
  constructor(t2, i2) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t2) {
    const { el: { content: i2 }, parts: s2 } = this._$AD, e2 = ((t2 == null ? void 0 : t2.creationScope) ?? r$2).importNode(i2, true);
    E.currentNode = e2;
    let h2 = E.nextNode(), o2 = 0, n3 = 0, l2 = s2[0];
    for (; void 0 !== l2; ) {
      if (o2 === l2.index) {
        let i3;
        2 === l2.type ? i3 = new M(h2, h2.nextSibling, this, t2) : 1 === l2.type ? i3 = new l2.ctor(h2, l2.name, l2.strings, this, t2) : 6 === l2.type && (i3 = new L(h2, this, t2)), this._$AV.push(i3), l2 = s2[++n3];
      }
      o2 !== (l2 == null ? void 0 : l2.index) && (h2 = E.nextNode(), o2++);
    }
    return E.currentNode = r$2, e2;
  }
  p(t2) {
    let i2 = 0;
    for (const s2 of this._$AV)
      void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t2, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t2[i2])), i2++;
  }
}
class M {
  get _$AU() {
    var _a2;
    return ((_a2 = this._$AM) == null ? void 0 : _a2._$AU) ?? this._$Cv;
  }
  constructor(t2, i2, s2, e2) {
    this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t2, this._$AB = i2, this._$AM = s2, this.options = e2, this._$Cv = (e2 == null ? void 0 : e2.isConnected) ?? true;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i2 = this._$AM;
    return void 0 !== i2 && 11 === (t2 == null ? void 0 : t2.nodeType) && (t2 = i2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i2 = this) {
    t2 = N(this, t2, i2), c(t2) ? t2 === T || null == t2 || "" === t2 ? (this._$AH !== T && this._$AR(), this._$AH = T) : t2 !== this._$AH && t2 !== w && this._(t2) : void 0 !== t2._$litType$ ? this.g(t2) : void 0 !== t2.nodeType ? this.$(t2) : u(t2) ? this.T(t2) : this._(t2);
  }
  k(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  $(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.k(t2));
  }
  _(t2) {
    this._$AH !== T && c(this._$AH) ? this._$AA.nextSibling.data = t2 : this.$(r$2.createTextNode(t2)), this._$AH = t2;
  }
  g(t2) {
    var _a2;
    const { values: i2, _$litType$: s2 } = t2, e2 = "number" == typeof s2 ? this._$AC(t2) : (void 0 === s2.el && (s2.el = V.createElement(C(s2.h, s2.h[0]), this.options)), s2);
    if (((_a2 = this._$AH) == null ? void 0 : _a2._$AD) === e2)
      this._$AH.p(i2);
    else {
      const t3 = new S(e2, this), s3 = t3.u(this.options);
      t3.p(i2), this.$(s3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i2 = A.get(t2.strings);
    return void 0 === i2 && A.set(t2.strings, i2 = new V(t2)), i2;
  }
  T(t2) {
    a(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s2, e2 = 0;
    for (const h2 of t2)
      e2 === i2.length ? i2.push(s2 = new M(this.k(l()), this.k(l()), this, this.options)) : s2 = i2[e2], s2._$AI(h2), e2++;
    e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, i2) {
    var _a2;
    for ((_a2 = this._$AP) == null ? void 0 : _a2.call(this, false, true, i2); t2 && t2 !== this._$AB; ) {
      const i3 = t2.nextSibling;
      t2.remove(), t2 = i3;
    }
  }
  setConnected(t2) {
    var _a2;
    void 0 === this._$AM && (this._$Cv = t2, (_a2 = this._$AP) == null ? void 0 : _a2.call(this, t2));
  }
}
class R {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t2, i2, s2, e2, h2) {
    this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t2, this.name = i2, this._$AM = e2, this.options = h2, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = T;
  }
  _$AI(t2, i2 = this, s2, e2) {
    const h2 = this.strings;
    let o2 = false;
    if (void 0 === h2)
      t2 = N(this, t2, i2, 0), o2 = !c(t2) || t2 !== this._$AH && t2 !== w, o2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let n3, r2;
      for (t2 = h2[0], n3 = 0; n3 < h2.length - 1; n3++)
        r2 = N(this, e3[s2 + n3], i2, n3), r2 === w && (r2 = this._$AH[n3]), o2 || (o2 = !c(r2) || r2 !== this._$AH[n3]), r2 === T ? t2 = T : t2 !== T && (t2 += (r2 ?? "") + h2[n3 + 1]), this._$AH[n3] = r2;
    }
    o2 && !e2 && this.O(t2);
  }
  O(t2) {
    t2 === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 ?? "");
  }
}
class k extends R {
  constructor() {
    super(...arguments), this.type = 3;
  }
  O(t2) {
    this.element[this.name] = t2 === T ? void 0 : t2;
  }
}
class H extends R {
  constructor() {
    super(...arguments), this.type = 4;
  }
  O(t2) {
    this.element.toggleAttribute(this.name, !!t2 && t2 !== T);
  }
}
class I extends R {
  constructor(t2, i2, s2, e2, h2) {
    super(t2, i2, s2, e2, h2), this.type = 5;
  }
  _$AI(t2, i2 = this) {
    if ((t2 = N(this, t2, i2, 0) ?? T) === w)
      return;
    const s2 = this._$AH, e2 = t2 === T && s2 !== T || t2.capture !== s2.capture || t2.once !== s2.once || t2.passive !== s2.passive, h2 = t2 !== T && (s2 === T || e2);
    e2 && this.element.removeEventListener(this.name, this, s2), h2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var _a2;
    "function" == typeof this._$AH ? this._$AH.call(((_a2 = this.options) == null ? void 0 : _a2.host) ?? this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class L {
  constructor(t2, i2, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    N(this, t2);
  }
}
const Z = t$1.litHtmlPolyfillSupport;
Z == null ? void 0 : Z(V, M), (t$1.litHtmlVersions ?? (t$1.litHtmlVersions = [])).push("3.1.0");
const j = (t2, i2, s2) => {
  const e2 = (s2 == null ? void 0 : s2.renderBefore) ?? i2;
  let h2 = e2._$litPart$;
  if (void 0 === h2) {
    const t3 = (s2 == null ? void 0 : s2.renderBefore) ?? null;
    e2._$litPart$ = h2 = new M(i2.insertBefore(l(), t3), t3, void 0, s2 ?? {});
  }
  return h2._$AI(t2), h2;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class s extends b {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var _a2;
    const t2 = super.createRenderRoot();
    return (_a2 = this.renderOptions).renderBefore ?? (_a2.renderBefore = t2.firstChild), t2;
  }
  update(t2) {
    const i2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Do = j(i2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var _a2;
    super.connectedCallback(), (_a2 = this._$Do) == null ? void 0 : _a2.setConnected(true);
  }
  disconnectedCallback() {
    var _a2;
    super.disconnectedCallback(), (_a2 = this._$Do) == null ? void 0 : _a2.setConnected(false);
  }
  render() {
    return w;
  }
}
s._$litElement$ = true, s["finalized"] = true, (_a = globalThis.litElementHydrateSupport) == null ? void 0 : _a.call(globalThis, { LitElement: s });
const r$1 = globalThis.litElementPolyfillSupport;
r$1 == null ? void 0 : r$1({ LitElement: s });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.0.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = (t2) => (e2, o2) => {
  void 0 !== o2 ? o2.addInitializer(() => {
    customElements.define(t2, e2);
  }) : customElements.define(t2, e2);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o = { attribute: true, type: String, converter: u$1, reflect: false, hasChanged: f$1 }, r = (t2 = o, e2, r2) => {
  const { kind: n3, metadata: i2 } = r2;
  let s2 = globalThis.litPropertyMetadata.get(i2);
  if (void 0 === s2 && globalThis.litPropertyMetadata.set(i2, s2 = /* @__PURE__ */ new Map()), s2.set(r2.name, t2), "accessor" === n3) {
    const { name: o2 } = r2;
    return { set(r3) {
      const n4 = e2.get.call(this);
      e2.set.call(this, r3), this.requestUpdate(o2, n4, t2);
    }, init(e3) {
      return void 0 !== e3 && this.C(o2, void 0, t2), e3;
    } };
  }
  if ("setter" === n3) {
    const { name: o2 } = r2;
    return function(r3) {
      const n4 = this[o2];
      e2.call(this, r3), this.requestUpdate(o2, n4, t2);
    };
  }
  throw Error("Unsupported decorator location: " + n3);
};
function n2(t2) {
  return (e2, o2) => "object" == typeof o2 ? r(t2, e2, o2) : ((t3, e3, o3) => {
    const r2 = e3.hasOwnProperty(o3);
    return e3.constructor.createProperty(o3, r2 ? { ...t3, wrapped: true } : t3), r2 ? Object.getOwnPropertyDescriptor(e3, o3) : void 0;
  })(t2, e2, o2);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$1 = (e2, t2, c2) => (c2.configurable = true, c2.enumerable = true, Reflect.decorate && "object" != typeof t2 && Object.defineProperty(e2, t2, c2), c2);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function e(e2, r2) {
  return (n3, s2, i2) => {
    const o2 = (t2) => {
      var _a2;
      return ((_a2 = t2.renderRoot) == null ? void 0 : _a2.querySelector(e2)) ?? null;
    };
    if (r2) {
      const { get: e3, set: r3 } = "object" == typeof s2 ? n3 : i2 ?? (() => {
        const t2 = Symbol();
        return { get() {
          return this[t2];
        }, set(e4) {
          this[t2] = e4;
        } };
      })();
      return e$1(n3, s2, { get() {
        let t2 = e3.call(this);
        return void 0 === t2 && (t2 = o2(this), (null !== t2 || this.hasUpdated) && r3.call(this, t2)), t2;
      } });
    }
    return e$1(n3, s2, { get() {
      return o2(this);
    } });
  };
}
class Shader {
  /**
   * Create a shader object.
   * @constructor
   * @param {WebGL2RenderingContext} glContext Context to create the shader with
   * @param {string} vSource Source code for vertex shader
   * @param {string} fSource Source code for fragment shader
   */
  constructor(glContext, vSource, fSource) {
    this.gl = glContext;
    this.program = this.createShaderProgram(vSource, fSource);
  }
  createShaderProgram(vSource, fSource) {
    const gl = this.gl;
    const program = gl.createProgram();
    if (!program)
      throw new Error("Failed to create shader program");
    const vShader = this.createGLShader(vSource, gl.VERTEX_SHADER);
    const fShader = this.createGLShader(fSource, gl.FRAGMENT_SHADER);
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(program);
      throw new Error("Shader program failed to link: " + info);
    }
    gl.deleteShader(vShader);
    gl.deleteShader(fShader);
    return program;
  }
  /**
   * Create a WebGL shader.
   * @param {string} source Shader source code
   * @param {number} type Represents a WebGL shader type
   * @return {WebGLShader} A handle to the new WebGL shader
   */
  createGLShader(source, type) {
    const gl = this.gl;
    const shader = gl.createShader(type);
    if (!shader) {
      throw console.error("Failed to create shader of type " + type);
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const info = gl.getShaderInfoLog(shader);
      throw new Error("Shader compiler error: " + info);
    }
    return shader;
  }
  /**
   * Send a 2-float uniform to to GPU memory.
   * @param {string} name Name for uniform in shader code
   * @param {number} x First float value
   * @param {number} y Second float value
   * @return {boolean} Did the call succeed?
   */
  uniform2f(name, x2, y2) {
    this.use();
    const location = this.gl.getUniformLocation(this.program, name);
    if (location == -1) {
      this.disable();
      return false;
    }
    this.gl.uniform2f(location, x2, y2);
    this.disable();
    return true;
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
    this.disable();
    this.gl.deleteProgram(this.program);
  }
}
function createShader(gl, shader_source) {
  return new Shader(gl, shader_source.Vertex, shader_source.Fragment);
}
const UpdateVertexSource = "#version 300 es\nlayout(location = 0) in vec2 a_pos;\n\nvoid main() {\n  gl_Position = vec4(a_pos, 0.0, 1.0);\n}\n";
const UpdateFragmentSource = "#version 300 es\nprecision highp float;\nuniform sampler2D u_state;\nuniform vec2 u_scale;\nout vec4 color;\n\nint cell_value(vec2 offset) {\n  //Compute uvs from pixel space coordinates\n  vec2 state_coords = (gl_FragCoord.xy + offset) / u_scale;\n  return int(texture(u_state, state_coords));\n}\n\nint neighbors() {\n  int count = 0;\n\n  //Sum up all states\n  count += cell_value(vec2(0,  1));\n  count += cell_value(vec2(1,  1));\n  count += cell_value(vec2(1,  0));\n  count += cell_value(vec2(1, -1));\n  count += cell_value(vec2(0, -1));\n  count += cell_value(vec2(-1,-1));\n  count += cell_value(vec2(-1, 0));\n  count += cell_value(vec2(-1, 1));\n\n  return count;\n}\n\nvoid main() {\n  //Grab number of neighbors\n  int n = neighbors();\n\n  if (n < 2) {\n    color = vec4(0.0, 0.0, 0.0, 1.0);\n    return;\n  }\n  if (n > 3) {\n    color = vec4(0.0, 0.0, 0.0, 1.0);\n    return;\n  }\n  if (n == 3) {\n    color = vec4(1.0, 1.0, 1.0, 1.0);\n    return;\n  }\n  else {\n    float state_color = float(cell_value(vec2(0.0, 0.0)));\n    color = vec4(state_color, state_color, state_color, 1.0);\n    return;\n  }\n}\n";
const DrawVertexSource = "#version 300 es\nprecision highp float;\nlayout(location = 0) in vec2 a_pos;\nout vec2 v_texcoord;\n\nvoid main() {\n  gl_Position = vec4(a_pos, 0.0, 1.0);\n  v_texcoord = vec2((a_pos.x + 1.0)/2.0, (a_pos.y + 1.0)/2.0);\n}\n";
const DrawFragmentSource = "#version 300 es\nprecision highp float;\n\nin vec2 v_texcoord;\n\nuniform sampler2D u_texture;\nout vec4 color;\n\nvoid main() {\n  color = texture(u_texture, v_texcoord);\n}\n";
const UpdateSource = {
  Vertex: UpdateVertexSource,
  Fragment: UpdateFragmentSource
};
const DrawSource = {
  Vertex: DrawVertexSource,
  Fragment: DrawFragmentSource
};
const _AutomataApp = class _AutomataApp {
  /** Create a SimulationApp.
   * @constructor
   * @param {HTMLCanvasElement} canvas A canvas to draw the game on.
   * @param {number} cellWidth The width of a grid cell in pixels.
   */
  constructor(canvas, cellWidth) {
    this.width = 0;
    this.height = 0;
    this.widthInCells = 0;
    this.heightInCells = 0;
    this.curFBIndex = 0;
    this.canvas = canvas;
    this.cellWidth = cellWidth;
    this.regenerateBoundaries();
    const gl = this.gl = this.getWebGLContext(canvas);
    const fb = gl.createFramebuffer();
    if (!fb)
      throw new ReferenceError("Framebuffer creation failed");
    this.framebuffer = fb;
    this.curFBIndex = 0;
    this.FBTextures = [this.createTexture(), this.createTexture()];
    this.regenerateBufferTextures(0.5);
    const va = gl.createVertexArray();
    if (!va)
      throw new ReferenceError("Vertex Array Object creation failed");
    this.vao = va;
    gl.bindVertexArray(this.vao);
    const vertexPosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, _AutomataApp.QUAD_VERTICES, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    this.updateShader = createShader(gl, UpdateSource);
    this.drawShader = createShader(gl, DrawSource);
    this.draw();
  }
  /**
   * Destroy the simulation.
   */
  destroy() {
    const gl = this.gl;
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.deleteTexture(this.FBTextures[0]);
    gl.deleteTexture(this.FBTextures[1]);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.deleteFramebuffer(this.framebuffer);
    gl.deleteVertexArray(this.vao);
    this.updateShader.delete();
    this.drawShader.delete();
  }
  /**
   * Set all grid cells to "dead."
   */
  clear() {
    const gl = this.gl;
    const data = new Uint8Array(4 * this.heightInCells * this.widthInCells);
    data.fill(0);
    data.fill(255, 3, data.length);
    gl.bindTexture(gl.TEXTURE_2D, this.FBTextures[this.curFBIndex]);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      this.widthInCells,
      this.heightInCells,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      data
    );
    this.draw();
  }
  /**
   * Change the cell width of the simulation.
   * @param {number} width The new cell width
   */
  changeCellWidth(width) {
    this.cellWidth = width;
    this.regenerateBoundaries();
    this.clear();
    this.draw();
  }
  /**
   * Mouse input at a particular pixel coordinate in the simulation.
   * @param {number} x x coordinate in pixels
   * @param {number} y y coordinate in pixels
   * @param {boolean} killCell Should inputs kill cells?
   */
  mouseInput(input_pos, killCell = false) {
    const pixelLocation = {
      x: Math.floor(input_pos.x / this.cellWidth),
      y: this.heightInCells - (Math.floor(input_pos.y / this.cellWidth) + 1)
    };
    const gl = this.gl;
    const value = killCell ? 0 : 255;
    const pixelData = new Uint8Array([value, value, value, 255]);
    gl.bindTexture(gl.TEXTURE_2D, this.FBTextures[this.curFBIndex]);
    gl.texSubImage2D(
      gl.TEXTURE_2D,
      0,
      pixelLocation.x,
      pixelLocation.y,
      1,
      1,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      pixelData
    );
    this.draw();
  }
  /**
   * Randomize the simulation's cells.
   * @param {number} percentageAlive Ratio of alive/dead cells
   */
  randomize(percentageAlive = 0.5) {
    this.regenerateBufferTextures(percentageAlive);
    this.draw();
  }
  /**
   * A simulation update tick.
   */
  update() {
    const gl = this.gl;
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
    gl.viewport(0, 0, this.widthInCells, this.heightInCells);
    const nextIndex = this.curFBIndex ^ 1;
    const currentTexture = this.FBTextures[this.curFBIndex];
    const nextTexture = this.FBTextures[nextIndex];
    gl.bindTexture(gl.TEXTURE_2D, currentTexture);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, nextTexture, 0);
    this.updateShader.uniform2f("u_scale", this.widthInCells, this.heightInCells);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    this.updateShader.use();
    gl.bindVertexArray(this.vao);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    this.curFBIndex = nextIndex;
    this.draw();
  }
  /**
   * Creates a `WebGLTexture`, sets the expected parameters, and returns it.
   * @returns The new `WebGLTexture`.
   */
  createTexture() {
    const gl = this.gl;
    const texture = gl.createTexture();
    if (!texture) {
      throw new ReferenceError("Texture creation failed");
    }
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    return texture;
  }
  /**
   * Draw the simulation to canvas.
   */
  draw() {
    const gl = this.gl;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, this.width, this.height);
    gl.bindTexture(gl.TEXTURE_2D, this.FBTextures[this.curFBIndex]);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    this.drawShader.use();
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
  /**
   * Set the simulation boundaries based on canvas dimensions.
   */
  regenerateBoundaries() {
    this.width = this.canvas.width = this.canvas.clientWidth;
    this.height = this.canvas.height = this.canvas.clientHeight;
    this.widthInCells = Math.round(this.width / this.cellWidth);
    this.heightInCells = Math.round(this.height / this.cellWidth);
  }
  /**
   * Generate new buffer textures.
   * @param {number} fractionAlive Ratio of alive/dead cells
   */
  regenerateBufferTextures(fractionAlive = 0.5) {
    const gl = this.gl;
    const pixelCount = this.widthInCells * this.heightInCells;
    for (let i2 = 0; i2 < 2; i2++) {
      const textureArray = this.randomizedTextureArray(pixelCount, fractionAlive);
      gl.bindTexture(gl.TEXTURE_2D, this.FBTextures[i2]);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        this.widthInCells,
        this.heightInCells,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        textureArray
      );
    }
  }
  /**
   * Get an array of rgba values for an input number of pixels.
   * @param {number} pixels Pixel count
   * @param {number} fractionAlive Ratio of alive/dead cells
   * @return {Uint8Array} An array of rgba values
   */
  randomizedTextureArray(pixels, fractionAlive = 0.5) {
    const texArray = new Uint8Array(4 * pixels);
    for (let i2 = 0; i2 < texArray.length; i2 += 4) {
      const value = Math.random() < fractionAlive ? 255 : 0;
      texArray[i2] = value;
      texArray[i2 + 1] = value;
      texArray[i2 + 2] = value;
      texArray[i2 + 3] = 255;
    }
    return texArray;
  }
  /**
   * Get a WebGL rendering context from an input canvas object.
   * @param {HTMLCanvasElement} canvas The input canvas
   * @return {WebGL2RenderingContext} The resulting context
   */
  getWebGLContext(canvas) {
    const gl = canvas.getContext("webgl2", { antialias: false });
    if (!gl)
      throw new Error("No WebGL2 context available");
    return gl;
  }
};
_AutomataApp.QUAD_VERTICES = new Float32Array([-1, -1, -1, 1, 1, -1, 1, 1]);
let AutomataApp = _AutomataApp;
function getCanvasPos(canvas, pos) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: pos.x - rect.left,
    y: pos.y - rect.top
  };
}
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
const LEFT_MOUSE = 0;
const R_KEY = "r";
const C_KEY = "c";
const S_KEY = "s";
const SPACE_KEY = " ";
let WebGLGol = class extends s {
  constructor() {
    super();
    this.cellWidth = 5;
    this.randomizeRatio = 0.5;
    this.updateTimestep = 100;
    this.application = null;
    this.isMouseDown = false;
    this.isPaused = false;
    this.handleMouseDown = (event) => {
      if (!this.application || !this.canvas) {
        return;
      }
      if (event.button == LEFT_MOUSE) {
        this.isMouseDown = true;
        const should_kill = event.ctrlKey;
        const canvas_pos = getCanvasPos(this.canvas, {
          x: event.x,
          y: event.y
        });
        this.application.mouseInput(canvas_pos, should_kill);
      }
    };
    this.handleMouseMove = (event) => {
      if (!this.isMouseDown || !this.application || !this.canvas) {
        return;
      }
      const should_kill = event.ctrlKey;
      const canvas_pos = getCanvasPos(this.canvas, { x: event.x, y: event.y });
      this.application.mouseInput(canvas_pos, should_kill);
    };
    this.handleMouseUp = (event) => {
      if (event.button == LEFT_MOUSE && this.isMouseDown) {
        this.isMouseDown = false;
      }
    };
    this.handleKeyUp = (event) => {
      if (!this.application || !this.canvas) {
        return;
      }
      switch (event.key) {
        case R_KEY:
          this.application.randomize(this.randomizeRatio);
          break;
        case C_KEY:
          this.application.clear();
          break;
        case S_KEY:
          if (this.isPaused) {
            this.application.update();
          }
          break;
        case SPACE_KEY:
          this.isPaused = !this.isPaused;
          event.preventDefault();
          break;
      }
    };
  }
  render() {
    return x` <canvas id="webgl-gol-canvas"></canvas> `;
  }
  connectedCallback() {
    super.connectedCallback();
    setTimeout(() => {
      if (this.canvas == null) {
        throw new Error("Canvas not available");
      }
      this.application = new AutomataApp(this.canvas, this.cellWidth);
      window.addEventListener("keyup", this.handleKeyUp, { passive: true });
      window.addEventListener("mouseup", this.handleMouseUp, { passive: true });
      this.addEventListener("mousemove", this.handleMouseMove, { passive: true });
      this.addEventListener("mousedown", this.handleMouseDown, { passive: true });
      this.updateStep();
    });
  }
  disconnectedCallback() {
    var _a2;
    super.disconnectedCallback();
    window.removeEventListener("keyup", this.handleKeyUp);
    window.removeEventListener("mouseup", this.handleMouseUp);
    this.removeEventListener("mousemove", this.handleMouseMove);
    this.removeEventListener("mousedown", this.handleMouseDown);
    (_a2 = this.application) == null ? void 0 : _a2.destroy();
  }
  updateStep() {
    if (this.application && !this.isPaused) {
      this.application.update();
    }
    setTimeout(() => {
      this.updateStep();
    }, this.updateTimestep);
  }
};
WebGLGol.styles = i$2`
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
__decorateClass([
  n2({ type: Number, attribute: true })
], WebGLGol.prototype, "cellWidth", 2);
__decorateClass([
  n2({ type: Number, attribute: true })
], WebGLGol.prototype, "randomizeRatio", 2);
__decorateClass([
  n2({ type: Number, attribute: true })
], WebGLGol.prototype, "updateTimestep", 2);
__decorateClass([
  e("#webgl-gol-canvas", true)
], WebGLGol.prototype, "canvas", 2);
WebGLGol = __decorateClass([
  t("webgl-gol")
], WebGLGol);
export {
  WebGLGol
};
