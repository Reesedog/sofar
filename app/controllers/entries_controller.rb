class EntriesController < ApplicationController
  before_action :authenticate_user!

  def index
    @entries = Entry.order(created_at: :desc)
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

  def destroy
    @entry = Entry.find(params[:id])
    @entry.destroy
    render json: { message: "Entry successfully deleted" }, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Entry not found" }, status: :not_found
  end

  private

  def entry_params
    params.require(:entry).permit(:content, :label)
  end
end
