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
    <aside className="sidebar">
      <div className="sidebar-container">
        <SearchBox 
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search campaigns"
        />

        <div className="categories-section">
          <h3 className="section-title">Categories</h3>
          <div className="categories-list">
            {categories.map(category => (
              <button
                key={category.value}
                onClick={() => onCategoryChange(category.value)}
                className={`category-btn ${selectedCategory === category.value ? 'category-btn-active' : ''}`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Filters Section */}
          <div className="filters-section">
            <div className="filters-row">
              <button
                onClick={() => onFilterChange('popular')}
                className={`filter-btn ${selectedFilter === 'popular' ? 'filter-btn-active' : ''}`}
              >
                Popular
              </button>
              <button
                onClick={() => onFilterChange('recently-opened')}
                className={`filter-btn ${selectedFilter === 'recently-opened' ? 'filter-btn-active' : ''}`}
              >
                Recently Opened
              </button>
            </div>
            <button
              onClick={() => onFilterChange('ending-soon')}
              className={`filter-btn ${selectedFilter === 'ending-soon' ? 'filter-btn-active' : ''}`}
            >
              Ending Soon
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}