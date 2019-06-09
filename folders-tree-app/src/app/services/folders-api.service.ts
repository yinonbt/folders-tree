import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Folder } from "../interfaces/folder";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import "rxjs/add/operator/catch";

@Injectable({
  providedIn: "root"
})
export class FoldersApiService {
  folders$ = new BehaviorSubject<Folder[]>([]);

  constructor(private http: HttpClient) {}

  getAll(): void {
    // const url = `${environment.apiUrl}folders`;
    const  url=`http://localhost:60375/api/Folder`;
    this.http.get<[Folder[]]>(url).subscribe(
      result => {
        if (result) {
          this.folders$.next(result[0]);
        }
      },
      error => {
        console.log("error while getting all Folders: ", error);
      }
    );
  }

  saveAll(folders: Folder[]): void {
    const url = `${environment.apiUrl}folders`;
    this.http.get<[Folder[]]>(url).subscribe(
      result => {
        if (result) {
          const ids: number[] = [];
          for (let folder of result[0]) {
            ids.push(folder.id);
          }
          const httpOptionsDel = {
            headers: new HttpHeaders({
              "Content-Type": "application/json"
            }),
            body: ids
          };

          this.http.delete(url, httpOptionsDel).subscribe(resDel => {
            const httpOptions = {
              headers: new HttpHeaders({
                "Content-Type": "application/json"
              })
            };
            this.http
              .post<Folder[]>(url, JSON.stringify(folders), httpOptions)
              .pipe(
                tap(o => {
                  this.getAll();
                })
              );
          });
        }
      },
      error => {
        console.log("error while saving all Folders: ", error);
      }
    );
  }
}
