class CreateOutputs < ActiveRecord::Migration[7.1]
  def change
    create_table :outputs do |t|
      t.references :input, null: false, foreign_key: true

      t.timestamps
    end
  end
end
