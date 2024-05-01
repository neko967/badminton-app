class Api::V1::SinglesRecordsController < ApplicationController
  before_action :set_current_user, only: %i[index create]

  def index
    render json: @current_user.singles_records.all, status: :ok
  end

  def create
    singles_record = @current_user.singles_records.create!()
    if singles_member = SinglesMember.create(singles_record_id: singles_record.id, member_id: params[:member_1_id]) 
                     && SinglesMember.create(singles_record_id: singles_record.id, member_id: params[:member_2_id])
      render json: singles_member, status: :created
    else
      render json: singles_member.errors, status: :unprocessable_entity
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
