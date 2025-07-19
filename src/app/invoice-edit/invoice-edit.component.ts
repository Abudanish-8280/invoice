import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice, InvoiceItem, InvoiceService } from '../invoice.service';

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.css']
})
export class InvoiceEditComponent implements OnInit {
  invoice: Invoice | undefined;

  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.invoiceService.getInvoice(id).subscribe(invoice => this.invoice = invoice);
  }

  addItem() {
    this.invoice?.items.push({ description: '', quantity: 1, price: 0 });
  }

  removeItem(index: number) {
    this.invoice?.items.splice(index, 1);
  }

  incrementQuantity(index: number) {
    if (this.invoice) {
      this.invoice.items[index].quantity++;
    }
  }

  decrementQuantity(index: number) {
    if (this.invoice && this.invoice.items[index].quantity > 1) {
      this.invoice.items[index].quantity--;
    }
  }

  updateItemDescription(index: number, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (this.invoice) {
      this.invoice.items[index].description = inputElement.value;
    }
  }

  updateItemPrice(index: number, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (this.invoice) {
      this.invoice.items[index].price = parseFloat(inputElement.value);
    }
  }

  updateItemQuantity(index: number, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (this.invoice) {
      this.invoice.items[index].quantity = parseInt(inputElement.value, 10);
    }
  }

  saveInvoice(): void {
    if (this.invoice) {
      this.invoiceService.updateInvoice(this.invoice);
      this.router.navigate(['/']);
    }
  }
}