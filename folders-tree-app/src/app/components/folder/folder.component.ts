import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import { Folder } from "src/app/interfaces/folder";
import { FolderService } from "src/app/services/folder.service";
import { BehaviorSubject, Subject } from "rxjs";
import "rxjs/add/operator/takeUntil";

@Component({
  selector: "app-folder",
  templateUrl: "./folder.component.html",
  styleUrls: ["./folder.component.scss"]
})
export class FolderComponent implements OnInit, OnDestroy {
  @Input() folder: Folder;
  folderSelected$: BehaviorSubject<Folder>;
  destroy$: Subject<boolean> = new Subject<boolean>();
  isOpen = false;
  isSelected = false;

  constructor(private folderService: FolderService) {
    this.folderSelected$ = folderService.folderSelected$;
    this.folderSelected$.takeUntil(this.destroy$).subscribe(folderSelected => {
      this.setIsOpenIsSelected(folderSelected);
    });
  }

  setIsOpenIsSelected(folderSelected: Folder) {
    if (this.folder == null) {
      return;
    }
    if (folderSelected != null) {
      if (folderSelected.id === this.folder.id) {
        // toggle current node selection
        this.isSelected = !this.isSelected;
        // if current node is not selected, close it
        if (!this.isSelected) {
          this.isOpen = false;
        } else {
          this.isOpen = true;
        }
      } else {
        this.isSelected = false;
        if (this.folder.folders.find(f => f.id === folderSelected.id)) {
          // child node was selected, just stay open
          this.isOpen = true;
        }
      }
    } else {
      // selection is cleared by clicking outside tree
      this.isSelected = false;
    }
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.destroy$.next(true);

    this.destroy$.unsubscribe();
  }

  onClick(event: Event) {
    event.stopPropagation();
    this.folderSelected$.next(this.folder);
  }
}
