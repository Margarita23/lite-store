export default interface IUserData {
    id?: any | null,
    email: string,
    first_name: string,
    last_name: string,
    password: string,
    encrypted_password: string,
    role: number
  }