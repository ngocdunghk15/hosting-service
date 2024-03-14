import { Account } from '~/types/account.type';

export interface DoLoginPayload {
  loginField: string;
  password: string;
}

export interface DoLoginReturned {
  access_token: string;
  refresh_token: string;
  account: Account;
}

export interface DoRegisterPayload {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface GetAccountInfoReturned {
  data: {
    account: Account;
  };
  success: boolean;
}
