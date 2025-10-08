import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSheetData from '../hooks/useSheetData';

function AdminDashboard() {
  const navigate = useNavigate();
  const { data, loading, refresh } = useSheetData();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Auto logout on page close
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem('admin_token');
      sessionStorage.removeItem('admin_login_time');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  // Check auth
  useEffect(() => {
    const token = sessionStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_token');
    sessionStorage.removeItem('admin_login_time');
    navigate('/');
  };

  const openGoogleSheets = () => {
    const sheetId = import.meta.env.VITE_SHEET_ID || '1khbMiT_5NTRyL7H88dUHjMHzjkUR_JE1bWhf7sp49J4';
    window.open(`https://docs.google.com/spreadsheets/d/${sheetId}/edit`, '_blank');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  const { profile, products } = data;
  const activeProducts = products.filter(p => p.id);
  const totalProducts = activeProducts.length;

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="container">
          <div className="admin-header-content">
            <div>
              <h1>🎀 Admin Dashboard</h1>
              <p>Quản lý sản phẩm & thông tin</p>
            </div>
            <button onClick={() => setShowLogoutConfirm(true)} className="btn-logout">
              Đăng xuất
            </button>
          </div>
        </div>
      </header>

      <div className="container">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-content">
              <h3>{totalProducts}</h3>
              <p>Sản phẩm</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">👤</div>
            <div className="stat-content">
              <h3>{profile.name || 'N/A'}</h3>
              <p>Chủ shop</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🔗</div>
            <div className="stat-content">
              <h3>{Object.keys(profile).filter(k => ['youtube', 'facebook', 'tiktok', 'instagram'].includes(k) && profile[k]).length}</h3>
              <p>Social Links</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Quản lý nhanh</h2>
          <div className="action-cards">
            <button className="action-card" onClick={openGoogleSheets}>
              <div className="action-icon">📊</div>
              <h3>Chỉnh sửa Google Sheets</h3>
              <p>Mở Google Sheets để thêm/sửa/xóa sản phẩm</p>
            </button>

            <button className="action-card" onClick={refresh}>
              <div className="action-icon">🔄</div>
              <h3>Refresh Data</h3>
              <p>Tải lại dữ liệu mới nhất từ Sheets</p>
            </button>

            <button className="action-card" onClick={() => navigate('/')}>
              <div className="action-icon">👁️</div>
              <h3>Xem trang User</h3>
              <p>Xem website như khách hàng nhìn thấy</p>
            </button>
          </div>
        </div>

        {/* Products List */}
        <div className="products-list-section">
          <h2>Danh sách sản phẩm ({totalProducts})</h2>
          <div className="products-table">
            {activeProducts.length === 0 ? (
              <p className="empty-state">Chưa có sản phẩm nào</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Link</th>
                    <th>Order</th>
                  </tr>
                </thead>
                <tbody>
                  {activeProducts.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>
                        <img src={product.image} alt={product.name} className="product-thumb" />
                      </td>
                      <td>{product.name}</td>
                      <td>
                        <a href={product.link} target="_blank" rel="noopener noreferrer" className="product-link">
                          Xem link
                        </a>
                      </td>
                      <td>{product.order}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="instructions-section">
          <h3>📝 Hướng dẫn</h3>
          <ul>
            <li>Click <strong>"Chỉnh sửa Google Sheets"</strong> để mở Google Sheets</li>
            <li>Thêm/sửa/xóa sản phẩm trực tiếp trong sheet <strong>"Products"</strong></li>
            <li>Sau khi lưu, click <strong>"Refresh Data"</strong> để cập nhật</li>
            <li>Hoặc chờ 10 phút, website sẽ tự động refresh cache</li>
            <li>Khi đóng tab này, bạn sẽ tự động đăng xuất</li>
          </ul>
        </div>
      </div>

      {/* Logout Confirm Modal */}
      {showLogoutConfirm && (
        <div className="modal-overlay" onClick={() => setShowLogoutConfirm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Xác nhận đăng xuất?</h3>
            <p>Bạn có chắc muốn đăng xuất khỏi admin?</p>
            <div className="modal-actions">
              <button onClick={() => setShowLogoutConfirm(false)} className="btn-cancel">
                Hủy
              </button>
              <button onClick={handleLogout} className="btn-confirm">
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
