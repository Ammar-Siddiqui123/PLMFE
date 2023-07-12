import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  ELEMENT_DATA: any[] =[
    {trans_type: '10A'},
    {trans_type: '10A'},
    {trans_type: '10A'},
    {trans_type: '10A'},
    {trans_type: '10A'},
    {trans_type: '10A'},
    {trans_type: '10A'},
    {trans_type: '10A'},
    {trans_type: '10A'},
    
  ]

    displayedColumns: string[] = ['trans_type','import_date','order_no','item_no','description','trans_qty','priority'];
    tableData = this.ELEMENT_DATA
    dataSourceList:any

  @Output() back = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  retunrToPrev() {
    this.back.emit('back');
  }
}
