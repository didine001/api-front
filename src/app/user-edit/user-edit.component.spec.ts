import { User } from '../models/user';
import { UserEditComponent } from './user-edit.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('RoleComponent', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
