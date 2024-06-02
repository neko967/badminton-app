class Api::V1::GroupsController < ApplicationController
  wrap_parameters false
  before_action :set_current_user, only: %i[index create update]

  def index
    render json: @current_user.groups_joined_by_user.order(updated_at: :desc), status: :ok
  end

  def create
    group = Group.create(group_params)
    @current_user.join(group)
  end

  def update
    @group = @current_user.groups_joined_by_user.find(params[:group_id])
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
