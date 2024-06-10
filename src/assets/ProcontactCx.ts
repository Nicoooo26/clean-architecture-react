//https://zenoo.github.io/mui-theme-creator/

import { createTheme } from '@mui/material/styles';

export const themeLight = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#FFFFFF',
            contrastText: 'rgba(0,0,0,0.87)',
            dark: '#de1014',
        },
        secondary: {
            main: '#FFFFFF',
        },
        warning: {
            main: '#00e2ff',
        },
        divider: 'rgba(212,228,109,0.12)',
        success: {
            main: '#ec1de1',
        },
    },
    shape: {
        borderRadius: 4,
    },
});

export const themeDark = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#FFFFFF',
            contrastText: 'rgba(0,0,0,0.87)',
            dark: '#de1014',
        },
        secondary: {
            main: '#FFFFFF',
        },
        warning: {
            main: '#00e2ff',
        },
        divider: 'rgba(212,228,109,0.12)',
        success: {
            main: '#ec1de1',
        },
    },
    shape: {
        borderRadius: 4,
    },
});
