require "test_helper"

class OrdersDescriptionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @orders_description = orders_descriptions(:one)
  end

  test "should get index" do
    get orders_descriptions_url, as: :json
    assert_response :success
  end

  test "should create orders_description" do
    assert_difference("OrdersDescription.count") do
      post orders_descriptions_url, params: { orders_description: { item_id: @orders_description.item_id, order_id: @orders_description.order_id, quantity: @orders_description.quantity } }, as: :json
    end

    assert_response :created
  end

  test "should show orders_description" do
    get orders_description_url(@orders_description), as: :json
    assert_response :success
  end

  test "should update orders_description" do
    patch orders_description_url(@orders_description), params: { orders_description: { item_id: @orders_description.item_id, order_id: @orders_description.order_id, quantity: @orders_description.quantity } }, as: :json
    assert_response :success
  end

  test "should destroy orders_description" do
    assert_difference("OrdersDescription.count", -1) do
      delete orders_description_url(@orders_description), as: :json
    end

    assert_response :no_content
  end
end
