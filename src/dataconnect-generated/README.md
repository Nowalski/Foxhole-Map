# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `Angular README`, you can find it at [`dataconnect-generated/angular/README.md`](./angular/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListVerifiedMapMarkers*](#listverifiedmapmarkers)
  - [*GetMapMarkersByType*](#getmapmarkersbytype)
- [**Mutations**](#mutations)
  - [*AddNewMapMarker*](#addnewmapmarker)
  - [*ConfirmMapMarker*](#confirmmapmarker)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListVerifiedMapMarkers
You can execute the `ListVerifiedMapMarkers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listVerifiedMapMarkers(): QueryPromise<ListVerifiedMapMarkersData, undefined>;

interface ListVerifiedMapMarkersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListVerifiedMapMarkersData, undefined>;
}
export const listVerifiedMapMarkersRef: ListVerifiedMapMarkersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listVerifiedMapMarkers(dc: DataConnect): QueryPromise<ListVerifiedMapMarkersData, undefined>;

interface ListVerifiedMapMarkersRef {
  ...
  (dc: DataConnect): QueryRef<ListVerifiedMapMarkersData, undefined>;
}
export const listVerifiedMapMarkersRef: ListVerifiedMapMarkersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listVerifiedMapMarkersRef:
```typescript
const name = listVerifiedMapMarkersRef.operationName;
console.log(name);
```

### Variables
The `ListVerifiedMapMarkers` query has no variables.
### Return Type
Recall that executing the `ListVerifiedMapMarkers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListVerifiedMapMarkersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListVerifiedMapMarkers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listVerifiedMapMarkers } from '@dataconnect/generated';


// Call the `listVerifiedMapMarkers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listVerifiedMapMarkers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listVerifiedMapMarkers(dataConnect);

console.log(data.mapMarkers);

// Or, you can use the `Promise` API.
listVerifiedMapMarkers().then((response) => {
  const data = response.data;
  console.log(data.mapMarkers);
});
```

### Using `ListVerifiedMapMarkers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listVerifiedMapMarkersRef } from '@dataconnect/generated';


// Call the `listVerifiedMapMarkersRef()` function to get a reference to the query.
const ref = listVerifiedMapMarkersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listVerifiedMapMarkersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.mapMarkers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.mapMarkers);
});
```

## GetMapMarkersByType
You can execute the `GetMapMarkersByType` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMapMarkersByType(vars: GetMapMarkersByTypeVariables): QueryPromise<GetMapMarkersByTypeData, GetMapMarkersByTypeVariables>;

interface GetMapMarkersByTypeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMapMarkersByTypeVariables): QueryRef<GetMapMarkersByTypeData, GetMapMarkersByTypeVariables>;
}
export const getMapMarkersByTypeRef: GetMapMarkersByTypeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMapMarkersByType(dc: DataConnect, vars: GetMapMarkersByTypeVariables): QueryPromise<GetMapMarkersByTypeData, GetMapMarkersByTypeVariables>;

interface GetMapMarkersByTypeRef {
  ...
  (dc: DataConnect, vars: GetMapMarkersByTypeVariables): QueryRef<GetMapMarkersByTypeData, GetMapMarkersByTypeVariables>;
}
export const getMapMarkersByTypeRef: GetMapMarkersByTypeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMapMarkersByTypeRef:
```typescript
const name = getMapMarkersByTypeRef.operationName;
console.log(name);
```

### Variables
The `GetMapMarkersByType` query requires an argument of type `GetMapMarkersByTypeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetMapMarkersByTypeVariables {
  markerType: string;
}
```
### Return Type
Recall that executing the `GetMapMarkersByType` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMapMarkersByTypeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetMapMarkersByType`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMapMarkersByType, GetMapMarkersByTypeVariables } from '@dataconnect/generated';

// The `GetMapMarkersByType` query requires an argument of type `GetMapMarkersByTypeVariables`:
const getMapMarkersByTypeVars: GetMapMarkersByTypeVariables = {
  markerType: ..., 
};

// Call the `getMapMarkersByType()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMapMarkersByType(getMapMarkersByTypeVars);
// Variables can be defined inline as well.
const { data } = await getMapMarkersByType({ markerType: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMapMarkersByType(dataConnect, getMapMarkersByTypeVars);

console.log(data.mapMarkers);

// Or, you can use the `Promise` API.
getMapMarkersByType(getMapMarkersByTypeVars).then((response) => {
  const data = response.data;
  console.log(data.mapMarkers);
});
```

### Using `GetMapMarkersByType`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMapMarkersByTypeRef, GetMapMarkersByTypeVariables } from '@dataconnect/generated';

// The `GetMapMarkersByType` query requires an argument of type `GetMapMarkersByTypeVariables`:
const getMapMarkersByTypeVars: GetMapMarkersByTypeVariables = {
  markerType: ..., 
};

// Call the `getMapMarkersByTypeRef()` function to get a reference to the query.
const ref = getMapMarkersByTypeRef(getMapMarkersByTypeVars);
// Variables can be defined inline as well.
const ref = getMapMarkersByTypeRef({ markerType: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMapMarkersByTypeRef(dataConnect, getMapMarkersByTypeVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.mapMarkers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.mapMarkers);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## AddNewMapMarker
You can execute the `AddNewMapMarker` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addNewMapMarker(vars: AddNewMapMarkerVariables): MutationPromise<AddNewMapMarkerData, AddNewMapMarkerVariables>;

interface AddNewMapMarkerRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddNewMapMarkerVariables): MutationRef<AddNewMapMarkerData, AddNewMapMarkerVariables>;
}
export const addNewMapMarkerRef: AddNewMapMarkerRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addNewMapMarker(dc: DataConnect, vars: AddNewMapMarkerVariables): MutationPromise<AddNewMapMarkerData, AddNewMapMarkerVariables>;

interface AddNewMapMarkerRef {
  ...
  (dc: DataConnect, vars: AddNewMapMarkerVariables): MutationRef<AddNewMapMarkerData, AddNewMapMarkerVariables>;
}
export const addNewMapMarkerRef: AddNewMapMarkerRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addNewMapMarkerRef:
```typescript
const name = addNewMapMarkerRef.operationName;
console.log(name);
```

### Variables
The `AddNewMapMarker` mutation requires an argument of type `AddNewMapMarkerVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddNewMapMarkerVariables {
  authorId?: UUIDString | null;
  description?: string | null;
  imageUrl?: string | null;
  markerType: string;
  xCoord: number;
  yCoord: number;
}
```
### Return Type
Recall that executing the `AddNewMapMarker` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddNewMapMarkerData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddNewMapMarkerData {
  mapMarker_insert: MapMarker_Key;
}
```
### Using `AddNewMapMarker`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addNewMapMarker, AddNewMapMarkerVariables } from '@dataconnect/generated';

// The `AddNewMapMarker` mutation requires an argument of type `AddNewMapMarkerVariables`:
const addNewMapMarkerVars: AddNewMapMarkerVariables = {
  authorId: ..., // optional
  description: ..., // optional
  imageUrl: ..., // optional
  markerType: ..., 
  xCoord: ..., 
  yCoord: ..., 
};

// Call the `addNewMapMarker()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addNewMapMarker(addNewMapMarkerVars);
// Variables can be defined inline as well.
const { data } = await addNewMapMarker({ authorId: ..., description: ..., imageUrl: ..., markerType: ..., xCoord: ..., yCoord: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addNewMapMarker(dataConnect, addNewMapMarkerVars);

console.log(data.mapMarker_insert);

// Or, you can use the `Promise` API.
addNewMapMarker(addNewMapMarkerVars).then((response) => {
  const data = response.data;
  console.log(data.mapMarker_insert);
});
```

### Using `AddNewMapMarker`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addNewMapMarkerRef, AddNewMapMarkerVariables } from '@dataconnect/generated';

// The `AddNewMapMarker` mutation requires an argument of type `AddNewMapMarkerVariables`:
const addNewMapMarkerVars: AddNewMapMarkerVariables = {
  authorId: ..., // optional
  description: ..., // optional
  imageUrl: ..., // optional
  markerType: ..., 
  xCoord: ..., 
  yCoord: ..., 
};

// Call the `addNewMapMarkerRef()` function to get a reference to the mutation.
const ref = addNewMapMarkerRef(addNewMapMarkerVars);
// Variables can be defined inline as well.
const ref = addNewMapMarkerRef({ authorId: ..., description: ..., imageUrl: ..., markerType: ..., xCoord: ..., yCoord: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addNewMapMarkerRef(dataConnect, addNewMapMarkerVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.mapMarker_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.mapMarker_insert);
});
```

## ConfirmMapMarker
You can execute the `ConfirmMapMarker` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
confirmMapMarker(vars: ConfirmMapMarkerVariables): MutationPromise<ConfirmMapMarkerData, ConfirmMapMarkerVariables>;

interface ConfirmMapMarkerRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ConfirmMapMarkerVariables): MutationRef<ConfirmMapMarkerData, ConfirmMapMarkerVariables>;
}
export const confirmMapMarkerRef: ConfirmMapMarkerRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
confirmMapMarker(dc: DataConnect, vars: ConfirmMapMarkerVariables): MutationPromise<ConfirmMapMarkerData, ConfirmMapMarkerVariables>;

interface ConfirmMapMarkerRef {
  ...
  (dc: DataConnect, vars: ConfirmMapMarkerVariables): MutationRef<ConfirmMapMarkerData, ConfirmMapMarkerVariables>;
}
export const confirmMapMarkerRef: ConfirmMapMarkerRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the confirmMapMarkerRef:
```typescript
const name = confirmMapMarkerRef.operationName;
console.log(name);
```

### Variables
The `ConfirmMapMarker` mutation requires an argument of type `ConfirmMapMarkerVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ConfirmMapMarkerVariables {
  markerId: UUIDString;
  userId: UUIDString;
}
```
### Return Type
Recall that executing the `ConfirmMapMarker` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ConfirmMapMarkerData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ConfirmMapMarkerData {
  markerConfirmation_insert: MarkerConfirmation_Key;
}
```
### Using `ConfirmMapMarker`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, confirmMapMarker, ConfirmMapMarkerVariables } from '@dataconnect/generated';

// The `ConfirmMapMarker` mutation requires an argument of type `ConfirmMapMarkerVariables`:
const confirmMapMarkerVars: ConfirmMapMarkerVariables = {
  markerId: ..., 
  userId: ..., 
};

// Call the `confirmMapMarker()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await confirmMapMarker(confirmMapMarkerVars);
// Variables can be defined inline as well.
const { data } = await confirmMapMarker({ markerId: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await confirmMapMarker(dataConnect, confirmMapMarkerVars);

console.log(data.markerConfirmation_insert);

// Or, you can use the `Promise` API.
confirmMapMarker(confirmMapMarkerVars).then((response) => {
  const data = response.data;
  console.log(data.markerConfirmation_insert);
});
```

### Using `ConfirmMapMarker`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, confirmMapMarkerRef, ConfirmMapMarkerVariables } from '@dataconnect/generated';

// The `ConfirmMapMarker` mutation requires an argument of type `ConfirmMapMarkerVariables`:
const confirmMapMarkerVars: ConfirmMapMarkerVariables = {
  markerId: ..., 
  userId: ..., 
};

// Call the `confirmMapMarkerRef()` function to get a reference to the mutation.
const ref = confirmMapMarkerRef(confirmMapMarkerVars);
// Variables can be defined inline as well.
const ref = confirmMapMarkerRef({ markerId: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = confirmMapMarkerRef(dataConnect, confirmMapMarkerVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.markerConfirmation_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.markerConfirmation_insert);
});
```

