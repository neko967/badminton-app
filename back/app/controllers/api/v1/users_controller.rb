class Api::V1::UsersController < ApplicationController

  def create
    @current_user = User.find_or_create_by(provider: params[:provider], uid: params[:uid])

    # JWTを発行
    payload = { user_id: @current_user.id, exp: 24.hours.from_now.to_i }
    encoded_token = encode_jwt(payload)
    render json: { user: @current_user, accessToken: encoded_token, status: :ok }
  rescue StandardError => e
    render json: { error: "ログインに失敗しました: #{e.message}" }, status: :internal_server_error
  end

  def destroy
    user = User.find_by(email: params[:email])
    if user
      user.destroy
      head :no_content
    else
      render json: { error: "ユーザーが見つかりませんでした" }, status: :not_found
    end
  rescue StandardError => e
    render json: { error: e.message }, status: :internal_server_error
  end
end
