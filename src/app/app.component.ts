import { Component, ViewChild } from '@angular/core';
import { SignaturePadComponent } from './components/signature-pad/signature-pad.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  @ViewChild('signaturePad') signaturePad!: SignaturePadComponent

  valueReturn: string = '0';
  manualValue: string = '0'
  title = 'range-slider';
  valueInput: string = '';
  stepsValue: number = 1;

  rangeValue($event: string){
    this.valueReturn = $event
  }

  setValue($event: KeyboardEvent){

    const inputElement = $event.target as HTMLInputElement;

    if(inputElement.value === ''){
      this.manualValue = '0';
    }

    this.manualValue = inputElement.value;

  }

  setSteps($event: KeyboardEvent){
    const inputElement = $event.target as HTMLInputElement;

    this.stepsValue = Number(inputElement.value);
  }

  tester(){
    const tester = this.signaturePad.emitBase64IMG();
    console.log(tester);
  }
}
