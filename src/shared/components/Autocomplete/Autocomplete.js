import { useState, useEffect, useRef } from "@wordpress/element";
import Listbox, { ListItem } from "./Listbox";
import { TextControl, Spinner } from "@wordpress/components";
import useClickOutside from "../../hooks/useClickOutside";
import useId from "../../hooks/useId";

const KEY_CODE = {
  up: 38,
  scape: 27,
  down: 40,
  enter: 13,
  tab: 9,
};

const Loading = () => (<p>Cargando...</p>)

const MIN_LETTERS = 2;

const Autocomplete = props => {
  const {
    options,
    renderOption,
    onChange,
    onSelect,
    notMatchText,
    loading = false,
    defaultValue = "",
    placeholder = null
  } = props;
  const [inputValue, setInputValue] = useState(defaultValue);
  const [itemSelected, setItemSelected] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  const inputId = useId("autocomplete-input");
  const listboxId = useId("autocomplete-listbox");
  const refContainer = useRef(null);

  useClickOutside(refContainer, () => {
    hideOptions();
  });

  useEffect(() => {
    setInputValue(defaultValue);
  }, [defaultValue]);

  const hideOptions = () => {
    setIsOpen(false);
    setItemSelected(-1);
  };

  const selectOption = option => {
    onSelect(option);
    hideOptions();
  };

  const handleInputFocus = () => {
    if (inputValue.length >= MIN_LETTERS) {
      setIsOpen(true);
    }
  };
  const handleInputChange = value => {
    if (onChange) onChange(value);
    setInputValue(value);
    if (value.length >= MIN_LETTERS) {
      setIsOpen(true);
    } else {
      hideOptions();
    }
  };

  const handleInputKey = ev => {
    const { keyCode } = ev;

    switch (keyCode) {
      case KEY_CODE.tab:
        hideOptions();
        break;
      case KEY_CODE.enter:
        ev.preventDefault();
        if (isOpen) {
          const selected = options[itemSelected];
          if (selected) {
            selectOption(selected);
          }
        }
        break;
      case KEY_CODE.scape:
        ev.preventDefault();
        setIsOpen(false);
        break;
      case KEY_CODE.down:
        ev.preventDefault();
        setIsOpen(true);
        setItemSelected(
          itemSelected === options.length - 1 ? 0 : itemSelected + 1
        );
        break;
      case KEY_CODE.up:
        ev.preventDefault();
        setItemSelected(
          itemSelected - 1 >= 0 ? itemSelected - 1 : options.length - 1
        );
        break;
      case KEY_CODE.RETURN:
      default:
        break;
    }
  };

  const showOptions = isOpen && !loading;

  const inputProps = {
    classMame: "mbl-autocomplete-input",
    id: inputId,
    role: "combobox",
    "aria-haspopup": "listbox",
    "aria-expanded": isOpen,
    "aria-autocomplete": "list",
    "aria-controls": listboxId,
    "aria-activedescendant": isOpen ? `${listboxId}-${itemSelected}` : null,
    autocomplete: "off",
    value: inputValue,
    onChange: handleInputChange,
    onKeyDown: handleInputKey,
    onFocus: handleInputFocus,
    placeholder
  };

  return (
    <div className="mbl-autocomplete" ref={refContainer}>
      <TextControl {...inputProps} />

      {loading && (
        <div className="mbl-listbox">
          <Spinner />
        </div>
      )}

      {showOptions && (
        <Listbox id={listboxId} aria-labelledby={inputId}>

          {options.length === 0 && (<li className="mbl-autocomplete-notmatch">{notMatchText}</li>)}

          {options.length > 0 &&
            options.map((option, index) => (
              <ListItem
                key={`list-item-${index}`}
                id={`${listboxId}-${index}`}
                selected={index === itemSelected}
                onClick={() => selectOption(option)}
              >
                {renderOption ? renderOption(option) : option}
              </ListItem>
            ))}
        </Listbox>
      )}
    </div>
  );
};

export default Autocomplete;
