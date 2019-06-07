import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Folder } from "../interfaces/folder";

@Injectable({
  providedIn: "root"
})
export class FolderService {
  folderSelected$ = new BehaviorSubject<Folder>(null);
  folderList$ = new BehaviorSubject<Folder[]>([]);

  newFolderId = 0;

  constructor() {}

  addFolder(folderName: string) {
    this.newFolderId++;
    const newFolder: Folder = {
      id: this.newFolderId,
      name: folderName,
      folders: [],
      isDeleted: false
    };
    const folderSelected = this.folderSelected$.value;
    if (folderSelected) {
      folderSelected.folders.push(newFolder);
    } else {
      this.folderList$.value.push(newFolder);
    }
    console.log("updated folders: ", this.folderList$.value);
    this.folderList$.next(this.folderList$.value);
  }

  /** Logical Delete */
  deleteFolder() {
    const folder = this.folderSelected$.value;
    if (folder == null) {
      return;
    }
    folder.isDeleted = true;
  }

  findParent(parentId: number, folders: Folder[]): Folder {
    const parent = folders.find(f => f.id === parentId);
    if (parent != null) {
      return parent;
    }
    for (let folder of folders) {
      return this.findParent(parentId, folder.folders);
    }
  }
}
