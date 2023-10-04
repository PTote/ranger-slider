import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-range-component',
  templateUrl: './range-component.component.html',
  styleUrls: ['./range-component.component.scss']
})
export class RangeComponentComponent implements OnChanges, OnInit {


  /**
   * Input´s Variables:
   * maxValue = Set the max value of the range
   * minValue = Set the min value of the range
   * prefix = Set the prefix on the labels
   * manualValue = Set value on the range with some input
   * handleSteps = Active the function steps of the range
   * showGuides = Show the guides below of the range
   * stepValue = Set the range how will work
   * numberOfGuides = Set the number of guides to show
   */

  oldStepValue: string = '0';

  @Input() maxValue: number = 0;
  @Input() minValue: number = 0;
  @Input() prefix: string = '';
  @Input() manualValue: string = '0';
  @Input() stepValue: number = 100;
  @Input() handleSteps: boolean = false;
  @Input() showGuides: boolean = true;
  @Input() numberOfGuides: number = 10;

  @Output() currentValue = new EventEmitter<string>();

  @ViewChild('range') range!: ElementRef;
  @ViewChild('rangeDividerContainer', { static: true }) rangeDividerContainer!: ElementRef;

  private colorsRange = {
    yellow: 'rgba(255, 216, 0, 1)',
    blue: 'rgba(104, 173, 252, 0.5)'
  };

  private colorsGuide = {
    guideSelected: 'linear-gradient(transparent 50%, #042F5F 50%)',
    guideNormal: '#042F5F'
  };


  ngOnInit(): void {
    this.handleStepsValue();
    this.createGuides();
    this.manualValue = '1000'
  }



  ngOnChanges(changes: SimpleChanges): void {
    if (changes['manualValue']) {
      this.getManualValue();
    }
  }



  sliderLayout(element: HTMLElement, value: string) {
    element.style.background = `
    linear-gradient(
        to right,
        ${this.colorsRange.yellow} 0%,
        ${this.colorsRange.yellow} ${value}%,
        ${this.colorsRange.blue} ${value}%,
        ${this.colorsRange.blue} 100%
    )
`;
  }


  changeColorRange($event?: any) {
    const inputElement = $event.target as HTMLInputElement;
    const value = this.valueRange(inputElement.value);
    // this.currentStepGuide(inputElement.value)
    this.currentValue.emit(inputElement.value);
    this.sliderLayout(this.range.nativeElement, value);
  }

  getManualValue() {
    let value: string = '';
    // this.currentStepGuide(this.manualValue)


    if (!this.range) return;

    if (this.manualValue.length <= 0 && this.manualValue === '') {
      this.manualValue = String(this.minValue);
      value = this.valueRange(this.manualValue);
    } else {
      value = this.valueRange(this.manualValue);
    }



    this.currentValue.emit(this.manualValue);
    this.sliderLayout(this.range.nativeElement, value);
  }

  valueRange(value: string) {
    return (((parseInt(value) - this.minValue) / (this.maxValue - this.minValue)) * 100).toFixed(0)
  }

  createGuides() {
    let id = 0;

    if (this.showGuides) {

      if (this.rangeDividerContainer) {

        const stepByGuide = Math.round(this.calculateTotalSteps() / this.numberOfGuides);

        const idGuide = this.maxValue / 10;

        for (let index = 0; index < this.numberOfGuides; index++) {
          const nuevoDiv = document.createElement('div');
          nuevoDiv.setAttribute('id', `${id}`)
          nuevoDiv.style.width = '1px';
          nuevoDiv.style.height = '8px';
          nuevoDiv.style.background = this.colorsGuide.guideNormal;



          this.rangeDividerContainer.nativeElement.appendChild(nuevoDiv);
          id += idGuide;
        }

      }
    }


  }

  handleStepsValue() {
    return this.handleSteps ? this.stepValue : 1;
  }

  calculateTotalSteps() {
    return ((this.maxValue - this.minValue) / (this.stepValue)) + 1;
  }


  currentStepGuide(value: string = '0') {

    if (this.handleSteps) {



      console.log(value);
      console.log('this.oldStepValue: ', this.oldStepValue);


      // let numberStep = ((Number(value) - this.minValue) / this.stepValue);
      // console.log(numberStep);

      const guideId = document.getElementById(`${value}`);
      if (guideId) {
        this.oldStepValue = value;
        guideId.style.background = this.colorsGuide.guideSelected;
      } else {


        const stepOld = document.getElementById(`${this.oldStepValue}`);

        if (stepOld && this.oldStepValue !== value) {
          stepOld.style.background = this.colorsGuide.guideNormal;
        }




      }

    }

  }



  tester($event: any) {
    const inputElement = $event.target as HTMLInputElement;
    const value = this.valueRange(inputElement.value);
    console.log(value);
  }


}
