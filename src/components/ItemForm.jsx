import { useState, useEffect } from 'react';

const ItemForm = (props) => {
  const { onSubmit, initialData, categories } = props;
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: [],
    value: 0,
    rarity: 'Unknown',
    equippable: false,
    private: false,
  });

  useEffect(() => {
    if (initialData) {
      const updatedFormData = { ...formData };

      const fieldsToCheck = [
        'name',
        'description',
        'category',
        'value',
        'rarity',
        'equippable',
        'private',
      ];

      // Iterate over the fields and update formData if initialData has defined value
      fieldsToCheck.forEach((field) => {
        if (initialData[field] !== undefined) {
          updatedFormData[field] = initialData[field];
        }
      });

      setFormData(updatedFormData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCategoryChange = (e) => {
    const { id, checked } = e.target;

    let updatedCategory = formData.category;
    if (checked) {
      updatedCategory.push(categories.find((category) => category._id === id));
    } else {
      updatedCategory = updatedCategory.filter(
        (updatedCategoryObj) => updatedCategoryObj._id !== id,
      );
    }

    setFormData((prevData) => ({
      ...prevData,
      category: updatedCategory,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </label>
      <fieldset>
        <legend>Categories:</legend>
        {categories.map((category) => (
          <div key={category._id}>
            <input
              type="checkbox"
              name={category._id}
              id={category._id}
              checked={formData.category.some(
                (formDataCategory) => formDataCategory._id === category._id,
              )}
              onChange={handleCategoryChange}
            />
            <label htmlFor={category._id}>{category.name}</label>
          </div>
        ))}
      </fieldset>
      <label>
        Value (gold):
        <input
          type="number"
          name="value"
          value={formData.value}
          onChange={handleChange}
          min="0"
        />
      </label>
      <label>
        Rarity:
        <select name="rarity" value={formData.rarity} onChange={handleChange}>
          {[
            'Unknown',
            'Common',
            'Uncommon',
            'Rare',
            'Very Rare',
            'Legendary',
          ].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <label>
        Equippable:
        <input
          type="checkbox"
          name="equippable"
          checked={formData.equippable}
          onChange={handleChange}
        />
      </label>
      <label>
        Private:
        <input
          type="checkbox"
          name="private"
          checked={formData.private}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ItemForm;
