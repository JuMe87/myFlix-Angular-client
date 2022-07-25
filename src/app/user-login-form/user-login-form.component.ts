import { Component, OnInit, Input } from "@angular/core"
import { MatDialogRef } from "@angular/material/dialog"
import { FetchApiDataService } from "../fetch-api-data.service"
import { MatSnackBar } from "@angular/material/snack-bar"
import { Router } from "@angular/router"

@Component({
    selector: "app-user-login-form",
    templateUrl: "./user-login-form.component.html",
    styleUrls: ["./user-login-form.component.scss"],
})
export class UserLoginFormComponent implements OnInit {
    @Input() userData = { Username: "", Password: "" }

    constructor(
        public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<UserLoginFormComponent>,
        public snackBar: MatSnackBar,
        public router: Router
    ) {}

    ngOnInit(): void {}

    /**
     * Sends form inputs for user log-in to backend via fetchApiData Service
     */
    loginUser(): void {
        this.fetchApiData.userLogin(this.userData).subscribe(
            (result) => {
                console.log(result)
                // Add user name and token to local Storage
                localStorage.setItem("user", result.user.Username)
                localStorage.setItem("token", result.token)
                this.dialogRef.close() // Close the modal on success
                this.snackBar.open("User Log-in successfull", "OK", {
                    duration: 2000,
                })
                // Redirects to movies (main) page
                this.router.navigate(["movies"])
            },
            (result) => {
                this.snackBar.open("User Log-in failed", "OK", {
                    duration: 2000,
                })
            }
        )
    }
}
