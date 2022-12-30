import { Injectable } from '@angular/core';
import { environment } from "../environments/environment";
import {
  HttpClient,
  HttpEvent,
  HttpParams,
  HttpResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmployee,EmployeeObject,AdminEmployeeLookupResponse,AccessGroupObject, ResponseData,AllGroup,AllAccess } from './Iemployee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { 

  }


  //Test Later
  public getEmployeeData(employee: IEmployee ): Observable<EmployeeObject> {
    let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + basicAuth
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Admin/GetEmployeeData`, employee,httpOptions);
  }
  public getUserGroupNames(employee: any ): Observable<any> {
    let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + basicAuth
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Admin/GetUserGroupNames`, employee,httpOptions);
  }


  public getAdminEmployeeLookup(employee: IEmployee ): Observable<AdminEmployeeLookupResponse> {
    let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + basicAuth
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Admin/EmployeeLookup`, employee,httpOptions);
  }

  

  public employeeStatsInfo(employee: IEmployee ): Observable<AdminEmployeeLookupResponse> {
    let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + basicAuth
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Admin/EmployeeStatsInfo`, employee,httpOptions);
  }


  public saveAdminEmployee(employee: IEmployee ): Observable<AdminEmployeeLookupResponse> {
    let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + basicAuth
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Admin/SaveNewEmployee`, employee,httpOptions);
  }

  public deleteAdminEmployee(employee: IEmployee ): Observable<AdminEmployeeLookupResponse> {
    let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + basicAuth
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Admin/DeleteEmployee`, employee,httpOptions);
  }
  public deleteUserGroup(employee: any ): Observable<any> {
    let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + basicAuth
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Admin/DeleteUserGroup`, employee,httpOptions);
  }


  public updateAdminEmployee(employee: IEmployee ): Observable<AdminEmployeeLookupResponse> {
    let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + basicAuth
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Admin/UpdateEmployee`, employee,httpOptions);
  }
  public cloneGroup(employee: any ): Observable<AdminEmployeeLookupResponse> {
    let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + basicAuth
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Admin/CloneGroup`, employee,httpOptions);
  }

  public getAdminEmployeeDetails(employee: IEmployee ): Observable<EmployeeObject> {
    let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + basicAuth
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Admin/GetEmployeeDetails`, employee,httpOptions);
  }
  
  public getControlName(employee: IEmployee ): Observable<EmployeeObject> {
    let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + basicAuth
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Admin/GetControlName`, employee,httpOptions);
  }

  public updateControlName(employee: IEmployee ): Observable<EmployeeObject> {
    let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + basicAuth
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Admin/UpdateControl`, employee,httpOptions);
  }
  

  public deleteControlName(employee: IEmployee ): Observable<EmployeeObject> {
    let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + basicAuth
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Admin/DeleteControl`, employee,httpOptions);
  }

  public submitControlResponse(employee: IEmployee ): Observable<EmployeeObject> {
    let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + basicAuth
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Admin/SubmitControlResponse`, employee,httpOptions);
  }
  public insertUserGroup(employee: any): Observable<EmployeeObject> {
    let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + basicAuth
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Admin/InsertUserGroup`, employee,httpOptions);
  }

//zone

public getZones(employee: IEmployee ): Observable<AdminEmployeeLookupResponse> {
  let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`)
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + basicAuth
    })
  };
  return this.http.post<any>(`${environment.apiUrl}/Admin/GetZones`, employee,httpOptions);
}

public updateEmployeeZone(employee: IEmployee ): Observable<AdminEmployeeLookupResponse> {
  let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`)
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + basicAuth
    })
  };
  return this.http.post<any>(`${environment.apiUrl}/Admin/UpdateEmployeeZone`, employee,httpOptions);
}

//deleteEmployeeZone

public deleteEmployeeZone(employee: IEmployee ): Observable<EmployeeObject> {
  let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`)
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + basicAuth
    })
  };
  return this.http.post<any>(`${environment.apiUrl}/Admin/DeleteEmployeeZone`, employee,httpOptions);
}

//insertAllAccess
public insertAllAccess(employee: IEmployee ): Observable<EmployeeObject> {
  let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`)
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + basicAuth
    })
  };
  return this.http.post<any>(`${environment.apiUrl}/Admin/InsertAllAccess`, employee,httpOptions);
}

//EmployeeLocation
public insertEmployeeLocation(employee: IEmployee ): Observable<EmployeeObject> {
  let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`)
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + basicAuth
    })
  };
  return this.http.post<any>(`${environment.apiUrl}/Admin/InsertEmployeeLocation`, employee,httpOptions);
}




public updateEmployeeLocation(employee: IEmployee ): Observable<EmployeeObject> {
  let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`)
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + basicAuth
    })
  };
  return this.http.post<any>(`${environment.apiUrl}/Admin/UpdateEmployeeLocation`, employee,httpOptions);
}




public deleteEmployeeLocation(employee: IEmployee ): Observable<EmployeeObject> {
  let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`)
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + basicAuth
    })
  };
  return this.http.post<any>(`${environment.apiUrl}/Admin/DeleteEmployeeLocation`, employee,httpOptions);
}


//picklevels




public insertPickLevels(employee: IEmployee ): Observable<EmployeeObject> {
  let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`)
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + basicAuth
    })
  };
  return this.http.post<any>(`${environment.apiUrl}/Admin/InsertPickLevels`, employee,httpOptions);
}

public updatePickLevels(employee: IEmployee ): Observable<EmployeeObject> {
  let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`)
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + basicAuth
    })
  };
  return this.http.post<any>(`${environment.apiUrl}/Admin/UpdatePickLevels`, employee,httpOptions);
}


public deletePickLevels(employee: IEmployee ): Observable<EmployeeObject> {
  let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`)
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + basicAuth
    })
  };
  return this.http.post<any>(`${environment.apiUrl}/Admin/DeletePickLevels`, employee,httpOptions);
}



//updateAccessGroup

public updateAccessGroup(employee: IEmployee ): Observable<AccessGroupObject> {
  let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`)
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + basicAuth
    })
  };
  return this.http.post<any>(`${environment.apiUrl}/Admin/UpdateAccessGroup`, employee,httpOptions);
}


public insertGroup(employee: IEmployee ): Observable<AccessGroupObject> {
  let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`)
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + basicAuth
    })
  };
  return this.http.post<any>(`${environment.apiUrl}/Admin/InsertGroup`, employee,httpOptions);
}

public insertGroupFunctions(employee: IEmployee ): Observable<AccessGroupObject> {
  let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`)
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + basicAuth
    })
  };
  return this.http.post<any>(`${environment.apiUrl}/Admin/insertGroupFunctions`, employee,httpOptions);
}


public getFunctionByGroup(employee: IEmployee ): Observable<AccessGroupObject> {
  let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`)
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + basicAuth
    })
  };
  return this.http.post<any>(`${environment.apiUrl}/Admin/GetFunctionByGroup`, employee,httpOptions);
}

public updateEmployeesInGroup(employee: IEmployee ): Observable<AdminEmployeeLookupResponse> {
  let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`)
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + basicAuth
    })
  };
  return this.http.post<any>(`${environment.apiUrl}/Admin/UpdateEmployeesInGroup`, employee,httpOptions);
}

public deleteGroup(employee: IEmployee ): Observable<AdminEmployeeLookupResponse> {
  let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`)
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + basicAuth
    })
  };
  return this.http.post<any>(`${environment.apiUrl}/Admin/DeleteGroup`, employee,httpOptions);
}

}
