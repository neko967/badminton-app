class Api::V1::MembersController < ApplicationController
    wrap_parameters false
  
    def index
      render json: Member.all, status: :ok
    end
  
    def create
      member = Member.new(member_params)
      if member.save
        render json: member, status: :created
      else
        render json: member.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      member = Member.find(params[:id])
      member.destroy
      head :no_content
    end

    private

    def member_params
      params.permit(:name)
    end
  end
  