class Api::V1::SinglesRecordsController < ApplicationController
  before_action :set_current_group, only: %i[index create update]

  def index
    singles_records = @current_group.singles_records.order(created_at: :desc)
    render json: singles_records, status: :ok
  end

  def create
    ActiveRecord::Base.transaction do
      params[:maked_pare_id].each do |pare_id_array|
        create_singles_records(pare_id_array)
      end
      @current_group.touch
    end
    render json: { message: 'Singles records created successfully' }, status: :created
  rescue ActiveRecord::RecordInvalid => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  def update
    ActiveRecord::Base.transaction do
      singles_record = SinglesRecord.find(params[:id])
      player_1 = Member.find(params[:player_1_id])
      player_2 = Member.find(params[:player_2_id])
      score_1 = params[:score_1]
      score_2 = params[:score_2]

      singles_record.update(score_1: score_1, score_2: score_2)
      update_player_strengths(player_1, player_2, score_1, score_2)
      update_total_game_count(player_1, player_2)
      update_win_game_count(player_1, player_2, score_1, score_2)
      @current_group.touch
    end
    render json: { message: 'Singles record updated successfully' }, status: :ok
  end

  private

  def create_singles_records(pare_id_array)
    singles_record = @current_group.singles_records.create!(
      player_1: Member.find(pare_id_array[0]).name,
      player_2: Member.find(pare_id_array[1]).name
    )
    pare_id_array.each do |member_id|
      singles_record.singles_players.create!(member_id: member_id)
    end
  end

  def update_player_strengths(player_1, player_2, score_1, score_2)
    total_score = score_1 + score_2
    total_strength = (player_1.singles_strength - 50) + (player_2.singles_strength - 50)
    minus_strength_player_1 = (((player_1.singles_strength - 50).to_f / total_strength.to_f) * total_score).round
    minus_strength_player_2 = total_score - minus_strength_player_1

    players_scores = [
      { player: player_1, minus_strength: minus_strength_player_1, score: score_1 },
      { player: player_2, minus_strength: minus_strength_player_2, score: score_2 },
    ]

    players_scores.each do |ps|
      new_strength = ps[:player].singles_strength - ps[:minus_strength] + ps[:score]
      ps[:player].update(singles_strength: new_strength)
    end
  end

  def update_total_game_count(player_1, player_2)
    player_1.increment!(:singles_total_game)
    player_2.increment!(:singles_total_game)
  end

  def update_win_game_count(player_1, player_2, score_1, score_2)
    if score_1 > score_2
      player_1.increment!(:singles_win_game)
    elsif score_1 < score_2
      player_2.increment!(:singles_win_game)
    end
  end
end
