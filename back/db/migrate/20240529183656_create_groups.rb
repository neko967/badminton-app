class CreateGroups < ActiveRecord::Migration[7.1]
  def change
    create_table :groups do |t|
      t.string :name,      null: false
      t.string :slug,      null: false
      t.string :admin_uid, null: false
      t.integer :number_of_people, default: 0, null: false

      t.timestamps
    end

    add_index :groups, :slug, unique: true
  end
end
