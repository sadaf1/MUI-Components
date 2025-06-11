import { Accordion } from '@mui/material'

const themes = {
    root: {
        margin: '16px 0',
        boxShadow: 'none',
    },
    secondary: {
        margin: '0px 0',
        boxShadow: 'none',
        backgroundColor: 'transparent',
    },
};

function CustomAccordion(props) {
    return (
        <Accordion
            {...props}
            sx={themes[props.type]}
        />
    )
}

CustomAccordion.defaultProps = {
    type: 'root'
};

export default CustomAccordion