import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  pieChartForm: FormGroup | any;
  validationMessage: string = '';

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.pieChartForm = this.formBuilder.group({
      textbox1: ['', [Validators.required, Validators.max(100)]],
      textbox2: ['', [Validators.required, Validators.max(100)]]
    });
  }

  get textbox1() {
    return this.pieChartForm.get('textbox1');
  }

  get textbox1Invalid() {
    return this.textbox1.touched && this.textbox1.invalid;
  }

  get textbox2() {
    return this.pieChartForm.get('textbox2');
  }

  get textbox2Invalid() {
    return this.textbox2.touched && this.textbox2.invalid;
  }

  onSubmit(){
    console.log(this.pieChartForm)
  }

  calculateValues() {
    const textbox1Value = this.pieChartForm.controls.textbox1.value;
    const textbox2Value = this.pieChartForm.controls.textbox2.value;

    if (!textbox1Value && textbox2Value) {
      this.pieChartForm.patchValue({ textbox1: 100 - textbox2Value });
    } else if (textbox1Value && !textbox2Value) {
      this.pieChartForm.patchValue({ textbox2: 100 - textbox1Value });
    }
  }

  createChart() {
    if (this.pieChartForm.invalid) {
      this.validationMessage = 'Please correct the form errors.';
    } else {
      const total = this.textbox1.value + this.textbox2.value;
      if (total !== 100) {
        this.validationMessage = 'Total must be 100%. Please adjust the values.';
      } else {
        const canvas: HTMLCanvasElement = document.getElementById('chartCanvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
  
        ctx!.clearRect(0, 0, canvas.width, canvas.height);
  
        new Chart(ctx!, {
          type: 'pie',
          data: {
            labels: ['Textbox 1', 'Textbox 2'],
            datasets: [{
              data: [this.textbox1.value, this.textbox2.value],
              backgroundColor: ['red', 'orange']
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        });
      }
    }
  }
}
