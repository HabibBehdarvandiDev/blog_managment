type User = {
  id: number;
  first_name: string;
  last_name: string;
  nickname: string;
  date_of_birth: string | null;
  profile_url: string;
  username: string;
  password: string;
  phone_number: string | null;
  active: boolean;
  role_id: number;
  created_at: string;
  updated_at: string;
};

export type { User };
