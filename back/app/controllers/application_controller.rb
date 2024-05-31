class ApplicationController < ActionController::API
  require 'net/http'
  require 'uri'
  require 'json'

  private

  def set_current_user
    if request.headers['Authorization'].present?
      received_access_token = request.headers['Authorization'].split(' ').last
      uri = URI.parse("https://www.googleapis.com/oauth2/v1/userinfo?access_token=#{received_access_token}")
      response = Net::HTTP.get_response(uri)
      user_info = JSON.parse(response.body)
      if user_info['id']
        @current_user = User.find_by(uid: user_info['id'])
      else
        render json: { error: 'Invalid token' }, status: :unauthorized
      end
    else
      render json: { error: 'Authorization header is missing' }, status: :unauthorized
    end
  end

  def set_current_group
    slug = request.headers['slug']
    @current_group = Group.find_by(slug: slug)
  end
end
