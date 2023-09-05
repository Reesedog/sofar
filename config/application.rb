require_relative "boot"

require "rails/all"

Bundler.require(*Rails.groups)

module Sofar
  class Application < Rails::Application
    config.load_defaults 7.0

    config.time_zone = "Canberra"

    config.middleware.insert_before 0, Rack::Cors do
      allow do

        origins "*"  # CORS access to the API from the React app

        resource "*",
                 headers: :any,
                 expose: ["Access-Token", "Uid", "Client", "Token-Type", "Expiry"],
                 methods: [:get, :post, :put, :patch, :delete, :options, :head]
      end
    end
  end
end
