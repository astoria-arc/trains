namespace :update_trains do
  desc "Update train data"
  task run: :environment do
    puts "updating Train data"
    Train.fetch_data
  end
end
