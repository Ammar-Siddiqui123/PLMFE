export interface IEmployee {
  users?:  string | null | undefined;
  userName?: string | null | undefined;
  lastName?:string | null | undefined;
  wsid?:string | null | undefined;
  firstName?: string | null | undefined;
  mi?:string | null | undefined;
  accessLevel?: string | null | undefined;
  deleteBy?:string | null | undefined;
  active?:boolean | null | undefined;
  maximumOrders?: number | null | undefined;
  groupName?:string | null | undefined;
  emailAddress?:string | null | undefined;
  filter?: any | null | undefined;
  controlName?:string | null | undefined;
  newValue?:boolean | null | undefined;
  startDate?:string | null | undefined;
  endDate?:string | null | undefined;
  startRow?:number| null | undefined;
  draw?:number| null | undefined;
  access?:string| null | undefined;
  zone?:string| null | undefined;
  startLocation?:string| null | undefined;
  endLocation?:string| null | undefined;
  oldStartLocation?:string| null | undefined;
  oldEndLocation?:string| null | undefined;
  levelID?:string| null | undefined;
  startShelf?:string| null | undefined;
  endShelf?:string| null | undefined;
  group?:string| null | undefined;
  GroupName?:string| null | undefined;

  }

  export interface Datum {
    controlName: string;
    function: string;
    adminLevel: boolean;
    }

    
export interface DataAccessGroup {
        userName?: string;
        group?: string;
        groupName?:string;
        wsid?:string

        }

  export interface PickLevel {
    pickLevel: number;
    startCarousel: number;
    endCarousel: number;
    startShelf: number;
}

 export interface AllAccess {
    controlName: string;
    function: string;
    adminLevel: boolean;
}

export interface AllGroup {
    groupName: string;
}

export interface ResponseData {
    allAccess?: AllAccess[];
    allGroups?: AllGroup[];
    PickLevel?:PickLevel[];
    bulkRange?: any[];
    handledZones?: string[];
    allZones?: string[];
    data?: Datum[]
 

}

export interface EmployeeObject {
    responseData: ResponseData|null;
    responseMessage: string;
    isExecuted: boolean;
}

export interface AccessGroupObject {
    data:DataAccessGroup;
    responseMessage: string;
    isExecuted: boolean;
}

export interface EmployeeResponse {
  
    firstName: string | null | undefined;
    username: string | null | undefined;
    mi:string | null | undefined;
    active: boolean;
    maximumOrders: number;
    password: string;
    accessLevel: string | null | undefined;
    groupName: string | null | undefined;
    emailAddress: string | null | undefined;
    wsid?: any;
  
    }

export interface AdminEmployeeLookup {
    employees?: EmployeeResponse[];
    data?:any;
}

export interface AdminEmployeeLookupResponse {
  
    responseData: AdminEmployeeLookup|null;
    responseMessage: string;
    isExecuted: boolean;
}
