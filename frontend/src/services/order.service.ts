import http from "../http-common";
import IOrderData from "../types/item.type"
import ICartItemData from "../types/cartItem.type";

class OrderDataService {
  getAll() {
    return http.get<Array<IOrderData>>("/orders");
  }

  get(id: string) {
    return http.get<IOrderData>(`/orders/${id}`);
  }

  create(data: ICartItemData[]) {
    return http.post<ICartItemData[]>("/orders", data);
  }

  update(data: IOrderData, id: any) {
    return http.put<any>(`/orders/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/orders/${id}`);
  }

  deleteAll() {
    return http.delete<any>(`/orders`);
  }

  findByTitle(title: string) {
    return http.get<Array<IOrderData>>(`/orders?title=${title}`);
  }
}

export default new OrderDataService();