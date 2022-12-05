export interface ITodo {
  id: number;
  title: string;
  desc: string;
  is_completed: boolean;
  owner: IUser;
  created_at: Date;
  updated_at: Date;
}

export interface IUser {
  id: number;
  created_at: Date;
  updated_at: Date;
  username: string;
  email: string;
  is_active: string;
}

export interface ILogin {
  email: string;
  username: string;
  token: string;
  is_staff: boolean;
  is_superuser: boolean;
}

export interface IRegister {
  username: string;
  email: string;
}
