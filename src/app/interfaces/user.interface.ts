export interface User {
  id: number,
  name: string,
  email: string,
  email_verified_at: string,
  role: Role,
  created_at: string,
  updated_at: string
}

export enum Role {
  SUPERADMIN = 'superadmin',
  ADMIN = 'admin'
}
