import { Component, OnInit } from '@angular/core';
import { Folder } from 'src/app/interfaces/folder';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-folders-root',
  templateUrl: './folders-root.component.html',
  styleUrls: ['./folders-root.component.scss']
})
export class FoldersRootComponent implements OnInit {
  folderList: Folder[] = [];
  folderSelected: Folder;
  newFolderId: number = 0;

  foldersFormGroup = this.formBuilder.group({
    formControlFolderName: [null, Validators.required]
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  addFolder() {
    this.newFolderId++;
    const newFolderName = this.foldersFormGroup.get('formControlFolderName').value;
    const newFolder:Folder = {id: this.newFolderId, name: newFolderName, folders: []};
    this.folderList.push(newFolder);
    this.foldersFormGroup.reset();
  }

  clearSelection() {
    console.log('clearSelection');
    this.folderSelected = null;
  }

}
