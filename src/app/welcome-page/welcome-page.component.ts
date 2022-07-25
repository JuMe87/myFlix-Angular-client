import { Component, OnInit } from "@angular/core"
import { UserLoginFormComponent } from "../user-login-form/user-login-form.component"
import { UserRegistrationFormComponent } from "../user-registration-form/user-registration-form.component"
import { MatDialog } from "@angular/material/dialog"

@Component({
    selector: "app-welcome-page",
    templateUrl: "./welcome-page.component.html",
    styleUrls: ["./welcome-page.component.scss"],
})
export class WelcomePageComponent implements OnInit {
    constructor(public dialog: MatDialog) {}

    ngOnInit(): void {}

    /**
     * Opens dialog to display th User-Registration component
     */
    openUserRegistrationDialog(): void {
        this.dialog.open(UserRegistrationFormComponent, {
            width: "480px",
            panelClass: "register-custom",
        })
    }

    /**
     * Opens dialog to display the User-Login component
     */
    openUserLoginDialog(): void {
        this.dialog.open(UserLoginFormComponent, {
            width: "480px",
        })
    }
}
