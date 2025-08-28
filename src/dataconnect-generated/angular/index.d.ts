import { AddNewMapMarkerData, AddNewMapMarkerVariables, ListVerifiedMapMarkersData, ConfirmMapMarkerData, ConfirmMapMarkerVariables, GetMapMarkersByTypeData, GetMapMarkersByTypeVariables } from '../';
import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise} from '@angular/fire/data-connect';
import { CreateQueryResult, CreateMutationResult} from '@tanstack/angular-query-experimental';
import { CreateDataConnectQueryResult, CreateDataConnectQueryOptions, CreateDataConnectMutationResult, DataConnectMutationOptionsUndefinedMutationFn } from '@tanstack-query-firebase/angular/data-connect';
import { FirebaseError } from 'firebase/app';
import { Injector } from '@angular/core';

type AddNewMapMarkerOptions = DataConnectMutationOptionsUndefinedMutationFn<AddNewMapMarkerData, FirebaseError, AddNewMapMarkerVariables>;
export function injectAddNewMapMarker(options?: AddNewMapMarkerOptions, injector?: Injector): CreateDataConnectMutationResult<AddNewMapMarkerData, AddNewMapMarkerVariables, AddNewMapMarkerVariables>;

export type ListVerifiedMapMarkersOptions = () => Omit<CreateDataConnectQueryOptions<ListVerifiedMapMarkersData, undefined>, 'queryFn'>;
export function injectListVerifiedMapMarkers(options?: ListVerifiedMapMarkersOptions, injector?: Injector): CreateDataConnectQueryResult<ListVerifiedMapMarkersData, undefined>;

type ConfirmMapMarkerOptions = DataConnectMutationOptionsUndefinedMutationFn<ConfirmMapMarkerData, FirebaseError, ConfirmMapMarkerVariables>;
export function injectConfirmMapMarker(options?: ConfirmMapMarkerOptions, injector?: Injector): CreateDataConnectMutationResult<ConfirmMapMarkerData, ConfirmMapMarkerVariables, ConfirmMapMarkerVariables>;

type GetMapMarkersByTypeArgs = GetMapMarkersByTypeVariables | (() => GetMapMarkersByTypeVariables);
export type GetMapMarkersByTypeOptions = () => Omit<CreateDataConnectQueryOptions<GetMapMarkersByTypeData, GetMapMarkersByTypeVariables>, 'queryFn'>;
export function injectGetMapMarkersByType(args: GetMapMarkersByTypeArgs, options?: GetMapMarkersByTypeOptions, injector?: Injector): CreateDataConnectQueryResult<GetMapMarkersByTypeData, GetMapMarkersByTypeVariables>;
