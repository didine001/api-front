import { Role } from '../../models/roles';
import { RolesService } from '../../_services/role.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-modal',
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.css'],
})
export class RoleModalComponent implements OnInit {
  roleForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: number;
      name: string;
    },
    private dialogRef: MatDialogRef<RoleModalComponent>,
    private roleService: RolesService
  ) {
    this.roleForm = new FormGroup({
      name: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveRole() {
    this.roleForm.markAllAsTouched();
    if (this.roleForm.valid) {
      const role: Role = {
        id: this.data.id,
        name: this.roleForm.get('name')?.value as string,
      };
      if (this.data.id) {
        role.id = this.data.id;
        this.roleService.update(role.id, role).subscribe({
          next: () => this.dialogRef.close(role),
          error: (e) => console.log(e),
        });
      } else {
        this.roleService.create(role).subscribe({
          next: (createdRole) => this.dialogRef.close(createdRole),
          error: (e) => console.log(e),
        });
      }
    }
  }
}
