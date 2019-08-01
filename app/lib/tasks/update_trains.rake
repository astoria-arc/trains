namespace :update_trains do
  desc "Update train data"
  task run: :environment do
    PollTrainsJob.set(
      wait_until: Time.now.utc + 3.minutes,
    ).perform_later

    PollTrainsJob.set(
      wait_until: Time.now.utc + 6.minutes,
    ).perform_later
  end
end
