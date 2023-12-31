class OrdersController < ApplicationController
  respond_to :json
  before_action :set_order, only: %i[ show update destroy ]

  def index
    @orders = Order.all

    render json: @orders
  end

  def show
    render json: @order
  end

  def create
    order_params = params[:_json]
  
    @order = Order.new(user_id: 1)
    total_amount = 0

    order_params.each do |item_params|
      item = item_params[:item]
      count = item_params[:count].to_i
      price = item[:price].to_f
      total_amount += count * price

      order_description = @order.orders_descriptions.build(
        item_id: item[:id],
        quantity: count
      )
    end

    @order.amount = total_amount

    if @order.save
      render json: @order, status: :created, location: @order
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  def update
    if @order.update(order_params)
      render json: @order
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @order.destroy
  end

  private
    def set_order
      @order = Order.find(params[:id])
    end

    def order_params
      params.permit(:user_id, :amount)
    end
end
