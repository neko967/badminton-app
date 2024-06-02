class Api::V1::SinglesPlayersController < ApplicationController
  before_action :set_current_group, only: %i[index]

  def index
    singles_players = @current_group.singles_records.includes(:singles_players).map(&:singles_players).flatten
    render json: singles_players, status: :ok
  end
end
