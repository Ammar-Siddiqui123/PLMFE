import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-batch-delete',
  templateUrl: './batch-delete.component.html',
  styleUrls: ['./batch-delete.component.scss']
})
export class BatchDeleteComponent implements OnInit {

  transList : any = [
    {
      id : "Pick",
      name : "Pick"
    },
    {
      id : "Put Away",
      name : "Put Away"
    },
    {
      id : "Count",
      name : "Count"
    },
    {
      id : "All Transaction Type",
      name : "All Transaction Type"
    }
  ];
  batchList : any = [
    {
      id : "1",
      number : "20221018000002"
    },
    {
      id : "2",
      number : "20221018000002"
    },
    {
      id : "3",
      number : "20221018000002"
    },
    {
      id : "4",
      number : "20221018000002"
    },
    {
      id : "5",
      number : "20221018000002"
    }
  ];
  transType : string = 'Pick';
  batchID : string = "";

  @Output() transTypeEmitter = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit(): void {
  }

  changeTranType(value : any) {
    this.transTypeEmitter.emit(value);
  }

  deleteBatch(type : any, id : any) {
    alert(`Type : ${type} and Batch ID : ${id}`);
  }

}
