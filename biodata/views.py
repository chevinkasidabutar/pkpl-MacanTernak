from django.conf import settings
from django.contrib.auth import logout
from django.contrib import messages
from django.shortcuts import redirect, render

from .models import Profile, StatusPost


ALLOWED_MEMBER_EMAILS = [
    "chevinkasidabutar@gmail.com",
    "bungasaragih688@gmail.com",
    "freyazahra08@gmail.com",
    "desver4@gmail.com",
    "sausanfarah007@gmail.com",
]


def home(request):
    user = request.user if request.user.is_authenticated else None
    email = getattr(user, "email", None)
    is_member = bool(email and email.lower() in [e.lower() for e in ALLOWED_MEMBER_EMAILS])

    profile = None
    if user:
        profile, _ = Profile.objects.get_or_create(user=user)
        if request.method == "POST":
            action = (request.POST.get("action") or "").strip()
            if action == "update_profile":
                if not is_member:
                    messages.error(request, "Hanya anggota yang boleh mengubah profil.")
                    return redirect("home")
                profile.display_name = (request.POST.get("display_name") or "").strip()[:80]
                profile.save()
                return redirect("home")

            if action == "post_status":
                if not is_member:
                    messages.error(request, "Hanya anggota yang boleh memposting status.")
                    return redirect("home")
                content = (request.POST.get("content") or "").strip()
                if content:
                    StatusPost.objects.create(user=user, content=content[:200])
                return redirect("home")

            if action == "edit_status":
                if not is_member:
                    messages.error(request, "Hanya anggota yang boleh mengedit status.")
                    return redirect("home")
                post_id = (request.POST.get("post_id") or "").strip()
                content = (request.POST.get("content") or "").strip()
                if post_id and content:
                    updated = StatusPost.objects.filter(id=post_id, user=user).update(content=content[:200])
                    if not updated:
                        messages.error(request, "Status tidak ditemukan atau bukan milikmu.")
                return redirect("home")

            if action == "delete_status":
                if not is_member:
                    messages.error(request, "Hanya anggota yang boleh menghapus status.")
                    return redirect("home")
                post_id = (request.POST.get("post_id") or "").strip()
                if post_id:
                    deleted, _ = StatusPost.objects.filter(id=post_id, user=user).delete()
                    if not deleted:
                        messages.error(request, "Status tidak ditemukan atau bukan milikmu.")
                return redirect("home")

    posts = StatusPost.objects.select_related("user").all()[:24]

    context = {
        "user": user,
        "is_member": is_member,
        "allowed_emails": ALLOWED_MEMBER_EMAILS,
        "google_client_id_set": settings.SOCIAL_AUTH_GOOGLE_OAUTH2_KEY != "GANTI_DENGAN_CLIENT_ID_GOOGLE",
        "profile": profile,
        "posts": posts,
    }
    return render(request, "biodata/home.html", context)


def login_view(request):
    return redirect("social:begin", backend="google-oauth2")


def logout_view(request):
    logout(request)
    return redirect("home")

