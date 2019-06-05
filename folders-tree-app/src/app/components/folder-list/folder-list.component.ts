import { Component, OnInit, Input } from '@angular/core';
import { Folder } from 'src/app/interfaces/folder';

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss']
})
export class FolderListComponent implements OnInit {
  @Input() folderList: Folder[];  
  @Input() folderSelected: Folder;

  constructor() { }

  ngOnInit() {
  }

  onFolderSelected(folderSelected: Folder) {
    this.folderSelected = folderSelected;
  }  
}
