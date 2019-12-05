class UserSearchesController < ApplicationController

    def create
        user_search = User.new(user_search_params)
        if user_search.save
            favorite = Favorite.new(user_id: params[user_id], user_search_id: user_search.id)
        end
    end 


private

    def  user_search_params
        params.require(:user_search).permit(:reddit_username, :top_listing_name, :top_listing_likes, :top_listing_link, :fav_sub_name, :most_children_name, :most_children_likes, :most_children_link)
    end
end

