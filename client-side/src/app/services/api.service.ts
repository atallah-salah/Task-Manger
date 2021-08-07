import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  readonly dataAPI: string = "https://task-manager-124.herokuapp.com";

  constructor(private http: HttpClient) {}

  get(url: string) {
        return this.http.get(
      `${this.dataAPI}/${url}`,
      // { observe: "response" }
    );
  }

  post(url: string, payload: Object) {
    return this.http.post(`${this.dataAPI}/${url}`, payload);
  }

  patch(url: string, payload: Object) {
    return this.http.patch(`${this.dataAPI}/${url}`, payload);
  }

  delete(url: string) {
    return this.http.delete(`${this.dataAPI}/${url}`);
  }

  login(email: string, password: string) {
    return this.http.post(
      `${this.dataAPI}/users/login`,
      {
        email,
        password,
      },
      { observe: "response" }
    );
  }

  signup(email: string, password: string) {
    return this.http.post(
      `${this.dataAPI}/users`,
      {
        email,
        password,
      },
      { observe: "response" }
    );
  }
}
