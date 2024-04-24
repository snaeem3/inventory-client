import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Stack, Typography, Button, Chip, Box } from '@mui/material';

const CategoryFilter = (props) => {
  const { categories, handleCategoryChange } = props;
  const [activeCategories, setActiveCategories] = useState([]);

  const handleClick = (id) => {
    setActiveCategories((prevActiveCategories) => {
      const index = prevActiveCategories.indexOf(id);
      if (index !== -1) {
        // If the ID is found, remove it from the array
        const newActiveCategories = [...prevActiveCategories];
        newActiveCategories.splice(index, 1);
        return newActiveCategories;
      }
      // If the ID is NOT found, add it to the array
      return [...prevActiveCategories, id];
    });
  };

  const [hovered, setHovered] = useState(false);

  // Call handleCategoryChange with the updated activeCategories
  useEffect(() => {
    handleCategoryChange(activeCategories);
  }, [activeCategories, handleCategoryChange]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="start"
      border="solid 1px lightgray"
      borderRadius={1}
      px={1}
      py={1.5}
      sx={{
        '&:hover': {
          borderColor: 'black',
        },
      }}
      position="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Typography
        variant="caption"
        sx={{
          opacity: { xs: 1, md: hovered ? 1 : 0 },
          transition: 'opacity .3s ease, top .3s ease',
          position: 'absolute',
          top: { xs: '-15%', md: hovered ? '-15%' : '0%' },
          left: '0%',
          transform: 'translate(0%, -50%)',
        }}
      >
        Categories
      </Typography>
      <Stack direction="row" gap={1} flexWrap="wrap">
        {categories.map((category) => (
          <CategoryChip
            key={category._id}
            categoryName={category.name}
            categoryId={category._id}
            isActive={activeCategories.includes(category._id)}
            handleClick={handleClick}
          />
        ))}
      </Stack>
    </Box>
  );
};

const CategoryChip = ({
  categoryName,
  categoryId,
  isActive = false,
  handleClick,
}) => (
  <Chip
    label={categoryName}
    onClick={() => handleClick(categoryId)}
    onDelete={isActive ? () => handleClick(categoryId) : undefined}
    color={isActive ? 'success' : undefined}
    sx={{ px: isActive ? 0 : 1.1 }}
  />
);

export default CategoryFilter;
