require 'google/transit/gtfs-realtime.pb'
require 'net/http'
require 'uri'
require 'csv'
require 'date'
class Station < ApplicationRecord
  STATIONS_URL = "http://web.mta.info/developers/data/nyct/subway/Stations.csv"
  validates :station_id, uniqueness: true

  def self.import
    stations_data = Net::HTTP.get(URI.parse(STATIONS_URL))
    parsed = CSV.new(stations_data, quote_char: "\x00")
    parsed.shift
    parsed.each do |station|
      Station.create(station_id: station[2], name: station[5])
    end
  end
end
