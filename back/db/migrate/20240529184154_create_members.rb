class CreateMembers < ActiveRecord::Migration[7.1]
  def change
    create_table :members do |t|
      t.string :name, null: false
      t.integer :singles_total_game, default: 0,   null: false
      t.integer :singles_win_game,   default: 0,   null: false
      t.integer :singles_strength,   default: 100, null: false
      t.integer :doubles_total_game, default: 0,   null: false
      t.integer :doubles_win_game,   default: 0,   null: false
      t.integer :doubles_strength,   default: 100, null: false
      t.references :group, null: false, foreign_key: true

      t.timestamps
    end
  end
end
