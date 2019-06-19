require 'protobuf'
require 'google/transit/gtfs-realtime.pb'
require 'net/http'
require 'uri'
require 'date'
class Train < ApplicationRecord
  API_KEY = ENV["MTA_API_KEY"]

  has_many :stops, dependent: :destroy

  def self.fetch_data
    Train.destroy_all

    data = Net::HTTP.get(URI.parse("http://datamine.mta.info/mta_esi.php?key=#{Train::API_KEY}&feed_id=16"))
    feed = Transit_realtime::FeedMessage.decode(data)
    trip_updates = []
    for entity in feed.entity do
      if entity.field?(:trip_update)
        trip_updates << entity.trip_update
      end
    end

    nw_updates = trip_updates.select { |t| ["N", "W"].include?(t.trip.route_id) }

    manhattan_bound = nw_updates.select do |t|
      stop = t&.stop_time_update&.first&.stop_id&.chop
      next unless stop
      station = Station.where(station_id: stop).first
      next unless station
      station.name.include?("Astoria")
    end

    astoria_bound = nw_updates - manhattan_bound
    parse_and_store_stops(manhattan_bound, "Manhattan")
    parse_and_store_stops(astoria_bound, "Astoria")
  end

  def self.parse_and_store_stops(trains, direction)
    trains.each do |train_data|
      puts "creating train: #{train_data.trip.route_id}"
      train_trip = Train.create(
        direction: direction,
        name: train_data.trip.route_id,
        start_time: train_data.trip.start_time
      )

      train_data.stop_time_update.each do |stop|
        station = Station.where(station_id: stop.stop_id.chop).first
        train_trip.stops.create(
          station: station,
          time: DateTime.strptime(stop.arrival.time.to_s,'%s').new_offset('-4:00')
        )
      end
    end
  end
end
