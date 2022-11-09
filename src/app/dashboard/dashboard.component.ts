import { Component, OnInit } from '@angular/core';
import { disableDebugTools } from '@angular/platform-browser';

import { IEmployee,EmployeeObject,AdminEmployeeLookupResponse,AccessGroupObject } from '../Iemployee';
import { EmployeeService } from '../employee.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sideBarOpen: boolean = true;
  emp: IEmployee;
  empRes:EmployeeObject;
  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {
    //get employee
  //   this.getEmployee()

  //  this.getAdminEmployeeDetails() 

     this.employeeLookup()

  //    this.saveEmployee()

  //    this.deleteEmployee()
     
  //    this.updateEmployee()

  //    this.getControlName()

  //    this.updateControlName()

  //    this.deleteControlName() 

  //    this.submitControlName()

    //  this.employeeStatsInfo()

    //  this.getZones() 
    // this.insertAllAccess()

    // this.updateEmployeeZone();
    
    // this.deleteEmployeeZone()
    // this.insertEmployeeLocation() 
    // this.updateEmployeeLocation()
    // this.deleteEmployeeLocation() 
    // this.insertPickLevels() 
    // this.updatePickLevels()
    // this.deletePickLevels()
    // this.updateAccessGroup()
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  //Methods

  //Employees

  //get employee
  getEmployee() {
    this.emp = {
  "userName": "1234",
  "wsid": "TESTWSID"
    };
this.employeeService.getEmployeeData(this.emp)
.subscribe((response: EmployeeObject) => {
  console.log(response);


  });
}

  //get employee stats info
  employeeStatsInfo() {
    this.emp = {
      "users": "1234",
      "startDate": "2019-10-27",
      "endDate": "2020-10-27",
      "startRow": 1,
      "draw": 10,
      "userName": "string",
      "wsid": "string"
    };
this.employeeService.employeeStatsInfo(this.emp)
.subscribe((response: AdminEmployeeLookupResponse) => {
  console.log(response);


  });
}

//get employee Lookup

employeeLookup() {
  this.emp = {
    "lastName": "%",   
    "userName": "1234",
    "wsid": "TESTWSID"
  };
this.employeeService.getAdminEmployeeLookup(this.emp)
.subscribe((response: AdminEmployeeLookupResponse) => {
console.log(response);


});
}

//save employee Lookup

// saveEmployee() {
//   this.emp = {
//     "lastName": "AsifAhmedtwo",
//     "firstName": "Admin",
//     "userName": "asifadmin12",
//     "mi": "",
//     "accessLevel": "Administrator",
//     "wsid": "TESTWSID"
//   };

  
// this.employeeService.saveAdminEmployee(this.emp)
// .subscribe((response: AdminEmployeeLookupResponse) => {
// console.log(response);


// });
// }

//delete employee Lookup
deleteEmployee() {
  this.emp = {
    "userName": "asifadmin12",
    "deleteBy": "1234",
    "wsid": "TESTWSID"
  };
this.employeeService.deleteAdminEmployee(this.emp)
.subscribe((response: AdminEmployeeLookupResponse) => {
console.log(response);


});

}


//update employee Lookup
updateEmployee() {
  this.emp = {
    "userName": "asifadmin",
    "lastName": "Ahmed",
    "firstName": "admin",
    "mi": "",
    "active": true,
    "maximumOrders": 10,
    "accessLevel": "",
    "groupName": "",
    "emailAddress": "aa@gmail.com",
    "wsid": "TESTWID"
  };
this.employeeService.updateAdminEmployee(this.emp)
.subscribe((response: AdminEmployeeLookupResponse) => {
console.log(response);


});

}


//update employee Lookup
getAdminEmployeeDetails() {
  this.emp = {
    "userName": "1234",
    "wsid": "TESTWID"
  };
this.employeeService.getAdminEmployeeDetails(this.emp)
.subscribe((response: EmployeeObject) => {
console.log(response);


});

}


//control Name

//get control name
getControlName() {
  this.emp = {
    "userName": "1234",
    "wsid": "TESTWSID",
    "filter": "%"
  };
this.employeeService.getControlName(this.emp)
.subscribe((response: EmployeeObject) => {
console.log(response);


});

}

//update control name
updateControlName() {
  this.emp = {
   "controlName": "Admin Create Orders",
  "newValue": true
  };
this.employeeService.updateControlName(this.emp)
.subscribe((response: EmployeeObject) => {
console.log(response);


});

}

//delete control name
deleteControlName() {
  this.emp = {
  "controlName": "Admin Create Orders",
  "userName": "1234"
  };
this.employeeService.deleteControlName(this.emp)
.subscribe((response: EmployeeObject) => {
console.log(response);


});

}

//submit control name
submitControlName() {
  this.emp = {
  "controlName": "Admin Create Orders",
  "userName": "1234"
  };
this.employeeService.submitControlResponse(this.emp)
.subscribe((response: EmployeeObject) => {
console.log(response);


});

}

//zones

// updateEmployeeZone

updateEmployeeZone() {
  this.emp = {
  "userName": "1234",
  "zone": "01",

  };
this.employeeService.updateEmployeeZone(this.emp)
.subscribe((response: AdminEmployeeLookupResponse) => {
console.log(response);


});

}

//deleteEmployeeZone

deleteEmployeeZone() {
  this.emp = {
  "userName": "1234",
  "zone": "01",

  };
this.employeeService.deleteEmployeeZone(this.emp)
.subscribe((response: AdminEmployeeLookupResponse) => {
console.log(response);


});

}












//get zones



getZones() {
  this.emp = {
  "userName": "1234",
  "wsid": "TESTWID"
  };
this.employeeService.getZones(this.emp)
.subscribe((response: AdminEmployeeLookupResponse) => {
console.log(response);


});

}


//InsertAllAccess

insertAllAccess() {
  this.emp = {
  "userName": "1234",
  "access": "Administrator",
  "wsid": "TESTWID"
  };
this.employeeService.insertAllAccess(this.emp)
.subscribe((response: AdminEmployeeLookupResponse) => {
console.log(response);


});

}

//EmployeeLocation

insertEmployeeLocation() {
  this.emp = {
  "userName": "1234",
  "startLocation": "01",
  "endLocation": "05"
  };
this.employeeService.insertEmployeeLocation(this.emp)
.subscribe((response: AdminEmployeeLookupResponse) => {
console.log(response);


});

}

updateEmployeeLocation() {
  this.emp = {
    "userName": "1234",
    "startLocation": "02",
    "endLocation": "05",
    "oldStartLocation": "01",
    "oldEndLocation": "05"
  };
this.employeeService.updateEmployeeLocation(this.emp)
.subscribe((response: AdminEmployeeLookupResponse) => {
console.log(response);


});

}

deleteEmployeeLocation() {
  this.emp = {
    "userName": "1234",
    "startLocation": "02",
    "endLocation": "05"
  };
this.employeeService.deleteEmployeeLocation(this.emp)
.subscribe((response: AdminEmployeeLookupResponse) => {
console.log(response);


});

}

//PickLevels
insertPickLevels() {
  this.emp = {
    "userName": "1234",
    "wsid": "TESTWID",
    "levelID": "01",
    "startShelf": "01",
    "endShelf": "05"
  };
this.employeeService.insertPickLevels(this.emp)
.subscribe((response: AdminEmployeeLookupResponse) => {
console.log(response);


});

}


updatePickLevels() {
  this.emp = {
    "userName": "1234",
    "wsid": "TESTWID",
    "levelID": "01",
    "startShelf": "01",
    "endShelf": "05"
  };
this.employeeService.updatePickLevels(this.emp)
.subscribe((response: AdminEmployeeLookupResponse) => {
console.log(response);


});

}

deletePickLevels() {
  this.emp = {
    "userName": "1234",
    "wsid": "TESTWID",
    "levelID": "01",
    "startShelf": "01",
    "endShelf": "05"
  };
this.employeeService.deletePickLevels(this.emp)
.subscribe((response: AdminEmployeeLookupResponse) => {
console.log(response);


});

}


//UpdateAccessGroup

updateAccessGroup() {
  this.emp = {
    "userName": "1234",
    "group": "Administrator"

  };
this.employeeService.updateAccessGroup(this.emp)
.subscribe((response: AccessGroupObject) => {
console.log(response);


});

}





}
