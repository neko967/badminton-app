class ApplicationController < ActionController::API
  attr_reader :current_user, :current_group

  def encode_jwt(payload)
    JWT.encode(payload, Rails.application.credentials.secret_key_base, 'HS256')
  end

  private

  def set_current_user
    encoded_token = request.headers['Authorization']&.split&.last
    if encoded_token
      @current_user = User.find_with_jwt(encoded_token)
      render json: { error: '認証に失敗しました' }, status: :unauthorized unless @current_user
    end
  end

  def set_current_group
    slug = request.headers['slug']
    @current_group = Group.find_by(slug: slug) if slug
  end
end
