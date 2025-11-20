import { useState, useEffect } from 'react';

// Mock data - replace with actual API calls later
const mockCampaigns = {
  1: { 
    id: 1, 
    name: 'They need your help',
    driveName: 'Emergency Surgery Fund - 1 day ago',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=300&fit=crop',
    amountRaised: 72000,
    goal: 102000,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras semper tempor lacus sit amet tristique. Praesent porta enim nulla, et rutrum odio mollis eu.',
    daysLeft: 14,
    organization: 'Organisation',
    category: 'single-pets'
  },
  2: { 
    id: 2, 
    name: 'Please help Gurt',
    driveName: 'Emergency Surgery Fund',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop',
    amountRaised: 72000,
    goal: 102000,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras semper tempor lacus sit amet tristique. Praesent porta enim nulla, et rutrum odio mollis eu.',
    daysLeft: 11,
    organization: 'Eprem',
    category: 'single-pets'
  },
  3: { 
    id: 3, 
    name: 'Gella',
    driveName: 'Emergency Surgery Fund',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop',
    amountRaised: 72000,
    goal: 102000,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras semper tempor lacus sit amet tristique. Praesent porta enim nulla, et rutrum odio mollis eu.',
    daysLeft: 11,
    organization: 'Gena',
    category: 'multi-pets'
  }
};

export const useCampaign = (campaignId) => {
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API call with delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const foundCampaign = mockCampaigns[campaignId];
        if (foundCampaign) {
          setCampaign(foundCampaign);
        } else {
          setError('Campaign not found');
        }
      } catch (err) {
        setError('Failed to fetch campaign');
      } finally {
        setLoading(false);
      }
    };

    if (campaignId) {
      fetchCampaign();
    }
  }, [campaignId]);

  return { campaign, loading, error };
};