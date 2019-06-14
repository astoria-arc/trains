module Api::V1
  class TrainsController < ApplicationController

    def index
      response = []
      if params["station"].present?
        station = Station.where(station_id: params["station"]).first
        stops = Stop.where(station: station).sort_by {|s| s.time}

        response = stops.map do |stop|
          next unless stop.time.utc > Time.now.utc-15.minutes
          {
            id: stop.train.id,
            name: stop.train.name,
            direction: stop.train.direction,
            time: stop.time.to_datetime.new_offset('-4:00').strftime('%l:%M %p')
          }
        end.compact
      end

      render json: response
    end
  end
end
