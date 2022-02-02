import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Kamus from "./sozluk/Kamus";
import KamusHeader from "./sozluk/KamusHeader";

function createPage(Header, Body) {
	return (
		<div className="App">
			<header className="App-header">
				<Header />
			</header>
			<br />
			<body>
				<Body />
			</body>
		</div>
	);
}

function Sozluk() {
	return createPage(KamusHeader, Kamus);
}

const sozluk = <Sozluk />;

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={sozluk} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
