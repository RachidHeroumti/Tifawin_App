import { Dimensions } from "react-native";
const {width,height} = Dimensions.get('screen');

export const COLORS = {
	primary: "#41644A",
	primaryLight: "rgba(253,152,0,0.15)",
	secondary: "#A4B465",
	success: "#159E42",
	danger: "#FF3131",
	warning: "#ffb02c",
	dark: "#2f2f2f",
	light: "#E6E6E6",
	info: "#2B39B9",
	white: "#fff",
	label: "#8A8A8A",
	backgroundColor: "#fff",
	black: "#000",
	blue: "#007BFF",
	blueLight: "rgba(0,123,255,0.15)",
	red: "#DC3545",
	redLight: "rgba(220,53,69,0.15)",
	yellow: "#FFC107",
	yellowLight: "rgba(255,193,7,0.15)",
	Cobaltblue :'#0047AB',
	gray: "#6C757D",
	grayLight: "rgba(108,117,125,0.15)",
	orange: "#FFA500",
	orangeLight: "rgba(255,165,0,0.15)",
	purple: "#9370DB",
	purpleLight: "rgba(147,112,219,0.15)",
	green: "#32CD32",
	greenLight: "rgba(50,205,50,0.15)",
	pink: "#FF69B4",
	pinkLight: "rgba(255,105,180,0.15)",
	teal: "#20B2AA",
	tealLight: "rgba(32,178,170,0.15)",
	border:'#ddd',
	card : "#fff",
	background : "#ECF2F8",
	text : "#7D899D",
	title : "#131921",
	borderColor : "#ECF2F8",
	input : "rgba(0,0,0,.03)",
	inputborder:"#C1CDD9",
  secondaryText: '#555555',
  cardBackground: '#F9F9FF',
  shadow: '#000000',
  overlay: 'rgba(0,0,0,0.5)',
	//dark theme
	darkCard : "rgba(255,255,255,.05)",
	darkBackground : "rgba(0,3,3,.9)",
	darkText : "rgba(255,255,255,.6)",
	darkTitle : "#fff",
	darkBorder : "rgba(255,255,255,.2)",
	darkInput : "rgba(255,255,255,.05)",
	darkinputborder:"#C1CDD9",
}
export const SIZES = {
	fontLg: 16,
	font: 14,
	fontSm: 13,
	fontXs: 12,

	//radius
	radius_sm: 8,
	radius: 6,
	radius_lg: 15,

	//space
	padding: 15,
	margin: 15,

	//Font Sizes
	h1: 40,
	h2: 28,
	h3: 24,
	h4: 20,
	h5: 18,
	h6: 16,

	//App dimensions
	width,
	height,

	container: 800,
};


export const FONTS = {
	fontLg: { fontSize: SIZES.fontLg, color: COLORS.text, lineHeight: 20, fontFamily: 'Jost-Regular' },
	font: { fontSize: SIZES.font, color: COLORS.text, lineHeight: 20, fontFamily: 'Jost-Regular' },
	fontSm: { fontSize: SIZES.fontSm, color: COLORS.text, lineHeight: 18, fontFamily: 'Jost-Regular' },
	fontXs: { fontSize: SIZES.fontXs, color: COLORS.text, lineHeight: 14, fontFamily: 'Jost-Regular' },
	h1: { fontSize: SIZES.h1, color: COLORS.title, fontFamily: 'Jost-SemiBold' },
	h2: { fontSize: SIZES.h2, color: COLORS.title, fontFamily: 'Jost-SemiBold' },
	h3: { fontSize: SIZES.h3, color: COLORS.title, fontFamily: 'Jost-SemiBold' },
	h4: { fontSize: SIZES.h4, color: COLORS.title, fontFamily: 'Jost-SemiBold' },
	h5: { fontSize: SIZES.h5, color: COLORS.title, fontFamily: 'Jost-SemiBold' },
	h6: { fontSize: SIZES.h6, color: COLORS.title, fontFamily: 'Jost-SemiBold' },
	fontBold: { fontFamily: 'Jost-Bold' },
	fontMedium: { fontFamily: 'Jost-Medium' },
	fontTitle: { fontFamily: 'Jost-Medium' },
	fontRegular: { fontFamily: 'Jost-Regular' },
	fontSemiBold: { fontFamily: 'Jost-SemiBold' },
	fontJostLight: { fontFamily: 'Jost-Light' },
	fontJostExtraLight: { fontFamily: 'Jost-ExtraLight' },
	Marcellus: { fontFamily: 'MarcellusRegular' },
	fontJostItalic: { fontFamily: 'Jost-Italic' },
	fontJostSemiBoldItalic: { fontFamily: 'Jost-SemiBoldItalic' },
	fontJostLightItalic: { fontFamily: 'Jost-LightItalic' },
	fontJostMediumItalic: { fontFamily: 'Jost-MediumItalic' },
}

const appTheme = {COLORS, SIZES, FONTS}

export default appTheme;