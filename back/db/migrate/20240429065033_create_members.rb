class CreateMembers < ActiveRecord::Migration[7.1]
  def change
    create_table :members do |t|
      t.string :name, null: false
      t.integer :total_game, default: 0,   null:false
      t.integer :win_game,   default: 0,   null: false
      t.integer :strength,   default: 100, null: false
      t.references :user, null: false, foreign_key: true
      
      t.timestamps
    end
  end
end
