export interface Folder {
  id: number;
  name: string;
  folders: Folder[];
  isDeleted: boolean;
}
