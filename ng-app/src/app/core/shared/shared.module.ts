import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { MessageDialogComponent } from './dialogs';
import { MatTooltipModule } from '@angular/material/tooltip';
@NgModule({
  // entryComponents: [MessageDialogComponent],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    MatCardModule,
    MatListModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    CommonModule,
    FlexLayoutModule,
    MatTooltipModule,
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    MatCardModule,
    MatListModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    CommonModule,
    FlexLayoutModule,
    MatTooltipModule,
  ],
})
export class SharedModule {}
