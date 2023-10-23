import { Component, ChangeEvent } from "react";
import ItemDataService from "../services/item.service";
import { Link } from "react-router-dom";
import IItemData from '../types/item.type';
import ICartItemData from '../types/cartItem.type';

type Props = {
  addToCart: (cartItem: ICartItemData) => void
};

type State = {
  items: Array<IItemData>,
  currentItem: IItemData | null,
  currentIndex: number,
  searchName: string,
  quantity: number
};

export default class Items extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveItems = this.retrieveItems.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveItem = this.setActiveItem.bind(this);
    this.removeAllItems = this.removeAllItems.bind(this);
    this.searchName = this.searchName.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);

    this.state = {
      items: [],
      currentItem: null,
      currentIndex: -1,
      searchName: "",
      quantity: 1
    };
  }

  componentDidMount() {
    this.retrieveItems();
  }

  onChangeSearchName(e: ChangeEvent<HTMLInputElement>) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveItems() {
    ItemDataService.getAll()
      .then((response: any) => {
        this.setState({
          items: response.data
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveItems();
    this.setState({
      currentItem: null,
      currentIndex: -1
    });
  }

  setActiveItem(item: IItemData, index: number) {
    this.setState({
      currentItem: item,
      currentIndex: index
    });
  }

  removeAllItems() {
    ItemDataService.deleteAll()
      .then((response: any) => {
        this.refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  searchName() {
    this.setState({
      currentItem: null,
      currentIndex: -1
    });

    ItemDataService.findByTitle(this.state.searchName)
      .then((response: any) => {
        this.setState({
          items: response.data
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  addToCart(item: ICartItemData) {
    item.count = this.state.quantity;
    this.props.addToCart(item);

    this.setState({
      quantity: 1
    });
  }

  handleQuantityChange(e: ChangeEvent<HTMLInputElement>) {
    const newQuantity = parseInt(e.target.value, 10); 

    this.setState({
      quantity: newQuantity
    });
  };

  render() {
    const { searchName, items, currentItem, currentIndex, quantity } = this.state;

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
          <h4>Items List</h4>

          <ul className="list-group">
            {items &&
              items.map((item: IItemData, index: number) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveItem(item, index)}
                  key={index}
                >
                  {item.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllItems}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentItem ? (
            <div>
              <h4>Item</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentItem.name}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentItem.description}
              </div>
              <div>
                <label>
                  <strong>Price:</strong>
                </label>{" "}
                {currentItem.price}
              </div>
              <div>
                <label>
                  Name:
                  <input type="number" name="quantity" min="1" value={quantity} onChange={this.handleQuantityChange}/>
                </label>
                <button className="btn btn-sm btn-success btn-effect-success" onClick={() => this.addToCart({item: currentItem} as ICartItemData)}>AddToCart</button>
              </div>

              <div>
                <Link
                  to={"/items/" + currentItem.id}
                  className="badge badge-warning btn btn-secondary"
                >
                  Edit
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Item...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}