class CreateStop < ActiveRecord::Migration[5.2]
  def change
    create_table :stops do |t|
      t.integer :train_id, index: true
      t.integer :station_id, index: true
      t.datetime :time

      t.timestamps
    end
  end
end
