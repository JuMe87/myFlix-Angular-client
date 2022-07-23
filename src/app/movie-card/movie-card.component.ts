import { Component, OnInit } from "@angular/core"
import { FetchApiDataService } from "../fetch-api-data.service"

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
    movies: any[] = []
    favoriteMovies: any[] = []
    currentUser: any = null

    constructor(
        public fetchApiData: FetchApiDataService,
        public dialog: MatDialog,
        public snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.getMovies()
        this.getFavoriteMovies()
    }

    // Gets movies from Api call and sets the movies state to return JSON file

    getMovies(): void {
        this.fetchApiData.getAllMovies().subscribe((resp: any) => {
            this.movies = resp
            console.log(this.movies)
            return this.movies
        })
    }

    // Gets favorite movies from Api call and sets the favorite movies variable to return JSON file

    getFavoriteMovies(): void {
        this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
            this.favoriteMovies = resp
            console.log(this.favoriteMovies)
            return this.favoriteMovies
        })
    }

    // Checks if a movie is included in the user's list of favorite movies

    isFav(id: string): boolean {
        return this.favoriteMovies.includes(id)
    }

    // Opens the user's genre dialog from Genre component to display details

    openGenreDialog(name: string, description: string): void {
        this.dialog.open(GenreComponent, {
            data: {
                Name: name,
                Description: description,
            },
            // Assign dialog width
            width: "500px",
        })
    }

    // Opens the user's director dialog from Director component to display details

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
        })
    }

    // Opens the user's synopsis dialog from Synopsis component to display details

    openSynopsisDialog(title: string, description: string): void {
        this.dialog.open(SynopsisComponent, {
            data: {
                Title: title,
                Description: description,
            },
            // Assign dialog width
            width: "500px",
        })
    }

    // Adds a movie to the list of favorite movies via an API call

    addToFavoriteMovies(id: string): void {
        const token = localStorage.getItem("token")
        console.log(id)
        this.fetchApiData.addFavoriteMovie(id).subscribe((response: any) => {
            this.ngOnInit()
        })
    }

    // function to check if movie is or is not in favorites list, in order to display outline or filled in fav heart

    // isFav(id: string): boolean {
    //     return this.currentFavs.includes(id)
    // }

    // Removes a movie from the list of favorite movies via an API call

    removeFromFavoriteMovies(id: string): void {
        const token = localStorage.getItem("token")
        console.log(id)
        this.fetchApiData.removeFavoriteMovie(id).subscribe((response: any) => {
            console.log(response)
            this.ngOnInit()
        })
    }
}
