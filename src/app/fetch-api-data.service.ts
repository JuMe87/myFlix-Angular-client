import { Injectable } from "@angular/core"
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
} from "@angular/common/http"
import { Observable, throwError } from "rxjs"
import { catchError, map } from "rxjs/operators"

//Declaring the Api url that will provide data for the client app
const apiUrl = "https://julesmyflixdb.herokuapp.com/"

//get token from localStorage
const token = localStorage.getItem("token")

//get username from localStorage
const username = localStorage.getItem("username")

@Injectable({
    providedIn: "root",
})
export class FetchApiDataService {
    // Inject HttpClient module to constructor params
    constructor(private http: HttpClient) {}

    // Calls Api endpoint to register a new user

    public userRegistration(userDetails: any): Observable<any> {
        console.log(userDetails)
        return this.http
            .post(apiUrl + "users", userDetails)
            .pipe(catchError(this.handleError))
    }

    // Calls Api endpoint to log-in an existing user

    public userLogin(userDetails: any): Observable<any> {
        return this.http
            .post(apiUrl + "login", userDetails)
            .pipe(catchError(this.handleError))
    }

    // Calls Api endpoint to get data on all movies

    getAllMovies(): Observable<any> {
        // Get Authorization token stored in local storage
        const token = localStorage.getItem("token")
        return this.http
            .get(apiUrl + "movies", {
                headers: new HttpHeaders({
                    Authorization: "Bearer " + token,
                }),
            })
            .pipe(map(this.extractResponseData), catchError(this.handleError))
    }

    // Calls Api endpoint to get data on a single movie specified by its title

    getSingleMovie(title: any): Observable<any> {
        // Get Authorization token stored in local storage
        const token = localStorage.getItem("token")
        return this.http
            .get(apiUrl + `movies/${title}`, {
                headers: new HttpHeaders({
                    Authorization: "Bearer " + token,
                }),
            })
            .pipe(map(this.extractResponseData), catchError(this.handleError))
    }

    // Calls Api endpoint to get data on a director

    getDirector(name: any): Observable<any> {
        // Get Authorization token stored in local storage
        const token = localStorage.getItem("token")
        return this.http
            .get(apiUrl + `movies/director/${name}`, {
                headers: new HttpHeaders({
                    Authorization: "Bearer " + token,
                }),
            })
            .pipe(map(this.extractResponseData), catchError(this.handleError))
    }

    // Calls Api endpoint to get data on a genre

    getGenre(name: any): Observable<any> {
        // Get Authorization token stored in local storage
        const token = localStorage.getItem("token")
        return this.http
            .get(apiUrl + `movies/genre/${name}`, {
                headers: new HttpHeaders({
                    Authorization: "Bearer " + token,
                }),
            })
            .pipe(map(this.extractResponseData), catchError(this.handleError))
    }

    // Calls API endpoint to get data on a single user

    getUser(): Observable<any> {
        // Get Authorization token stored in local storage
        const token = localStorage.getItem("token")
        // Get Username stored in local storage
        const username = localStorage.getItem("user")
        return this.http
            .get(apiUrl + `users/${username}`, {
                headers: new HttpHeaders({
                    Authorization: "Bearer " + token,
                }),
            })
            .pipe(map(this.extractResponseData), catchError(this.handleError))
    }

    // Calls Api endpoint to get list of favorite movies of this user

    getFavoriteMovies(): Observable<any> {
        // Get Authorization token stored in local storage
        const token = localStorage.getItem("token")
        // Get Username stored in local storage
        const username = localStorage.getItem("user")
        return this.http
            .get(apiUrl + `users/${username}/movies`, {
                headers: new HttpHeaders({
                    Authorization: "Bearer " + token,
                }),
            })
            .pipe(map(this.extractResponseData), catchError(this.handleError))
    }

    // Calls Api endpoint to add a movie to the user's list of favorite movies

    public addFavoriteMovie(movieID: any): Observable<any> {
        // Get Authorization token stored in local storage
        const token = localStorage.getItem("token")
        // Get Username stored in local storage
        const username = localStorage.getItem("user")
        return this.http
            .post(
                apiUrl + `users/${username}/movies/${movieID}`,
                {},
                {
                    headers: new HttpHeaders({
                        Authorization: `Bearer ${token}`,
                    }),
                }
            )
            .pipe(map(this.extractResponseData), catchError(this.handleError))
    }

    // Calls Api endpoint to delete a movie from the user's list of favorite movies

    removeFavoriteMovie(movieID: any): Observable<any> {
        // Get Authorization token stored in local storage
        const token = localStorage.getItem("token")
        // Get Username stored in local storage
        const username = localStorage.getItem("user")
        return this.http
            .delete(apiUrl + `users/${username}/movies/${movieID}`, {
                headers: new HttpHeaders({
                    Authorization: "Bearer " + token,
                }),
            })
            .pipe(map(this.extractResponseData), catchError(this.handleError))
    }

    // Calls Api endpoint to allow user to update their user information

    editUser(updateDetails: any): Observable<any> {
        // Get Authorization token stored in local storage
        const token = localStorage.getItem("token")
        // Get Username stored in local storage
        const username = localStorage.getItem("user")
        return this.http
            .put(apiUrl + `users/${username}`, updateDetails, {
                headers: new HttpHeaders({
                    Authorization: "Bearer " + token,
                }),
            })
            .pipe(map(this.extractResponseData), catchError(this.handleError))
    }

    // Calls Api endpoint to deregister an existing user

    deleteUser(): Observable<any> {
        // Get Authorization token stored in local storage
        const token = localStorage.getItem("token")
        // Get Username stored in local storage
        const username = localStorage.getItem("user")
        return this.http
            .delete(apiUrl + `users/${username}`, {
                headers: new HttpHeaders({
                    Authorization: "Bearer " + token,
                }),
            })
            .pipe(map(this.extractResponseData), catchError(this.handleError))
    }

    // Extracts response data from HTTP response

    private extractResponseData(res: any): any {
        const body = res
        return body || {}
    }

    // Handles errors

    private handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
            console.error("Some error occured:", error.error.message)
        } else {
            console.error(
                `Error Status code ${error.status}, ` +
                    `Error Body is: ${error.error}`
            )
        }
        return throwError("Something bad happened; please try again later.")
    }
}
