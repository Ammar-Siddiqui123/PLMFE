export interface ILogin {
  userName?: string | null | undefined;
    password?: string | null | undefined;
    token?: string | null | undefined;
    isExecuted?: boolean | null | undefined;
    accessLevel?: string | null | undefined;
    responseMessage?: string | null | undefined;
    loginTime?: string | null | undefined;
    wsid?: string | null | undefined;

  }

export interface ILoginInfo {
    userName?: string;
    password?: string;
    token?: string | null | undefined;
    isExecuted?: boolean | null | undefined;
    accessLevel?: string | null | undefined;
    responseMessage?: string | null | undefined;
    loginTime?: string | null | undefined;
    data?: object | null | undefined;

  }

  