export interface UserData {
  id: number;
  name: string;
  phone: string;
  idNumber: string;
  picture: string;
}

export interface EditableUserData extends UserData {
  isEditing?: boolean;
}