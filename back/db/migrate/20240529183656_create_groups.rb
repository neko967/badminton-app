class CreateGroups < ActiveRecord::Migration[7.1]
  def change
    create_table :groups do |t|
      t.string :name
      t.string :slug, null: false

      t.timestamps
    end

    add_index :groups, :slug, unique: true
  end
end
