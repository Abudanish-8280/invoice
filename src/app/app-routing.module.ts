import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceAddComponent } from './invoice-add/invoice-add.component';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';
import { InvoicePreviewComponent } from './invoice-preview/invoice-preview.component';

const routes: Routes = [
  { path: '', component: InvoiceListComponent },
  { path: 'invoice-add', component: InvoiceAddComponent },
  { path: 'invoice-edit/:id', component: InvoiceEditComponent },
  { path: 'invoice-preview/:id', component: InvoicePreviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }