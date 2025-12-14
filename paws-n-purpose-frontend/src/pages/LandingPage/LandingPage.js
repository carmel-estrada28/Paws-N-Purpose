import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/Header/Header";
import SideBar from '../../components/SideBar/SideBar';
import DonationBox from '../../components/Projects/DonationBox';
import SearchBox from '../../components/SearchBox/SearchBox';
import SearchModal from '../../components/SearchModal/SearchModal';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();

  const modalRef = React.useRef(null);
  const searchRowRef = React.useRef(null);

  const [searchModalOpen, setSearchModalOpen] = React.useState(false);
  const [modalStyle, setModalStyle] = React.useState(null);
  const [rowStyle, setRowStyle] = React.useState(null);
  const [placeholderHeight, setPlaceholderHeight] = React.useState(0);

  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [selectedFilter, setSelectedFilter] = React.useState('popular');
  const [searchQuery, setSearchQuery] = React.useState('');

  React.useEffect(() => {
    function handleClickOutside(e) {
      const modalNode = modalRef.current;
      const rowNode = searchRowRef.current;

      if (
        modalNode &&
        !modalNode.contains(e.target) &&
        !(rowNode && rowNode.contains(e.target))
      ) {
        setSearchModalOpen(false);
      }
    }

    function handleEsc(e) {
      if (e.key === 'Escape') setSearchModalOpen(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  React.useEffect(() => {
    if (!searchModalOpen) {
      setModalStyle(null);
      setRowStyle(null);
      setPlaceholderHeight(0);
      return;
    }

    function computeStyle() {
      const row = searchRowRef.current;
      if (!row) return;

      const rect = row.getBoundingClientRect();

      const rowFixed = {
        position: 'fixed',
        left: `${rect.left}px`,
        top: `${rect.top}px`,
        width: `${rect.width}px`,
        zIndex: 1200
      };

      const modalFixed = {
        position: 'fixed',
        left: `${rect.left}px`,
        top: `${rect.bottom}px`,
        width: `${rect.width}px`,
        zIndex: 1200
      };

      setRowStyle(rowFixed);
      setModalStyle(modalFixed);
      setPlaceholderHeight(rect.height);
    }

    computeStyle();
    window.addEventListener('resize', computeStyle);

    return () => {
      window.removeEventListener('resize', computeStyle);
    };
  }, [searchModalOpen]);

  const donationBoxes = [
    {
      id: 1,
      title: 'Operation Rescue 2025',
      description: 'Max was found abandoned with a broken leg. He needs immediate surgery to walk again and live...',
      image: 'https://i.pinimg.com/1200x/ed/09/16/ed0916a30e5d23e1c94c08dd8b8fb41f.jpg',
      amountRaised: 12000,
      goal: 100000,
      daysLeft: 12,
      targetDate: 'June 15, 2026',
      category: 'donation-boxes',
    },
    {
      id: 2,
      title: 'Operation Rescue 2025',
      description: 'Max was found abandoned with a broken leg. He needs immediate surgery to walk again and live...',
      image: 'https://i.pinimg.com/1200x/ed/09/16/ed0916a30e5d23e1c94c08dd8b8fb41f.jpg',
      amountRaised: 12000,
      goal: 100000,
      daysLeft: 12,
      targetDate: 'June 15, 2026',
      category: 'donation-boxes',
    },
    {
      id: 3,
      title: 'Operation Rescue 2025',
      description: 'Max was found abandoned with a broken leg. He needs immediate surgery to walk again and live...',
      image: 'https://i.pinimg.com/1200x/ed/09/16/ed0916a30e5d23e1c94c08dd8b8fb41f.jpg',
      amountRaised: 12000,
      goal: 100000,
      daysLeft: 12,
      targetDate: 'June 15, 2026',
      category: 'donation-boxes',
    },
    {
      id: 4,
      title: 'Operation Rescue 2025',
      description: 'Max was found abandoned with a broken leg. He needs immediate surgery to walk again and live...',
      image: 'https://i.pinimg.com/1200x/ed/09/16/ed0916a30e5d23e1c94c08dd8b8fb41f.jpg',
      amountRaised: 12000,
      goal: 100000,
      daysLeft: 12,
      targetDate: 'June 15, 2026',
      category: 'donation-boxes',
    },
    {
      id: 5,
      title: 'Operation Rescue 2025',
      description: 'Max was found abandoned with a broken leg. He needs immediate surgery to walk again and live...',
      image: 'https://i.pinimg.com/1200x/ed/09/16/ed0916a30e5d23e1c94c08dd8b8fb41f.jpg',
      amountRaised: 12000,
      goal: 100000,
      daysLeft: 12,
      targetDate: 'June 15, 2026',
      category: 'donation-boxes',
    },
    {
      id: 6,
      title: 'Operation Rescue 2025',
      description: 'Max was found abandoned with a broken leg. He needs immediate surgery to walk again and live...',
      image: 'https://i.pinimg.com/1200x/ed/09/16/ed0916a30e5d23e1c94c08dd8b8fb41f.jpg',
      amountRaised: 12000,
      goal: 100000,
      daysLeft: 12,
      targetDate: 'June 15, 2026',
      category: 'donation-boxes',
    },
  ];

  const filteredDonationBoxes = donationBoxes.filter(box => {
    const categoryMatch =
      selectedCategory === 'all' || box.category === selectedCategory;

    const searchMatch =
      box.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      box.description.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && searchMatch;
  });

  const sortedAndFilteredDonationBoxes = [...filteredDonationBoxes].sort(
    (a, b) => {
      switch (selectedFilter) {
        case 'popular':
          return (b.amountRaised / b.goal) - (a.amountRaised / a.goal);
        case 'recently-opened':
          return b.id - a.id;
        case 'ending-soon':
          return a.daysLeft - b.daysLeft;
        default:
          return 0;
      }
    }
  );

  const handleViewDonationBox = (id) => {
    navigate(`/donation-box/${id}`, {
      state: { from: '/landing', isPublic: true }
    });
  };

  const handleDonate = (id) => {
    navigate('/login', {
      state: { from: `/donation-box/${id}`, isPublic: true }
    });
  };

  return (
    <div className="landing-page">
      <Header withColor={true} isLoggedIn={false} isFixed={true} />

      <SideBar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categoriesOverride={[
          { label: 'All', value: 'all' },
          { label: 'Donation Boxes', value: 'donation-boxes' }
        ]}
      />

      <div className="main-content-new">
        <div className="landing-search-row-wrapper">
          {rowStyle && (
            <div style={{ height: placeholderHeight }} aria-hidden="true" />
          )}

          <div
            className="landing-search-row"
            ref={searchRowRef}
            style={rowStyle || {}}
          >
            <SearchBox
              value={searchQuery}
              onChange={(val) => {
                setSearchQuery(val);
                setSearchModalOpen(true);
              }}
              placeholder="Search donations"
              onFocus={() => setSearchModalOpen(true)}
            />
          </div>
        </div>

        <SearchModal
          isOpen={searchModalOpen}
          modalRef={modalRef}
          modalStyle={modalStyle}
          campaigns={filteredDonationBoxes}
          onCampaignSelect={(id) => {
            setSearchModalOpen(false);
            // Navigate to public donation box view
            navigate(`/donation-box/${id}`, {
              state: { from: '/landing', isPublic: true }
            });
          }}
          navigate={navigate}
        />

        <div className="discover-row">
          <h2 className="discover-title">Discover Donations</h2>
          <div className="discover-breadcrumb">&nbsp;›&nbsp;All</div>
        </div>

        <div
          className="campaigns-list-new"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
            marginTop: '2rem',
          }}
        >
          {sortedAndFilteredDonationBoxes.length === 0 ? (
            <div className="no-campaigns" style={{ gridColumn: '1 / -1' }}>
              <p>No donation boxes found matching your criteria.</p>
            </div>
          ) : (
            sortedAndFilteredDonationBoxes.map(box => (
              <div
                key={box.id}
                style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'stretch', cursor: 'pointer' }}
                onClick={e => {
                  // Prevent click if a button was clicked
                  if (e.target.tagName === 'BUTTON') return;
                  handleViewDonationBox(box.id);
                }}
              >
                <DonationBox
                  donationBox={box}
                  hasMaxWidth={true}
                  onView={() => handleViewDonationBox(box.id)}
                  onDonate={() => handleDonate(box.id)}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
