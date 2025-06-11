import { AccordionSummary } from '@mui/material'
import DoNotDisturbOnOutlinedIcon from '@mui/icons-material/DoNotDisturbOnOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

const colorThemes = {
  root: {
    bgPrimary: '#ffd1c470',
    bgSecondary: '#fff',
    colorPrimary: '#ff4815',
    colorSecondary: '#000',
    borderTop: "#ff4815",
    borderLeft: '#ffd1c4',
    borderRight: '#ffd1c4',
    borderBottom: '#ffd1c4',
  },
  secondary: {
    bgPrimary: 'transparent',
    bgSecondary: 'transparent',
    colorPrimary: '#ff4815',
    colorSecondary: '#000',
    borderTop: "none",
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: 'none',
  }
};

const themes = {
  root: {
    minHeight: 'auto',
    '& .MuiAccordionSummary-content': {
      margin: '0px !important',
      paddingTop: '3px !important',
      paddingBottom: '5px !important'

    },
    '&.Mui-expanded': {
      minHeight: 'auto',
      paddingTop: '3px !important',
      paddingBottom: '5px !important'
    }
  },
  secondary: {
    padding: '0px',
    minHeight: 'auto',
    '& .MuiAccordionSummary-content': {
      margin: '0px !important',
      paddingTop: '3px !important',
      paddingBottom: '5px !important'
    },
    '&.Mui-expanded': {
      minHeight: 'auto',
      paddingTop: '3px !important',
      paddingBottom: '5px !important'
    }
  }
};

const CustomAccordionSummary = (props) => {

  const {isExpanded, sx, ...basicProps} = props;

  return (
    <AccordionSummary
      {...basicProps}
      sx={{
        backgroundColor: isExpanded
          ? colorThemes[props.type].bgPrimary
          : colorThemes[props.type].bgSecondary,
        color: isExpanded
          ? colorThemes[props.type].colorPrimary
          : colorThemes[props.type].colorSecondary,
        borderTop: `2px solid ${colorThemes[props.type].borderTop}`,
        borderLeft: `1px solid ${colorThemes[props.type].borderLeft}`,
        borderRight: `1px solid ${colorThemes[props.type].borderRight}`,
        borderBottom: `1px solid ${colorThemes[props.type].borderBottom}`,
        '& .MuiSvgIcon-root': {
          width: '1.15rem',
          height: '1.15rem',
        },
        ...themes[props.type],
        ...sx
      }}
      expandIcon={
        isExpanded
          ? <DoNotDisturbOnOutlinedIcon />
          : <AddCircleOutlineOutlinedIcon />
      }
    />
  )
}

CustomAccordionSummary.defaultProps = {
  type: 'root',
  children: [],
  sx: {},
  isExpanded: false
};

export default CustomAccordionSummary