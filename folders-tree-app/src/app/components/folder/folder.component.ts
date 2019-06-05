import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Folder } from 'src/app/interfaces/folder';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {
  @Input() folder: Folder;
  @Input() selectedFolder: Folder;
  @Output() folderSelected = new EventEmitter<Folder>();
  
  constructor() { }

  ngOnInit() {
  }

  onClick(event: Event) {
    event.stopPropagation();
    this.folderSelected.emit(this.folder);
  }

}
