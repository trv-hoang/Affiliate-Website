import PropTypes from 'prop-types';

const CATEGORIES = [
  { id: 'all', name: 'Tất cả', icon: '🌟' },
  { id: 'dress', name: 'Váy/Đầm', icon: '👗' },
  { id: 'shirt', name: 'Áo', icon: '👕' },
  { id: 'pants', name: 'Quần', icon: '👖' },
  { id: 'shoes', name: 'Giày/Dép', icon: '👠' },
  { id: 'accessories', name: 'Phụ kiện', icon: '💍' },
  { id: 'skincare', name: 'Skincare', icon: '🧴' },
  { id: 'hair', name: 'Tóc', icon: '💇‍♀️' },
  { id: 'makeup', name: 'Makeup', icon: '💄' },
  { id: 'other', name: 'Khác', icon: '📦' },
];

function ProductFilter({ activeCategory, onCategoryChange, products }) {
  // Count products in each category
  const getCategoryCount = (categoryId) => {
    if (categoryId === 'all') return products.length;
    
    return products.filter(product => {
      const category = product.category ? product.category.toLowerCase() : 'other';
      
      // Map Vietnamese names to category IDs
      const categoryMap = {
        'váy/đầm': 'dress',
        'váy': 'dress',
        'đầm': 'dress',
        'áo': 'shirt',
        'quần': 'pants',
        'giày/dép': 'shoes',
        'giày': 'shoes',
        'dép': 'shoes',
        'phụ kiện': 'accessories',
        'skincare': 'skincare',
        'tóc': 'hair',
        'makeup': 'makeup',
        'khác': 'other'
      };
      
      return categoryMap[category] === categoryId;
    }).length;
  };

  return (
    <div className="product-filter">
      <div className="filter-header">
        <h3>Danh mục sản phẩm</h3>
      </div>
      
      <div className="filter-categories">
        {CATEGORIES.map((category) => {
          const count = getCategoryCount(category.id);
          const isActive = activeCategory === category.id;
          
          return (
            <button
              key={category.id}
              className={`filter-pill ${isActive ? 'active' : ''}`}
              onClick={() => onCategoryChange(category.id)}
            >
                            <div className="filter-icon">{category.icon}</div>
              <div className="filter-name">{category.name}</div>
              <div className="filter-count">({count})</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

ProductFilter.propTypes = {
  activeCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
};

export default ProductFilter;