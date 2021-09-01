import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Observable, combineLatest, of, EMPTY } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserFormComponent implements OnInit {
  user!: User;
  userForm!: FormGroup;
  isEditMode!: boolean;
  private _unsubscribeAll: Subject<any>;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this._unsubscribeAll = new Subject();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!id;
    let user$ = this.isEditMode ? this.userService.get(id) : of({ _id: '' });
    user$.subscribe((user) => {
      if (user._id) this.user = user;
      this.userForm = this.createUserForm();
    });
    // if (this.isEditMode) {
    //   this.userService.get(id).subscribe((user) => {
    //     this.user = user;
    //     this.userForm = this.createUserForm();
    //   });
    // } else {
    //   this.userForm = this.createUserForm();
    // }
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Create product form
   *
   * @returns {FormGroup}
   */
  createUserForm(): FormGroup {
    return this.formBuilder.group({
      ci: [this.user?.ci, Validators.required],
      email: [this.user?.email, Validators.required],
      names: [this.user?.names, Validators.required],
      surnames: [this.user?.surnames, Validators.required],
      phoneNumber: [this.user?.phoneNumber, Validators.required],
    });
  }

  // messages
  //   get first_name() {
  //     return this.userForm.get('first_name');
  //   }
  //   get email() {
  //     return this.userForm.get('email');
  //   }
  //   get last_name() {
  //     return this.userForm.get('last_name');
  //   }
  //   get password() {
  //     return this.userForm.get('password');
  //   }
  //   get password_confirm() {
  //     return this.userForm.get('password_confirm');
  //   }

  saveUser() {
    const data = this.userForm.getRawValue();
    debugger;
    let response$ = this.isEditMode
      ? this.userService.update({ ...data, _id: this.user._id })
      : this.userService.add(data);
    response$.subscribe((r) => {
      this.notificationService.showMessage(
        this.isEditMode ? 'User updated' : 'User saved'
      );
      this.router.navigate(['/user']);
    });
  }
}
