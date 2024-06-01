class Api::V1::MembersController < ApplicationController
  wrap_parameters false
  before_action :set_current_user, only: %i[index]
  before_action :set_current_group, only: %i[index create destroy]

  def index
    if @current_user
      @current_user.join(@current_group) unless @current_user.joined?(@current_group)
    end
    render json: @current_group.members, methods: :history, status: :ok
  end

  def create
    member = @current_group.members.build(member_params)
    if member.save
      @current_group.update(number_of_people:  @current_group.number_of_people + 1)
      render json: member, status: :created
    else
      render json: member.errors, status: :unprocessable_entity
    end
  end

  def destroy
    member = @current_group.members.find(params[:id])
    member.destroy
    @current_group.update(number_of_people: @current_group.number_of_people - 1)
    head :no_content
  end

  private

  def member_params
    params.permit(:name)
  end
end
  