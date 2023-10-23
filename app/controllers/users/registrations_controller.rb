class Users::RegistrationsController < Devise::RegistrationsController
  # respond_to :json
  
   # POST /resource
   def create
    user = User.new(registration_params)
    if user.save
      auth_object = Authentication.new(registration_params)
      if auth_object.authenticate
        # sign_in(auth_object.current_user)
        render json: {
          message: "Login successful!",
          token: auth_object.generate_token,
          user: UserSerializer.new(auth_object.current_user).serializable_hash[:data][:attributes]}, status: :ok
      else
        render json: {
          message: "Incorrect email/password combination"}, status: :unauthorized
      end
        
    else
      render json: { errors: { 'email, password or password_confirmation' => ['is invalid'] } }, status: :unprocessable_entity
    end
  end

  private

  def registration_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

end
