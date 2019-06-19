module Api::V1
  class StationsController < ApplicationController

    def index
      stations = Station.all

      stations = stations.all.map do |station|
        {
          id: station.id,
          station_id: station.station_id,
          name: station.name,
        }
      end

      render json: stations
    end
  end
end

