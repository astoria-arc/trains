class CreateTrain < ActiveRecord::Migration[5.2]
  def change
    create_table :trains do |t|
      t.string :name
      t.string :direction
      t.datetime :start_time

      t.timestamps
    end
  end
end
