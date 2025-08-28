import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddNewMapMarkerData {
  mapMarker_insert: MapMarker_Key;
}

export interface AddNewMapMarkerVariables {
  authorId?: UUIDString | null;
  description?: string | null;
  imageUrl?: string | null;
  markerType: string;
  xCoord: number;
  yCoord: number;
}

export interface ConfirmMapMarkerData {
  markerConfirmation_insert: MarkerConfirmation_Key;
}

export interface ConfirmMapMarkerVariables {
  markerId: UUIDString;
  userId: UUIDString;
}

export interface GameSession_Key {
  id: UUIDString;
  __typename?: 'GameSession_Key';
}

export interface GetMapMarkersByTypeData {
  mapMarkers: ({
    id: UUIDString;
    xCoord: number;
    yCoord: number;
    description?: string | null;
    imageUrl?: string | null;
    isVerified?: boolean | null;
  } & MapMarker_Key)[];
}

export interface GetMapMarkersByTypeVariables {
  markerType: string;
}

export interface ListVerifiedMapMarkersData {
  mapMarkers: ({
    id: UUIDString;
    xCoord: number;
    yCoord: number;
    markerType: string;
    description?: string | null;
    imageUrl?: string | null;
  } & MapMarker_Key)[];
}

export interface MapMarker_Key {
  id: UUIDString;
  __typename?: 'MapMarker_Key';
}

export interface MarkerConfirmation_Key {
  markerId: UUIDString;
  userId: UUIDString;
  __typename?: 'MarkerConfirmation_Key';
}

export interface StructureType_Key {
  id: UUIDString;
  __typename?: 'StructureType_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface AddNewMapMarkerRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddNewMapMarkerVariables): MutationRef<AddNewMapMarkerData, AddNewMapMarkerVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddNewMapMarkerVariables): MutationRef<AddNewMapMarkerData, AddNewMapMarkerVariables>;
  operationName: string;
}
export const addNewMapMarkerRef: AddNewMapMarkerRef;

export function addNewMapMarker(vars: AddNewMapMarkerVariables): MutationPromise<AddNewMapMarkerData, AddNewMapMarkerVariables>;
export function addNewMapMarker(dc: DataConnect, vars: AddNewMapMarkerVariables): MutationPromise<AddNewMapMarkerData, AddNewMapMarkerVariables>;

interface ListVerifiedMapMarkersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListVerifiedMapMarkersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListVerifiedMapMarkersData, undefined>;
  operationName: string;
}
export const listVerifiedMapMarkersRef: ListVerifiedMapMarkersRef;

export function listVerifiedMapMarkers(): QueryPromise<ListVerifiedMapMarkersData, undefined>;
export function listVerifiedMapMarkers(dc: DataConnect): QueryPromise<ListVerifiedMapMarkersData, undefined>;

interface ConfirmMapMarkerRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ConfirmMapMarkerVariables): MutationRef<ConfirmMapMarkerData, ConfirmMapMarkerVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ConfirmMapMarkerVariables): MutationRef<ConfirmMapMarkerData, ConfirmMapMarkerVariables>;
  operationName: string;
}
export const confirmMapMarkerRef: ConfirmMapMarkerRef;

export function confirmMapMarker(vars: ConfirmMapMarkerVariables): MutationPromise<ConfirmMapMarkerData, ConfirmMapMarkerVariables>;
export function confirmMapMarker(dc: DataConnect, vars: ConfirmMapMarkerVariables): MutationPromise<ConfirmMapMarkerData, ConfirmMapMarkerVariables>;

interface GetMapMarkersByTypeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMapMarkersByTypeVariables): QueryRef<GetMapMarkersByTypeData, GetMapMarkersByTypeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetMapMarkersByTypeVariables): QueryRef<GetMapMarkersByTypeData, GetMapMarkersByTypeVariables>;
  operationName: string;
}
export const getMapMarkersByTypeRef: GetMapMarkersByTypeRef;

export function getMapMarkersByType(vars: GetMapMarkersByTypeVariables): QueryPromise<GetMapMarkersByTypeData, GetMapMarkersByTypeVariables>;
export function getMapMarkersByType(dc: DataConnect, vars: GetMapMarkersByTypeVariables): QueryPromise<GetMapMarkersByTypeData, GetMapMarkersByTypeVariables>;

