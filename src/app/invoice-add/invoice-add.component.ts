import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Invoice, InvoiceItem, InvoiceService } from '../invoice.service';

@Component({
  selector: 'app-invoice-add',
  templateUrl: './invoice-add.component.html',
  styleUrls: ['./invoice-add.component.css']
})
export class InvoiceAddComponent {
  customerName = '';
  items: InvoiceItem[] = [];
  dueDate = '';

  constructor(private invoiceService: InvoiceService, private router: Router) { }

  addItem() {
    this.items.push({ description: '', quantity: 1, price: 0 });
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  incrementQuantity(index: number) {
    this.items[index].quantity++;
  }

  decrementQuantity(index: number) {
    if (this.items[index].quantity > 1) {
      this.items[index].quantity--;
    }
  }

  updateItemDescription(index: number, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.items[index].description = inputElement.value;
  }

  updateItemPrice(index: number, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.items[index].price = parseFloat(inputElement.value);
  }

  updateItemQuantity(index: number, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.items[index].quantity = parseInt(inputElement.value, 10);
  }

  addInvoice(): void {
    const newInvoice: Invoice = {
      id: Math.floor(Math.random() * 1000), // Random ID for simplicity
      customerName: this.customerName,
      items: this.items,
      dueDate: this.dueDate,
    };
    this.invoiceService.addInvoice(newInvoice);
    this.router.navigate(['/']);
  }
}
