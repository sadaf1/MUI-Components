import { AccordionDetails } from '@mui/material'

const colorThemes = {
    root: {
        bgColorEven: '#8d8d8d12',
        bgColorOdd: '#ff481509',
        borderLeftEven: '#5454546d',
        borderLeftOdd: '#ff48155e',
    },
    secondary: {
        bgColorEven: 'transparent',
        bgColorOdd: 'transparent',
        borderLeftEven: 'none',
        borderLeftOdd: 'none',
    }
};

const themes = {
    root: {
        marginTop: '0.25rem',
        padding: '3px 16px',
    },
    secondary: {
        borderStart: "none",
        marginY: '6px',
    }
};

const CustomAccordionDetails = (props) => {
    const {isEven, type, sx, ...customProps} = props;
    return (
        <AccordionDetails
            {...customProps}
            sx={{
                ...themes[type],
                ...(
                    isEven ? {
                        backgroundColor: colorThemes[props.type].bgColorEven,
                        borderLeft: `2px solid ${colorThemes[props.type].borderLeftEven}`,
                    } : {
                        backgroundColor: colorThemes[props.type].bgColorOdd,
                        borderLeft: `2px solid ${colorThemes[props.type].borderLeftOdd}`,
                    }
                ),
                ...sx
            }}
        />
    )
}

CustomAccordionDetails.defaultProps = {
    type: 'root',
    children: [],
    sx: {},
    isEven: false
}

export default CustomAccordionDetails
