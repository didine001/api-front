import { Role } from '../../models/roles';
import { RolesService } from '../../_services/role.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, UntypedFormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-modal',
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.css'],
})
export class RoleModalComponent implements OnInit {
  nameFormControl: UntypedFormControl;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: number;
      name: string;
    },
    private dialogRef: MatDialogRef<RoleModalComponent>,
    private roleService: RolesService
  ) {
    this.nameFormControl = new FormControl();
  }

  ngOnInit(): void {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveRole() {
    this.nameFormControl.markAsTouched();
    if (this.nameFormControl.valid) {
      const role: Role = {
        id: this.data.id,
        name: this.nameFormControl.value as string,
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
    this.nameFormControl = new FormControl('', [Validators.required]);
  }
}
