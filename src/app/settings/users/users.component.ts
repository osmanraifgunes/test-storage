import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { pageTransition } from '../../animations';

import { UsersService } from './users.service';
import { User } from './user';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [pageTransition]
})
export class UsersComponent implements OnInit, OnDestroy {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';

  selectedUsers = [];
  subscription;
  users: User[];

  public createOpened = false;
  public editOpened = false;
  public deleteOpened = false;

  constructor(
    private usersService: UsersService,
    private notificationsService: NotificationsService,
    protected translateService: TranslateService
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadUsers() {
    this.subscription = this.usersService.getUsers().subscribe(
      data => this.users = data,
      error => console.log(error)); // this.notificationsService.error(error.status, error.error));
  }

  onAdd() {
    this.createOpened = true;
  }

  onEdit() {
    this.editOpened = true;
  }

  onDelete() {
    // TODO are you sure? via modal
    this.selectedUsers.forEach(selectedUser => {
      // TODO delete via service
      this.users = this.users.filter(users => users !== selectedUser);
      // TODO Notification => successfully deleted
    });
  }

  createUser(user: User) {
    // remove unused field (used only for validation)
    delete user.confirmPassword;

    this.usersService.createUser(user).subscribe(
      response => {
        if (response.status === 201) {
          this.notificationsService.success(
            `${user.lastName} ${user.firstName}`,
            this.translateService.instant('TESTMANAGEMENTPAGE.SUCCESSFULLY_CREATED')
          );
          this.users.push(user);
        }
      },
      error => console.log(error)
    );
  }

}
