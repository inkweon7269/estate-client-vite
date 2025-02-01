import variables from '@/styles/variables.module.scss';

const { colorPrimary } = variables;

const theme = {
    token: {
        colorPrimary: colorPrimary,
        borderRadius: 2,
    },
    components: {
        /*
        Button: {
            colorPrimary: colorPrimary,
        },
        Input: {
            colorPrimary: colorPrimary,
        },
        */
    },
};

export default theme;
