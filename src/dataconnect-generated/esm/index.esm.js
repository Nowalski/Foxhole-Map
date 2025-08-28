import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'foxhole-map',
  location: 'us-central1'
};

export const addNewMapMarkerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddNewMapMarker', inputVars);
}
addNewMapMarkerRef.operationName = 'AddNewMapMarker';

export function addNewMapMarker(dcOrVars, vars) {
  return executeMutation(addNewMapMarkerRef(dcOrVars, vars));
}

export const listVerifiedMapMarkersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListVerifiedMapMarkers');
}
listVerifiedMapMarkersRef.operationName = 'ListVerifiedMapMarkers';

export function listVerifiedMapMarkers(dc) {
  return executeQuery(listVerifiedMapMarkersRef(dc));
}

export const confirmMapMarkerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ConfirmMapMarker', inputVars);
}
confirmMapMarkerRef.operationName = 'ConfirmMapMarker';

export function confirmMapMarker(dcOrVars, vars) {
  return executeMutation(confirmMapMarkerRef(dcOrVars, vars));
}

export const getMapMarkersByTypeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMapMarkersByType', inputVars);
}
getMapMarkersByTypeRef.operationName = 'GetMapMarkersByType';

export function getMapMarkersByType(dcOrVars, vars) {
  return executeQuery(getMapMarkersByTypeRef(dcOrVars, vars));
}

