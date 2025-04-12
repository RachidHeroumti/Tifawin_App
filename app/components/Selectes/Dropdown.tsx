import React, { useState, useCallback } from "react";
import { Platform, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

interface ProductDropdownProps {
  options: Array<{ label: string; value: string }>;
  onSelect: (value: string) => void;
  placeholder?: string;
  index: number;
}

export const ProductDropdown: React.FC<ProductDropdownProps> = ({
  options,
  onSelect,
  placeholder = "Select an option...",
  index = 3,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");

  const filteredOptions = options.filter((item) =>
    item.label.toLowerCase().startsWith(searchText.toLowerCase())
  );

  const handleValueChange = useCallback(
    (callback: (prev: string | null) => string) => {
      const newValue = callback(selectedValue);
      setSelectedValue(newValue);
      onSelect(newValue);
    },
    [selectedValue, onSelect]
  );
  
  const baseZIndex = 1000 * (10 - index);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={selectedValue}
        items={filteredOptions}
        searchable={false}
        searchTextInputProps={{
          value: searchText,
          onChangeText: setSearchText,
        }}
        setOpen={setOpen}
        setValue={handleValueChange}
        style={styles.dropdown}
        placeholder={placeholder}
        dropDownContainerStyle={styles.dropdownList}
        zIndex={baseZIndex}
        zIndexInverse={baseZIndex + 1000}
        listMode={Platform.OS === "ios" ? "MODAL" : "SCROLLVIEW"}
        modalProps={{ animationType: "slide" }}
      />
    </View>
  );
};

const styles = {
  container: {
    marginVertical: 10,
  },
  dropdown: {
    backgroundColor: "#ffffff",
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 4,
  },
  dropdownList: {
    backgroundColor: "#f9f9f9",
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 4,
  },
};

export default React.memo(ProductDropdown);
