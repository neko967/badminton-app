class Api::V1::SinglesRecordsController < ApplicationController
  before_action :set_current_user, only: %i[index create]

  def index
    render json: @current_user.singles_records.order(created_at: :desc), status: :ok
  end

  def create
    singles_record = @current_user.singles_records.create!(player_1: Member.find(params[:member_1_id]).name, player_2: Member.find(params[:member_2_id]).name)
    singles_player_1 = singles_record.singles_players.create(member_id: params[:member_1_id]) 
    singles_player_2 = singles_record.singles_players.create(member_id: params[:member_2_id])
    if singles_player_1 && singles_player_2
      render json: singles_player_1, status: :created
    else
      render json: singles_player_1.errors, status: :unprocessable_entity
    end
  end

  def update
    singles_record = SinglesRecord.find(params[:id])
    if singles_record.update(score_1: params[:score_1], score_2: params[:score_2])
      render json: singles_record, status: :created
    else
      render json: singles_record.errors, status: :unprocessable_entity
    end
  end

  private

  def set_current_user
    @current_user = User.find_by(email: params[:email]) 
  end
end
