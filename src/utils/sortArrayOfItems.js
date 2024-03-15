const rarityOrder = {
  Unknown: 0,
  Common: 1,
  Uncommon: 2,
  Rare: 3,
  'Very Rare': 4,
  Legendary: 5,
};

/**
 * Sorts an array of items based on the specified sort method.
 * @param {Object[]} arr - The array of items or inventoryItems to be sorted.
 * @param {string} sortMethodString - The sort method string. Possible values are:
 *   - 'A-Z': Sort items alphabetically by name in ascending order.
 *   - 'Z-A': Sort items alphabetically by name in descending order.
 *   - 'value low-high': Sort items by value in ascending order.
 *   - 'value high-low': Sort items by value in descending order.
 *   - 'rarity low-high': Sort items by rarity in ascending order.
 *   - 'rarity high-low': Sort items by rarity in descending order.
 *   - 'weight low-high': Sort items by weight in ascending order.
 *   - 'weight high-low': Sort items by weight in descending order.
 * @param {boolean} [inventoryItem=false] - indicates arr is an array of inventoryItems if true
 * @returns {Object[]} The sorted array of items.
 * @throws {Error} Throws an error if an invalid sort method is provided.
 */
export default function sortArrayOfItems(
  arr,
  sortMethodString,
  inventoryItem = false,
) {
  switch (sortMethodString) {
    case 'A-Z':
      return arr.sort((a, b) =>
        inventoryItem
          ? a.item.name.localeCompare(b.item.name)
          : a.name.localeCompare(b.name),
      );
    case 'Z-A':
      return arr.sort((a, b) =>
        inventoryItem
          ? b.item.name.localeCompare(a.item.name)
          : b.name.localeCompare(a.name),
      );
    case 'value low-high':
      return arr.sort((a, b) =>
        inventoryItem ? a.item.value - b.item.value : a.value - b.value,
      );
    case 'value high-low':
      return arr.sort((a, b) =>
        inventoryItem ? b.item.value - a.item.value : b.value - a.value,
      );
    case 'rarity low-high':
      return arr.sort((a, b) =>
        inventoryItem
          ? rarityOrder[a.item.rarity] - rarityOrder[b.item.rarity]
          : rarityOrder[a.rarity] - rarityOrder[b.rarity],
      );
    case 'rarity high-low':
      return arr.sort((a, b) =>
        inventoryItem
          ? rarityOrder[b.item.rarity] - rarityOrder[a.item.rarity]
          : rarityOrder[b.rarity] - rarityOrder[a.rarity],
      );
    case 'weight low-high':
      return arr.sort((a, b) =>
        inventoryItem ? a.item.weight - b.item.weight : a.weight - b.weight,
      );
    case 'weight high-low':
      return arr.sort((a, b) =>
        inventoryItem ? b.item.weight - a.item.weight : b.weight - a.weight,
      );
    default:
      throw new Error('Invalid sort method');
  }
}
