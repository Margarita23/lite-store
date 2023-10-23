class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  enum role: [:user, :admin]
  has_many :orders

  validates :email, presence: true, uniqueness: true
end
