class CreateSinglesPlayers < ActiveRecord::Migration[7.1]
  def change
    create_table :singles_players do |t|
      t.references :member, null: false, foreign_key: true
      t.references :singles_record, null: false, foreign_key: true

      t.timestamps
    end
  end
end
