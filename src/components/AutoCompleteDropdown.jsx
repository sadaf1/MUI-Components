import { useCallback } from "react";
import { Autocomplete, Checkbox, styled } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ClearIcon from "@mui/icons-material/Clear";
import StarIcon from "@mui/icons-material/Star";
import PropTypes from "prop-types";
import TextFieldCustom from "./TextFieldCustom";

const checkedIcon = <CheckBoxIcon fontSize="small" />;
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  fontWeight: 'bold',
  fontSize: '12px',
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.background.paper,
  margin: 0,
}));

const GroupItems = styled('ul')({
  padding: 0,
  margin: 0,
  fontSize: '12px',
});

const AutoCompleteDropdown = ({
  options = [],
  hasselectall = true,
  value = [],
  label = '',
  multiple = true,
  onChange = () => { },
  required = false,
  disabled = false,
  error = false,
  showClearIcon = true,
  limitTags = 2,
  isGroup = false,
  className = '',
  size = 'small',
  selectAllLabel = 'Select all',
  helperText = '',
}) => {
  const handleChange = useCallback((event, newValue) => {
    if (multiple && newValue.find((opt) => opt.value === 'Select all')) {
      onChange(event, options.length === value.length ? [] : options);
    } else {
      onChange(event, newValue);
    }
  }, [multiple, onChange, options, value]);

  return (
    <Autocomplete
      multiple={multiple}
      disableCloseOnSelect={multiple}
      disabled={disabled}
      options={
        hasselectall && multiple
          ? [{ label: selectAllLabel, value: 'Select all' }, ...options]
          : options
      }
      value={
        multiple
          ? options.filter((option) => value.includes(option?.value)) || []
          : typeof value === 'object' && value !== null
            ? value
            : null
      }
      onChange={handleChange}
      getOptionLabel={(option) => String(option?.label || '')}
      isOptionEqualToValue={(option, val) => option?.value === val?.value}
      groupBy={isGroup ? (option) => option.group_value || '' : undefined}
      renderOption={(props, option, { selected }) =>
        multiple ? (
          <li {...props} key={option.value}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              checked={
                option.value === 'Select all'
                  ? value.length === options.length
                  : selected
              }
              color="primary"
            />
            {option.label}
          </li>
        ) : (
          <li {...props} key={option.value}>
            {option.label}
            {option.star && (
              <StarIcon
                sx={{ ml: 0.5, color: 'primary.main' }}
                fontSize="small"
              />
            )}
          </li>
        )
      }
      renderGroup={(params) => (
        <li key={params.key}>
          <GroupHeader>{params.group}</GroupHeader>
          <GroupItems>{params.children}</GroupItems>
        </li>
      )}
      renderInput={(params) => (
        <TextFieldCustom
          {...params}
          label={label}
          fullWidth
          required={required}
          error={error}
          helperText={helperText}
          size={size}
          sx={{
            mt: 0.75,
            mb: 0.75,
            bgcolor: 'background.paper',
          }}
        />
      )}
      clearIcon={showClearIcon ? <ClearIcon /> : null}
      sx={{
        maxHeight: 100,
        overflowY: 'auto',
        overflowX: 'hidden',
        '& .MuiOutlinedInput-root': {
          borderColor: error ? 'error.main' : 'grey.500',
          borderRadius: '8px',
        },
      }}
      limitTags={limitTags}
      className={className}
    />
  );
};

AutoCompleteDropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      group_value: PropTypes.string,
      star: PropTypes.bool,
    })
  ),
  hasselectall: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ]),
  label: PropTypes.string,
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  showClearIcon: PropTypes.bool,
  limitTags: PropTypes.number,
  isGroup: PropTypes.bool,
  className: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium']),
  selectAllLabel: PropTypes.string,
  helperText: PropTypes.string,
};

export default AutoCompleteDropdown;