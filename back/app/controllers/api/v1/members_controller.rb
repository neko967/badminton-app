class Api::V1::MembersController < ApplicationController
  wrap_parameters false
  before_action :set_current_group, only: %i[index create update destroy]

  def index
    members = @current_group.members.includes(:singles_played_records, :doubles_played_records, singles_players: :singles_record, doubles_players: :doubles_record)
    render json: { group: @current_group, members: members.as_json(methods: :history) }, status: :ok
  end

  def create
    member = @current_group.members.build(member_params)
    if member.save
      @current_group.update(number_of_people:  @current_group.number_of_people + 1)
      render json: member, status: :created
    else
      render json: member.errors, status: :unprocessable_entity
    end
  end

  def update
    member = @current_group.members.find(params[:id])
    new_member_name = params[:name]
  
    ActiveRecord::Base.transaction do
      # Memberテーブルのnameカラムを更新
      if member.update(name: new_member_name)
        # シングルステーブルのplayer_1カラムおよびplayer_2カラムを更新
        member.singles_played_records.each do |record|
          if record.singles_players.first.member_id == member.id
            record.update(player_1: new_member_name)
          elsif record.singles_players.second.member_id == member.id
            record.update(player_2: new_member_name)
          end
        end

        # ダブルステーブルのplayer_1, player_2, player_3, player_4カラムを更新
        member.doubles_played_records.each do |record|
          if record.doubles_players.first.member_id == member.id
            record.update(player_1: new_member_name)
          elsif record.doubles_players.second.member_id == member.id
            record.update(player_2: new_member_name)
          elsif record.doubles_players.third.member_id == member.id
            record.update(player_3: new_member_name)
          elsif record.doubles_players.fourth.member_id == member.id
            record.update(player_4: new_member_name)
          end
        end
      else
        raise ActiveRecord::Rollback, "Failed to update member name"
      end
    end
  end

  def destroy
    member = @current_group.members.find(params[:id])
    member.destroy
    @current_group.update(number_of_people: @current_group.number_of_people - 1)
    head :no_content
  end

  private

  def member_params
    params.permit(:name)
  end
end
