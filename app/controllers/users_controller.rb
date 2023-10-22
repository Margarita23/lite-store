class UsersController < ApplicationController

  def check_for_user
    puts 'RitaRitaRitaRitaRitaRitaRitaRitaRitaRitaRitaRita'
    # # puts user_signed_in?
    # # puts signed_in?
    # puts '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^'
    if signed_in?
      render json: {
        status: {code: 200, message: 'Rita! Logged in sucessfully!'},
        data: current_user ? UserSerializer.new(current_user).serializable_hash[:data][:attributes] : {}
      }, status: :ok
      else
        render json: {
          status: 401,
          message: "???????????????"
        }, status: :unauthorized
    end 
      # if user_signed_in?
      #   render json: { data: { logged_in: true, user: current_user } }
      # else
      #   render json: { data: { logged_in: false } }
      # end
  end
end
