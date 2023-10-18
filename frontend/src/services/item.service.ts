import http from "../http-common";
import IItemData from "../types/item.type"

class ItemDataService {
  getAll() {
    return http.get<Array<IItemData>>("/items");
  }

  get(id: string) {
    return http.get<IItemData>(`/items/${id}`);
  }

  create(data: IItemData) {
    return http.post<IItemData>("/items", data);
  }

  update(data: IItemData, id: any) {
    return http.put<any>(`/items/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/items/${id}`);
  }

  deleteAll() {
    return http.delete<any>(`/items`);
  }

  findByTitle(title: string) {
    return http.get<Array<IItemData>>(`/items?title=${title}`);
  }
}

export default new ItemDataService();