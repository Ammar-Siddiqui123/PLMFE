import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tran-in-reprocess',
  templateUrl: './tran-in-reprocess.component.html',
  styleUrls: ['./tran-in-reprocess.component.scss']
})
export class TranInReprocessComponent implements OnInit {
  selectedOption="reprocess"
  @Output() reprocessSelectionEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }
  radioButtonChange(event){
    this.reprocessSelectionEvent.emit(event.value);
  }

}
