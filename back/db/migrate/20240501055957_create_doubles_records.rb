class CreateDoublesRecords < ActiveRecord::Migration[7.1]
  def change
    create_table :doubles_records do |t|
      t.integer :score_1
      t.integer :score_2

      t.timestamps
    end
  end
end
