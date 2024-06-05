class Api::V1::DoublesRecordsController < ApplicationController
  before_action :set_current_group, only: %i[index create update]

  def index
    render json: @current_group.doubles_records.order(created_at: :desc), status: :ok
  end

  def create
    ActiveRecord::Base.transaction do
      params[:maked_pare_id].each do |pare_id_array|
        doubles_record = @current_group.doubles_records.create!(player_1: Member.find(pare_id_array[0]).name,
                                                                player_2: Member.find(pare_id_array[1]).name,
                                                                player_3: Member.find(pare_id_array[2]).name,
                                                                player_4: Member.find(pare_id_array[3]).name)
        doubles_player_1 = doubles_record.doubles_players.create(member_id: pare_id_array[0])
        doubles_player_2 = doubles_record.doubles_players.create(member_id: pare_id_array[1])
        doubles_player_3 = doubles_record.doubles_players.create(member_id: pare_id_array[2])
        doubles_player_4 = doubles_record.doubles_players.create(member_id: pare_id_array[3])
      end
      @current_group.touch # グループの最終更新日を更新
    end
    render json: { message: 'Doubles records created successfully' }, status: :created
  rescue ActiveRecord::RecordInvalid => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  def update
    @current_group.touch # グループの最終更新日を更新
    doubles_record = DoublesRecord.find(params[:id])
    doubles_record.update(score_12: params[:score_12], score_34: params[:score_34])

    player_1 = doubles_record.doubles_recorded_players.find(params[:player_1_id])
    player_2 = doubles_record.doubles_recorded_players.find(params[:player_2_id])
    score_12 = params[:score_12]
    player_3 = doubles_record.doubles_recorded_players.find(params[:player_3_id])
    player_4 = doubles_record.doubles_recorded_players.find(params[:player_4_id])
    score_34 = params[:score_34]
    total_score = score_12 + score_34
    player_12_strength = player_1.doubles_strength + player_2.doubles_strength
    player_34_strength = player_3.doubles_strength + player_4.doubles_strength
    total_strength = (player_12_strength - 100) + (player_34_strength - 100)
    minus_strength_player_12 = (((player_12_strength - 100).to_f / total_strength.to_f) * total_score).round
    minus_strength_player_34 = total_score - minus_strength_player_12

    new_strength_player_1 = player_1.doubles_strength - minus_strength_player_12 + score_12
    player_1.update(doubles_strength: new_strength_player_1,
                    doubles_total_game: player_1.doubles_total_game + 1)

    new_strength_player_2 = player_2.doubles_strength - minus_strength_player_12 + score_12
    player_2.update(doubles_strength: new_strength_player_2,
                    doubles_total_game: player_2.doubles_total_game + 1)

    new_strength_player_3 = player_3.doubles_strength - minus_strength_player_34 + score_34
    player_3.update(doubles_strength: new_strength_player_3,
                    doubles_total_game: player_3.doubles_total_game + 1)

    new_strength_player_4 = player_4.doubles_strength - minus_strength_player_34 + score_34
    player_4.update(doubles_strength: new_strength_player_4,
                    doubles_total_game: player_4.doubles_total_game + 1)
    if score_12 > score_34
      player_1.update(doubles_win_game: player_1.doubles_win_game + 1)
      player_2.update(doubles_win_game: player_2.doubles_win_game + 1)
    elsif score_12 < score_34
      player_3.update(doubles_win_game: player_3.doubles_win_game + 1)
      player_4.update(doubles_win_game: player_4.doubles_win_game + 1)
    end
  end
end
