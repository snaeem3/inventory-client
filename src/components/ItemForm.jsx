import { useState, useEffect } from 'react';

/**
 * Enum representing different types of rarities.
 * @typedef {'Unknown' | 'Common' | 'Uncommon' | 'Rare' | 'Very Rare' | 'Legendary'} Rarity
 */

/**
 * An Item Form component for creating/updating item data.
 *
 * @component
 * @param {Object} props - The component accepts onSubmit, initialData, and categories as props
 * @param {function} props.onSubmit - Callback function to be run when the form is submitted
 * @param {Object} props.initialData - Initial data for pre-filling form fields (optional)
 * @param {string} [props.initialData.name] - The name of the item.
 * @param {string} [props.initialData.description] - The description of the item.
 * @param {Array<Object>} [props.initialData.category] - The categories of the item.
 * @param {number} [props.initialData.value] - The gold value of the item
 * @param {Rarity} [props.initialData.rarity] - The rarity of the item
 * @param {boolean} [props.initialData.equippable] - Item is equippable
 * @param {boolean} [props.initialData.private] - Item is private
 * @param {string} [props.initialData.picture] - URL of item's picture
 * @param {Object} props.categories - Catalog categories
 * @returns {JSX.Element} The rendered form component.
 */
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
  const [initialImgURL, setInitialImgURL] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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

      if (initialData.picture) {
        setInitialImgURL(initialData.picture);
      }

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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setImage(selectedFile);

    if (selectedFile) {
      const previewURL = URL.createObjectURL(selectedFile);
      setImagePreview(previewURL);
    } else setImagePreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let imgFormDataObj;
    if (image) {
      imgFormDataObj = new FormData();
      imgFormDataObj.append('image', image);
    }
    onSubmit(formData, imgFormDataObj);
  };

  return (
    <form onSubmit={handleSubmit}>
      {initialImgURL && (
        <img src={initialImgURL} className="item-img" alt="item" />
      )}
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
      <label htmlFor="item-image">
        Picture:
        <input
          type="file"
          accept="image/*"
          id="item-image"
          onChange={handleFileChange}
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="item preview"
            width={250}
            height={250}
            className="img-preview"
          />
        )}
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ItemForm;
