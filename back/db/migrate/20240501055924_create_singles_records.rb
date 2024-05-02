class CreateSinglesRecords < ActiveRecord::Migration[7.1]
  def change
    create_table :singles_records do |t|
      t.string :player_1, null: false
      t.integer :score_1
      t.string :player_2, null: false
      t.integer :score_2
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
