import { useState } from 'react';

const useTableSelectedItems = ({ pageSize = 10 }) => {
  const [items, setItems] = useState(new Array(pageSize).fill(false));

  const toggleSelectedItem = (index) => {
    const newItems = items.slice();

    newItems[index] = !newItems[index];

    setItems(newItems);
  };

  const isSelected = (index) => items[index];

  const getSelectedIndex = () => {
    const selected = [];

    items.forEach((item, index) => {
      if (item) selected.push(index);
    });

    return selected;
  };

  return {
    isSelected,
    getSelectedIndex,
    toggleSelectedItem
  };
};

export { useTableSelectedItems };
