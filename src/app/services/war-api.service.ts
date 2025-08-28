import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { map, switchMap, shareReplay, distinctUntilChanged } from 'rxjs/operators';

export interface WarReport {
  warId: string;
  winner?: string;
  requiredVictoryTowns: number;
  resistanceStartTime: number | null;
  conquestEndTime: number | null;
  totalEnlistments: number;
  colonialCasualties: number;
  wardenCasualties: number;
}

export interface MapData {
  regionId: string;
  scorchedVictoryTowns: number;
  version: number;
  dynamic: DynamicMapData;
  static: StaticMapData;
}

interface DynamicMapData {
  mapItems: MapItem[];
  mapTextItems: MapTextItem[];
  lastUpdated: number;
}

interface StaticMapData {
  regionName: string;
  scorchedEnabled: boolean;
  mapSize: [number, number];
  rawMapTextItems: MapTextItem[];
}

interface MapItem {
  teamId: string;
  iconType: number;
  x: number;
  y: number;
  flags: number;
}

interface MapTextItem {
  text: string;
  x: number;
  y: number;
  mapMarkerType?: number;
}

@Injectable({
  providedIn: 'root'
})
export class WarApiService {
  private readonly API_URL = 'https://war-service-live.foxholeservices.com/api';
  private readonly UPDATE_INTERVAL = 5000; // 5 seconds
  
  private currentWar = new BehaviorSubject<WarReport | null>(null);
  private mapCache = new Map<string, Observable<MapData>>();

  constructor(private http: HttpClient) {
    this.startWarPolling();
  }

  private startWarPolling() {
    interval(this.UPDATE_INTERVAL).pipe(
      switchMap(() => this.fetchWarReport())
    ).subscribe();
  }

  private async fetchWarReport() {
    try {
      const report = await this.http.get<WarReport>(`${this.API_URL}/worldconquest/war`).toPromise();
      this.currentWar.next(report || null);
      return report;
    } catch (error) {
      console.error('Failed to fetch war report:', error);
      return null;
    }
  }

  getCurrentWar(): Observable<WarReport | null> {
    return this.currentWar.asObservable();
  }

  getMapData(regionId: string): Observable<MapData> {
    if (!this.mapCache.has(regionId)) {
      const mapData$ = interval(this.UPDATE_INTERVAL).pipe(
        switchMap(() => this.fetchMapData(regionId)),
        distinctUntilChanged((prev, curr) => {
          return prev.dynamic.lastUpdated === curr.dynamic.lastUpdated;
        }),
        shareReplay(1)
      );
      this.mapCache.set(regionId, mapData$);
    }
    return this.mapCache.get(regionId)!;
  }

  private async fetchMapData(regionId: string): Promise<MapData> {
    const [dynamic, static_] = await Promise.all([
      this.http.get<DynamicMapData>(`${this.API_URL}/worldconquest/maps/${regionId}/dynamic/public`).toPromise(),
      this.http.get<StaticMapData>(`${this.API_URL}/worldconquest/maps/${regionId}/static`).toPromise()
    ]);

    return {
      regionId,
      scorchedVictoryTowns: static_?.scorchedEnabled ? 1 : 0,
      version: 1,
      dynamic,
      static: static_
    } as MapData;
  }

  getWarProgress(): Observable<number> {
    return this.currentWar.pipe(
      map(war => {
        if (!war) return 0;
        // Calculate war progress based on various factors
        const totalProgress = war.totalEnlistments / 10000; // Example calculation
        return Math.min(Math.max(totalProgress, 0), 100);
      })
    );
  }

  getCasualtiesRatio(): Observable<{ colonial: number; warden: number }> {
    return this.currentWar.pipe(
      map(war => {
        if (!war) return { colonial: 0, warden: 0 };
        const total = war.colonialCasualties + war.wardenCasualties;
        return {
          colonial: war.colonialCasualties / total * 100,
          warden: war.wardenCasualties / total * 100
        };
      })
    );
  }
}
