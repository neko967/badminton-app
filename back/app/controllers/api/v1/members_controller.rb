class Api::V1::MembersController < ApplicationController
  wrap_parameters false
  before_action :set_current_user, only: %i[index create]

  def index
    render json: @current_user.members, status: :ok
  end

  def create
    member = @current_user.members.build(member_params)
    if member.save
      render json: member, status: :created
    else
      render json: member.errors, status: :unprocessable_entity
    end
  end

  def destroy
    member = Members.find(params[:id])
    member.destroy
    head :no_content
  end

  private

  def member_params
    params.permit(:name)
  end

  def set_current_user
    @current_user = User.find_by(email: params[:email]) 
  end
end
  