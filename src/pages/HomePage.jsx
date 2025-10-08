import { useState } from 'react';
import { Link } from 'react-router-dom';
import useSheetData from '../hooks/useSheetData';
import Avatar from '../components/common/Avatar';
import SocialLinks from '../components/common/SocialLinks';
import ProductCard from '../components/common/ProductCard';
import ProductFilter from '../components/common/ProductFilter';
import ShareButton from '../components/common/ShareButton';

function HomePage() {
  const { data, loading, error } = useSheetData();
  const [activeCategory, setActiveCategory] = useState('all');

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Đang tải...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading-container">
        <div className="error-message">
          <h2>Oops!</h2>
          <p>Không thể tải dữ liệu. Vui lòng thử lại sau.</p>
          <p className="error-detail">{error}</p>
        </div>
      </div>
    );
  }

  const { profile, products } = data;

  // Filter products based on active category
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => {
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
        
        return categoryMap[category] === activeCategory;
      });

  return (
    <div className="home-page">
      <ShareButton />
      
      <div className="container">
        {/* Header Section */}
        <header className="profile-header">
          <Avatar 
            src={profile.avatar || profile.avatar_url}
            alt={profile.name || 'Avatar'}
            size="large"
          />
          <h1 className="profile-name">{profile.name || 'Loading...'}</h1>
          <p className="profile-title">{profile.title || ''}</p>
          
          <SocialLinks links={profile} />
        </header>

        {/* Filter Section */}
        {products.length > 0 && (
          <ProductFilter
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            products={products}
          />
        )}

        {/* Products Section */}
        <section className="products-section">
          {products.length === 0 ? (
            <div className="empty-state">
              <p>Chưa có sản phẩm nào</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="empty-state">
              <p>Không có sản phẩm nào trong danh mục này</p>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                />
              ))}
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="page-footer">
          <p>© 2025 {profile.name || 'My Store'}. All rights reserved.</p>
          <Link to="/admin/login" className="admin-link">admin</Link>
        </footer>
      </div>
    </div>
  );
}

export default HomePage;
