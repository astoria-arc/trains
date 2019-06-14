class Stop < ApplicationRecord
  belongs_to :train
  belongs_to :station
end

