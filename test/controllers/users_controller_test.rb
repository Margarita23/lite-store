require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  test "should get check_for_user" do
    get users_check_for_user_url
    assert_response :success
  end
end
