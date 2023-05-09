import { AuthService } from './../../_services/auth.service';
import { UserEditComponent } from '../user-edit.component';
import { UserEdit } from './../../models/useredit';
import { Role } from '../../models/roles';
import { RolesService } from '../../_services/role.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, UntypedFormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.css'],
})
export class UserEditModalComponent implements OnInit {
  nameFormControl: UntypedFormControl;
  emailFormControl: UntypedFormControl;
  roleFormControl: UntypedFormControl;
  users: User[] = [];
  roles: Role[] = [];
  selectedRoleId? : number ;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: number;
      name: string;
      roleId: number;
    },
    private dialogRef: MatDialogRef<UserEditComponent>,
    private authService: AuthService,
    public rolesService: RolesService
  ) {
    this.nameFormControl = new FormControl();
    this.roleFormControl = new FormControl('');
    this.emailFormControl = new FormControl();
  }

  ngOnInit(): void {
    this.rolesService.getAll().subscribe((roles) => {
      this.roles = roles;
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveUser() {
    this.nameFormControl.markAsTouched();
    this.emailFormControl.markAsTouched();
    this.roleFormControl.markAsTouched();
    if (
      this.nameFormControl.valid &&
      this.emailFormControl.valid
    ) {
      const user: User = {
        id: this.data.id,
        username: this.nameFormControl.value,
        name: '',
        adress: '',
        email: this.emailFormControl.value,
        roleId: this.selectedRoleId
      };
      if (this.data.id) {
        user.id = this.data.id;
        this.authService.updateUser(user.id, user).subscribe({
          next: () => this.dialogRef.close(user),
          error: (e) => console.log(e),
        });
      } else {
        this.authService.createUser(user).subscribe({
          next: (createdUser) => this.dialogRef.close(createdUser),
          error: (e) => console.log(e),
        });
      }
      this.roleFormControl = new FormControl('', [Validators.required]);
    }
  }

  getRoles(): void {
    this.rolesService.getAll().subscribe((roles) => {
      this.roles = roles;
    });
  }
}
