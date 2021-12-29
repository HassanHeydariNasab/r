export interface User {
  _id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  phoneNumberVerified: boolean;
  email: string;
  emailVerified: boolean;
  token: string;
  referralToken: string;
}
