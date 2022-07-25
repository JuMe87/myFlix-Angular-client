import { Component, OnInit } from "@angular/core"
import { FetchApiDataService } from "../fetch-api-data.service"
import { Router } from "@angular/router"

import { GenreComponent } from "../genre/genre.component"
import { DirectorComponent } from "../director/director.component"
import { SynopsisComponent } from "../synopsis/synopsis.component"

import { MatDialog } from "@angular/material/dialog"
import { MatSnackBar } from "@angular/material/snack-bar"

@Component({
    selector: "app-movie-card",
    templateUrl: "./movie-card.component.html",
    styleUrls: ["./movie-card.component.scss"],
})
export class MovieCardComponent implements OnInit {
    user: any = {}
    Username = localStorage.getItem("user")
    movies: any[] = []
    favoriteMovies: any[] = []
    currentUser: any = null
    currentFavs: any = null

    constructor(
        public fetchApiData: FetchApiDataService,
        public dialog: MatDialog,
        public snackBar: MatSnackBar,
        public router: Router
    ) {}

    ngOnInit(): void {
        this.getMovies()
        this.getFavoriteMovies()
        this.getCurrentUser()
    }

    /**
     * Gets movies from Api call and sets the movie's state to return JSON file
     * @returns array holding movies objects
     * @function getAllMovies
     */
    getMovies(): void {
        this.fetchApiData.getAllMovies().subscribe((resp: any) => {
            this.movies = resp
            console.log(this.movies)
            return this.movies
        })
    }

    /**
     * Gets favorite movies from Api call and sets the favorite movies variable to return JSON file
     * @returns array holding ids of user's favorite movies
     * @function getFavoriteMovies
     */
    getFavoriteMovies(): void {
        this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
            this.favoriteMovies = resp
            console.log(this.favoriteMovies)
            return this.favoriteMovies
        })
    }

    /**
     * Checks if a movie is included in the user's list of favorite movies
     * @param id
     * @returns true, if the movie is a favorite movie, else false
     */
    isFav(id: string): boolean {
        return this.favoriteMovies.includes(id)
    }

    /**
     * Opens the user's genre dialog from Genre component to display details
     * @param name
     * @param description
     */
    openGenreDialog(name: string, description: string): void {
        this.dialog.open(GenreComponent, {
            data: {
                Name: name,
                Description: description,
            },
            // Assign dialog width
            width: "500px",
            panelClass: "genre-custom",
        })
    }

    /**
     * Opens the user's director dialog from Director component to display details
     * @param name
     * @param bio
     * @param birthday
     * @param death
     */
    openDirectorDialog(
        name: string,
        bio: string,
        birthday: Date,
        death: Date
    ): void {
        this.dialog.open(DirectorComponent, {
            data: {
                Name: name,
                Bio: bio,
                Birthday: birthday,
                Death: death,
            },
            // Assign dialog width
            width: "500px",
            panelClass: "director-custom",
        })
    }

    /**
     * Opens the user's synopsis dialog from Synopsis component to display details
     * @param title
     * @param description
     */
    openSynopsisDialog(title: string, description: string): void {
        this.dialog.open(SynopsisComponent, {
            data: {
                Title: title,
                Description: description,
            },
            // Assign dialog width
            width: "500px",
            panelClass: "synopsis-custom",
        })
    }

    /**
     * Gets the current logged in user's data
     * @function getUser
     * @returns the current logged in user's data
     */
    getCurrentUser(): void {
        const username = localStorage.getItem("user")
        this.fetchApiData.getUser().subscribe((res: any) => {
            console.log(res)
            const currentUser = res.Username
            console.log(currentUser)
            const currentFavs = res.FavoriteMovies
            console.log(currentFavs)
        })
    }

    /**
     * Adds a movie to the list of favorite movies via an API call
     * @param id
     * @function addFavoriteMovie
     */
    addToFavoriteMovies(id: string, Title: string): void {
        console.log(id)
        const token = localStorage.getItem("token")
        console.log(token)
        this.fetchApiData.addFavoriteMovie(id).subscribe((res: any) => {
            this.snackBar.open(
                `Successfully added ${Title} to favorite movies.`,
                "OK",
                {
                    duration: 4000,
                    verticalPosition: "top",
                }
            )
            console.log(res)
            this.ngOnInit()
        })
    }

    /**
     * Removes a movie from the list of favorite movies via an API call
     * @param id
     * @function removeFavoriteMovie
     */
    removeFromFavoriteMovies(id: string, Title: string): void {
        console.log(id)
        this.fetchApiData.removeFavoriteMovie(id).subscribe((response: any) => {
            this.snackBar.open(
                `${Title} has been removed from favorites`,
                "OK",
                {
                    duration: 2000,
                    verticalPosition: "top",
                }
            )
            this.ngOnInit()
            console.log(response)
        })
        return this.getCurrentUser()
    }
}
