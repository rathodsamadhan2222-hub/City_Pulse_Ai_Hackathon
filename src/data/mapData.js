export const mapMarkers = [
  {
    id: 1,
    type: 'hospital',
    icon: 'local_hospital',
    position: [37.7749, -122.4194],
    color: 'bg-primary',
    glowClass: 'marker-glow-blue',
  },
  {
    id: 2,
    type: 'pothole',
    icon: 'warning',
    position: [37.7760, -122.4155],
    color: 'bg-[#57dffe]',
    glowClass: 'marker-glow-cyan',
    popup: {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoE3piVKwAl6M7EHnyUrsV_gjM643NDLeccWz_JJWy4VWMxiioNQLfEiN9zougkLH4f5qgNQ3kNAb5BvkQm-J5YciWtkieKaRYuhETXLKe65ilAurYwUjgxVU_G2D5LXEIs77pdySFzkodhQWhSc_kt4-HzZwR6rNIJ_z3BMYOF8n6wg3bMS3MRiM6t5TnaUOo_I5rMXFHUWrz2x05fd7-0DKce0ej1b4vpgHyHUiiFuxRXHkidzfukDaT9otFPchDkFUKjJM-4tVK',
      title: 'Pothole Reported',
      description: '412 Market St, Central District. Reported by AI Pulse sensor #092.',
      priority: 'High Priority',
      status: 'Live Status: Pending',
    },
  },
  {
    id: 3,
    type: 'streetlight',
    icon: 'light_off',
    position: [37.7730, -122.4230],
    color: 'bg-[#dae2fd]',
    glowClass: 'marker-glow-cyan',
    small: true,
  },
];

export const mapFilters = {
  infrastructure: [
    { icon: 'delete', label: 'Garbage', checked: true },
    { icon: 'construction', label: 'Potholes', checked: true },
    { icon: 'lightbulb', label: 'Street Lights', checked: false },
  ],
  publicSafety: [
    { icon: 'local_hospital', label: 'Hospitals', checked: true },
    { icon: 'policy', label: 'Police', checked: false },
  ],
};

export const mapCenter = [37.7749, -122.4194];
export const defaultZoom = 14;
