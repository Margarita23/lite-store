Rails.application.routes.draw do
  
  resources :orders do
    resources :orders_descriptions
  end

  get 'users/check_for_user'
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout', to: 'devise/sessions#destroy',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  resources :items
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
