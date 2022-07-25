import { Component, OnInit, Input } from "@angular/core"

// You'll use this import to close the dialog on success
import { MatDialogRef } from "@angular/material/dialog"

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from "../fetch-api-data.service"

// This import is used to display notifications back to the user
import { MatSnackBar } from "@angular/material/snack-bar"

@Component({
    selector: "app-user-registration-form",
    templateUrl: "./user-registration-form.component.html",
    styleUrls: ["./user-registration-form.component.scss"],
})
export class UserRegistrationFormComponent implements OnInit {
    @Input() userData = { Username: "", Password: "", Email: "", Birthday: "" }

    // Called when creating an instance of the class
    constructor(
        public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
        public snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {}

    /**
     * Registers a user to database
     * displays a message that tells the user his registration was successful
     * @function userRegistration
     */
    registerUser(): void {
        this.fetchApiData.userRegistration(this.userData).subscribe(
            (result) => {
                // Logic for a successful user registration goes here.
                this.dialogRef.close() // This will close the modal on success!
                console.log(Response)
                this.snackBar.open("You registered successfully!", "OK", {
                    duration: 2000,
                })
            },
            (result) => {
                this.snackBar.open(result, "OK", {
                    duration: 2000,
                })
            }
        )
    }
}
