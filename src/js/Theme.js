import Colors from 'material-ui/lib/styles/colors';
import LightTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';

export default Object.assign({}, LightTheme, {
  palette: Object.assign({}, LightTheme.palette, {
    primary1Color: Colors.yellow300,
    primary2Color: Colors.yellow700,
    accent1Color: Colors.cyan200
  }),
  appBar: {
    color: "#000"
  }
});
