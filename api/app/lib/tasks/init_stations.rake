namespace :init_stations do
  desc "Initialize all the stations."
  task run: :environment do
    puts "Initializing stations..."
    Station.import
  end
end
