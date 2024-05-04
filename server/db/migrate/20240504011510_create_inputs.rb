# frozen_string_literal: true

class CreateInputs < ActiveRecord::Migration[7.1]
  def change
    create_table :inputs do |t|
      t.string :name
      t.string :ext
      t.string :status, default: 'waiting'
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
