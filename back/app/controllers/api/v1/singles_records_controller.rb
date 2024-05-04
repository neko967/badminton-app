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
    singles_record.update(score_1: params[:score_1], score_2: params[:score_2])

    player_1 = singles_record.singles_recored_players.find_by(name: params[:player_1])
    score_1 = params[:score_1]
    player_2 = singles_record.singles_recored_players.find_by(name: params[:player_2])
    score_2 = params[:score_2]
    total_score = score_1 + score_2
    player_1.singles_strength - 50
    player_2.singles_strength - 50
    total_strength = (player_1.singles_strength - 50) + (player_2.singles_strength - 50)
    minus_strength_player_1 = ((player_1.singles_strength - 50) / total_strength).total_score.round
    minus_strength_player_2 = total_score - get_strength_player_1

    new_strength_player_1 = player_1.singles_strength - minus_strength_player_1 + score_1
    player_1.update(singles_strength: new_strength_player_1)

    new_strength_player_2 = player_2.singles_strength - minus_strength_player_2 + score_2
    player_2.update(singles_strength: new_strength_player_2)
  end

  private

  def set_current_user
    @current_user = User.find_by(email: params[:email]) 
  end
end
