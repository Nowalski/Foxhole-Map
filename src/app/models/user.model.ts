export interface User {
  uid: string;
  email: string;
  displayName: string;
  lastLogin?: Date;
}

export interface UserPreferences {
  userId: string;
  defaultMapView: {
    center: [number, number];
    zoom: number;
  };
  favoriteRegions: string[];
  selectedLayers: string[];
}
