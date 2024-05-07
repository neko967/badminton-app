class Api::V1::MembersController < ApplicationController
  wrap_parameters false
  before_action :set_current_user, only: %i[index create]

  def index
    render json: @current_user.members, methods: :history, status: :ok
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
    member = Member.find(params[:id])
    member.destroy
    head :no_content
  end

  private

  def member_params
    params.permit(:name)
  end
end
  