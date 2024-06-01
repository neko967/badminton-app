class ApplicationController < ActionController::API

  def encode_jwt(payload)
    JWT.encode(payload, Rails.application.credentials.secret_key_base, 'HS256')
  end

  attr_reader :current_user

  private

  def set_current_user
    return unless request.headers['Authorization']
    encoded_token = request.headers['Authorization']&.split&.last
    @current_user = User.find_with_jwt(encoded_token) if encoded_token
    return if @current_user

    render json: { error: '認証に失敗しました' }, status: :unauthorized
  end

  def set_current_group
    return unless request.headers['slug']
    slug = request.headers['slug']
    @current_group = Group.find_by(slug: slug)
  end
end
