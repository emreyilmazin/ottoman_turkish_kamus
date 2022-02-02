const express = require("express");

const app = express();

const port = 8080;

app.use((req, res, next) => {
	// TODO: log request and responses...  [000001]
	res.header("Access-Control-Allow-Origin", "*");
	next();
});

const Sequelize = require("sequelize");
const sequelize = new Sequelize("postgres://username:postgres@0.0.0.0:0/db");

sequelize
	.authenticate()
	.then(() => {
		console.log("Connection has been established successfully.");
	})
	.catch((err) => {
		console.error("Unable to connect to the database:", err);
	});

const op = Sequelize.Op;

const KulliKamus = sequelize.define(
	"KulliKamus",
	{
		kulliKamusKod: {
			type: Sequelize.INTEGER,
			allowNull: false,
			unique: true,
			primaryKey: true,
			field: "KulliKamusKod",
		},
		telafuz: {
			type: Sequelize.STRING,
			field: "Telafuz",
		},
		lisan: {
			type: Sequelize.STRING,
			field: "Lisan",
		},
		osmYazilis: {
			type: Sequelize.STRING,
			field: "OsmYazilis",
		},
		anlam: {
			type: Sequelize.STRING,
			field: "Anlam",
		},
		ornek: {
			type: Sequelize.STRING,
			field: "Ornek",
		},
		createdAt: {
			type: Sequelize.DATE,
			field: "CreatedAt",
		},
		updatedAt: {
			type: Sequelize.DATE,
			field: "UpdatedAt",
		},
	},
	{
		subQuery: false,
		freezeTableName: true,
	}
);

KulliKamus.sync({ force: false });

const KulliYerler = sequelize.define(
	"KulliYerler",
	{
		kulliYerlerKod: {
			type: Sequelize.INTEGER,
			allowNull: false,
			unique: true,
			primaryKey: true,
			field: "KulliYerlerKod",
		},
		yer: {
			type: Sequelize.STRING,
			field: "Yer",
		},
		osmYazilis: {
			type: Sequelize.STRING,
			field: "OsmYazilis",
		},
		liva: {
			type: Sequelize.STRING,
			field: "Liva",
		},
		createdAt: {
			type: Sequelize.DATE,
			field: "CreatedAt",
		},
		updatedAt: {
			type: Sequelize.DATE,
			field: "UpdatedAt",
		},
	},
	{
		subQuery: false,
		freezeTableName: true,
	}
);

KulliYerler.sync({ force: false });

const VilayetLiva = sequelize.define(
	"VilayetLiva",
	{
		vilayetLivaKod: {
			type: Sequelize.INTEGER,
			allowNull: false,
			unique: true,
			primaryKey: true,
			field: "VilayetLivaKod",
		},
		vilayet: {
			type: Sequelize.STRING,
			field: "Vilayet",
		},
		liva: {
			type: Sequelize.STRING,
			field: "Liva",
		},
		createdAt: {
			type: Sequelize.DATE,
			field: "CreatedAt",
		},
		updatedAt: {
			type: Sequelize.DATE,
			field: "UpdatedAt",
		},
	},
	{
		subQuery: false,
		freezeTableName: true,
	}
);

VilayetLiva.sync({ force: false });

const Muslimin = sequelize.define(
	"Muslimin",
	{
		musliminKod: {
			type: Sequelize.INTEGER,
			allowNull: false,
			unique: true,
			primaryKey: true,
			field: "MusliminKod",
		},
		isim: {
			type: Sequelize.STRING,
			field: "Isim",
		},
		osmYazilis: {
			type: Sequelize.STRING,
			field: "OsmYazilis",
		},
		createdAt: {
			type: Sequelize.DATE,
			field: "CreatedAt",
		},
		updatedAt: {
			type: Sequelize.DATE,
			field: "UpdatedAt",
		},
	},
	{
		subQuery: false,
		freezeTableName: true,
	}
);

Muslimin.sync({ force: false });

const GayriMuslimin = sequelize.define(
	"GayriMuslimin",
	{
		gayriMusliminKod: {
			type: Sequelize.INTEGER,
			allowNull: false,
			unique: true,
			primaryKey: true,
			field: "GayriMusliminKod",
		},
		isim: {
			type: Sequelize.STRING,
			field: "Isim",
		},
		osmYazilis: {
			type: Sequelize.STRING,
			field: "OsmYazilis",
		},
		createdAt: {
			type: Sequelize.DATE,
			field: "CreatedAt",
		},
		updatedAt: {
			type: Sequelize.DATE,
			field: "UpdatedAt",
		},
	},
	{
		subQuery: false,
		freezeTableName: true,
	}
);

GayriMuslimin.sync({ force: false });

const getDataLimit = 250;

app.get(
	"/KulliKamus/api/v1/OsmYazilisTanGetir/:osmYazilis",
	async (req, res) => {
		const osmYazilis = req.params.osmYazilis;
		try {
			const kelime = await KulliKamus.findAll({
				where: {
					osmYazilis: {
						[op.iLike]: osmYazilis,
					},
				},
				limit: getDataLimit,
			});
			res.json({ resultedArray: kelime });
		} catch (error) {
			console.error(error);
		}
	}
);

app.get(
	"/KulliKamus/api/v1/TelafuzDanGetir/:turkceKelime",
	async (req, res) => {
		const turkceKelime = req.params.turkceKelime;
		try {
			const kelime = await KulliKamus.findAll({
				where: {
					telafuz: {
						[op.iLike]: turkceKelime,
					},
				},
				limit: getDataLimit,
			});
			res.json({ resultedArray: kelime });
		} catch (error) {
			console.error(error);
		}
	}
);

app.get("/KulliKamus/api/v1/VilayetleriGetir/", async (req, res) => {
	try {
		const vilayetLiva = await VilayetLiva.findAll({
			attributes: [
				["Vilayet", "vilayet"],
				sequelize.fn("count", sequelize.col("Liva")),
			],
			group: ["vilayet"],
		});
		res.json({ resultedArray: vilayetLiva });
	} catch (error) {
		console.error(error);
	}
});

app.get(
	"/KulliKamus/api/v1/VilayettenLivalariGetir/:vilayet",
	async (req, res) => {
		try {
			const vilayet = req.params.vilayet;
			const vilayetLiva = await VilayetLiva.findAll({
				where: {
					vilayet: vilayet,
				},
			});
			res.json({ resultedArray: vilayetLiva });
		} catch (error) {
			console.error(error);
		}
	}
);

app.get(
	"/KulliKamus/api/v1/OsmYazilisTanYerAdiGetir/:osmYazilis",
	async (req, res) => {
		const osmYazilis = req.params.osmYazilis;
		try {
			const yer = await KulliYerler.findAll({
				where: {
					osmYazilis: {
						[op.iLike]: osmYazilis,
					},
				},
				limit: getDataLimit,
			});
			res.json({ resultedArray: yer });
		} catch (error) {
			console.error(error);
		}
	}
);

app.get("/KulliKamus/api/v1/IsimGetir/:osmYazilis", async (req, res) => {
	const osmYazilis = req.params.osmYazilis;
	try {
		const muslimIsim = await Muslimin.findAll({
			where: {
				osmYazilis: {
					[op.iLike]: osmYazilis,
				},
			},
			limit: getDataLimit,
		});
		const gayriMuslimIsim = await GayriMuslimin.findAll({
			where: {
				osmYazilis: {
					[op.iLike]: osmYazilis,
				},
			},
			limit: getDataLimit,
		});
		const muslimIsimArray = muslimIsim.map((item) => {
			return {
				isim: item.isim,
				osmYazilis: item.osmYazilis,
				koken: "Muslim",
			};
		});
		const gayriMuslimIsimArray = gayriMuslimIsim.map((item) => {
			return {
				isim: item.isim,
				osmYazilis: item.osmYazilis,
				koken: "GayriMuslim",
			};
		});

		res.json({ resultedArray: muslimIsimArray.concat(gayriMuslimIsimArray) });
	} catch (error) {
		console.error(error);
	}
});

app.listen(port, () => console.log(`Kamus-API listening on port ${port}!`));
