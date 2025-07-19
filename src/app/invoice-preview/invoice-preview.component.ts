import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invoice, InvoiceService } from '../invoice.service';

@Component({
  selector: 'app-invoice-preview',
  templateUrl: './invoice-preview.component.html',
  styleUrls: ['./invoice-preview.component.css']
})
export class InvoicePreviewComponent implements OnInit {
  invoice: Invoice | undefined;

  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.invoiceService.getInvoice(id).subscribe(invoice => this.invoice = invoice);
  }

  getTotal(): number {
    return this.invoice ? this.invoice.items.reduce((sum, item) => sum + (item.quantity * item.price), 0) : 0;
  }
}