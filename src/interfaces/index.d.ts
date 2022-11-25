export interface IPost {
  id: number;
  title: string;
  category: { id: number };
  status: "published" | "draft" | "rejected";
  createdAt: string;
}

export interface ICategory {
  id: number;
  title: string;
}
