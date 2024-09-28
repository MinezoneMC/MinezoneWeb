from django.urls import path,include
from .views import *


urlpatterns = [
    path('', ReactView.as_view(), name='home'),  
    path("signup", SignupView.as_view(), name="signup"),
    path("login", LoginView.as_view(), name="login"),
    path("forgotPassword", ForgotPasswordView.as_view(), name="forgotPassword"),
    path("resetPassword", ResetPasswordView.as_view(), name="resetPassword"),
    path("profile", UserProfileView.as_view(), name="profile"),
    path("forum", ForumView.as_view(), name="forum"),
    path("profile/<int:user_id>/", UserProfileDetailView.as_view(), name="user_profile"),
    path('forums/<int:forum_id>/comments/', CommentView.as_view(), name="comment"),
    

] 