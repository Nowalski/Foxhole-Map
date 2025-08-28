export type Team = 'Colonial' | 'Warden' | null;

export interface User {
  uid: string;
  email: string;
  displayName: string;
  lastLogin?: Date;
  team?: Team;
  lastTeamSwitch?: Date;
  createdAt?: Date;
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
