import {createMuiTheme} from '@material-ui/core/styles';

// @ts-ignore
const Theme = createMuiTheme({
    palette: {
        primary: {
            light: '#B2EBF2',
            dark: '#0097a7',
            main: "#00bcd4",
            contrastText: '#fff',
        },
        secondary: {
            main: "#FFA630",
            light: "#ffcf8f",
        }
    },
    shape: {
        borderRadius: 8,
    },
    spacing: 8,
    overrides: {
        MuiDrawer: {
            paper: {
                minWidth: 256,
            },
            paperAnchorDockedLeft: {
                borderRight: 'none',
            },
        },
    },
});

export default Theme;
