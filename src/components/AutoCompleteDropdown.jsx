import React from "react";
import { Autocomplete, Checkbox, styled } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ClearIcon from "@mui/icons-material/Clear";
import TextFieldCustom from "components/TextFieldCustom";
import StarIcon from "@mui/icons-material/Star";
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;

/**
 * AutoComplete component.
 * @param {Array} options - The options for the autocomplete.
 * @param {boolean} hasselectall - Indicates if "Select all" option should be included.
 * @param {Array} value - The array of values to filter.
 * @param {string} label - The label for the autocomplete.
 * @param {boolean} multiple - Indicates if multiple values can be selected.
 * @param {function} onChange - The function to handle filter changes.
 * @param {boolean} required - Indicates if this values will be required.
 * @param {boolean} error - Indicates if this field show error.
* @param {boolean} clearIcon - To remove the cross icon or clear button.
 */
const AutoCompleteDropdown = ({
  options,
  hasselectall,
  value,
  label,
  multiple,
  onChange,
  required,
  disabled,
  error,
  showClearIcon,
  limitTags,
  isGroup,
  className,
  size,
  selectAllLabel,
  helperText
}) => {

  const GroupHeader = styled('div')(({ theme }) => ({
    position: 'sticky',
    top: '-8px',
    padding: '4px 10px',
    fontWeight: 'bold',
    fontSize: '12px',
    color: '#ff4815',
    backgroundColor: '#fff',
    marginTop: 0,
    marginBottom: 0,
  }));

  const GroupItems = styled('ul')({
    padding: 0,
    marginTop: 0,
    marginBottom: 0,
    fontSize: '12px'
  });

  return (
    <Autocomplete
      multiple={multiple}
      disableCloseOnSelect={multiple}
      disabled={disabled}
      className={`border-1 rounded-2 border-secondary  ${className}`}
      options={
        hasselectall && multiple
          ? [{ label: selectAllLabel ? selectAllLabel : "Select all", value: "Select all" }, ...options]
          : options
      }
      value={multiple ? options?.filter((option) => value?.includes(option?.value)) : typeof value == 'object' && value != null ? value : null}
      onChange={(event, value) => onChange(event, value)}
      getOptionLabel={(option) => String(option?.label)}
      isOptionEqualToValue={(option, value) => option.value == value.value}
      groupBy={isGroup ? (option) => option.group_value : () => { }}
      renderOption={
        multiple
          ? (props, option, { selected }) => (
            <li {...props} key={option.value}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                checked={
                  option?.value == "Select all" &&
                    value?.length == options?.length ? true : selected
                }
                color="primary"
              />
              {option?.label}

            </li>
          )
          : (props, option, { selected }) => <li {...props} key={option.value}>
            {option?.label}
            {option?.star ? <StarIcon style={{ marginLeft: 5, color: '#ff4815' }} fontSize="small" /> : null}
          </li>
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
          label={label ? label : ""}
          fullWidth
          required={required}
          error={error}
          helperText={helperText}
          size={size}
          sx={{
            marginTop: "6px",
            marginBottom: "6px",
            backgroundColor: "white",
            marginX: 0
          }}
        />
      )}
      clearIcon={showClearIcon ? <ClearIcon /> : null}
      sx={{
        // backgroundColor: "white",
        color: "white",
        maxHeight: "100px",
        overflowY: "scroll",
        overflowX: "hidden",
        border: "#ff4815",
      }}
      limitTags={limitTags}
    />
  );
};

AutoCompleteDropdown.defaultProps = {
  options: [],
  hasselectall: true,
  value: [],
  label: '',
  multiple: true,
  disabled: false,
  isGroup: false,
  onChange: () => { },
  required: false,
  error: "false",
  showClearIcon: true,
  limitTags: 2,
  className: "",
  size: "small",
  selectAllLabel: '',
  helperText: ''
};

export default AutoCompleteDropdown;
