import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DatePicker } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms'; 
import { CalendarModule } from 'primeng/calendar';
import { FloatLabelModule } from "primeng/floatlabel";
import { InputGroupModule } from 'primeng/inputgroup';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
interface City {
    name: string;
    code: string;
}

@Component({
  selector: 'forms-example',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    DatePicker,
    CalendarModule,
    FloatLabelModule,
    DropdownModule,
    InputGroupModule,
    InputTextModule,
    InputNumberModule,
    MultiSelectModule 
  ],
  template: `
    <div class="card flex justify-center mb-4">
      <p-datepicker [(ngModel)]="date" [showButtonBar]="true"></p-datepicker> &nbsp;
      <p-multiselect [options]="cities2" [(ngModel)]="selectedCities2" optionLabel="name" placeholder="Select Cities" [maxSelectedLabels]="3" styleClass="w-full md:w-100" />
      </div>
    <div class="card flex justify-center mb-4">
    <p-floatlabel variant="in" class="mb-3 block">
      <input pInputText id="in_label" [(ngModel)]="value1" autocomplete="off" />
      <label for="in_label">In Label</label>
    </p-floatlabel>
    </div>
    <div class="card flex justify-center mb-4">
    <p-floatlabel variant="on" class="mb-3 block">
      <input pInputText id="on_label" [(ngModel)]="value2" autocomplete="off" />
      <label for="on_label">On Label</label>
    </p-floatlabel>
</div>
<div class="card flex justify-center mb-4">
    <p-floatlabel class="mb-6 block">
      <input id="username" pInputText [(ngModel)]="value" />
      <label for="username">Username</label>
    </p-floatlabel>
</div>
<div class="card grid grid-cols-1 md:grid-cols-2 gap-4">
  <!-- Username -->
  <div class="p-inputgroup w-full">
    <span class="p-inputgroup-addon">
      <i class="pi pi-user"></i>
    </span>
    <input pInputText [(ngModel)]="text1" placeholder="Username" class="w-full" />
  </div>

  <!-- Price -->
  <div class="p-inputgroup w-full">
    <span class="p-inputgroup-addon">$</span>
    <input pInputText [(ngModel)]="number" placeholder="Price" class="w-full" />
    <span class="p-inputgroup-addon">.00</span>
  </div>

  <!-- Website -->
  <div class="p-inputgroup w-full">
    <span class="p-inputgroup-addon">www</span>
    <input pInputText [(ngModel)]="text2" placeholder="Website" class="w-full" />
  </div>

  <!-- City -->
  <div class="p-inputgroup w-full">
    <span class="p-inputgroup-addon">
      <i class="pi pi-map"></i>
    </span>
    <p-dropdown
      [(ngModel)]="selectedCity"
      [options]="cities"
      optionLabel="name"
      placeholder="City"
      class="w-full"
    ></p-dropdown>
  </div>
</div>
  `,
  styles: [`
  
  .card {
    background: var(--card-bg);
    border: var(--card-border);
    padding: 2rem;
    border-radius: 10px;
    margin-bottom: 1rem;
  }
  
  `],
  host: {
    class: 'stats',
  },
})
export class forms implements OnInit {
  date?: Date;
  value1?: string;
  value2?: string;
  value?: string;
  text1?: string;
  text2?: string;
  number?: number;
  selectedCity?: City;

  cities2!: City[];
  selectedCities2!: City[];
    selectedCities!: City[];

  cities: City[] = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ];
  ngOnInit() {
    this.cities2 = [
        {name: 'New York', code: 'NY'},
        {name: 'Rome', code: 'RM'},
        {name: 'London', code: 'LDN'},
        {name: 'Istanbul', code: 'IST'},
        {name: 'Paris', code: 'PRS'}
    ];
}
}
