class Api::V1::TasksController < ApplicationController
  wrap_parameters false

  def index
    render json: Task.all, status: :ok
  end

  def create
    task = Task.new(task_params)
    if task.save
      render json: task, status: :created
    else
      render json: task.errors, status: :unprocessable_entity
    end
  end

  def destroy
    task = Task.find(params[:id])
    task.destroy
    head :no_content
  end

  private

  def task_params
    params.permit(:title, :description)
  end
end
  
