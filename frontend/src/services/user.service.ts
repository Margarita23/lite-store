import http from "../http-common";
import IUserData from "../types/user.type"

interface responseData {
    user: IUserData
  }

class UserDataService {
    newUserSession(data: any) {
        return http.post<IUserData>("/login", data);
    }

    deleteUserSession(data: any) {
        return http.delete<IUserData>("/logout", data);
    }

    currentUser(token: string) {
        return http.get<IUserData>("/users/check_for_user", { headers: { "Content-type": "application/json", "Authorization": `Bearer ${token}` } });
        // return http.get<responseData>("/users/check_for_user", { headers: { "Content-type": "application/json", token: token } });
    }


//   get(id: string) {
//     return http.get<IUserData>(`/items/${id}`);
//   }

//   create(data: IUserData) {
//     return http.post<IUserData>("/items", data);
//   }

//   update(data: IUserData, id: any) {
//     return http.put<any>(`/items/${id}`, data);
//   }

//   delete(id: any) {
//     return http.delete<any>(`/items/${id}`);
//   }

//   deleteAll() {
//     return http.delete<any>(`/items`);
//   }

//   findByTitle(title: string) {
//     return http.get<Array<IUserData>>(`/items?title=${title}`);
//   }
}

export default new UserDataService();