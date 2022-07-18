import { Injectable } from "@angular/core"
import { catchError } from "rxjs/operators"
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
} from "@angular/common/http"
import { Observable, throwError } from "rxjs"
import { map } from "rxjs/operators"

//Declaring the api url that will provide data for the client app
const apiUrl = "https://julesmyflixdb.herokuapp.com/"

@Injectable({
    providedIn: "root",
})
export class UserRegistrationService {
    // Inject the HttpClient module to the constructor params
    // This will provide HttpClient to the entire class, making it available via this.http
    constructor(private http: HttpClient) {}

    // Making the api call for the user registration endpoint
    public userRegistration(userDetails: any): Observable<any> {
        console.log(userDetails)
        return this.http
            .post(apiUrl + "users", userDetails)
            .pipe(catchError(this.handleError))
    }

    private handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
            console.error("Some error occurred:", error.error.message)
        } else {
            console.error(
                `Error Status code ${error.status}, ` +
                    `Error body is: ${error.error}`
            )
        }
        return throwError("Something bad happened; please try again later.")
    }
}

//User registration
export class userRegistration {
    constructor(private http: HttpClient) {}

    userRegistration(): Observable<any> {
        const token = localStorage.getItem("token")
        return this.http
            .get(apiUrl + "/users", {
                headers: new HttpHeaders({
                    Authorization: "Bearer " + token,
                }),
            })
            .pipe(map(this.extractResponseData), catchError(this.handleError))
    }
    // Non-typed response extraction
    private extractResponseData(res: Response | Object): any {
        const body = res
        return body || {}
    }
    private handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
            console.error("Some error occurred:", error.error.message)
        } else {
            console.error(
                `Error Status code ${error.status}, ` +
                    `Error body is: ${error.error}`
            )
        }
        return throwError("Something bad happened: please try again later.")
    }
}

// User login
@Injectable({
    providedIn: "root",
})
export class UserLoginService {
    constructor(private http: HttpClient) {}

    //Making the api call for the user login endpoint
    public userLogin(userDetails: any): Observable<any> {
        console.log(userDetails)
        return this.http
            .post(apiUrl + "login", userDetails)
            .pipe(catchError(this.handleError))
    }

    private handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
            console.error("Some error occurred:", error.error.message)
        } else {
            console.error(
                `Error Status code ${error.status}, ` +
                    `Error body is: ${error.error}`
            )
        }
        return throwError("Something bad happened; please try again later.")
    }
}

// Get all movies
export class getAllMovies {
    constructor(private http: HttpClient) {}

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
    // Non-typed response extraction
    private extractResponseData(res: Response | Object): any {
        const body = res
        return body || {}
    }
    private handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
            console.error("Some error occurred:", error.error.message)
        } else {
            console.error(
                `Error Status code ${error.status}, ` +
                    `Error body is: ${error.error}`
            )
        }
        return throwError("Something went wrong: please try again later.")
    }
}

// Get one movie
export class getSingleMovie {
    constructor(private http: HttpClient) {}

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

    // Non-typed response extraction
    private extractResponseData(res: Response | Object): any {
        const body = res
        return body || {}
    }
    private handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
            console.error("Some error occurred:", error.error.message)
        } else {
            console.error(
                `Error Status code ${error.status}, ` +
                    `Error body is: ${error.error}`
            )
        }
        return throwError(
            "Cannot seem to find that movie : please try again later."
        )
    }
}

// Get director
export class getDirector {
    constructor(private http: HttpClient) {}

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
    // Non-typed response extraction
    private extractResponseData(res: Response | Object): any {
        const body = res
        return body || {}
    }
    private handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
            console.error("Some error occurred:", error.error.message)
        } else {
            console.error(
                `Error Status code ${error.status}, ` +
                    `Error body is: ${error.error}`
            )
        }
        return throwError(
            "Looks like you should check your spelling we could not find anything: please try again later."
        )
    }
}

// Get genre
export class GetGenreService {
    constructor(private http: HttpClient) {}

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
    // Non-typed response extraction
    private extractResponseData(res: Response | Object): any {
        const body = res
        return body || {}
    }
    private handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
            console.error("Some error occurred:", error.error.message)
        } else {
            console.error(
                `Error Status code ${error.status}, ` +
                    `Error body is: ${error.error}`
            )
        }
        return throwError(
            "Are you sure you spelled the genre right?: please try again later."
        )
    }
}

// Get user
export class GetUserService {
    constructor(private http: HttpClient) {}

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
    // Non-typed response extraction
    private extractResponseData(res: Response | Object): any {
        const body = res
        return body || {}
    }
    private handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
            console.error("Some error occurred:", error.error.message)
        } else {
            console.error(
                `Error Status code ${error.status}, ` +
                    `Error body is: ${error.error}`
            )
        }
        return throwError(
            "Please double-check your spelling: Please try again later."
        )
    }
}

// Add a movie to favourite Movies
export class addFavorite {
    constructor(private http: HttpClient) {}

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
    // Non-typed response extraction
    private extractResponseData(res: Response | Object): any {
        const body = res
        return body || {}
    }
    private handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
            console.error("Some error occurred:", error.error.message)
        } else {
            console.error(
                `Error Status code ${error.status}, ` +
                    `Error body is: ${error.error}`
            )
        }
        return throwError(
            "It seems that your movie was not added: please try again later."
        )
    }
}

// Get favourite movies for a user
export class favoriteMovies {
    constructor(private http: HttpClient) {}

    addFavoriteMovie(movieID: string): Observable<any> {
        // Get Authorization token stored in local storage
        const token = localStorage.getItem("token")
        // Get Username stored in local storage
        const username = localStorage.getItem("user")
        return this.http
            .post(apiUrl + `users/${username}/movies/${movieID}`, null, {
                headers: new HttpHeaders({
                    Authorization: "Bearer " + token,
                }),
            })
            .pipe(map(this.extractResponseData), catchError(this.handleError))
    }
    // Non-typed response extraction
    private extractResponseData(res: Response | Object): any {
        const body = res
        return body || {}
    }
    private handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
            console.error("Some error occurred:", error.error.message)
        } else {
            console.error(
                `Error Status code ${error.status}, ` +
                    `Error body is: ${error.error}`
            )
        }
        return throwError(
            "We could not get your movies: please try again later."
        )
    }
}

// Delete a movie from the favorite movies
export class removeFavorite {
    constructor(private http: HttpClient) {}

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
    // Non-typed response extraction
    private extractResponseData(res: Response | Object): any {
        const body = res
        return body || {}
    }
    private handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
            console.error("Some error occurred:", error.error.message)
        } else {
            console.error(
                `Error Status code ${error.status}, ` +
                    `Error body is: ${error.error}`
            )
        }
        return throwError("Something bad happened: please try again later.")
    }
}

// Edit user
export class userUpdate {
    constructor(private http: HttpClient) {}

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
    // Non-typed response extraction
    private extractResponseData(res: Response | Object): any {
        const body = res
        return body || {}
    }
    private handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
            console.error("Some error occurred:", error.error.message)
        } else {
            console.error(
                `Error Status code ${error.status}, ` +
                    `Error body is: ${error.error}`
            )
        }
        return throwError(
            "We could not update your information: please try again later."
        )
    }
}

// Delete user
export class removeUser {
    constructor(private http: HttpClient) {}

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
    // Non-typed response extraction
    private extractResponseData(res: Response | Object): any {
        const body = res
        return body || {}
    }
    private handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
            console.error("Some error occurred:", error.error.message)
        } else {
            console.error(
                `Error Status code ${error.status}, ` +
                    `Error body is: ${error.error}`
            )
        }
        return throwError("That did not worked out: Please try again later.")
    }
}
