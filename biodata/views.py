from django.conf import settings
from django.contrib.auth import logout
from django.shortcuts import redirect, render


ALLOWED_MEMBER_EMAILS = [
    "chevinkasidabutar@gmail.com",
]


def home(request):
    user = request.user if request.user.is_authenticated else None
    email = getattr(user, "email", None)
    is_member = bool(email and email.lower() in [e.lower() for e in ALLOWED_MEMBER_EMAILS])

    context = {
        "user": user,
        "is_member": is_member,
        "allowed_emails": ALLOWED_MEMBER_EMAILS,
        "google_client_id_set": settings.SOCIAL_AUTH_GOOGLE_OAUTH2_KEY != "GANTI_DENGAN_CLIENT_ID_GOOGLE",
    }
    return render(request, "biodata/home.html", context)


def login_view(request):
    return redirect("social:begin", backend="google-oauth2")


def logout_view(request):
    logout(request)
    return redirect("home")

