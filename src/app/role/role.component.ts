import { Component, OnInit } from '@angular/core';
import { RolesService } from '../_services/role.service';
import { Role } from '../models/roles';
import { MatDialog } from '@angular/material/dialog';
import { RoleModalComponent } from './role-modal/role-modal.component';
import { User } from '../models/user';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
})
export class RoleComponent implements OnInit {
  roles: Role[] = [];
  editingRoleId: number | null = null;
  role: Role = { id: 0, name: '' };
  isEditable = false;

  constructor(private rolesService: RolesService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllRoles();
  }

  getAllRoles() {
    this.rolesService.getAll().subscribe(
      (data) => {
        this.roles = data;
      },
      (error) => console.log(error)
    );
  }

  createRole(): void {
    this.role = { id: 0, name: '' };
    this.isEditable = true;
    const dialogRef = this.dialog.open(RoleModalComponent, {
      data: { name: this.role.name },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.rolesService.create(result).subscribe(
          () => {
            this.getAllRoles();
          },
          (error) => {
            console.error('Error while creating the role ', error);
          }
        );
      }
    });
  }

  deleteRole(id: number) {
    this.rolesService.delete(id).subscribe(
      () => {
        console.log('Role deleted');
        this.getAllRoles();
      },
      (error) => {
        console.error('Error while deleting the role ', error);
      }
    );
  }

  editRole(id: number): void {
    this.isEditable = true;
    const role = this.roles.find((r) => r.id == id) || {
      id: 0,
      name: '',
    };
    const dialogRef = this.dialog.open(RoleModalComponent, {
      data: { name: role.name, id: role.id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllRoles();
      }
    });
  }

  saveRole(role: Role) {
    this.rolesService.update(role.id, role).subscribe(
      () => {
        this.getAllRoles();
        this.isEditable = false;
      },
      (error) => {
        console.error('Error while updating the role ', error);
      }
    );
  }
}
