class CreateDoublesPlayers < ActiveRecord::Migration[7.1]
  def change
    create_table :doubles_players do |t|
      t.references :member, null: false, foreign_key: true
      t.references :doubles_record, null: false, foreign_key: true

      t.timestamps
    end
  end
end
