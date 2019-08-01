class PollTrainsJob < ApplicationJob
  queue_as :default

  def perform
    puts "updating Train data: #{Time.now.utc}"
    Train.fetch_data
  end
end
