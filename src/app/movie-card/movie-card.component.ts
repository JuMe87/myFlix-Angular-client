import { Component, OnInit } from "@angular/core"
import { FetchApiDataService } from "../fetch-api-data.service"

@Component({
    selector: "app-movie-card",
    templateUrl: "./movie-card.component.html",
    styleUrls: ["./movie-card.component.scss"],
})
export class MovieCardComponent {
    movies: any[] = []

    constructor(public fetchApiData: FetchApiDataService) {}

    ngOnInit(): void {
        this.getMovies()
    }

    /**
     * Gets movies from api call and sets the movies state to return JSON file
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
}
