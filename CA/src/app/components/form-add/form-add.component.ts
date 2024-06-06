import { Component, EventEmitter, Input,Output, OnChanges, SimpleChanges, OnInit, ViewChild, ElementRef } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ConfirmationService, MessageService } from 'primeng/api';
import { doablesValidator } from 'src/app/infastructure/validaters/doablesValidator';
import { Present } from 'src/app/models/Present.model';
import { PresentService } from 'src/app/services/present.service';

@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class FormAddComponent implements OnInit  {
 AddPres!:FormGroup;

  flag:boolean=false;

  presents:Present[]=[];

  constructor(private presentService: PresentService, private messageService: MessageService) { }

  @Input()
  present: Present = new Present();

  submitted: boolean = false;

  @Input()
  presentDialog: boolean = true;

  @Output()
  presentDialogChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.presentService.reloadPresents$.subscribe(x => {
      this.presentService.getPresents().subscribe(data => this.presents = data);
    })
    if (this.present.number) 
    this.flag=true;
    this.AddPres=new FormGroup({
        name: new FormControl('', [Validators.required,Validators.maxLength(30),doablesValidator(this.presents,this.flag)]),
        ticketPrice: new FormControl('', [Validators.required]),
        donar: new FormControl('', [Validators.required]),
    });
  } 


  

  hideDialog() {
    this.presentDialog = false;
    this.presentDialogChange.emit(this.presentDialog);
    this.submitted = false;
  }

  savePresent() {
    this.submitted = true;
    if (this.present.name.trim()) {

      if (this.present.number) {
        this.presentService.savePresent(this.present).subscribe(b => {
          console.log(b,"a")   
          this.presentService.setReloadPresent();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'present Updated', life: 3000 });
        });
      }
      else {  
        this.presentService.addPresent(this.present).subscribe(a => {
          console.log(a,"a")    
          this.presentService.setReloadPresent();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'present Created', life: 3000 });
        });
      }
      this.presentDialogChange.emit(this.presentDialog);
      this.present = new Present;
      this.hideDialog()
    }
  }

}
