import http from "../http-common";
import IUserData from "../types/user.type"

// interface responseData {
//     user: IUserData | null,
//     token: string
//   }

class UserDataService {
    newUserSession(data: any) {
        return http.post<IUserData>("/login", data);
    }

    deleteUserSession() {
        return http.delete<IUserData>("/logout");
    }

    // currentUser(data: IUserData | null) {
    //     return http.get<IUserData>("/users/check_for_user", { headers: { "Content-type": "application/json", "Authorization": `Bearer ${data ? data.token : data}` } });
    //     // return http.get<responseData>("/users/check_for_user", { headers: { "Content-type": "application/json", token: token } });
    // }

    create(data: any) {
        return http.post<IUserData>("/signup", data);
      }

    currentUser(token: string | null) {
        return http.get<IUserData>("/users/check_for_user", { headers: { "Content-type": "application/json", "Authorization": `Bearer ${token}` } });
        // return http.get<responseData>("/users/check_for_user", { headers: { "Content-type": "application/json", token: token } });
    }
}

export default new UserDataService();