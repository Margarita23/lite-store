import http from "../http-common";
import IOrdersDescriptionData from "../types/item.type"
import ICartItemData from "../types/cartItem.type";

class OrdersDescriptionDataService {
  getAll(order_id: Number) {
    return http.get<Array<IOrdersDescriptionData>>(`/orders/${order_id}/orders_descriptions`);
  }

  get(id: string) {
    return http.get<IOrdersDescriptionData>(`/orders/${id}`);
  }

  create(data: ICartItemData[]) {
    return http.post<ICartItemData[]>("/orders", data);
  }

  update(data: IOrdersDescriptionData, id: any) {
    return http.put<any>(`/orders/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/orders/${id}`);
  }

  deleteAll() {
    return http.delete<any>(`/orders`);
  }

  findByTitle(title: string) {
    return http.get<Array<IOrdersDescriptionData>>(`/orders?title=${title}`);
  }
}

export default new OrdersDescriptionDataService();