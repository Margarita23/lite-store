# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  respond_to :json
  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  def create
    # super

    puts '***Rita000000000'
    puts sign_in_params
    puts sign_in_params[:email]

    user = User.find_by_email(sign_in_params[:email])

    puts user
    puts signed_in?
    puts '***USERUSERUSER'

    if user && user.valid_password?(sign_in_params[:password])
      token = user.generate_jwt
      render json: {
            status: {code: 200, message: 'Rita! Logged in sucessfully!'},
            user: UserSerializer.new(user).serializable_hash[:data][:attributes],
            json: token.to_json
          }, status: :ok
    else
      render json: { errors: { 'email or password' => ['is invalid'] } }, status: :unprocessable_entity
    end

  end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end

  # private

  # def respond_with(resource, _opts = {})
  #   render json: {
  #     status: {code: 200, message: 'Rita! Logged in sucessfully!'},
  #     user: UserSerializer.new(resource).serializable_hash[:data][:attributes]
  #   }, status: :ok
  # end

  # def respond_to_on_destroy
  #   if current_user
  #     render json: {
  #       status: 200,
  #       message: "logged out sucessfully"
  #     }, status: :ok
  #   else
  #     render json: {
  #       status: 401,
  #       message: "Could't find an active session."
  #     }, status: :unauthorized
  #   end
  # end
end
