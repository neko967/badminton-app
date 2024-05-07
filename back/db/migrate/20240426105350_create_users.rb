class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :provider, null: false
      t.string :uid,      null: false

      t.timestamps
    end

    add_index :users, [:provider, :uid], name: "index_users_on_provider_and_uid", unique: true
  end
end
