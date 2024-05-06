class Api::V1::DoublesRecordsController < ApplicationController
  before_action :set_current_user, only: %i[index create]

  def index
    render json: @current_user.doubles_records.order(created_at: :desc), status: :ok
  end

  def create
    doubles_record = @current_user.doubles_records.create!(player_1: Member.find(params[:member_1_id]).name,
                                                           player_2: Member.find(params[:member_2_id]).name,
                                                           player_3: Member.find(params[:member_3_id]).name,
                                                           player_4: Member.find(params[:member_4_id]).name)
    doubles_player_1 = doubles_record.doubles_players.create(member_id: params[:member_1_id])
    doubles_player_2 = doubles_record.doubles_players.create(member_id: params[:member_2_id])
    doubles_player_3 = doubles_record.doubles_players.create(member_id: params[:member_3_id])
    doubles_player_4 = doubles_record.doubles_players.create(member_id: params[:member_4_id])
    if doubles_player_1 && doubles_player_2 && doubles_player_3 && doubles_player_4
      render json: doubles_player_1, status: :created
    else
      render json: doubles_player_1.errors, status: :unprocessable_entity
    end
  end

  def update
    doubles_record = DoublesRecord.find(params[:id])
    doubles_record.update(score_12: params[:score_12], score_34: params[:score_34])

    player_1 = doubles_record.doubles_recorded_players.find_by(name: params[:player_1])
    player_2 = doubles_record.doubles_recorded_players.find_by(name: params[:player_2])
    score_12 = params[:score_12]
    player_3 = singles_record.doubles_recorded_players.find_by(name: params[:player_3])
    player_4 = singles_record.doubles_recorded_players.find_by(name: params[:player_4])
    score_34 = params[:score_34]
    total_score = score_12 + score_34
    player_12_strength = player_1.doubles_strength + player_2.doubles_strength
    player_34_strength = player_3.doubles_strength + player_4.doubles_strength
    total_strength = (player_12_strength - 100) + (player_34_strength - 100)
    minus_strength_player_12 = (((player_12_strength - 100).to_f / total_strength.to_f) * total_score).round
    minus_strength_player_34 = total_score - minus_strength_player_12

    new_strength_player_1 = player_1.doubles_strength - minus_strength_player_12 + score_12
    player_1.update(doubles_strength: new_strength_player_1)

    new_strength_player_2 = player_2.doubles_strength - minus_strength_player_12 + score_12
    player_2.update(doubles_strength: new_strength_player_2)

    new_strength_player_3 = player_3.doubles_strength - minus_strength_player_34 + score_34
    player_3.update(doubles_strength: new_strength_player_3)

    new_strength_player_4 = player_4.doubles_strength - minus_strength_player_34 + score_34
    player_4.update(doubles_strength: new_strength_player_4)
  end

  private

  def set_current_user
    @current_user = User.find_by(email: params[:email]) 
  end
end
