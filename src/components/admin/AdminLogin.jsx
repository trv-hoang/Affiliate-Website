import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if already logged in
  useEffect(() => {
    const adminToken = sessionStorage.getItem('admin_token');
    if (adminToken) {
      onLogin();
      navigate('/admin/dashboard');
    }
  }, [onLogin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Simple check - trong production dùng proper authentication
      if (password === 'Letmeloveyou1@') {
        // Generate token
        const token = Date.now().toString(36);
        sessionStorage.setItem('admin_token', token);
        sessionStorage.setItem('admin_login_time', Date.now());
        
        onLogin();
        navigate('/admin/dashboard');
      } else {
        setError('Mật khẩu không đúng!');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <div className="admin-login-header">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="currentColor"/>
          </svg>
          <h2>Admin Login</h2>
          <p>Đăng nhập để quản lý sản phẩm</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu admin"
              autoComplete="current-password"
              required
              autoFocus
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? (
              <>
                <div className="spinner-small"></div>
                Đang xác thực...
              </>
            ) : (
              'Đăng nhập'
            )}
          </button>
        </form>

        <div className="admin-login-footer">
          <button onClick={() => navigate('/')} className="btn-back">
            ← Quay lại trang chủ
          </button>
        </div>
      </div>
    </div>
  );
}

AdminLogin.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default AdminLogin;
