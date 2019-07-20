class Api::MessagesController < ApplicationController
  def index
    # @group = Group.find(params[:group_id])
    # @messages = @group.messages.includes(:user).where('id > ?', params[:id]);
    @messages = Message.includes(:user).where('id > ? ', params[:id]).where(group_id: params[:group_id]);
  end
end