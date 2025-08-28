const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'foxhole-map',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

const addNewMapMarkerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddNewMapMarker', inputVars);
}
addNewMapMarkerRef.operationName = 'AddNewMapMarker';
exports.addNewMapMarkerRef = addNewMapMarkerRef;

exports.addNewMapMarker = function addNewMapMarker(dcOrVars, vars) {
  return executeMutation(addNewMapMarkerRef(dcOrVars, vars));
};

const listVerifiedMapMarkersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListVerifiedMapMarkers');
}
listVerifiedMapMarkersRef.operationName = 'ListVerifiedMapMarkers';
exports.listVerifiedMapMarkersRef = listVerifiedMapMarkersRef;

exports.listVerifiedMapMarkers = function listVerifiedMapMarkers(dc) {
  return executeQuery(listVerifiedMapMarkersRef(dc));
};

const confirmMapMarkerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ConfirmMapMarker', inputVars);
}
confirmMapMarkerRef.operationName = 'ConfirmMapMarker';
exports.confirmMapMarkerRef = confirmMapMarkerRef;

exports.confirmMapMarker = function confirmMapMarker(dcOrVars, vars) {
  return executeMutation(confirmMapMarkerRef(dcOrVars, vars));
};

const getMapMarkersByTypeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMapMarkersByType', inputVars);
}
getMapMarkersByTypeRef.operationName = 'GetMapMarkersByType';
exports.getMapMarkersByTypeRef = getMapMarkersByTypeRef;

exports.getMapMarkersByType = function getMapMarkersByType(dcOrVars, vars) {
  return executeQuery(getMapMarkersByTypeRef(dcOrVars, vars));
};
