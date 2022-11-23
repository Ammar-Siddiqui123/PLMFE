import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddInvMapLocationComponent } from '../dialogs/add-inv-map-location/add-inv-map-location.component';
import { SetColumnSeqComponent } from '../dialogs/set-column-seq/set-column-seq.component';


@Component({
  selector: 'app-inventory-map',
  templateUrl: './inventory-map.component.html',
  styleUrls: ['./inventory-map.component.scss']
})
export class InventoryMapComponent implements OnInit {
  columns = [
    
    { columnDef: 'name', header: 'Name' },
    { columnDef: 'date', header: 'Date' },
    { columnDef: 'company', header: 'Company' },
    { columnDef: 'country', header: 'Country' },
    { columnDef: 'city', header: 'City' },
    { columnDef: 'phone', header: 'Phone' },
    { columnDef: 'age', header: 'Age' },
    { columnDef: 'color', header: 'Color' },
  ]
  data: any[];
  
  displayedColumns = this.columns.map(c => c.columnDef);


  constructor(private http: HttpClient, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.data = [
      {
        "name": "Molly Pope",
        "date": "Jul 27, 2021",
        "company": "Faucibus Orci Institute",
        "country": "New Zealand",
        "city": "Campinas",
        "phone": "1-403-634-0276",
        "age": 40,
        "color": 'black'
      },
      {
        "name": "Alfonso Vinson",
        "date": "May 11, 2021",
        "company": "Non Ante Corp.",
        "country": "United Kingdom",
        "city": "Redlands",
        "phone": "1-405-411-6336",
        "age": 40,
        "color": 'black'
      },
      {
        "name": "Camden David",
        "date": "Aug 6, 2022",
        "company": "Cursus Et LLP",
        "country": "Nigeria",
        "city": "Iguala",
        "phone": "(415) 628-6853",
        "age": 40,
        "color": 'black'
      },
      {
        "name": "Levi Goff",
        "date": "Nov 3, 2021",
        "company": "Vitae Incorporated",
        "country": "Sweden",
        "city": "Manavgat",
        "phone": "1-545-823-7985",
        "age": 40,
        "color": 'black'
      },
      {
        "name": "Madaline Leach",
        "date": "Jun 13, 2022",
        "company": "Erat Volutpat Corp.",
        "country": "Chile",
        "city": "Niterói",
        "phone": "1-678-156-9674",
        "age": 40,
        "color": 'black'
      },
      {
        "name": "Madaline Leach",
        "date": "Jun 13, 2022",
        "company": "Erat Volutpat Corp.",
        "country": "Chile",
        "city": "Niterói",
        "phone": "1-678-156-9674",
        "age": 40,
        "color": 'black'
      },
      {
        "name": "Madaline Leach",
        "date": "Jun 13, 2022",
        "company": "Erat Volutpat Corp.",
        "country": "Chile",
        "city": "Niterói",
        "phone": "1-678-156-9674",
        "age": 40,
        "color": 'black'
      },
      {
        "name": "Madaline Leach",
        "date": "Jun 13, 2022",
        "company": "Erat Volutpat Corp.",
        "country": "Chile",
        "city": "Niterói",
        "phone": "1-678-156-9674",
        "age": 40,
        "color": 'black'
      },
      {
        "name": "Madaline Leach",
        "date": "Jun 13, 2022",
        "company": "Erat Volutpat Corp.",
        "country": "Chile",
        "city": "Niterói",
        "phone": "1-678-156-9674",
        "age": 40,
        "color": 'black'
      },
      {
        "name": "Madaline Leach",
        "date": "Jun 13, 2022",
        "company": "Erat Volutpat Corp.",
        "country": "Chile",
        "city": "Niterói",
        "phone": "1-678-156-9674",
        "age": 40,
        "color": 'black'
      },
      {
        "name": "Madaline Leach",
        "date": "Jun 13, 2022",
        "company": "Erat Volutpat Corp.",
        "country": "Chile",
        "city": "Niterói",
        "phone": "1-678-156-9674",
        "age": 40,
        "color": 'black'
      },
      {
        "name": "Madaline Leach",
        "date": "Jun 13, 2022",
        "company": "Erat Volutpat Corp.",
        "country": "Chile",
        "city": "Niterói",
        "phone": "1-678-156-9674",
        "age": 40,
        "color": 'black'
      },
      {
        "name": "Madaline Leach",
        "date": "Jun 13, 2022",
        "company": "Erat Volutpat Corp.",
        "country": "Chile",
        "city": "Niterói",
        "phone": "1-678-156-9674",
        "age": 40,
        "color": 'black'
      },
      {
        "name": "Madaline Leach",
        "date": "Jun 13, 2022",
        "company": "Erat Volutpat Corp.",
        "country": "Chile",
        "city": "Niterói",
        "phone": "1-678-156-9674",
        "age": 40,
        "color": 'black'
      },
      {
        "name": "Madaline Leach",
        "date": "Jun 13, 2022",
        "company": "Erat Volutpat Corp.",
        "country": "Chile",
        "city": "Niterói",
        "phone": "1-678-156-9674",
        "age": 40,
        "color": 'black'
      },
      {
        "name": "Madaline Leach",
        "date": "Jun 13, 2022",
        "company": "Erat Volutpat Corp.",
        "country": "Chile",
        "city": "Niterói",
        "phone": "1-678-156-9674",
        "age": 40,
        "color": 'black'
      },
      {
        "name": "Madaline Leach",
        "date": "Jun 13, 2022",
        "company": "Erat Volutpat Corp.",
        "country": "Chile",
        "city": "Niterói",
        "phone": "1-678-156-9674",
        "age": 40,
        "color": 'black'
      },
      {
        "name": "Madaline Leach",
        "date": "Jun 13, 2022",
        "company": "Erat Volutpat Corp.",
        "country": "Chile",
        "city": "Niterói",
        "phone": "1-678-156-9674",
        "age": 40,
        "color": 'black'
      },
      {
        "name": "Madaline Leach",
        "date": "Jun 13, 2022",
        "company": "Erat Volutpat Corp.",
        "country": "Chile",
        "city": "Niterói",
        "phone": "1-678-156-9674",
        "age": 40,
        "color": 'black'
      },
      {
        "name": "Madaline Leach",
        "date": "Jun 13, 2022",
        "company": "Erat Volutpat Corp.",
        "country": "Chile",
        "city": "Niterói",
        "phone": "1-678-156-9674",
        "age": 40,
        "color": 'black'
      },
      {
        "name": "Madaline Leach",
        "date": "Jun 13, 2022",
        "company": "Erat Volutpat Corp.",
        "country": "Chile",
        "city": "Niterói",
        "phone": "1-678-156-9674",
        "age": 40,
        "color": 'black'
      },
      {
        "name": "Madaline Leach",
        "date": "Jun 13, 2022",
        "company": "Erat Volutpat Corp.",
        "country": "Chile",
        "city": "Niterói",
        "phone": "1-678-156-9674",
        "age": 40,
        "color": 'black'
      },
      {
        "name": "Madaline Leach",
        "date": "Jun 13, 2022",
        "company": "Erat Volutpat Corp.",
        "country": "Chile",
        "city": "Niterói",
        "phone": "1-678-156-9674",
        "age": 40,
        "color": 'black'
      },
      {
        "name": "Madaline Leach",
        "date": "Jun 13, 2022",
        "company": "Erat Volutpat Corp.",
        "country": "Chile",
        "city": "Niterói",
        "phone": "1-678-156-9674",
        "age": 40,
        "color": 'black'
      },
      {
        "name": "Madaline Leach",
        "date": "Jun 13, 2022",
        "company": "Erat Volutpat Corp.",
        "country": "Chile",
        "city": "Niterói",
        "phone": "1-678-156-9674",
        "age": 40,
        "color": 'black'
      },
      {
        "name": "Madaline Leach",
        "date": "Jun 13, 2022",
        "company": "Erat Volutpat Corp.",
        "country": "Chile",
        "city": "Niterói",
        "phone": "1-678-156-9674",
        "age": 40,
        "color": 'black'
      },
      {
        "name": "Madaline Leach",
        "date": "Jun 13, 2022",
        "company": "Erat Volutpat Corp.",
        "country": "Chile",
        "city": "Niterói",
        "phone": "1-678-156-9674",
        "age": 40,
        "color": 'black'
      },
      {
        "name": "Camden David",
        "date": "Aug 6, 2022",
        "company": "Cursus Et LLP",
        "country": "Nigeria",
        "city": "Iguala",
        "phone": "(415) 628-6853",
        "age": 40,
        "color": 'black'
      },
      {
        "name": "Levi Goff",
        "date": "Nov 3, 2021",
        "company": "Vitae Incorporated",
        "country": "Sweden",
        "city": "Manavgat",
        "phone": "1-545-823-7985",
        "age": 40,
        "color": 'black'
      },
      {
        "name": "Madaline Leach",
        "date": "Jun 13, 2022",
        "company": "Erat Volutpat Corp.",
        "country": "Chile",
        "city": "Niterói",
        "phone": "1-678-156-9674",
        "age": 40,
        "color": 'black'
      }
    ];
  }

  onTableAction(event) {
    console.log('event', event)
  }
  addLocDialog(){
    let dialogRef = this.dialog.open(AddInvMapLocationComponent, {
      height: '750px',
      width: '100%',
      data: {
        mode: 'addlocation',
      }
    })
    dialogRef.afterClosed().subscribe(result => {
    console.log(result);
    
    })
  }
  inventoryMapAction(actionEvent: any){
      console.log(actionEvent.value); 
      if(actionEvent.value === 'set_column_sq'){ 
      let dialogRef = this.dialog.open(SetColumnSeqComponent, {
        height: 'auto',
        width: '400px',
        data: {
          mode: actionEvent.value,
        }
      })
      dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      
      })
    }
  }

}
