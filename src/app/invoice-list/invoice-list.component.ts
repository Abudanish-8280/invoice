import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Invoice, InvoiceService } from '../invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  invoices: Invoice[] = [];

  constructor(
    private invoiceService: InvoiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.invoiceService.getInvoices().subscribe(invoices => this.invoices = invoices);
  }

  deleteInvoice(id: number): void {
    this.invoiceService.deleteInvoice(id);
    this.invoices = this.invoices.filter(invoice => invoice.id !== id);
  }

  getTotal(invoice: Invoice): number {
    return invoice.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  }
}