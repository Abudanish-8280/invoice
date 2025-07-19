import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  id: number;
  customerName: string;
  items: InvoiceItem[];
  dueDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private invoices: Invoice[] = [
    {
      id: 1,
      customerName: 'John Doe',
      items: [
        { description: 'Item 1', quantity: 1, price: 100 },
        { description: 'Item 2', quantity: 2, price: 50 }
      ],
      dueDate: '2024-07-10'
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      items: [
        { description: 'Item 1', quantity: 3, price: 100 }
      ],
      dueDate: '2024-08-15'
    }
  ];

  constructor() { }

  getInvoices(): Observable<Invoice[]> {
    return of(this.invoices);
  }

  getInvoice(id: number): Observable<Invoice | undefined> {
    return of(this.invoices.find(invoice => invoice.id === id));
  }

  addInvoice(invoice: Invoice): void {
    this.invoices.push(invoice);
  }

  updateInvoice(updatedInvoice: Invoice): void {
    const index = this.invoices.findIndex(invoice => invoice.id === updatedInvoice.id);
    if (index !== -1) {
      this.invoices[index] = updatedInvoice;
    }
  }

  deleteInvoice(id: number): void {
    this.invoices = this.invoices.filter(invoice => invoice.id !== id);
  }
}