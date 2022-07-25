import { Component, OnInit } from "@angular/core"
import { FetchApiDataService } from "../fetch-api-data.service"

import { EditProfileComponent } from "../edit-profile/edit-profile.component"
import { GenreComponent } from "../genre/genre.component"
import { DirectorComponent } from "../director/director.component"
import { SynopsisComponent } from "../synopsis/synopsis.component"

import { MatDialog } from "@angular/material/dialog"
import { MatSnackBar } from "@angular/material/snack-bar"

import { Router } from "@angular/router"

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
    user: any = {}
    username: any = localStorage.getItem("user")
    movies: any[] = []
    favoriteMovies: any[] = []
    displayElement: boolean = false

    constructor(
        public fetchApiData: FetchApiDataService,
        public dialog: MatDialog,
        public router: Router,
        public snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.getUser()
        this.getFavoriteMovies()
    }

    /**
     * Gets user data from Api call and sets the user variable to return JSON file
     * @returns object holding user information
     * @function getUser
     */
    getUser(): void {
        this.fetchApiData.getUser().subscribe((resp: any) => {
            this.user = resp
            console.log(this.user)
            return this.user
        })
    }

    /**
     * Opens the edit profile dialog from Edit-Profile component to allow user to edit personal data
     */
    openEditProfileDialog(): void {
        this.dialog.open(EditProfileComponent, {
            width: "500px",
            panelClass: "edit-user-custom",
        })
    }

    /**
     * Gets a user's favorite movies
     * @function getAllMovies
     */
    getFavoriteMovies(): void {
        this.fetchApiData.getAllMovies().subscribe((resp: any) => {
            this.movies = resp
            this.movies.forEach((movie: any) => {
                if (this.user.FavoriteMovies.includes(movie._id)) {
                    this.favoriteMovies.push(movie)
                }
            })
        })
        console.log(this.favoriteMovies)
    }

    /**
     * use API end-point to remove a movie from user's favorites
     * @function deleteFavoriteMovies
     * @param MovieID {string}
     * @param Title {string}
     * @returns updated user's data in json format
     */
    removeFavoriteMovie(MovieID: string, Title: string): void {
        this.fetchApiData.removeFavoriteMovie(MovieID).subscribe((res: any) => {
            this.snackBar.open(
                `Successfully removed ${Title} from favorite movies.`,
                "OK",
                {
                    duration: 4000,
                    verticalPosition: "top",
                }
            )
            setTimeout(function () {
                window.location.reload()
            }, 4000)
        })
    }

    /**
     * Opens the dialog to display the Synopsis component
     * @param title {string}
     * @param imagePath {any}
     * @param description {string}
     */
    openSynopsis(title: string, imagePath: any, description: string): void {
        this.dialog.open(SynopsisComponent, {
            data: {
                Title: title,
                ImagePath: imagePath,
                Description: description,
            },
            width: "500px",
            panelClass: "synopsis-custom",
        })
    }

    /**
     * Opens the dialog to display the Director component
     * @param title {string}
     * @param name {string}
     * @param bio {string}
     * @param birth {string}
     */
    openDirectorDialog(
        title: string,
        name: string,
        bio: string,
        birth: string
    ): void {
        this.dialog.open(DirectorComponent, {
            data: {
                Title: title,
                Name: name,
                Bio: bio,
                Birth: birth,
            },
            width: "500px",
            panelClass: "director-custom",
        })
    }

    /**
     * Opens the dialog to display the Genre component
     * @param title {string}
     * @param name {string}
     * @param description {string}
     */
    openGenreDialog(title: string, name: string, description: string): void {
        this.dialog.open(GenreComponent, {
            data: {
                Title: title,
                Name: name,
                Description: description,
            },
            width: "500px",
            panelClass: "genre-custom",
        })
        console.log("Name: " + name)
    }

    /**
     * Deletes the user profile, redirects to Welcome screen
     * @function deleteUser
     */
    deleteProfile(): void {
        if (
            confirm(
                "Are you sure you want to delete your account? This cannnot be undone."
            )
        ) {
            this.router.navigate(["welcome"]).then(() => {
                this.snackBar.open(
                    "You have successfully deleted your account!",
                    "OK",
                    {
                        duration: 2000,
                    }
                )
            })
            this.fetchApiData.deleteUser().subscribe((result) => {
                console.log(result)
                localStorage.clear()
            })
        }
    }
}
