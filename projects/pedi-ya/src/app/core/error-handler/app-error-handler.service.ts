import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { NotificationService } from '../notifications/notification.service';
import { TranslateService } from '@ngx-translate/core';


/** Application-wide error handler that adds a UI notification to the error handling
 * provided by the default Angular ErrorHandler.
 */
@Injectable()
export class AppErrorHandler extends ErrorHandler {
  constructor(private notificationsService: NotificationService, private translate: TranslateService) {
    super();
  }

  async handleError(error: Error | HttpErrorResponse) {

    let displayMessage = 'An error occurred.';

    if (!environment.production) {
      displayMessage += ' See console for details.';
    }

    // Capture auth errors
    if (error.message === 'The email address is already in use by another account.') {
      displayMessage = await this.translate.get('ngxauthfirebaseui.error.userNotFound').toPromise();
    }
    if (error.message === 'There is no user record corresponding to this identifier. The user may have been deleted.') {
      displayMessage = await this.translate.get('ngxauthfirebaseui.error.userAlreadyRegistered').toPromise();
    } 

    this.notificationsService.error(displayMessage);

    super.handleError(error);
  }
}
