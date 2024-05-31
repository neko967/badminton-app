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

      if response.code.to_i != 200
        Rails.logger.error "Google API request failed: #{response.body}"
        return render json: { error: 'Invalid token' }, status: :unauthorized
      end

      user_info = JSON.parse(response.body)
      Rails.logger.info "User Info: #{user_info}"

      if user_info['id']
        @current_user = User.find_by(uid: user_info['id'])
      else
        Rails.logger.error "Invalid user info: #{user_info}"
        render json: { error: 'Invalid token' }, status: :unauthorized
      end
    else
      Rails.logger.error "Authorization header is missing"
      render json: { error: 'Authorization header is missing' }, status: :unauthorized
    end
  end

  def set_current_group
    slug = request.headers['slug']
    @current_group = Group.find_by(slug: slug)
  end
end
