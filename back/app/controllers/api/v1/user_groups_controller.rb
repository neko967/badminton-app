class Api::V1::UserGroupsController < ApplicationController
  before_action :set_current_user, :set_current_group, only: %i[create]

  def create
    if @current_user
      @current_user.join(@current_group) unless @current_user.joined?(@current_group)
      head :ok
    else
      render json: { error: 'ユーザーが見つかりませんでした' }, status: :unauthorized
    end
  end
end
