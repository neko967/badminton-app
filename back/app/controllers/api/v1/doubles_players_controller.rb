class Api::V1::DoublesPlayersController < ApplicationController
  before_action :set_current_group, only: %i[index]

  def index
    doubles_players = @current_group.doubles_records.includes(:doubles_players).map(&:doubles_players).flatten
    render json: doubles_players, status: :ok
  end
end
