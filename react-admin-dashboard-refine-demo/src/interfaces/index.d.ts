import { BaseKey } from "@pankod/refine-core";

export interface ITodo {
  id: BaseKey;
  title: string;
  desc: string;
  is_completed: boolean;
  owner: BaseKey;
  created_at: Date;
  updated_at: Date;
}

export interface IUser {
  id: BaseKey;
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

export interface TodoUniqueCheckRequestQuery {
  title: string;
}

export interface ISubTask {
  id: BaseKey;
  title: string;
  is_completed: boolean;
  todo: BaseKey;
  created_at: Date;
  updated_at: Date;
}

export interface ITodoListResponse {
  data: {
    count: number;
    next: string;
    previous: string;
    results: ITodo[];
  };
}
