import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/init/auth.service';

@Component({
  selector: 'app-sp-field-name-mapping',
  templateUrl: './sp-field-name-mapping.component.html',
  styleUrls: ['./sp-field-name-mapping.component.scss']
})
export class SpFieldNameMappingComponent implements OnInit {
  public userData: any;
  public CompanyObj: any={};
  Object=Object;
  public columns :any={};
  constructor(    public authService: AuthService) {
    this.userData = authService.userData();
   }

  ngOnInit(): void {
    this.OSFieldFilterNames();
  }
  Reset(){
    for(let item in this.columns){
      this.columns[item] = null;
    }
  }
   
  public OSFieldFilterNames() { 
    this.authService.ColumnAlias().subscribe((res: any) => {
      this.columns = res.data;
    })
  }
  public FieldNameSave() { 
    var payload :any = {
      "itemAlias": this.columns.itemNumber,
      "uomAlias": this.columns.unitOfMeasure,
      "ufs": [
       this.columns.userField1,this.columns.userField2, this.columns.userField3,this.columns.userField4,this.columns.userField5,this.columns.userField6,this.columns.userField7,
       this.columns.userField8,this.columns.userField9,this.columns.userField10
      ],
      "username":  this.userData.userName,
      "wsid":this.userData.wsid
    };
    this.authService.FieldNameSave(payload).subscribe((res: any) => {   
    })
  }
  
}
