import { Component, ChangeEvent } from "react";
import ItemDataService from "../services/item.service";
import IItemData from '../types/item.type';

type Props = {};

type State = IItemData & {
  submitted: boolean
};

export default class AddItem extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.newItem = this.newItem.bind(this);

    this.state = {
      id: null,
      name: "",
      description: "",
      price: 0,
      submitted: false
    };
  }

  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      description: e.target.value
    });
  }

  onChangePrice(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      price: Number(e.target.value)
    });
  }

  saveItem() {
    const data: IItemData = {
      name: this.state.name,
      description: this.state.description,
      price: this.state.price
    };

    ItemDataService.create(data)
      .then((response: any) => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          price: response.data.price,
          submitted: true
        });
        console.log(response.data);
        console.log('hello');
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  newItem() {
    this.setState({
      id: null,
      name: "",
      description: "",
      price: 0,
      submitted: false
    });
  }

  render() {
    const { submitted, name, description, price } = this.state;

    return (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newItem}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={name}
                onChange={this.onChangeName}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                required
                value={price}
                onChange={this.onChangePrice}
                name="price"
              />
            </div>

            <button onClick={this.saveItem} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}