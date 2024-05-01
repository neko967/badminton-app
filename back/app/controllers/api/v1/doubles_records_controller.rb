class Api::V1::DoublesRecordsController < ApplicationController

  def index
    render json: DoublesRecord.all, status: :ok
  end
end
