class ApplicationController < ActionController::API
    respond_to :json
    # before_action :process_token
    # before_action :configure_permitted_parameters, if: :devise_controller?

    # protected

    # def configure_permitted_parameters
    #     added_attrs = [:first_name, :last_name, :email, :encrypted_password, :password_confirmation, :remember_me]
    #     devise_parameter_sanitizer.permit(:sign_up, keys: added_attrs)
    #     devise_parameter_sanitizer.permit(:account_update, keys: added_attrs)
    #     devise_parameter_sanitizer.permit(:sign_in, keys: added_attrs)
    # end

    private  

    def authenticate_user!(options = {})
        head :unauthorized unless signed_in?
    end

    def signed_in?
        @current_user_id.present?
    end

    def current_user
        @current_user ||= super || User.find(@current_user_id)
    end

    # def process_token
    #     if request.headers['Authorization'].present?
    #         puts '--------------->'
    #         puts request.headers['Authorization']
    #         token = request.headers['Authorization'].split(' ')[1].remove('"')

    #         # begin
    #         #     jwt_payload = JWT.decode(token, Rails.application.secrets.secret_key_base).first
    #         #     @current_user_id = jwt_payload['id']
    #         #   rescue JWT::ExpiredSignature, JWT::VerificationError, JWT::DecodeError
    #         #     head :unauthorized
    #         #   end

    #         begin
    #           jwt_payload = JWT.decode(token, Rails.application.secrets.secret_key_base).first
    #           @current_user_id = jwt_payload['id']
    #         rescue JWT::ExpiredSignature, JWT::VerificationError, JWT::DecodeError
    #           head :unauthorized
    #         end
    #     end
    # end
    
end
