class Api::V1::DoublesRecordsController < ApplicationController
  before_action :set_current_group, only: %i[index create update destroy]

  def index
    doubles_records = @current_group.doubles_records.order(created_at: :desc)
    render json: doubles_records, status: :ok
  end

  def create
    ActiveRecord::Base.transaction do
      params[:maked_pare_id].each do |pare_id_array|
        create_doubles_records(pare_id_array)
      end
      @current_group.touch
    end
    render json: { message: 'Doubles records created successfully' }, status: :created
  rescue ActiveRecord::RecordInvalid => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  def update
    ActiveRecord::Base.transaction do
      doubles_record = DoublesRecord.find(params[:id])
      player_1 = Member.find(params[:player_1_id])
      player_2 = Member.find(params[:player_2_id])
      player_3 = Member.find(params[:player_3_id])
      player_4 = Member.find(params[:player_4_id])
      score_12 = params[:score_12]
      score_34 = params[:score_34]

      doubles_record.update(score_12: score_12, score_34: score_34)
      update_player_strengths(player_1, player_2, player_3, player_4, score_12, score_34)
      update_total_game_count(player_1, player_2, player_3, player_4)
      update_win_game_count(player_1, player_2, player_3, player_4, score_12, score_34)
      @current_group.touch
    end
    render json: { message: 'Doubles record updated successfully' }, status: :ok
  end

  def destroy
    ActiveRecord::Base.transaction do
      doubles_record = DoublesRecord.find(params[:id])
      doubles_record.destroy
      @current_group.touch
    end
    head :no_content
  end

  private

  def create_doubles_records(pare_id_array)
    doubles_record = @current_group.doubles_records.create!(
      player_1: Member.find(pare_id_array[0]).name,
      player_2: Member.find(pare_id_array[1]).name,
      player_3: Member.find(pare_id_array[2]).name,
      player_4: Member.find(pare_id_array[3]).name
    )
    pare_id_array.each do |member_id|
      doubles_record.doubles_players.create!(member_id: member_id)
    end
  end

  def update_player_strengths(player_1, player_2, player_3, player_4, score_12, score_34)
    total_score = score_12 + score_34
    player_12_strength = player_1.doubles_strength + player_2.doubles_strength
    player_34_strength = player_3.doubles_strength + player_4.doubles_strength
    total_strength = (player_12_strength - 100) + (player_34_strength - 100)
    minus_strength_player_12 = (((player_12_strength - 100).to_f / total_strength.to_f) * total_score).round
    minus_strength_player_34 = total_score - minus_strength_player_12

    players_scores = [
      { player: player_1, minus_strength: minus_strength_player_12, score: score_12 },
      { player: player_2, minus_strength: minus_strength_player_12, score: score_12 },
      { player: player_3, minus_strength: minus_strength_player_34, score: score_34 },
      { player: player_4, minus_strength: minus_strength_player_34, score: score_34 }
    ]

    players_scores.each do |ps|
      new_strength = ps[:player].doubles_strength - ps[:minus_strength] + ps[:score]
      ps[:player].update(doubles_strength: new_strength)
    end
  end

  def update_total_game_count(player_1, player_2, player_3, player_4)
    player_1.increment!(:doubles_total_game)
    player_2.increment!(:doubles_total_game)
    player_3.increment!(:doubles_total_game)
    player_4.increment!(:doubles_total_game)
  end

  def update_win_game_count(player_1, player_2, player_3, player_4, score_12, score_34)
    if score_12 > score_34
      player_1.increment!(:doubles_win_game)
      player_2.increment!(:doubles_win_game)
    elsif score_12 < score_34
      player_3.increment!(:doubles_win_game)
      player_4.increment!(:doubles_win_game)
    end
  end
end
