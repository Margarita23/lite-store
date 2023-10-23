class Users::SessionsController < Devise::SessionsController

  def create
    auth_object = Authentication.new(sign_in_params)
    if auth_object.authenticate
      sign_in(auth_object.current_user)
      render json: {
        message: "Login successful!",
        token: auth_object.generate_token,
        user: UserSerializer.new(auth_object.current_user).serializable_hash[:data][:attributes]}, status: :ok
    else
      render json: {
        message: "Incorrect email/password combination"}, status: :unauthorized
    end
  end

  private

  def sign_in_params
    params.require(:session).permit(:email, :password)
  end
end