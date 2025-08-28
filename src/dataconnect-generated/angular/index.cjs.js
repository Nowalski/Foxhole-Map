const { addNewMapMarkerRef, listVerifiedMapMarkersRef, confirmMapMarkerRef, getMapMarkersByTypeRef } = require('../');
const { DataConnect, CallerSdkTypeEnum } = require('@angular/fire/data-connect');
const { injectDataConnectQuery, injectDataConnectMutation } = require('@tanstack-query-firebase/angular/data-connect');
const { inject, EnvironmentInjector } = require('@angular/core');

exports.injectAddNewMapMarker = function injectAddNewMapMarker(args, injector) {
  return injectDataConnectMutation(addNewMapMarkerRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectListVerifiedMapMarkers = function injectListVerifiedMapMarkers(options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listVerifiedMapMarkersRef(dc),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectConfirmMapMarker = function injectConfirmMapMarker(args, injector) {
  return injectDataConnectMutation(confirmMapMarkerRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectGetMapMarkersByType = function injectGetMapMarkersByType(args, options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  const varsFactoryFn = (typeof args === 'function') ? args : () => args;
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  getMapMarkersByTypeRef(dc, varsFactoryFn()),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

