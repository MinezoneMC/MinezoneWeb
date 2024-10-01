from django.urls import path, include
from .views import *

urlpatterns = [
    path('', ReactView.as_view(), name='home'),
    path("signup/", SignupView.as_view(), name="signup"),
    path("login/", LoginView.as_view(), name="login"),
    path("forgotPassword/", ForgotPasswordView.as_view(), name="forgotPassword"),
    path("resetPassword/", ResetPasswordView.as_view(), name="resetPassword"),
    path("forum/", ForumView.as_view(), name="forum"),
    path('profile/<int:user_id>/', UserProfileView.as_view(), name='profile'),
    path("forum/<int:forum_id>/", ForumDetailView.as_view(), name="forum_detail"),
    path('forums/<int:forum_id>/comments/', CommentView.as_view(), name="comment"),
    path('users/<int:user_id>/', UserPublicProfileView.as_view(), name='user_public_profile'),
]
