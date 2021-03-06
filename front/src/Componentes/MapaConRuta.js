import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import './Mapa.css';
import { BrowserRouter as Router, Route, Link, withRouter, Switch } from "react-router-dom";
import LlenarFormulario from "./LlenarFormulario.js";

mapboxgl.accessToken = "pk.eyJ1IjoibG1heWExMCIsImEiOiJjazNwOWo0ODUwMHVlM25xYzJ6d3czMTAwIn0.l_Mep-KqFaX4k96TX3LhAw";
class MapaConRuta extends React.Component {
// Code from the next few steps will go here

constructor(props) {
	super(props);
	this.state = {
		lng: -74.065248,
		lat: 4.700295,
		zoom: 10,
		distancia:0,
		altura:0,
		tiempo:"",
		nombre:"Ruta",
		publico:false,
		idRuta:"",

	};
	this.cambiarEstado = this.cambiarEstado.bind(this)
	this.cambiarEstado2 = this.cambiarEstado2.bind(this)

	this.latitudes = [];
	this.longitudes = [];
	this.colores = [];

	//Usaquen
	this.latitudes[0]= 4.71035;
	this.longitudes[0]= -74.03027777777778;
	this.colores[0] = "#000000";

	//Suba
	this.latitudes[1]=4.76136276992;
	this.longitudes[1]=-74.0934833338;
	this.colores[1] = "#000000";

	//Barrios
	this.latitudes[2]=4.65847916299;
	this.longitudes[2]=-74.0839666663;
	this.colores[2] = "#000000";

	//Chapinero
	this.latitudes[3]=4.76439611097;
	this.longitudes[3]=-74.0275722217;
	this.colorChapinero = "#000000";

	//SantaFe
	this.latitudes[4]=4.6255624094;
	this.longitudes[4]=-74.066866667;
	this.colores[4]= "#000000";

	//Engativa
	this.latitudes[5]= 4.6907125821;
	this.longitudes[5]= -74.082483333;
	this.colores[5] = "#000000";

	//Fontibon
	this.latitudes[6]=4.67011252722;
	this.longitudes[6]=-74.1415500001;
	this.colores[6] = "#000000";

	//Puente
	this.latitudes[7]=4.63177909158;
	this.longitudes[7]=-74.1174833332;
	this.colores[7]= "#000000";

	//SanCristo
	this.latitudes[8]=4.57266226838;
	this.longitudes[8]= -74.0837999995;
	this.colores[8] = "#000000";

	//Kennedy
	this.latitudes[9]=4.59562899578;
	this.longitudes[9]=-74.1485833331;
	this.colores[9] = "#000000";

	//Tunjuelito
	this.latitudes[10]=4.57629561124;
	this.longitudes[10]=-74.130966666;
	this.colores[10] = "#000000";


	this.geoJsonRuta="";

}

componentDidMount() {
	const map = new mapboxgl.Map({
		container: this.mapContainer,
		style: 'mapbox://styles/mapbox/streets-v11',
		center: [this.state.lng, this.state.lat],
		zoom: this.state.zoom
	});

	for(let i = 0; i < this.latitudes.length; i++)
	{
		let url = 'https://api.waqi.info/feed/geo:'+this.latitudes[i]+';'+this.longitudes[i]+'/?token=dff319f47044fe2a774b924e794aead02b2d5e12';

		fetch(url)
		.then(res => res.json())
		.then(data => {
			let calidad = data.data.aqi;
			if(calidad < 50)
			{
				this.colores[i] = "#009865";
			}
			else if(calidad < 100)
			{
				this.colores[i] = "#FEDE33";
			}
			else if(calidad < 150)
			{
				this.colores[i] = "#FF9935";
			}
			else if(calidad < 200)
			{
				this.colores[i] = "#CC0033";
			}
			else if(calidad < 300)
			{
				this.colores[i] = "#670097";
			}
			else
			{
				this.colores[i] = "#820024";
			}
		});
	}




	if(this.props.user !== null)
	{
		let token = "Bearer "+ this.props.user.token;
		var myHeaders = new Headers();
		myHeaders.append("Authorization", token);

		let myInit = { method: 'GET',
		headers: {
			'Authorization': token
		},
		mode: 'cors',
		cache: 'default' };

		console.log("token", token);
		let urlRuta = "https://www.strava.com/api/v3/routes/" + this.props.ruta + "/streams";



		fetch(urlRuta, myInit)
		.then(res => res.json())
		.then(data => {
			this.geoJsonRuta = {
					"type": "Feature",
					"geometry": {
						"type": "LineString",
						"coordinates": []
					}
			};
			for(let i = 0; i < data[0].data.length ; i++)
			{
				this.geoJsonRuta.geometry.coordinates.push([+data[0].data[i][1],data[0].data[i][0]])
			}
		})

		let urlRutaData = "https://www.strava.com/api/v3/routes/" + this.props.ruta;

		console.log("URL RUTA", urlRutaData);

		fetch(urlRutaData, myInit)
		.then(res => res.json())
		.then(data => {
			console.log("DATA RUTA ", data)

			this.setState({altura: data.elevation_gain.toFixed(2)})
			this.setState({distancia: data.distance.toFixed(2)})
			this.setState({nombre: data.name})
			this.setState({idRuta: data.id})
			let segundos = data.estimated_moving_time;
			this.setState({tiempo:  new Date(segundos * 1000).toISOString().substr(11, 8)})

		})

	}

	map.on('move', () => {
		this.setState({
			lng: map.getCenter().lng.toFixed(4),
			lat: map.getCenter().lat.toFixed(4),
			zoom: map.getZoom().toFixed(2)
		});
	}
	);

	map.on('load', () => {
		console.log("GeoJsonLoad ", this.geoJsonRuta);

			map.addSource(
				"Ruta",
				{"type": "geojson",
     			"data": {
       		"type": "FeatureCollection",
      	 	"features": [this.geoJsonRuta]
     			}
     		}
			);

			map.addLayer({
				'id': 'usaquen',
				'type': 'fill',
				'source': {
					'type': 'geojson',
					'data': {
						'type': 'Feature',
						'geometry': {
							'type': 'Polygon',
							'coordinates': [[[-74.0326921,4.8397948],
							[-74.0559874,4.6997822],
							[-74.0194235,4.6908858],
							[-74.0181011,4.6905761],
							[-74.0160412,4.6987882],
							[-74.0143246,4.7052894],
							[-74.011578,4.7141857],
							[-74.0112347,4.7247926],
							[-74.0129513,4.7350572],
							[-74.0146679,4.7473745],
							[-74.0181011,4.7566124],
							[-74.020161,4.7672186],
							[-74.0225643,4.7791932],
							[-74.0249676,4.7853515],
							[-74.0249676,4.7969837],
							[-74.0249676,4.8079315],
							[-74.0208477,4.8229844],
							[-74.0184444,4.8308528],
							[-74.021191,4.8366685],
							[-74.0326921,4.8397948],
							]]
						}
					}
				},
				'layout': {},
				'paint': {
					'fill-color': this.colores[0],
					'fill-opacity': 0.5
				}
			});

			map.addLayer({
				'id': 'Suba',
				'type': 'fill',
				'source': {
					'type': 'geojson',
					'data': {
						'type': 'Feature',
						'geometry': {
							'type': 'Polygon',
							'coordinates': [[[-74.1353456,4.7385261],
							[-74.1205828,4.7207341],
							[-74.113373,4.7094428],
							[-74.0962068,4.7012308],
							[-74.0786974,4.68378],
							[-74.0704576,4.6906235],
							[-74.058098,4.6858331],
							[-74.0326921,4.8397948],
							[-74.0491716,4.8418474],
							[-74.0577547,4.840479],
							[-74.0642778,4.8332949],
							[-74.0629045,4.8213212],
							[-74.058098,4.8086631],
							[-74.0622179,4.8001102],
							[-74.0615312,4.7819777],
							[-74.0694277,4.7744508],
							[-74.080414,4.7652132],
							[-74.10067,4.7645289],
							[-74.1195528,4.7593969],
							[-74.1353456,4.7385261]]]
						}
					}
				},
				'layout': {},
				'paint': {
					'fill-color': this.colores[1],
					'fill-opacity': 0.5,
				}
			});

			map.addLayer({
				'id': 'Barrios Unidos',
				'type': 'fill',
				'source': {
					'type': 'geojson',
					'data': {
						'type': 'Feature',
						'geometry': {
							'type': 'Polygon',
							'coordinates': [[[-74.058098,4.6858331],
							[-74.0704576,4.6906235],
							[-74.0786974,4.68378],
							[-74.0859003,4.6770852],
							[-74.0929384,4.6659642],
							[-74.0836687,4.6531322],
							[-74.0642709,4.6497103],
							[-74.058098,4.6858331]]]
						}
					}
				},
				'layout': {},
				'paint': {
					'fill-color': this.colores[2],
					'fill-opacity': 0.5,
				}
			});

			map.addLayer({
				'id': 'Chapinero',
				'type': 'fill',
				'source': {
					'type': 'geojson',
					'data': {
						'type': 'Feature',
						'geometry': {
							'type': 'Polygon',
							'coordinates': [[[-74.0559874,4.6997822],
							[-74.0642709,4.6497103],
							[-74.0664807,4.6379613],
							[-74.0685187,4.6306608],
							[-74.069377,4.6286076],
							[-74.068862,4.6270676],
							[-74.0649138,4.6251855],
							[-74.0638838,4.6239878],
							[-74.0604506,4.6233034],
							[-74.0553008,4.6227901],
							[-74.057704,4.6248433],
							[-74.0618239,4.626041],
							[-74.0630255,4.6282653],
							[-74.0599356,4.6345961],
							[-74.0589056,4.64144],
							[-74.0561591,4.6421244],
							[-74.0534125,4.6445198],
							[-74.0477477,4.6503371],
							[-74.0441428,4.6547856],
							[-74.0425978,4.6582075],
							[-74.0395079,4.6612872],
							[-74.035903,4.6638536],
							[-74.0288649,4.6681309],
							[-74.0238867,4.6787385],
							[-74.0194235,4.6908858],
							[-74.0559874,4.6997822],
							[-74.0559874,4.6997822],

							]]
						}
					}
				},
				'layout': {},
				'paint': {
					'fill-color': this.colores[3],
					'fill-opacity': 0.5,
				}
			});

			map.addLayer({
				'id': 'Santa Fe',
				'type': 'fill',
				'source': {
					'type': 'geojson',
					'data': {
						'type': 'Feature',
						'geometry': {
							'type': 'Polygon',
							'coordinates': [[[-74.0688617,4.6272601],
							[-74.0695802,4.6223612],
							[-74.0894822,4.591947],
							[-74.087948,4.5911342],
							[-74.0842573,4.5887387],
							[-74.0800517,4.5842042],
							[-74.0738718,4.579413],
							[-74.0697519,4.5775308],
							[-74.0661471,4.5787286],
							[-74.0644305,4.5814664],
							[-74.0627139,4.583862],
							[-74.0611688,4.586942],
							[-74.0597955,4.5920753],
							[-74.0584222,4.5956686],
							[-74.0584222,4.5984064],
							[-74.0585939,4.6021708],
							[-74.0597955,4.6050796],
							[-74.0585939,4.6120949],
							[-74.0580789,4.6143193],
							[-74.056534,4.6209924],
							[-74.0553005,4.6229826],
							[-74.0638836,4.6241803],
							[-74.0649136,4.625378],
							[-74.0688617,4.6272601],
							]]
						}
					}
				},
				'layout': {},
				'paint': {
					'fill-color': this.colores[4],
					'fill-opacity': 0.5,
				}
			});

			map.addLayer({
				'id': 'Candelaria',
				'type': 'fill',
				'source': {
					'type': 'geojson',
					'data': {
						'type': 'Feature',
						'geometry': {
							'type': 'Polygon',
							'coordinates': [[[-74.0598874,4.6020362],
							[-74.0620332,4.6036617],
							[-74.0655522,4.6035762],
							[-74.0674405,4.6022073],
							[-74.0691571,4.6010096],
							[-74.0709595,4.6000685],
							[-74.0734486,4.6010951],
							[-74.0749078,4.601694],
							[-74.0767102,4.6019507],
							[-74.0795426,4.5979296],
							[-74.0807442,4.596133],
							[-74.0816026,4.5932241],
							[-74.0822034,4.593053],
							[-74.0800576,4.5914274],
							[-74.0768819,4.589973],
							[-74.0746503,4.5898019],
							[-74.0714745,4.5898874],
							[-74.0699296,4.591513],
							[-74.0695004,4.5926252],
							[-74.0680413,4.5937374],
							[-74.0673547,4.5944219],
							[-74.0667538,4.5962185],
							[-74.0653806,4.5974163],
							[-74.0643506,4.5987852],
							[-74.0620332,4.5995551],
							[-74.0592866,4.6010096],
							[-74.0598874,4.6020362],

							]]
						}
					}
				},
				'layout': {},
				'paint': {
					'fill-color': this.colores[4],
					'fill-opacity': 0.5,
				}
			});

			map.addLayer({
				'id': 'Engativa',
				'type': 'fill',
				'source': {
					'type': 'geojson',
					'data': {
						'type': 'Feature',
						'geometry': {
							'type': 'Polygon',
							'coordinates': [[[-74.1353456,4.7385261],
							[-74.1560921,4.7166999],
							[-74.1378959,4.7050664],
							[-74.1221031,4.6917218],
							[-74.1152366,4.6838518],
							[-74.1214165,4.6800878],
							[-74.1121467,4.6664006],
							[-74.1032204,4.652542],
							[-74.0929384,4.6659642],
							[-74.0859003,4.6770852],
							[-74.0786974,4.68378],
							[-74.0962068,4.7012308],
							[-74.113373,4.7094428],
							[-74.1205828,4.7207341],
							[-74.1353456,4.7385261],

							]]
						}
					}
				},
				'layout': {},
				'paint': {
					'fill-color': this.colores[5],
					'fill-opacity': 0.5,
				}
			});

			map.addLayer({
				'id': 'Fontibon',
				'type': 'fill',
				'source': {
					'type': 'geojson',
					'data': {
						'type': 'Feature',
						'geometry': {
							'type': 'Polygon',
							'coordinates': [[[-74.1552324,4.7165581],
							[-74.160039,4.7080041],
							[-74.1675921,4.7050957],
							[-74.1722269,4.7040692],
							[-74.1773768,4.7025294],
							[-74.1748018,4.7006475],
							[-74.1722269,4.7006475],
							[-74.169137,4.7011608],
							[-74.170167,4.6985945],
							[-74.1723986,4.6963704],
							[-74.1723986,4.6948306],
							[-74.1722269,4.6929487],
							[-74.171197,4.6924354],
							[-74.1698237,4.6891848],
							[-74.168107,4.6886715],
							[-74.1718836,4.6833678],
							[-74.1744585,4.6823413],
							[-74.1754885,4.6768664],
							[-74.1729136,4.6748133],
							[-74.1708536,4.6765242],
							[-74.169652,4.6756688],
							[-74.1684504,4.678064],
							[-74.1650171,4.676011],
							[-74.1605539,4.6789195],
							[-74.1624422,4.6804593],
							[-74.1602106,4.6830256],
							[-74.157464,4.6801171],
							[-74.157464,4.6765242],
							[-74.1607256,4.676011],
							[-74.1629572,4.6744712],
							[-74.1634722,4.6713915],
							[-74.1646738,4.6700228],
							[-74.1667338,4.6732735],
							[-74.1705103,4.6715626],
							[-74.170682,4.6693384],
							[-74.1684504,4.6676275],
							[-74.1627855,4.6672853],
							[-74.1603823,4.6662588],
							[-74.1596956,4.66489],
							[-74.1588373,4.6631791],
							[-74.1586657,4.6612971],
							[-74.1552324,4.6626658],
							[-74.1535158,4.6636924],
							[-74.1490526,4.6628369],
							[-74.1459627,4.6616393],
							[-74.1432161,4.6614682],
							[-74.1414995,4.6628369],
							[-74.137723,4.6585596],
							[-74.1358347,4.655651],
							[-74.1332598,4.6515447],
							[-74.1311999,4.6491493],
							[-74.1294832,4.6472673],
							[-74.1262217,4.6460696],
							[-74.1245051,4.643332],
							[-74.1231318,4.639739],
							[-74.1202135,4.6392257],
							[-74.1184969,4.6373436],
							[-74.1032204,4.652542],
							[-74.1214165,4.6800878],
							[-74.1152366,4.6838518],
							[-74.1221031,4.6917218],
							[-74.1378959,4.7050664],
							[-74.1552324,4.7165581],
							]]
						}
					}
				},
				'layout': {},
				'paint': {
					'fill-color': this.colores[6],
					'fill-opacity': 0.5,
				}
			});

			map.addLayer({
				'id': 'Teusaquillo',
				'type': 'fill',
				'source': {
					'type': 'geojson',
					'data': {
						'type': 'Feature',
						'geometry': {
							'type': 'Polygon',
							'coordinates': [[[-74.0642709,4.6497103],
							[-74.0836687,4.6531322],
							[-74.0929384,4.6659642],
							[-74.1032204,4.652542],
							[-74.1002605,4.6486663],
							[-74.0961406,4.6418224],
							[-74.0921924,4.6351495],
							[-74.0841243,4.6320697],
							[-74.0813777,4.6283055],
							[-74.0779445,4.6231724],
							[-74.0733954,4.6161572],
							[-74.0719364,4.6182959],
							[-74.0709493,4.6197076],
							[-74.0699622,4.621718],
							[-74.0688464,4.6245412],
							[-74.068862,4.6270676],
							[-74.069377,4.6286076],
							[-74.0664807,4.6379613],
							[-74.0642709,4.6497103],
							]]
						}
					}
				},
				'layout': {},
				'paint': {
					'fill-color': this.colores[4],
					'fill-opacity': 0.5
				}
			});

			map.addLayer({
				'id': 'Los Martires',
				'type': 'fill',
				'source': {
					'type': 'geojson',
					'data': {
						'type': 'Feature',
						'geometry': {
							'type': 'Polygon',
							'coordinates': [[[-74.0808792,4.6272931],
							[-74.1009635,4.6029963],
							[-74.1070575,4.5982908],
							[-74.1060276,4.5973497],
							[-74.1024227,4.5948686],
							[-74.0971012,4.5943553],
							[-74.0894622,4.5922164],
							[-74.0733954,4.6161572],
							[-74.0808792,4.6272931],
							]]
						}
					}
				},
				'layout': {},
				'paint': {
					'fill-color': this.colores[7],
					'fill-opacity': 0.5
				}
			});

			map.addLayer({
				'id': 'Antonio Nariño',
				'type': 'fill',
				'source': {
					'type': 'geojson',
					'data': {
						'type': 'Feature',
						'geometry': {
							'type': 'Polygon',
							'coordinates': [[[-74.1075404,4.5983036],
							[-74.1107161,4.5975336],
							[-74.1149218,4.5955659],
							[-74.1196425,4.594197],
							[-74.1269381,4.593427],
							[-74.131058,4.5937692],
							[-74.1277106,4.5919726],
							[-74.125479,4.5904326],
							[-74.1199,4.5891492],
							[-74.1161234,4.5884648],
							[-74.1096861,4.5886359],
							[-74.1090853,4.5890637],
							[-74.1052229,4.5847859],
							[-74.102648,4.5811712],
							[-74.098335,4.5780538],
							[-74.094419,4.5755967],
							[-74.0902455,4.5814386],
							[-74.0849669,4.5890637],
							[-74.0858842,4.5896134],
							[-74.0894622,4.5922164],
							[-74.0971012,4.5943553],
							[-74.1024227,4.5948686],
							[-74.1075404,4.5983036],

							]]
						}
					}
				},
				'layout': {},
				'paint': {
					'fill-color': this.colores[7],
					'fill-opacity': 0.5
				}
			});

			map.addLayer({
				'id': 'San Cristobal',
				'type': 'fill',
				'source': {
					'type': 'geojson',
					'data': {
						'type': 'Feature',
						'geometry': {
							'type': 'Polygon',
							'coordinates': [[[-74.0847953,4.589192],
							[-74.0942474,4.575725],
							[-74.1040713,4.5651223],
							[-74.1065604,4.5639245],
							[-74.1048009,4.5616144],
							[-74.1034276,4.5607588],
							[-74.1023118,4.5593471],
							[-74.1020114,4.5531868],
							[-74.1025693,4.5500639],
							[-74.1025478,4.5461923],
							[-74.098031,4.5410907],
							[-74.0988839,4.5400587],
							[-74.0979371,4.5392004],
							[-74.0967771,4.5399691],
							[-74.0945663,4.5288882],
							[-74.095435,4.5221497],
							[-74.0932516,4.5199783],
							[-74.0832764,4.5175235],
							[-74.0723998,4.5455292],
							[-74.0570115,4.5634499],
							[-74.0696039,4.5775206],
							[-74.0741037,4.5793957],
							[-74.0805285,4.5846859],
							[-74.0847953,4.589192],

							]]
						}
					}
				},
				'layout': {},
				'paint': {
					'fill-color': this.colores[8],
					'fill-opacity': 0.5
				}
			});

			map.addLayer({
				'id': 'Puente Aranda',
				'type': 'fill',
				'source': {
					'type': 'geojson',
					'data': {
						'type': 'Feature',
						'geometry': {
							'type': 'Polygon',
							'coordinates': [[[-74.0805367,4.6276348],
							[-74.0837817999999,4.6324114],
							[-74.0918499,4.6354911],
							[-74.1028779,4.6528836],
							[-74.1181544,4.6376852],
							[-74.1190594,4.6370858],
							[-74.1220635,4.6293008],
							[-74.1288441,4.6097949],
							[-74.1381138,4.5955074],
							[-74.1307155,4.5941108],
							[-74.1265956,4.5937686],
							[-74.1193,4.5945386],
							[-74.1145793,4.5959075],
							[-74.1103736,4.5978752],
							[-74.106715,4.5986324],
							[-74.100621,4.6033379],
							[-74.0805367,4.6276348],

							]]
						}
					}
				},
				'layout': {},
				'paint': {
					'fill-color': this.colores[7],
					'fill-opacity': 0.5
				}
			});

			map.addLayer({
				'id': 'Kennedy',
				'type': 'fill',
				'source': {
					'type': 'geojson',
					'data': {
						'type': 'Feature',
						'geometry': {
							'type': 'Polygon',
							'coordinates': [[[-74.1414995,4.6628369],
							[-74.1432161,4.6614682],
							[-74.1490526,4.6628369],
							[-74.1535158,4.6636924],
							[-74.1586657,4.6612971],
							[-74.1612353,4.6632217],
							[-74.1627803,4.6630506],
							[-74.1631236,4.6586878],
							[-74.1642394,4.6586878],
							[-74.165956,4.6598854],
							[-74.1667285,4.6594577],
							[-74.167501,4.656378],
							[-74.1705051,4.656378],
							[-74.17205,4.6574045],
							[-74.1755691,4.6543248],
							[-74.1767707,4.6548381],
							[-74.1804614,4.6524428],
							[-74.1828647,4.6487642],
							[-74.1856971,4.6473954],
							[-74.1803756,4.6467111],
							[-74.1756549,4.637044],
							[-74.1695609,4.6254091],
							[-74.1676726,4.6237837],
							[-74.1614928,4.6126619],
							[-74.161922,4.5955512],
							[-74.1537681,4.5964067],
							[-74.1455283,4.5952089],
							[-74.1381138,4.5955074],
							[-74.1288441,4.6097949],
							[-74.1184969,4.6373436],
							[-74.1202135,4.6392257],
							[-74.1231318,4.639739],
							[-74.1262217,4.6460696],
							[-74.1294832,4.6472673],
							[-74.1332598,4.6515447],
							[-74.1372027,4.6579178],
							[-74.1414995,4.6628369],


							]]
						}
					}
				},
				'layout': {},
				'paint': {
					'fill-color': this.colores[9],
					'fill-opacity': 0.5
				}
			});
			map.addLayer({
				'id': 'Bosa',
				'type': 'fill',
				'source': {
					'type': 'geojson',
					'data': {
						'type': 'Feature',
						'geometry': {
							'type': 'Polygon',
							'coordinates': [[[-74.1856971,4.6473954],
							[-74.1833078,4.652376],
							[-74.1868269,4.6511784],
							[-74.1925775,4.655028],
							[-74.1954958,4.6519483],
							[-74.1987573,4.6490397],
							[-74.2015039,4.6479275],
							[-74.203478,4.6449333],
							[-74.2059671,4.6465588],
							[-74.2072546,4.6458744],
							[-74.2059671,4.6430513],
							[-74.2062246,4.6409125],
							[-74.2089712,4.6406559],
							[-74.2129194,4.6403992],
							[-74.2145502,4.6407414],
							[-74.2148077,4.6436501],
							[-74.2178976,4.6443345],
							[-74.22073,4.6444201],
							[-74.22176,4.642538],
							[-74.2197,4.6415969],
							[-74.2168676,4.6407414],
							[-74.2149793,4.6390305],
							[-74.2150652,4.6373195],
							[-74.215666,4.6360362],
							[-74.2173826,4.6360362],
							[-74.2175543,4.633983],
							[-74.2165243,4.6317587],
							[-74.2159235,4.6306466],
							[-74.2172968,4.629791],
							[-74.2209017,4.6303899],
							[-74.2227041,4.629791],
							[-74.2225324,4.6287644],
							[-74.2231333,4.6268823],
							[-74.2235624,4.6255135],
							[-74.2234766,4.6241447],
							[-74.2216741,4.6240591],
							[-74.2206442,4.6228614],
							[-74.2211592,4.6218348],
							[-74.2225324,4.6211504],
							[-74.2224466,4.6202093],
							[-74.2209875,4.6193538],
							[-74.2214166,4.6182416],
							[-74.2204725,4.6186694],
							[-74.2197,4.6175572],
							[-74.2184126,4.6192682],
							[-74.2181551,4.6168728],
							[-74.2169535,4.6149051],
							[-74.2037355,4.5989922],
							[-74.2035639,4.600361],
							[-74.1970407,4.5994199],
							[-74.1929209,4.5983077],
							[-74.1852819,4.5964255],
							[-74.1822779,4.59711],
							[-74.1788446,4.59711],
							[-74.1749822,4.5969388],
							[-74.1704332,4.59634],
							[-74.1647684,4.5959122],
							[-74.161922,4.5955512],
							[-74.1614928,4.6126619],
							[-74.1676726,4.6237837],
							[-74.1695609,4.6254091],
							[-74.1803756,4.6467111],
							[-74.1856971,4.6473954],
							]]
						}
					}
				},
				'layout': {},
				'paint': {
					'fill-color':this.colores[9],
					'fill-opacity': 0.5
				}
			});

			map.addLayer({
				'id': 'Rafael Uribe',
				'type': 'fill',
				'source': {
					'type': 'geojson',
					'data': {
						'type': 'Feature',
						'geometry': {
							'type': 'Polygon',
							'coordinates': [[[-74.1277106,4.591887],
							[-74.1283041,4.5900493],
							[-74.1284758,4.5865415],
							[-74.1319948,4.5856004],
							[-74.1296774,4.5777292],
							[-74.1257292,4.5790126],
							[-74.1235834,4.5746492],
							[-74.1267578,4.5665959],
							[-74.1252558,4.5638581],
							[-74.124655,4.5613341],
							[-74.122595,4.5576978],
							[-74.1198055,4.5532915],
							[-74.1166298,4.5502969],
							[-74.1133682,4.5493558],
							[-74.1115658,4.5455911],
							[-74.1080896,4.5434521],
							[-74.1014378,4.5326713],
							[-74.1004078,4.5381473],
							[-74.1040127,4.5424253],
							[-74.1025478,4.5461067],
							[-74.1025693,4.5500639],
							[-74.1020114,4.5531868],
							[-74.1020543,4.5589621],
							[-74.1065604,4.5638389],
							[-74.1040713,4.5651223],
							[-74.1002323,4.5691189],
							[-74.094419,4.5755111],
							[-74.102648,4.5810856],
							[-74.1090853,4.5889781],
							[-74.1175739,4.5882846],
							[-74.1277106,4.591887],
							]]
						}
					}
				},
				'layout': {},
				'paint': {
					'fill-color': this.colores[8],
					'fill-opacity': 0.5
				}
			});

			map.addLayer({
				'id': 'Tunjuelito',
				'type': 'fill',
				'source': {
					'type': 'geojson',
					'data': {
						'type': 'Feature',
						'geometry': {
							'type': 'Polygon',
							'coordinates': [[[-74.1537681,4.5964067],
							[-74.1524692,4.5950249],
							[-74.1544433,4.5938271],
							[-74.1546149,4.5926293],
							[-74.1531558,4.5922871],
							[-74.1522117,4.5929715],
							[-74.1513534,4.5923727],
							[-74.1516109,4.5910893],
							[-74.1516967,4.5901482],
							[-74.1505809,4.5880949],
							[-74.1507526,4.5866404],
							[-74.1518684,4.5849293],
							[-74.1516967,4.583646],
							[-74.1488643,4.5831326],
							[-74.1473193,4.5816782],
							[-74.1491218,4.5816782],
							[-74.1498943,4.579197],
							[-74.1492076,4.5768015],
							[-74.1480918,4.5762026],
							[-74.1480918,4.5774859],
							[-74.1472335,4.5760314],
							[-74.1476627,4.5744914],
							[-74.1470618,4.5729514],
							[-74.1457744,4.5735503],
							[-74.1440578,4.5726947],
							[-74.1438861,4.5741492],
							[-74.1438003,4.5752614],
							[-74.1427703,4.5773148],
							[-74.1407962,4.576117],
							[-74.1409679,4.5749192],
							[-74.1427703,4.5741492],
							[-74.1431995,4.5726947],
							[-74.1423412,4.5715825],
							[-74.1410537,4.5704702],
							[-74.1404529,4.5691013],
							[-74.1405387,4.5671334],
							[-74.1407104,4.5653367],
							[-74.1395946,4.5641389],
							[-74.1380496,4.5633689],
							[-74.1364188,4.5615721],
							[-74.1347022,4.5611444],
							[-74.1331573,4.5601176],
							[-74.1316982,4.5591765],
							[-74.1296382,4.5586631],
							[-74.1275783,4.5578931],
							[-74.1265483,4.557722],
							[-74.1249175,4.5567808],
							[-74.1222568,4.5544707],
							[-74.1209693,4.5545563],
							[-74.1245742,4.5605454],
							[-74.1252558,4.5638581],
							[-74.1267578,4.5665959],
							[-74.1235834,4.5746492],
							[-74.1257292,4.5790126],
							[-74.1296774,4.5777292],
							[-74.1319948,4.5856004],
							[-74.1284758,4.5865415],
							[-74.1283041,4.5900493],
							[-74.1277106,4.5919726],
							[-74.131058,4.5937692],
							[-74.1381138,4.5955074],
							[-74.1455283,4.5952089],
							[-74.1529842,4.5965648],
							[-74.1537681,4.5964067],

							]]
						}
					}
				},
				'layout': {},
				'paint': {
					'fill-color': this.colores[10],
					'fill-opacity': 0.5
				}
			});

			map.addLayer({
				'id': 'Usme	',
				'type': 'fill',
				'source': {
					'type': 'geojson',
					'data': {
						'type': 'Feature',
						'geometry': {
							'type': 'Polygon',
							'coordinates': [[[-74.1407104,4.5653367],
							[-74.1435359,4.5619543],
							[-74.1481708,4.5545962],
							[-74.1476558,4.5439867],
							[-74.1461108,4.5364573],
							[-74.1428493,4.530468],
							[-74.1383861,4.5244786],
							[-74.1368411,4.5203715],
							[-74.1356395,4.5128419],
							[-74.1349528,4.5049699],
							[-74.1328929,4.4950442],
							[-74.1313479,4.4871721],
							[-74.1289447,4.4804978],
							[-74.1179584,4.4757059],
							[-74.1097186,4.4741657],
							[-74.1019938,4.47331],
							[-74.0965007,4.4741657],
							[-74.0935824,4.4777596],
							[-74.0887759,4.4830648],
							[-74.0882609,4.4870009],
							[-74.0853427,4.4911082],
							[-74.0825961,4.4928195],
							[-74.0843127,4.4981246],
							[-74.086716,4.5017184],
							[-74.0886043,4.5082214],
							[-74.0899775,4.5150666],
							[-74.0903209,4.5171201],
							[-74.0920375,4.5203715],
							[-74.095435,4.5221497],
							[-74.0945663,4.5288882],
							[-74.0967771,4.5399691],
							[-74.0988839,4.5400587],
							[-74.098031,4.5410907],
							[-74.1025478,4.5461923],
							[-74.1040127,4.5424253],
							[-74.1004078,4.5381473],
							[-74.1014378,4.5326713],
							[-74.1080896,4.5434521],
							[-74.1115658,4.5455911],
							[-74.1133682,4.5493558],
							[-74.1166298,4.5502969],
							[-74.1209693,4.5545563],
							[-74.1265483,4.557722],
							[-74.1331573,4.5601176],
							[-74.1364188,4.5615721],
							[-74.1407104,4.5653367],

							]]
						}
					}
				},
				'layout': {},
				'paint': {
					'fill-color': this.colores[8],
					'fill-opacity': 0.5
				}
			});

			map.addLayer({
				'id': 'Ciudad Bolivar',
				'type': 'fill',
				'source': {
					'type': 'geojson',
					'data': {
						'type': 'Feature',
						'geometry': {
							'type': 'Polygon',
							'coordinates': [[[-74.1852819,4.5964255],
							[-74.1874604,4.5874504],
							[-74.1888337,4.5799214],
							[-74.1864305,4.5691412],
							[-74.1855722,4.5535695],
							[-74.1775041,4.5417622],
							[-74.1661744,4.5383397],
							[-74.159823,4.534575],
							[-74.1508966,4.52773],
							[-74.1464334,4.5224251],
							[-74.1436868,4.5176335],
							[-74.1424852,4.507708],
							[-74.1430002,4.5001782],
							[-74.1363054,4.4996648],
							[-74.1351037,4.5027452],
							[-74.1351037,4.5066812],
							[-74.1354471,4.5118151],
							[-74.1368203,4.5188314],
							[-74.1383653,4.5231096],
							[-74.1405969,4.5268744],
							[-74.1442018,4.5328637],
							[-74.1461108,4.5364573],
							[-74.1476558,4.5439867],
							[-74.1478067,4.5496337],
							[-74.1481708,4.5545962],
							[-74.1466909,4.5570774],
							[-74.1451134,4.5595159],
							[-74.1435359,4.5619543],
							[-74.1407104,4.5653367],
							[-74.1405387,4.5671334],
							[-74.1440578,4.5726947],
							[-74.1409679,4.5749192],
							[-74.1407962,4.576117],
							[-74.1427703,4.5773148],
							[-74.1457744,4.5735503],
							[-74.1470618,4.5729514],
							[-74.1492076,4.5768015],
							[-74.1498943,4.579197],
							[-74.1473193,4.5816782],
							[-74.1516967,4.583646],
							[-74.1507526,4.5866404],
							[-74.1516967,4.5901482],
							[-74.1522117,4.5929715],
							[-74.1544433,4.5938271],
							[-74.1519265,4.5965192],
							[-74.1579347,4.5963481],
							[-74.1647684,4.5959122],
							[-74.1704332,4.59634],
							[-74.1763025,4.5963481],
							[-74.1852819,4.5964255],

							]]
						}
					}
				},
				'layout': {},
				'paint': {
					'fill-color': this.colores[9],
					'fill-opacity': 0.5
				}
			});

			map.addLayer({
			"id": "route",
			"type": "line",
			"source": "Ruta",
			"layout": {
				"line-join": "round",
				"line-cap": "round"
			},
			"paint": {
				"line-color": "#000000",
				"line-width": 3
			},
			"filter": ["==", "$type", "LineString"],
		});

		});
}
 cambiarEstado() {
    this.setState({publico: true});
  }
  cambiarEstado2() {
    this.setState({publico: false});
  }

render() {
	return (

		<div className="col-md-6 col-sm-6">
			<h2><span className="Negrilla">Ruta:</span> {this.state.nombre}</h2>
			<div ref={el => this.mapContainer = el} className='mapContainerRuta' />
			<p><span className="Negrilla">Distancia Total:</span> {this.state.distancia} mts</p>
			<p><span className="Negrilla">Desnivel Positivo:</span> {this.state.altura} mts </p>
			<p><span className="Negrilla">Tiempo Estimado:</span> {this.state.tiempo} </p>
			{this.state.publico ?
      <div>
      </div>:
      <div>
      	<button onClick={this.cambiarEstado} className="btn">Publicar Ruta</button>

      </div>}


			{this.state.publico ?
      <div>
        <LlenarFormulario user = {this.props.user} idRuta={this.state.idRuta}> </LlenarFormulario>
        <button onClick={this.cambiarEstado2} className="btn btnR">Cancelar</button>
      </div>:
      <div>
      </div>}
		</div>
		)
	}}

	export default MapaConRuta;


