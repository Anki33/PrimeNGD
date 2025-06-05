import { ChangeDetectorRef, Component, computed, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { LayoutService } from '../../service/layout.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Ripple } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { AvatarModule } from 'primeng/avatar';
import { ProgressBar, ProgressBarModule } from 'primeng/progressbar';
interface Product {
  name: string;
  category: string;
  price: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}
@Component({
  selector: 'product-overview-widget',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    FormsModule,
    TableModule,
    TagModule,
    RatingModule,
    ToastModule,
    AvatarModule,
    ProgressBarModule
  ],
  providers: [MessageService],
  template: `
    <div class="products-header">
      <span class="products-title">Products Overview</span>
      <p-iconfield class="search-field">
        <p-inputicon class="pi pi-search" />
        <input
          pInputText
          [(ngModel)]="searchQuery"
          placeholder="Search products..."
          class="products-search"
          (ngModelChange)="searchProducts()"
        />
      </p-iconfield>
    </div>
    <div class="products-table-container">
      <p-table
        [value]="filteredProducts"
        selectionMode="single"
        [(selection)]="selectedProduct"
        [loading]="loading"
        [rows]="5"
        styleClass="products-table"
        [ngClass]="{ 'p-dark': isDarkMode() }"
      >
        <ng-template #header>
          <tr>
            <th pSortableColumn="name">Name <p-sortIcon field="name" /></th>
            <th pSortableColumn="category">
              Category <p-sortIcon field="category" />
            </th>

            <th pSortableColumn="price">Price <p-sortIcon field="price" /></th>
            <th pSortableColumn="status">
              Status <p-sortIcon field="status" />
            </th>
          </tr>
        </ng-template>
        <ng-template #body let-product>
          <tr>
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.price }}</td>
            <td>
              <p-tag
                [severity]="
                  product.status === 'In Stock'
                    ? 'success'
                    : product.status === 'Low Stock'
                    ? 'warn'
                    : 'danger'
                "
              >
                {{ product.status }}
              </p-tag>
            </td>
          </tr>
        </ng-template>
      </p-table>
    </div>

    <div class="products-header mb-4">
    <span class="products-title">Toast Examples</span>
    </div>
    <div class="products-table-container">
    <div class="card flex justify-center gap-2">
    <p-toast />
    <p-button type="button" pRipple (click)="showSuccess()" label="Success" severity="success" />
    <p-button type="button" pRipple (click)="showInfo()" label="Info" severity="info" />
    <p-button type="button" pRipple (click)="showWarn()" label="Warn" severity="warn" />
    <p-button type="button" pRipple (click)="showError()" label="Error" severity="danger" />
    <p-button type="button" pRipple (click)="showSecondary()" label="Secondary" severity="secondary" />
    <p-button type="button" pRipple (click)="showContrast()" label="Contrast" severity="contrast" />

    <p-toast position="bottom-center" key="confirm" (onClose)="onReject()" [baseZIndex]="5000">
    <ng-template let-message #message>
        <div class="flex flex-col items-start flex-auto">
            <div class="flex items-center gap-2">
                <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" shape="circle" />
                <span class="font-bold">Amy Elsner</span>
            </div>
            <div class="font-medium text-lg my-4">{{ message.summary }}</div>
            <p-button severity="success" size="small" label="Reply" (click)="onConfirm()" />
        </div>
    </ng-template>
</p-toast>
<p-button (click)="showConfirm()" label="View" />


<p-toast position="top-center" key="confirm" (onClose)="onClose()" [baseZIndex]="5000">
<ng-template let-message #headless let-closeFn="closeFn">
    <section class="flex flex-col p-4 gap-4 w-full bg-primary/70 rounded-xl">
        <div class="flex items-center gap-5">
            <i class="pi pi-cloud-upload text-white dark:text-black text-2xl"></i>
            <span class="font-bold text-base text-white dark:text-black">{{ message.summary }}</span>
        </div>
        <div class="flex flex-col gap-2">
            <p-progressbar [value]="progress" [showValue]="false" [style]="{ height: '4px' }" styleClass="!bg-primary/80" />
            <label class="text-sm font-bold text-white dark:text-black">{{ progress }}% uploaded</label>
        </div>
        <div class="flex gap-4 mb-4 justify-end">
            <p-button label="Another Upload?" (click)="closeFn($event)" size="small" />
            <p-button label="Cancel" (click)="closeFn($event)" size="small" />
        </div>
    </section>
</ng-template>
</p-toast>
<p-button (click)="showConfirmupload()" label="Confirm" />
</div>
    </div>
  `,
  host: {
    class: 'layout-card',
  },
  styles: `
  :host ::ng-deep  {
    .p-datatable-mask {
      backdrop-filter: blur(4px) !important;
      background-color: color-mix(in srgb, var(--p-surface-0), transparent 80%) !important;
    }
    .p-dark .p-datatable-mask {
      background-color: color-mix(in srgb, var(--p-surface-900), transparent 80%) !important;
    }
  
    .p-datatable-loading-icon {
      color: var(--p-primary-500) !important;
    }
}

`,
})
export class ProductOverviewWidget {
  constructor(private messageService: MessageService, private cdr: ChangeDetectorRef) {}
  layoutService = inject(LayoutService);



  progress: number = 0;

  interval:any;


  isDarkMode = computed(() => this.layoutService.appState().darkMode);

  selectedProduct!: Product;

  products: Product[] = [
    {
      name: 'Laptop Pro',
      category: 'Electronics',
      price: 2499,
      status: 'In Stock',
    },
    {
      name: 'Wireless Mouse',
      category: 'Accessories',
      price: 49,
      status: 'Low Stock',
    },
    {
      name: 'Monitor 4K',
      category: 'Electronics',
      price: 699,
      status: 'Out of Stock',
    },
    {
      name: 'Keyboard',
      category: 'Accessories',
      price: 14955,
      status: 'In Stock',
    },
  ];

  searchQuery = '';

  loading = false;
  
  filteredProducts: any = [];

  ngOnInit() {
    this.filteredProducts = [...this.products];
  }

  searchProducts = () => {
    this.loading = true;
    this.filteredProducts = this.products.filter(
      (product) =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.category
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase()) ||
        product.status.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    setTimeout(() => {
      this.loading = false;
    }, 300);
  };

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
}

showInfo() {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content' });
}

showWarn() {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Message Content' });
}

showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
}

showContrast() {
    this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Message Content' });
}

showSecondary() {
    this.messageService.add({ severity: 'secondary', summary: 'Secondary', detail: 'Message Content' });
}


//view button

visible: boolean = false;

visible2: boolean = false;
showConfirm() {
    if (!this.visible) {
        this.messageService.add({ key: 'confirm', sticky: true, severity: 'success', summary: 'Can you send me the report?' });
        this.visible = true;
    }
}

onConfirm() {
    this.messageService.clear('confirm');
    this.visible = false;
}

onReject() {
    this.messageService.clear('confirm');
    this.visible = false;
}


//view upload click events
showConfirmupload() {
  if (!this.visible2) {
      this.messageService.add({
          key: 'confirm',
          sticky: true,
          severity: 'custom',
          summary: 'Uploading your files.',
          styleClass: 'backdrop-blur-lg rounded-2xl',
      });
      this.visible2 = true;
      this.progress = 0;

      if (this.interval) {
          clearInterval(this.interval);
      }

      this.interval = setInterval(() => {
          if (this.progress <= 100) {
              this.progress = this.progress + 20;
          }

          if (this.progress >= 100) {
              this.progress = 100;
              clearInterval(this.interval);
          }
          this.cdr.markForCheck();
      }, 1000);
  }
}

onClose() {
  this.visible2 = false;
}
}
