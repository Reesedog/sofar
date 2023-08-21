class EntriesController < ApplicationController
    def index
      @entries = Entry.all
      render json: @entries
    end
  
    def create
      @entry = Entry.new(entry_params)
      if @entry.save
        render json: @entry, status: :created
      else
        render json: @entry.errors, status: :unprocessable_entity
      end
    end
  
    private
  
    def entry_params
      params.require(:entry).permit(:content)
    end
  end
  