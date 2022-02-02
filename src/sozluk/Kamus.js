import React from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import {
	Box,
	Button,
	Grid,
	Tab,
	Tabs,
	TextField,
	MenuItem,
} from "@material-ui/core";

const kulliKamusKolonlari = [
	{
		name: "lisan",
		label: "Lisan",
		options: {
			filter: true,
			sort: true,
		},
	},
	{
		name: "osmYazilis",
		label: "Yazılış",
		options: {
			filter: false,
			sort: true,
		},
	},
	{
		name: "telafuz",
		label: "Telafuz",
		options: {
			filter: false,
			sort: true,
		},
	},
	{
		name: "anlam",
		label: "Anlam",
		options: {
			filter: false,
			sort: true,
		},
	},
	{
		name: "ornek",
		label: "Örnek",
		options: {
			filter: false,
			sort: true,
		},
	},
];

const yerAdlariKolonlari = [
	{
		name: "yer",
		label: "Yer",
		options: {
			filter: false,
			sort: true,
		},
	},
	{
		name: "osmYazilis",
		label: "Yazılış",
		options: {
			filter: false,
			sort: true,
		},
	},
	{
		name: "liva",
		label: "Liva",
		options: {
			filter: false,
			sort: true,
		},
	},
];

const sancakKolonlari = [
	{
		name: "vilayet",
		label: "Vilayet",
		options: {
			filter: false,
			sort: true,
		},
	},
	{
		name: "liva",
		label: "Liva",
		options: {
			filter: false,
			sort: true,
		},
	},
];

const isimKolonlari = [
	{
		name: "koken",
		label: "Köken",
		options: {
			filter: false,
			sort: true,
		},
	},
	{
		name: "osmYazilis",
		label: "Yazılış",
		options: {
			filter: false,
			sort: true,
		},
	},
	{
		name: "isim",
		label: "Isim",
		options: {
			filter: false,
			sort: true,
		},
	},
];

const turkceSiralama = (key) => (a, b) => {
	var atitle = a[key];
	var btitle = b[key];
	var alfabe =
		"AaBbCcÇçDdEeFfGgĞğHhIıİiJjKkLlMmNnOoÖöPpQqRrSsŞşTtUuÜüVvWwXxYyZz0123456789";
	if (atitle.length === 0 || btitle.length === 0) {
		return atitle.length - btitle.length;
	}
	for (var i = 0; i < atitle.length && i < btitle.length; i++) {
		var ai = alfabe.indexOf(atitle[i]);
		var bi = alfabe.indexOf(btitle[i]);
		if (ai !== bi) {
			return ai - bi;
		}
	}
};

class Kamus extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			aramaDegeri: `%باد_`,
			kamusSonuclari: [],
			yerAdiSonuclari: [],
			vilayetLivaSonuclari: [],
			vilayetler: [],
			vilayetAdi: "Ankara",
			tabNumber: 0,
		};
	}

	componentDidMount() {
		this.sonuclariGetir(this.state.aramaDegeri);
		this.vilayetleriGetir();
	}

	kamusArama(aramaDegeri, tabNumber = 0) {
		const aramaYap = aramaDegeri.replaceAll("%", "%25").replaceAll("_", "%5F");
		axios
			.get(
				`http://8.208.84.172:8080/KulliKamus/api/v1/OsmYazilisTanGetir/${aramaYap}`
			)
			.then((res) => {
				const _sonuclar = res.data.resultedArray;
				this.setState({
					kamusSonuclari: _sonuclar,
					aramaDegeri: aramaDegeri,
					tabNumber: tabNumber,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	turkceArama(aramaDegeri, tabNumber = 1) {
		const aramaYap = aramaDegeri.replaceAll("%", "%25").replaceAll("_", "%5F");
		axios
			.get(
				`http://8.208.84.172:8080/KulliKamus/api/v1/TelafuzDanGetir/${aramaYap}`
			)
			.then((res) => {
				const _sonuclar = res.data.resultedArray;
				this.setState({
					kamusSonuclari: _sonuclar,
					aramaDegeri: aramaDegeri,
					tabNumber: tabNumber,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	yerAdiArama(aramaDegeri, tabNumber = 2) {
		const aramaYap = aramaDegeri.replaceAll("%", "%25").replaceAll("_", "%5F");
		axios
			.get(
				`http://8.208.84.172:8080/KulliKamus/api/v1/OsmYazilisTanYerAdiGetir/${aramaYap}`
			)
			.then((res) => {
				const _sonuclar = res.data.resultedArray;
				this.setState({
					yerAdiSonuclari: _sonuclar,
					aramaDegeri: aramaDegeri,
					tabNumber: tabNumber,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	vilayetArama = (vilayetAdi, tabNumber = 3) => {
		const vilayet = vilayetAdi.replaceAll("?", "%3F").replaceAll(" ", "%20");
		axios
			.get(
				`http://8.208.84.172:8080/KulliKamus/api/v1/VilayettenLivalariGetir/` +
					vilayet
			)
			.then((res) => {
				const _sonuclar = res.data.resultedArray;
				this.setState({
					vilayetLivaSonuclari: _sonuclar,
					vilayetAdi: vilayetAdi,
					tabNumber: tabNumber,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	isimArama(aramaDegeri, tabNumber = 4) {
		const aramaYap = aramaDegeri.replaceAll("%", "%25").replaceAll("_", "%5F");
		axios
			.get(`http://8.208.84.172:8080/KulliKamus/api/v1/IsimGetir/${aramaYap}`)
			.then((res) => {
				const _sonuclar = res.data.resultedArray;
				this.setState({
					isimSonuclari: _sonuclar.sort(turkceSiralama("isim")),
					aramaDegeri: aramaDegeri,
					tabNumber: tabNumber,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	vilayetleriGetir = () => {
		axios
			.get(`http://8.208.84.172:8080/KulliKamus/api/v1/VilayetleriGetir`)
			.then((res) => {
				const _sonuclar = res.data.resultedArray;
				this.setState({
					vilayetler: _sonuclar.sort(turkceSiralama("vilayet")),
					vilayetAdi: "Ankara",
					vilayetLivaSonuclari: [],
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	sonuclariGetir = (aramaDegeri) => {
		switch (this.state.tabNumber) {
			case 0: // Osmanlıca Sözlük
				this.kamusArama(aramaDegeri);
				break;
			case 1: // Osmanlıca Sözlük
				this.turkceArama(aramaDegeri);
				break;
			case 2: // Yer Adları
				this.yerAdiArama(aramaDegeri);
				break;
			case 3: // Sancak Bulma
				break;
			case 4: // İsim Bulma
				this.isimArama(aramaDegeri);
				break;
			default:
				break;
		}
	};

	handleChange = (event, value) => {
		switch (value) {
			case 0:
				const defaultKamus = `%باد_`;
				this.kamusArama(defaultKamus);
				break;
			case 1:
				const defaultTelafuz = `Ah%`;
				this.turkceArama(defaultTelafuz);
				break;
			case 2:
				const defaultYerAdi = `%ك%طاغ%`;
				this.yerAdiArama(defaultYerAdi);
				break;
			case 3:
				this.vilayetArama("Ankara");
				break;
			case 4:
				const defaultIsim = `امر%`;
				this.isimArama(defaultIsim);
				break;
			default:
				break;
		}
	};

	vilayetDegisti = (event) => {
		const vilayetAdi = event.target.value;
		this.vilayetArama(vilayetAdi);
	};

	render() {
		const muiDataTableOptions = {
			selectableRows: false,
			// search: false,
			print: false,
			filter: false,
			download: false,
			viewColumns: false,
			textLabels: {
				body: {
					noMatch: "Kayıt bulunamadı",
					toolTip: "Sırala",
					columnHeaderTooltip: (column) => `${column.label} için sırala`,
				},
				pagination: {
					next: "Sonraki Sayfa",
					previous: "Önceki Sayfa",
					rowsPerPage: "Sayfa başına kayıt:",
					displayRows: "toplam",
				},
				toolbar: {
					search: "Ara",
					downloadCsv: "İndir",
					print: "Yazdır",
					viewColumns: "Sütun Gizle",
					filterTable: "Filtrele",
				},
				filter: {
					all: "Tümü",
					title: "FİLTRELE",
					reset: "SIFIRLA",
				},
				viewColumns: {
					title: "Gösterilen Sütunlar",
					titleAria: "Tablo sütunlarını gizle/göster",
				},
				selectedRows: {
					text: "satır(lar) seçildi",
					delete: "Sil",
					deleteAria: "Seçili Satırları Sil",
				},
			},
		};
		const title = (
			<div
				dir={this.state.tabNumber !== 1 ? "rtl" : ""}
				style={{ fontWeight: "bold" }}>
				{this.state.aramaDegeri}
			</div>
		);

		const osmanlicaTextbox = (
			<Grid
				container
				spacing={3}
				align="center"
				justify="center"
				alignItems="center">
				<React.Fragment>
					<Grid item xs={11}>
						<div dir="rtl" style={{ width: "100%" }}>
							<TextField
								label="Aranacak Osmanlıca Kelime"
								variant="outlined"
								onChange={(event) => {
									this.setState({ aramaDegeri: event.target.value });
								}}
								onKeyDown={(e) => {
									if (e.code === 13 || e.keyCode === 13) {
										this.sonuclariGetir(this.state.aramaDegeri);
									}
								}}
								value={this.state.aramaDegeri}
								style={{ width: "100%" }}
							/>
						</div>
					</Grid>
					<Grid item xs={1}>
						<Button
							variant="contained"
							color="primary"
							onClick={() => {
								this.sonuclariGetir(this.state.aramaDegeri);
							}}>
							Ara
						</Button>
					</Grid>
				</React.Fragment>
			</Grid>
		);
		const vilayetAramaDropDown = (
			<TextField
				select
				label="Vilayetler"
				style={{ width: "50%" }}
				onChange={this.vilayetDegisti}
				value={this.state.vilayetAdi}>
				{this.state.vilayetler.map((item) => {
					return <MenuItem value={item.vilayet}>{item.vilayet}</MenuItem>;
				})}
			</TextField>
		);

		const turkceArama = (
			<Grid
				container
				spacing={3}
				align="center"
				justify="center"
				alignItems="center">
				<React.Fragment>
					<Grid item xs={11}>
						<div style={{ width: "100%" }}>
							<TextField
								label="Aranacak Türkçe Telafuz"
								variant="outlined"
								onChange={(event) => {
									this.setState({ aramaDegeri: event.target.value });
								}}
								onKeyDown={(e) => {
									if (e.code === 13 || e.keyCode === 13) {
										this.sonuclariGetir(this.state.aramaDegeri);
									}
								}}
								value={this.state.aramaDegeri}
								style={{ width: "100%" }}
							/>
						</div>
					</Grid>
					<Grid item xs={1}>
						<Button
							variant="contained"
							color="primary"
							onClick={() => {
								this.sonuclariGetir(this.state.aramaDegeri);
							}}>
							Ara
						</Button>
					</Grid>
				</React.Fragment>
			</Grid>
		);

		return (
			<React.Fragment>
				<Box sx={{ width: "100%", bgcolor: "background.paper" }}>
					<Tabs value={this.state.tabNumber} onChange={this.handleChange} centered>
						<Tab label="OSMANLICA SÖZLÜK (OS)" />
						<Tab label="OSMANLICA SÖZLÜK (TR)" />
						<Tab label="YER ADLARI" />
						<Tab label="SANCAK BULMA" />
						<Tab label="İSİM BULMA" />
					</Tabs>
				</Box>

				<br />

				{this.state.tabNumber === 0 ? (
					<React.Fragment>
						{osmanlicaTextbox}
						<MUIDataTable
							title={title}
							data={this.state.kamusSonuclari}
							columns={kulliKamusKolonlari}
							options={muiDataTableOptions}
						/>
					</React.Fragment>
				) : this.state.tabNumber === 1 ? (
					<React.Fragment>
						{turkceArama}
						<MUIDataTable
							title={title}
							data={this.state.kamusSonuclari}
							columns={kulliKamusKolonlari}
							options={muiDataTableOptions}
						/>
					</React.Fragment>
				) : this.state.tabNumber === 2 ? (
					<React.Fragment>
						{osmanlicaTextbox}
						<MUIDataTable
							title={title}
							data={this.state.yerAdiSonuclari}
							columns={yerAdlariKolonlari}
							options={muiDataTableOptions}
						/>
					</React.Fragment>
				) : this.state.tabNumber === 3 ? (
					<React.Fragment>
						{vilayetAramaDropDown}
						<MUIDataTable
							title={this.state.vilayetAdi + " Livaları"}
							data={this.state.vilayetLivaSonuclari}
							columns={sancakKolonlari}
							options={muiDataTableOptions}
						/>
					</React.Fragment>
				) : this.state.tabNumber === 4 ? (
					<React.Fragment>
						{osmanlicaTextbox}
						<MUIDataTable
							title={title}
							data={this.state.isimSonuclari}
							columns={isimKolonlari}
							options={muiDataTableOptions}
						/>
					</React.Fragment>
				) : null}
			</React.Fragment>
		);
	}
}

export default Kamus;
