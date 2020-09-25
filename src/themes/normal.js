import {createMuiTheme} from '@material-ui/core/styles';
import {red} from '@material-ui/core/colors';

//default Theme

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#6D7993',
        },
        secondary : {
            main: '#556ced6',
        },
        error: {
            main: red.A400,
        },
        background : {
            default: '#f5f5f5',
        },
        titleBar: {
            main: '#eeeeee',
            contrastText: '#222222',
        },
        button: {
            main: '#494E6B',
        }
    },
})

export default theme;