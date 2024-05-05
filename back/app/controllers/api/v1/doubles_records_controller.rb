class Api::V1::DoublesRecordsController < ApplicationController
  before_action :set_current_user, only: %i[index create]

  def index
    render json: @current_user.doubles_records.order(created_at: :desc), status: :ok
  end

  def create
    doubles_record = @current_user.doubles_records.create!(player_1: Member.find(params[:member_1_id]).name, player_2: Member.find(params[:member_2_id]).name)
    doubles_player_1 = doubles_record.doubles_players.create(member_id: params[:member_1_id]) 
    doubles_player_2 = doubles_record.doubles_players.create(member_id: params[:member_2_id])
    if doubles_player_1 && doubles_player_2
      render json: doubles_player_1, status: :created
    else
      render json: doubles_player_1.errors, status: :unprocessable_entity
    end
  end

  private

  def set_current_user
    @current_user = User.find_by(email: params[:email]) 
  end
end
