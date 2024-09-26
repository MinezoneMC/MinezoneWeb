from django.urls import path,include
from .views import *


urlpatterns = [
    path('', ReactView.as_view(), name='home'),  
    path("signup", SignupView.as_view(), name="signup"),
    path("login", LoginView.as_view(), name="login"),
    path("forgotPassword", ForgotPasswordView.as_view(), name="forgotPassword"),
    path("resetPassword", ResetPasswordView.as_view(), name="resetPassword"),
    path("profile", UserProfileView.as_view(), name="resetPassword"),

] 