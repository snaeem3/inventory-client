import { useState, useEffect } from 'react';
import {
  FormGroup,
  FormControl,
  FormControlLabel,
  Container,
  Box,
  Typography,
  Stack,
  Button,
  TextField,
  Checkbox,
  Select,
  InputLabel,
  MenuItem,
  Switch,
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

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
    <Container component="form" onSubmit={handleSubmit} maxWidth="xs">
      <Stack spacing={2}>
        {initialImgURL && (
          <img src={initialImgURL} className="item-img" alt="item" />
        )}
        <TextField
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          autoFocus
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          multiline
        />
        <Box component="fieldset">
          <legend>
            <Typography>Categories:</Typography>
          </legend>
          <FormGroup>
            {categories.map((category) => (
              <FormControlLabel
                control={
                  <Checkbox
                    id={category._id}
                    checked={formData.category.some(
                      (formDataCategory) =>
                        formDataCategory._id === category._id,
                    )}
                    onChange={handleCategoryChange}
                  />
                }
                label={category.name}
                key={category._id}
              />
            ))}
          </FormGroup>
        </Box>
        <label>
          <Typography>Value (gold):</Typography>
          <input
            type="number"
            name="value"
            value={formData.value}
            onChange={handleChange}
            min="0"
            step="1"
            style={{
              padding: '.5rem',
              border: '2px solid #ccc',
              borderRadius: '.5rem',
              fontSize: '1rem',
              transition: 'border-color 0.3s ease',
              textAlign: 'center',
            }}
          />
        </label>
        {/* <TextField
        type="number"
        label="Gold Value"
        variant="outlined"
        InputProps={{ inputProps: { min: 0 } }} // Optional: Set minimum value
        style={{ width: '100%' }} // Optional: Adjust width as needed
        onKeyDown={(e) => {
          if (e.key === 'e' || e.key === '-' || e.key === '+' || e.key === '.')
            e.preventDefault();
        }}
      /> */}
        <FormControl>
          <InputLabel id="rarity-label">Rarity</InputLabel>
          <Select
            name="rarity"
            label="Rarity"
            value={formData.rarity}
            onChange={handleChange}
          >
            {[
              'Unknown',
              'Common',
              'Uncommon',
              'Rare',
              'Very Rare',
              'Legendary',
            ].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Switch
              name="equippable"
              checked={formData.equippable}
              onChange={handleChange}
              color="primary"
            />
          }
          label="Equippable"
          sx={{ justifyContent: 'center' }}
        />
        <FormControlLabel
          control={
            <Switch
              name="private"
              checked={formData.private}
              onChange={handleChange}
              color="primary"
            />
          }
          disabled
          label="Private"
          sx={{ justifyContent: 'center' }}
        />

        <Button component="label" startIcon={<AddPhotoAlternateIcon />}>
          Upload Image
          <input
            type="file"
            accept="image/*"
            id="item-image"
            onChange={handleFileChange}
            hidden
          />
        </Button>
        {imagePreview && (
          <Box>
            <img
              src={imagePreview}
              alt="item preview"
              className="img-preview"
              style={{ height: '100%', width: '100%', objectFit: 'contain' }}
            />
          </Box>
        )}
        <Button type="submit" variant="contained" size="large">
          Submit
        </Button>
      </Stack>
    </Container>
  );
};

export default ItemForm;
