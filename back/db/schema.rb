# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_05_01_060006) do
  create_table "doubles_players", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "member_id", null: false
    t.bigint "doubles_record_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["doubles_record_id"], name: "index_doubles_players_on_doubles_record_id"
    t.index ["member_id"], name: "index_doubles_players_on_member_id"
  end

  create_table "doubles_records", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "player_1", null: false
    t.string "player_2", null: false
    t.integer "score_12"
    t.string "player_3", null: false
    t.string "player_4", null: false
    t.integer "score_34"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_doubles_records_on_user_id"
  end

  create_table "members", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name", null: false
    t.integer "singles_total_game", default: 0, null: false
    t.integer "singles_win_game", default: 0, null: false
    t.integer "singles_strength", default: 100, null: false
    t.integer "doubles_total_game", default: 0, null: false
    t.integer "doubles_win_game", default: 0, null: false
    t.integer "doubles_strength", default: 100, null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_members_on_user_id"
  end

  create_table "singles_players", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "member_id", null: false
    t.bigint "singles_record_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["member_id"], name: "index_singles_players_on_member_id"
    t.index ["singles_record_id"], name: "index_singles_players_on_singles_record_id"
  end

  create_table "singles_records", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "player_1", null: false
    t.integer "score_1"
    t.string "player_2", null: false
    t.integer "score_2"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_singles_records_on_user_id"
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "provider", null: false
    t.string "uid", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["provider", "uid"], name: "index_users_on_provider_and_uid", unique: true
  end

  add_foreign_key "doubles_players", "doubles_records"
  add_foreign_key "doubles_players", "members"
  add_foreign_key "doubles_records", "users"
  add_foreign_key "members", "users"
  add_foreign_key "singles_players", "members"
  add_foreign_key "singles_players", "singles_records"
  add_foreign_key "singles_records", "users"
end
