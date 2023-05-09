import { Component, OnInit } from '@angular/core';
import { RolesService } from '../_services/role.service';
import { Role } from '../models/roles';
import { MatDialog } from '@angular/material/dialog';

import { UpdateUserDto, User } from '../models/user';
import { AuthService } from '../_services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserEditModalComponent } from './user-edit-modal/user-edit-modal.component';

@Component({
  selector: 'app-role',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  users: User[] = [];
  editingRoleId: number | null = null;
  user: User = {
    id: 0,
    email: '',
    name: '',
    username: '',
    adress: '',
    roleId: 0,
  };
  isEditable = false;

  constructor(private userServices: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userServices.getAll().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => console.log(error)
    );
  }

  createUser(): void {
    this.user = {
      id: 0,
      email: '',
      name: '',
      username: '',
      adress: '',
      roleId: 0,
    };
    this.isEditable = true;
    const dialogRef = this.dialog.open(UserEditModalComponent, {
      data: {
        username: this.user.username,
        email: this.user.email,
        role: this.user.roleId,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userServices.createUser(result).subscribe(
          () => {
            this.getAllUsers();
          },
          (error) => {
            console.error('Error while creating the user ', error);
          }
        );
      }
    });
  }

  deleteUser(id: number) {
    this.userServices.deleteUser(id).subscribe(
      () => {
        console.log('Role deleted');
        this.getAllUsers();
      },
      (error) => {
        console.error('Error while deleting the role ', error);
      }
    );
  }

  editUser(id: number): void {
    this.isEditable = true;
    const user = this.users.find((u) => u.id == id) || {
      id: 0,
      name: '',
      username: '',
      roleId: 0,
      email: '',
      adress: '',
    };
    const dialogRef = this.dialog.open(UserEditModalComponent, {
      data: {
        username: user.username,
        id: user.id,
        email: user.email,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllUsers();
      }
    });
  }

  saveUser(user: User) {
    this.userServices.updateUser(user.id, user).subscribe(
      () => {
        this.getAllUsers();
        this.isEditable = false;
      },
      (error) => {
        console.error('Error while updating the role ', error);
      }
    );
  }
}
