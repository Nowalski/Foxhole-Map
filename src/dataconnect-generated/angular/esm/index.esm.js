import { addNewMapMarkerRef, listVerifiedMapMarkersRef, confirmMapMarkerRef, getMapMarkersByTypeRef } from '../../';
import { DataConnect, CallerSdkTypeEnum } from '@angular/fire/data-connect';
import { injectDataConnectQuery, injectDataConnectMutation } from '@tanstack-query-firebase/angular/data-connect';
import { inject, EnvironmentInjector } from '@angular/core';
export function injectAddNewMapMarker(args, injector) {
  return injectDataConnectMutation(addNewMapMarkerRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectListVerifiedMapMarkers(options, injector) {
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

export function injectConfirmMapMarker(args, injector) {
  return injectDataConnectMutation(confirmMapMarkerRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectGetMapMarkersByType(args, options, injector) {
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

