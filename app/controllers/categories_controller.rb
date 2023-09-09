class CategoriesController < ApplicationController
  # before_action :set_category, only: %i[ show edit update destroy ]

  # GET /categories
  def index
    @categories = current_user.categories
    render json: @categories
  end

  # GET /categories/1
  def show
  end

  # GET /categories/new
  def new
    @category = current_user.categories.new
  end

  # GET /categories/1/edit
  def edit
  end

  # POST /categories
  def create
    @category = current_user.categories.new(category_params)

    if @category.save
      redirect_to @category, notice: "Category was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /categories/1
  def update
    if @category.update(category_params)
      redirect_to @category, notice: "Category was successfully updated.", status: :see_other
    else
      render :edit, status: :unprocessable_entity
    end
  end

  # DELETE /categories/1
  def destroy
    @category = Category.find(params[:id])
    @category.destroy
    render json: { message: "Entry successfully deleted" }, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Entry not found" }, status: :not_found
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_category
    @category = Category.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def category_params
    params.require(:category).permit(:name)
  end
end
