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

  valuesError: boolean = false;

  @Input() maxValue: number = 0;
  @Input() minValue: number = 0;
  @Input() prefix: string = 'L';
  @Input() manualValue: string = '0';
  @Input() stepValue: number = 100;
  @Input() handleSteps: boolean = false;
  @Input() showGuides: boolean = true;
  @Input() numberOfGuides: number = 10;
  @Input() showValuesLabels: boolean = true;

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
    this.currentValue.emit(String(this.minValue));
    this.validateValues();
  }

  private validateValues() {
    if (this.minValue >= this.maxValue) {
      this.valuesError = true
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['manualValue']) {
      this.getManualValue();
    }
  }



  private sliderLayout(element: HTMLElement, value: string) {
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
    this.currentValue.emit(inputElement.value);
    this.sliderLayout(this.range.nativeElement, value);
  }

  getManualValue() {
    let value: string = '';


    if (!this.range) return;

    if (this.manualValue.length <= 0 && this.manualValue === '') {
      this.manualValue = String(this.minValue);
      value = this.valueRange(this.manualValue);
    } else {
      value = this.valueRange(this.manualValue);
    }

    if (!this.valuesError) {
      this.currentValue.emit(this.manualValue);
      this.sliderLayout(this.range.nativeElement, value);
    }


  }

  private valueRange(value: string) {
    return (((parseInt(value) - this.minValue) / (this.maxValue - this.minValue)) * 100).toFixed(0)
  }

  private createGuides() {

    if (this.showGuides) {

      if (this.rangeDividerContainer) {

        for (let index = 0; index < this.numberOfGuides; index++) {
          const nuevoDiv = document.createElement('div');
          nuevoDiv.setAttribute('id', `${index}`)
          nuevoDiv.style.width = '1px';
          nuevoDiv.style.height = '8px';
          nuevoDiv.style.background = this.colorsGuide.guideNormal;
          this.rangeDividerContainer.nativeElement.appendChild(nuevoDiv);
        }

      }
    }


  }

  handleStepsValue() {
    return this.handleSteps ? this.stepValue : 1;
  }



  formatNumber(value: number): string {
    const format = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
    if (!format.includes('.')) {
      return format.concat('.00');
    }

    return format;
  }



}
