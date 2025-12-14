import './SideBar.css';
import SearchBox from '../SearchBox/SearchBox';

export default function Sidebar({ 
  selectedCategory, 
  onCategoryChange, 
  selectedFilter, 
  onFilterChange, 
  searchQuery, 
  onSearchChange 
}) {
  const categories = [
    { label: 'All', value: 'all' },
    { label: 'Donation Boxes', value: 'donation-boxes' }
  ];
  return (
    <div className="sideBar_sidebar">
      <div className="sideBar_sidebar-container">
        <div className="sideBar_categories-section">
          <div className="sideBar_categories-list">
            {categories.map(category => (
              <button
                key={category.value}
                onClick={() => onCategoryChange(selectedCategory === category.value ? 'all' : category.value)}
                className={`sideBar_category-btn ${selectedCategory === category.value ? 'sideBar_category-btn-active' : ''}`}
              >
                {category.label}
              </button>
            ))}
          </div>
          <div className="sideBar_filters-section">
            <div className="sideBar_filters-row">
              <button
                onClick={() => onFilterChange('popular')}
                className={`sideBar_filter-btn ${selectedFilter === 'popular' ? 'sideBar_filter-btn-active' : ''}`}
              >
                Popular
              </button>
              <button
                onClick={() => onFilterChange('recently-opened')}
                className={`sideBar_filter-btn ${selectedFilter === 'recently-opened' ? 'sideBar_filter-btn-active' : ''}`}
              >
                Recently Opened
              </button>
            </div>
            <button
              onClick={() => onFilterChange('ending-soon')}
              className={`sideBar_filter-btn ${selectedFilter === 'ending-soon' ? 'sideBar_filter-btn-active' : ''}`}
            >
              Ending Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}