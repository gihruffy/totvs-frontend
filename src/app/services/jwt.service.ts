import { Injectable } from '@angular/core';
import { AuthenticationService } from "@app/services/authentication.service"

@Injectable()
export class JwtService {

    constructor(private authenticationService: AuthenticationService){}

    getToken(): string {
      const currentUser = this.authenticationService.currentUserValue;
      return (currentUser && currentUser.token) ? currentUser.token : "";
    }
}
