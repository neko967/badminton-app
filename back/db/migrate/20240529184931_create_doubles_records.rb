class CreateDoublesRecords < ActiveRecord::Migration[7.1]
  def change
    create_table :doubles_records do |t|
      t.string :player_1, null: false
      t.string :player_2, null: false
      t.integer :score_12
      t.string :player_3, null: false
      t.string :player_4, null: false
      t.integer :score_34
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
