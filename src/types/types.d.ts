import { CommentModel } from "@src/models/Comment";

export type UserReqBody = {
    username: string;
    password: string;
  }

  export type UserModel = {
    id: number;
    username: string;
    name: string;
    password: string;
    email: string;
    level: number;
    avatar: string;
    created_at: Date;
    update_at: Date;
    deleted_at: Date;
  }


  export type PostReqBody = {
    user_id: integer;
    caption: string;
    media_url: string;
    is_private: boolean;
    media_type: string | null;
    media_width: Integer;
    media_height: integer;
    created_at: Date;
    updated_at: Date;
  }
