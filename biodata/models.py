from django.conf import settings
from django.db import models


class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="profile")
    display_name = models.CharField(max_length=80, blank=True)
    status = models.CharField(max_length=140, blank=True)

    def __str__(self) -> str:
        return self.display_name or getattr(self.user, "email", "") or str(self.user)


class StatusPost(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="status_posts")
    content = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{getattr(self.user, 'email', self.user)}: {self.content[:30]}"
