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
    { label: 'Single-pets', value: 'single-pets' },
    { label: 'Multi-pets', value: 'multi-pets' }
  ];
  
  return (
    <div className="sideBar_sidebar">
      <div className="sideBar_sidebar-container">
        <SearchBox 
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search campaigns"
        />

        <div className="sideBar_categories-section">
          <h3 className="sideBar_section-title">Categories</h3>
          <div className="sideBar_categories-list">
            {categories.map(category => (
              <button
                key={category.value}
                onClick={() => onCategoryChange(category.value)}
                className={`sideBar_category-btn ${selectedCategory === category.value ? 'sideBar_category-btn-active' : ''}`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Filters Section */}
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