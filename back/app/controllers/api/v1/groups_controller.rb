class Api::V1::GroupsController < ApplicationController
  wrap_parameters false
  before_action :set_current_user, only: %i[index create update]

  def index
    if @current_user
      groups = @current_user.groups_joined_by_user.order(updated_at: :desc)
      render json: groups, status: :ok
    else
      render json: { error: '認証に失敗しました' }, status: :unauthorized
    end
  end

  def create
    group = Group.create(group_params)
    @current_user.join(group)
  end

  def update
    @group = @current_user.groups_joined_by_user.find(params[:id])
    @group.update(name: params[:name])
  end

  def destroy
    group = Group.find(params[:id])
    group.destroy
    head :no_content
  end

  private

  def group_params
    params.permit(:name).merge(slug: SecureRandom.urlsafe_base64(33), admin_uid: @current_user.uid)
  end
end
