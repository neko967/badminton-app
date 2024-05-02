class Api::V1::SinglesRecordsController < ApplicationController
  before_action :set_current_user, only: %i[index create]

  def index
    render json: @current_user.singles_records, methods: [:players, :players_1, :players_2, :player_1, :player_2], status: :ok
  end

  def create
    singles_record = @current_user.singles_records.create!()
    singles_member_1 = singles_record.singles_members.create(member_id: params[:member_1_id]) 
    singles_member_2 = singles_record.singles_members.create(member_id: params[:member_2_id])
    if singles_member_1 && singles_member_2
      render json: singles_member_1, status: :created
    else
      render json: singles_member_1.errors, status: :unprocessable_entity
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
