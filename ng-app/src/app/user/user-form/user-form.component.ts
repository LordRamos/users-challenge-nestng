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
  formErrors = new Map([
    ['required', 'Este campo es requerido'],
    ['email', 'No es un email válido'],
    ['email_exists', 'Este email ya esta registrado'],
    ['ci_exists', 'Esta cedula ya esta registrada'],
  ]);
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
    user$.subscribe(
      (user) => {
        if (user._id) this.user = user;
        this.userForm = this.createUserForm();
      },
      (err) => {
        this.notificationService.showMessage('Error al realizar la operacion');
      }
    );
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
      email: [this.user?.email, [Validators.required, Validators.email]],
      names: [this.user?.names, Validators.required],
      surnames: [this.user?.surnames, Validators.required],
      phoneNumber: [this.user?.phoneNumber, Validators.required],
    });
  }

  saveUser() {
    const data = this.userForm.getRawValue();
    debugger;
    let response$ = this.isEditMode
      ? this.userService.update({ ...data, _id: this.user._id })
      : this.userService.add(data);
    response$.subscribe(
      (r) => {
        this.notificationService.showMessage(
          this.isEditMode
            ? 'Usuario actualizado correctamente...'
            : 'Usuario guardado correctamente...'
        );
        this.router.navigate(['/user']);
      },
      (err) => {
        this.notificationService.showMessage(
          'Error al cargar datos de usuario'
        );
      }
    );
  }
  checkField(fieldName: string, event: any) {
    this.userService
      .checkField(fieldName, event.target.value, this.user?._id)
      .subscribe((ch) => {
        setTimeout(() => {
          this.userForm.get(fieldName)?.markAsDirty();
          this.userForm.get(fieldName)?.markAsTouched();
          const prevErrors = this.userForm.get(fieldName)?.errors;
          let errors;
          if (prevErrors) {
            let { exists, ...extErrors } = prevErrors;
            errors = ch.valid ? extErrors : { exists: true, ...extErrors };
          } else {
            errors = ch.valid ? null : { exists: true };
          }
          this.userForm.get(fieldName)?.setErrors(errors);
          console.log(this.userForm.get(fieldName)?.errors);
          // ...
        }, 1);

        console.log(ch.valid);
      });
  }
  getErrorMessage(fieldName: string) {
    const errors = this.userForm.get(fieldName)?.errors;
    let message = '';
    if (errors) {
      message = Object.keys(errors)
        .map((k) =>
          this.formErrors.get(k === 'exists' ? fieldName + '_' + k : k)
        )
        .toString();
    }

    return message;
  }
}
