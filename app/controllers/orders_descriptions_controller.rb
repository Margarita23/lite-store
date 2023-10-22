class OrdersDescriptionsController < ApplicationController
  before_action :set_orders_description, only: %i[ show update destroy ]
  before_action :set_order, only: %i[ index ]
  

  def index
    @orders_descriptions = @order.orders_descriptions

    render json: @orders_descriptions
  end

  def show
    render json: @orders_description
  end

  def create
    @orders_description = OrdersDescription.new(orders_description_params)

    if @orders_description.save
      render json: @orders_description, status: :created, location: @orders_description
    else
      render json: @orders_description.errors, status: :unprocessable_entity
    end
  end

  def update
    if @orders_description.update(orders_description_params)
      render json: @orders_description
    else
      render json: @orders_description.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @orders_description.destroy
  end

  private

    def set_order
      @order = Order.find(params[:order_id])
    end

    def set_orders_description
      @order = Order.find(params[:order_id])
      @orders_description = OrdersDescription.find(params[:id])
    end

    def orders_description_params
      params.require(:orders_description).permit(:order_id, :item_id, :quantity)
    end
end
