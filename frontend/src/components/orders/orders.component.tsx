import { Component, ChangeEvent } from "react";
import OrderDataService from "../../services/order.service";
import { Link } from "react-router-dom";
import IOrderData from '../../types/order.type';
import Order from "./order.component";

type Props = {};

type State = {
  orders: Array<IOrderData>,
  currentOrder: IOrderData | null,
  currentIndex: number,
  searchName: string
};

export default class Orders extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveOrders = this.retrieveOrders.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveOrder = this.setActiveOrder.bind(this);
    this.removeAllOrders = this.removeAllOrders.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      orders: [],
      currentOrder: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveOrders();
  }

  onChangeSearchName(e: ChangeEvent<HTMLInputElement>) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveOrders() {
    OrderDataService.getAll()
      .then((response: any) => {
        this.setState({
          orders: response.data
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveOrders();
    this.setState({
      currentOrder: null,
      currentIndex: -1
    });
  }

  setActiveOrder(order: IOrderData, index: number) {
    this.setState({
      currentOrder: order,
      currentIndex: index
    });
  }

  removeAllOrders() {
    OrderDataService.deleteAll()
      .then((response: any) => {
        this.refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  searchName() {
    this.setState({
      currentOrder: null,
      currentIndex: -1
    });

    OrderDataService.findByTitle(this.state.searchName)
      .then((response: any) => {
        this.setState({
          orders: response.data
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { searchName, orders, currentOrder, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Orders List</h4>

          <ul className="list-group">
            {orders &&
              orders.map((order: IOrderData, index: number) => (
                <li
                  className={
                    "list-group-order " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveOrder(order, index)}
                  key={index}
                >
                  {order.id}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllOrders}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentOrder ? (
            <Order id={currentOrder.id} amount={currentOrder.amount} />
          ) : (
            <div>
              <br />
              <p>Please click on a Order...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}