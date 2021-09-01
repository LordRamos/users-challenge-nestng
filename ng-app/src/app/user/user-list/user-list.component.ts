import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, merge, Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Routes, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil } from 'rxjs/internal/operators';
import { UserService } from '../../core/services/user.service';
import { NotificationService } from '../../core/services/notification.service';
import { User } from '../../core/models/user';
import { ConfirmDialogComponent } from 'src/app/core/components/confirm-dialog/confirm-dialog.component';
// import { Utils } from '../../core/utils/utils';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserListComponent implements OnInit {
  confirmDialogRef!: MatDialogRef<ConfirmDialogComponent>;
  dataSource!: UserDataSource;
  // activities: Activity[]
  displayedColumns = [
    'ci',
    'email',
    'names',
    'surnames',
    'phoneNumber',
    'actions',
  ];

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  @ViewChild(MatSort, { static: true })
  sort!: MatSort;

  @ViewChild('filter', { static: true })
  filter!: ElementRef;

  private _unsubscribeAll: Subject<any>;
  constructor(
    private userService: UserService,
    private _matSnackBar: MatSnackBar,
    private _router: Router,
    private notificationService: NotificationService
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAll().subscribe(
      (users) => {
        this.dataSource = new UserDataSource(users, this.paginator, this.sort);
      },
      (err) => {
        this.notificationService.showMessage(
          'Error al cargar lista de usuarios'
        );
      }
    );
  }
  /****** DELETE ITEM ******/
  delete(id: string): void {
    this.notificationService
      .showConfirmDialog('¿Esta seguro que desea eliminar este usuario?')
      .subscribe((result) => {
        if (result) {
          this.userService.delete(id).subscribe((e) => {
            this.notificationService.showMessage(
              'Usuario eliminado correctamente...'
            );
            this.loadUsers();
          });
        }
      });
  }
}

export class UserDataSource extends DataSource<User[]> {
  private _filterChange = new BehaviorSubject('');
  private _filteredDataChange = new BehaviorSubject('');

  constructor(
    private user: User[],
    private _matPaginator: MatPaginator,
    private _matSort: MatSort
  ) {
    super();

    this.filteredData = this.user;
  }

  /**
   * Connect function called by the table to retrieve one stream containing the data to render.
   *
   * @returns {Observable<any[]>}
   */
  connect(): Observable<any[]> {
    // tslint:disable-next-line: typedef
    const displayDataChanges = [
      // this._activitiesService.onActivitiesChanged,
      this._matPaginator.page,
      this._filterChange,
      this._matSort.sortChange,
    ];
    return merge(...displayDataChanges).pipe(
      map(() => {
        // tslint:disable-next-line: typedef
        let data = this.user.slice();
        data = this.filterData(data);
        this.filteredData = [...data];
        data = this.sortData(data);
        const startIndex =
          this._matPaginator.pageIndex * this._matPaginator.pageSize;
        return data.splice(startIndex, this._matPaginator.pageSize);
      })
    );
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  // Filtered data
  get filteredData(): any {
    return this._filteredDataChange.value;
  }

  set filteredData(value: any) {
    this._filteredDataChange.next(value);
  }

  // Filter
  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Filter data
   *
   * @param data
   * @returns {any}
   */
  filterData(data: any[]): any {
    if (!this.filter) {
      return data;
    }
    return data;
    // return Utils.filterArrayByString(data, this.filter);
  }

  /**
   * Sort data
   *
   * @param data
   * @returns {any[]}
   */
  sortData(data: any[]): any[] {
    if (!this._matSort.active || this._matSort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._matSort.active) {
        case 'ci':
          [propertyA, propertyB] = [a.ci, b.ci];
          break;
        case 'names':
          [propertyA, propertyB] = [a.names, b.names];
          break;
        case 'surnames':
          [propertyA, propertyB] = [a.surnames, b.surnames];
          break;
        case 'email':
          [propertyA, propertyB] = [a.email, b.email];
          break;
        case 'phoneNumber':
          [propertyA, propertyB] = [a.phoneNumber, b.phoneNumber];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (
        (valueA < valueB ? -1 : 1) *
        (this._matSort.direction === 'asc' ? 1 : -1)
      );
    });
  }

  /**
   * Disconnect
   */
  disconnect(): void {}
}
