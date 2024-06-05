class Api::V1::SinglesRecordsController < ApplicationController
  before_action :set_current_group, only: %i[index create update]

  def index
    render json: @current_group.singles_records.order(created_at: :desc), status: :ok
  end

  def create
    ActiveRecord::Base.transaction do
      params[:maked_pare_id].each do |pare_id_array|
        singles_record = @current_group.singles_records.create!(player_1: Member.find(pare_id_array[0]).name, player_2: Member.find(pare_id_array[1]).name)
        singles_player_1 = singles_record.singles_players.create(member_id: pare_id_array[0])
        singles_player_2 = singles_record.singles_players.create(member_id: pare_id_array[1])
      end
      @current_group.touch # グループの最終更新日を更新
    end
    render json: { message: 'Singles records created successfully' }, status: :created
  rescue ActiveRecord::RecordInvalid => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  def update
    @current_group.touch # グループの最終更新日を更新
    singles_record = SinglesRecord.find(params[:id])
    singles_record.update(score_1: params[:score_1], score_2: params[:score_2])

    player_1 = singles_record.singles_recorded_players.find(params[:player_1_id])
    score_1 = params[:score_1]
    player_2 = singles_record.singles_recorded_players.find(params[:player_2_id])
    score_2 = params[:score_2]
    total_score = score_1 + score_2
    total_strength = (player_1.singles_strength - 50) + (player_2.singles_strength - 50)
    minus_strength_player_1 = (((player_1.singles_strength - 50).to_f / total_strength.to_f) * total_score).round
    minus_strength_player_2 = total_score - minus_strength_player_1

    new_strength_player_1 = player_1.singles_strength - minus_strength_player_1 + score_1
    player_1.update(singles_strength: new_strength_player_1,
                    singles_total_game: player_1.singles_total_game + 1)

    new_strength_player_2 = player_2.singles_strength - minus_strength_player_2 + score_2
    player_2.update(singles_strength: new_strength_player_2,
                    singles_total_game: player_2.singles_total_game + 1)

    if score_1 > score_2
      player_1.update(singles_win_game: player_1.singles_win_game + 1)
    elsif score_1 < score_2
      player_2.update(singles_win_game: player_2.singles_win_game + 1)
    end
  end
end
