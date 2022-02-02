import * as React from "react";
// import { render, unmountComponentAtNode } from "react-dom";
import ReactDOM from "react-dom";
import App from "./App.js";
import "./index.css";

// class KamusCustomElement extends HTMLElement {
// 	constructor() {
// 		super();
// 		this.observer = new MutationObserver(() => this.update());
// 		this.observer.observe(this, { attributes: true });
// 	}
// 	connectedCallback() {
// 		this._innerHTML = this.innerHTML;
// 		this.mount();
// 	}
// 	disconnectedCallback() {
// 		this.unmount();
// 		this.observer.disconnect();
// 	}
// 	update() {
// 		this.unmount();
// 		this.mount();
// 	}
// 	mount() {
// 		console.log("index.js");
// 		render(<App {...this.props} />, this);
// 	}
// 	unmount() {
// 		unmountComponentAtNode(this);
// 	}
// }
// customElements.define("kamus-custom-element", KamusCustomElement);

ReactDOM.render(<App />, document.getElementById("root"));
