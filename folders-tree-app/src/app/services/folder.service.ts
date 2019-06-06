import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Folder } from '../interfaces/folder';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  folderSelected$ = new BehaviorSubject<Folder>(null);
  
  constructor() { }
}
