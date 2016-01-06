import Colors from 'material-ui/lib/styles/colors';
import LightTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';

// based on http://www.materialpalette.com/deep-orange/cyan
export default Object.assign({}, LightTheme, {
  palette: Object.assign({}, LightTheme.palette, {
    primary1Color: Colors.deepOrange500,
    primary2Color: Colors.deepOrange700,
    primary3Color: Colors.deepOrange100,
    accent1Color: Colors.cyan500,
    textColor: Colors.grey900,
    alternateTextColor: "#727272",
    borderColor: "#b6b6b6"
  })
});
