from django.urls import path, include
from .views import *

urlpatterns = [
    path('', ReactView.as_view(), name='home'),
    path("api/signup/", SignupView.as_view(), name="signup"),
    path("api/login/", LoginView.as_view(), name="login"),
    path("api/forgotPassword/", ForgotPasswordView.as_view(), name="forgotPassword"),
    path("api/resetPassword/", ResetPasswordView.as_view(), name="resetPassword"),
    path("api/forum/", ForumView.as_view(), name="forum"),
    path('api/profile/<int:user_id>/', UserProfileView.as_view(), name='profile'),
    path("api/forum/<int:forum_id>/", ForumDetailView.as_view(), name="forum_detail"),
    path('api/forums/<int:forum_id>/comments/', CommentView.as_view(), name="comment"),
    path('api/users/<int:user_id>/', UserPublicProfileView.as_view(), name='user_public_profile'),
    path('api/supports/', UserSupport.as_view(), name='user_support'),
]
