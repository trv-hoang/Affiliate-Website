// Google Sheets Service - Using official Google Sheets API v4
const SHEET_ID = import.meta.env.VITE_SHEET_ID || '1khbMiT_5NTRyL7H88dUHjMHzjkUR_JE1bWhf7sp49J4';
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

class GoogleSheetsService {
  constructor() {
    this.sheetId = SHEET_ID;
    this.apiKey = API_KEY;
    this.baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets';
  }

  // Helper: Convert rows to objects
  rowsToObjects(rows) {
    if (!rows || rows.length === 0) return [];
    
    // Create header mapping with original indices
    const headerMap = [];
    rows[0].forEach((h, index) => {
      if (h && typeof h === 'string' && h.trim() !== '') {
        headerMap.push({
          name: h.toLowerCase().replace(/\s+/g, '_'),
          index: index
        });
      }
    });
    
    return rows.slice(1).map(row => {
      const obj = {};
      headerMap.forEach(({ name, index }) => {
        obj[name] = row[index] || '';
      });
      return obj;
    });
  }

  // Fetch data using Google Sheets API v4
  async fetchSheet(sheetName) {
    const url = `${this.baseUrl}/${this.sheetId}/values/${sheetName}?key=${this.apiKey}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      const data = await response.json();
      return data.values || [];
    } catch (error) {
      console.error('Error fetching sheet:', error);
      throw error;
    }
  }

  // Get profile data from 'Profile' sheet
  async getProfile() {
    try {
      const rows = await this.fetchSheet('Profile');
      const profile = {};
      
      rows.forEach(([field, value]) => {
        if (field && value) {
          profile[field.toLowerCase().replace(/\s+/g, '_')] = value;
        }
      });
      
      return profile;
    } catch (error) {
      console.error('Error getting profile:', error);
      return {};
    }
  }

  // Get products from 'Products' sheet
  async getProducts() {
    try {
      const rows = await this.fetchSheet('Products');
      
      if (rows.length === 0) {
        return [];
      }
      
      const products = this.rowsToObjects(rows);
      
      const filteredProducts = products
        .filter(p => {
          const isActive = p.active && (
            p.active.toString().toUpperCase() === 'TRUE' || 
            p.active === true || 
            p.active === 'true'
          );
          return isActive;
        })
        .map(p => ({
          id: p.id || '',
          name: p.name || p.product_name || 'Unnamed Product',
          image: p.image || p.image_url || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23FFE8F0" width="400" height="300"/%3E%3Ctext fill="%23FF88B0" font-family="Arial" font-size="24" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ENo Image%3C/text%3E%3C/svg%3E',
          link: p.link || p.shop_link || '#',
          order: parseInt(p.order) || 0,
        }))
        .sort((a, b) => a.order - b.order);
      
      return filteredProducts;
    } catch (error) {
      console.error('Error getting products:', error);
      return [];
    }
  }

  // Get all data (fetch profile and products together)
  async getAllData() {
    try {
      const [profile, products] = await Promise.all([
        this.getProfile(),
        this.getProducts()
      ]);

      return { profile, products };
    } catch (error) {
      console.error('Error getting all data:', error);
      return { profile: {}, products: [] };
    }
  }
}

export const sheetsService = new GoogleSheetsService();
export default sheetsService;
