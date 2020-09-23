import {createMuiTheme} from '@material-ui/core/styles';
import {red} from '@material-ui/core/colors';

//default Theme

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary : {
            main: '#556ced6',
        },
        error: {
            main: red.A400,
        },
        background : {
            default: '#ffffff',
        },
        titleBar: {
            main: '#eeeeee',
            contrastText: '#222222',
        },
    },
})

export default theme;