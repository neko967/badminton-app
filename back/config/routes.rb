Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  get 'api/v1/users', to: 'api/v1/users#index'
  post 'auth/:provider/callback', to: 'api/v1/users#create'
  delete 'users/:email', to: 'api/v1/users#destroy', constraints: { email: %r{[^/]+} }

  namespace :api do
    namespace :v1 do
      resources :members, only: %i[index create destroy edit update]
      resources :singles_records, only: %i[index create destroy update]
      resources :doubles_records, only: %i[index create destroy update]
    end
  end
end
